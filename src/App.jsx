import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ProcessSection from './components/ProcessSection';
import PortfolioSection from './components/PortfolioSection';
import FaqSection from './components/FaqSection';
import './App.css';

gsap.registerPlugin(SplitText);

const image = (name) => `/figma/updated/${name}`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const smootherRef = useRef(null);
  useEffect(() => {
    const sections = document.querySelectorAll('.problem-section, .portfolio-section, .contact-section');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-near'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-near', entry.isIntersecting);
      });
    }, { rootMargin: '300px 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const page = document.querySelector('.figma-page');
    page.classList.add('reveals-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('[data-scroll-reveal]').forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      page.classList.remove('reveals-ready');
    };
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const media = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let release;

    const updateLineMotion = () => {
      release?.();
      release = undefined;
      if (!media.matches) return;

      let stopped = false;
      let observer;
      const splits = [];
      const buttons = [];
      release = () => {
        stopped = true;
        observer?.disconnect();
        splits.forEach((split) => split.revert());
        buttons.forEach((button) => gsap.set(button, { clearProps: 'transform,opacity,visibility' }));
      };

      document.fonts.ready.then(() => {
        if (stopped) return;

        const setVisibility = new Map();
        observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            setVisibility.get(entry.target)(entry.isIntersecting);
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

        [
          ['.problem-card', 'h2, p', '.problem-link'],
          ['.solution-copy', 'h2, p'],
          ['.process-section-inner', ':scope > h2, :scope > p'],
        ].forEach(([selector, text, action]) => {
          const section = document.querySelector(selector);
          const button = action ? section.querySelector(action) : null;
          if (button) buttons.push(button);
          let visible = false;
          let timeline;
          const split = SplitText.create(section.querySelectorAll(text), {
            type: 'lines',
            tag: 'span',
            linesClass: 'motion-line',
            mask: 'lines',
            aria: 'none',
            autoSplit: true,
            onSplit: ({ lines }) => {
              gsap.set(lines, { xPercent: -100, autoAlpha: 0 });
              if (button) gsap.set(button, { x: -70, autoAlpha: 0 });
              timeline = gsap.timeline({ paused: true }).to(lines, {
                xPercent: 0,
                autoAlpha: 1,
                duration: 1.6,
                stagger: { amount: 1.65 },
                ease: 'power1.inOut',
              });
              if (button) {
                timeline.to(button, {
                  x: 0,
                  autoAlpha: 1,
                  duration: 1.45,
                  ease: 'power1.inOut',
                }, '>-0.5');
              }
              if (visible) timeline.play();
              return timeline;
            },
          });
          splits.push(split);
          setVisibility.set(section, (isVisible) => {
            if (visible === isVisible) return;
            visible = isVisible;
            if (isVisible) timeline.timeScale(1).play();
            else timeline.timeScale(2).reverse();
          });
          observer.observe(section);
        });
      });
    };

    updateLineMotion();
    media.addEventListener('change', updateLineMotion);
    return () => {
      media.removeEventListener('change', updateLineMotion);
      release?.();
    };
  }, []);

  useEffect(() => {
    // ScrollSmoother is desktop-only; mobile keeps native touch scrolling.
    const media = window.matchMedia('(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let release;
    let generation = 0;

    const updateSmoother = () => {
      generation += 1;
      const current = generation;
      release?.();
      release = undefined;
      if (!media.matches) return;

      import('./desktopMotion').then(({ startDesktopMotion }) => {
        if (current !== generation) return;
        release = startDesktopMotion((smoother) => { smootherRef.current = smoother; });
      });
    };

    updateSmoother();
    media.addEventListener('change', updateSmoother);
    return () => {
      media.removeEventListener('change', updateSmoother);
      generation += 1;
      release?.();
    };
  }, []);

  const handleAnchorClick = (event) => {
    const link = event.target.closest('a[href^="#"]');
    const smoother = smootherRef.current;
    if (!link || !smoother) return;

    const hash = link.getAttribute('href');
    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, '', hash);
    smoother.scrollTo(hash === '#top' ? 0 : target, true, hash === '#top' ? undefined : 'top 84px');
  };


  return (
    <div className="figma-page" onClickCapture={handleAnchorClick}>
      <header className="site-header" id="top">
        <a className="site-logo" href="#top" aria-label="Jadidulu home">
          <img src={image('logo.svg')} alt="jadidulu" width="548" height="139" />
        </a>
        <nav className={`site-nav${menuOpen ? ' is-open' : ''}`} id="site-nav" aria-label="Main navigation">
          <a href="#about" onClick={() => setMenuOpen(false)}>About Us</a>
          <a href="#how-we-work" onClick={() => setMenuOpen(false)}>How We Work</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>Our Work</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
        </nav>
        <a className="header-cta" href="#contact">Bring Your Idea</a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="site-nav"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {menuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 5h16M4 12h16M4 19h16" />
            )}
          </svg>
        </button>
      </header>

      <div id="smooth-wrapper">
        <div id="smooth-content">
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="hero-eyebrow">You Bring the Idea. We Give It Shape.</p>
            <h1 id="hero-title">Have an App Idea but Not Sure<br className="desktop-break" /> Where to Start?</h1>
            <p className="hero-description">Tell us what you want to build or the problem you want to solve. We’ll help turn it into a clear product direction, user flow, and clickable prototype you can test and validate before committing to development.</p>
            <div className="hero-actions">
              <a className="figma-button primary-button" href="#contact">
                Tell Us Your Idea
                <span className="button-icon primary-icon" aria-hidden="true" />
              </a>
              <a className="figma-button outline-button" href="#how-we-work">
                See How We Work
                <span className="button-icon outline-icon" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="problem-section" id="about" aria-labelledby="problem-title">
          <div className="problem-card">
            <p className="problem-eyebrow">Still Stuck in Planning?</p>
            <h2 id="problem-title">You Have the Idea. But It Still Feels Too Unclear to Build.</h2>
            <p>You’ve spent time thinking it through, discussing it, and trying to move it forward. But the idea still feels too uncertain to confidently take the next step. What’s getting in the way?</p>
            <button type="button" className="problem-link">
              See What’s Missing
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </section>

        <section className="solution-section" id="solution" aria-labelledby="solution-title">
          <div className="solution-inner">
            <div className="solution-copy">
              <h2 id="solution-title">From a Rough Idea to Something You Can Actually <span className="section-accent">Build</span></h2>
              <p>Tell us what you want to build or the problem you want to solve. We’ll help turn it into a clear product direction, user flow, and clickable prototype you can test and validate before committing to development.</p>
              <p className="solution-emphasis">And when the direction is clear enough, we can help take it further into a working product.</p>
            </div>
            <img className="solution-image" data-scroll-reveal="image-up"
              src={image('solution-illustration-640.webp')}
              srcSet={`${image('solution-illustration-640.webp')} 640w, ${image('solution-illustration-1200.webp')} 1200w`}
              sizes="(max-width: 680px) calc(100vw - 40px), (max-width: 900px) calc(100vw - 64px), 570px"
              width="1200" height="800" alt="An idea becoming a product flow and a clickable prototype" loading="lazy" />
          </div>
        </section>

        <ProcessSection />
        <PortfolioSection />
        <FaqSection />

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <p className="contact-eyebrow">Let’s Work Together</p>
          <h2 id="contact-title" data-scroll-reveal="rise">Have an Idea? Let’s Make It Buildable</h2>
          <p>Bring your idea. We’ll help make it clear and buildable.</p>
          <a
            className="contact-cta"
            href="https://wa.me/6281298192099"
            target="_blank"
            rel="noopener noreferrer"
          >
            Make Your Idea Buildable
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-logo" href="#top" aria-label="Jadidulu home">
          <img src={image('logo.svg')} alt="jadidulu" width="548" height="139" loading="lazy" />
        </a>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#about">About</a>
          <a href="#how-we-work">Services</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <small>© 2026 PT Kreasi Perangkat Lunak. All rights reserved.</small>
      </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
