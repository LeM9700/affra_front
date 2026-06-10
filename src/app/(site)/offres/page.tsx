import type { Metadata } from 'next'
import Link from 'next/link'
import OffresGrid from '@/components/offres/OffresGrid'
import OffresIntro from '@/components/offres/OffresIntro'
import OffresComparatif from '@/components/offres/OffresComparatif'
import OffresAvis from '@/components/offres/OffresAvis'
import OffresFAQ from '@/components/offres/OffresFAQ'
import OffresCTA from '@/components/offres/OffresCTA'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { buildMetadata } from '@/lib/utils/metadata'
import { getGoogleReviews } from '@/lib/google-places'

export const metadata: Metadata = buildMetadata({
  title: 'Nos offres de recharge électrique',
  description:
    "Découvrez nos solutions de recharge : prise renforcée Green'up Legrand, borne DazeBox Home T et V2C Trydan. Installation certifiée IRVE en Hérault, Gard, Vaucluse, Bouches-du-Rhône, Aude et Pyrénées-Orientales.",
  path: '/offres',
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://affra-reseaux.fr'

const FAQ_ITEMS = [
  {
    q: 'Quelle borne choisir pour une maison individuelle ?',
    a: "Tout dépend de votre usage quotidien. Si vous parcourez moins de 80 km par jour, la prise renforcée Green'up Legrand est une solution économique et suffisante. Pour une recharge rapide chaque nuit, la DazeBox Home T est notre best-seller : elle recharge la plupart des véhicules en 3 à 6 heures. Pour une solution haut de gamme avec pilotage intelligent et intégration solaire avancée, le V2C Trydan est le choix idéal. Nos techniciens certifiés IRVE vous conseillent gratuitement selon votre véhicule et votre installation électrique.",
  },
  {
    q: "Combien de temps prend l'installation ?",
    a: "Une installation standard prend entre 2 et 4 heures. Cela inclut la pose de la borne, le câblage, la mise en service et les tests de bon fonctionnement. Dans certains cas — passage de gaines sur une longue distance, adaptation du tableau électrique — la durée peut s'étendre à une journée complète. Nos techniciens certifiés IRVE s'occupent de l'intégralité des travaux et vous remettent un compte-rendu d'installation conforme aux normes NF C 15-100.",
  },
  {
    q: 'Est-ce compatible avec mes panneaux solaires ?',
    a: "Oui, la DazeBox Home T et le V2C Trydan sont tous deux compatibles avec une installation photovoltaïque. Leur système de pilotage intelligent peut prioriser l'énergie produite par vos panneaux pour charger votre véhicule électrique, réduisant ainsi votre consommation d'électricité du réseau. Nos experts vous accompagnent dans la configuration optimale selon votre production solaire et votre contrat de revente.",
  },
]

const PRODUCTS = [
  {
    name: "Green'up Legrand",
    description:
      "Prise renforcée sécurisée pour véhicule électrique, solution économique et discrète. Installée par AFFRA Réseaux, techniciens certifiés IRVE en Occitanie et PACA.",
    image: `${BASE_URL}/images/GREEN UP LEGRAND.webp`,
    brand: 'Legrand',
    minPrice: '499',
  },
  {
    name: 'DazeBox Home T',
    description:
      "Borne de recharge wallbox avec câble Type 2 attaché 5m, jusqu'à 22kW, gestion intelligente de la puissance et compatible photovoltaïque. Installée par AFFRA Réseaux, techniciens certifiés IRVE.",
    image: `${BASE_URL}/images/DAZEBOX HOME T.webp`,
    brand: 'DazeBox',
    minPrice: '1250',
  },
  {
    name: 'V2C Trydan',
    description:
      "Borne de recharge premium avec câble Type 2 attaché 5m, jusqu'à 22kW, design LED et intégration solaire avancée. Installée par AFFRA Réseaux, techniciens certifiés IRVE.",
    image: `${BASE_URL}/images/V2C TRYDAN.webp`,
    brand: 'V2C',
    minPrice: '1350',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Nos offres', item: `${BASE_URL}/offres` },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

function buildProductSchema(p: (typeof PRODUCTS)[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.image,
    brand: { '@type': 'Brand', name: p.brand },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: p.minPrice,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: p.minPrice,
        priceCurrency: 'EUR',
      },
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'LocalBusiness', name: 'AFFRA Réseaux' },
    },
  }
}

export default async function OffresPage() {
  const avisData = await getGoogleReviews()

  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={faqSchema} />
      {PRODUCTS.map((p) => (
        <SchemaOrg key={p.name} schema={buildProductSchema(p)} />
      ))}

      <section className="bg-gradient-to-br from-[#5BBF8A]/10 via-[#29B4C5]/5 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav aria-label="Fil d'Ariane" className="mb-4 flex justify-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-[#5BBF8A] transition">Accueil</Link>
            <span>/</span>
            <span className="text-slate-600 font-medium">Nos offres</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Nos solutions de recharge
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Borne électrique ou prise renforcée, on sélectionne pour vous le matériel le plus adapté à votre usage et à votre budget.
          </p>
        </div>
      </section>

      <OffresIntro />
      <OffresGrid />
      <OffresComparatif />
      <OffresAvis data={avisData} />
      <OffresFAQ />
      <OffresCTA />
    </>
  )
}
