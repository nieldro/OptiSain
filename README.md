# OptiSain · sitio web

Sitio estático de una sola página, construido con [Astro](https://astro.build) + TypeScript +
Tailwind CSS, con un planeta 3D en Three.js en el hero, animaciones con GSAP/ScrollTrigger y
scroll suave con Lenis.

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/ para revisar el build de producción
```

## Cambiar los datos de contacto

Todo vive en un solo archivo: [`src/config.ts`](src/config.ts).

```ts
export const WHATSAPP_NUMBER = '573000000000'; // solo números, sin "+", formato internacional
export const CONTACT_EMAIL = 'hola@optisain.co';
export const INSTAGRAM_URL = 'https://instagram.com/optisain';
export const SITE_URL = 'https://optisain.co';
```

Cambia esos cuatro valores antes de publicar y se actualizan en todo el sitio (header, hero,
formulario, footer, SEO y JSON-LD).

## Cambiar textos y servicios

- Textos generales, FAQ y pasos de "Cómo trabajamos": [`src/data/site.ts`](src/data/site.ts).
- Los 15 servicios y los 4 combos: [`src/data/services.ts`](src/data/services.ts).
- Los textos fuente originales (para referencia) siguen en `contenido/`.

## Marca

Los colores y tipografías están definidos como tokens en
[`src/styles/global.css`](src/styles/global.css) (`@theme`). No agregues colores nuevos: usa
`obsidian`, `gunmetal`, `gainsboro`, `silver`, `gray` y `amber` (único acento).

El logo y los íconos están en `public/logo/` y `public/iconos/`.

## Publicar gratis

### Vercel

1. Sube el proyecto a un repositorio de GitHub/GitLab.
2. Entra a [vercel.com](https://vercel.com) → **Add New Project** → importa el repositorio.
3. Vercel detecta Astro automáticamente (`npm run build`, carpeta de salida `dist`). Dale a
   **Deploy**.
4. En **Settings → Domains** agrega tu dominio (`optisain.co`) y sigue las instrucciones de DNS.

### Netlify

1. Sube el proyecto a un repositorio de GitHub/GitLab.
2. Entra a [netlify.com](https://netlify.com) → **Add new site → Import an existing project**.
3. Build command: `npm run build`. Publish directory: `dist`.
4. En **Domain settings** agrega tu dominio propio.

En ambos casos, no olvides actualizar `SITE_URL` en `src/config.ts` y regenerar la imagen Open
Graph si cambias el dominio o el logo:

```bash
node scripts/generate-og.mjs
```

## Qué quedó hecho

- Sitio de una sola página con las 10 secciones pedidas: header con progreso de lectura, hero con
  planeta 3D (Three.js, cargado en un chunk aparte y diferido con `requestIdleCallback`), marquee,
  servicios con filtros y tarjetas 3D tilt, "Cómo trabajamos" con línea de órbita animada por
  scroll, "Por qué OptiSain", banda de cierre con anillos orbitales, FAQ en acordeón accesible,
  formulario de contacto que arma el mensaje de WhatsApp, y footer.
- Animaciones con GSAP + ScrollTrigger, scroll suave con Lenis, cursor con halo, botones
  magnéticos. Todo respeta `prefers-reduced-motion` (se desactivan 3D, Lenis, parallax y
  cursor/magnéticos).
- Todo el contenido es visible y accesible sin JavaScript; las animaciones son mejora progresiva
  (se aplican por JS, no dependen de clases ocultas en el HTML).
- Si WebGL no está disponible, el canvas se oculta y queda el `<noscript>` con el isotipo SVG.
- SEO: un solo H1, jerarquía H2/H3, `lang="es-CO"`, title/description/canonical/OG/Twitter Card,
  imagen OG 1200×630 generada con el logo sobre obsidian (`scripts/generate-og.mjs`), JSON-LD de
  `ProfessionalService`, `OfferCatalog` (15 servicios, sin precios) y `FAQPage`, `sitemap-index.xml`
  (vía `@astrojs/sitemap`), `robots.txt`, `site.webmanifest` y favicons.
- `npm run build` corre sin errores; se verificó con `npm run preview` que el HTML, los assets
  (`/logo`, `/iconos`, `/og.jpg`, `/robots.txt`, `/site.webmanifest`, `/sitemap-index.xml`) y el
  chunk diferido del planeta 3D responden `200`.

## Qué falta reemplazar antes de publicar

- **`src/config.ts`**: número real de WhatsApp, correo, Instagram y dominio (`SITE_URL`).
- Después de cambiar el dominio o el logo, vuelve a correr `node scripts/generate-og.mjs` para
  regenerar `public/og.jpg`.
- Revisar en un navegador real (no solo el preview) que el planeta 3D y las animaciones se vean
  bien en tu celular concreto, y correr Lighthouse una vez esté publicado en Vercel/Netlify.
