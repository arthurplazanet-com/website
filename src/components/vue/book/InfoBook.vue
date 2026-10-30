<template>
  <!--
    The cover. It is the top of the stack, so the only thing it owes the reader
    is a way off it — the lamp is a <label for="panel-open">, which is why there
    is no click handler and no local `revealed` ref here any more. panel.css
    reads the radio and does the push.
  -->
  <section class="panel-section panel--cover info-book" aria-label="Identity">
    <div class="info-book__body">
      <KeplaIcon width="150px" />

      <h1 class="info-book__name">Arthur Plazanet</h1>
      <p class="info-book__role">Software Engineer — Berlin</p>
    </div>

    <label class="lamp-trigger" for="panel-open">
      <img :src="lampImg.src" alt="" />
      <span class="lamp-trigger__label">Push to open</span>
    </label>
  </section>
</template>

<script setup lang="ts">
import lampImg from '../../../assets/img/lab/lamp.png'
import KeplaIcon from '../icons/KeplaIcon.vue'
</script>

<style>
.info-book {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-lg);
}

.info-book__name {
  margin: var(--space-md) 0 0;
  font-family: var(--font-title);
  font-size: clamp(2.5rem, 8vw, 6rem);
  line-height: 0.95;
  text-transform: uppercase;
}

.info-book__role {
  margin: var(--space-xs) 0 0;
  color: var(--muted);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.lamp-trigger {
  position: absolute;
  inset-block-start: var(--space-md);
  inset-inline-end: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-xxs);
  align-items: center;
  width: 64px;
  cursor: pointer;
}

.lamp-trigger img {
  width: 100%;
}

.lamp-trigger__label {
  font-size: var(--text-sm);
  line-height: 1.1;
  text-align: center;
  color: var(--color-primary);
}
</style>
