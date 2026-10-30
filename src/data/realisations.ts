/**
 * Chantiers réels présentés sur l'accueil et sur /realisations.
 * Source unique : textes validés par le client (cahier des charges, modification 08,
 * titres et descriptions mis à jour selon les directives « Nos réalisations »).
 * Ajouter un chantier = ajouter une entrée ici + sa photo dans public/images/realisations/
 * (voir scripts/optimize-photos.mjs pour la conversion en WebP).
 */

export interface Realisation {
  /** Identifiant stable (sert de clé React et d'ancre). */
  id: string
  ville: string
  codePostal: string
  departement: string
  /** Centre approximatif de la commune (jamais l'adresse du client) : sert aux distances des pages villes. */
  lat: number
  lng: number
  /** Titre SEO local (« borne de recharge » + modèle + commune), affiché en H3. */
  titre: string
  /** Description courte validée par le client, affichée sur toutes les cartes. */
  resume: string
  /** Détail technique du chantier, affiché uniquement sur /realisations. */
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
    lat: 43.8886,
    lng: 4.1061,
    titre: 'Borne de recharge DazeBox Home T à Montmirat',
    resume:
      'Installation soignée d’une borne 7,4 kW en façade, avec câble attaché pour une recharge simple et pratique au quotidien.',
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
    lat: 43.7387,
    lng: 4.1811,
    titre: 'Borne de recharge V2C Trydan à Aigues-Vives',
    resume:
      'Installation d’une borne triphasée 22 kW avec cheminement du câble en hauteur, adapté aux contraintes du bâtiment.',
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
    lat: 43.6937,
    lng: 4.2753,
    titre: 'Borne de recharge DazeBox Home T à Vauvert',
    resume:
      'Pose d’une borne 7,4 kW en façade, avec passage de l’alimentation à travers le mur pour une finition soignée.',
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
