import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import OffresSection from '@/components/home/OffresSection'
import PourquoiNousChoisirSection from '@/components/home/PourquoiNousChoisirSection'
import ServicesSection from '@/components/home/ServicesSection'
import ProcessSection from '@/components/home/ProcessSection'
import CertificationsSection from '@/components/home/CertificationsSection'
import RealisationsSection from '@/components/home/RealisationsSection'
import AvisSection from '@/components/home/AvisSection'
import CTABand from '@/components/shared/CTABand'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { getPortfolioItems } from '@/lib/api/portfolio'
import { getGoogleReviews } from '@/lib/google-places'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AFFRA Réseaux Installation de bornes de recharge IRVE | Hérault, Gard, Vaucluse, Bouches-du-Rhône, Aude et Pyrénées-Orientales',
  description:
    'Spécialiste certifié IRVE en Hérault (34), Gard (30), Vaucluse (84), Bouches-du-Rhône (13), Aude (11) et Pyrénées-Orientales (66). Installation de bornes de recharge pour particuliers, copropriétés, professionnels et promoteurs. Devis gratuit.',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ElectricalContractor'],
  name: 'AFFRA Réseaux',
  description: 'Installation de bornes de recharge électrique IRVE en Occitanie et PACA',
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
    { '@type': 'State', name: 'Hérault', identifier: '34' },
    { '@type': 'State', name: 'Gard', identifier: '30' },
    { '@type': 'State', name: 'Vaucluse', identifier: '84' },
    { '@type': 'State', name: 'Bouches-du-Rhône', identifier: '13' },
    { '@type': 'State', name: 'Aude', identifier: '11' },
    { '@type': 'State', name: 'Pyrénées-Orientales', identifier: '66' },
  ],
  hasCredential: 'Certification IRVE P1–P2–P3',
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
      <ProcessSection />
      <CertificationsSection />
      <RealisationsSection items={portfolioItems} />
      <AvisSection />
      <CTABand />
    </>
  )
}
