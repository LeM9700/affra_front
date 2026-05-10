import type { Metadata } from 'next'

import TestimonialForm from '@/components/testimonials/TestimonialForm'
import CTABand from '@/components/shared/CTABand'
import PageHero from '@/components/shared/PageHero'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Partager votre temoignage',
  description:
    'Formulaire dedie pour partager un retour d\'experience sur une installation IRVE realisee par AFFRA Reseaux.',
  path: '/temoignages/partager',
})

export default function PartagerTemoignagePage() {
  return (
    <>
      <PageHero
        imageSrc="/images/hero/blog-hero.webp"
        imageAlt="Partager un temoignage client AFFRA Reseaux"
        title="Partager votre temoignage"
        subtitle="Votre retour de terrain nous aide a renforcer la confiance des futurs clients."
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Formulaire de collecte</h2>
            <p className="mt-2 text-sm text-slate-600">
              Les retours sont moderes avant publication, puis exploites sur le site de maniere anonymisee
              pour renforcer la credibilite locale et la qualite SEO.
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
