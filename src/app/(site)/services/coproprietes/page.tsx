import type { Metadata } from 'next'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import ServiceFAQ from '@/components/services/ServiceFAQ'
import CTABand from '@/components/shared/CTABand'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Bornes de recharge en copropriété',
  description:
    'Solution de recharge collective certifiée IRVE pour copropriétés en Hérault, Gard, Vaucluse, Bouches-du-Rhône, Aude et Pyrénées-Orientales. Droits à la prise, installation clé en main.',
  path: '/services/coproprietes',
})

const features = [
  {
    icon: '🏢',
    title: 'Dossier administratif complet',
    description: 'AFFRA Réseaux gère l\'intégralité des démarches administratives liées à votre projet de recharge collective.',
  },
  {
    icon: '⚖️',
    title: 'Droit à la prise',
    description: 'Accompagnement complet pour faire valoir le droit à la prise en assemblée générale de copropriété.',
  },
  {
    icon: '🔌',
    title: 'Solution collective intelligente',
    description: 'Pilotage et gestion de la puissance pour plusieurs bornes sur une même installation sans surcoût réseau.',
  },
  {
    icon: '📊',
    title: 'Comptage individuel',
    description: 'Chaque résident paie sa propre consommation grâce au comptage individuel intégré.',
  },
  {
    icon: '🛠️',
    title: 'Infrastructure évolutive',
    description: 'Gaines et câblages dimensionnés pour l\'évolution future du parc de véhicules électriques.',
  },
  {
    icon: '📋',
    title: 'Interlocuteur unique',
    description: 'AFFRA Réseaux coordonne syndic, conseil syndical et travaux pour un projet sans friction.',
  },
]

const faq = [
  {
    question: 'Qu\'est-ce que le droit à la prise ?',
    answer:
      'Le droit à la prise (article 24-9 de la loi ELAN) permet à tout résident d\'une copropriété de faire installer une prise ou une borne dans son emplacement de parking, même sans accord de l\'AG, sous conditions.',
  },
  {
    question: 'Combien de bornes peut-on installer dans une copropriété ?',
    answer:
      'Il n\'y a pas de limite. AFFRA Réseaux peut équiper de 2 à plus de 50 emplacements avec une infrastructure mutualisée optimisée.',
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

export default function CopropriétésPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <ServiceHero
        imageSrc="/images/hero/coproprietes-hero.webp"
        imageAlt="Parking collectif de copropriété avec bornes de recharge AFFRA Réseaux"
        title="Recharge électrique en copropriété"
        subtitle="Solution collective IRVE certifiée, droits à la prise et infrastructure évolutive."
      />
      <ServiceFeatures features={features} />
      <ServiceFAQ items={faq} />
      <CTABand />
    </>
  )
}
