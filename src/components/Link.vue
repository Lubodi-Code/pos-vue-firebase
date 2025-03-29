<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="{ name: to }" class="rounded bg-green-400 hover:bg-green-500 } py-2 px-10">
    <slot>Enlace</slot>
  </RouterLink>
</template>