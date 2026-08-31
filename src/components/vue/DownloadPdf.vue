<template>
  <a :href="pdfUrl" download target="_blank">
    <YButton variant="outlined"> Download PDF </YButton>
  </a>
</template>

<script setup lang="ts">
import { YButton } from '@use-compose/ui'
const pdfUrl = `${import.meta.env.PUBLIC_API_URL}/resume/pdf`
</script>
