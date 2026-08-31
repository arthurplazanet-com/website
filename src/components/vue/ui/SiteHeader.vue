<template>
  <YHeader :title="title" :transparent="transparent" class="px-md">
    <template #left>
      <a href="/" class="nav-link">Home</a>
      <DownloadPdf />
    </template>

    <!-- <DownloadPdf> -->

    <!-- </DownloadPdf> -->
    <template #right>
      <a href="/about" class="nav-link">About</a>
      <a href="/projects" class="nav-link">Projects</a>
      <a href="/blog" class="nav-link">Blog</a>
      <a href="/snippets" class="nav-link">Snippets</a>
      <a href="/contact" class="nav-link">Contact</a>
    </template>
  </YHeader>
</template>

<script setup lang="ts">
import { YHeader } from '@use-compose/ui'
import type { YHeaderProps } from '@use-compose/ui'
import DownloadPdf from '../DownloadPdf.vue'

withDefaults(defineProps<YHeaderProps>(), {
  // title: "Arthur Plazanet - Software Engineer",
  transparent: false,
})
const pdfUrl = `${import.meta.env.PUBLIC_API_URL}/resume/pdf`
</script>

<style scoped>
.nav-link {
  margin-right: 1rem;
  text-decoration: none;
  color: inherit;
  transition: color 150ms linear;

  &:hover {
    color: var(--primary);
  }
}
</style>
