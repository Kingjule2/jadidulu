import { useEffect, useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import ProcessSection from './components/ProcessSection';
import PortfolioSection from './components/PortfolioSection';
import FaqSection from './components/FaqSection';
import './App.css';

const image = (name) => `/figma/updated/${name}`;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('[data-scroll-reveal]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);


  return (
    <div className="figma-page">
      <header className="site-header" id="top">
        <a className="site-logo" href="#top" aria-label="Jadidulu home">
          <img src={image('logo.png')} alt="jadidulu" />
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
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="hero-eyebrow">You Bring the Idea. We Give It Shape.</p>
            <h1 id="hero-title">Have an App Idea but Not Sure<br className="desktop-break" /> Where to Start?</h1>
            <p className="hero-description">Tell us what you want to build or the problem you want to solve. We’ll help turn it into a clear product direction, user flow, and clickable prototype you can test and validate before committing to development.</p>
            <div className="hero-actions">
              <a className="figma-button primary-button" href="#contact">
                Tell Us Your Idea
                <img src="/figma/icon-wrapper.svg" alt="" />
              </a>
              <a className="figma-button outline-button" href="#how-we-work">
                See How We Work
                <img src="/figma/icon-wrapper1.svg" alt="" />
              </a>
            </div>
          </div>
        </section>

        <section className="problem-section" id="about" aria-labelledby="problem-title">
          <div className="problem-card" data-scroll-reveal="side">
            <p className="problem-eyebrow">Still Stuck in Planning?</p>
            <h2 id="problem-title">You Have the Idea. But It Still Feels Too Unclear to Build.</h2>
            <p>You’ve spent time thinking it through, discussing it, and trying to move it forward. But the idea still feels too uncertain to confidently take the next step. What’s getting in the way?</p>
            <a className="problem-link" href="#solution">See What’s Missing <ChevronRight size={17} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="solution-section" id="solution" aria-labelledby="solution-title">
          <div className="solution-inner">
            <div className="solution-copy" data-scroll-reveal="rise">
              <h2 id="solution-title">From a Rough Idea to Something You Can Actually <span>Build</span></h2>
              <p>Tell us what you want to build or the problem you want to solve. We’ll help turn it into a clear product direction, user flow, and clickable prototype you can test and validate before committing to development.</p>
              <p className="solution-emphasis">And when the direction is clear enough, we can help take it further into a working product.</p>
            </div>
            <img className="solution-image" data-scroll-reveal="side" src={image('solution-illustration.png')} alt="An idea becoming a product flow and a clickable prototype" loading="lazy" />
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
          <img src={image('logo.png')} alt="jadidulu" />
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
  );
}

export default App;
