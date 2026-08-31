<template>
  <PanelSection class="projects-panel">
    <ProjectGrid :projects="projects" />
  </PanelSection>
</template>

<script setup lang="ts">
import type { YTheme } from '@use-compose/ui'
import { AppCompose, YScreen, YCenter, YBox, YButton } from '@use-compose/ui'
import type { PortfolioContentInterface } from '../portfolio-content-context.ts'
// import { portfolioContentKey } from '../views/SiteWrapper.vue'
import type { Project, Experience } from '../../../types/index.ts'
import SiteHeader from '../ui/SiteHeader.vue'
import { map } from 'nanostores'
import { inject } from 'vue'
import PanelSection from '../ui/PanelSection.vue'
import ProjectGrid from '../../../projects/components/ProjectGrid.vue'
import { usePortfolioContentContext } from '../portfolio-content-context.ts'

const { projects } = usePortfolioContentContext() as PortfolioContentInterface
</script>

<style>
.projects-panel {
  background-color: var(--color-info);
  overflow-y: scroll;
}
/* .projects-panels {
  position: absolute;
  inset: 0;
  --panel-width: 100dvw;
  min-height: 100svh;
  width: var(--panel-width);
  display: flex;
  justify-content: center;
  z-index: 1;
  background-color: var(--info); */
/* background: var(--bg-light); */
/* transform: translateX(calc((100dvw - var(--panel-width)) / 2)); */
/* transform: translate(0, 0) translateZ(1); */
/* } */
</style>
