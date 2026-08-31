<template>
  <AppCompose :theme="theme" use-bg="accent">
    <SiteHeader />

    <YScreen>
      <template #header>
        <h1>Arthur Plazanet - Software Engineer</h1>
      </template>
      <slot />

      <template #footer>
        <p class="text-sm text-center text-muted">
          &copy; 2024 Arthur Plazanet. All rights reserved.
        </p>
      </template>
    </YScreen>
  </AppCompose>
</template>

<script setup lang="ts">
import { AppCompose, YScreen } from '@use-compose/ui'
import type { YTheme } from '@use-compose/ui'
import SiteHeader from '../ui/SiteHeader.vue'

// Compose derives its own colour ramps from this at runtime. It intentionally
// mirrors the palette in assets/css/tokens.css; that file stays the source of
// truth for anything CSS references directly.
const theme: YTheme = {
  primary: '#e3c567',
  secondary: '#F0F0C9',
  background: '#0D0E10',
  dark: '#ACBCF0',
  danger: '#F96E46',
  text: '#F0F0C9',
}
</script>
