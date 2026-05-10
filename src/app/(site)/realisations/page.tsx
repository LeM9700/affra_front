import type { Metadata } from 'next'
import RealisationCard from '@/components/realisations/RealisationCard'
import PageHero from '@/components/shared/PageHero'
import CTABand from '@/components/shared/CTABand'
import { getPortfolioItems } from '@/lib/api/portfolio'
import { buildMetadata } from '@/lib/utils/metadata'

export const revalidate = false // ISR on-demand

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
            <p className="text-slate-500 text-center py-20">
              Nos réalisations arrivent bientôt.
            </p>
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
