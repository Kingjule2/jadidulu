import React, { useState, useRef } from 'react';
import { HelpCircle, AlertCircle, Sparkles } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';
import './ProblemSection.css';

export default function ProblemSection() {
  const [activeView, setActiveView] = useState('planning'); // 'planning' or 'missing'
  const sectionRef = useRef(null);

  useGSAP(() => {
    // ScrollTrigger reveal
    gsap.from('.problem-content-col', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: -40,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.problem-image-col', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: 40,
      duration: 0.9,
      ease: 'power3.out'
    });

    // Subtle continuous floating badges with GSAP
    gsap.to('.badge-top-right', {
      y: -8,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.badge-bottom-left', {
      y: 8,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.5
    });
  }, { scope: sectionRef });

  return (
    <section className="problem-section" id="about" ref={sectionRef}>
      <div className="container problem-container">
        {/* Left Content Column */}
        <div className="problem-content-col">
          {/* Subtle View Switcher Tabs */}
          <div className="perspective-toggle-wrapper">
            <button
              className={`perspective-pill ${activeView === 'planning' ? 'active' : ''}`}
              onClick={() => setActiveView('planning')}
              id="view-stuck-planning"
            >
              The Dilemma
            </button>
            <button
              className={`perspective-pill ${activeView === 'missing' ? 'active' : ''}`}
              onClick={() => setActiveView('missing')}
              id="view-what-missing"
            >
              The Real Issue
            </button>
          </div>

          <div className="problem-header-block">
            <div className="vertical-accent-line"></div>
            <div className="problem-header-text">
              {activeView === 'planning' ? (
                <>
                  <span className="section-eyebrow" id="problem-eyebrow">Still Stuck In Planning?</span>
                  <h2 className="problem-title">
                    You Have the Idea. But<br />
                    It Still Feels Too<br />
                    Unclear to Build.
                  </h2>
                </>
              ) : (
                <>
                  <span className="section-eyebrow" id="problem-eyebrow">Here’s What Actually Missing</span>
                  <h2 className="problem-title">
                    The Problem Isn’t a<br />
                    Lack of Planning.
                  </h2>
                </>
              )}
            </div>
          </div>

          <div className="problem-body-text">
            {activeView === 'planning' ? (
              <p>
                You’ve spent time thinking it through, discussing it, and trying to move it forward. <strong>But the idea still feels too uncertain to confidently take the next step.</strong> What’s getting in the way?
              </p>
            ) : (
              <p>
                The idea still has no shared form. Abstract ideas leave room for interpretation. <strong>A prototype turns those assumptions into something your team can see, click through, discuss, and improve together.</strong>
              </p>
            )}
          </div>

          {/* Core Pain Points Checklist */}
          <div className="problem-points-list">
            <div className="problem-point-item">
              <div className="point-icon"><AlertCircle size={18} /></div>
              <span>Endless feature discussions without a visual reference</span>
            </div>
            <div className="problem-point-item">
              <div className="point-icon"><AlertCircle size={18} /></div>
              <span>High development quote risks before validating user flow</span>
            </div>
          </div>
        </div>

        {/* Right Illustration Column */}
        <div className="problem-image-col">
          <div className="image-frame-wrapper">
            <img 
              src="/images/problem-illustration.jpg" 
              alt="Professional overwhelmed with app planning requirements and documents" 
              className="problem-hero-img"
              id="problem-illustration-img"
            />
            {/* Floating visual badges */}
            <div className="floating-badge badge-top-right">
              <span className="badge-dot"></span>
              <span>Need Feedback?</span>
            </div>
            <div className="floating-badge badge-bottom-left">
              <span>Sticky Specs & Wireframes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
