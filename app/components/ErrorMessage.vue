<script setup lang="ts">
defineProps<{ error?: string }>()
</script>

<template>
  <UAlert v-if="error" :description="error" color="error" variant="soft" icon="i-lucide-triangle-alert" class="mb-4" />
</template>
