import { useState } from 'react';
import './FaqSection.css';

const faqs = [
  {
    question: 'Who is Jadidulu?',
    answer: 'Jadidulu helps turn early-stage app ideas and business problems into a clearer product direction, user flow, and clickable prototype, then helps move the project into development when the direction is ready.',
  },
  {
    question: 'Is the consultation and prototype free?',
    answer: 'The initial consultation is free. Depending on the project, we may also create an early prototype concept to help make the idea more tangible before moving into a full engagement.',
  },
  {
    question: 'Do I need complete requirements before we start?',
    answer: 'No. You can start with an idea, a problem, rough notes, or something you’re still trying to figure out. We’ll help shape the direction from there.',
  },
  {
    question: 'What if I know the problem, but not the solution yet?',
    answer: 'That’s completely fine. We start by understanding the context, users, needs, and constraints before exploring possible solution directions.',
  },
  {
    question: 'What’s the difference between a prototype and a finished app?',
    answer: 'That’s completely fine. We start by understanding the context, users, needs, and constraints before exploring possible solution directions.',
  },
  {
    question: 'Can the prototype be developed into a real product?',
    answer: 'Yes. Once the idea is clear enough and worth pursuing, the project can continue into development.',
  },
  {
    question: 'What should I prepare before the first discussion?',
    answer: 'You don’t need a polished brief. Bring whatever you already have, your idea, the problem you’re trying to solve, notes, feedback, or any constraints we should know about.',
  },
];

export default function FaqSection() {
  const [openItems, setOpenItems] = useState(() => faqs.map((_, index) => index));

  const toggleItem = (index) => {
    setOpenItems((current) => current.includes(index)
      ? current.filter((item) => item !== index)
      : [...current, index]);
  };

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently Asked Question</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openItems.includes(index);
          return (
            <div className="faq-item" key={faq.question}>
              <button
                className="faq-question"
                type="button"
                aria-expanded={isOpen}
                aria-controls={'faq-answer-' + index}
                onClick={() => toggleItem(index)}
              >
                <span>{faq.question}</span>
                <img src="/figma/fi-rr-angle-small-right.svg" alt="" />
              </button>
              {isOpen && <p className="faq-answer" id={'faq-answer-' + index}>{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
