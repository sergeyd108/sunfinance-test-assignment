import type { MaybeRefOrGetter } from 'vue'

export type ForecastCity = {
  name: string
  coord: { lat: number; lon: number }
  sys: { country: string }
  weather: Array<{ icon: string; description: string }>
}

type CityListResponse = {
  list: ForecastCity[]
}

export function useCitiesSearch(query: MaybeRefOrGetter<string>) {
  let abortController: AbortController | null = null

  const appId = useRuntimeConfig().public.openWeatherAppId
  const q = computed(() => toValue(query).trim())

  const {
    data,
    error: fetchError,
    pending: loading,
    execute,
  } = useLazyFetch<CityListResponse>('https://api.openweathermap.org/data/2.5/find', {
    getCachedData: (key, app) => app.payload.data[key],
    params: computed(() => ({
      appid: appId,
      q: q.value,
      units: 'metric',
      type: 'like',
    })),
    immediate: false,
    watch: false,
  })

  const cities = computed(() => data.value?.list ?? [])
  const error = computed(() => fetchError.value?.message)

  watchDebounced(
    q,
    (query) => {
      if (query.length < 3) return
      abortController?.abort()
      abortController = new AbortController()
      void execute({ signal: abortController.signal })
    },
    { debounce: 300 },
  )

  return { cities, loading, error }
}
