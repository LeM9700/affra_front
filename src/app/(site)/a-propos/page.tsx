import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import CTABand from '@/components/shared/CTABand'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'À propos AFFRA RESEAUX',
  description:
    "Découvrez AFFRA RESEAUX, entreprise qualifiée IRVE dans le Gard et l’Hérault : notre équipe, notre accompagnement et notre engagement pour la mobilité électrique.",
  path: '/a-propos',
})

export default function AProposPage() {
  return (
    <>
      <PageHero
        imageSrc="/images/hero/a-propos-hero.webp"
        imageAlt="Équipe AFFRA RESEAUX sur un chantier d'installation IRVE"
        title="À propos d'AFFRA RESEAUX"
        subtitle="Entreprise qualifiée IRVE, au service des particuliers et des petites entreprises du Gard et de l’Hérault."
      />

      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Notre mission</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              AFFRA RESEAUX accompagne la transition vers la mobilité électrique en installant des bornes de recharge
              pour les particuliers et les petites entreprises du Gard et de l’Hérault.
              Notre priorité : une installation fiable, conforme et durable.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Notre qualification</h2>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-[#5BBF8A]/50">
              <h3 className="mb-2 font-bold text-[#5BBF8A]">Entreprise qualifiée IRVE</h3>
              <p className="text-sm text-slate-600">
                Installation et mise en service de bornes de recharge pour véhicules électriques.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
