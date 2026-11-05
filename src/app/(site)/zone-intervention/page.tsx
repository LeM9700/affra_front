import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import CTABand from '@/components/shared/CTABand'
import { buildMetadata } from '@/lib/utils/metadata'
import { getZones } from '@/lib/api/zones'
import ZoneMap from '@/components/map/ZoneMap'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { cities } from '@/data/villes-seo'
import { FALLBACK_CITIES_BY_DEPARTMENT } from '@/data/zones-fallback'
import { createZoneLinkResolver, normalizeCityName, type ZoneLike } from '@/lib/cities/zone-links'

export const revalidate = false // ISR on-demand
export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildMetadata({
  title: "Zone d'intervention : Gard (30) et Hérault (34)",
  description:
    "AFFRA RESEAUX intervient dans le Gard (30) et l’Hérault (34) pour l’installation de bornes de recharge, notamment autour de Nîmes et de Montpellier. Découvrez les communes couvertes.",
  path: '/zone-intervention',
})

/** Commune affichée, avec le slug de sa page ville (null : pas de page, pas de lien). */
interface DisplayedCity {
  name: string
  slug: string | null
}

/**
 * Communes d'un département : zones de l'API (dédoublonnées, triées) ou, à défaut, liste de secours.
 */
function getDisplayedCities(
  zones: ZoneLike[],
  departement: '30' | '34',
  resolveSlug: (zone: ZoneLike) => string | null,
): DisplayedCity[] {
  const source: ZoneLike[] =
    zones.length > 0
      ? zones
      : // Liste de secours : slug = nom normalisé (correspondance garantie par zones-fallback.test.ts).
        FALLBACK_CITIES_BY_DEPARTMENT[departement].map((ville) => ({ ville, departement, slug: normalizeCityName(ville) }))

  const byName = new Map<string, DisplayedCity>()
  for (const zone of source) {
    const name = zone.ville.trim()
    if (name && !byName.has(name)) byName.set(name, { name, slug: resolveSlug({ ...zone, ville: name }) })
  }
  return Array.from(byName.values()).sort((a, b) => a.name.localeCompare(b.name, 'fr'))
}

/** Départements couverts : seules leurs communes sont listées, cartographiées et déclarées en JSON-LD. */
const COVERED_DEPARTMENTS = ['30', '34']

export default async function ZoneInterventionPage() {
  const allZones = await getZones().catch(() => [])
  const zones = allZones.filter((z) => COVERED_DEPARTMENTS.includes(z.departement))

  const zones34 = zones.filter((z) => z.departement === '34')
  const zones30 = zones.filter((z) => z.departement === '30')

  const resolveSlug = createZoneLinkResolver(cities)
  const displayed34 = getDisplayedCities(zones34, '34', resolveSlug)
  const displayed30 = getDisplayedCities(zones30, '30', resolveSlug)

  const schemaCities = [
    ...displayed34.map(({ name }) => ({ ville: name, departement: '34' })),
    ...displayed30.map(({ name }) => ({ ville: name, departement: '30' })),
  ]

  const areaSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AFFRA RESEAUX',
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
        imageAlt="Zone d'intervention AFFRA RESEAUX dans le Gard et l’Hérault"
        title="Zone d'intervention"
        subtitle="Nous intervenons dans le Gard (30) et l’Hérault (34), notamment autour de Nîmes, Montpellier et des communes environnantes."
      />

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Carte interactive Leaflet / OpenStreetMap */}
          <ZoneMap zones={zones} />

          {/* Liste des communes */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Hérault Département 34
              </h2>
              <div className="flex flex-wrap gap-2">
                {displayed34.map(({ name: ville, slug }) => {
                  return slug ? (
                    <Link
                      key={`34-${ville}`}
                      href={`/zone-intervention/${slug}`}
                      className="bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400 px-3 py-1.5 rounded-full text-sm transition-colors"
                    >
                      {ville}
                    </Link>
                  ) : (
                    <span key={`34-${ville}`} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-sm">
                      {ville}
                    </span>
                  )
                })}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Gard Département 30
              </h2>
              <div className="flex flex-wrap gap-2">
                {displayed30.map(({ name: ville, slug }) => {
                  return slug ? (
                    <Link
                      key={`30-${ville}`}
                      href={`/zone-intervention/${slug}`}
                      className="bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400 px-3 py-1.5 rounded-full text-sm transition-colors"
                    >
                      {ville}
                    </Link>
                  ) : (
                    <span key={`30-${ville}`} className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-sm">
                      {ville}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
