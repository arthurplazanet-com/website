<template>
  <SiteShell>
    <SnippetGrid :snippets="snippets" />
  </SiteShell>
</template>

<script setup lang="ts">
import SiteShell from './SiteShell.vue'
import SnippetGrid from '../../../snippets/components/SnippetGrid.vue'

defineProps<{
  snippets?: Snippet[]
}>()
</script>
