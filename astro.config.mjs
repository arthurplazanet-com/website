// @ts-check
import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],

  vite: {
    ssr: {
      noExternal: ["@use-compose/ui"],
    },
    optimizeDeps: {
      include: ["@use-compose/ui"],
    },
  },
});
