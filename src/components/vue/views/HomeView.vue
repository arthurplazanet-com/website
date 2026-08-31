<template>
  <SiteShell>
    <ProjectGrid :projects="projects" />
  </SiteShell>
</template>

<script setup lang="ts">
import type { Project } from '../../../types/index.ts'
import SiteShell from './SiteShell.vue'
import ProjectGrid from '../../../projects/components/ProjectGrid.vue'

defineProps<{
  projects?: Project[]
}>()
</script>
