'use client'

import { useState } from 'react'
import Image from 'next/image'
import { nomComplet, type MembreEquipe } from '@/data/equipe'

function LinkedInIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

interface TeamCardProps {
  membre: MembreEquipe
}

/**
 * Fiche d'un membre de l'équipe. La photo n'est affichée que si elle est renseignée ;
 * sinon la fiche commence par le nom. Sur mobile, seul le premier paragraphe est visible jusqu'au clic sur « Lire la suite ».
 */
export default function TeamCard({ membre }: TeamCardProps) {
  const [ouvert, setOuvert] = useState(false)
  const nom = nomComplet(membre)
  const [premier, ...suite] = membre.bio

  return (
    <article id={membre.id} className="flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-slate-200/80 border-t-4 border-t-[#5BBF8A] bg-white shadow-[var(--shadow-card)]">
      {/* Bloc photo affiché uniquement quand une photo existe : pas de vignette de remplacement en prod. */}
      {membre.photo && (
        <div className="relative aspect-[4/3] w-full bg-slate-100">
          <Image src={membre.photo} alt={`${nom}, ${membre.role} chez AFFRA RESEAUX`} fill sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-bold text-slate-900">{nom}</h3>
        <p className="mt-1 text-sm font-semibold text-[#3a9e6c]">{membre.role}</p>
        {membre.linkedin && (
          <a
            href={membre.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#0A66C2] hover:underline"
          >
            <LinkedInIcon />
            Profil LinkedIn
            <span className="sr-only"> de {nom} (nouvel onglet)</span>
          </a>
        )}

        <div className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-slate-600">
          <p>{premier}</p>
          <div className={`space-y-3 ${ouvert ? '' : 'hidden'} md:block`}>
            {suite.map((paragraphe) => (
              <p key={paragraphe.slice(0, 32)}>{paragraphe}</p>
            ))}
          </div>
        </div>
        {suite.length > 0 && (
          <button
            type="button"
            onClick={() => setOuvert((v) => !v)}
            aria-expanded={ouvert}
            className="mt-4 w-fit text-sm font-semibold text-[#29B4C5] hover:underline md:hidden"
          >
            {ouvert ? 'Réduire' : 'Lire la suite'}
          </button>
        )}
      </div>
    </article>
  )
}
