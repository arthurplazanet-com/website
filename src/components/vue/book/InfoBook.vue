<template>
  <PanelSection style="--panel-width: 80dvw" class="info-book">
    <KeplaIcon width="150px" />
    <button
      class="lamp-trigger"
      type="button"
      :aria-pressed="revealed"
      aria-label="Toggle projects"
      @click="revealed = !revealed"
    >
      <img :src="lampImg.src" alt="" />
    </button>
    <!-- <div class="cs-center"> -->
    <YScreen>
      <SiteHeader />

      <h1>Arthur nanana</h1>

      <footer>
        <p class="text-sm text-center text-muted">
          &copy; 2024 Arthur Plazanet. All rights reserved.
        </p>
      </footer>
      <!-- </div> -->
      <!-- </div> -->
    </YScreen>
  </PanelSection>
</template>

<script setup lang="ts">
import type { YTheme } from '@use-compose/ui'
import { AppCompose, YScreen, YCenter, YWrapper, YButton } from '@use-compose/ui'
import type { Project, Experience } from '../../../types'
import SiteHeader from '../ui/SiteHeader.vue'
import PanelSection from '../ui/PanelSection.vue'
import lampImg from '../../../assets/img/lab/lamp.png'
import { ref } from 'vue'
import KeplaIcon from '../icons/KeplaIcon.vue'

const revealed = ref(false)
</script>
<style>
.panel-section.info-book {
  position: absolute;
  z-index: 2;
}
.lamp-trigger {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 64px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  opacity: 1;
  transition: opacity 150ms linear;
}
</style>
