/**
 * Équipe AFFRA RESEAUX : source unique des fiches de la page « Qui sommes-nous ? »
 * et des données structurées `Person` (schema.org).
 *
 * Pour compléter une fiche : renseigner `linkedin` (URL complète du profil), `nom`
 * ou `photo` (fichier dans public/images/equipe/, format portrait 4:5 conseillé).
 * Un champ absent n'affiche rien : jamais de lien vide ni d'image cassée.
 */

export interface MembreEquipe {
  /** Identifiant stable : ancre de la fiche et `@id` schema.org. */
  id: string
  prenom: string
  nom?: string
  role: string
  /** Fondateur de l'entreprise (déclaré comme `founder` dans les données structurées). */
  fondateur: boolean
  linkedin?: string
  photo?: string
  /** Texte de présentation, un élément par paragraphe (texte validé par le client). */
  bio: string[]
  /** Diplômes déclarés dans les données structurées. */
  diplomes: string[]
  /** Domaines d'expertise déclarés dans les données structurées. */
  expertises: string[]
}

export const EQUIPE: readonly MembreEquipe[] = [
  {
    id: 'sofiane-fazazi',
    prenom: 'Sofiane',
    nom: 'Fazazi',
    role: 'Cofondateur & Cogérant',
    fondateur: true,
    bio: [
      'Après six années passées comme coordinateur de travaux au sein d’une grande entreprise de télécommunications, Sofiane décide de donner vie à son ambition entrepreneuriale.',
      'Son expérience lui a permis de développer une approche structurée de la gestion des interventions, de la coordination des équipes et de la relation client.',
      'Au sein d’AFFRA RESEAUX, il assure principalement le développement de l’activité, les études et devis, le suivi des projets et la relation avec les clients. Très attaché au terrain, il participe également régulièrement aux visites techniques et aux installations.',
      'Sa conviction : une installation réussie commence par une bonne compréhension des besoins du client et se termine par un travail dont on peut être fier.',
    ],
    diplomes: [],
    expertises: ['Coordination de travaux', 'Études et devis', 'Relation client', 'Installation de bornes de recharge'],
  },
  {
    id: 'bechir-belghith',
    prenom: 'Bechir',
    nom: 'Belghith',
    role: 'Cofondateur & Cogérant',
    fondateur: true,
    bio: [
      'Issu d’un environnement familial profondément ancré dans les métiers du bâtiment, Bechir s’est orienté très tôt vers ce secteur.',
      'Titulaire d’un CAP électricien, il a développé son expérience au fil de différents postes dans le BTP, avant de se lancer dans l’entrepreneuriat et la direction d’entreprises dès 2017. Cette expérience lui apporte une vision concrète des contraintes techniques rencontrées sur les chantiers.',
      'Chez AFFRA RESEAUX, son expertise est particulièrement précieuse lorsque les installations nécessitent des travaux spécifiques : percements complexes, tranchées, adaptations du bâtiment ou cheminements techniques.',
      'Son savoir-faire complète les compétences électriques de l’équipe et permet d’aborder les projets dans leur ensemble, y compris lorsque leur réalisation dépasse le simple raccordement d’une borne.',
    ],
    diplomes: ['CAP électricien'],
    expertises: ['Électricité', 'Bâtiment et travaux publics', 'Travaux de génie civil', 'Direction d’entreprise'],
  },
  {
    id: 'yazid',
    prenom: 'Yazid',
    role: 'Technicien installateur & Référent technique',
    fondateur: false,
    bio: [
      'Titulaire d’un baccalauréat STI2D, spécialité Architecture et Construction, puis d’un BTS Maintenance des systèmes, option Systèmes de production, Yazid a construit son parcours autour des installations techniques et électriques.',
      'Après une expérience en électricité générale, il a exercé pendant quatre ans comme inspecteur de conformité des installations électriques. Ses missions l’ont amené à contrôler des installations dans des logements, des bâtiments professionnels et des environnements industriels, notamment à travers des mesures de terre et des vérifications réglementaires.',
      'Aujourd’hui, Yazid intervient sur les installations de bornes de recharge d’AFFRA RESEAUX et assure un rôle de référent technique auprès de l’équipe. Sa connaissance des exigences de sécurité électrique constitue un véritable atout dans un domaine où les équipements peuvent fonctionner à des puissances importantes pendant plusieurs heures.',
      'Passionné par les nouvelles technologies et la mobilité électrique, il partage pleinement la vision des deux fondateurs : réaliser des installations fiables, soignées et adaptées à chaque client.',
    ],
    diplomes: [
      'Baccalauréat STI2D, spécialité Architecture et Construction',
      'BTS Maintenance des systèmes, option Systèmes de production',
    ],
    expertises: ['Conformité des installations électriques', 'Mesures de terre', 'Sécurité électrique', 'Installation de bornes de recharge'],
  },
]

/**
 * Nom affiché d'un membre (prénom seul tant que le nom n'est pas renseigné).
 *
 * @param membre - Membre de l'équipe.
 * @returns « Prénom Nom » ou « Prénom ».
 */
export function nomComplet(membre: Pick<MembreEquipe, 'prenom' | 'nom'>): string {
  return membre.nom ? `${membre.prenom} ${membre.nom}` : membre.prenom
}
