<template>
  <section class="book book--id" aria-label="Identity">
    <div class="book__inner id">
      <div class="book__head">
        <span class="shelf-label">01 / Identity</span>
        <span class="shelf-label">Bordeaux · FR</span>
      </div>

      <YStack gap="1.2rem" class="id__body">
        <h1>Arthur<em>Plazanet</em></h1>

        <YHighlightedText as="p" class="id__lead" animate active>
          Full-stack engineer.
        </YHighlightedText>

        <YWrapper>
          <p class="id__prose">
            Design systems, component libraries and the build plumbing under them — Vue and Nuxt on
            the front, AdonisJS and GitHub Actions behind it.
          </p>
        </YWrapper>

        <!-- A plain grid: four fixed cells that should always sit in one row
             until the breakpoint. YRow's switcher is for content that genuinely
             does not know its own count; it is used for the chip and link rows. -->
        <dl class="id__facts">
          <div v-for="[key, value] in FACTS" :key="key">
            <dt class="shelf-label">{{ key }}</dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>

        <ol class="id__index">
          <li v-for="book in books" :key="book.id">
            <b>{{ book.no }}</b>
            <span class="id__index-name">{{ book.name }}</span>
            <span class="shelf-label">{{ book.count }} records</span>
          </li>
        </ol>

        <YRow type="cluster" class="id__links">
          <a href="https://github.com/arthu-pr"><DeckIcon name="code" />GitHub</a>
          <a href="mailto:plazanet.art@gmail.com"><DeckIcon name="mail" />plazanet.art@gmail.com</a>
        </YRow>
      </YStack>
    </div>
  </section>
</template>

<script setup lang="ts">
import { YHighlightedText, YRow, YStack, YWrapper } from '@use-compose/ui'
import DeckIcon from './icons/DeckIcon.vue'
import './IdentityBook.css'

defineProps<{
  books: Array<{ id: string; no: string; name: string; count: number | string }>
}>()

const FACTS: Array<[string, string]> = [
  ['Front', 'Vue 3 · Nuxt 4 · Astro 6'],
  ['Back', 'AdonisJS 6 · Node 22'],
  ['Ops', 'GitHub Actions · rsync'],
  ['Tooling', 'pnpm · Renovate · Vite'],
]
</script>
