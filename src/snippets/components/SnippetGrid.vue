<template>
  <p v-if="snippets.length === 0" class="empty">No snippets yet.</p>
  <div v-else class="grid" :style="gridStyle">
    <SnippetCard v-for="snippet in snippets" :key="snippet.id" :snippet="snippet" />
  </div>
</template>

<script setup lang="ts">
import type { Snippet } from '../../types/index.ts'
import SnippetCard from './SnippetCard.vue'

const { snippets = [] } = defineProps<{
  snippets?: Snippet[]
}>()

// Same grid primitive as ProjectGrid — see that file for the column-cap math.
const gridStyle = '--grid-min:16rem;--grid-max:3;--grid-gap:var(--spacing-md, 1.5rem)'
</script>

<style scoped>
.grid {
  display: grid;
  gap: var(--grid-gap);
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      min(
        max(var(--grid-min), (100% - (var(--grid-max) - 1) * var(--grid-gap)) / var(--grid-max)),
        100%
      ),
      1fr
    )
  );
}
.empty {
  color: var(--muted);
  text-align: center;
}
</style>
