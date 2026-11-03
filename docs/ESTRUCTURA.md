# Estructura del proyecto

Mapa de carpetas para encontrar rápido dónde cambiar cada cosa.

```
src/
  config.ts          Contacto, URL del sitio y datos legales (un solo lugar)
  data/              Contenido: servicios, planes, FAQ y pasos de "Cómo trabajamos"
  components/        Una pieza de la portada por archivo (Hero, Services, Plans, Footer...)
  layouts/           Layout (cabeza HTML, SEO, JSON-LD) y LegalLayout (páginas legales)
  lib/               Comportamiento en el navegador: WebGL, scroll, animaciones, cursor
  pages/             Una ruta por archivo: index, 404, catalogo y las tres legales
  styles/global.css  Tokens de marca (@theme) y estilos globales
public/              Se copia tal cual a dist/: logo, iconos, og.jpg, PDF, robots, manifiesto
scripts/             check-dist (revisión del build), deploy, generate-og y generate-catalogo
contenido/           Textos fuente originales, solo de referencia
docs/                Despliegue, aspectos legales y animaciones
.github/             CI, Dependabot y plantillas de issues y pull requests
```

## Dónde cambiar qué

| Quiero cambiar…                     | Archivo                                    |
| ----------------------------------- | ------------------------------------------ |
| WhatsApp, URL del sitio, datos legales | `src/config.ts`                         |
| Servicios y combos                  | `src/data/services.ts`                     |
| Planes, precios y cuotas            | `src/data/plans.ts`                        |
| FAQ y pasos de "Cómo trabajamos"    | `src/data/site.ts`                         |
| Colores y tipografías               | `src/styles/global.css` (`@theme`)         |
| Título, descripción y datos SEO     | `src/layouts/Layout.astro`                 |
| Texto de privacidad, términos, cookies | `src/pages/*.astro` y `docs/LEGAL.md`   |
| El catálogo imprimible              | `src/pages/catalogo.astro` y `npm run catalogo` |

## Qué se genera y no se edita a mano

- `dist/` y `.astro/`: salida del build (están en `.gitignore`).
- `public/og.jpg`: lo produce `npm run og`.
- `public/catalogo-optisain.pdf`: lo produce `npm run build && npm run catalogo`.
