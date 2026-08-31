<template>
  <div class="deck-toolbar">
    <span class="deck-toolbar-brand">
      <i class="deck-dot deck-dot--live" />
      <span>
        <b>Available for work</b>
        <em>Contract · full-time</em>
      </span>
    </span>

    <span class="deck-toolbar-cell">
      <DeckIcon name="clock" />
      <span>
        <b>{{ clock }}</b>
        <em>Bordeaux · CET</em>
      </span>
    </span>

    <span class="deck-toolbar-cell deck-toolbar-cell--wide">
      <DeckIcon name="layers" />
      <span>
        <b>{{ count }} records</b>
        <!-- the hint has to change with the state, or it is telling you how to
             do the thing you already did -->
        <em class="deck-hint-shut">Push the rail · drag, click, or Tab + arrows</em>
        <em class="deck-hint-open">Back via the rail, Esc, or ← — records scroll</em>
      </span>
    </span>

    <label class="deck-toolbar-btn">
      <input v-model="gutters" type="checkbox" />
      <span class="deck-toolbar-box" />Gutters
    </label>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import DeckIcon from './icons/DeckIcon.vue'
import './DeckBar.css'

defineProps<{ count: number }>()

const clock = ref('--:--')
const gutters = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

function tick() {
  const now = new Date()
  clock.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

// The gutter switch is a presentation knob, so it sets one custom property and
// lets CSS decide what a gutter means — no class plumbing through the tree.
watchEffect(() => {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.deckGutters = gutters.value ? 'on' : 'off'
})

onMounted(() => {
  tick()
  timer = setInterval(tick, 10_000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>
