import { CONTACT_PHONE_E164 } from '../contact.ts'
import type { City } from '../cities/schema.ts'
import { ORGANIZATION_ADDRESS, ORGANIZATION_ID, ORGANIZATION_NAME, SITE_URL } from './organization.ts'

/** Siège (Nîmes) : `geo` décrit l'établissement, pas la commune desservie. */
export const ORGANIZATION_GEO = { '@type': 'GeoCoordinates', latitude: 43.8367, longitude: 4.3601 } as const

export const PRICE_RANGE = '€€'

/**
 * Note agrégée. À ne renseigner qu'avec des avis réels publiés par une source tierce (Google) :
 * Google ignore, voire sanctionne, les notes auto-déclarées sur le site de l'entreprise.
 */
export interface AggregateRatingInput {
  ratingValue: number
  reviewCount: number
}

/**
 * URL canonique absolue d'une page ville.
 *
 * @param city - Ville (seul le slug est utilisé).
 * @returns Ex. https://affra-reseaux.fr/zone-intervention/nimes
 */
export function cityPageUrl(city: Pick<City, 'slug'>): string {
  return `${SITE_URL}/zone-intervention/${city.slug}`
}

/**
 * Données structurées « Electrician » d'une page ville.
 *
 * L'établissement reste le siège de Nîmes (adresse, geo) ; la commune de la page est décrite
 * dans `areaServed`, avec son département.
 *
 * @param city - Ville de la page.
 * @param options.aggregateRating - Note réelle ; omise par défaut (aucune note inventée).
 * @returns Objet schema.org prêt pour <SchemaOrg>.
 */
export function buildCityElectricianSchema(
  city: City,
  options: { aggregateRating?: AggregateRatingInput } = {},
) {
  const url = cityPageUrl(city)
  const { aggregateRating } = options
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': `${url}#electrician`,
    name: ORGANIZATION_NAME,
    url,
    telephone: CONTACT_PHONE_E164,
    address: ORGANIZATION_ADDRESS,
    geo: ORGANIZATION_GEO,
    priceRange: PRICE_RANGE,
    parentOrganization: { '@id': ORGANIZATION_ID },
    areaServed: [
      {
        '@type': 'City',
        name: city.name,
        postalCode: city.postalCode,
        geo: { '@type': 'GeoCoordinates', latitude: city.geo.latitude, longitude: city.geo.longitude },
        containedInPlace: { '@type': 'AdministrativeArea', name: city.departmentName, identifier: city.department },
      },
      { '@type': 'AdministrativeArea', name: city.departmentName, identifier: city.department },
    ],
    ...(aggregateRating && aggregateRating.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: aggregateRating.ratingValue.toFixed(1),
            reviewCount: String(aggregateRating.reviewCount),
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
  }
}

/**
 * Données structurées « Service » (installation IRVE dans la commune).
 *
 * @param city - Ville de la page.
 * @returns Objet schema.org.
 */
export function buildCityServiceSchema(city: City) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Installation borne de recharge ${city.name}`,
    description: city.intro,
    serviceType: 'Installation IRVE — Borne de recharge électrique',
    provider: { '@id': `${cityPageUrl(city)}#electrician` },
    areaServed: { '@type': 'City', name: city.name },
  }
}

/**
 * Données structurées « FAQPage » construites depuis la FAQ affichée sur la page.
 * Google exige que les questions/réponses soient visibles : ne jamais y ajouter de contenu masqué.
 *
 * @param faq - Questions/réponses affichées.
 * @returns Objet schema.org, ou `null` si la FAQ est vide.
 */
export function buildFaqPageSchema(faq: City['faq']) {
  if (faq.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
