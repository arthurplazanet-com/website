<template>
  <YBox client:load class="panel-section">
    <YWrapper>
      <slot />
    </YWrapper>
  </YBox>
</template>

<script setup lang="ts">
import { AppCompose, YScreen, YCenter, YWrapper, YButton, YBox } from '@use-compose/ui'
import SiteHeader from '../ui/SiteHeader.vue'
import { ref } from 'vue'

const revealed = ref(false)
</script>

<!-- <style>
.panel-section {
  position: relative;
  inset: 0;
  --panel-width: 100dvw;
  max-height: 100svh;
  max-width: var(--panel-width);
  display: flex;
  justify-content: center;
  background-color: var(--color-bg);
  /* align-items: center; */
  z-index: 1;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  /* transform: translateX(calc((100dvw - var(--panel-width)) / 2)); */
}
</style> -->
