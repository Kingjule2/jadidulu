import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './PortfolioSection.css';

const projects = [
  {
    id: 1,
    title: 'GrowthSync — Real-Time SaaS Analytics Platform',
    categoryLabel: 'Web Application',
    image: '/images/portfolio-saas.jpg',
    description: 'Turned a rough 2-page brief into a full-fledged enterprise revenue dashboard with interactive charts, churn analytics, and multi-tenant billing.',
  },
  {
    id: 2,
    title: 'VITA — Daily Health & Activity Companion',
    categoryLabel: 'Mobile App',
    image: '/images/portfolio-mobile.jpg',
    description: 'Designed a high-retention fitness and wellness app from user interviews and low-fidelity sketches into a polished App Store experience.',
  },
  {
    id: 3,
    title: 'FlowPilot — Intelligent Agent Workflow Engine',
    categoryLabel: 'AI Development',
    image: '/images/portfolio-saas.jpg',
    description: 'Architected an automated AI workflow orchestrator that processes customer inquiries, extracts structured intents, and updates CRMs autonomously.',
  },
];

function cardPosition(index, active, count, direction) {
  const forward = (index - active + count) % count;
  const backward = (active - index + count) % count;

  if (forward === 0) return 'center';
  if (count === 2) return direction === 1 ? 'previous' : 'next';
  if (forward === 1) return 'next';
  if (backward === 1) return 'previous';
  return forward <= backward ? 'far-next' : 'far-previous';
}

export default function PortfolioSection({ items = projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(-1);
  const swipeStart = useRef(null);
  const count = items.length;
  const active = count ? activeIndex % count : 0;

  if (!count) return null;

  const move = (step) => {
    setDirection(step);
    setActiveIndex((index) => (index % count + step + count) % count);
  };

  const handlePointerDown = (event) => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    if (event.target.closest('button')) return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event) => {
    if (!swipeStart.current) return;
    const distanceX = event.clientX - swipeStart.current.x;
    const distanceY = event.clientY - swipeStart.current.y;
    swipeStart.current = null;

    if (Math.abs(distanceX) > 48 && Math.abs(distanceX) > Math.abs(distanceY)) {
      move(distanceX < 0 ? 1 : -1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  };

  return (
    <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
      <h2 id="portfolio-title">See What Our Team Has Built.</h2>
      <div
        className="portfolio-carousel"
        role="group"
        aria-roledescription="carousel"
        aria-label="Portfolio projects. Use arrow keys or swipe to browse."
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { swipeStart.current = null; }}
      >
        <div className="portfolio-deck">
          {items.map((project, index) => {
            const position = cardPosition(index, active, count, direction);
            return (
              <article
                className="portfolio-card"
                data-position={position}
                aria-hidden={position !== 'center'}
                key={project.id}
              >
                <div className="portfolio-card-image">
                  <img src={project.image} alt="" loading="lazy" draggable="false" />
                  <span className="portfolio-card-category">{project.categoryLabel}</span>
                </div>
                <div className="portfolio-card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </article>
            );
          })}
        </div>
        {count > 1 && (
          <div className="portfolio-controls">
            <button type="button" className="portfolio-arrow" aria-label="Previous project" onClick={() => move(-1)}>
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <p className="portfolio-status" aria-live="polite" aria-atomic="true">
              <span className="portfolio-status-active">{String(active + 1).padStart(2, '0')}</span>
              <span> / {String(count).padStart(2, '0')}</span>
              <span className="portfolio-sr-only"> — {items[active].title}</span>
            </p>
            <button type="button" className="portfolio-arrow" aria-label="Next project" onClick={() => move(1)}>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
