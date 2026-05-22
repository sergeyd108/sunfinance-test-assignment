<script setup lang="ts">
import CitySearchInput from '~/features/cities/CitySearchInput.vue'

const error = ref<string>()
</script>

<template>
  <div class="flex grow items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <UIcon name="i-lucide-cloud-sun" class="text-primary mx-auto mb-4 size-16" />
        <h1 class="mb-2 text-3xl font-bold">Weather Forecast</h1>
        <p class="text-muted text-sm">Search for any city to get current weather</p>
      </div>

      <ErrorMessage :error />

      <CitySearchInput
        class="w-full"
        @select="$router.push(`/forecast?lat=${$event.coord.lat}&lon=${$event.coord.lon}`)"
        @error="error = $event"
      />
    </div>
    <NuxtPage />
  </div>
</template>
