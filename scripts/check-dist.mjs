// Revisa el build (dist/) antes de publicar. Uso: npm run build && npm run check
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const failures = [];

const read = (file) => readFile(join(dist, file), 'utf8');
const fail = (msg) => failures.push(msg);

// 1. El catálogo es solo catálogo: no puede mostrar precios.
const catalogo = await read('catalogo/index.html');
if (/\$\s?\d/.test(catalogo) || /\bCOP\b/i.test(catalogo)) {
  fail('catalogo/index.html muestra precios (el catálogo va sin precios).');
}

// 2. Las tres páginas legales existen y el pie de la portada enlaza a ellas.
const legales = ['privacidad', 'terminos', 'cookies'];
const portada = await read('index.html');
for (const slug of legales) {
  const html = await read(`${slug}/index.html`).catch(() => null);
  if (!html) fail(`Falta la página legal /${slug}/.`);
  if (!portada.includes(`/${slug}/`)) fail(`La portada no enlaza a /${slug}/.`);
}

// 3. El sitemap incluye las páginas públicas y deja fuera el catálogo y el 404.
const sitemap = await read('sitemap-0.xml');
for (const slug of legales) {
  if (!sitemap.includes(`/${slug}/`)) fail(`El sitemap no incluye /${slug}/.`);
}
if (sitemap.includes('/catalogo/')) fail('El sitemap incluye /catalogo/ (debe quedar fuera).');
if (sitemap.includes('404')) fail('El sitemap incluye la página 404.');

// 4. El sitio no carga nada de terceros (la política de cookies promete que no hay conexiones externas).
//    Los únicos enlaces externos permitidos son a WhatsApp y al propio dominio.
const propio = new URL(portada.match(/<link rel="canonical" href="([^"]+)"/)[1]).hostname;
const permitidos = new Set(['wa.me', propio]);
const paginas = ['index.html', '404.html', ...legales.map((s) => `${s}/index.html`)];
for (const pagina of paginas) {
  const html = await read(pagina);
  for (const [, url] of html.matchAll(/\b(?:src|href|action)="(https?:\/\/[^"]+)"/g)) {
    const host = new URL(url).hostname;
    if (!permitidos.has(host)) fail(`${pagina} apunta a un servidor externo: ${url}`);
  }
}

// 5. Cada página pública tiene <title> y meta description, y los títulos no se repiten entre páginas.
const titulos = new Map();
for (const pagina of paginas) {
  const html = await read(pagina);
  const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!titulo) fail(`${pagina} no tiene <title>.`);
  else if (titulos.has(titulo)) fail(`${pagina} repite el <title> de ${titulos.get(titulo)}.`);
  else titulos.set(titulo, pagina);
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) {
    fail(`${pagina} no tiene meta description (o es demasiado corta).`);
  }
}

if (failures.length) {
  console.error(`\n✗ ${failures.length} problema(s):\n` + failures.map((f) => `  - ${f}`).join('\n'));
  process.exit(1);
}
console.log('✓ dist/ pasó todas las revisiones.');
