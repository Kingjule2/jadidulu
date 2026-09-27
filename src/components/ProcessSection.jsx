import './ProcessSection.css';

const steps = [
  {
    title: 'Tell Us What You’re Thinking',
    description: 'Bring the idea, problem, rough notes, or even the things you’re still unsure about. We’ll start by understanding your goals, users, context, and constraints.',
    image: '/figma/updated/step-idea.png',
  },
  {
    title: 'Shape the Direction',
    description: 'Together, we explore the user flow, possible solutions, and the assumptions that matter most. The goal isn’t to document everything. It’s to figure out what should actually be built and why.',
    image: '/figma/updated/step-direction.png',
  },
  {
    title: 'Turn It Into a Prototype',
    description: 'We turn the direction into a clickable prototype you can see, use, and share. Now your team has something concrete to discuss, test, and improve, not just another document.',
    image: '/figma/updated/step-prototype.png',
  },
  {
    title: 'Validate, Then Build',
    description: 'Use the prototype to gather feedback, align stakeholders, and refine the direction. Once the idea is clear and worth pursuing, we can move forward into development.',
    image: '/figma/updated/step-validate.png',
  },
];

export default function ProcessSection() {
  return (
    <section className="process-section" id="how-we-work" aria-labelledby="process-title">
      <div className="process-section-inner">
        <h2 id="process-title" data-scroll-reveal="rise">How We Turn Ideas Into Something <span>Buildable</span></h2>
        <p className="process-section-intro">We turn rough ideas into clear product direction, user flows, and prototypes you can validate and build.</p>
        <div className="process-section-scroll" role="region" tabIndex={0} aria-label="How we work: four steps">
          <div className="process-section-cards">
            {steps.map((step) => (
              <article className="process-section-card" data-scroll-reveal="form" key={step.title}>
                <img src={step.image} alt="" width="418" height="236" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
