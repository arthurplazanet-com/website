<template>
  <div class="stage" :class="{ 'is-revealed': revealed }">
    <div class="card-panel">
      <button class="btn btn-primary" type="button">Primary</button>
      <button class="btn btn-secondary" type="button">Secondary</button>

      <button
        class="lamp-trigger"
        type="button"
        :aria-pressed="revealed"
        aria-label="Toggle projects"
        @click="revealed = !revealed"
      >
        <img :src="lampImg.src" alt="" />
      </button>

      <div class="id-box">
        <p class="id-name">Arthur Plazanet</p>
        <p class="id-role">Développeur Full-Stack en Freelance</p>
      </div>

      <div class="flags">
        <span class="flag flag-fr" title="Français" />
        <span class="flag flag-gb" title="English" />
        <span class="flag flag-de" title="Deutsch" />
      </div>
    </div>

    <div class="reveal-panel">
      <h2 class="reveal-title"><span class="tick" />projects</h2>

      <div class="thumb-grid">
        <div class="thumb thumb-a" />
        <div class="thumb thumb-b" />
        <div class="thumb thumb-c" />
        <div class="thumb thumb-d" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import lampImg from '../../../assets/img/lab/lamp.png'

// First pass: prove out the click-to-reveal interaction and the card's
// "float into place" motion. Real project thumbnails, exact positions and
// a proper responsive layout come once this feels right.
const revealed = ref(false)
</script>

<style scoped>
.stage {
  --card-width: 380px;

  display: flex;
  align-items: stretch;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.card-panel {
  position: relative;
  flex: 0 0 85%;
  width: 100svw;
  background: #1d1d1d;
  padding: 1.5rem;
  z-index: 1;

  /* At rest the card covers the whole screen, so its shadow trails off past
     the viewport edge — `.stage`'s overflow:hidden clips that, no scrollbar. */
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.35);

  /* Deliberately flat: no overshoot, no easing tricks — a slow, even slide
     reads cold/mechanical rather than springy. */
  transition:
    flex-basis 1300ms cubic-bezier(0.65, 0, 0.35, 1),
    box-shadow 1300ms linear,
    transform 3s ease-in-out;
}

.btn {
  display: block;
  box-sizing: border-box;
  font-family: var(--font-aporetic-sans-mono);
  font-weight: bold;
  border: none;
  border-radius: 0;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1.25rem;
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5);
  cursor: default;
}

.btn-primary {
  background: #ff0;
  color: #1d1d1d;
}

.btn-secondary {
  background: #1d1d1d;
  color: #fff;
  border: 2px solid #fff;
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

.stage.is-revealed .card-panel {
  transform: translate(-99%, -5%) rotateZ(15deg);
  transition:
    transform 3s ease-in-out,
    box-shadow 3s ease-in-out;
}

.lamp-trigger:hover {
  opacity: 0.7;
}

.lamp-trigger img {
  display: block;
  width: 100%;
  filter: drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.5));
}

.id-box {
  margin-top: 4.5rem;
  border: 2px dashed #ff0;
  padding: 1.5rem;
  text-align: center;
}

.id-name {
  font-family: var(--font-aporetic-serif-mono);
  color: #ff0;
  font-size: 1.4rem;
  margin: 0 0 0.5rem;
}

.id-role {
  color: #fff;
  font-size: 0.9rem;
  margin: 0;
}

.flags {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 3rem;
}

.flag {
  display: inline-block;
  width: 28px;
  height: 20px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15);
}

.flag-fr {
  background: linear-gradient(to right, #002395 33%, #fff 33% 66%, #ed2939 66%);
}

.flag-gb {
  background: #00247d;
  position: relative;
  overflow: hidden;
}

.flag-gb::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, transparent 40%, #fff 40% 60%, transparent 60%),
    linear-gradient(to right, transparent 40%, #fff 40% 60%, transparent 60%),
    linear-gradient(to bottom, transparent 46%, #cf142b 46% 54%, transparent 54%),
    linear-gradient(to right, transparent 46%, #cf142b 46% 54%, transparent 54%);
}

.flag-de {
  background: linear-gradient(to bottom, #000 33%, #dd0000 33% 66%, #ffce00 66%);
}

.reveal-panel {
  /* Always mounted at full viewport size, right under the card — the card
     itself is what does the revealing (shrinking from 85% to --card-width),
     so this panel doesn't need its own fade/slide anymore. */
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  /* padding: 3rem 3rem 3rem calc(var(--card-width) + 3rem); */
  z-index: 0;
  pointer-events: none;
}

.stage.is-revealed .reveal-panel {
  pointer-events: auto;
}

.reveal-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-aporetic-sans-mono);
  text-transform: lowercase;
  color: #1d1d1d;
  margin: 0 0 2rem;
}

.tick {
  width: 1rem;
  height: 1rem;
  background: #ff0;
}

.thumb-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
}

.thumb {
  box-shadow: 6px 8px 0 rgba(0, 0, 0, 0.2);
}

.thumb-a {
  aspect-ratio: 4 / 3;
  background: #1d1d1d;
}

.thumb-b {
  aspect-ratio: 4 / 3;
  background: #fff;
  box-shadow:
    6px 8px 0 rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px #1d1d1d;
}

.thumb-c {
  aspect-ratio: 3 / 4;
  background: #ff0;
}

.thumb-d {
  aspect-ratio: 3 / 4;
  background: #1d1d1d;
}
</style>
