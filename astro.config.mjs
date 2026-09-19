// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://www.mufasa.live',
  base: process.env.ASTRO_BASE_PATH || '/',
});
