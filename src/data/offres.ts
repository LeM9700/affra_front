/**
 * Offres AFFRA RESEAUX : source unique des cartes de l'accueil, de la grille et du comparatif
 * de /offres, de la FAQ et des données structurées `Product` (schema.org).
 *
 * Disposition : `COLONNES_OFFRES` décrit les trois emplacements affichés. Une colonne qui
 * contient plusieurs offres devient un « rouleau » qui les fait défiler (l'ordre du tableau
 * est l'ordre de passage, la première offre est celle affichée au chargement).
 *
 * Règles éditoriales : aucune caractéristique non fournie par le client ou le fabricant.
 * Une valeur inconnue du comparatif vaut `null` (affichée « Nous consulter »).
 */

export type OffreId = 'green-up-legrand' | 'dazebox-home-t' | 'la-borne-tricolore' | 'v2c-trydan'

/** Style du badge : couleur et pictogramme sont choisis par les composants selon la variante. */
export type BadgeVariante = 'economique' | 'recommandation' | 'connectee' | 'france'

/** Valeur d'une case du comparatif : booléen (✓ / —), texte libre, ou `null` si non confirmée. */
export type ValeurComparatif = boolean | string | null

export interface CriteresComparatif {
  puissanceMax: string
  cableType2: ValeurComparatif
  compatibleSolaire: ValeurComparatif
  wifiBluetooth: ValeurComparatif
  ecranIntegre: ValeurComparatif
  design: string
  idealPour: string
}

export interface Offre {
  /** Identifiant stable : ancre de la carte sur /offres (`/offres#<id>`). */
  id: OffreId
  titre: string
  /** Marque déclarée dans les données structurées. */
  marque: string
  badge: string
  badgeVariante: BadgeVariante
  /** Prix « à partir de », TTC pose comprise, en euros. */
  prixTtc: number
  image: string
  /** Produit fabriqué en France : mis en avant visuellement et déclaré en `countryOfOrigin`. */
  fabriqueEnFrance?: boolean
  /** Durée d'affichage dans un rouleau avant de passer à l'offre suivante. */
  dureeAffichageMs?: number
  /** Carte courte de l'accueil. */
  accueil: {
    soustitre: string
    features: string[]
    imageAlt: string
  }
  /** Carte détaillée de /offres. */
  detail: {
    soustitre: string
    features: string[]
    recommandePour: string
    imageAlt: string
  }
  /** Description `Product` des données structurées. */
  descriptionSchema: string
  comparatif: CriteresComparatif
}

export const OFFRES: Readonly<Record<OffreId, Offre>> = {
  'green-up-legrand': {
    id: 'green-up-legrand',
    titre: "Green'up Legrand",
    marque: 'Legrand',
    badge: 'Recharge occasionnelle / petit budget',
    badgeVariante: 'economique',
    prixTtc: 499,
    image: '/images/GREEN UP LEGRAND.webp',
    accueil: {
      soustitre: "Prise renforcée jusqu'à 3,7 kW",
      features: [
        'Solution économique et sécurisée',
        "Recharge plus performante qu'une prise classique",
        'Idéal pour les petits trajets du quotidien',
        'Compatible avec la majorité des VE et hybrides rechargeables',
      ],
      imageAlt: "Green'up Legrand kit prise renforcée",
    },
    detail: {
      soustitre: 'Prise renforcée sécurisée',
      features: [
        'Solution économique et sécurisée',
        "Recharge plus performante qu'une prise classique",
        'Idéal pour les petits trajets du quotidien',
        'Compatible avec la majorité des véhicules électriques et hybrides rechargeables',
        'Installation discrète et rapide',
        'Parfait pour une recharge de nuit',
      ],
      recommandePour: 'Recommandé pour les utilisateurs avec un faible kilométrage quotidien.',
      imageAlt: "Prise renforcée Green'up Legrand installée par AFFRA RESEAUX",
    },
    descriptionSchema:
      'Prise renforcée sécurisée pour véhicule électrique, solution économique et discrète. Installée par AFFRA RESEAUX, techniciens certifiés IRVE dans le Gard et l’Hérault.',
    comparatif: {
      puissanceMax: '3,7 kW',
      cableType2: false,
      compatibleSolaire: false,
      wifiBluetooth: false,
      ecranIntegre: false,
      design: 'Discret',
      idealPour: 'Petits trajets',
    },
  },
  'dazebox-home-t': {
    id: 'dazebox-home-t',
    titre: 'DazeBox Home T',
    marque: 'DazeBox',
    badge: 'Notre recommandation',
    badgeVariante: 'recommandation',
    prixTtc: 1250,
    image: '/images/DAZEBOX HOME T.webp',
    accueil: {
      soustitre: "Câble Type 2 attaché 5m jusqu'à 22kW",
      features: [
        "Recharge rapide jusqu'à 22kW",
        'Gestion intelligente de la puissance (délestage)',
        'Application mobile dédiée (Wi-Fi & Bluetooth)',
        'Compatible avec installation photovoltaïque',
      ],
      imageAlt: "DazeBox Home T borne de recharge jusqu'à 22kW",
    },
    detail: {
      soustitre: "Câble Type 2 attaché 5m jusqu'à 22kW",
      features: [
        "Recharge rapide jusqu'à 22kW",
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
      imageAlt: 'Borne de recharge DazeBox Home T installée par AFFRA RESEAUX',
    },
    descriptionSchema:
      "Borne de recharge wallbox avec câble Type 2 attaché 5m, jusqu'à 22kW, gestion intelligente de la puissance et compatible photovoltaïque. Installée par AFFRA RESEAUX, techniciens certifiés IRVE.",
    comparatif: {
      puissanceMax: '22 kW',
      cableType2: 'Oui (5 m)',
      compatibleSolaire: true,
      wifiBluetooth: true,
      ecranIntegre: true,
      design: 'Moderne',
      idealPour: 'Usage quotidien',
    },
  },
  'la-borne-tricolore': {
    id: 'la-borne-tricolore',
    titre: 'La Borne Tricolore',
    marque: 'La Borne Tricolore',
    badge: 'La borne de recharge Made in France',
    badgeVariante: 'france',
    prixTtc: 1290,
    image: '/images/la-borne-tricolore.webp',
    fabriqueEnFrance: true,
    // Partenariat : reste affichée plus longtemps que la V2C Trydan dans le rouleau.
    dureeAffichageMs: 7000,
    accueil: {
      soustitre: "Borne de recharge jusqu'à 22 kW",
      features: [
        'Format compact et design moderne',
        'Gestion intelligente de la puissance (délestage)',
        'Pilotage de la recharge via application mobile',
        'Compatible avec une installation photovoltaïque',
      ],
      imageAlt: "La Borne Tricolore, borne de recharge fabriquée en France jusqu'à 22 kW",
    },
    detail: {
      soustitre: "Borne de recharge jusqu'à 22 kW",
      features: [
        'Fabriquée en France',
        'Disponible en monophasé (7,4 kW) et triphasé (22 kW)',
        'Format compact et design moderne',
        'Gestion intelligente de la puissance (délestage)',
        'Pilotage de la recharge via application mobile',
        'Connectivité Wi-Fi, Bluetooth, Ethernet et 4G',
        'Démarrage de la charge par badge NFC ou application',
        'Compatible avec une installation photovoltaïque',
      ],
      recommandePour: 'Idéal pour les utilisateurs qui veulent une borne connectée et fabriquée en France.',
      imageAlt: 'Borne de recharge La Borne Tricolore installée par AFFRA RESEAUX',
    },
    descriptionSchema:
      "Borne de recharge fabriquée en France, jusqu'à 22 kW, au format compact, avec gestion intelligente de la puissance, pilotage via application mobile et compatible photovoltaïque. Installée par AFFRA RESEAUX, entreprise qualifiée IRVE.",
    comparatif: {
      puissanceMax: '22 kW',
      // Sources : fabricant (labornetricolore-fabrique.com, page « Nos produits ») pour la
      // connectivité et les puissances ; client pour le câble (non fourni) ; photo produit pour l'écran.
      cableType2: false,
      compatibleSolaire: true,
      wifiBluetooth: true,
      ecranIntegre: false,
      design: 'Compact et moderne',
      idealPour: 'Made in France',
    },
  },
  'v2c-trydan': {
    id: 'v2c-trydan',
    titre: 'V2C Trydan',
    marque: 'V2C',
    badge: 'La recharge connectée et polyvalente',
    badgeVariante: 'connectee',
    prixTtc: 1350,
    image: '/images/V2C TRYDAN.webp',
    dureeAffichageMs: 5000,
    accueil: {
      soustitre: "Câble Type 2 attaché 5m jusqu'à 22kW",
      features: [
        'Gestion dynamique de la puissance incluse',
        'Compatible panneaux solaires',
        'Pilotage intelligent de la recharge',
        'Design premium avec éclairage LED',
      ],
      imageAlt: "V2C Trydan borne bi-directionnelle jusqu'à 22kW",
    },
    detail: {
      soustitre: "Câble Type 2 attaché 5m jusqu'à 22kW",
      features: [
        "Recharge jusqu'à 22kW",
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
      imageAlt: 'Borne de recharge V2C Trydan installée par AFFRA RESEAUX',
    },
    descriptionSchema:
      "Borne de recharge premium avec câble Type 2 attaché 5m, jusqu'à 22kW, design LED et intégration solaire avancée. Installée par AFFRA RESEAUX, techniciens certifiés IRVE.",
    comparatif: {
      puissanceMax: '22 kW',
      cableType2: 'Oui (5 m)',
      compatibleSolaire: true,
      wifiBluetooth: true,
      ecranIntegre: false,
      design: 'Premium',
      idealPour: 'Haut de gamme',
    },
  },
}

/**
 * Les trois emplacements affichés, de gauche à droite (de haut en bas sur mobile).
 * La colonne de droite est un rouleau : La Borne Tricolore passe en premier (partenariat).
 */
export const COLONNES_OFFRES: readonly (readonly OffreId[])[] = [
  ['green-up-legrand'],
  ['dazebox-home-t'],
  ['la-borne-tricolore', 'v2c-trydan'],
]

/** Offre mise en avant (carte centrale, colonne surlignée du comparatif). */
export const OFFRE_RECOMMANDEE: OffreId = 'dazebox-home-t'

/** Toutes les offres dans l'ordre de lecture (comparatif, données structurées). */
export const ORDRE_OFFRES: readonly OffreId[] = COLONNES_OFFRES.flat()

/** Libellés des lignes du comparatif, dans l'ordre d'affichage. */
export const LIGNES_COMPARATIF: readonly { cle: keyof CriteresComparatif | 'prix'; label: string }[] = [
  { cle: 'puissanceMax', label: 'Puissance max' },
  { cle: 'prix', label: 'Prix indicatif TTC' },
  { cle: 'cableType2', label: 'Câble Type 2 inclus' },
  { cle: 'compatibleSolaire', label: 'Compatible solaire' },
  { cle: 'wifiBluetooth', label: 'Wi-Fi / Bluetooth' },
  { cle: 'ecranIntegre', label: 'Écran intégré' },
  { cle: 'design', label: 'Design' },
  { cle: 'idealPour', label: 'Idéal pour' },
]

/** FAQ de /offres : affichée par `OffresFAQ` et déclarée en `FAQPage` (le texte doit être identique). */
export const FAQ_OFFRES: readonly { q: string; a: string }[] = [
  {
    q: 'Quelle borne choisir pour une maison individuelle ?',
    a: "Tout dépend de votre usage quotidien. Si vous parcourez moins de 80 km par jour, la prise renforcée Green'up Legrand est une solution économique et suffisante. Pour une recharge rapide chaque nuit, la DazeBox Home T est notre best-seller : elle recharge la plupart des véhicules en 3 à 6 heures. Pour une borne fabriquée en France, La Borne Tricolore réunit un format compact, la gestion intelligente de la puissance et le pilotage via application mobile. Pour une solution haut de gamme avec pilotage intelligent et intégration solaire avancée, le V2C Trydan est le choix idéal. Nos techniciens certifiés IRVE vous conseillent gratuitement selon votre véhicule et votre installation électrique.",
  },
  {
    q: "Combien de temps prend l'installation ?",
    a: "Une installation standard prend entre 2 et 4 heures. Cela inclut la pose de la borne, le câblage, la mise en service et les tests de bon fonctionnement. Dans certains cas — passage de gaines sur une longue distance, adaptation du tableau électrique — la durée peut s'étendre à une journée complète. Nos techniciens certifiés IRVE s'occupent de l'intégralité des travaux et vous remettent un compte-rendu d'installation conforme aux normes en vigueur.",
  },
  {
    q: 'Est-ce compatible avec mes panneaux solaires ?',
    a: "Oui, la DazeBox Home T, La Borne Tricolore et le V2C Trydan sont tous les trois compatibles avec une installation photovoltaïque. Leur système de pilotage intelligent peut prioriser l'énergie produite par vos panneaux pour charger votre véhicule électrique, réduisant ainsi votre consommation d'électricité du réseau. Nos experts vous accompagnent dans la configuration optimale selon votre production solaire et votre contrat de revente.",
  },
]
