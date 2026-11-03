# Animaciones y comportamiento en el navegador

Todo el comportamiento animado vive en `src/lib/`. La portada lo inicia en `src/pages/index.astro`, en este orden:

1. `initSmoothScroll()` · `smooth-scroll.ts`
2. `initStarfield()` · `starfield.ts`
3. `initCursorRing()` · `cursor.ts`
4. `initHeadingReveal()` · `heading-reveal.ts`
5. `initReveal()` · `reveal.ts`

El agujero negro (`blackhole.ts`) no se inicia desde ahí: lo montan `Hero.astro` y `ClosingBand.astro`, cada uno sobre su propio canvas.

## Qué hace cada módulo y cuándo se apaga

| Módulo            | Qué hace                                                        | Se desactiva con                              |
| ----------------- | --------------------------------------------------------------- | --------------------------------------------- |
| `smooth-scroll`   | Scroll suave con Lenis, atado al ticker de GSAP                 | "Reducir movimiento" o pantalla táctil        |
| `starfield`       | Cielo fijo con paralaje por scroll y una estrella fugaz         | Con "reducir movimiento" se dibuja una sola vez, sin paralaje |
| `cursor`          | Anillo que sigue al puntero y crece sobre lo clicable           | "Reducir movimiento" o puntero no fino        |
| `heading-reveal`  | Cada `h2` entra palabra por palabra desde una máscara           | "Reducir movimiento" (no toca los títulos)    |
| `reveal`          | Aparición escalonada: `[data-reveal-group]`, `[data-reveal]` y `[data-reveal-solo]` | "Reducir movimiento" (todo se muestra de una vez) |
| `blackhole`       | Agujero negro trazado por rayos en un fragment shader (WebGL)   | Sin WebGL devuelve `null` y queda el respaldo en CSS; con "reducir movimiento" se dibuja un cuadro fijo |

## Modo ligero del agujero negro

En pantallas táctiles o menores de 768 px el shader trabaja con menos carga: escala de render máxima de 0.5 (en lugar del `devicePixelRatio` hasta 2), menos pasos de trazado de rayos (175 frente a 260) y un tope de 420 000 píxeles. El rendimiento en laptops sin tarjeta dedicada y en celulares reales sigue sin medirse; se probó con Chrome sin GPU.

## Reglas al agregar animaciones

- Respetar `prefers-reduced-motion` en el mismo módulo, no en el CSS aparte.
- El contenido debe verse completo sin JavaScript: la animación es una mejora, no una condición para leer.
- Anunciar lo importante con `aria-label` si el texto se parte en trozos (como hace `heading-reveal` con los `h2`).
- Los colores salen de los tokens de `src/styles/global.css`; el ámbar es el único acento.
