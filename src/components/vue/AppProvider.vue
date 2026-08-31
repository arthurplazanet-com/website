<script setup lang="ts">
import {
  type PortfolioContentContext,
  providePortfolioContentContext,
} from './portfolio-content-context'
import { computed, toRef } from 'vue'

const props = withDefaults(defineProps<PortfolioContentContext>(), {
  projects: () => [],
  experiences: () => [],
})
console.log('📟 - props → ', props)

// Provide the portfolio content context to child components - using computed to ensure reactivity (if not it will read the props value just once)
const portfolioContent = toRef(props)
console.log('📟 - portfolioContent → ', portfolioContent)
providePortfolioContentContext(portfolioContent)
</script>

<template>
  <slot />
</template>
