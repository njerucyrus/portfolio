// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages serves this repository at https://njerucyrus.github.io/portfolio/.
// The deploy workflow passes the real values from actions/configure-pages; with a
// custom domain it sends an empty BASE_PATH, which means the site root.
const site = process.env.SITE_URL || 'https://njerucyrus.github.io';
const base = process.env.BASE_PATH === undefined ? '/portfolio' : process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Every page is a directory URL; this drops a duplicate base URL without the slash.
  integrations: [sitemap({ filter: (page) => page.endsWith('/') })],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
