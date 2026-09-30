import { useRef } from 'react';
import './ProcessSection.css';

const steps = [
  {
    title: 'Tell Us What You’re Thinking',
    description: 'Bring the idea, problem, rough notes, or even the things you’re still unsure about. We’ll start by understanding your goals, users, context, and constraints.',
    image: '/figma/updated/step-idea.webp',
  },
  {
    title: 'Shape the Direction',
    description: 'Together, we explore the user flow, possible solutions, and the assumptions that matter most. The goal isn’t to document everything. It’s to figure out what should actually be built and why.',
    image: '/figma/updated/step-direction.webp',
  },
  {
    title: 'Turn It Into a Prototype',
    description: 'We turn the direction into a clickable prototype you can see, use, and share. Now your team has something concrete to discuss, test, and improve, not just another document.',
    image: '/figma/updated/step-prototype.webp',
  },
  {
    title: 'Validate, Then Build',
    description: 'Use the prototype to gather feedback, align stakeholders, and refine the direction. Once the idea is clear and worth pursuing, we can move forward into development.',
    image: '/figma/updated/step-validate.webp',
    width: 362,
    height: 272,
  },
];

export default function ProcessSection() {
  const drag = useRef(null);

  const handlePointerDown = (event) => {
    const scroller = event.currentTarget;
    if (event.pointerType !== 'mouse' || event.button !== 0 || scroller.scrollWidth <= scroller.clientWidth) return;

    event.preventDefault();
    drag.current = { pointerId: event.pointerId, x: event.clientX, left: scroller.scrollLeft };
    scroller.setPointerCapture(event.pointerId);
    scroller.classList.add('is-dragging');
  };

  const handlePointerMove = (event) => {
    if (drag.current?.pointerId !== event.pointerId) return;
    event.currentTarget.scrollLeft = drag.current.left + drag.current.x - event.clientX;
  };

  const stopDragging = (event) => {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    const scroller = event.currentTarget;
    scroller.classList.remove('is-dragging');
    if (scroller.hasPointerCapture(event.pointerId)) scroller.releasePointerCapture(event.pointerId);
  };

  return (
    <section className="process-section" id="how-we-work" aria-labelledby="process-title">
      <div className="process-section-inner">
        <h2 id="process-title">How We Turn Ideas Into Something <span className="section-accent">Buildable</span></h2>
        <p className="process-section-intro">We turn rough ideas into clear product direction, user flows, and prototypes you can validate and build.</p>
        <div className="process-section-scroll" role="region" tabIndex={0} aria-label="How we work: four steps" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={stopDragging} onPointerCancel={stopDragging} onLostPointerCapture={stopDragging}>
          <div className="process-section-cards">
            {steps.map((step) => (
              <article className="process-section-card" data-scroll-reveal="step" key={step.title}>
                <img src={step.image} alt="" width={step.width ?? 418} height={step.height ?? 236} loading="lazy" decoding="async" draggable={false} />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
