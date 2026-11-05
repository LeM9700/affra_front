import SchemaOrg from '@/components/shared/SchemaOrg'
import type { City } from '@/lib/cities/schema'
import {
  buildCityElectricianSchema,
  buildCityServiceSchema,
  buildFaqPageSchema,
  type AggregateRatingInput,
} from '@/lib/schema/local-business'

interface LocalBusinessJsonLdProps {
  city: City
  /** Note réelle (Google) ; volontairement non transmise tant qu'aucun avis n'est attribuable à la ville. */
  aggregateRating?: AggregateRatingInput
}

/**
 * Données structurées d'une page ville : Electrician, Service et FAQPage.
 * Le BreadcrumbList est émis par <Breadcrumb> (pas de doublon ici).
 * Composant serveur : aucun JavaScript envoyé au client.
 *
 * @param props.city - Ville de la page.
 * @param props.aggregateRating - Note agrégée facultative.
 * @returns Balises <script type="application/ld+json"> échappées.
 */
export default function LocalBusinessJsonLd({ city, aggregateRating }: LocalBusinessJsonLdProps) {
  const faqSchema = buildFaqPageSchema(city.faq)
  return (
    <>
      <SchemaOrg schema={buildCityElectricianSchema(city, { aggregateRating })} />
      <SchemaOrg schema={buildCityServiceSchema(city)} />
      {faqSchema && <SchemaOrg schema={faqSchema} />}
    </>
  )
}
