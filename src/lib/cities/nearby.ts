import { distanceKm } from './geo.ts'
import type { City } from './schema.ts'

export const NEARBY_MIN = 4
export const NEARBY_MAX = 5

/**
 * Sélectionne les villes voisines à afficher (« Nous intervenons aussi à… »).
 *
 * 1. Les slugs déclarés dans `city.nearbyCities`, dans l'ordre (inconnus et doublons ignorés).
 * 2. S'il y en a moins de `NEARBY_MIN`, complément avec les villes du même département,
 *    de la plus proche à la plus éloignée.
 * Résultat plafonné à `NEARBY_MAX`, sans jamais inclure la ville elle-même.
 *
 * @param city - Ville de la page.
 * @param allCities - Toutes les pages ville.
 * @returns Villes voisines, de 0 à 5 (moins de 4 seulement si le département n'en compte pas assez).
 */
export function selectNearbyCities(city: City, allCities: readonly City[]): City[] {
  const bySlug = new Map(allCities.map((c) => [c.slug, c]))
  const selected: City[] = []
  const seen = new Set<string>([city.slug])

  for (const slug of city.nearbyCities) {
    const near = bySlug.get(slug)
    if (near && !seen.has(slug) && selected.length < NEARBY_MAX) {
      selected.push(near)
      seen.add(slug)
    }
  }

  if (selected.length < NEARBY_MIN) {
    const sameDepartment = allCities
      .filter((c) => c.department === city.department && !seen.has(c.slug))
      .map((c) => ({ city: c, km: distanceKm(city.geo, c.geo) }))
      .sort((a, b) => a.km - b.km)
    for (const { city: near } of sameDepartment) {
      if (selected.length >= NEARBY_MIN) break
      selected.push(near)
    }
  }

  return selected
}
