<template>
  <div ref="rail" class="deck-rail">
    <!-- only visible while a drag is in progress; it is a gesture readout,
         not a state indicator, so it must not linger once the panel lands -->
    <span class="deck-rail-fill" aria-hidden="true" />

    <p class="deck-rail-head">02<b>Projects</b></p>

    <!-- In flow, so the index below it is never covered. It is only the visual;
         the label underneath is what actually takes the click. -->
    <span class="deck-rail-back" aria-hidden="true">
      <DeckIcon name="arrowLeft" />
      Back
    </span>

    <ol class="deck-rail-index">
      <li v-for="(record, i) in records" :key="record.id" :data-live="record.live || undefined">
        <i class="deck-dot" />{{ String(i + 1).padStart(2, '0') }}
      </li>
    </ol>

    <label class="deck-rail-act deck-rail-act--open" for="deck-open">
      <YVerticalTitle small>Push to open</YVerticalTitle>
      <DeckIcon name="arrow" />
      <span class="deck-sr">Open the project deck</span>
    </label>

    <!-- Back sits at the top of the rail, where a back control is looked for.
         The label still covers the whole rail, so clicking anywhere goes back —
         the button is the part that says so. -->
    <label class="deck-rail-act deck-rail-act--back" for="deck-id">
      <YVerticalTitle small>01 / Identity</YVerticalTitle>
      <span class="deck-sr">Back to identity</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { YVerticalTitle } from '@use-compose/ui'
import { useTemplateRef } from 'vue'
import DeckIcon from './icons/DeckIcon.vue'
import './IndexRail.css'

defineProps<{
  records: Array<{ id: string; live?: boolean }>
}>()

// The parent drives the drag; it needs the element, not a copy of the state.
defineExpose({ el: useTemplateRef('rail') })
</script>
