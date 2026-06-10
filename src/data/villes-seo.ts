export interface VilleData {
  slug: string
  nom: string
  departement: string
  nomDept: string
  lat: number
  lng: number
  metaTitle: string
  metaDescription: string
  intro: string
  quartiers: string[]
  faqItems: { question: string; answer: string }[]
}

export const villesSeo: VilleData[] = [
  // ── Hérault (34) ─────────────────────────────────────────────────────────────
  {
    slug: 'montpellier',
    nom: 'Montpellier',
    departement: '34',
    nomDept: 'Hérault',
    lat: 43.6108,
    lng: 3.8767,
    metaTitle: 'Installation borne de recharge Montpellier — IRVE certifié P1-P2-P3',
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Montpellier et dans la métropole (34). Electricien certifié IRVE P1-P2-P3. Devis gratuit sous 24h.",
    intro:
      "AFFRA Réseaux intervient à Montpellier et dans toute la métropole pour l'installation de bornes de recharge IRVE. Que vous soyez dans le centre-ville, à Port-Marianne, à La Paillade ou dans les communes périphériques, nos techniciens certifiés P1-P2-P3 assurent une installation conforme à la norme NF C 15-100 et aux exigences du programme Advenir.",
    quartiers: [
      'Centre historique',
      'Port-Marianne',
      'Antigone',
      'La Paillade',
      'Montpellier Sud',
      'Castelnau-le-Lez',
      'Lattes',
      'Pérols',
    ],
    faqItems: [
      {
        question: "Combien coûte l'installation d'une borne de recharge à Montpellier ?",
        answer:
          "Le coût varie de 500 € à 2 000 € selon la configuration électrique et la puissance choisie (7,4 kW ou 22 kW). Des aides nationales (programme Advenir) peuvent couvrir jusqu'à 50 % du montant pour les particuliers en copropriété. Demandez votre devis gratuit pour une estimation précise.",
      },
      {
        question: "Intervenez-vous dans toute la métropole montpelliéraine ?",
        answer:
          "Oui, nous couvrons Montpellier et toutes les communes de la Métropole : Lattes, Pérols, Castelnau-le-Lez, Jacou, Vendargues, Clapiers, Grabels et les villages environnants.",
      },
      {
        question: "Quel délai pour une installation à Montpellier ?",
        answer:
          "En général, nous intervenons sous 5 à 15 jours ouvrés après validation du devis. Pour les urgences professionnelles (panne, mise en service flotte), nous proposons des créneaux prioritaires.",
      },
    ],
  },
  {
    slug: 'beziers',
    nom: 'Béziers',
    departement: '34',
    nomDept: 'Hérault',
    lat: 43.3442,
    lng: 3.2158,
    metaTitle: 'Installation borne de recharge Béziers — Electricien IRVE certifié Hérault',
    metaDescription:
      "Installez votre borne de recharge à Béziers avec AFFRA Réseaux, electricien certifié IRVE en Hérault (34). Particuliers, copropriétés et pros. Devis gratuit.",
    intro:
      "AFFRA Réseaux installe vos bornes de recharge à Béziers et dans l'agglomération biterroise. Electriciens certifiés IRVE, nous intervenons pour tous types de projets : maison individuelle, résidence en copropriété ou parc de stationnement professionnel. Béziers est la deuxième ville de l'Hérault et connaît un fort développement des véhicules électriques — nous y proposons une offre complète, de l'étude jusqu'à la mise en service.",
    quartiers: ['Centre-ville', 'La Devèze', 'Le Plateau', 'Saint-Jacques', 'Agde', 'Pézenas', 'Valras-Plage'],
    faqItems: [
      {
        question: "Proposez-vous une installation de borne en copropriété à Béziers ?",
        answer:
          "Oui, nous accompagnons les syndics et copropriétaires de Béziers dans leurs démarches 'droit à la prise' : étude de faisabilité technique, préparation du dossier pour le vote en AG, installation et mise en service certifiée.",
      },
      {
        question: "Couvrez-vous Agde, Pézenas et les communes autour de Béziers ?",
        answer:
          "Nous intervenons sur Béziers et tout le bassin biterrois : Agde, Pézenas, Servian, Murviel-lès-Béziers, Valras-Plage, Portiragnes, Montblanc et les villages environnants.",
      },
    ],
  },
  {
    slug: 'sete',
    nom: 'Sète',
    departement: '34',
    nomDept: 'Hérault',
    lat: 43.4026,
    lng: 3.6965,
    metaTitle: "Installation borne de recharge Sète — IRVE certifié Hérault (34)",
    metaDescription:
      "Besoin d'une borne de recharge à Sète ? AFFRA Réseaux, electricien certifié IRVE en Hérault, installe votre wallbox sur l'île singulière. Devis gratuit.",
    intro:
      "Besoin d'une borne de recharge à Sète, sur l'île singulière ? AFFRA Réseaux, electricien certifié IRVE en Hérault (34), installe votre wallbox ou borne rapide à Sète et dans le bassin de Thau. Résidences de front de mer, copropriétés en bord d'étang ou commerces du port : nos techniciens tiennent compte des contraintes spécifiques de l'environnement côtier pour choisir le matériel le plus adapté.",
    quartiers: ['Centre-ville', 'La Corniche', 'Les Pierres Blanches', 'Marseillan', 'Mèze', 'Frontignan'],
    faqItems: [
      {
        question: "Peut-on installer une borne de recharge dans une résidence en bord de mer à Sète ?",
        answer:
          "Oui, même dans des résidences avec contraintes techniques spécifiques (humidité, corrosion saline, tableaux anciens), nous proposons des solutions adaptées. Une visite technique préalable, incluse dans notre devis, permet de sélectionner le bon matériel.",
      },
      {
        question: "Couvrez-vous Marseillan, Frontignan et le pourtour de l'étang de Thau ?",
        answer:
          "Oui, nous couvrons tout le bassin de Thau : Sète, Marseillan, Frontignan, Vic-la-Gardiole, Mèze, Bouzigues et les communes riveraines de l'étang.",
      },
    ],
  },
  {
    slug: 'lunel',
    nom: 'Lunel',
    departement: '34',
    nomDept: 'Hérault',
    lat: 43.6741,
    lng: 4.1329,
    metaTitle: "Installation borne de recharge Lunel — AFFRA Réseaux IRVE Hérault",
    metaDescription:
      "AFFRA Réseaux assure l'installation de bornes de recharge IRVE à Lunel et dans le Lunellois (34). Devis gratuit pour particuliers et professionnels.",
    intro:
      "AFFRA Réseaux assure l'installation de bornes de recharge IRVE à Lunel et dans le Lunellois. Situé à la frontière du Gard et de l'Hérault, Lunel bénéficie d'une position idéale sur l'axe Montpellier-Nîmes. Notre siège étant à Nîmes, nous intervenons dans les délais les plus courts pour les particuliers et les entreprises du Lunellois.",
    quartiers: ['Centre-ville', 'Saint-Just', 'Lunel-Viel', 'Marsillargues', 'Saint-Christol', 'Aimargues'],
    faqItems: [
      {
        question: "Intervenez-vous en urgence à Lunel ?",
        answer:
          "Pour les professionnels, nous proposons des créneaux prioritaires. Pour les particuliers, le délai habituel est de 5 à 10 jours ouvrés après acceptation du devis.",
      },
      {
        question: "Couvrez-vous les communes autour de Lunel comme Aimargues et Marsillargues ?",
        answer:
          "Oui, nous intervenons sur tout le Lunellois : Lunel, Lunel-Viel, Marsillargues, Aimargues, Saint-Just et les communes voisines à la frontière Hérault-Gard.",
      },
    ],
  },
  {
    slug: 'ganges',
    nom: 'Ganges',
    departement: '34',
    nomDept: 'Hérault',
    lat: 43.934,
    lng: 3.7066,
    metaTitle: "Installation borne de recharge Ganges — IRVE Hérault (34)",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Ganges et dans les Cévennes héraultaises (34). Electricien certifié IRVE. Devis gratuit sous 24h.",
    intro:
      "AFFRA Réseaux intervient à Ganges et dans les Cévennes héraultaises pour l'installation de bornes de recharge IRVE. Dans ce territoire de piémont en plein essor de la mobilité électrique, nous accompagnons les propriétaires et professionnels dans le choix d'une solution adaptée à leur installation électrique parfois ancienne. L'accès au réseau BT en zone semi-rurale ne pose aucun problème à nos équipes habituées aux configurations atypiques.",
    quartiers: ['Ganges centre', 'Saint-Bauzille-de-Putois', 'Sumène', 'Le Vigan', 'Saint-Martin-de-Londres'],
    faqItems: [
      {
        question: "Intervenez-vous dans les zones rurales et de montagne comme Ganges ?",
        answer:
          "Oui, nous couvrons l'ensemble de l'Hérault y compris les communes rurales et de piémont. Un éventuel surcoût de déplacement est clairement indiqué dans votre devis, sans surprise.",
      },
      {
        question: "Mon installation électrique est ancienne, puis-je quand même installer une borne ?",
        answer:
          "Oui, mais une mise à niveau peut être nécessaire. Nous réalisons un diagnostic complet de votre tableau électrique lors de la visite technique préalable, et vous proposons si besoin une mise aux normes transparente et chiffrée.",
      },
    ],
  },
  // ── Gard (30) ────────────────────────────────────────────────────────────────
  {
    slug: 'nimes',
    nom: 'Nîmes',
    departement: '30',
    nomDept: 'Gard',
    lat: 43.8367,
    lng: 4.3601,
    metaTitle: "Installation borne de recharge Nîmes — IRVE certifié P1-P2-P3 Gard",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Nîmes et dans le Gard (30). Electricien certifié IRVE. Particuliers, copropriétés, entreprises. Devis gratuit.",
    intro:
      "AFFRA Réseaux, basé à Nîmes, est votre installateur IRVE de proximité dans le Gard. Nous réalisons l'installation de bornes de recharge pour particuliers, copropriétés et professionnels dans tous les quartiers de Nîmes ainsi que dans les communes du Grand Nîmes Métropole. Nos techniciens certifiés P1-P2-P3 interviennent rapidement — généralement sous 5 jours ouvrés — et garantissent une installation 100 % conforme à la réglementation IRVE.",
    quartiers: [
      'Centre-ville',
      'Mas de Mingue',
      'Pissevin',
      'Valdegour',
      'Nîmes-Ouest',
      'Courbessac',
      'Marguerittes',
      'Caveirac',
      'Milhaud',
    ],
    faqItems: [
      {
        question: "Quelle borne de recharge choisir pour une maison à Nîmes ?",
        answer:
          "Pour une maison individuelle, une wallbox 7,4 kW ou 11 kW est idéale. AFFRA Réseaux vous accompagne dans le choix : nous étudions votre installation électrique existante et recommandons la puissance optimale selon votre véhicule et vos usages quotidiens.",
      },
      {
        question: "Pouvez-vous installer une borne en copropriété à Nîmes ?",
        answer:
          "Oui, c'est l'une de nos spécialités. Nous gérons l'ensemble de la démarche : audit de faisabilité, préparation du dossier pour le vote en AG, installation et raccordement certifié. Le dispositif 'droit à la prise' vous garantit cette possibilité légalement.",
      },
      {
        question: "Êtes-vous éligibles aux aides Advenir à Nîmes ?",
        answer:
          "Oui, AFFRA Réseaux est inscrit au programme Advenir. En tant qu'operateur certifié IRVE, nous vous aidons à constituer votre dossier d'aide qui peut couvrir jusqu'à 50 % du coût pour les particuliers en copropriété.",
      },
    ],
  },
  {
    slug: 'ales',
    nom: 'Alès',
    departement: '30',
    nomDept: 'Gard',
    lat: 44.1259,
    lng: 4.0817,
    metaTitle: "Installation borne de recharge Alès — Electricien IRVE Gard (30)",
    metaDescription:
      "Installateur IRVE certifié à Alès et dans les Cévennes gardoises. AFFRA Réseaux installe votre borne de recharge. Particuliers et pros. Devis gratuit.",
    intro:
      "Installateur IRVE certifié à Alès et dans les Cévennes gardoises, AFFRA Réseaux réalise vos projets d'installation de bornes de recharge électrique. Alès, deuxième pôle urbain du Gard, connaît une adoption croissante des véhicules électriques. Nous intervenons pour les particuliers, copropriétés et entreprises d'Alès Agglomération, avec des solutions adaptées aux besoins spécifiques des territoires cévenols — souvent avec des installations électriques nécessitant une mise à niveau avant pose de la borne.",
    quartiers: ['Centre-ville', 'Tamaris', 'Les Près-Saint-Jean', 'La Grand-Combe', 'Saint-Ambroix', 'Saint-Christol-lez-Alès'],
    faqItems: [
      {
        question: "Intervenez-vous sur Alès Agglomération et les Cévennes gardoises ?",
        answer:
          "Oui, nous couvrons Alès et toute son agglomération : Saint-Christol-lez-Alès, Saint-Hilaire-de-Brethmas, Bagard, Vézénobres, La Grand-Combe, Saint-Ambroix et les communes cévenoles avoisinantes.",
      },
      {
        question: "Ma maison est ancienne, puis-je tout de même installer une borne à Alès ?",
        answer:
          "Oui. Nos techniciens réalisent systématiquement un bilan de votre installation électrique avant pose. Si un renforcement du tableau est nécessaire, nous l'incluons dans le devis global pour un tarif transparent.",
      },
    ],
  },
  {
    slug: 'sommieres',
    nom: 'Sommières',
    departement: '30',
    nomDept: 'Gard',
    lat: 43.7799,
    lng: 4.0893,
    metaTitle: "Installation borne de recharge Sommières — IRVE Gard (30)",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Sommières et dans le Vidourle gardois (30). Electricien certifié IRVE. Devis gratuit.",
    intro:
      "AFFRA Réseaux intervient à Sommières et dans le bassin du Vidourle pour l'installation de bornes de recharge IRVE. Commune médiévale à mi-chemin entre Nîmes et Montpellier, Sommières attire de nombreux résidents travaillant dans les deux métropoles — un profil idéal pour la recharge à domicile nocturne. Particuliers en maison de village ou en lotissement récent, nous avons la solution adaptée.",
    quartiers: ['Sommières centre', 'Calvisson', 'Villevieille', 'Lecques', 'Aspères', 'Aubais'],
    faqItems: [
      {
        question: "Intervenez-vous sur Sommières et les villages du Vidourle gardois ?",
        answer:
          "Oui, nous couvrons Sommières et le Pays du Vidourle : Calvisson, Aubais, Villevieille, Salinelles, Aspères, Saint-Dionisy et les communes de la vallée.",
      },
    ],
  },
  {
    slug: 'uzes',
    nom: 'Uzès',
    departement: '30',
    nomDept: 'Gard',
    lat: 44.0134,
    lng: 4.4204,
    metaTitle: "Installation borne de recharge Uzès — AFFRA Réseaux IRVE Gard",
    metaDescription:
      "Installez votre borne de recharge à Uzès avec AFFRA Réseaux, electricien certifié IRVE dans le Gard (30). Devis gratuit pour particuliers et entreprises.",
    intro:
      "AFFRA Réseaux intervient à Uzès et dans le pays d'Uzès pour l'installation de bornes de recharge IRVE. Cité ducale réputée pour son patrimoine, Uzès accueille une population aisée très tôt adoptante des véhicules électriques haut de gamme. Maisons de caractère avec tableaux anciens, mas gardois avec longues allées d'entrée ou résidences récentes : nos techniciens adaptent chaque installation à la configuration du lieu.",
    quartiers: ["Uzès centre", "Arpaillargues-et-Aureillac", "Saint-Quentin-la-Poterie", "Bagnols-sur-Cèze", "Remoulins"],
    faqItems: [
      {
        question: "Peut-on installer une borne dans une maison de caractère ou un mas à Uzès ?",
        answer:
          "Oui, c'est même une configuration courante dans le pays d'Uzès. Nos techniciens évaluent la longueur de tirage de câble nécessaire et l'état du tableau pour recommander la solution optimale — parfois avec une goulotte extérieure discrète ou un tirage en dalle.",
      },
      {
        question: "Couvrez-vous Bagnols-sur-Cèze et le nord du Gard ?",
        answer:
          "Oui, nous intervenons sur le nord-est du Gard : Uzès, Bagnols-sur-Cèze, Pont-Saint-Esprit, Saint-Gilles, Remoulins et les communes de la vallée du Rhône et du Gardon.",
      },
    ],
  },
  {
    slug: 'vauvert',
    nom: 'Vauvert',
    departement: '30',
    nomDept: 'Gard',
    lat: 43.6937,
    lng: 4.2753,
    metaTitle: "Installation borne de recharge Vauvert — IRVE Gard (30)",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Vauvert et en Petite Camargue gardoise (30). Electricien certifié IRVE. Devis gratuit.",
    intro:
      "AFFRA Réseaux intervient à Vauvert et dans toute la Petite Camargue gardoise pour l'installation de bornes de recharge IRVE. Entre Nîmes et la mer, ce territoire de plaine concentre de nombreuses maisons individuelles récentes avec garage — la configuration idéale pour une wallbox murale. Nous accompagnons particuliers, agriculteurs et professionnels du secteur depuis notre siège nîmois, à moins de 30 km.",
    quartiers: ['Vauvert centre', 'Gallician', 'Montcalm', 'Aimargues', 'Vergèze', 'Codognan'],
    faqItems: [
      {
        question: "Couvrez-vous Aimargues, Vergèze et la zone entre Nîmes et la mer ?",
        answer:
          "Oui, nous intervenons sur tout ce secteur : Vauvert, Aimargues, Vergèze, Codognan, Gallargues-le-Montueux, Milhaud et les communes de la Petite Camargue gardoise.",
      },
    ],
  },
  {
    slug: 'beaucaire',
    nom: 'Beaucaire',
    departement: '30',
    nomDept: 'Gard',
    lat: 43.8067,
    lng: 4.6406,
    metaTitle: "Installation borne de recharge Beaucaire — Electricien IRVE Gard",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Beaucaire et sur les rives du Rhône (30). Electricien certifié IRVE. Devis gratuit.",
    intro:
      "AFFRA Réseaux intervient à Beaucaire et sur les rives gardoises du Rhône pour l'installation de bornes de recharge IRVE. Entre Nîmes et Arles, Beaucaire est un pôle économique actif avec une zone industrielle en croissance et de nombreux particuliers équipés de véhicules électriques. Nous répondons à la fois aux besoins résidentiels du centre-ville et aux projets de recharge de flotte pour les entreprises de la zone.",
    quartiers: ['Beaucaire centre', 'Zone industrielle', 'Bellegarde', 'Jonquières-Saint-Vincent', 'Comps'],
    faqItems: [
      {
        question: "Intervenez-vous sur la zone industrielle de Beaucaire pour des bornes de flotte ?",
        answer:
          "Oui, nous réalisons des installations de bornes de recharge pour flottes d'entreprise sur la zone industrielle de Beaucaire. De 1 à 20 bornes, nous dimensionnons le projet selon vos besoins et contraintes de réseau.",
      },
      {
        question: "Couvrez-vous aussi Tarascon de l'autre côté du Rhône ?",
        answer:
          "Tarascon est en Bouches-du-Rhône (13), mais nous y intervenons régulièrement depuis Beaucaire. Aucun problème pour couvrir les deux rives du Rhône.",
      },
    ],
  },
  {
    slug: 'le-grau-du-roi',
    nom: 'Le Grau-du-Roi',
    departement: '30',
    nomDept: 'Gard',
    lat: 43.5363,
    lng: 4.1335,
    metaTitle: "Installation borne de recharge Le Grau-du-Roi — IRVE Gard (30)",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge au Grau-du-Roi et à Port-Camargue (30). Electricien certifié IRVE. Devis gratuit.",
    intro:
      "AFFRA Réseaux intervient au Grau-du-Roi, à Port-Camargue et sur le littoral gardois pour l'installation de bornes de recharge IRVE. Station balnéaire prisée, la commune compte de nombreuses résidences secondaires et copropriétés en front de mer. Nous proposons des solutions adaptées à l'environnement marin : matériel résistant à la corrosion saline, câblage protégé contre l'humidité, mise en service certifiée IRVE.",
    quartiers: ["Le Grau-du-Roi centre", "Port-Camargue", "L'Espiguette", "Aigues-Mortes", "Saint-Laurent-d'Aigouze"],
    faqItems: [
      {
        question: "Peut-on installer une borne dans une résidence secondaire au bord de mer au Grau-du-Roi ?",
        answer:
          "Oui, et c'est même de plus en plus courant. Nous prenons en compte les contraintes spécifiques de l'environnement marin dans le choix du matériel et du mode de pose pour garantir la durabilité de l'installation.",
      },
      {
        question: "Couvrez-vous Aigues-Mortes et les villages de la Camargue gardoise ?",
        answer:
          "Oui, nous intervenons sur l'ensemble du littoral gardois : Le Grau-du-Roi, Port-Camargue, Aigues-Mortes, Saint-Laurent-d'Aigouze et les communes de la Camargue.",
      },
    ],
  },
  {
    slug: 'saint-gilles',
    nom: 'Saint-Gilles',
    departement: '30',
    nomDept: 'Gard',
    lat: 43.6769,
    lng: 4.4311,
    metaTitle: "Installation borne de recharge Saint-Gilles — IRVE Gard (30)",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Saint-Gilles et en Petite Camargue gardoise (30). Electricien certifié IRVE. Devis gratuit.",
    intro:
      "AFFRA Réseaux intervient à Saint-Gilles et dans la plaine gardoise pour l'installation de bornes de recharge IRVE. Ville historique aux portes de la Camargue, Saint-Gilles est entourée d'exploitations agricoles et de complexes touristiques qui multiplient les projets de recharge pour leur flotte ou leurs visiteurs. Nous proposons des solutions pour toutes les configurations : maison individuelle avec garage, gîte rural, parking de camping ou exploitation rizicole.",
    quartiers: ['Saint-Gilles centre', 'Gallician', 'Franquevaux', 'Vauvert', 'Aimargues'],
    faqItems: [
      {
        question: "Proposez-vous des bornes pour les gîtes et hébergements touristiques à Saint-Gilles ?",
        answer:
          "Oui, c'est un besoin croissant. Nous installons des bornes de type T2 ou T3 pour les hébergements souhaitant attirer les voyageurs en véhicule électrique. Une borne de recharge est désormais un critère de choix pour de nombreux touristes.",
      },
    ],
  },
  {
    slug: 'remoulins',
    nom: 'Remoulins',
    departement: '30',
    nomDept: 'Gard',
    lat: 43.9373,
    lng: 4.5607,
    metaTitle: "Installation borne de recharge Remoulins — IRVE secteur Pont-du-Gard",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Remoulins et dans le secteur Pont-du-Gard (30). Electricien certifié IRVE. Devis gratuit.",
    intro:
      "AFFRA Réseaux intervient à Remoulins et dans le secteur du Pont-du-Gard pour l'installation de bornes de recharge IRVE. À mi-chemin entre Nîmes et Avignon sur l'axe A9, Remoulins attire un tourisme de passage important et de nombreux résidents travaillant à Nîmes ou Avignon. Nous intervenons pour les particuliers du secteur, les hôtels et auberges du territoire, et les entreprises de la zone d'activité.",
    quartiers: ['Remoulins centre', 'Vers-Pont-du-Gard', 'Castillon-du-Gard', 'Collias', 'Poulx'],
    faqItems: [
      {
        question: "Couvrez-vous tout le secteur du Pont-du-Gard ?",
        answer:
          "Oui, nous intervenons sur Remoulins, Vers-Pont-du-Gard, Castillon-du-Gard, Collias, Poulx et tous les villages du secteur entre Nîmes et Uzès.",
      },
    ],
  },
  {
    slug: 'garons',
    nom: 'Garons',
    departement: '30',
    nomDept: 'Gard',
    lat: 43.7605,
    lng: 4.4186,
    metaTitle: "Installation borne de recharge Garons — IRVE Gard (30)",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Garons, à 10 min de Nîmes (30). Electricien certifié IRVE P1-P2-P3. Devis gratuit.",
    intro:
      "AFFRA Réseaux intervient à Garons, commune péri-urbaine au sud de Nîmes, pour l'installation de bornes de recharge IRVE. Zone pavillonnaire en fort développement et zone d'activité aéroportuaire : nous répondons aux besoins des particuliers en maison individuelle et des entreprises installées autour de l'aéroport Nîmes-Alès-Camargue-Cévennes. Notre siège nîmois nous permet d'intervenir à Garons sous 48h.",
    quartiers: ['Garons centre', 'Zone Aéroport', 'Milhaud', 'Caveirac', 'Bernis'],
    faqItems: [
      {
        question: "Intervenez-vous aussi sur Milhaud, Caveirac et les communes proches de Nîmes-sud ?",
        answer:
          "Oui, le secteur Garons-Milhaud-Caveirac-Bernis est dans notre zone d'intervention prioritaire. Nos délais d'intervention y sont parmi les plus courts (souvent 3 à 7 jours ouvrés).",
      },
    ],
  },
  {
    slug: 'quissac',
    nom: 'Quissac',
    departement: '30',
    nomDept: 'Gard',
    lat: 43.9076,
    lng: 3.9987,
    metaTitle: "Installation borne de recharge Quissac — IRVE Piémont gardois",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Quissac et dans le Piémont gardois (30). Electricien certifié IRVE. Devis gratuit.",
    intro:
      "AFFRA Réseaux intervient à Quissac et dans le Piémont gardois pour l'installation de bornes de recharge IRVE. Ce secteur entre garrigue et Cévennes, apprécié pour son cadre de vie, attire de nombreux propriétaires de véhicules électriques qui souhaitent recharger à domicile. Maisons de village avec cours intérieures ou propriétés rurales avec garage : nous trouvons toujours la solution technique adaptée.",
    quartiers: ['Quissac', 'Sauve', 'Vic-le-Fesq', 'Conqueyrac', 'Corconne'],
    faqItems: [
      {
        question: "Intervenez-vous dans les villages du Piémont gardois comme Sauve et Quissac ?",
        answer:
          "Oui, nous couvrons le Piémont gardois : Quissac, Sauve, Vic-le-Fesq, Conqueyrac, Corconne et les villages entre Nîmes et les Cévennes.",
      },
    ],
  },
  {
    slug: 'vergeze',
    nom: 'Vergèze',
    departement: '30',
    nomDept: 'Gard',
    lat: 43.7213,
    lng: 4.2278,
    metaTitle: "Installation borne de recharge Vergèze — IRVE Gard (30)",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Vergèze et dans la plaine gardoise (30). Electricien certifié IRVE. Devis gratuit.",
    intro:
      "AFFRA Réseaux intervient à Vergèze et dans la plaine gardoise pour l'installation de bornes de recharge IRVE. Connue pour sa source Perrier, Vergèze est une commune résidentielle sur l'axe Nîmes-Montpellier, dont la population active profite de la proximité des deux métropoles. Les maisons individuelles récentes avec garage sont nombreuses — une configuration parfaite pour une wallbox 7,4 kW ou 11 kW installée en une demi-journée.",
    quartiers: ['Vergèze centre', 'Codognan', 'Calvisson', 'Gallargues-le-Montueux', 'Aigues-Vives'],
    faqItems: [
      {
        question: "Couvrez-vous Codognan, Calvisson et les communes entre Nîmes et Montpellier ?",
        answer:
          "Oui, tout ce corridor est notre zone d'intervention quotidienne. Vergèze, Codognan, Calvisson, Gallargues-le-Montueux, Aigues-Vives : nous y intervenons régulièrement avec des délais courts.",
      },
    ],
  },
  // ── Bouches-du-Rhône (13) ──────────────────────────────────────────────────
  {
    slug: 'arles',
    nom: 'Arles',
    departement: '13',
    nomDept: 'Bouches-du-Rhône',
    lat: 43.6768,
    lng: 4.6274,
    metaTitle: "Installation borne de recharge Arles — Electricien IRVE certifié (13)",
    metaDescription:
      "AFFRA Réseaux installe vos bornes de recharge à Arles et en Camargue arlésienne (13). Electricien certifié IRVE P1-P2-P3. Devis gratuit sous 24h.",
    intro:
      "AFFRA Réseaux étend son expertise IRVE jusqu'à Arles et en Camargue arlésienne. Première commune de France par sa superficie, Arles présente des besoins très variés : appartements en centre-ville historique, mas camarguais isolés, hôtels touristiques ou exploitations agricoles. Nos équipes interviennent depuis Nîmes (35 km) avec les mêmes délais et garanties que pour nos chantiers gardois.",
    quartiers: ['Centre-ville', 'Trinquetaille', 'Barriol', 'Le Sambuc', 'Saintes-Maries-de-la-Mer', 'Tarascon'],
    faqItems: [
      {
        question: "Intervenez-vous sur Arles sans surcoût depuis Nîmes ?",
        answer:
          "Arles est à 35 km de notre siège à Nîmes. Nous y intervenons régulièrement et sans surcoût de déplacement pour les chantiers de taille standard (1 à 3 bornes). Pour les chantiers plus petits ou très éloignés, un forfait déplacement minimal peut s'appliquer — précisé dans votre devis.",
      },
      {
        question: "Couvrez-vous Saintes-Maries-de-la-Mer et toute la commune d'Arles ?",
        answer:
          "Oui, nous couvrons tout le territoire communal d'Arles (le plus grand de France) y compris Saintes-Maries-de-la-Mer, Le Sambuc, Mas-Thibert et la Camargue. Un éventuel surcoût kilométrique est indiqué dans le devis.",
      },
    ],
  },
]

export const villesSlugMap = Object.fromEntries(villesSeo.map((v) => [v.slug, v]))
