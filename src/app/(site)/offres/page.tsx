import type { Metadata } from 'next'
import OffresGrid from '@/components/offres/OffresGrid'
import CTABand from '@/components/shared/CTABand'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Nos offres de recharge électrique',
  description:
    'Découvrez nos solutions de recharge : prise renforcée Green\'up Legrand, borne DazeBox Home T et V2C Trydan. Installation certifiée IRVE en Hérault, Gard, Vaucluse, Bouches-du-Rhône, Aude et Pyrénées-Orientales.',
  path: '/offres',
})

export default function OffresPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#5BBF8A]/10 via-[#29B4C5]/5 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Nos solutions de recharge
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Borne électrique ou prise renforcée, on sélectionne pour vous le matériel le plus adapté à votre usage et à votre budget.
          </p>
        </div>
      </section>
      <OffresGrid />
      <CTABand />
    </>
  )
}
