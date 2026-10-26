/*
  Anillo que sigue al cursor y se agranda sobre lo que se puede tocar.
  Solo con puntero fino; no se crea en tactil ni con "reducir movimiento".
*/
export function initCursorRing() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ring);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let rx = x;
  let ry = y;

  window.addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX;
      y = e.clientY;
      ring.setAttribute('data-on', '');
      const t = e.target as Element | null;
      const hot = !!t?.closest('a, button, summary, input, select, textarea, [data-filter]');
      ring.toggleAttribute('data-hot', hot);
    },
    { passive: true }
  );
  document.addEventListener('pointerleave', () => ring.removeAttribute('data-on'));

  const loop = () => {
    rx += (x - rx) * 0.2;
    ry += (y - ry) * 0.2;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(loop);
  };
  loop();
}
