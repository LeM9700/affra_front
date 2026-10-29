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
import { buildProductSchema } from '@/lib/schema/product'
import { ORGANIZATION_NAME } from '@/lib/schema/organization'
import { FAQ_OFFRES, OFFRES, ORDRE_OFFRES } from '@/data/offres'

export const metadata: Metadata = buildMetadata({
  title: 'Nos offres de recharge électrique',
  description:
    "Prise renforcée Green'up Legrand, bornes DazeBox Home T, La Borne Tricolore fabriquée en France et V2C Trydan. Installation IRVE dans le Gard et l’Hérault.",
  path: '/offres',
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://affra-reseaux.fr'

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
  mainEntity: FAQ_OFFRES.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default async function OffresPage() {
  const avisData = await getGoogleReviews()

  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />
      <SchemaOrg schema={faqSchema} />
      {ORDRE_OFFRES.map((id) => (
        <SchemaOrg key={id} schema={buildProductSchema(OFFRES[id], BASE_URL, ORGANIZATION_NAME)} />
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
