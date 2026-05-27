import type { Metadata } from 'next'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import ServiceFAQ from '@/components/services/ServiceFAQ'
import CTABand from '@/components/shared/CTABand'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Borne de recharge pour particuliers',
  description:
    'Installation de borne de recharge à domicile par un électricien certifié IRVE en Hérault, Gard, Vaucluse, Bouches-du-Rhône, Aude et Pyrénées-Orientales. Devis gratuit, intervention certifiée.',
  path: '/services/particuliers',
})

const features = [
  {
    icon: '⚡',
    title: 'Installation certifiée IRVE',
    description:
      'Votre borne est posée par un technicien certifié IRVE, avec remise de l\'attestation CONSUEL obligatoire.',
  },
  {
    icon: '💶',
    title: 'Devis gratuit et transparent',
    description:
      'Nous établissons un devis détaillé et sans surprise, avec un audit technique préalable de votre installation.',
  },
  {
    icon: '🔌',
    title: 'Toutes les puissances',
    description:
      'De la prise renforcée 3,7 kW à la wallbox 22 kW, nous sélectionnons la solution adaptée à votre véhicule et votre installation.',
  },
  {
    icon: '🛡️',
    title: 'Conformité garantie',
    description:
      'Mise aux normes du tableau électrique si nécessaire, protections différentielles, conformité RT 2020.',
  },
  {
    icon: '🏠',
    title: 'Maisons individuelles & garages',
    description:
      'Garage intégré, box extérieure, abri de jardin, nous trouvons la meilleure solution pour votre configuration.',
  },
  {
    icon: '📋',
    title: 'Dossier clé en main',
    description:
      'De l\'audit technique à la mise en service, AFFRA Réseaux gère l\'intégralité du projet.',
  },
]

const faq = [
  {
    question: 'Combien coûte l\'installation d\'une borne à domicile ?',
    answer:
      'Le coût varie entre 800 € et 2 500 € selon la configuration de votre installation et la borne choisie. Demandez un devis gratuit pour une estimation précise.',
  },
  {
    question: 'Ai-je besoin d\'un électricien certifié IRVE ?',
    answer:
      'Pour garantir la couverture assurance de votre véhicule et la conformité de votre installation, celle-ci doit être réalisée par un électricien certifié IRVE comme AFFRA Réseaux.',
  },
  {
    question: 'Combien de temps dure une installation ?',
    answer:
      'Une installation standard en maison individuelle prend généralement une demi-journée à une journée entière selon la complexité de l\'installation électrique existante.',
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

export default function ParticuliersPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <ServiceHero
        imageSrc="/images/hero/particuliers-hero.webp"
        imageAlt="Borne de recharge installée dans un garage résidentiel"
        title="Installation borne de recharge pour particuliers"
        subtitle="Votre wallbox à domicile, installée par un expert certifié IRVE en Occitanie et PACA."
      />
      <ServiceFeatures features={features} />
      <ServiceFAQ items={faq} />
      <CTABand />
    </>
  )
}
