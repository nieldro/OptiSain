import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCounters() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    const target = Number(el.dataset.target ?? '0');

    if (reduceMotion) {
      el.textContent = String(target);
      return;
    }

    const counter = { value: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          value: target,
          duration: 1.3,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      },
    });
  });
}
