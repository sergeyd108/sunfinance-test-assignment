<script setup lang="ts">
const unitsStore = useUnitsStore()
</script>

<template>
  <div class="flex gap-1">
    <UButton
      :variant="unitsStore.temperatureUnit === 'metric' ? 'solid' : 'ghost'"
      label="°C"
      size="sm"
      @click="unitsStore.temperatureUnit = 'metric'"
    />
    <UButton
      :variant="unitsStore.temperatureUnit === 'imperial' ? 'solid' : 'ghost'"
      label="°F"
      size="sm"
      @click="unitsStore.temperatureUnit = 'imperial'"
    />
  </div>
</template>
