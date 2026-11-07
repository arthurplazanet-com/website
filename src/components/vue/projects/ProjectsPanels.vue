<template>
  <!--
    The panel behind. It is a plain scrolling column: panel.css hands it
    `overflow-y: auto` only once the cover is off, so nothing scrolls under a
    cover nobody can see through.

    The lattice itself is RecordDeck — the same component DeckView uses, so the
    filter chips, the clickable in-card tags, the ghost numerals and the
    hover spec-table live in one place and not two.
  -->
  <section class="panel-section panel--back projects-panel" aria-label="Projects">
    <RecordDeck :projects="projects ?? []" />
  </section>
</template>

<script setup lang="ts">
import type { PortfolioContentInterface } from '../portfolio-content-context.ts'
import RecordDeck from '../deck/RecordDeck.vue'
import { usePortfolioContentContext } from '../portfolio-content-context.ts'

const { projects } = usePortfolioContentContext() as PortfolioContentInterface
</script>

<style>
.projects-panel {
  background-color: var(--color-bg);
}

/* The deck sizes to its content; here it is the whole panel, so the lattice
   fills the height instead of leaving dead ground under the last row. */
.projects-panel > .deck-records {
  min-height: 100%;
}
</style>
