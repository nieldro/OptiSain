/*
  Cielo fijo detras de toda la pagina: estrellas en varias profundidades que se desplazan
  con el scroll a distinta velocidad (paralaje) y una estrella fugaz de vez en cuando.
  Va por detras del contenido, nunca encima. Con "reducir movimiento" se dibuja una vez.
*/
interface Star {
  x: number;
  y: number;
  d: number; // profundidad 0.15 - 1
  s: number; // radio
  ph: number;
  sp: number;
  c: string;
}

export function initStarfield() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.createElement('canvas');
  canvas.className = 'starfield';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // En celulares: pocas estrellas, sin parpadeo continuo y solo se redibuja cuando hay scroll.
  const light = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
  let W = 0;
  let H = 0;
  let dpr = 1;
  let stars: Star[] = [];
  const colors = ['211,216,226', '147,155,170', '255,181,71'];

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = light ? 40 : Math.max(50, Math.min(120, Math.floor((W * H) / 14000)));
    stars = Array.from({ length: n }, () => {
      const d = 0.15 + Math.random() * 0.85;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        d,
        s: 0.35 + d * 1.1,
        ph: Math.random() * Math.PI * 2,
        sp: 0.6 + Math.random() * 1.6,
        c: colors[Math.random() < 0.03 ? 2 : Math.random() < 0.5 ? 1 : 0],
      };
    });
  }

  function draw(t: number) {
    ctx!.clearRect(0, 0, W, H);
    const sy = reduce ? 0 : window.scrollY;
    for (const s of stars) {
      const y = (((s.y - sy * s.d * 0.22) % H) + H) % H;
      const tw = reduce || light ? 1 : 0.65 + 0.35 * Math.sin(t * 0.001 * s.sp + s.ph);
      ctx!.fillStyle = `rgba(${s.c},${(0.18 + s.d * 0.55) * tw})`;
      ctx!.beginPath();
      ctx!.arc(s.x, y, s.s, 0, Math.PI * 2);
      ctx!.fill();
    }

  }

  build();
  window.addEventListener('resize', () => {
    build();
    if (reduce) draw(0);
  });

  if (reduce) {
    draw(0);
    return;
  }

  let lastSy = -1;
  function loop(t: number) {
    if (!document.hidden) {
      const sy = window.scrollY;
      if (!light || sy !== lastSy) {
        draw(t);
        lastSy = sy;
      }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
