import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useEffect, useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import ProcessSection from './components/ProcessSection';
import PortfolioSection from './components/PortfolioSection';
import FaqSection from './components/FaqSection';
import './App.css';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

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

  useEffect(() => {
    // Keep native touch scrolling and honor reduced-motion; only fine-pointer
    // desktop scrolling needs ScrollSmoother's transformed content.
    const media = window.matchMedia('(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let smoother;
    let hashFrame;

    const alignHash = () => {
      hashFrame = requestAnimationFrame(() => {
        hashFrame = requestAnimationFrame(() => {
          const target = document.getElementById(window.location.hash.slice(1));
          if (target && smoother) smoother.scrollTo(target, false, 'top 84px');
        });
      });
    };

    const updateSmoother = () => {
      cancelAnimationFrame(hashFrame);
      window.removeEventListener('load', alignHash);
      smoother?.kill();
      smoother = undefined;
      document.documentElement.style.scrollBehavior = '';
      document.querySelector('.figma-page').classList.toggle('smooth-active', media.matches);

      if (media.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
        smoother = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 0.8,
          smoothTouch: 0,
        });

        // Wait until native hash restoration completes before aligning through GSAP.
        if (window.location.hash) {
          if (document.readyState === 'complete') alignHash();
          else window.addEventListener('load', alignHash, { once: true });
        }
      }
    };

    updateSmoother();
    media.addEventListener('change', updateSmoother);
    return () => {
      media.removeEventListener('change', updateSmoother);
      window.removeEventListener('load', alignHash);
      cancelAnimationFrame(hashFrame);
      smoother?.kill();
      document.documentElement.style.scrollBehavior = '';
      document.querySelector('.figma-page').classList.remove('smooth-active');
    };
  }, []);

  const handleAnchorClick = (event) => {
    const link = event.target.closest('a[href^="#"]');
    const smoother = ScrollSmoother.get();
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
          <div className="problem-card" data-scroll-reveal="soft">
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
      </div>
    </div>
  );
}

export default App;
