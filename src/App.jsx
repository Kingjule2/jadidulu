import { useEffect, useState } from 'react';
import PortfolioSection from './components/PortfolioSection';
import FaqSection from './components/FaqSection';
import './App.css';

const asset = (name) => '/figma/' + name;

const steps = [
  {
    title: 'Tell Us What You’re Thinking',
    description: 'Bring the idea, problem, rough notes, or even the things you’re still unsure about. We’ll start by understanding your goals, users, context, and constraints.',
  },
  {
    title: 'Shape the Direction',
    description: 'Together, we explore the user flow, possible solutions, and the assumptions that matter most. The goal isn’t to document everything. It’s to figure out what should actually be built and why.',
  },
  {
    title: 'Turn It Into a Prototype',
    description: 'We turn the direction into a clickable prototype you can see, use, and share. Now your team has something concrete to discuss, test, and improve, not just another document.',
  },
  {
    title: 'Validate, Then Build',
    description: 'Use the prototype to gather feedback, align stakeholders, and refine the direction. Once the idea is clear and worth pursuing, we can move forward into development.',
  },
];

const services = [
  'Web Application Development',
  'Mobile App Development',
  'Dekstop App Development',
  'AI Development',
];

function App() {
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const [processPage, setProcessPage] = useState(0);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const desktopZoom = viewportWidth > 1024 && viewportWidth < 1440
    ? viewportWidth / 1440
    : undefined;

  return (
    <div className="figma-page" style={desktopZoom ? { width: 1440, zoom: desktopZoom } : undefined}>
      <header className="site-header" id="top">
        <a className="site-logo" href="#top" aria-label="Jadidulu home">
          <img src={asset('frame1.png')} alt="Jadidulu" />
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#about">About Us</a>
          <a href="#how-we-work">How We Work</a>
          <a href="#portfolio">Our Work</a>
          <a href="#faq">FAQ</a>
        </nav>
        <button className="header-cta" type="button">
          Bring Your Idea
        </button>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <img className="hero-wave" src={asset('vector2.svg')} alt="" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-badge">
              <img src={asset('fi-rr-magic-wand.svg')} alt="" />
              <span>You Bring the Idea. We Give It Shape.</span>
            </div>
            <h1 id="hero-title">Have an <span>App Idea</span> but Not Sure Where to Start?</h1>
            <p className="hero-description">Tell us what you want to build or the problem you want to solve. We’ll help turn it into a clear product direction, user flow, and clickable prototype you can test and validate before committing to development.</p>
            <div className="hero-actions">
              <button className="figma-button primary-button" type="button">
                Tell Us Your Idea
                <img src={asset('icon-wrapper.svg')} alt="" />
              </button>
              <a className="figma-button outline-button" href="#how-we-work">
                See How We Work
                <img src={asset('icon-wrapper1.svg')} alt="" />
              </a>
            </div>
            <p className="hero-note">No complete requirements or technical specs needed to get started.</p>
          </div>
        </section>

        <section className="problem-section section-width" id="about" aria-labelledby="problem-title">
          <div className="problem-copy">
            <div className="problem-accent" aria-hidden="true" />
            <div className="problem-text">
              <p className="problem-eyebrow">Still Stuck in Planning?</p>
              <h2 id="problem-title">You Have the Idea. But It Still Feels Too Unclear to Build.</h2>
              <p className="problem-description">You’ve spent time thinking it through, discussing it, and trying to move it forward. <strong>But the idea still feels too uncertain to confidently take the next step</strong>. What’s getting in the way?</p>
            </div>
          </div>
          <div className="problem-image">
            <img src={asset('chat-gpt-image-sep242026122037pm1.png')} alt="A founder working through a cluttered planning process" />
          </div>
        </section>

        <section className="solution-section section-width" aria-labelledby="solution-title">
          <div className="solution-image">
            <img src={asset('frame21.png')} alt="A team turning an app idea into a clickable prototype" />
          </div>
          <div className="solution-copy">
            <h2 id="solution-title">From a Rough Idea to Something You Can Actually <span>Build</span>.</h2>
            <p>Tell us what you want to build or the problem you want to solve. We’ll help turn it into a clear product direction, user flow, and clickable prototype you can test and validate before committing to development.</p>
            <p className="solution-emphasis">And when the direction is clear enough, we can help take it further into a working product.</p>
          </div>
        </section>

        <section className="process-section section-width" id="how-we-work" aria-labelledby="process-title">
          <div className="process-left">
            <h2 id="process-title">How We Turn Ideas Into Something <span>Buildable</span></h2>
            <ul className="service-list">
              {services.map((service) => <li key={service}>{service}</li>)}
            </ul>
          </div>
          <div className="process-right">
            <div className="process-rule" aria-hidden="true">
              <span className={processPage === 1 ? 'complete' : ''} />
            </div>
            <div
              className="process-steps"
              role="region"
              tabIndex={0}
              aria-label="How we work steps. Scroll to read the next two steps."
              onScroll={(event) => {
                const element = event.currentTarget;
                setProcessPage(element.scrollTop >= element.clientHeight / 2 ? 1 : 0);
              }}
            >
              {[steps.slice(0, 2), steps.slice(2)].map((page, pageIndex) => (
                <div className="process-panel" key={pageIndex}>
                  {page.map((step) => (
                    <div className="process-step" key={step.title}>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <PortfolioSection />
        <FaqSection />
      </main>
    </div>
  );
}

export default App;
