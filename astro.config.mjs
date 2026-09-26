import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eliotcaroom.com',
  integrations: [sitemap()],
});
