import type { Metadata } from 'next'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import ServiceFAQ from '@/components/services/ServiceFAQ'
import CTABand from '@/components/shared/CTABand'
import SchemaOrg from '@/components/shared/SchemaOrg'
import Breadcrumb from '@/components/shared/Breadcrumb'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Infrastructure IRVE pour promoteurs immobiliers',
  description:
    "Solution d'infrastructure de recharge IRVE pour promoteurs immobiliers en Hérault, Gard, Vaucluse, Bouches-du-Rhône, Aude et Pyrénées-Orientales. RT 2020, pré-équipement, solution clé en main.",
  path: '/services/promoteurs',
})

const features = [
  {
    icon: '🏗️',
    title: 'Conformité RT 2020',
    description: "Intégration de l'infrastructure IRVE dès la conception pour respecter les obligations réglementaires RT 2020.",
  },
  {
    icon: '🔌',
    title: 'Pré-équipement & équipement',
    description: "Gaines, fourreaux et câblages en phase gros œuvre, puis pose des bornes en phase finition selon les besoins.",
  },
  {
    icon: '📐',
    title: 'Bureau d\'études intégré',
    description: "Dimensionnement électrique dès le DCE, coordination avec les autres corps d'état.",
  },
  {
    icon: '📋',
    title: 'Documentation réglementaire',
    description: "Attestations IRVE, CONSUEL, toute la documentation réglementaire pour la livraison du programme.",
  },
  {
    icon: '🤝',
    title: 'Interface avec les syndics',
    description: "Transfert de la gestion de l'infrastructure au syndic de copropriété à la livraison.",
  },
  {
    icon: '⚡',
    title: 'Infrastructure évolutive',
    description: "Conçu pour évoluer avec les besoins futurs des résidents sans travaux supplémentaires.",
  },
]

const faq = [
  {
    question: 'La RT 2020 impose-t-elle des bornes de recharge dans les programmes neufs ?',
    answer:
      "Oui, la réglementation environnementale RE 2020 (anciennement RT 2020) impose le pré-équipement de tous les emplacements de stationnement en logements collectifs neufs pour permettre l'installation ultérieure d'une borne IRVE.",
  },
  {
    question: 'Quelle est la différence entre pré-équipement et équipement IRVE ?',
    answer:
      'Le pré-équipement consiste à tirer les gaines, fourreaux et câblages lors du gros œuvre. L’équipement correspond à la pose effective des bornes en phase finition. AFFRA Réseaux intervient aux deux étapes.',
  },
  {
    question: 'Pouvez-vous intervenir dès la phase DCE ?',
    answer:
      'Absolument. Notre bureau d’études intégré peut réaliser le dimensionnement électrique dès la constitution du Dossier de Consultation des Entreprises, en coordination avec les autres corps d’état.',
  },
  {
    question: 'Qui gère l’infrastructure après la livraison du programme ?',
    answer:
      'AFFRA Réseaux assure le transfert de la gestion de l’infrastructure au syndic de copropriété à la livraison, avec la documentation complète (attestations IRVE, CONSUEL, notices techniques).',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Infrastructure IRVE pour promoteurs immobiliers',
  description:
    "Solution d'infrastructure de recharge IRVE pour promoteurs immobiliers en Occitanie et PACA. RT 2020, pré-équipement, solution clé en main.",
  provider: { '@type': 'LocalBusiness', name: 'AFFRA Réseaux', url: 'https://affra-reseaux.fr' },
  areaServed: { '@type': 'AdministrativeArea', name: 'Hérault, Gard, Vaucluse, Bouches-du-Rhône, Aude, Pyrénées-Orientales' },
  serviceType: 'Infrastructure IRVE — Promoteurs immobiliers RT 2020',
}

export default function PromoteursPage() {
  return (
    <>
      <SchemaOrg schema={serviceSchema} />
      <SchemaOrg schema={faqSchema} />
      <ServiceHero
        imageSrc="/images/hero/promoteurs-hero.webp"
        imageAlt="Chantier neuf avec infrastructure IRVE intégrée"
        title="Infrastructure IRVE pour promoteurs"
        subtitle="Solution clé en main RT 2020, pré-équipement et équipement dès la construction."
      />
      <div className="bg-white pt-8 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Services', href: '/services/promoteurs' },
              { label: 'Promoteurs' },
            ]}
          />
        </div>
      </div>
      <ServiceFeatures features={features} />
      <ServiceFAQ items={faq} />
      <CTABand />
    </>
  )
}
