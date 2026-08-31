<template>
  <a class="card-link" :href="`/snippets/${snippet.slug}`">
    <Card>
      <template #header>
        <h3 class="title">{{ snippet.title }}</h3>
        <span class="language">{{ snippet.language }}</span>
      </template>

      <p class="description">{{ snippet.description }}</p>

      <template v-if="tags.length > 0" #tags>
        <TagList :tags="tags" />
      </template>
    </Card>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card } from '@use-compose/ui'
import TagList from '../../components/vue/ui/TagList.vue'
import type { Snippet } from '../../types/index.ts'

const { snippet } = defineProps<{
  snippet: Snippet
}>()

const tags = computed(() => snippet.tags ?? [])
</script>

<style scoped>
.card-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.title {
  font-family: var(--font-title);
  font-size: 1.125rem;
}

.language {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--muted);
}

.description {
  margin: 0;
}
</style>
