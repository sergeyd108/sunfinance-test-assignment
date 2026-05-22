<script setup lang="ts">
import type { Coordinates } from '~/value-objects/Coordinates'
import ForecastCard from '~/features/forecast/ForecastCard.vue'
import { useForecast } from '~/features/forecast/useForecast'
import { useLocation } from '~/features/forecast/useLocation'

const { coords } = defineProps<{ coords: Coordinates }>()

const { location, loading: locLoading, error: locError } = useLocation(() => coords)
const { forecast, loading: fcLoading, error: fcError } = useForecast(() => coords)
</script>

<template>
  <ErrorMessage :error="locError || fcError" />

  <div v-if="locLoading || fcLoading" class="flex items-center justify-center p-16">
    <UIcon name="i-lucide-loader-2" class="text-primary size-12 animate-spin" />
  </div>
  <div v-else-if="location && forecast" class="relative">
    <ForecastCard :forecast :location />
    <TempUnitSwitch class="absolute top-2 left-2" />
  </div>
</template>
