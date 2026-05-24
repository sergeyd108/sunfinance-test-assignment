import type { Coordinates } from '~/value-objects/Coordinates'

export type LocationDto = {
  city: string
  country: string
}

export function useLocation(coords: MaybeRefOrGetter<Coordinates>) {
  const appId = useRuntimeConfig().public.openWeatherAppId
  const _coords = toRef(coords)

  const {
    data,
    error: fetchError,
    pending: loading,
  } = useLazyFetch<{ name: string; country: string }[]>('https://api.openweathermap.org/geo/1.0/reverse', {
    getCachedData: (key, app) => app.payload.data[key],
    params: computed(() => ({ ..._coords.value, appid: appId })),
  })

  const location = computed(() => {
    if (data.value?.[0]) {
      return {
        city: data.value[0].name,
        country: data.value[0].country,
      } satisfies LocationDto
    }
  })
  const error = computed(() => fetchError.value?.message)

  return { location, loading, error }
}
