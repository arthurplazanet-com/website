<template>
  <YHeader class="shelf-header">
    <template #left>
      <a class="shelf-header__mark" href="/">AP</a>
    </template>

    <template #right>
      <YRow type="cluster" class="shelf-header__links">
        <a v-for="link in LINKS" :key="link.href" :href="link.href">
          <DeckIcon :name="link.icon" />{{ link.label }}
        </a>
        <span class="shelf-header__status"><i class="shelf-dot" />Available</span>
      </YRow>
    </template>
  </YHeader>
</template>

<script setup lang="ts">
import { YHeader, YRow } from "@use-compose/ui";
import DeckIcon from "./icons/DeckIcon.vue";
import type { DeckIconName } from "./icons/paths";
import "./ShelfHeader.css";

// Blog and snippets are ordinary Astro routes, not books — one post and an
// empty folder is nowhere near a section's worth.
const LINKS: Array<{ href: string; label: string; icon: DeckIconName }> = [
  { href: "/blog", label: "Blog", icon: "doc" },
  { href: "/snippets", label: "Snippets", icon: "terminal" },
  { href: "/cv.pdf", label: "CV", icon: "layers" },
];
</script>
