export class Coordinates {
  constructor(
    readonly lat: number,
    readonly lon: number,
  ) {}

  isValid() {
    return (
      !isNaN(this.lat) && !isNaN(this.lon) && this.lat >= -90 && this.lat <= 90 && this.lon >= -180 && this.lon <= 180
    )
  }

  toString() {
    return `${this.lat},${this.lon}`
  }
}
