<template>
  <p v-if="projects.length === 0" class="empty">No projects yet.</p>
  <div v-else class="grid" :style="gridStyle">
    <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
  </div>
</template>

<script setup lang="ts">
import type { Project } from '../../types/index.ts'
import ProjectCard from './ProjectCard.vue'

const { projects = [] } = defineProps<{
  projects?: Project[]
}>()

// Same "Every Layout" grid primitive `components/ui/Grid.astro` establishes:
// columns are decided by the browser from `min`, `max` only caps how wide the
// grid is allowed to spread.
const gridStyle = '--grid-min:12rem;--grid-max:4;--grid-gap:var(--spacing-md, 1.5rem)'
</script>

<style scoped>
.grid {
  display: grid;
  gap: var(--grid-gap);
  /*
     * `auto-fit` + `minmax` is the responsive half. The `max(...)` is the column
     * cap: (100% - gutters) / max is the width a track would have at exactly
     * `max` columns, so asking for at least that much forbids a narrower — and
     * therefore more numerous — track. `min(…, 100%)` keeps a single column from
     * overflowing a viewport narrower than `--grid-min`.
     */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.empty {
  color: var(--muted);
  text-align: center;
}
</style>
