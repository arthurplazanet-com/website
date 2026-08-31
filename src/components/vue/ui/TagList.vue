<template>
  <YTag v-for="label in labels" :key="label">{{ label }}</YTag>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { YTag } from "@use-compose/ui";

// `Tag[]` is what the generated type promises, but the API model serialises
// tags down to their labels before sending them, so both shapes turn up
// depending on the endpoint. Normalise instead of trusting either.
const props = defineProps<{
  tags?: Array<string | { label?: string }>;
}>();

const labels = computed(() =>
  (props.tags ?? [])
    .map((tag) => (typeof tag === "string" ? tag : tag?.label))
    .filter((label): label is string => Boolean(label)),
);
</script>
