import type { Coordinates } from '~/value-objects/Coordinates'

export type LocationDto = {
  city: string
  country: string
}

export function useLocation(coords: MaybeRefOrGetter<Coordinates>) {
  let abortController: AbortController | null = null

  const appId = useRuntimeConfig().public.openWeatherAppId
  const _coords = toRef(coords)

  const {
    data,
    error: fetchError,
    pending: loading,
    execute,
  } = useLazyFetch<{ name: string; country: string }[]>('https://api.openweathermap.org/geo/1.0/reverse', {
    getCachedData: (key, app) => app.payload.data[key],
    params: computed(() => ({ ..._coords.value, appid: appId })),
    immediate: false,
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

  watch(
    _coords,
    () => {
      abortController?.abort()
      abortController = new AbortController()
      void execute({ signal: abortController.signal })
    },
    { immediate: true },
  )

  return { location, loading, error }
}
