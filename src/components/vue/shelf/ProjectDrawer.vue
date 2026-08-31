<template>
  <YModal
    v-model="open"
    type="drawer"
    side="right"
    size="medium"
    has-vertical-header
    :has-footer="false"
    :header="project?.title ?? ''"
  >
    <div v-if="project" class="deck-drawer">
      <!-- the picture is the reason to open a drawer at all; the lattice cell
           only ever had room for a line of text -->
      <figure v-if="project.picture && !brokenImage" class="deck-drawer-media">
        <img
          :src="project.picture"
          :alt="project.title"
          loading="lazy"
          @error="brokenImage = true"
        />
      </figure>

      <p class="deck-drawer-state" :data-live="project.live || undefined">
        <i class="deck-dot" />{{ project.status }}
        <span class="deck-lab">Rec {{ project.index }}</span>
      </p>

      <p class="deck-drawer-body">{{ project.body || project.description }}</p>

      <YRow v-if="project.tags.length" type="cluster" class="deck-drawer-tags">
        <YChip
          v-for="tag in project.tags"
          :key="tag"
          size="small"
          :value="tag"
          :selected="active.includes(tag)"
          @update:selected="emit('toggleTag', tag)"
        >
          {{ tag }}
        </YChip>
      </YRow>

      <dl v-if="project.specs.length" class="deck-specs deck-drawer-specs">
        <div v-for="[key, value] in project.specs" :key="key">
          <dt>{{ key }}</dt>
          <dd>{{ value }}</dd>
        </div>
      </dl>

      <p v-if="project.links.length" class="deck-cell-links deck-drawer-links">
        <a v-for="link in project.links" :key="link.url" :href="link.url">
          <DeckIcon :name="link.icon" />{{ link.label }}
        </a>
      </p>
    </div>
  </YModal>
</template>

<script setup lang="ts">
import { YChip, YModal, YRow } from '@use-compose/ui'
import { computed, ref, watch } from 'vue'
import DeckIcon from './icons/DeckIcon.vue'
import type { DeckRecord } from './records'
import './ProjectDrawer.css'

const props = defineProps<{
  project: DeckRecord | null
  active: string[]
}>()

const emit = defineEmits<{ close: []; toggleTag: [tag: string] }>()

// A bad URL should collapse the figure, not leave a broken-image glyph sitting
// in the middle of a layout with no rounded corners to hide behind.
const brokenImage = ref(false)
watch(
  () => props.project?.key,
  () => (brokenImage.value = false)
)

// The drawer's own open state is derived: a project is selected, or it isn't.
const open = computed({
  get: () => props.project !== null,
  set: (value: boolean) => {
    if (!value) emit('close')
  },
})
</script>
