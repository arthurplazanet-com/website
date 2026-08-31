<template>
  <section class="deck-panel deck-panel--id" aria-label="Identity">
    <YStack class="deck-id" gap="1.4rem">
      <div class="deck-id-top">
        <span class="deck-lab">01 / Identity</span>
        <span class="deck-lab">Bordeaux · FR</span>
      </div>

      <h1 class="deck-mast">Arthur<em>Plazanet</em></h1>

      <!-- the highlight lands after the panel settles, so the one sentence that
           says what I do is the last thing to move -->
      <YHighlightedText as="p" class="deck-id-role" animate active>
        Full-stack engineer.
      </YHighlightedText>

      <p class="deck-id-sub">
        Design systems, component libraries and the build plumbing under them — Vue
        and Nuxt on the front, AdonisJS and GitHub Actions behind it.
      </p>

      <!-- the whole portfolio is readable before you move anything -->
      <ol class="deck-index">
        <li class="deck-index-head">
          <DeckIcon name="layers" />
          <span class="deck-lab">Behind this panel — {{ records.length }} records</span>
        </li>
        <li v-for="record in records" :key="record.key">
          <b>{{ record.index }}</b>
          <span class="deck-index-name">{{ record.title }}</span>
          <span class="deck-index-tags">{{ record.tags.slice(0, 3).join(" · ") }}</span>
          <span class="deck-index-state" :data-live="record.live || undefined">
            <i class="deck-dot" />{{ record.status }}
          </span>
        </li>
      </ol>

      <YSection class="deck-facts" as="dl">
        <div v-for="[key, value] in FACTS" :key="key">
          <dt class="deck-lab">{{ key }}</dt>
          <dd>{{ value }}</dd>
        </div>
      </YSection>

      <YRow type="cluster" class="deck-id-foot">
        <a href="https://github.com/arthu-pr"><DeckIcon name="code" />GitHub</a>
        <a href="mailto:plazanet.art@gmail.com"><DeckIcon name="mail" />plazanet.art@gmail.com</a>
        <a href="/cv.pdf"><DeckIcon name="doc" />Download CV</a>
      </YRow>
    </YStack>
  </section>
</template>

<script setup lang="ts">
import { YHighlightedText, YRow, YSection, YStack } from "@use-compose/ui";
import DeckIcon from "./icons/DeckIcon.vue";
import type { DeckRecord } from "./records";
import "./IdentityPanel.css";

defineProps<{ records: DeckRecord[] }>();

const FACTS: Array<[string, string]> = [
  ["Front", "Vue 3 · Nuxt 4 · Astro 6 · MDX"],
  ["Back", "AdonisJS 6 · TypeScript · Node 22"],
  ["Ops", "GitHub Actions · rsync · VPS"],
  ["Tooling", "pnpm · Renovate · Vite"],
];
</script>
