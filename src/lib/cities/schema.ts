import { z } from 'zod'

/**
 * Schéma des pages ville (/zone-intervention/[slug]).
 *
 * Les données sont validées au chargement du module de données : comme toutes les pages ville
 * sont pré-rendues (generateStaticParams), une donnée invalide fait échouer `next build`
 * au lieu de partir en production.
 */

export const DEPARTMENTS = ['30', '34'] as const

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** Limite au-delà de laquelle Google tronque la meta description. */
export const META_DESCRIPTION_MAX = 155

export const CityReviewSchema = z.object({
  author: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(1),
  /** Date ISO (AAAA-MM-JJ) de publication de l'avis. */
  datePublished: z.iso.date().optional(),
})

export const CitySchema = z.object({
  slug: z.string().regex(SLUG),
  name: z.string().min(1),
  department: z.enum(DEPARTMENTS),
  departmentName: z.string().min(1),
  postalCode: z.string().regex(/^(30|34)\d{3}$/),
  geo: z.object({
    latitude: z.number().min(43).max(44.5),
    longitude: z.number().min(2.5).max(5),
  }),
  metaDescription: z.string().min(50).max(META_DESCRIPTION_MAX),
  intro: z.string().min(1),
  coveredAreas: z.array(z.string().min(1)),
  faq: z.array(z.object({ question: z.string().min(1), answer: z.string().min(1) })),
  /** Slugs des pages ville voisines (maillage interne), du plus proche au plus éloigné. */
  nearbyCities: z.array(z.string().regex(SLUG)).max(5),
  /** Identifiants de réalisations (src/data/realisations.ts) proches de la commune. */
  localProjects: z.array(z.string().min(1)).default([]),
  /** Avis réels liés à la commune. Vide tant qu'aucun avis n'est attribuable à une ville. */
  localReviews: z.array(CityReviewSchema).optional(),
})

export type City = z.infer<typeof CitySchema>
export type CityInput = z.input<typeof CitySchema>
export type CityReview = z.infer<typeof CityReviewSchema>

/** Réalisation affichée sur une page ville, avec sa vraie commune et sa distance. */
export interface CityProject {
  id: string
  /** Commune réelle du chantier (peut différer de la page ville). */
  city: string
  postalCode: string
  title: string
  summary: string
  image: { src: string; alt: string; width: number; height: number; position: string }
  /** Distance à vol d'oiseau depuis la commune de la page, arrondie au km. */
  distanceKm: number
  /** Chantier situé dans la commune même de la page. */
  isSameCity: boolean
}

/**
 * Valide la liste des villes, y compris les références croisées.
 *
 * Contrôles : schéma de chaque ville, slugs uniques, voisins existants et différents de la ville,
 * réalisations référencées existantes.
 *
 * @param input - Données brutes des villes.
 * @param knownProjectIds - Identifiants des réalisations existantes.
 * @returns Villes validées (valeurs par défaut appliquées).
 * @throws {Error} Message listant toutes les erreurs, ville par ville.
 */
export function parseCities(input: readonly CityInput[], knownProjectIds: readonly string[]): City[] {
  const projectIds = new Set(knownProjectIds)
  const result = z
    .array(CitySchema)
    .superRefine((cities, ctx) => {
      const slugs = new Set<string>()
      for (const [index, city] of cities.entries()) {
        if (slugs.has(city.slug)) {
          ctx.addIssue({ code: 'custom', path: [index, 'slug'], message: `Slug en double : ${city.slug}` })
        }
        slugs.add(city.slug)
      }
      for (const [index, city] of cities.entries()) {
        for (const near of city.nearbyCities) {
          if (near === city.slug || !slugs.has(near)) {
            ctx.addIssue({ code: 'custom', path: [index, 'nearbyCities'], message: `Voisin invalide : ${near}` })
          }
        }
        for (const projectId of city.localProjects) {
          if (!projectIds.has(projectId)) {
            ctx.addIssue({ code: 'custom', path: [index, 'localProjects'], message: `Réalisation inconnue : ${projectId}` })
          }
        }
      }
    })
    .safeParse(input)

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => {
        const [index, ...rest] = issue.path
        const slug = typeof index === 'number' ? (input[index]?.slug ?? index) : '?'
        return `- ${String(slug)}.${rest.join('.')} : ${issue.message}`
      })
      .join('\n')
    throw new Error(`Données des pages ville invalides :\n${details}`)
  }
  return result.data
}
