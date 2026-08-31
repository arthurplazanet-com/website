<template>
  <YCard style="--card-media-height: 12rem">
    <template #media>
      <img :src="defaultImg.src" alt="Cover" loading="lazy" decoding="async" />
    </template>

    <h3 class="title">{{ project.name }}</h3>

    <!-- Rich text authored in the back-office. It arrives as block markup, so
         it goes in the default slot rather than a `description` prop — that
         prop wraps its value in a <p>, which block children would make
         invalid. -->
    <div class="description" v-html="project.description" />

    <template #meta>
      <template v-if="tags.length > 0">
        <TagList :tags="tags" />
      </template>

      <template v-if="links.length > 0">
        <LinkList :links="links" />
      </template>
    </template>
  </YCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { YCard } from '@use-compose/ui'
import defaultImg from '../../assets/img/image.png'
import TagList from '../../components/vue/ui/TagList.vue'
import LinkList from '../../components/vue/ui/LinkList.vue'
import type { Project } from '../../types/index.ts'

const { project } = defineProps<{
  project: Project
}>()

const tags = computed(() => project.tags ?? [])
const links = computed(() => project.links ?? [])
</script>

<style scoped>
.title {
  font-family: var(--font-title);
  font-size: 1.125rem;
}

.description :deep(p) {
  margin: 0;
}

.description :deep(* + p) {
  margin-block-start: 0.5em;
}
</style>
