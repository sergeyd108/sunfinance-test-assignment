<script setup lang="ts">
const weatherStore = useWeatherStore()
</script>

<template>
  <div class="flex gap-1">
    <UButton
      :variant="weatherStore.unit === 'metric' ? 'solid' : 'ghost'"
      label="°C"
      size="sm"
      @click="weatherStore.unit = 'metric'"
    />
    <UButton
      :variant="weatherStore.unit === 'imperial' ? 'solid' : 'ghost'"
      label="°F"
      size="sm"
      @click="weatherStore.unit = 'imperial'"
    />
  </div>
</template>
