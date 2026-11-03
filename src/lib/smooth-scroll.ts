import Lenis from 'lenis';
import gsap from 'gsap';

/*
  Scroll suave con Lenis, atado al ticker de GSAP para que ScrollTrigger y Lenis
  lean el mismo fotograma. Emite "optisain:scroll" en cada desplazamiento (lo escucha el
  Header). Devuelve undefined si no se activa: tactil o "reducir movimiento".
*/
export function initSmoothScroll() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // En tactil el scroll nativo ya es suave; Lenis solo le anade trabajo.
  const touch = window.matchMedia('(pointer: coarse)').matches;
  if (reduceMotion || touch) return;

  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });

  lenis.on('scroll', () => {
    window.dispatchEvent(new CustomEvent('optisain:scroll'));
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
