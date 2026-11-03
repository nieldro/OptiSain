# OptiSain · sitio web

Sitio de OptiSain, estudio de servicios digitales en Colombia (webs, tiendas, chatbots con IA,
automatizaciones y dashboards). Es estático: [Astro](https://astro.build) 5 + TypeScript +
Tailwind CSS 4, con un agujero negro en WebGL propio en el hero (`src/lib/blackhole.ts`, con
respaldo en CSS si no hay WebGL), animaciones con GSAP/ScrollTrigger y scroll suave con Lenis.

Además de la portada tiene la sección de planes con precios, las páginas legales (privacidad,
términos y cookies), una página 404 y el catálogo en PDF.

Más documentación: [`docs/ESTRUCTURA.md`](docs/ESTRUCTURA.md) (dónde cambiar cada cosa),
[`docs/ANIMACIONES.md`](docs/ANIMACIONES.md), [`docs/DESPLIEGUE.md`](docs/DESPLIEGUE.md),
[`docs/LEGAL.md`](docs/LEGAL.md) y [`CHANGELOG.md`](CHANGELOG.md). Las reglas de marca están en [`CLAUDE.md`](CLAUDE.md).

## Desarrollo

```bash
nvm use           # Node 22 (.nvmrc); sirve Node 20.3 o más nuevo
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run check     # revisa dist/: catálogo sin precios, páginas legales, sitemap, SEO básico, enlaces, WhatsApp, sin terceros
npm run verify    # build + check en un solo paso
npm run preview   # sirve dist/ para revisar el build de producción
npm run catalogo  # regenera public/catalogo-optisain.pdf (necesita npm run build antes)
npm run og        # regenera public/og.jpg
```

`npm run check` también corre en GitHub Actions en cada push.

## Cambiar los datos de contacto

Todo vive en un solo archivo: [`src/config.ts`](src/config.ts).

```ts
export const WHATSAPP_NUMBER = '573052027517'; // solo números, sin "+", formato internacional
export const WHATSAPP_DISPLAY = '+57 305 202 7517';
export const SITE_URL = 'https://optisain.35.196.253.146.sslip.io';
export const LEGAL_HOLDER = '...'; // responsable de las páginas legales (también LEGAL_ID, LEGAL_CITY, LEGAL_EMAIL)
```

Cambiar esos valores actualiza todo el sitio (header, hero, formulario, footer, páginas legales,
SEO y JSON-LD). Si cambias `SITE_URL`, cambia también `site` en `astro.config.mjs` y el `Sitemap:` de
`public/robots.txt`.

Todavía no hay correo público de contacto ni Instagram: no se muestran en el sitio.

## Cambiar textos y servicios

- Textos generales, FAQ y pasos de "Cómo trabajamos": [`src/data/site.ts`](src/data/site.ts).
- Los 15 servicios y los 4 combos: [`src/data/services.ts`](src/data/services.ts).
- Los textos fuente originales (para referencia) siguen en `contenido/`.

## Planes, precios y catálogo

- Los tres planes de página web (Esencial, Empresarial y Tienda en línea) salen de
  [`src/data/plans.ts`](src/data/plans.ts): precio, cuotas, qué incluye y tiempo de entrega.
  Los precios se muestran **sin IVA**. Los demás servicios se cotizan por WhatsApp.
- El catálogo es una página aparte, [`src/pages/catalogo.astro`](src/pages/catalogo.astro) (`/catalogo/`,
  con `noindex` y fuera del sitemap). **No lleva precios**; `npm run check` falla si aparece alguno.
- Para actualizar el PDF: `npm run build && npm run catalogo`. Imprime `/catalogo/` con Puppeteer y deja
  `public/catalogo-optisain.pdf` (4 páginas, A4).

## Marca

Los colores y tipografías están definidos como tokens en
[`src/styles/global.css`](src/styles/global.css) (`@theme`). No agregues colores nuevos: usa
`obsidian`, `gunmetal`, `gainsboro`, `silver`, `gray` y `amber` (único acento).

El logo y los íconos están en `public/logo/` y `public/iconos/`.

## Publicar

El sitio vive en un servidor propio con nginx. Para publicar un cambio: `npm run build`, `npm run check`
y `DEPLOY_HOST=usuario@servidor ./scripts/deploy.sh`. Los detalles (robots, `noindex` mientras no haya
dominio y renovación del certificado) están en [`docs/DESPLIEGUE.md`](docs/DESPLIEGUE.md).

### Alternativa gratuita: Vercel

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
  agujero negro en WebGL (`blackhole.ts`, en un chunk aparte), marquee,
  servicios con filtros y tarjetas 3D tilt, "Cómo trabajamos" con línea de órbita animada por
  scroll, "Por qué OptiSain", banda de cierre con anillos orbitales, FAQ en acordeón accesible,
  formulario de contacto que arma el mensaje de WhatsApp, y footer.
- Animaciones con GSAP + ScrollTrigger y scroll suave con Lenis. Todo respeta
  `prefers-reduced-motion` (el héroe queda como imagen fija y se apagan Lenis y el parallax).
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

- **Dominio propio:** cuando exista, actualizar `SITE_URL`, `astro.config.mjs` y `public/robots.txt`,
  quitar el `noindex` del servidor y regenerar la imagen con `npm run og`.
- **Instagram y correo públicos:** aún no existen; agregarlos a `src/config.ts` y al pie cuando los haya.
- **Renovación del certificado:** el timer no está activo (ver `docs/DESPLIEGUE.md`).
- Revisar en un celular real que el agujero negro del hero se vea fluido (solo se probó con Chrome
  sin tarjeta gráfica) y correr Lighthouse con el sitio publicado.
- Que un abogado revise las páginas legales (ver `docs/LEGAL.md`).
