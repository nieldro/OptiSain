# Cambios

## 2026-11-03

- `npm run check` ahora también revisa: `title` y meta description únicos, `lang="es"`, un solo `h1`,
  `noindex` en catálogo y 404, archivos prometidos (og, PDF, favicon, iconos del manifiesto), enlaces
  internos, `robots.txt` contra el dominio canónico y que todos los `wa.me` usen el número de `config.ts`.
- Script `npm run verify` (build + check).
- CI: permisos de solo lectura, cancelación de ejecuciones repetidas y límite de 10 minutos.
- Dependabot para npm y GitHub Actions; plantillas de issue y de pull request.
- `generate-catalogo.mjs` cierra navegador y servidor aunque falle; `deploy.sh` borra su paquete local con `trap`.
- Manifiesto web con `id` y `scope`.
- Documentación: `docs/ESTRUCTURA.md` y `docs/ANIMACIONES.md`; comentarios de cabecera en `reveal.ts`,
  `smooth-scroll.ts` y `generate-og.mjs`.

## 2026-11-02

- Página 404 con la marca; `Layout` acepta `noindex`.
- `/catalogo/` sale del sitemap.
- `npm run check`: revisa catálogo sin precios, páginas legales, sitemap y ausencia de terceros.
- CI en GitHub Actions y `scripts/deploy.sh`.
- Documentación de despliegue y de las páginas legales (`docs/`).
- Se quitan de `src/config.ts` el correo e Instagram de ejemplo, que no se usaban.

## 2026-10-31

- Sección de planes con precios sin IVA y pago en cuotas (`src/data/plans.ts`).
- Páginas de privacidad, términos y cookies; casilla de autorización en el formulario.
- Titular legal: persona natural, sin razón social ni dominio propio por ahora.
- Catálogo en PDF sin precios (`/catalogo-optisain.pdf`), generado desde `/catalogo/`.

## 2026-10-27

- Pie nuevo: horizonte de planeta, teléfono gigante, sello y marca con luz.

## 2026-10-26

- Primera publicación en el servidor propio.
- Héroe con agujero negro en WebGL, cielo con paralaje y modo ligero para celulares.
- WhatsApp real en todo el sitio; auditoría de accesibilidad y contraste.
