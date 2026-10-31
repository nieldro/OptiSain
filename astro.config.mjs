import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://optisain.35.196.253.146.sslip.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
