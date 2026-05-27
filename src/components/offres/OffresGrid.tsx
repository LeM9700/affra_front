import Link from 'next/link'
import PhotoPlaceholder from '@/components/shared/PhotoPlaceholder'

const OFFRES = [
  {
    badge: 'Recharge occasionnelle / petit budget',
    badgeColor: 'bg-slate-100 text-slate-600',
    titre: "Green'up Legrand",
    soustitre: 'Prise renforcée sécurisée',
    prix: 'À partir de 499€ TTC',
    highlight: false,
    features: [
      'Solution économique et sécurisée',
      'Recharge plus performante qu\'une prise classique',
      'Idéal pour les petits trajets du quotidien',
      'Compatible avec la majorité des véhicules électriques et hybrides rechargeables',
      'Installation discrète et rapide',
      'Parfait pour une recharge de nuit',
    ],
    recommandePour: 'Recommandé pour les utilisateurs avec un faible kilométrage quotidien.',
    imageLabel: "Green'up Legrand",
  },
  {
    badge: 'Notre best-seller',
    badgeColor: 'bg-[#5BBF8A]/10 text-[#5BBF8A]',
    titre: 'DazeBox Home T',
    soustitre: 'Câble Type 2 attaché 5m jusqu\'\u00e0 22kW',
    prix: 'À partir de 1 250€ TTC',
    highlight: true,
    features: [
      'Recharge rapide jusqu\'\u00e0 22kW',
      'Câble Type 2 attaché 5 mètres',
      'Compatible monophasé et triphasé',
      'Gestion intelligente de la puissance (délestage)',
      'Application mobile dédiée',
      'Connectivité Wi-Fi et Bluetooth',
      'Compatible avec installation photovoltaïque',
      'Design moderne et compact',
      'Écran intégré pour le suivi de charge',
    ],
    recommandePour: 'Le meilleur équilibre entre performance, confort et budget.',
    imageLabel: 'DazeBox Home T',
  },
  {
    badge: 'La borne premium ultra connectée',
    badgeColor: 'bg-[#29ABE2]/10 text-[#29ABE2]',
    titre: 'V2C Trydan',
    soustitre: 'Câble Type 2 attaché 5m jusqu\'\u00e0 22kW',
    prix: 'À partir de 1 350€ TTC',
    highlight: false,
    features: [
      'Recharge jusqu\'\u00e0 22kW',
      'Câble Type 2 attaché 5 mètres',
      'Compatible monophasé et triphasé',
      'Gestion dynamique de la puissance incluse',
      'Compatible panneaux solaires',
      'Application mobile connectée',
      'Wi-Fi et Bluetooth intégrés',
      'Pilotage intelligent de la recharge',
      'Design premium avec éclairage LED',
    ],
    recommandePour: 'Idéal pour les utilisateurs recherchant une solution haut de gamme et évolutive.',
    imageLabel: 'V2C Trydan',
  },
]

export default function OffresGrid() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="grid gap-10 md:grid-cols-3 items-start">
        {OFFRES.map((offre) => (
          <div
            key={offre.titre}
            className={`flex flex-col rounded-2xl bg-white shadow-sm transition hover:shadow-md ${
              offre.highlight ? 'ring-2 ring-[#5BBF8A] lg:-mt-4 scale-[1.02]' : ''
            }`}
          >
            <div className="overflow-hidden rounded-t-2xl">
              <PhotoPlaceholder width={700} height={394} label={offre.imageLabel} />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className={`mb-2 inline-block self-start rounded-full px-2 py-0.5 text-xs font-semibold ${offre.badgeColor}`}>
                {offre.badge}
              </span>
              <h3 className="text-xl font-bold text-slate-900">{offre.titre}</h3>
              <p className="mt-1 text-sm text-slate-500">{offre.soustitre}</p>
              <p className="mt-3 bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] bg-clip-text text-2xl font-bold text-transparent">
                {offre.prix}
              </p>
              <ul className="mt-4 flex-1 space-y-1.5">
                {offre.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 text-[#5BBF8A]">&#x2713;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs italic text-slate-400">{offre.recommandePour}</p>
              <div className="mt-6">
                {offre.highlight ? (
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
        ))}
      </div>
    </div>
  )
}