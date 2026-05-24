export type UnitType = 'standard' | 'metric' | 'imperial'

export class Temperature {
  constructor(
    private readonly celsius: number,
    readonly unit: UnitType,
  ) {}

  get value() {
    switch (this.unit) {
      case 'metric':
        return +this.celsius.toFixed(2)
      case 'imperial':
        return +((this.celsius * 9) / 5 + 32).toFixed(2)
      case 'standard':
        return +(this.celsius + 273.15).toFixed(2)
      default:
        return this.unit satisfies never
    }
  }

  get unitLabel() {
    switch (this.unit) {
      case 'metric':
        return '°C'
      case 'imperial':
        return '°F'
      case 'standard':
        return 'K'
      default:
        return this.unit satisfies never
    }
  }

  toString() {
    return `${this.value}${this.unitLabel}`
  }
}
