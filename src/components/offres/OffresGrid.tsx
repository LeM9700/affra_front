import Link from 'next/link'
import PhotoPlaceholder from '@/components/shared/PhotoPlaceholder'

const OFFRES = [
  {
    badge: 'Recharge occasionnelle / petit budget',
    badgeColor: 'bg-slate-100 text-slate-600',
    titre: "Green'up Legrand",
    soustitre: 'Prise renforcee securisee',
    prix: 'A partir de 499EUR TTC',
    highlight: false,
    features: [
      'Solution economique et securisee',
      'Recharge plus performante qu une prise classique',
      'Ideal pour les petits trajets (0-50 km/jour)',
      'Compatible tous VE et hybrides rechargeables',
      'Installation discrete en 1 a 2h',
    ],
    recommandePour: 'Ideal pour les particuliers faisant moins de 50 km par jour et souhaitant une solution simple.',
    imageLabel: "Green'up Legrand",
  },
  {
    badge: 'Best-seller',
    badgeColor: 'bg-[#5BBF8A]/10 text-[#5BBF8A]',
    titre: 'DazeBox Home T',
    soustitre: 'Borne de recharge 7 kW connectee',
    prix: 'A partir de 1 250EUR TTC',
    highlight: true,
    features: [
      'Puissance 7 kW - recharge 2x plus rapide',
      'Application mobile incluse (iOS & Android)',
      'Programmation heures creuses automtique',
      'Suivi de consommation en temps reel',
      'Compatible V2G (bi-directionnel en option)',
      'Certifiee IRVE',
    ],
    recommandePour: 'Le choix ideal pour la majorite des utilisateurs souhaitant confort, connectivite et economies.',
    imageLabel: 'DazeBox Home T',
  },
  {
    badge: 'Premium',
    badgeColor: 'bg-[#29ABE2]/10 text-[#29ABE2]',
    titre: 'V2C Trydan',
    soustitre: 'Borne 22 kW bi-directionnelle',
    prix: 'A partir de 1 350EUR TTC',
    highlight: false,
    features: [
      'Puissance jusqu a 22 kW (tri-phase)',
      'Technologie V2H : rechargez votre maison',
      'Gestion dynamique de la puissance',
      'Ecran tactile integre',
      'API ouverte pour integration domotique',
      'Ideal pour usage professionnel ou intensif',
    ],
    recommandePour: 'Pour les utilisateurs avances ou professionnels souhaitant le maximum de performances.',
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