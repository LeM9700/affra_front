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

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AFFRA Réseaux — Installation de bornes de recharge IRVE | Hérault et Gard',
  description:
    'Spécialiste certifié IRVE en Hérault (34) et Gard (30). Installation de bornes de recharge pour particuliers, copropriétés, professionnels et promoteurs. Devis gratuit.',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ElectricalContractor'],
  name: 'AFFRA Réseaux',
  description: 'Installation de bornes de recharge électrique IRVE — Hérault et Gard',
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
    { '@type': 'State', name: 'Bouches-du-Rhône', identifier: '13' },
  ],
  hasCredential: 'Certification IRVE P1-P2',
}

export default async function HomePage() {
  const portfolioItems = await getPortfolioItems().catch(() => [])

  return (
    <>
      <SchemaOrg schema={localBusinessSchema} />
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
