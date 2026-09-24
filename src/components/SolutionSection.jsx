import React, { useRef } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import './SolutionSection.css';

export default function SolutionSection({ onOpenModal }) {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });

    tl.from('.solution-image-col', {
      opacity: 0,
      scale: 0.95,
      x: -30,
      duration: 0.9,
      ease: 'power3.out'
    })
    .from('.solution-badge-floating', {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.6,
      ease: 'back.out(1.5)'
    }, '-=0.4')
    .from('.solution-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.solution-description-1, .solution-description-2', {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.solution-perk-item', {
      opacity: 0,
      x: 20,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.solution-cta-row', {
      opacity: 0,
      y: 15,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.3');
  }, { scope: sectionRef });

  return (
    <section className="solution-section" id="solution" ref={sectionRef}>
      <div className="container solution-container">
        {/* Left Illustration Column */}
        <div className="solution-image-col">
          <div className="solution-frame-wrapper">
            <img 
              src="/images/solution-illustration.jpg" 
              alt="Two product specialists collaborating happily over clickable app prototype" 
              className="solution-hero-img"
              id="solution-illustration-img"
            />
            {/* Interactive Badge */}
            <div className="solution-badge-floating">
              <span className="prototype-icon">📱</span>
              <div>
                <strong>Clickable Prototype</strong>
                <span>Tested & Validated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="solution-content-col">
          <h2 className="solution-title" id="solution-title">
            From a Rough Idea to<br />
            Something You Can<br />
            Actually <span className="highlight-purple">Build</span>.
          </h2>

          <p className="solution-description-1">
            Tell us what you want to build or the problem you want to solve. We’ll help turn it into a clear product direction, user flow, and clickable prototype you can test and validate before committing to development.
          </p>

          <p className="solution-description-2">
            And when the direction is clear enough, we can help take it further into a working product.
          </p>

          <div className="solution-perks-list">
            <div className="solution-perk-item">
              <CheckCircle2 size={20} className="perk-icon" />
              <span>Interactive wireframes your users can test right away</span>
            </div>
            <div className="solution-perk-item">
              <CheckCircle2 size={20} className="perk-icon" />
              <span>Aligned user journeys to eliminate scope creep</span>
            </div>
            <div className="solution-perk-item">
              <CheckCircle2 size={20} className="perk-icon" />
              <span>Direct path from validated Figma design to clean code</span>
            </div>
          </div>

          <div className="solution-cta-row">
            <button 
              onClick={onOpenModal} 
              className="btn btn-primary solution-cta-btn"
              id="solution-start-btn"
            >
              <span>Start With Your Rough Idea</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
