import { Coordinates } from '~/value-objects/Coordinates'

export default defineNuxtRouteMiddleware((to) => {
  const { lat, lon } = to.query

  const latNum = parseFloat(String(lat ?? ''))
  const lonNum = parseFloat(String(lon ?? ''))
  const coordinates = new Coordinates(latNum, lonNum)

  if (!lat || !lon || !coordinates.isValid()) {
    return abortNavigation(createError({ statusCode: 400, statusMessage: 'Invalid coordinates' }))
  }
})
