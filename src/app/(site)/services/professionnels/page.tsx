import type { Metadata } from 'next'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import ServiceFAQ from '@/components/services/ServiceFAQ'
import CTABand from '@/components/shared/CTABand'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Bornes de recharge pour professionnels',
  description:
    "Installation de bornes de recharge pour flottes d'entreprise, PME et sites professionnels en Hérault (34) et Gard (30). Certifié IRVE.",
  path: '/services/professionnels',
})

const features = [
  {
    icon: '🚗',
    title: "Électrification de flottes",
    description: "De 2 à plus de 50 bornes pour vos véhicules de société — pilotage centralisé et gestion des accès.",
  },
  {
    icon: '📈',
    title: "Optimisation énergétique",
    description: "Pilotage intelligent de la charge pour éviter les pics de consommation et réduire votre facture électrique.",
  },
  {
    icon: '🏭',
    title: "Parkings et sites industriels",
    description: "Dimensionnement adapté à tous les types de sites : entrepôts, zones commerciales, bureaux.",
  },
  {
    icon: '💼',
    title: "Avantages fiscaux",
    description: "Déduction des coûts d'installation, TVA récupérable, amortissement — nous vous accompagnons dans les démarches.",
  },
  {
    icon: '🔐',
    title: "Gestion des accès",
    description: "Bornes avec badge RFID, application mobile ou code PIN pour contrôler qui charge sur votre site.",
  },
  {
    icon: '📊',
    title: "Reporting et facturation",
    description: "Tableaux de bord complets : consommation par véhicule, coût par trajet, reporting CO₂.",
  },
]

const faq = [
  {
    question: "Peut-on installer des bornes dans un parking souterrain ?",
    answer: "Oui, sous réserve d'une ventilation adaptée et d'une puissance suffisante. Notre audit technique évalue la faisabilité et les travaux nécessaires.",
  },
  {
    question: "Quelle puissance recommandez-vous pour une flotte professionnelle ?",
    answer: "Pour une flotte qui charge la nuit, des bornes de 7,4 kW à 11 kW sont généralement suffisantes. Pour des besoins en charge rapide, nous proposons des solutions DC.",
  },
  {
    question: "Les bornes professionnelles sont-elles connectées ?",
    answer: "Oui, toutes nos bornes professionnelles sont connectées (WiFi ou 4G) et compatibles avec les protocoles OCPP pour la gestion centralisée.",
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

export default function ProfessionnelsPage() {
  return (
    <>
      <SchemaOrg schema={faqSchema} />
      <ServiceHero
        imageSrc="/images/hero/professionnels-hero.webp"
        imageAlt="Flotte d'entreprise en charge sur un parking professionnel"
        title="Bornes de recharge pour professionnels"
        subtitle="Électrification de flottes, PME et sites industriels — IRVE certifié en Hérault et dans le Gard."
      />
      <ServiceFeatures features={features} />
      <ServiceFAQ items={faq} />
      <CTABand />
    </>
  )
}
