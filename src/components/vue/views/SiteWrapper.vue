<template>
  <AppCompose :theme="theme" use-bg="bg">
    <AppProvider client:load :projects="projects" :experiences="experiences">
      <!-- <SiteHeader /> -->

      <PanelWrapper>
        <InfoBook />
        <ProjectsPanels />
      </PanelWrapper>
    </AppProvider>
  </AppCompose>
</template>

<script setup lang="ts">
import type { InjectionKey } from 'vue'
import InfoBook from '../book/InfoBook.vue'
import type { YTheme } from '@use-compose/ui'
import { AppCompose, YScreen, YCenter, YBox, YButton } from '@use-compose/ui'
import type { Project, Experience } from '../../../types'
import SiteHeader from '../ui/SiteHeader.vue'
import PanelSection from '../ui/PanelSection.vue'
import ProjectsPanels from '../projects/ProjectsPanels.vue'
import { provide } from 'vue'
import AppProvider from '../AppProvider.vue'
import PanelWrapper from '../ui/PanelWrapper.vue'
// import { useStore } from '@nanostores/vue'

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

// const projectItems = useStore(props?.projects);
// const experienceItems = useStore(props?.experiences);
// export const projectItems = map({});
// export const experienceItems = map({});
</script>
