import type { Metadata } from 'next'
import PageHero from '@/components/shared/PageHero'
import CTABand from '@/components/shared/CTABand'
import { buildMetadata } from '@/lib/utils/metadata'
import { getZones } from '@/lib/api/zones'
import ZoneMap from '@/components/map/ZoneMap'
import SchemaOrg from '@/components/shared/SchemaOrg'

export const revalidate = false // ISR on-demand
export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildMetadata({
  title: "Zone d'intervention — Hérault (34), Gard (30) et Bouches-du-Rhône (13)",
  description:
    "AFFRA Réseaux intervient dans l'Hérault (34), le Gard (30) et les Bouches-du-Rhône (13) pour l'installation de bornes de recharge IRVE. Découvrez les communes couvertes.",
  path: '/zone-intervention',
})

const fallbackCitiesByDepartment: Record<string, string[]> = {
  '34': ['Montpellier', 'Lunel', 'Béziers', 'Sète', 'Ganges'],
  '30': [
    'Nîmes',
    'Alès',
    'Sommières',
    'Uzès',
    'Garons',
    'Aimargues',
    'Vauvert',
    'Le Grau-du-Roi',
    'Saint-Gilles',
    'Beaucaire',
    'Remoulins',
    'Quissac',
    'Saint-Geniès-de-Malgoirès',
    'Vergèze',
  ],
  '13': ['Arles'],
}

function getDisplayedCities(zones: { ville: string }[], departement: string): string[] {
  if (zones.length > 0) {
    const uniques = new Set(zones.map((z) => z.ville.trim()).filter(Boolean))
    return Array.from(uniques).sort((a, b) => a.localeCompare(b, 'fr'))
  }
  return fallbackCitiesByDepartment[departement] ?? []
}

export default async function ZoneInterventionPage() {
  const zones = await getZones().catch(() => [])

  const zones34 = zones.filter((z) => z.departement === '34')
  const zones30 = zones.filter((z) => z.departement === '30')
  const zones13 = zones.filter((z) => z.departement === '13')

  const displayed34 = getDisplayedCities(zones34, '34')
  const displayed30 = getDisplayedCities(zones30, '30')
  const displayed13 = getDisplayedCities(zones13, '13')

  const schemaCities = [
    ...displayed34.map((ville) => ({ ville, departement: '34' })),
    ...displayed30.map((ville) => ({ ville, departement: '30' })),
    ...displayed13.map((ville) => ({ ville, departement: '13' })),
  ]

  const areaSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AFFRA Réseaux',
    areaServed: schemaCities.map((z) => ({
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
        imageAlt="Zone d'intervention AFFRA Réseaux — Hérault, Gard et Bouches-du-Rhône"
        title="Zone d'intervention"
        subtitle="Nous couvrons l'Hérault (34), le Gard (30) et les Bouches-du-Rhône (13), de Montpellier à Nîmes et Arles."
      />

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Carte interactive Leaflet / OpenStreetMap */}
          <ZoneMap zones={zones} />

          {/* Liste des communes */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Hérault — Département 34
              </h2>
              <div className="flex flex-wrap gap-2">
                {displayed34.map((ville) => (
                  <span key={`34-${ville}`} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-sm">
                    {ville}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Gard — Département 30
              </h2>
              <div className="flex flex-wrap gap-2">
                {displayed30.map((ville) => (
                  <span key={`30-${ville}`} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-sm">
                    {ville}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Bouches-du-Rhône — Département 13
              </h2>
              <div className="flex flex-wrap gap-2">
                {displayed13.map((ville) => (
                  <span key={`13-${ville}`} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-sm">
                    {ville}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
