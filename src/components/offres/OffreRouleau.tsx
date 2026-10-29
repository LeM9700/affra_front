'use client'

import { animate, useInView, useReducedMotion } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Pause, Play } from 'lucide-react'
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
  type WheelEvent,
} from 'react'
import { decisionGlisse, indexVoisin, sensVers, type SensRouleau } from '@/lib/offres/rouleau'

export interface ElementRouleau {
  id: string
  /** Nom lu par les lecteurs d'écran et affiché au survol des points. */
  label: string
  /** Temps d'affichage avant de passer à l'élément suivant. */
  dureeMs: number
  contenu: ReactNode
}

interface OffreRouleauProps {
  elements: readonly ElementRouleau[]
  /** Libellé accessible du rouleau. */
  label: string
  className?: string
}

type Axe = 'x' | 'y'

/** En dessous de `md` les cartes sont empilées : le rouleau tourne horizontalement. */
const MEDIA_HORIZONTAL = '(max-width: 767.98px)'
/** Écart entre deux cartes du rouleau, en % de la taille d'une carte. */
const DECALAGE_POURCENT = 112
const DUREE_S = 0.85
/** Courbe avec dépassement : la carte va un peu trop loin puis revient (rebond à l'arrêt). */
const EASE_REBOND = [0.34, 1.32, 0.64, 1] as const
const FLOU = 'blur(6px)'
const NET = 'blur(0px)'
/** Déplacement à partir duquel un appui devient un glissement (en deçà : simple clic / tap). */
const SEUIL_DEMARRAGE_PX = 8
/** Trackpad : défilement horizontal cumulé qui déclenche un changement de carte. */
const SEUIL_MOLETTE_PX = 40
/** Trackpad : délai minimal entre deux changements (l'inertie envoie des événements en rafale). */
const DELAI_MOLETTE_MS = 900

interface Geste {
  pointeurId: number
  typePointeur: string
  x0: number
  y0: number
  /** Axe verrouillé après les premiers pixels ; `null` tant que le geste n'a pas démarré. */
  axe: Axe | null
  deplacement: number
  /** Carte qui apparaît sur le bord pendant le glissement. */
  candidate: number | null
  /** Dernière position connue, pour calculer la vitesse en fin de geste. */
  dernier: { pos: number; t: number }
  vitesse: number
}

function useAxe(): Axe {
  const [axe, setAxe] = useState<Axe>('y')
  useEffect(() => {
    const media = window.matchMedia(MEDIA_HORIZONTAL)
    const mettreAJour = () => setAxe(media.matches ? 'x' : 'y')
    mettreAJour()
    media.addEventListener('change', mettreAJour)
    return () => media.removeEventListener('change', mettreAJour)
  }, [])
  return axe
}

function usePageVisible(): boolean {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const mettreAJour = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', mettreAJour)
    return () => document.removeEventListener('visibilitychange', mettreAJour)
  }, [])
  return visible
}

/**
 * Emplacement de carte qui fait défiler plusieurs offres comme le rouleau d'une machine à sous :
 * la carte sort vers le haut (vers la gauche sur mobile), la suivante arrive avec un léger flou
 * de vitesse et un rebond à l'arrêt.
 *
 * - Glissement au doigt ou à la souris : la carte suit le geste, la voisine apparaît au bord ;
 *   au relâchement, on change de carte (au-delà de 20 % ou geste rapide) ou la carte revient.
 *   Au doigt, seul le geste horizontal est capté (le défilement vertical de la page reste libre).
 *   Trackpad : glissement horizontal à deux doigts.
 * - Défilement automatique selon `dureeMs`, uniquement quand le rouleau est à l'écran et que
 *   l'onglet est actif ; en pause au survol, au focus clavier, ou via le bouton pause.
 * - Toutes les cartes restent dans le HTML (indexables) ; les cartes cachées sont `inert`.
 * - Hauteur = carte la plus haute (cartes superposées dans la même cellule de grille) :
 *   la grille ne bouge pas quand le contenu change.
 * - « Réduire les animations » activé : fondu simple, pas de défilement automatique.
 */
export default function OffreRouleau({ elements, label, className }: OffreRouleauProps) {
  const total = elements.length
  const [actif, setActif] = useState(0)
  const [survol, setSurvol] = useState(false)
  const [focusDedans, setFocusDedans] = useState(false)
  const [pauseUtilisateur, setPauseUtilisateur] = useState(false)
  const [enGlisse, setEnGlisse] = useState(false)

  const axe = useAxe()
  const pageVisible = usePageVisible()
  const animationsReduites = useReducedMotion() ?? false
  const racineRef = useRef<HTMLDivElement>(null)
  const aLEcran = useInView(racineRef, { amount: 0.5 })

  const cartesRef = useRef<(HTMLDivElement | null)[]>([])
  const actifRef = useRef(0)
  const enMouvementRef = useRef(false)
  const zoneId = useId()
  const gesteRef = useRef<Geste | null>(null)
  const clicBloqueRef = useRef(false)
  const moletteRef = useRef({ cumul: 0, dernierChangement: 0 })

  const lectureAuto =
    total > 1 && !animationsReduites && !pauseUtilisateur && !survol && !focusDedans && !enGlisse && aLEcran && pageVisible

  const aller = useCallback(
    /**
     * @param depuisGlisse La carte a été déplacée au doigt : on repart de sa position actuelle
     * au lieu de la position de départ habituelle.
     */
    async (vers: number, sens: SensRouleau, depuisGlisse = false) => {
      const depuis = actifRef.current
      const entrante = cartesRef.current[vers]
      const sortante = cartesRef.current[depuis]
      if (vers === depuis || enMouvementRef.current || !entrante || !sortante) return

      enMouvementRef.current = true
      actifRef.current = vers
      setActif(vers)
      entrante.style.visibility = 'visible'

      if (animationsReduites) {
        await Promise.all([
          animate(entrante, { opacity: [0, 1], x: '0%', y: '0%', filter: NET }, { duration: 0.3 }),
          animate(sortante, { opacity: [1, 0] }, { duration: 0.3 }),
        ])
      } else {
        const autreAxe: Axe = axe === 'x' ? 'y' : 'x'
        // Même durée et même courbe pour les deux cartes : elles avancent comme une bande continue.
        const depart = (valeur: string) => (depuisGlisse ? [] : [valeur])
        await Promise.all([
          animate(
            entrante,
            {
              [axe]: [...depart(`${DECALAGE_POURCENT * sens}%`), '0%'],
              [autreAxe]: '0%',
              opacity: 1,
              filter: [...depart(FLOU), NET],
            },
            {
              duration: DUREE_S,
              ease: EASE_REBOND,
              filter: { duration: DUREE_S * 0.65, ease: 'easeOut' },
              [autreAxe]: { duration: 0 },
              opacity: { duration: 0 },
            },
          ),
          animate(
            sortante,
            { [axe]: [...depart('0%'), `${-DECALAGE_POURCENT * sens}%`], filter: [NET, FLOU] },
            { duration: DUREE_S, ease: EASE_REBOND, filter: { duration: DUREE_S * 0.35, ease: 'easeIn' } },
          ),
        ])
      }

      sortante.style.visibility = 'hidden'
      enMouvementRef.current = false
    },
    [axe, animationsReduites],
  )

  // Lien vers une ancre de l'une des cartes (ex. /offres#v2c-trydan) : on l'affiche directement.
  useEffect(() => {
    const afficherAncre = () => {
      const ancre = decodeURIComponent(window.location.hash.slice(1))
      if (!ancre || enMouvementRef.current) return
      const cible = cartesRef.current.findIndex((carte) => carte?.querySelector(`[id="${CSS.escape(ancre)}"]`))
      if (cible < 0 || cible === actifRef.current) return
      cartesRef.current.forEach((carte, i) => {
        if (carte) carte.style.visibility = i === cible ? 'visible' : 'hidden'
      })
      const carte = cartesRef.current[cible]
      if (carte) animate(carte, { x: '0%', y: '0%', filter: NET, opacity: 1 }, { duration: 0 })
      actifRef.current = cible
      setActif(cible)
    }
    afficherAncre()
    window.addEventListener('hashchange', afficherAncre)
    return () => window.removeEventListener('hashchange', afficherAncre)
  }, [])

  // Changement d'orientation (rotation, redimensionnement) : on recentre la carte affichée.
  useEffect(() => {
    const carte = cartesRef.current[actifRef.current]
    if (carte) animate(carte, { x: '0%', y: '0%', filter: NET, opacity: 1 }, { duration: 0 })
  }, [axe])

  useEffect(() => {
    if (!lectureAuto) return
    const minuteur = window.setTimeout(() => {
      void aller(indexVoisin(actif, total, 1), 1)
    }, elements[actif].dureeMs)
    return () => window.clearTimeout(minuteur)
  }, [lectureAuto, actif, total, elements, aller])

  /** Pendant un glissement sur l'axe du rouleau : la carte suit le doigt, la voisine apparaît au bord. */
  const suivreDoigt = (geste: Geste) => {
    const carteActive = cartesRef.current[actifRef.current]
    if (!carteActive) return
    const taille = axe === 'x' ? carteActive.offsetWidth : carteActive.offsetHeight
    const pourcent = taille > 0 ? (geste.deplacement / taille) * 100 : 0
    const sens: SensRouleau = geste.deplacement < 0 ? 1 : -1
    const candidate = indexVoisin(actifRef.current, total, sens)
    if (geste.candidate !== null && geste.candidate !== candidate) {
      const ancienne = cartesRef.current[geste.candidate]
      if (ancienne) ancienne.style.visibility = 'hidden'
    }
    geste.candidate = candidate
    const carteCandidate = cartesRef.current[candidate]
    const autreAxe: Axe = axe === 'x' ? 'y' : 'x'
    animate(carteActive, { [axe]: `${pourcent}%`, [autreAxe]: '0%' }, { duration: 0 })
    if (carteCandidate && candidate !== actifRef.current) {
      carteCandidate.style.visibility = 'visible'
      animate(
        carteCandidate,
        { [axe]: `${DECALAGE_POURCENT * sens + pourcent}%`, [autreAxe]: '0%', filter: NET, opacity: 1 },
        { duration: 0 },
      )
    }
  }

  /** Geste abandonné ou trop court : la carte revient en place, la voisine repart. */
  const remettreEnPlace = (geste: Geste) => {
    const carteActive = cartesRef.current[actifRef.current]
    if (carteActive) animate(carteActive, { [axe]: '0%' }, { type: 'spring', bounce: 0.35, duration: 0.5 })
    if (geste.candidate === null || geste.candidate === actifRef.current) return
    const carteCandidate = cartesRef.current[geste.candidate]
    const sens: SensRouleau = geste.deplacement < 0 ? 1 : -1
    if (carteCandidate) {
      void animate(carteCandidate, { [axe]: `${DECALAGE_POURCENT * sens}%` }, { duration: 0.3, ease: 'easeOut' }).then(
        () => {
          if (actifRef.current !== geste.candidate) carteCandidate.style.visibility = 'hidden'
        },
      )
    }
  }

  const surPointeurBas = (e: PointerEvent<HTMLDivElement>) => {
    if (total < 2 || enMouvementRef.current || !e.isPrimary) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    clicBloqueRef.current = false
    gesteRef.current = {
      pointeurId: e.pointerId,
      typePointeur: e.pointerType,
      x0: e.clientX,
      y0: e.clientY,
      axe: null,
      deplacement: 0,
      candidate: null,
      dernier: { pos: 0, t: e.timeStamp },
      vitesse: 0,
    }
  }

  const surPointeurDeplace = (e: PointerEvent<HTMLDivElement>) => {
    const geste = gesteRef.current
    if (!geste || e.pointerId !== geste.pointeurId) return
    const dx = e.clientX - geste.x0
    const dy = e.clientY - geste.y0

    if (!geste.axe) {
      if (Math.hypot(dx, dy) < SEUIL_DEMARRAGE_PX) return
      const dominant: Axe = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y'
      // Au doigt, un geste vertical reste le défilement de la page.
      if (geste.typePointeur !== 'mouse' && dominant === 'y') {
        gesteRef.current = null
        return
      }
      geste.axe = dominant
      clicBloqueRef.current = true
      setEnGlisse(true)
      if (geste.typePointeur === 'mouse') e.currentTarget.setPointerCapture(e.pointerId)
    }

    const deplacement = geste.axe === 'x' ? dx : dy
    const dt = e.timeStamp - geste.dernier.t
    if (dt > 0) geste.vitesse = (deplacement - geste.dernier.pos) / dt
    geste.dernier = { pos: deplacement, t: e.timeStamp }
    geste.deplacement = deplacement
    if (geste.axe === axe && !animationsReduites) suivreDoigt(geste)
  }

  const surPointeurHaut = (e: PointerEvent<HTMLDivElement>, annule = false) => {
    const geste = gesteRef.current
    if (!geste || e.pointerId !== geste.pointeurId) return
    gesteRef.current = null
    if (!geste.axe) return
    setEnGlisse(false)
    // Le clic qui suit le relâchement est bloqué (pas de « Demander un devis » involontaire), pas les suivants.
    window.setTimeout(() => {
      clicBloqueRef.current = false
    }, 0)

    const carte = cartesRef.current[actifRef.current]
    const taille = carte ? (geste.axe === 'x' ? carte.offsetWidth : carte.offsetHeight) : 0
    // Vitesse ignorée si le doigt s'est arrêté avant de relâcher.
    const vitesse = e.timeStamp - geste.dernier.t > 80 ? 0 : geste.vitesse
    const sens = annule ? null : decisionGlisse(geste.deplacement, taille, vitesse)
    const suivi = geste.axe === axe && !animationsReduites

    if (sens === null) {
      if (suivi) remettreEnPlace(geste)
      return
    }
    void aller(indexVoisin(actifRef.current, total, sens), sens, suivi)
  }

  /** Trackpad : un glissement horizontal à deux doigts fait tourner le rouleau. */
  const surMolette = (e: WheelEvent<HTMLDivElement>) => {
    if (total < 2 || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    const molette = moletteRef.current
    if (e.timeStamp - molette.dernierChangement < DELAI_MOLETTE_MS) return
    molette.cumul += e.deltaX
    if (Math.abs(molette.cumul) < SEUIL_MOLETTE_PX) return
    const sens: SensRouleau = molette.cumul > 0 ? 1 : -1
    molette.cumul = 0
    molette.dernierChangement = e.timeStamp
    void aller(indexVoisin(actifRef.current, total, sens), sens)
  }

  // Pause au focus clavier seulement : un tap sur mobile ne doit pas bloquer le défilement.
  const surFocusEntrant = (e: FocusEvent<HTMLDivElement>) => {
    if (e.target.matches(':focus-visible')) setFocusDedans(true)
  }

  const surFocusSortant = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setFocusDedans(false)
  }

  const IconePrecedent = axe === 'y' ? ChevronUp : ChevronLeft
  const IconeSuivant = axe === 'y' ? ChevronDown : ChevronRight
  const bouton =
    'inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-[#5BBF8A]/50 hover:text-[#5BBF8A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B4C5]'

  return (
    <div
      ref={racineRef}
      role="region"
      aria-roledescription="carrousel"
      aria-label={label}
      className={['relative h-full', className].filter(Boolean).join(' ')}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setSurvol(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setSurvol(false)}
      onFocus={surFocusEntrant}
      onBlur={surFocusSortant}
    >
      {/* Zone de découpe élargie (ombres non coupées), sans dépasser la marge de 1 rem du mobile.
          `touch-pan-y` : le navigateur garde le défilement vertical de la page, on gère l'horizontal. */}
      <div
        className={[
          '-m-4 h-[calc(100%+2rem)] touch-pan-y overflow-hidden p-4 md:-m-5 md:h-[calc(100%+2.5rem)] md:p-5',
          total > 1 ? 'md:cursor-grab' : '',
          enGlisse ? 'select-none md:cursor-grabbing' : '',
        ].join(' ')}
        onPointerDown={surPointeurBas}
        onPointerMove={surPointeurDeplace}
        onPointerUp={surPointeurHaut}
        onPointerCancel={(e) => surPointeurHaut(e, true)}
        onWheel={surMolette}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          if (!clicBloqueRef.current) return
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div
          id={zoneId}
          aria-live={lectureAuto ? 'off' : 'polite'}
          className="grid h-full grid-cols-1 grid-rows-1"
        >
          {elements.map((element, i) => (
            <div
              key={element.id}
              ref={(noeud) => {
                cartesRef.current[i] = noeud
              }}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${total} : ${element.label}`}
              inert={i !== actif}
              className="col-start-1 row-start-1 h-full"
              style={i === 0 ? undefined : { visibility: 'hidden' }}
            >
              {element.contenu}
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <div className="absolute inset-x-0 top-full mt-5 flex items-center justify-center gap-2">
          <button
            type="button"
            className={bouton}
            aria-controls={zoneId}
            aria-label="Offre précédente"
            onClick={() => void aller(indexVoisin(actif, total, -1), -1)}
          >
            <IconePrecedent className="h-4 w-4" strokeWidth={2.25} />
          </button>

          <div className="flex items-center">
            {elements.map((element, i) => (
              <button
                key={element.id}
                type="button"
                aria-controls={zoneId}
                aria-label={`Afficher ${element.label}`}
                aria-current={i === actif}
                title={element.label}
                onClick={() => void aller(i, sensVers(actif, i, total))}
                className="group p-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#29B4C5] rounded-full"
              >
                <span
                  className={[
                    'relative block h-2 overflow-hidden rounded-full transition-all duration-300',
                    i === actif ? 'w-8 bg-slate-200' : 'w-2 bg-slate-300 group-hover:bg-slate-400',
                  ].join(' ')}
                >
                  {i === actif && (
                    <span
                      // Nouvelle clé à chaque reprise : la jauge repart avec le minuteur.
                      key={`${actif}-${lectureAuto}`}
                      className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2]"
                      style={
                        lectureAuto
                          ? { animation: `rouleau-progression ${element.dureeMs}ms linear forwards` }
                          : undefined
                      }
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className={bouton}
            aria-controls={zoneId}
            aria-label="Offre suivante"
            onClick={() => void aller(indexVoisin(actif, total, 1), 1)}
          >
            <IconeSuivant className="h-4 w-4" strokeWidth={2.25} />
          </button>

          {!animationsReduites && (
            <button
              type="button"
              className={bouton}
              aria-pressed={pauseUtilisateur}
              aria-label={pauseUtilisateur ? 'Reprendre le défilement' : 'Mettre en pause le défilement'}
              onClick={() => setPauseUtilisateur((p) => !p)}
            >
              {pauseUtilisateur ? (
                <Play className="h-3.5 w-3.5" strokeWidth={2.25} />
              ) : (
                <Pause className="h-3.5 w-3.5" strokeWidth={2.25} />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
