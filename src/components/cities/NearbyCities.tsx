import Link from 'next/link'
import type { City } from '@/lib/cities/schema'
import { selectNearbyCities } from '@/lib/cities/nearby'

interface NearbyCitiesProps {
  city: City
  cities: readonly City[]
}

/**
 * Maillage interne : liens vers 4-5 pages ville voisines.
 * Reprend le style des pastilles de /zone-intervention (aucun nouveau motif visuel).
 *
 * @param props.city - Ville de la page.
 * @param props.cities - Toutes les pages ville.
 * @returns Bloc « Nous intervenons aussi à… », ou rien s'il n'y a aucune voisine.
 */
export default function NearbyCities({ city, cities }: NearbyCitiesProps) {
  const nearby = selectNearbyCities(city, cities)
  if (nearby.length === 0) return null

  return (
    <nav aria-labelledby="nearby-cities-title" className="mb-10">
      <h3 id="nearby-cities-title" className="text-lg font-semibold text-slate-800 mb-3">
        Nous intervenons aussi à…
      </h3>
      <ul className="flex flex-wrap gap-2">
        {nearby.map((near) => (
          <li key={near.slug}>
            <Link
              href={`/zone-intervention/${near.slug}`}
              className="inline-block bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400 px-3 py-1.5 rounded-full text-sm transition-colors"
            >
              Borne de recharge {near.name} ({near.department})
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
