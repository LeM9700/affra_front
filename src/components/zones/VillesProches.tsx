import Link from 'next/link'
import { roundKm, type WithDistance } from '@/lib/geo/voisinage'
import { aVille, deVille } from '@/lib/utils/preposition'

interface VillesProchesProps {
  nom: string
  villes: WithDistance<{ slug: string; nom: string }>[]
}

/** Liens vers les pages des villes voisines : maillage interne entre pages locales. */
export default function VillesProches({ nom, villes }: VillesProchesProps) {
  if (villes.length === 0) return null

  return (
    <nav aria-labelledby="villes-proches" className="mb-10">
      <h3 id="villes-proches" className="mb-3 text-lg font-semibold text-slate-800">
        Nous intervenons aussi près {deVille(nom)}
      </h3>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {villes.map(({ item, km }) => (
          <li key={item.slug}>
            <Link
              href={`/zone-intervention/${item.slug}`}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-colors hover:border-blue-300 hover:bg-blue-50"
            >
              <span className="font-medium text-slate-900">Borne de recharge {aVille(item.nom)}</span>
              <span className="text-slate-500">≈ {roundKm(km)} km</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
