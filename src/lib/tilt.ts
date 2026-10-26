import gsap from 'gsap';

export function initTiltCards() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || reduceMotion) return;

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const glow = card.querySelector<HTMLElement>('[data-tilt-glow]');

    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      const rotateY = (relX - 0.5) * 14;
      const rotateX = (0.5 - relY) * 14;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 800,
        duration: 0.35,
        ease: 'power2.out',
      });

      if (glow) {
        gsap.to(glow, {
          opacity: 1,
          x: relX * rect.width,
          y: relY * rect.height,
          duration: 0.25,
        });
      }
    });

    card.addEventListener('pointerleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
      if (glow) gsap.to(glow, { opacity: 0, duration: 0.3 });
    });
  });
}
