import type { Metadata } from 'next'

import TestimonialForm from '@/components/testimonials/TestimonialForm'
import CTABand from '@/components/shared/CTABand'
import PageHero from '@/components/shared/PageHero'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Partager votre témoignage',
  description:
    'Formulaire dédié pour partager un retour d\'expérience sur une installation IRVE réalisée par AFFRA RESEAUX.',
  path: '/temoignages/partager',
})

export default function PartagerTemoignagePage() {
  return (
    <>
      <PageHero
        imageSrc="/images/hero/blog-hero.webp"
        imageAlt="Partager un témoignage client AFFRA RESEAUX"
        title="Partager votre témoignage"
        subtitle="Votre retour de terrain nous aide à renforcer la confiance des futurs clients."
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Formulaire de collecte</h2>
            <p className="mt-2 text-sm text-slate-600">
              Les témoignages sont relus avant publication, puis affichés sur le site de manière anonyme
              (initiales et ville).
            </p>

            <div className="mt-6">
              <TestimonialForm />
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
