import React, { useRef } from 'react';
import { Sparkles, MessageSquare, Info } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import './Hero.css';

export default function Hero({ onOpenModal }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });

    tl.from('.hero-badge-wrapper', {
      opacity: 0,
      y: -20,
      duration: 0.6
    })
    .from('.hero-title', {
      opacity: 0,
      y: 30,
      duration: 0.9
    }, '-=0.3')
    .from('.hero-description', {
      opacity: 0,
      y: 20,
      duration: 0.7
    }, '-=0.4')
    .from('.hero-actions-row .btn', {
      opacity: 0,
      y: 15,
      stagger: 0.15,
      duration: 0.6
    }, '-=0.4')
    .from('.hero-reassurance', {
      opacity: 0,
      scale: 0.95,
      duration: 0.6
    }, '-=0.3');
  }, { scope: containerRef });

  const scrollToHowWeWork = () => {
    const el = document.getElementById('how-we-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero" ref={containerRef}>
      <div className="container hero-container">
        {/* Top Feature Pill Badge */}
        <div className="hero-badge-wrapper">
          <div className="pill-badge hero-pill" id="hero-feature-badge">
            <Sparkles size={16} className="hero-badge-icon" />
            <span>You Bring the Idea. We Give It Shape.</span>
          </div>
        </div>

        {/* Hero Headline */}
        <h1 className="hero-title" id="hero-main-title">
          Have an <span className="highlight-blue">App Idea</span> but Not<br className="desktop-break" /> Sure Where to Start?
        </h1>

        {/* Hero Subtitle */}
        <p className="hero-description" id="hero-description-text">
          Tell us what you want to build or the problem you want to solve. We’ll help turn it into a clear product direction, user flow, and clickable prototype you can test and validate before committing to development.
        </p>

        {/* Action Buttons Row */}
        <div className="hero-actions-row">
          <button 
            onClick={onOpenModal} 
            className="btn btn-primary hero-btn-main"
            id="hero-tell-idea-btn"
          >
            <span>Tell Us Your Idea</span>
            <MessageSquare size={18} />
          </button>
          
          <button 
            onClick={scrollToHowWeWork} 
            className="btn btn-outline hero-btn-secondary"
            id="hero-see-work-btn"
          >
            <span>See How We Work</span>
            <Info size={18} />
          </button>
        </div>

        {/* Reassurance text */}
        <p className="hero-reassurance" id="hero-reassurance-note">
          No complete requirements or technical specs needed to get started.
        </p>
      </div>
    </section>
  );
}
