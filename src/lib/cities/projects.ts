import type { Realisation } from '../../data/realisations.ts'
import { distanceKm } from './geo.ts'
import type { City, CityProject } from './schema.ts'

/**
 * Résout les réalisations rattachées à une ville, avec leur vraie commune et leur distance.
 *
 * L'ordre de `city.localProjects` est conservé ; une référence inconnue est ignorée
 * (le schéma la refuse déjà au build).
 *
 * @param city - Ville de la page.
 * @param realisations - Toutes les réalisations publiées.
 * @returns Réalisations à afficher sur la page.
 */
export function resolveCityProjects(city: City, realisations: readonly Realisation[]): CityProject[] {
  const byId = new Map(realisations.map((r) => [r.id, r]))
  return city.localProjects.flatMap((id) => {
    const realisation = byId.get(id)
    if (!realisation) return []
    const isSameCity = realisation.codePostal === city.postalCode && realisation.ville === city.name
    return [
      {
        id: realisation.id,
        city: realisation.ville,
        postalCode: realisation.codePostal,
        title: realisation.titre,
        summary: realisation.resume,
        image: realisation.image,
        distanceKm: isSameCity ? 0 : Math.max(1, Math.round(distanceKm(city.geo, realisation.geo))),
        isSameCity,
      },
    ]
  })
}

/**
 * Libellé de localisation d'un chantier, ex. « Chantier à Aigues-Vives, à 6 km ».
 *
 * @param project - Réalisation résolue.
 * @returns Libellé affiché sous la carte du chantier.
 */
export function formatProjectLocation(project: CityProject): string {
  return project.isSameCity
    ? `Chantier à ${project.city}`
    : `Chantier à ${project.city}, à ${project.distanceKm} km`
}

/**
 * Préposition « de » avec élision devant voyelle ou h muet : « d'Aimargues », « de Nîmes ».
 *
 * @param name - Nom de commune.
 * @returns « d'{name} » ou « de {name} ».
 */
export function withDe(name: string): string {
  return /^[aeiouyhàâäéèêëîïôöùûü]/i.test(name) ? `d’${name}` : `de ${name}`
}
