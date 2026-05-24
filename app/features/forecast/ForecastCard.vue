<script setup lang="ts">
import type { ForecastDto } from '~/features/forecast/useForecast'
import type { LocationDto } from '~/features/forecast/useLocation'
import { Temperature } from '~/value-objects/Temperature'

interface Props {
  forecast: ForecastDto
  location: LocationDto
}

const { forecast, location } = defineProps<Props>()

const weatherStore = useWeatherStore()

const currentTemp = computed(() => new Temperature(forecast.current.temp, weatherStore.unit))
const dailyMinTemp = computed(() => new Temperature(forecast.daily[0]?.temp.min ?? 0, weatherStore.unit))
const dailyMaxTemp = computed(() => new Temperature(forecast.daily[0]?.temp.max ?? 0, weatherStore.unit))

const weatherIcon = computed(() => forecast.current.weather[0]?.icon)
const weatherDesc = computed(() => forecast.current.weather[0]?.description)

const date = computed(() => {
  const dt = forecast.current.dt
  const date = new Date(dt * 1000)
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
  const dateStr = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
  return `${weekday}, ${dateStr}`
})
</script>

<template>
  <div class="desktop:p-14 flex flex-col items-center bg-sky-100 p-10 text-center dark:bg-sky-900">
    <h2 class="text-primary desktop:text-2xl mb-1 text-lg font-bold tracking-widest">
      {{ location.city }}, {{ location.country }}
    </h2>

    <p class="text-muted desktop:text-base mt-1 text-sm capitalize">{{ weatherDesc }}</p>
    <WeatherIcon v-if="weatherIcon" :icon="weatherIcon" :alt="weatherDesc" class="desktop:size-50 size-40" />

    <p class="desktop:text-2xl mt-1 text-xl font-bold">{{ date }}</p>

    <div class="desktop:my-8 my-6 flex items-start justify-center leading-none">
      <span class="desktop:text-8xl text-7xl font-bold">{{ currentTemp.value }}</span>
      <span class="text-primary desktop:text-6xl mt-2 text-4xl font-semibold">{{ currentTemp.unitLabel }}</span>
    </div>

    <p class="text-muted text-md desktop:text-lg">{{ dailyMinTemp }} / {{ dailyMaxTemp }}</p>
  </div>
</template>
