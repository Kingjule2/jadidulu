import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function startDesktopMotion(onSmoother) {
  let hashFrame;
  const page = document.querySelector('.figma-page');
  page.classList.add('smooth-active');
  document.documentElement.style.scrollBehavior = 'auto';

  const smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1,
    smoothTouch: 0,
  });
  onSmoother(smoother);

  const heroMotion = gsap.context(() => {
    gsap.to('.hero-content', {
      y: -48,
      opacity: 0.45,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top+=84',
        end: 'bottom top+=84',
        scrub: true,
      },
    });
  });

  const alignHash = () => {
    hashFrame = requestAnimationFrame(() => {
      hashFrame = requestAnimationFrame(() => {
        const target = document.getElementById(window.location.hash.slice(1));
        if (target) smoother.scrollTo(target, false, 'top 84px');
      });
    });
  };

  if (window.location.hash) {
    if (document.readyState === 'complete') alignHash();
    else window.addEventListener('load', alignHash, { once: true });
  }

  return () => {
    window.removeEventListener('load', alignHash);
    cancelAnimationFrame(hashFrame);
    heroMotion.revert();
    smoother.kill();
    onSmoother(null);
    document.documentElement.style.scrollBehavior = '';
    page.classList.remove('smooth-active');
  };
}
