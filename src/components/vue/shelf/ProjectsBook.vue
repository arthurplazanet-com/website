<template>
  <form class="book book--projects" aria-label="Projects" @submit.prevent>
    <div class="book__inner projects">
      <div class="book__head">
        <h2>Projects</h2>
      </div>

      <TagFilter scope="pf" target=".deck-cell" :tags="tagCounts" />

      <div class="lattice">
        <RecordCell
          v-for="(record, i) in records"
          :key="record.key"
          v-bind="record"
          :data-t="slugs(record.tags)"
          :style="{ '--stagger': `${Math.min(i, 8) * 40}ms` }"
          @open="opened = record"
        />
      </div>

      <p class="book__foot shelf-label">
        Showing <span class="projects__n" /> of {{ records.length }} records
      </p>
    </div>

    <!-- YOverlay is not SSR-safe, and a closed drawer has nothing to render -->
    <ProjectDrawer v-if="mounted" :project="opened" :active="[]" @close="opened = null" />
  </form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ProjectDrawer from './ProjectDrawer.vue'
import RecordCell from './RecordCell.vue'
import TagFilter from './TagFilter.vue'
import { toRecord, type DeckRecord } from './records'
import './ProjectsBook.css'
import type { Project } from '../../../types/index.ts'

const props = defineProps<{ projects: Project[] }>()

const records = computed(() => props.projects.map(toRecord))
const opened = ref<DeckRecord | null>(null)
const mounted = ref(false)
onMounted(() => (mounted.value = true))

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
const slugs = (tags: string[]) => tags.map(slug).join(' ')

/** Frequency-sorted, so the tags that actually narrow the list come first. */
const tagCounts = computed(() => {
  const counts = new Map<string, number>()
  for (const record of records.value)
    for (const tag of record.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)

  return [...counts]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
})
</script>
