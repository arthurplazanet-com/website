<template>
  <AppCompose :theme="theme">
    <div class="deck-root">
      <!--
        The one piece of state, and it is native. Two radios and a checkbox
        mean the push and the flyer work before this island hydrates; the
        drag handler below only writes --deck-p while a gesture is running.
      -->
      <input id="deck-id" class="deck-state" type="radio" name="deck-panel" checked >
      <input id="deck-open" class="deck-state" type="radio" name="deck-panel" >

      <div ref="viewport" class="deck-viewport">
        <div class="deck-track">
          <IdentityPanel :records="records" />

          <section class="deck-panel deck-panel--records" aria-label="Projects">
            <IndexRail ref="rail" :records="records" />
            <RecordDeck :projects="projects" />
          </section>
        </div>
      </div>

      <DeckBar :count="projects.length" />
    </div>
  </AppCompose>
</template>

<script setup lang="ts">
import { AppCompose } from "@use-compose/ui";
import type { YTheme } from "@use-compose/ui";
import { computed, onBeforeUnmount, onMounted, useTemplateRef } from "vue";
import DeckBar from "./DeckBar.vue";
import IdentityPanel from "./IdentityPanel.vue";
import IndexRail from "./IndexRail.vue";
import RecordDeck from "./RecordDeck.vue";
import { toRecord } from "./records";
import "./deck.css";
import type { Project } from "../../../types/index.ts";

const props = withDefaults(defineProps<{ projects?: Project[] }>(), {
  projects: () => [],
});

// Mirrors assets/css/tokens.css, which stays the source of truth for anything
// CSS reads directly. Compose derives its own ramps from these at runtime.
const theme: YTheme = {
  primary: "#e3c567",
  secondary: "#1c1b1b",
  background: "#000000",
  dark: "#1c1b1b",
  danger: "#f96e46",
  text: "#fefefe",
};

const records = computed(() => props.projects.map(toRecord));

const viewport = useTemplateRef("viewport");
const rail = useTemplateRef<{ el: HTMLElement | null }>("rail");

/**
 * Drag is pure enhancement. It writes --deck-p during the gesture, then drops
 * the inline value and lets the radios own the resting state again.
 */
onMounted(() => {
  const handle = rail.value?.el;
  const frame = viewport.value;
  if (!handle || !frame) return;

  const root = document.documentElement;
  const open = () => document.getElementById("deck-open") as HTMLInputElement;
  const shut = () => document.getElementById("deck-id") as HTMLInputElement;

  let startX = 0;
  let travelled = 0;
  let width = 1;
  let progress = 0;
  let dragging = false;
  let suppressClick = false;

  function down(event: PointerEvent) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragging = true;
    travelled = 0;
    startX = event.clientX;

    const rail = parseFloat(getComputedStyle(root).getPropertyValue("--deck-rail")) || 0;
    width = Math.max(1, frame!.clientWidth - rail);
    progress = open().checked ? 1 : 0;

    frame!.dataset.dragging = "";
    handle!.setPointerCapture(event.pointerId);
  }

  function move(event: PointerEvent) {
    if (!dragging) return;
    const dx = event.clientX - startX;
    travelled = Math.abs(dx);

    const base = open().checked ? 1 : 0;
    // pulling against the current state is damped, so the panel resists
    let next = base + (base ? (dx / width) * 0.9 : -dx / width);
    if (next > 1) next = 1 + (next - 1) * 0.15;
    if (next < 0) next *= 0.15;

    progress = Math.min(1, Math.max(0, next));
    root.style.setProperty("--deck-p", String(progress));
  }

  function up(event: PointerEvent) {
    if (!dragging) return;
    dragging = false;
    delete frame!.dataset.dragging;
    try {
      handle!.releasePointerCapture(event.pointerId);
    } catch {
      /* capture already gone — nothing to release */
    }

    root.style.removeProperty("--deck-p");
    if (travelled < 6) return; // a tap: the label already handles it

    const commit = progress > (open().checked ? 0.78 : 0.22);
    (commit ? open() : shut()).checked = true;
    suppressClick = true;
  }

  function click(event: MouseEvent) {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopPropagation();
  }

  function key(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    if (open().checked) shut().checked = true;
  }

  handle.addEventListener("pointerdown", down);
  handle.addEventListener("pointermove", move);
  handle.addEventListener("pointerup", up);
  handle.addEventListener("pointercancel", up);
  handle.addEventListener("click", click, true);
  document.addEventListener("keydown", key);

  onBeforeUnmount(() => {
    handle.removeEventListener("pointerdown", down);
    handle.removeEventListener("pointermove", move);
    handle.removeEventListener("pointerup", up);
    handle.removeEventListener("pointercancel", up);
    handle.removeEventListener("click", click, true);
    document.removeEventListener("keydown", key);
  });
});
</script>
