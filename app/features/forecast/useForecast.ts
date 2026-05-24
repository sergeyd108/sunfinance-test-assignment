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
  const appId = useRuntimeConfig().public.openWeatherAppId
  const _coords = toRef(coords)

  const {
    data: forecast,
    error: fetchError,
    pending: loading,
  } = useLazyFetch<ForecastDto>('https://api.openweathermap.org/data/2.5/onecall', {
    getCachedData: (key, app) => app.payload.data[key],
    params: computed(() => ({
      ..._coords.value,
      appid: appId,
      units: 'metric',
      exclude: 'minutely,hourly,alerts',
    })),
  })

  const error = computed(() => fetchError.value?.message)

  return { forecast, loading, error }
}
