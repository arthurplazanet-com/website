<template>
  <AppCompose :theme="theme" use-bg="bg">
    <AppProvider :projects="projects" :experiences="experiences">
      <PanelWrapper>
        <!--
          The bar is the wrapper's own chrome, not either panel's — see
          PanelBar.vue for why that is the only placement that survives the
          push. Nav links go in its slot so they stay reachable in both states.
        -->
        <template #bar>
          <PanelBar>
            <a href="/blog" class="panel-bar__link">Blog</a>
            <a href="/snippets" class="panel-bar__link">Snippets</a>
            <DownloadPdf />
          </PanelBar>
        </template>

        <!--
          DOM order is paint order: the records go in first so the cover lands
          on top of them without needing to out-specify anything.
        -->
        <ProjectsPanels />
        <InfoBook />
      </PanelWrapper>
    </AppProvider>
  </AppCompose>
</template>

<script setup lang="ts">
import type { YTheme } from '@use-compose/ui'
import { AppCompose } from '@use-compose/ui'
import type { Project, Experience } from '../../../types'
import AppProvider from '../AppProvider.vue'
import DownloadPdf from '../DownloadPdf.vue'
import InfoBook from '../book/InfoBook.vue'
import PanelBar from '../ui/PanelBar.vue'
import PanelWrapper from '../ui/PanelWrapper.vue'
import ProjectsPanels from '../projects/ProjectsPanels.vue'

// Mirrors assets/css/tokens.css, which stays the source of truth for anything
// CSS reads directly. Compose derives its own ramps from these at runtime.
const theme: YTheme = {
  primary: '#e3c567',
  secondary: '#1c1b1b',
  background: '#000000',
  dark: '#1c1b1b',
  danger: '#f96e46',
  text: '#fefefe',
}

const props = withDefaults(defineProps<{ projects?: Project[]; experiences?: Experience[] }>(), {
  projects: () => [],
  experiences: () => [],
})
</script>
