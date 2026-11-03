import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://optisain.35.196.253.146.sslip.io',
  // /catalogo/ es una página de impresión con noindex: no debe aparecer en el sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/catalogo/') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
