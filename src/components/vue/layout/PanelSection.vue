<template>
  <YWrapper client:load class="panel-section">
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
  </YWrapper>
</template>

<script setup lang="ts">
import type { YTheme } from "@use-compose/ui";
import {
  AppCompose,
  YScreen,
  YCenter,
  YWrapper,
  YButton,
} from "@use-compose/ui";
import type { Project, Experience } from "../../../types";
import SiteHeader from "../ui/SiteHeader.vue";
import lampImg from "../../../assets/img/lab/lamp.png";
import { ref } from "vue";

const revealed = ref(false);
</script>
