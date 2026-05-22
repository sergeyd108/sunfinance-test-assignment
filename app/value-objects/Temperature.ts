export type UnitType = 'standard' | 'metric' | 'imperial'

export class Temperature {
  constructor(
    readonly value: number,
    readonly unit: UnitType,
  ) {}

  get unitLabel() {
    switch (this.unit) {
      case 'metric':
        return '°C'
      case 'imperial':
        return '°F'
      case 'standard':
        return '°K'
      default:
        return this.unit satisfies never
    }
  }

  toString() {
    return `${this.value}${this.unitLabel}`
  }
}
