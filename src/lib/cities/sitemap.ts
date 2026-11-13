import type { MetadataRoute } from 'next'
import type { City } from './schema.ts'

/**
 * Entrées sitemap des pages ville (une par ville, aucune omise).
 *
 * @param baseUrl - URL du site, sans slash final.
 * @param cities - Toutes les pages ville.
 * @param lastModified - Date de dernière modification.
 * @returns Entrées /zone-intervention/{slug}.
 */
export function buildCitySitemapEntries(
  baseUrl: string,
  cities: readonly Pick<City, 'slug'>[],
  lastModified: Date = new Date(),
): MetadataRoute.Sitemap {
  return cities.map((city) => ({
    url: `${baseUrl}/zone-intervention/${city.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
}
