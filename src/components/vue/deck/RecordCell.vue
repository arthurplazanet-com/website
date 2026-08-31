<template>
  <YCard
    flat
    class="deck-cell"
    role="button"
    @click="emit('open')"
    @keydown.enter="emit('open')"
    @keydown.space.prevent="emit('open')"
    :class="{ 'deck-cell--section': section }"
    tabindex="0"
  >
    <div class="deck-cell-top">
      <span class="deck-lab">{{ section ? 'Section' : `Rec ${index}` }}</span>
      <span v-if="!section" class="deck-cell-state" :data-live="live || undefined">
        <i class="deck-dot" />{{ status }}
      </span>
      <DeckIcon v-else :name="icon ?? 'doc'" />
    </div>

    <h3 class="deck-cell-title">{{ title }}</h3>

    <YRow v-if="tags.length" type="cluster" class="deck-cell-tags" as="ul">
      <li v-for="tag in tags" :key="tag" @click.stop>
        <!-- a tag is the filter control, not a decoration: this chip and the
             one in the bar above drive the same selection -->
        <YChip
          size="small"
          :value="tag"
          :selected="active.includes(tag)"
          @update:selected="emit('toggleTag', tag)"
        >
          {{ tag }}
        </YChip>
      </li>
    </YRow>

    <p class="deck-cell-line">{{ description }}</p>

    <span v-if="!section" class="deck-cell-ghost" aria-hidden="true">{{ index }}</span>
    <DeckIcon v-else class="deck-cell-watermark" :name="icon ?? 'doc'" />

    <div v-if="!section" class="deck-cell-reveal">
      <dl class="deck-specs">
        <div v-for="[key, value] in specs" :key="key">
          <dt>{{ key }}</dt>
          <dd>{{ value }}</dd>
        </div>
      </dl>
      <p v-if="links.length" class="deck-cell-links">
        <a v-for="link in links" :key="link.url" :href="link.url">
          <DeckIcon :name="link.icon" />{{ link.label }}
        </a>
      </p>
    </div>

    <span v-else class="deck-cell-arrow"> Open <DeckIcon name="arrow" /> </span>
  </YCard>
</template>

<script setup lang="ts">
import { YCard, YChip, YRow } from '@use-compose/ui'
import DeckIcon from './icons/DeckIcon.vue'
import type { DeckIconName } from './icons/paths'
import './RecordCell.css'

withDefaults(
  defineProps<{
    index?: string
    title: string
    description: string
    tags?: string[]
    active?: string[]
    status?: string
    live?: boolean
    specs?: Array<[string, string]>
    links?: Array<{ url: string; label: string; icon: DeckIconName }>
    section?: boolean
    icon?: DeckIconName
  }>(),
  { tags: () => [], active: () => [], specs: () => [], links: () => [] }
)

const emit = defineEmits<{ toggleTag: [tag: string]; open: [] }>()
</script>
