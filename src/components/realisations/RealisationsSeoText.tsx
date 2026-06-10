const villes = [
  'Nîmes', 'Montpellier', 'Toulouse', 'Marseille', 'Nice',
  'Toulon', 'Aix-en-Provence', 'Avignon', 'Perpignan',
  'Béziers', 'Sète', 'Alès', 'Aubagne', 'La Seyne-sur-Mer',
]

export default function RealisationsSeoText() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Votre installateur IRVE certifié en Occitanie et PACA
        </h2>
        <p className="mt-5 text-slate-600 leading-relaxed">
          AFFRA Réseaux intervient dans l&apos;ensemble de la région Occitanie — Gard, Hérault, Haute-Garonne,
          Hérault, Aude, Pyrénées-Orientales — ainsi que dans toute la région PACA : Bouches-du-Rhône, Var,
          Alpes-Maritimes, Vaucluse et Alpes-de-Haute-Provence. Chaque installation de borne de recharge
          est réalisée par un technicien certifié IRVE, garant de la conformité électrique et de la sécurité
          de votre équipement.
        </p>

        <h3 className="mt-10 text-xl font-bold text-slate-900">
          Installation pour particuliers, copropriétés et professionnels
        </h3>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Que vous soyez propriétaire d&apos;une maison individuelle souhaitant installer une Wallbox dans votre
          garage, un syndic de copropriété souhaitant déployer des bornes partagées, ou une entreprise cherchant
          à équiper son parc de stationnement, AFFRA Réseaux adapte chaque projet à vos besoins. Notre
          certification IRVE (Infrastructure de Recharge pour Véhicules Électriques) est le gage d&apos;une
          installation conforme aux normes NF C 15-100 et aux exigences du décret IRVE.
        </p>

        <h3 className="mt-10 text-xl font-bold text-slate-900">
          Nos zones d&apos;intervention
        </h3>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Nous intervenons dans les principales villes d&apos;Occitanie et de PACA pour l&apos;installation de
          bornes de recharge pour voitures électriques :
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2" aria-label="Villes d'intervention AFFRA Réseaux">
          {villes.map((ville, i) => (
            <li
              key={ville}
              className="inline-flex items-center gap-1 text-slate-600 text-sm"
            >
              <span className="text-[#5BBF8A] font-bold" aria-hidden="true">·</span>
              {ville}
              {i < villes.length - 1 && <span className="sr-only">,</span>}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-slate-500 text-sm">
          Vous ne trouvez pas votre ville ?{' '}
          <a href="/devis" className="text-[#29B4C5] underline underline-offset-2 hover:text-[#5BBF8A] transition-colors">
            Contactez-nous
          </a>{' '}
          — nous étudions toute demande en Occitanie et PACA.
        </p>
      </div>
    </section>
  )
}
