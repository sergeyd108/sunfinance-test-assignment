import type { UnitType } from '~/value-objects/Temperature'

export const useUnitsStore = defineStore('units', () => {
  const temperatureUnit = ref<UnitType>('metric')
  // here we can add more units in the future, e.g., wind, pressure, etc.
  return { temperatureUnit }
})
