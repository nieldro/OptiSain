import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');

  groups.forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!items.length) return;

    if (reduceMotion) {
      items.forEach((item) => item.classList.remove('opacity-0', 'translate-y-6'));
      return;
    }

    gsap.set(items, { opacity: 0, y: 14 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.07,
      scrollTrigger: {
        trigger: group,
        start: 'top 82%',
        once: true,
      },
    });
  });

  // Elementos individuales sin agrupar
  document.querySelectorAll<HTMLElement>('[data-reveal-solo]').forEach((el) => {
    if (reduceMotion) {
      el.classList.remove('opacity-0', 'translate-y-6');
      return;
    }
    gsap.set(el, { opacity: 0, y: 14 });
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });
}
