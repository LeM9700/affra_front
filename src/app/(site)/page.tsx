import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import OffresSection from '@/components/home/OffresSection'
import PourquoiNousChoisirSection from '@/components/home/PourquoiNousChoisirSection'
import ServicesSection from '@/components/home/ServicesSection'
import RealisationsSection from '@/components/home/RealisationsSection'
import AvisSection from '@/components/home/AvisSection'
import CTABand from '@/components/shared/CTABand'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { getPortfolioItems } from '@/lib/api/portfolio'
import { getGoogleReviews } from '@/lib/google-places'

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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '3',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'M. D.' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Équipe très professionnelle, installation soignée et rapide. La borne fonctionne parfaitement. Je recommande vivement AFFRA Réseaux !',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'S. L.' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Très bon accompagnement pour mon projet en copropriété. Équipe réactive et installation soignée, je recommande.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'T. R.' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: "Installation de 8 bornes pour notre flotte d'entreprise. Travail sérieux, délais respectés, excellent rapport qualité-prix.",
    },
  ],
  sameAs: [
    'https://maps.app.goo.gl/rTF6fF7CvZyWMEn68',
    'https://www.linkedin.com/company/affra-reseaux',
  ],
}

export default async function HomePage() {
  const [portfolioItems, googleData] = await Promise.all([
    getPortfolioItems().catch(() => []),
    getGoogleReviews().catch(() => null),
  ])

  const googleReviewsWithText = googleData?.reviews.filter((r) => r.text?.text) ?? []

  const aggregateRating = googleData
    ? {
        '@type': 'AggregateRating',
        ratingValue: googleData.rating.toFixed(1),
        reviewCount: String(googleData.userRatingCount),
        bestRating: '5',
        worstRating: '1',
      }
    : localBusinessSchema.aggregateRating

  const review =
    googleReviewsWithText.length > 0
      ? googleReviewsWithText.slice(0, 5).map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.authorAttribution.displayName },
          reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
          reviewBody: r.text!.text,
        }))
      : localBusinessSchema.review

  const schema = { ...localBusinessSchema, aggregateRating, review }

  return (
    <>
      <SchemaOrg schema={schema} />
      <HeroSection />
      <OffresSection />
      <PourquoiNousChoisirSection />
      <ServicesSection />
      <RealisationsSection items={portfolioItems} />
      <AvisSection />
      <CTABand />
    </>
  )
}
