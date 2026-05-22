import type { UnitType } from '~/value-objects/Temperature'

export const useWeatherStore = defineStore('weather', () => {
  const unit = ref<UnitType>('metric')
  return { unit }
})
