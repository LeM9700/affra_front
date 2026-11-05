/** Coordonnées WGS84 (degrés décimaux). */
export interface GeoPoint {
  latitude: number
  longitude: number
}

const EARTH_RADIUS_KM = 6371

/**
 * Distance à vol d'oiseau entre deux points (formule de haversine).
 *
 * @param a - Premier point.
 * @param b - Second point.
 * @returns Distance en kilomètres (non arrondie).
 */
export function distanceKm(a: GeoPoint, b: GeoPoint): number {
  const toRad = Math.PI / 180
  const dLat = (b.latitude - a.latitude) * toRad
  const dLng = (b.longitude - a.longitude) * toRad
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.latitude * toRad) * Math.cos(b.latitude * toRad) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h))
}
