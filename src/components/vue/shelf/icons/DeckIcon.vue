<template>
  <svg class="deck-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path :d="PATHS[name]" />
  </svg>
</template>

<script setup lang="ts">
import "./icons.css";
import { PATHS, type DeckIconName } from "./paths";

defineProps<{ name: DeckIconName }>();
</script>
