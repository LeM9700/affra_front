'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Image from 'next/image'
import { nomComplet, type MembreEquipe } from '@/data/equipe'

const GRADIENT = 'bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2]'

function LinkedInIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function Badges({ titre, items, ton }: { titre: string; items: string[]; ton: 'vert' | 'bleu' }) {
  if (items.length === 0) return null
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{titre}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              ton === 'vert' ? 'bg-[#5BBF8A]/10 text-[#2f8a5c]' : 'bg-[#29ABE2]/10 text-[#1b7fab]'
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

interface TeamTabsProps {
  equipe: readonly MembreEquipe[]
}

/**
 * Présentation de l'équipe en onglets : un profil affiché à la fois.
 * Tous les panneaux restent dans le HTML (masqués via `hidden`) pour que les textes
 * soient lus par les moteurs de recherche. Une ancre `#<id du membre>` ouvre le bon onglet.
 * Navigation clavier : flèches gauche/droite (ou haut/bas), Début, Fin.
 */
export default function TeamTabs({ equipe }: TeamTabsProps) {
  const [actif, setActif] = useState(0)
  const onglets = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const ouvrirDepuisAncre = () => {
      const index = equipe.findIndex((m) => `#${m.id}` === window.location.hash)
      if (index >= 0) setActif(index)
    }
    ouvrirDepuisAncre()
    window.addEventListener('hashchange', ouvrirDepuisAncre)
    return () => window.removeEventListener('hashchange', ouvrirDepuisAncre)
  }, [equipe])

  const selectionner = (index: number) => {
    const suivant = (index + equipe.length) % equipe.length
    setActif(suivant)
    onglets.current[suivant]?.focus()
  }

  const surTouche = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const actions: Record<string, () => void> = {
      ArrowRight: () => selectionner(index + 1),
      ArrowDown: () => selectionner(index + 1),
      ArrowLeft: () => selectionner(index - 1),
      ArrowUp: () => selectionner(index - 1),
      Home: () => selectionner(0),
      End: () => selectionner(equipe.length - 1),
    }
    const action = actions[event.key]
    if (action) {
      event.preventDefault()
      action()
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[var(--shadow-card)]">
      <div
        role="tablist"
        aria-label="Membres de l’équipe AFFRA RESEAUX"
        className="flex flex-col gap-2 border-b border-slate-100 bg-slate-50 p-3 sm:flex-row"
      >
        {equipe.map((membre, index) => {
          const selectionne = index === actif
          return (
            <button
              key={membre.id}
              ref={(el) => {
                onglets.current[index] = el
              }}
              type="button"
              role="tab"
              id={`onglet-${membre.id}`}
              aria-selected={selectionne}
              aria-controls={membre.id}
              tabIndex={selectionne ? 0 : -1}
              onClick={() => setActif(index)}
              onKeyDown={(event) => surTouche(event, index)}
              className={`flex-1 rounded-2xl px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29ABE2] ${
                selectionne ? `${GRADIENT} text-white shadow` : 'text-slate-600 hover:bg-white'
              }`}
            >
              <span className="block text-sm font-bold">{nomComplet(membre)}</span>
              <span className={`block text-xs ${selectionne ? 'text-white/90' : 'text-slate-400'}`}>{membre.role}</span>
            </button>
          )
        })}
      </div>

      {equipe.map((membre, index) => {
        const nom = nomComplet(membre)
        return (
          <div
            key={membre.id}
            id={membre.id}
            role="tabpanel"
            aria-labelledby={`onglet-${membre.id}`}
            hidden={index !== actif}
            tabIndex={0}
            className="scroll-mt-28 focus:outline-none"
          >
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_280px]">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{nom}</h3>
                <p className="mt-1 text-sm font-semibold text-[#3a9e6c]">{membre.role}</p>
                <div className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed text-slate-600">
                  {membre.bio.map((paragraphe) => (
                    <p key={paragraphe.slice(0, 32)}>{paragraphe}</p>
                  ))}
                </div>
              </div>

              <aside className="h-fit space-y-5 rounded-2xl bg-slate-50 p-5">
                {membre.photo && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={membre.photo}
                      alt={`${nom}, ${membre.role} chez AFFRA RESEAUX`}
                      fill
                      sizes="280px"
                      className="object-cover object-top"
                    />
                  </div>
                )}
                {membre.linkedin && (
                  <a
                    href={membre.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#0A66C2] hover:underline"
                  >
                    <LinkedInIcon />
                    Profil LinkedIn
                    <span className="sr-only"> de {nom} (nouvel onglet)</span>
                  </a>
                )}
                <Badges titre="Diplômes" items={membre.diplomes} ton="bleu" />
                <Badges titre="Expertises" items={membre.expertises} ton="vert" />
              </aside>
            </div>
          </div>
        )
      })}
    </div>
  )
}
