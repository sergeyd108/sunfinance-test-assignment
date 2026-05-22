import type { Coordinates } from '~/value-objects/Coordinates'

interface CurrentWeather {
  dt: number
  temp: number
  weather: Array<{ icon: string; description: string; main: string }>
}

interface DailyForecast {
  dt: number
  temp: { day: number; min: number; max: number }
  weather: Array<{ icon: string; description: string; main: string }>
}

export interface ForecastDto {
  current: CurrentWeather
  daily: DailyForecast[]
}

export function useForecast(coords: MaybeRefOrGetter<Coordinates>) {
  let abortController: AbortController | null = null

  const appId = useRuntimeConfig().public.openWeatherAppId
  const _coords = toRef(coords)

  const weatherStore = useWeatherStore()

  const {
    data: forecast,
    error: fetchError,
    pending: loading,
    execute,
  } = useLazyFetch<ForecastDto>('https://api.openweathermap.org/data/2.5/onecall', {
    getCachedData: (key, app) => app.payload.data[key],
    params: computed(() => ({
      ..._coords.value,
      appid: appId,
      units: weatherStore.unit,
      exclude: 'minutely,hourly,alerts',
    })),
    immediate: false,
  })

  const error = computed(() => fetchError.value?.message)

  watch(
    _coords,
    () => {
      abortController?.abort()
      abortController = new AbortController()
      void execute({ signal: abortController.signal })
    },
    { immediate: true },
  )

  return { forecast, loading, error }
}
