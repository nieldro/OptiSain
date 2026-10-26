import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/*
  Cada h2 sube palabra por palabra desde una mascara, como el titulo del hero.
  Un solo gesto para todos los titulos de seccion; con "reducir movimiento" no se toca nada.
*/
export function initHeadingReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll<HTMLElement>('main h2').forEach((h) => {
    const text = (h.textContent ?? '').trim();
    if (!text) return;

    // Lo anima este modulo, no el reveal generico de bloques.
    h.removeAttribute('data-reveal');
    h.setAttribute('aria-label', text);
    h.textContent = '';

    text.split(/\s+/).forEach((word, i, all) => {
      const mask = document.createElement('span');
      mask.className = 'hw';
      mask.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.className = 'hw-i';
      inner.textContent = word;
      mask.appendChild(inner);
      h.appendChild(mask);
      if (i < all.length - 1) h.appendChild(document.createTextNode(' '));
    });

    const words = h.querySelectorAll('.hw-i');
    gsap.set(words, { yPercent: 105 });
    gsap.to(words, {
      yPercent: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.04,
      scrollTrigger: { trigger: h, start: 'top 88%', once: true },
    });
  });
}
