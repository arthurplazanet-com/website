<template>
  <form class="deck-records" @submit.prevent>
    <header class="deck-bar-top">
      <h2 class="deck-title">Projects <span>/ 02</span></h2>
    </header>

    <YRow type="cluster" class="deck-filters">
      <span class="deck-filters-label deck-lab"> <DeckIcon name="filter" />Tags </span>

      <!-- multiple: selecting two tags widens the result, it does not narrow
           it. YChipGroup owns the selection; the cards just read it. -->
      <YChipGroup v-model="active" multiple class="deck-chips">
        <YChip v-for="tag in tagCounts" :key="tag.label" size="small" :value="tag.label">
          {{ tag.label }} <b>{{ tag.count }}</b>
        </YChip>
      </YChipGroup>

      <button v-show="active.length" type="button" class="deck-clear" @click="active = []">
        <DeckIcon name="close" />Clear
      </button>
    </YRow>

    <div class="deck-scroller">
      <div class="deck-lattice">
        <RecordCell
          v-for="(record, i) in visible"
          :key="record.key"
          v-bind="record"
          :index="record.index"
          :active="active"
          :style="{ '--deck-stagger': `${Math.min(i, 8) * 40}ms` }"
          @toggle-tag="toggle"
          @open="opened = record.section ? null : record"
        />
      </div>
    </div>

    <footer class="deck-foot">
      <span class="deck-lab">
        Showing <b>{{ shown }}</b> / {{ projects.length }} records
      </span>
      <span class="deck-foot-hint deck-lab">
        <DeckIcon name="tag" />Tags filter · click any tag on a card
      </span>
    </footer>

    <!--
      Client-only on purpose. YOverlay's Transition renders a <style> on the
      server where the client expects a <div>, so server-rendering the modal
      produces a hydration mismatch for a panel that always starts closed.
    -->
    <ProjectDrawer
      v-if="mounted"
      :project="opened"
      :active="active"
      @close="opened = null"
      @toggle-tag="toggle"
    />
  </form>
</template>

<script setup lang="ts">
import { YChip, YChipGroup, YRow } from '@use-compose/ui'
import { computed, onMounted, ref } from 'vue'
import DeckIcon from './icons/DeckIcon.vue'
import ProjectDrawer from './ProjectDrawer.vue'
import RecordCell from './RecordCell.vue'
import { SECTIONS, toRecord, type DeckRecord } from './records'
import './RecordDeck.css'
import type { Project } from '../../../types/index.ts'

const props = defineProps<{ projects: Project[] }>()

const active = ref<string[]>([])

/** Which record the drawer is showing. null closes it. */
const opened = ref<DeckRecord | null>(null)

const mounted = ref(false)
onMounted(() => (mounted.value = true))

function toggle(tag: string) {
  active.value = active.value.includes(tag)
    ? active.value.filter((t) => t !== tag)
    : [...active.value, tag]
}

const records = computed(() => props.projects.map(toRecord))

/** Frequency-sorted so the tags that actually narrow the list come first. */
const tagCounts = computed(() => {
  const counts = new Map<string, number>()
  for (const record of records.value)
    for (const tag of record.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)

  return [...counts]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
})

/** Selecting two tags widens the result, it does not narrow it — OR, not AND. */
const matching = computed(() =>
  active.value.length
    ? records.value.filter((r) => r.tags.some((t) => active.value.includes(t)))
    : records.value
)

const shown = computed(() => matching.value.length)

// The site sections ride the same lattice so the deck is the whole index,
// not just the project list. They are never filtered out by a project tag.
const visible = computed(() => [...matching.value, ...SECTIONS])
</script>
