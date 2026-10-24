import type { Metadata } from 'next'
import RealisationsAvantApres from '@/components/realisations/RealisationsAvantApres'
import RealisationsGallery from '@/components/realisations/RealisationsGallery'
import RealisationsCTA from '@/components/realisations/RealisationsCTA'
import RealisationsSeoText from '@/components/realisations/RealisationsSeoText'
import PageHero from '@/components/shared/PageHero'
import Breadcrumb from '@/components/shared/Breadcrumb'
import CTABand from '@/components/shared/CTABand'
import ServiceFAQ from '@/components/services/ServiceFAQ'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { REALISATIONS } from '@/data/realisations'
import { buildMetadata } from '@/lib/utils/metadata'

const SITE_URL = 'https://affra-reseaux.fr'

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Réalisations bornes de recharge Gard & Hérault',
    description:
      'Découvrez des installations de bornes de recharge réalisées dans le Gard par AFFRA RESEAUX, entreprise qualifiée IRVE basée à Nîmes, pour des particuliers et des petites entreprises du Gard et de l’Hérault.',
    path: '/realisations',
  }),
  // Titre exact demandé par le client (sans suffixe automatique de buildMetadata).
  title: { absolute: 'Réalisations bornes de recharge Gard & Hérault | AFFRA RESEAUX' },
}

const faqItems = [
  {
    question: "Combien de temps dure l'installation d'une borne de recharge ?",
    answer:
      "Une installation standard chez un particulier prend entre 2 et 4 heures selon la configuration électrique du logement et la distance entre le tableau électrique et l'emplacement de la borne. Pour une petite entreprise, le délai dépend du nombre de bornes et des travaux nécessaires : il est précisé lors de la visite technique.",
  },
  {
    question: 'Quelle puissance de borne choisir pour un particulier ?',
    answer:
      "Pour un usage quotidien à domicile, une borne de 7,4 kW (monophasée) ou jusqu'à 22 kW (triphasée) répond à la plupart des besoins. Pour choisir la puissance adaptée, nous analysons votre installation électrique lors de la visite technique, avant toute préconisation.",
  },
  {
    question: 'Dans quelles communes AFFRA RESEAUX intervient-elle ?',
    answer:
      "Basée à Nîmes, AFFRA RESEAUX intervient dans le Gard et l'Hérault, notamment autour de Nîmes, Montpellier et des communes environnantes. N'hésitez pas à nous contacter pour vérifier que votre commune est couverte.",
  },
  {
    question: 'La visite technique est-elle vraiment gratuite ?',
    answer:
      "Oui. Un expert IRVE se déplace à votre domicile pour analyser votre installation électrique et établir un devis cohérent. Il n'y a pas d'estimation approximative à distance, et la visite technique est offerte.",
  },
  {
    question: "Qu'est-ce que la qualification IRVE ?",
    answer:
      "IRVE signifie Infrastructure de Recharge pour Véhicules Électriques. La qualification IRVE atteste que l'entreprise est habilitée à installer des bornes de recharge dans le respect des règles en vigueur. AFFRA RESEAUX est une entreprise qualifiée IRVE.",
  },
  {
    question: 'Quelle différence entre une borne de recharge et une prise renforcée ?',
    answer:
      "Une prise renforcée est une solution économique pour un usage occasionnel ou de petits trajets quotidiens. Une borne de recharge (wallbox) permet de charger plus vite et offre des fonctions de pilotage. Nous vous conseillons la solution la plus adaptée à votre véhicule, à vos habitudes et à votre budget.",
  },
]

const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Réalisations de bornes de recharge — AFFRA RESEAUX',
  description: 'Galerie des installations de bornes de recharge réalisées par AFFRA RESEAUX dans le Gard',
  image: REALISATIONS.map((r) => ({
    '@type': 'ImageObject',
    contentUrl: `${SITE_URL}${r.image.src}`,
    name: r.titre,
    description: r.image.alt,
  })),
  provider: {
    '@type': 'LocalBusiness',
    name: 'AFFRA RESEAUX',
    url: SITE_URL,
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Gard' },
      { '@type': 'AdministrativeArea', name: 'Hérault' },
    ],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default function RealisationsPage() {
  return (
    <>
      <SchemaOrg schema={gallerySchema} />
      <SchemaOrg schema={faqSchema} />
      <PageHero
        imageSrc="/images/hero/homepage-hero.webp"
        imageAlt="Borne de recharge installée par AFFRA RESEAUX"
        title="Nos réalisations"
        subtitle="Découvrez nos installations de bornes de recharge dans le Gard. AFFRA RESEAUX accompagne également les particuliers et les petites entreprises dans l’Hérault."
      />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Réalisations' },
            ]}
          />
        </div>
      </div>
      <RealisationsAvantApres />
      <RealisationsGallery />
      <RealisationsCTA />
      <RealisationsSeoText />
      <ServiceFAQ items={faqItems} />
      <CTABand />
    </>
  )
}
