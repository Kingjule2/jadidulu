import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import './ProcessSection.css';

const services = [
  'Web Application Development',
  'Mobile App Development',
  'Dekstop App Development',
  'AI Development'
];

const steps = [
  {
    number: '01',
    title: "Tell Us What You're Thinking",
    description: "Bring the idea, problem, rough notes, or even the things you’re still unsure about. We’ll start by understanding your goals, users, context, and constraints."
  },
  {
    number: '02',
    title: "Shape the Direction",
    description: "Together, we explore the user flow, possible solutions, and the assumptions that matter most. The goal isn’t to document everything. It’s to figure out what should actually be built and why."
  },
  {
    number: '03',
    title: "Turn It Into a Prototype",
    description: "We turn the direction into a clickable prototype you can see, use, and share. Now your team has something concrete to discuss, test, and improve, not just another document."
  },
  {
    number: '04',
    title: "Validate, Then Build",
    description: "Use the prototype to gather feedback, align stakeholders, and refine the direction. Once the idea is clear and worth pursuing, we can move forward into development."
  }
];

export default function ProcessSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    tl.from('.process-main-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
      .from('.service-item', {
        opacity: 0,
        x: -25,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.timeline-cyan-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 0.8,
        ease: 'power2.inOut'
      }, '-=0.5')
      .from('.step-card', {
        opacity: 0,
        x: 30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out'
      }, '-=0.6');
  }, { scope: sectionRef });

  return (
    <section className="process-section" id="how-we-work" ref={sectionRef}>
      <div className="container process-container">
        {/* Left Column: Title & Service List */}
        <div className="process-left-col">
          <h2 className="process-main-title" id="process-title">
            How We Turn Ideas Into<br />
            Something <span className="highlight-purple">Buildable</span>
          </h2>

          <div className="service-list">
            {services.map((service, idx) => (
              <div key={idx} className="service-item">
                <span className="service-item-text">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Steps divided in 2, scroll to see the rest */}
        <div className="process-right-col">
          <div className="steps-timeline-wrapper">
            <div className="timeline-cyan-line" aria-hidden="true"></div>

            <div className="steps-scroll-container" tabIndex={0} aria-label="Process steps (scroll to see more)">
              <div className="steps-list">
                {steps.map((step, idx) => (
                  <div key={idx} className="step-card" id={`step-${step.number}`}>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

