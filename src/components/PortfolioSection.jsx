import './PortfolioSection.css';

const projects = [
  {
    name: 'Jaga Anabul',
    logo: '/figma/updated/jaga-anabul-logo.png',
    description: 'A transparent fundraising platform for animal welfare.',
  },
  {
    name: 'Vclass',
    logo: '/figma/updated/vclass-logo.png',
    description: 'An integrated digital learning and school management platform.',
  },
];

export default function PortfolioSection() {
  return (
    <section className="portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
      <div className="portfolio-content">
        <div className="portfolio-intro" data-scroll-reveal="rise">
          <h2 id="portfolio-title">See What Our Team Has Built</h2>
          <p>Explore real products we’ve designed and built from early ideas to working digital experiences.</p>
          <span className="portfolio-overview-label">
            See Our Portfolio
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3Z" />
            </svg>
          </span>
        </div>
        <div className="portfolio-projects">
          {projects.map((project) => (
            <article className="portfolio-project" data-scroll-reveal="rise" key={project.name}>
              <img className="portfolio-project-logo" src={project.logo} alt="" loading="lazy" />
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className="portfolio-product-label">
                <span className="portfolio-product-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </span>
                <span>Explore Product</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
