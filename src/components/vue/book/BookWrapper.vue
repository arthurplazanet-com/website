<template>
  <div class="panel-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { YContainer } from '@use-compose/ui'
</script>

<style>
.panel-wrapper {
  height: 100svh;
  width: 100dvw;
  overflow: hidden;
  z-index: 0;
  position: relative;
}
.panel-wrapper .panel-section:has(svg:active) {
  width: 90%;
  z-index: 1;

  transition: width 0.3s ease-in-out;
}
</style>
