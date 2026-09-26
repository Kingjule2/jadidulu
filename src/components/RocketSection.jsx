import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { drawFlight, FLIGHT_TIMING } from './rocketScene';
import './RocketSection.css';

export default function RocketSection() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const messageRef = useRef(null);
  const controlsRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState('idle');
  const [run, setRun] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReducedMotion(preference.matches);
      setPaused(false);
      setPhase('idle');
    };
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const message = messageRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // The final message is the default/fallback, including a missing canvas.
    if (reducedMotion || !ctx) {
      gsap.set(message, { opacity: 1, y: 0 });
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let width = 0;
    let height = 0;
    let inView = false;
    let userPaused = false;
    let currentPhase = 'idle';
    const clock = { time: 0 };
    gsap.set(message, { opacity: 0, y: 18 });

    const render = () => {
      drawFlight(ctx, width, height, clock.time);
      const nextPhase = clock.time >= FLIGHT_TIMING.end ? 'done'
        : clock.time >= FLIGHT_TIMING.reveal ? 'reveal'
          : clock.time >= FLIGHT_TIMING.exit ? 'smoke'
            : clock.time >= FLIGHT_TIMING.follow ? 'exit'
              : clock.time >= FLIGHT_TIMING.launch ? 'flight'
                : clock.time >= FLIGHT_TIMING.ignition ? 'ignition' : 'ground';
      if (currentPhase !== nextPhase) {
        currentPhase = nextPhase;
        setPhase(nextPhase);
      }
    };

    const timeline = gsap.timeline({ paused: true });
    timeline.to(clock, { time: FLIGHT_TIMING.end, duration: FLIGHT_TIMING.end, ease: 'none', onUpdate: render }, 0);
    timeline.to(message, { opacity: 1, y: 0, duration: 2.5, ease: 'power2.out' }, FLIGHT_TIMING.reveal);

    const resize = () => {
      // clientWidth ignores the existing desktop page zoom; canvas and text
      // consequently share the same coordinate space at every breakpoint.
      width = section.clientWidth;
      height = section.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFlight(ctx, width, height, clock.time);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);

    const syncPlayback = () => {
      if (inView && !document.hidden && !userPaused) timeline.play();
      else timeline.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= .3;
      syncPlayback();
    }, { threshold: [0, .3] });
    observer.observe(section);
    document.addEventListener('visibilitychange', syncPlayback);
    controlsRef.current = {
      toggle() {
        userPaused = !userPaused;
        setPaused(userPaused);
        syncPlayback();
      },
    };

    return () => {
      timeline.kill();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      controlsRef.current = null;
    };
  }, [run, reducedMotion]);

  return (
    <section className="rocket-section" id="blast" ref={sectionRef} aria-labelledby="blast-title" data-phase={reducedMotion ? 'done' : phase}>
      <canvas className="rocket-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="rocket-message" ref={messageRef}>
        <h2 id="blast-title">Blast your ideas<br />with <span>JADIDULU</span></h2>
      </div>
      {!reducedMotion && (
        <div className="rocket-controls">
          {phase !== 'done' && (
            <button type="button" onClick={() => controlsRef.current?.toggle()} aria-label={paused ? 'Resume animation' : 'Pause animation'}>
              {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
              <span>{paused ? 'Resume' : 'Pause'}</span>
            </button>
          )}
          <button type="button" onClick={() => {
            setPaused(false);
            setPhase('idle');
            setRun((value) => value + 1);
          }} aria-label="Replay rocket animation">
            <RotateCcw size={15} aria-hidden="true" />
            <span>Replay</span>
          </button>
        </div>
      )}
    </section>
  );
}
