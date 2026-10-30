import Link from 'next/link'
import Image from 'next/image'
import { Check, ArrowRight, Zap, Star, Crown } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import FadeIn from '@/components/shared/FadeIn'
import DrapeauFrance from '@/components/shared/DrapeauFrance'
import OffreRouleau from '@/components/offres/OffreRouleau'
import { COLONNES_OFFRES, OFFRES, OFFRE_RECOMMANDEE, type BadgeVariante, type Offre } from '@/data/offres'
import { formatPrixTtc } from '@/lib/offres/prix'

const ICONES_BADGE: Record<Exclude<BadgeVariante, 'france'>, typeof Zap> = {
  economique: Zap,
  recommandation: Star,
  connectee: Crown,
}

const DUREE_ROULEAU_DEFAUT_MS = 5000

function BadgeOffre({ offre }: { offre: Offre }) {
  const recommandee = offre.id === OFFRE_RECOMMANDEE
  const classes = [
    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold',
    recommandee
      ? 'bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] text-white'
      : offre.badgeVariante === 'france'
        ? 'bg-[#002395]/[0.07] text-[#002395]'
        : 'bg-slate-100 text-slate-600',
  ].join(' ')

  if (offre.badgeVariante === 'france') {
    return (
      <div className={classes}>
        <DrapeauFrance className="h-2.5 w-[0.9375rem] flex-shrink-0" />
        {offre.badge}
      </div>
    )
  }
  const Icone = ICONES_BADGE[offre.badgeVariante]
  return (
    <div className={classes}>
      <Icone className="h-3 w-3 flex-shrink-0" strokeWidth={2.5} />
      {offre.badge}
    </div>
  )
}

function CarteOffre({ offre }: { offre: Offre }) {
  const recommandee = offre.id === OFFRE_RECOMMANDEE
  return (
    <div
      className={[
        'group relative flex h-full flex-col rounded-3xl bg-white transition-all duration-300',
        recommandee
          ? 'scale-[1.03] shadow-[0_8px_32px_rgba(91,191,138,0.20),0_24px_64px_rgba(41,171,226,0.12)] ring-2 ring-[#5BBF8A]/60'
          : 'shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1',
        offre.fabriqueEnFrance ? 'ring-1 ring-[#002395]/15' : '',
      ].join(' ')}
    >
      {offre.fabriqueEnFrance && (
        <div
          aria-hidden="true"
          className="absolute inset-x-10 top-0 h-1 rounded-b-full bg-[linear-gradient(90deg,#002395_0_33.33%,#E2E8F0_33.33%_66.66%,#ED2939_66.66%)]"
        />
      )}

      {/* Image */}
      <div className="overflow-hidden rounded-t-3xl bg-white">
        <Image
          src={offre.image}
          alt={offre.accueil.imageAlt}
          width={600}
          height={300}
          className="h-[220px] w-full object-contain p-4"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Badge */}
        <div className="mb-3 md:min-h-[3.5rem] lg:min-h-0">
          <BadgeOffre offre={offre} />
        </div>

        {/* Titre */}
        <h3 className="text-xl font-bold text-slate-900">{offre.titre}</h3>
        <p className="mt-1 text-sm text-slate-500">{offre.accueil.soustitre}</p>

        {/* Prix */}
        <div className="mt-4 pb-4 border-b border-slate-100">
          <p className="text-xs text-slate-400">À partir de</p>
          <p className="text-3xl font-black tracking-tight text-slate-900">{formatPrixTtc(offre.prixTtc)}</p>
          <p className="text-xs text-slate-400 mt-0.5">TTC pose comprise</p>
        </div>

        {/* Features */}
        <ul className="mt-4 flex-1 space-y-2">
          {offre.accueil.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#5BBF8A]" strokeWidth={2.5} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-6">
          <Link
            href="/devis"
            className={[
              'inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200',
              recommandee
                ? 'bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] text-white shadow-[var(--shadow-green)] hover:shadow-[var(--shadow-green-hover)] hover:-translate-y-0.5'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-[#5BBF8A]/40 hover:bg-slate-50',
            ].join(' ')}
          >
            {recommandee ? 'Choisir cette borne' : 'Demander un devis'}
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OffresSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Nos offres"
          title="Trouvez la borne adaptée"
          subtitle="Fourniture et pose comprises, installée par un technicien certifié IRVE."
          accentWord="adaptée"
        />

        {/* pb-20 : place sous la grille pour les commandes du rouleau. */}
        <div className="mt-14 grid gap-6 pb-20 md:grid-cols-3 md:items-stretch">
          {COLONNES_OFFRES.map((ids, i) => (
            <FadeIn key={ids.join('+')} delay={i * 0.10} className="h-full">
              {ids.length === 1 ? (
                <CarteOffre offre={OFFRES[ids[0]]} />
              ) : (
                <OffreRouleau
                  label="Autres bornes"
                  elements={ids.map((id) => ({
                    id,
                    label: OFFRES[id].titre,
                    dureeMs: OFFRES[id].dureeAffichageMs ?? DUREE_ROULEAU_DEFAUT_MS,
                    contenu: <CarteOffre offre={OFFRES[id]} />,
                  }))}
                />
              )}
            </FadeIn>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400">
          Tous nos prix incluent la main d&apos;œuvre et les matériaux. TVA 5,5 % applicable sous conditions.
        </p>
      </div>
    </section>
  )
}
