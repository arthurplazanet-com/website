// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), mdx()],

  vite: {
    ssr: {
      noExternal: ["@use-compose/ui"],
    },
    optimizeDeps: {
      include: ["@use-compose/ui"],
    },
  },
});