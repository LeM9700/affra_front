import Link from 'next/link'
import Image from 'next/image'
import DrapeauFrance from '@/components/shared/DrapeauFrance'
import OffreRouleau from '@/components/offres/OffreRouleau'
import { COLONNES_OFFRES, OFFRES, OFFRE_RECOMMANDEE, type BadgeVariante, type Offre } from '@/data/offres'
import { formatPrixTtc } from '@/lib/offres/prix'

const COULEURS_BADGE: Record<BadgeVariante, string> = {
  economique: 'bg-slate-100 text-slate-600',
  recommandation: 'bg-[#5BBF8A]/10 text-[#5BBF8A]',
  connectee: 'bg-[#29ABE2]/10 text-[#29ABE2]',
  france: 'bg-[#002395]/[0.07] text-[#002395]',
}

const DUREE_ROULEAU_DEFAUT_MS = 5000

function CarteOffreDetaillee({ offre }: { offre: Offre }) {
  const recommandee = offre.id === OFFRE_RECOMMANDEE
  return (
    <div
      id={offre.id}
      className={`relative flex h-full scroll-mt-28 flex-col rounded-2xl bg-white shadow-sm transition hover:shadow-md ${
        recommandee ? 'ring-2 ring-[#5BBF8A] lg:-mt-4 scale-[1.02]' : ''
      } ${offre.fabriqueEnFrance ? 'ring-1 ring-[#002395]/15' : ''}`}
    >
      {offre.fabriqueEnFrance && (
        <div
          aria-hidden="true"
          className="absolute inset-x-10 top-0 z-10 h-1 rounded-b-full bg-[linear-gradient(90deg,#002395_0_33.33%,#E2E8F0_33.33%_66.66%,#ED2939_66.66%)]"
        />
      )}
      <div className="overflow-hidden rounded-t-2xl">
        <Image
          src={offre.image}
          alt={offre.detail.imageAlt}
          width={700}
          height={394}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={recommandee}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 md:min-h-[3rem] lg:min-h-0">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ${COULEURS_BADGE[offre.badgeVariante]}`}
          >
            {offre.badge}
            {offre.badgeVariante === 'france' && <DrapeauFrance className="h-2.5 w-[0.9375rem] flex-shrink-0" />}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900">{offre.titre}</h3>
        <p className="mt-1 text-sm text-slate-500">{offre.detail.soustitre}</p>
        <p className="mt-3 bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] bg-clip-text text-2xl font-bold text-transparent">
          À partir de {formatPrixTtc(offre.prixTtc)} TTC
        </p>
        <ul className="mt-4 flex-1 space-y-1.5">
          {offre.detail.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
              <span className="mt-0.5 text-[#5BBF8A]">&#x2713;</span>
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs italic text-slate-400">{offre.detail.recommandePour}</p>
        <div className="mt-6">
          {recommandee ? (
            <Link
              href="/devis"
              className="block rounded-xl bg-gradient-to-r from-[#5BBF8A] via-[#29B4C5] to-[#29ABE2] py-3 text-center text-sm font-semibold text-white shadow hover:opacity-90 transition"
            >
              Demander un devis gratuit
            </Link>
          ) : (
            <Link
              href="/devis"
              className="block rounded-xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700 hover:border-[#5BBF8A] hover:text-[#5BBF8A] transition"
            >
              Demander un devis
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function OffresGrid() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      {/* pb-20 : place sous la grille pour les commandes du rouleau. */}
      <div className="grid gap-10 pb-20 md:grid-cols-3 md:items-stretch">
        {COLONNES_OFFRES.map((ids) =>
          ids.length === 1 ? (
            <CarteOffreDetaillee key={ids[0]} offre={OFFRES[ids[0]]} />
          ) : (
            <OffreRouleau
              key={ids.join('+')}
              label="Autres bornes"
              elements={ids.map((id) => ({
                id,
                label: OFFRES[id].titre,
                dureeMs: OFFRES[id].dureeAffichageMs ?? DUREE_ROULEAU_DEFAUT_MS,
                contenu: <CarteOffreDetaillee offre={OFFRES[id]} />,
              }))}
            />
          ),
        )}
      </div>
    </div>
  )
}
