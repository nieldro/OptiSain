# Despliegue

El sitio es estático: `npm run build` genera `dist/` y nginx lo sirve desde `/var/www/optisain` en el servidor propio, en `https://optisain.35.196.253.146.sslip.io/` (sin dominio propio por ahora).

## Publicar un cambio

```bash
npm run build
npm run check          # catálogo sin precios, páginas legales, sitemap, SEO básico, enlaces, WhatsApp y sin terceros
DEPLOY_HOST=usuario@servidor ./scripts/deploy.sh
```

`scripts/deploy.sh` empaqueta `dist/` sin `robots.txt`, lo copia por `scp` a `/tmp`, lo extrae en `/var/www/optisain` con `sudo tar` y deja dueño y permisos (755 en carpetas, 644 en archivos). No toca nginx ni el certificado.

Desde Windows hace falta Git Bash o WSL (el script usa `bash`, `tar`, `scp` y `ssh`).

## Por qué el `robots.txt` del servidor es distinto

Mientras no haya dominio propio, el sitio está cerrado a buscadores a propósito:

- El servidor tiene su propio `robots.txt` con `Disallow: /`. Por eso `deploy.sh` lo excluye: el de `public/robots.txt` permite todo y pisaría al del servidor.
- El virtual host de nginx (`/etc/nginx/sites-enabled/optisain`, archivo regular, no un enlace) agrega la cabecera `X-Robots-Tag: noindex`.

Para abrir el sitio a Google, cuando haya dominio: quitar la cabecera del vhost, usar el `robots.txt` de `public/` y actualizar `SITE_URL` en `src/config.ts`, `site` en `astro.config.mjs` y el `Sitemap:` de `public/robots.txt`.

## Certificado HTTPS

El certificado lo emite `lego` por TLS-ALPN-01 (puerto 443), con archivos en `/etc/optisain/`. Vence hacia el 24 de enero de 2027.

La renovación automática **no quedó activa**: el timer `optisain-cert.timer` no se habilitó. Mientras tanto hay que correr a mano `/etc/optisain/renovar.sh` antes de esa fecha, o habilitar el timer.

## Plan B: Vercel o Netlify

El proyecto también compila en cualquier hosting estático. Comando de build `npm run build`, carpeta de salida `dist`. Si se cambia el dominio, actualizar los tres lugares indicados arriba y regenerar la imagen Open Graph con `npm run og`.
