// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import vue from '@astrojs/vue'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), mdx()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'AporeticSansMono Nerd Font',
      cssVariable: '--font-aporetic-sans-mono',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/AporeticSansMonoNerdFont-Regular.ttf'],
            weight: 'normal',
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/AporeticSansMonoNerdFont-Bold.ttf'],
            weight: 'bold',
            style: 'normal',
          },
          // arthurplazanet.com/src/assets/fonts/AporeticSansMonoNerdFont-Bold.ttf arthurplazanet.com/src/assets/fonts/AporeticSansMonoNerdFont-BoldItalic.ttf arthurplazanet.com/src/assets/fonts/AporeticSansMonoNerdFont-Italic.ttf arthurplazanet.com/src/assets/fonts/AporeticSansMonoNerdFont-Regular.ttf arthurplazanet.com/src/assets/fonts/AporeticSerifMonoNerdFont-Bold.ttf arthurplazanet.com/src/assets/fonts/AporeticSerifMonoNerdFont-BoldItalic.ttf arthurplazanet.com/src/assets/fonts/AporeticSerifMonoNerdFont-Italic.ttf arthurplazanet.com/src/assets/fonts/AporeticSerifMonoNerdFont-Regular.ttf
          {
            src: ['./src/assets/fonts/AporeticSansMonoNerdFont-Italic.ttf'],
            weight: 'normal',
            style: 'italic',
          },
          {
            src: ['./src/assets/fonts/AporeticSansMonoNerdFont-BoldItalic.ttf'],
            weight: 'bold',
            style: 'italic',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'AporeticSerifMono Nerd Font',
      cssVariable: '--font-aporetic-serif-mono',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/AporeticSerifMonoNerdFont-Regular.ttf'],
            weight: 'normal',
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/AporeticSerifMonoNerdFont-Bold.ttf'],
            weight: 'bold',
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/AporeticSerifMonoNerdFont-Italic.ttf'],
            weight: 'normal',
            style: 'italic',
          },
          {
            src: ['./src/assets/fonts/AporeticSerifMonoNerdFont-BoldItalic.ttf'],
            weight: 'bold',
            style: 'italic',
          },
        ],
      },
    },
  ],
  vite: {
    server: {
      allowedHosts: true,
    },
    ssr: {
      noExternal: ['@use-compose/ui'],
    },
    optimizeDeps: {
      include: ['@use-compose/ui'],
    },
  },
})
