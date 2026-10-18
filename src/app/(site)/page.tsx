import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import OffresSection from '@/components/home/OffresSection'
import PourquoiNousChoisirSection from '@/components/home/PourquoiNousChoisirSection'
import ServicesSection from '@/components/home/ServicesSection'
import RealisationsSection from '@/components/home/RealisationsSection'
import AvisSection from '@/components/home/AvisSection'
import CTABand from '@/components/shared/CTABand'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { getGoogleReviews } from '@/lib/google-places'
import { selectDisplayReviews } from '@/lib/reviews/select'
import { VERIFIED_GOOGLE_REVIEWS } from '@/data/google-reviews'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Installation de bornes de recharge dans le Gard et l’Hérault | AFFRA Réseaux',
  description:
    'Entreprise qualifiée IRVE basée à Nîmes : installation de bornes de recharge dans le Gard (30) et l’Hérault (34) pour les particuliers et les petites entreprises. Visite technique gratuite à domicile.',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ElectricalContractor'],
  name: 'AFFRA Réseaux',
  description: 'Installation de bornes de recharge électrique dans le Gard et l’Hérault',
  url: 'https://affra-reseaux.fr',
  telephone: '+33766304687',
  email: 'affrareseaux@gmail.com',
  image: 'https://affra-reseaux.fr/images/og/og-default.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '95 A RUE DE LA HASE',
    postalCode: '30900',
    addressLocality: 'Nîmes',
    addressRegion: 'Occitanie',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.8367,
    longitude: 4.3601,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  priceRange: '€€',
  areaServed: [
    { '@type': 'State', name: 'Gard', identifier: '30' },
    { '@type': 'State', name: 'Hérault', identifier: '34' },
  ],
  sameAs: [
    'https://maps.app.goo.gl/rTF6fF7CvZyWMEn68',
    'https://www.linkedin.com/company/affra-reseaux',
  ],
}

export default async function HomePage() {
  const googleData = await getGoogleReviews().catch(() => null)
  const reviews = selectDisplayReviews(googleData?.reviews, VERIFIED_GOOGLE_REVIEWS)

  // Note moyenne et total : uniquement ceux publiés par Google, jamais de valeur en dur.
  const aggregateRating = googleData
    ? {
        '@type': 'AggregateRating',
        ratingValue: googleData.rating.toFixed(1),
        reviewCount: String(googleData.userRatingCount),
        bestRating: '5',
        worstRating: '1',
      }
    : undefined

  const schema = {
    ...localBusinessSchema,
    ...(aggregateRating && { aggregateRating }),
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
      reviewBody: r.text,
    })),
  }

  return (
    <>
      <SchemaOrg schema={schema} />
      <HeroSection />
      <OffresSection />
      <PourquoiNousChoisirSection />
      <ServicesSection />
      <RealisationsSection />
      <AvisSection reviews={reviews} />
      <CTABand />
    </>
  )
}
