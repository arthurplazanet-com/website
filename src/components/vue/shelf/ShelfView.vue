<template>
  <AppCompose :theme="theme">
    <ShelfHeader />

    <div class="shelf">
      <div ref="stage" class="stage">
        <IdentityBook :books="books" />
        <ProjectsBook :projects="projects" />
        <ExperienceBook :experiences="experiences" />
      </div>

      <BookSwitcher ref="switcher" :books="books" />
    </div>
  </AppCompose>
</template>

<script setup lang="ts">
import { AppCompose, YScreen } from "@use-compose/ui";
import type { YTheme } from "@use-compose/ui";
import { computed, onBeforeUnmount, onMounted, useTemplateRef } from "vue";
import BookSwitcher from "./BookSwitcher.vue";
import ExperienceBook from "./ExperienceBook.vue";
import IdentityBook from "./IdentityBook.vue";
import ProjectsBook from "./ProjectsBook.vue";
import ShelfHeader from "./ShelfHeader.vue";
import "./type.css";
import "./shelf.css";
import type { Experience, Project } from "../../../types/index.ts";

const props = withDefaults(
  defineProps<{ projects?: Project[]; experiences?: Experience[] }>(),
  { projects: () => [], experiences: () => [] },
);

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

const ORDER = ["book-id", "book-projects", "book-experience"] as const;

const books = computed(() => [
  { id: "book-id", no: "01", name: "Identity", count: "—" },
  {
    id: "book-projects",
    no: "02",
    name: "Projects",
    count: props.projects.length,
  },
  {
    id: "book-experience",
    no: "03",
    name: "Experience",
    count: props.experiences.length,
  },
]);

const stage = useTemplateRef<HTMLElement>("stage");
const switcher = useTemplateRef<{ el: HTMLElement | null }>("switcher");

/**
 * Drag is pure enhancement: it moves to the neighbouring book and hands the
 * resting state straight back to the radios. Removing this block changes
 * nothing except that you have to click the spines.
 */
// onMounted(() => {
//   const handle = switcher.value?.el;
//   const root = stage.value?.closest<HTMLElement>(".shelf-root");
//   if (!handle || !root) return;

//   const at = () =>
//     ORDER.findIndex(
//       (id) => (document.getElementById(id) as HTMLInputElement)?.checked,
//     );
//   const go = (i: number) => {
//     const next = document.getElementById(
//       ORDER[Math.min(ORDER.length - 1, Math.max(0, i))],
//     );
//     if (next) (next as HTMLInputElement).checked = true;
//   };

//   let startY = 0;
//   let travelled = 0;
//   let dragging = false;

//   function down(event: PointerEvent) {
//     if (event.pointerType === "mouse" && event.button !== 0) return;
//     dragging = true;
//     travelled = 0;
//     startY = event.clientY;
//     root!.classList.add("shelf-drag");
//     handle!.setPointerCapture(event.pointerId);
//   }

//   function move(event: PointerEvent) {
//     if (!dragging) return;
//     travelled = event.clientY - startY;
//   }

//   function up(event: PointerEvent) {
//     if (!dragging) return;
//     dragging = false;
//     root!.classList.remove("shelf-drag");
//     try {
//       handle!.releasePointerCapture(event.pointerId);
//     } catch {
//       /* capture already gone */
//     }
//     /* a short drag is a click; the label handles that itself */
//     if (Math.abs(travelled) < 40) return;
//     go(at() + (travelled > 0 ? 1 : -1));
//   }

//   function key(event: KeyboardEvent) {
//     if (event.key === "ArrowRight" || event.key === "ArrowDown") go(at() + 1);
//     if (event.key === "ArrowLeft" || event.key === "ArrowUp") go(at() - 1);
//   }

//   handle.addEventListener("pointerdown", down);
//   handle.addEventListener("pointermove", move);
//   handle.addEventListener("pointerup", up);
//   handle.addEventListener("pointercancel", up);
//   handle.addEventListener("keydown", key);

//   onBeforeUnmount(() => {
//     handle.removeEventListener("pointerdown", down);
//     handle.removeEventListener("pointermove", move);
//     handle.removeEventListener("pointerup", up);
//     handle.removeEventListener("pointercancel", up);
//     handle.removeEventListener("keydown", key);
//   });
// });
</script>
