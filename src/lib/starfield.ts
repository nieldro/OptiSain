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
    const n = Math.max(60, Math.min(170, Math.floor((W * H) / 9500)));
    stars = Array.from({ length: n }, () => {
      const d = 0.15 + Math.random() * 0.85;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        d,
        s: 0.35 + d * 1.1,
        ph: Math.random() * Math.PI * 2,
        sp: 0.6 + Math.random() * 1.6,
        c: colors[Math.random() < 0.08 ? 2 : Math.random() < 0.45 ? 1 : 0],
      };
    });
  }

  let shoot: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
  let nextShoot = performance.now() + 5000 + Math.random() * 6000;

  function draw(t: number) {
    ctx!.clearRect(0, 0, W, H);
    const sy = reduce ? 0 : window.scrollY;
    for (const s of stars) {
      const y = (((s.y - sy * s.d * 0.22) % H) + H) % H;
      const tw = reduce ? 1 : 0.65 + 0.35 * Math.sin(t * 0.001 * s.sp + s.ph);
      ctx!.fillStyle = `rgba(${s.c},${(0.18 + s.d * 0.55) * tw})`;
      ctx!.beginPath();
      ctx!.arc(s.x, y, s.s, 0, Math.PI * 2);
      ctx!.fill();
    }

    if (reduce) return;
    if (!shoot && t > nextShoot) {
      const fromLeft = Math.random() < 0.5;
      shoot = {
        x: fromLeft ? Math.random() * W * 0.5 : W * 0.5 + Math.random() * W * 0.5,
        y: Math.random() * H * 0.45,
        vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 4),
        vy: 3 + Math.random() * 2.5,
        life: 1,
      };
      nextShoot = t + 8000 + Math.random() * 9000;
    }
    if (shoot) {
      const sh = shoot;
      const tx = sh.x - sh.vx * 9;
      const ty = sh.y - sh.vy * 9;
      const g = ctx!.createLinearGradient(sh.x, sh.y, tx, ty);
      g.addColorStop(0, `rgba(211,216,226,${0.85 * sh.life})`);
      g.addColorStop(1, 'rgba(211,216,226,0)');
      ctx!.strokeStyle = g;
      ctx!.lineWidth = 1.2;
      ctx!.beginPath();
      ctx!.moveTo(sh.x, sh.y);
      ctx!.lineTo(tx, ty);
      ctx!.stroke();
      sh.x += sh.vx;
      sh.y += sh.vy;
      sh.life -= 0.016;
      if (sh.life <= 0 || sh.x < -50 || sh.x > W + 50 || sh.y > H + 50) shoot = null;
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

  function loop(t: number) {
    if (!document.hidden) draw(t);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}
