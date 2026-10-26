export function initCometButtons() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || reduceMotion) return;

  document.querySelectorAll<HTMLElement>('[data-comet]').forEach((btn) => {
    let lastSpawn = 0;

    btn.addEventListener(
      'pointermove',
      (e) => {
        const now = performance.now();
        if (now - lastSpawn < 45) return;
        lastSpawn = now;

        const rect = btn.getBoundingClientRect();
        const spark = document.createElement('span');
        spark.className = 'comet-spark';
        spark.style.left = `${e.clientX - rect.left}px`;
        spark.style.top = `${e.clientY - rect.top}px`;
        btn.appendChild(spark);
        spark.addEventListener('animationend', () => spark.remove(), { once: true });
      },
      { passive: true }
    );
  });
}
