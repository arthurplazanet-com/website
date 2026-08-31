<template>
  <a
    v-for="link in links"
    :key="link.url"
    class="link"
    :href="link.url"
    :rel="isExternal(link.url) ? 'noopener noreferrer' : undefined"
    :target="isExternal(link.url) ? '_blank' : undefined"
  >
    {{ link.label }}
  </a>
</template>

<script setup lang="ts">
// Structurally compatible with the generated `Link` type, declared locally on
// purpose: nothing under `components/vue/` should ever import a domain type.
const { links = [] } = defineProps<{
  links?: Array<{ url: string; label: string }>
}>()

// Everything the API hands back points off-site, so the safe rel is the
// default rather than something callers opt into.
const isExternal = (url: string) => /^https?:\/\//i.test(url)
</script>

<style scoped>
.link {
  font-size: 0.875rem;
  color: var(--color-primary, currentcolor);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.link:hover,
.link:focus-visible {
  text-decoration-thickness: 2px;
}
</style>
