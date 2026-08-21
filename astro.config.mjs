import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.so-miam.com',
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
