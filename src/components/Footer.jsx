import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import './Footer.css';

export default function Footer({ onOpenModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrap">
      <div className="container footer-container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="navbar-logo footer-logo">
              <div className="logo-symbol" aria-hidden="true">
                <span className="bar bar-1"></span>
                <span className="bar bar-2"></span>
                <span className="bar bar-3"></span>
              </div>
              <span className="logo-text">jadidulu</span>
            </div>
            <p className="footer-tagline">
              You Bring the Idea. We Give It Shape. Turn rough product ideas into interactive prototypes and market-ready software.
            </p>
            <div className="footer-reassurance-chip">
              <Sparkles size={14} />
              <span>Free Initial Consultation</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-list">
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#how-we-work">How We Work</a></li>
              <li><a href="#portfolio">Our Work</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Capabilities</h4>
            <ul className="footer-nav-list">
              <li><a href="#how-we-work">Web Application Development</a></li>
              <li><a href="#how-we-work">Mobile App Development</a></li>
              <li><a href="#how-we-work">Desktop App Development</a></li>
              <li><a href="#how-we-work">AI Agent & LLM Solutions</a></li>
              <li><a href="#how-we-work">Clickable UI/UX Prototypes</a></li>
            </ul>
          </div>

          {/* CTA Box */}
          <div className="footer-cta-col">
            <h4 className="footer-col-title">Ready to Start?</h4>
            <p className="footer-cta-desc">
              Have an app idea in mind? Let's turn it into a clickable prototype.
            </p>
            <button onClick={onOpenModal} className="btn btn-primary btn-sm footer-btn" id="footer-cta-btn">
              Bring Your Idea
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} Jadidulu. All rights reserved.
          </p>
          <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Scroll back to top">
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
