/**
 * Chantiers réels présentés sur l'accueil et sur /realisations.
 * Source unique : textes validés par le client (cahier des charges, modification 08).
 * Ajouter un chantier = ajouter une entrée ici + sa photo dans public/images/realisations/
 * (voir scripts/optimize-photos.mjs pour la conversion en WebP).
 */

export interface Realisation {
  /** Identifiant stable (sert de clé React et d'ancre). */
  id: string
  ville: string
  codePostal: string
  departement: string
  /** Titre complet, affiché en H3. */
  titre: string
  /** Caractéristiques techniques en une ligne (modèle, puissance, câble, pose). */
  resume: string
  /** Description complète du chantier. */
  description: string
  image: {
    src: string
    alt: string
    width: number
    height: number
    /** Valeur CSS object-position pour le cadrage dans les cartes uniformes. */
    position: string
  }
}

export const REALISATIONS: readonly Realisation[] = [
  {
    id: 'montmirat',
    ville: 'Montmirat',
    codePostal: '30260',
    departement: '30',
    titre: 'Installation d’une DazeBox Home T à Montmirat (30)',
    resume: 'DazeBox Home T 7,4 kW monophasée ; câble Type 2 attaché ; borne en façade extérieure.',
    description:
      'Pose d’une borne DazeBox Home T en façade extérieure, avec tirage de 7 mètres de câble 3G10 mm² et réalisation d’un percement.',
    image: {
      src: '/images/realisations/chantier-montmirat.webp',
      alt: 'Borne de recharge DazeBox Home T fixée en façade extérieure à Montmirat, câble Type 2 enroulé au sol',
      width: 1268,
      height: 1536,
      position: 'center 40%',
    },
  },
  {
    id: 'aigues-vives',
    ville: 'Aigues-Vives',
    codePostal: '30670',
    departement: '30',
    titre: 'Installation d’une V2C Trydan à Aigues-Vives (30)',
    resume: 'V2C Trydan 22 kW triphasée ; câble Type 2 attaché ; tableau divisionnaire.',
    description:
      'Installation en triphasé, comprenant 31 mètres de câble 5G10 mm², un cheminement en hauteur et la pose d’un tableau électrique divisionnaire.',
    image: {
      src: '/images/realisations/chantier-aigues-vives.webp',
      alt: 'Borne de recharge V2C Trydan posée sur un mur en pierre sous un auvent à Aigues-Vives, avec cheminement de gaine en hauteur',
      width: 1536,
      height: 1152,
      position: '55% 70%',
    },
  },
  {
    id: 'vauvert',
    ville: 'Vauvert',
    codePostal: '30600',
    departement: '30',
    titre: 'Installation d’une DazeBox Home T à Vauvert (30)',
    resume: 'DazeBox Home T 7,4 kW monophasée ; câble Type 2 attaché ; façade extérieure et support mural.',
    description:
      'Installation en façade extérieure, comprenant 5 mètres de câble 3G10 mm², un percement, la création d’un tableau divisionnaire dédié IRVE et la pose d’un support mural pour le câble de recharge.',
    image: {
      src: '/images/realisations/chantier-vauvert.webp',
      alt: 'Borne de recharge DazeBox Home T sur la façade d’une maison à Vauvert, avec support mural pour le câble',
      width: 1152,
      height: 1536,
      position: 'center 35%',
    },
  },
]
