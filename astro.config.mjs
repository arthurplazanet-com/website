// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

// https://astro.build/config 
export default defineConfig({
  integrations: [vue()],

   vite: {
    // publicDir: 'public',
    build: {
      rollupOptions: {
        external: ['@use-compose/ui', '@use-compose/ui/dist/*'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
        // external: ['@use-compose/ui', '@use-compose/ui/style.css'],
        // , '@use-compose/ui'],
        // noExternal: [/\.css$/],
      },
    },
});