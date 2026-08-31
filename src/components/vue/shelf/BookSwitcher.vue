<template>
  <!--
    The only component that knows the shelf's orientation. It emits nothing but
    <label for> controls, so the books never learn what moved them — swapping
    this for a left shelf or a row of header links touches no other file.
  -->
  <nav ref="rail" class="switcher" aria-label="Books">
    <label
      v-for="book in books"
      :key="book.id"
      class="switcher__spine"
      :for="book.id"
      :data-book="book.id"
    >
      <span class="switcher__no">{{ book.no }}</span>
      <YVerticalTitle small>{{ book.name }}</YVerticalTitle>
      <span class="switcher__count">{{ book.count }}</span>
    </label>
  </nav>
</template>

<script setup lang="ts">
import { YVerticalTitle } from "@use-compose/ui";
import { useTemplateRef } from "vue";
import "./BookSwitcher.css";

defineProps<{
  books: Array<{ id: string; no: string; name: string; count: number | string }>;
}>();

// The parent drives the drag and needs the element, not a copy of the state.
defineExpose({ el: useTemplateRef("rail") });
</script>
