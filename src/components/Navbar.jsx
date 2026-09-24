import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onOpenModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#" className="navbar-logo" id="nav-brand-logo">
          <div className="logo-symbol" aria-hidden="true">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
          </div>
          <span className="logo-text">jadidulu</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          <a href="#about" className="nav-link" id="nav-about">About Us</a>
          <a href="#how-we-work" className="nav-link" id="nav-how-we-work">How We Work</a>
          <a href="#portfolio" className="nav-link" id="nav-our-work">Our Work</a>
          <a href="#faq" className="nav-link" id="nav-faq">FAQ</a>
        </nav>

        {/* CTA Button */}
        <div className="navbar-action">
          <button 
            onClick={onOpenModal} 
            className="btn btn-outline btn-sm nav-cta-btn"
            id="nav-bring-idea-btn"
          >
            Bring Your Idea
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in" id="mobile-nav-drawer">
          <nav className="mobile-nav-links">
            <a 
              href="#about" 
              className="mobile-nav-link" 
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a 
              href="#how-we-work" 
              className="mobile-nav-link" 
              onClick={() => setMobileMenuOpen(false)}
            >
              How We Work
            </a>
            <a 
              href="#portfolio" 
              className="mobile-nav-link" 
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Work
            </a>
            <a 
              href="#faq" 
              className="mobile-nav-link" 
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenModal(); }} 
              className="btn btn-primary"
              style={{ marginTop: '12px' }}
            >
              <Sparkles size={16} />
              Bring Your Idea
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
