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

if (failures.length) {
  console.error(`\n✗ ${failures.length} problema(s):\n` + failures.map((f) => `  - ${f}`).join('\n'));
  process.exit(1);
}
console.log('✓ dist/ pasó todas las revisiones.');
