import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import CTABand from '@/components/shared/CTABand'
import { buildMetadata } from '@/lib/utils/metadata'
import { getZones } from '@/lib/api/zones'
import ZoneMap from '@/components/map/ZoneMap'
import SchemaOrg from '@/components/shared/SchemaOrg'

export const revalidate = false // ISR on-demand

export const metadata: Metadata = buildMetadata({
  title: "Zone d'intervention — Hérault (34) et Gard (30)",
  description:
    "AFFRA Réseaux intervient dans tout l'Hérault (34) et le Gard (30) pour l'installation de bornes de recharge IRVE. Découvrez les communes couvertes.",
  path: '/zone-intervention',
})

export default async function ZoneInterventionPage() {
  const zones = await getZones().catch(() => [])

  const zones34 = zones.filter((z) => z.departement === '34')
  const zones30 = zones.filter((z) => z.departement === '30')

  const areaSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AFFRA Réseaux',
    areaServed: zones.map((z) => ({
      '@type': 'City',
      name: z.ville,
      containedInPlace: { '@type': 'AdministrativeArea', name: `Département ${z.departement}` },
    })),
  }

  return (
    <>
      <SchemaOrg schema={areaSchema} />
      <PageHero
        imageSrc="/images/hero/zone-hero.webp"
        imageAlt="Zone d'intervention AFFRA Réseaux — Hérault et Gard"
        title="Zone d'intervention"
        subtitle="Nous couvrons l'Hérault (34) et le Gard (30) — de Montpellier à Nîmes et au-delà."
      />

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Carte interactive Leaflet / OpenStreetMap */}
          <ZoneMap zones={zones} />

          {/* Liste des communes */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Hérault — Département 34
              </h2>
              <div className="flex flex-wrap gap-2">
                {zones34.length > 0
                  ? zones34.map((z) => (
                      <span key={z.id} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-sm">
                        {z.ville}
                      </span>
                    ))
                  : <p className="text-slate-500">Communes disponibles bientôt.</p>
                }
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Gard — Département 30
              </h2>
              <div className="flex flex-wrap gap-2">
                {zones30.length > 0
                  ? zones30.map((z) => (
                      <span key={z.id} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-sm">
                        {z.ville}
                      </span>
                    ))
                  : <p className="text-slate-500">Communes disponibles bientôt.</p>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
