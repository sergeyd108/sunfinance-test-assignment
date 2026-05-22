<script setup lang="ts">
import type { InputMenuItem } from '#ui/components/InputMenu.vue'
import { type ForecastCity, useCitiesSearch } from '~/features/cities/useCitiesSearch'

interface Emits {
  select: [value: ForecastCity]
  error: [error: string]
}

const emits = defineEmits<Emits>()

const query = ref('')

const { cities, loading, error } = useCitiesSearch(query)

const items = computed(() => {
  return cities.value.map((city) => {
    return {
      label: `${city.name}, ${city.sys.country}`,
      value: city,
      description: city.weather[0]?.description,
      avatar: {
        src: `https://openweathermap.org/img/wn/${city.weather[0]?.icon}.png`,
        alt: city.weather[0]?.description,
      },
    } satisfies InputMenuItem
  })
})

whenever(error, (error) => emits('error', error))
</script>

<template>
  <UInputMenu
    v-model:search-term="query"
    :items
    :loading
    size="xl"
    icon="i-lucide-map-pin"
    placeholder="Search for a city..."
    autofocus
    @update:model-value="$emit('select', $event.value)"
  />
</template>
