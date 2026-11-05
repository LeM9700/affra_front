import type { Metadata } from 'next'
import { buildMetadata } from '../utils/metadata.ts'
import type { City } from './schema.ts'

/** Au-delà, Google tronque le titre dans les résultats. */
export const TITLE_MAX = 60

const BRAND = 'AFFRA RESEAUX'

/**
 * Titre de la page ville, du plus complet au plus court ; le premier ≤ 60 caractères est retenu.
 * Format cible : « Borne de recharge {Ville} ({dept}) | AFFRA RESEAUX ».
 *
 * @param city - Ville de la page.
 * @returns Titre complet (marque incluse), à passer en `title.absolute`.
 * @throws {Error} Si aucune variante ne tient en 60 caractères (nom de commune très long).
 */
export function buildCityTitle(city: Pick<City, 'name' | 'department'>): string {
  const candidates = [
    `Borne de recharge ${city.name} (${city.department}) | ${BRAND}`,
    `Borne de recharge ${city.name} | ${BRAND}`,
    `Borne ${city.name} (${city.department}) | ${BRAND}`,
    `Borne ${city.name} | ${BRAND}`,
  ]
  const title = candidates.find((candidate) => candidate.length <= TITLE_MAX)
  if (!title) throw new Error(`Titre impossible à ramener sous ${TITLE_MAX} caractères : ${city.name}`)
  return title
}

/**
 * Metadata Next.js d'une page ville : titre absolu (pas de double « | AFFRA RESEAUX »),
 * description, canonical absolu, Open Graph et Twitter propres à la ville.
 *
 * @param city - Ville de la page.
 * @returns Objet Metadata pour generateMetadata.
 */
export function buildCityMetadata(city: City): Metadata {
  return buildMetadata({
    title: buildCityTitle(city),
    absoluteTitle: true,
    description: city.metaDescription,
    path: `/zone-intervention/${city.slug}`,
    ogImageAlt: `Installation de borne de recharge à ${city.name} par ${BRAND}`,
  })
}
