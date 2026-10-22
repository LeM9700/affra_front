/**
 * Identité de l'entreprise pour les données structurées (schema.org), partagée entre les pages.
 * Le même `@id` sur l'accueil et sur /a-propos indique aux moteurs et aux IA qu'il s'agit
 * d'une seule et même entité.
 */
export const SITE_URL = 'https://affra-reseaux.fr'

export const ORGANIZATION_ID = `${SITE_URL}/#organization`

export const ORGANIZATION_NAME = 'AFFRA RESEAUX'

export const ORGANIZATION_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '95 A RUE DE LA HASE',
  postalCode: '30900',
  addressLocality: 'Nîmes',
  addressRegion: 'Occitanie',
  addressCountry: 'FR',
} as const

export const ORGANIZATION_AREA_SERVED = [
  { '@type': 'State', name: 'Gard', identifier: '30' },
  { '@type': 'State', name: 'Hérault', identifier: '34' },
] as const

export const ORGANIZATION_SAME_AS = [
  'https://maps.app.goo.gl/rTF6fF7CvZyWMEn68',
  'https://www.linkedin.com/company/affra-reseaux',
] as const
