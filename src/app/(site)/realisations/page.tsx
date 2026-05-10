import type { Metadata } from 'next'
import Link from 'next/link'
import RealisationCard from '@/components/realisations/RealisationCard'
import PageHero from '@/components/shared/PageHero'
import CTABand from '@/components/shared/CTABand'
import { getPortfolioItems } from '@/lib/api/portfolio'
import { buildMetadata } from '@/lib/utils/metadata'

export const revalidate = false // ISR on-demand
export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildMetadata({
  title: 'Nos réalisations — Installations IRVE',
  description:
    'Découvrez nos installations de bornes de recharge réalisées en Hérault (34) et dans le Gard (30) pour particuliers, copropriétés et professionnels.',
  path: '/realisations',
})

export default async function RealisationsPage() {
  const items = await getPortfolioItems().catch(() => [])

  return (
    <>
      <PageHero
        imageSrc="/images/hero/realisations-hero.webp"
        imageAlt="Réalisations AFFRA Réseaux — installations de bornes de recharge"
        title="Nos réalisations"
        subtitle="Installations certifiées IRVE en Hérault et dans le Gard."
      />

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Un niveau d&apos;exigence constant, chantier après chantier</h2>
              <p className="mt-4 text-slate-600">
                Nos études de cas détaillées sont en cours de publication. Chaque projet présenté est
                documenté avec méthode, conformité IRVE et qualité d&apos;exécution.
              </p>
              <p className="mt-3 text-slate-600">
                En attendant, notre équipe vous accompagne de l&apos;audit technique à la mise en service,
                avec un pilotage clair des délais et des normes.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/devis"
                  className="inline-flex items-center rounded-lg bg-[#5BBF8A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4da979]"
                >
                  Demander un devis
                </Link>
                <Link
                  href="/offres"
                  className="inline-flex items-center rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition-colors hover:bg-slate-100"
                >
                  Voir nos offres
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <RealisationCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand />
    </>
  )
}
