import { REALISATIONS } from './realisations.ts'
import { parseCities, type City, type CityInput } from '../lib/cities/schema.ts'

/**
 * Pages ville /zone-intervention/[slug] : une entrée = une page pré-rendue.
 *
 * Ajouter une ville :
 * 1. ajouter l'entrée ici (slug identique au champ `slug` de la zone côté back-office) ;
 * 2. renseigner 4-5 `nearbyCities` et, si un chantier est à 15 km ou moins, `localProjects` ;
 * 3. `npm test` : le schéma et les références croisées sont vérifiés (et au build).
 */
const CITIES_INPUT: CityInput[] = [
  // ── Hérault (34) ────────────────────────────────────────────────────────────
  {
    slug: 'montpellier',
    name: 'Montpellier',
    department: '34',
    departmentName: 'Hérault',
    postalCode: '34000',
    geo: { latitude: 43.6108, longitude: 3.8767 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge à Montpellier et dans la métropole (34). Entreprise qualifiée IRVE. Devis gratuit sous 24h.',
    intro:
      "AFFRA RESEAUX intervient à Montpellier et dans toute la métropole pour l'installation de bornes de recharge IRVE. Que vous soyez dans le centre-ville, à Port-Marianne, à La Paillade ou dans les communes périphériques, nos techniciens qualifiés IRVE assurent une installation conforme aux normes en vigueur et aux exigences du programme Advenir.",
    coveredAreas: ['Centre historique', 'Port-Marianne', 'Antigone', 'La Paillade', 'Montpellier Sud', 'Castelnau-le-Lez', 'Lattes', 'Pérols'],
    faq: [
      {
        question: "Combien coûte l'installation d'une borne de recharge à Montpellier ?",
        answer:
          "Le coût varie de 500 € à 2 000 € selon la configuration électrique et la puissance choisie (7,4 kW ou 22 kW). Des aides nationales (programme Advenir) peuvent couvrir jusqu'à 50 % du montant pour les particuliers en copropriété. Demandez votre devis gratuit pour une estimation précise.",
      },
      {
        question: 'Intervenez-vous dans toute la métropole montpelliéraine ?',
        answer:
          'Oui, nous couvrons Montpellier et toutes les communes de la Métropole : Lattes, Pérols, Castelnau-le-Lez, Jacou, Vendargues, Clapiers, Grabels et les villages environnants.',
      },
      {
        question: 'Quel délai pour une installation à Montpellier ?',
        answer:
          'En général, nous intervenons sous 5 à 15 jours ouvrés après validation du devis. Pour les urgences professionnelles (panne, mise en service flotte), nous proposons des créneaux prioritaires.',
      },
    ],
    nearbyCities: ['lunel', 'sete', 'sommieres', 'le-grau-du-roi', 'aimargues'],
    localProjects: [],
  },
  {
    slug: 'beziers',
    name: 'Béziers',
    department: '34',
    departmentName: 'Hérault',
    postalCode: '34500',
    geo: { latitude: 43.3442, longitude: 3.2158 },
    metaDescription:
      'Installez votre borne de recharge à Béziers avec AFFRA RESEAUX, électricien IRVE dans l’Hérault (34). Particuliers, copropriétés et pros. Devis gratuit.',
    intro:
      "AFFRA RESEAUX installe vos bornes de recharge à Béziers et dans l'agglomération biterroise. Electriciens certifiés IRVE, nous intervenons pour tous types de projets : maison individuelle, résidence en copropriété ou parc de stationnement professionnel. Béziers est la deuxième ville de l'Hérault et connaît un fort développement des véhicules électriques — nous y proposons une offre complète, de l'étude jusqu'à la mise en service.",
    coveredAreas: ['Centre-ville', 'La Devèze', 'Le Plateau', 'Saint-Jacques', 'Agde', 'Pézenas', 'Valras-Plage'],
    faq: [
      {
        question: 'Proposez-vous une installation de borne en copropriété à Béziers ?',
        answer:
          "Oui, nous accompagnons les syndics et copropriétaires de Béziers dans leurs démarches 'droit à la prise' : étude de faisabilité technique, préparation du dossier pour le vote en AG, installation et mise en service certifiée.",
      },
      {
        question: 'Couvrez-vous Agde, Pézenas et les communes autour de Béziers ?',
        answer:
          'Nous intervenons sur Béziers et tout le bassin biterrois : Agde, Pézenas, Servian, Murviel-lès-Béziers, Valras-Plage, Portiragnes, Montblanc et les villages environnants.',
      },
    ],
    nearbyCities: ['sete', 'montpellier', 'ganges', 'lunel', 'le-grau-du-roi'],
    localProjects: [],
  },
  {
    slug: 'sete',
    name: 'Sète',
    department: '34',
    departmentName: 'Hérault',
    postalCode: '34200',
    geo: { latitude: 43.4026, longitude: 3.6965 },
    metaDescription:
      "Besoin d'une borne de recharge à Sète ? AFFRA RESEAUX, electricien certifié IRVE en Hérault, installe votre wallbox sur l'île singulière. Devis gratuit.",
    intro:
      "Besoin d'une borne de recharge à Sète, sur l'île singulière ? AFFRA RESEAUX, electricien certifié IRVE en Hérault (34), installe votre wallbox ou borne rapide à Sète et dans le bassin de Thau. Résidences de front de mer, copropriétés en bord d'étang ou commerces du port : nos techniciens tiennent compte des contraintes spécifiques de l'environnement côtier pour choisir le matériel le plus adapté.",
    coveredAreas: ['Centre-ville', 'La Corniche', 'Les Pierres Blanches', 'Marseillan', 'Mèze', 'Frontignan'],
    faq: [
      {
        question: 'Peut-on installer une borne de recharge dans une résidence en bord de mer à Sète ?',
        answer:
          'Oui, même dans des résidences avec contraintes techniques spécifiques (humidité, corrosion saline, tableaux anciens), nous proposons des solutions adaptées. Une visite technique préalable, incluse dans notre devis, permet de sélectionner le bon matériel.',
      },
      {
        question: "Couvrez-vous Marseillan, Frontignan et le pourtour de l'étang de Thau ?",
        answer:
          "Oui, nous couvrons tout le bassin de Thau : Sète, Marseillan, Frontignan, Vic-la-Gardiole, Mèze, Bouzigues et les communes riveraines de l'étang.",
      },
    ],
    nearbyCities: ['montpellier', 'beziers', 'le-grau-du-roi', 'lunel', 'aimargues'],
    localProjects: [],
  },
  {
    slug: 'lunel',
    name: 'Lunel',
    department: '34',
    departmentName: 'Hérault',
    postalCode: '34400',
    geo: { latitude: 43.6741, longitude: 4.1329 },
    metaDescription:
      "AFFRA RESEAUX assure l'installation de bornes de recharge IRVE à Lunel et dans le Lunellois (34). Devis gratuit pour particuliers et professionnels.",
    intro:
      "AFFRA RESEAUX assure l'installation de bornes de recharge IRVE à Lunel et dans le Lunellois. Situé à la frontière du Gard et de l'Hérault, Lunel bénéficie d'une position idéale sur l'axe Montpellier-Nîmes. Notre siège étant à Nîmes, nous intervenons dans les délais les plus courts pour les particuliers et les entreprises du Lunellois.",
    coveredAreas: ['Centre-ville', 'Saint-Just', 'Lunel-Viel', 'Marsillargues', 'Saint-Christol', 'Aimargues'],
    faq: [
      {
        question: 'Intervenez-vous en urgence à Lunel ?',
        answer:
          'Pour les professionnels, nous proposons des créneaux prioritaires. Pour les particuliers, le délai habituel est de 5 à 10 jours ouvrés après acceptation du devis.',
      },
      {
        question: 'Couvrez-vous les communes autour de Lunel comme Aimargues et Marsillargues ?',
        answer:
          'Oui, nous intervenons sur tout le Lunellois : Lunel, Lunel-Viel, Marsillargues, Aimargues, Saint-Just et les communes voisines à la frontière Hérault-Gard.',
      },
    ],
    nearbyCities: ['aimargues', 'vergeze', 'sommieres', 'vauvert', 'le-grau-du-roi'],
    localProjects: ['aigues-vives', 'vauvert'],
  },
  {
    slug: 'ganges',
    name: 'Ganges',
    department: '34',
    departmentName: 'Hérault',
    postalCode: '34190',
    geo: { latitude: 43.934, longitude: 3.7066 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge à Ganges et dans les Cévennes héraultaises (34). Electricien certifié IRVE. Devis gratuit sous 24h.',
    intro:
      "AFFRA RESEAUX intervient à Ganges et dans les Cévennes héraultaises pour l'installation de bornes de recharge IRVE. Dans ce territoire de piémont en plein essor de la mobilité électrique, nous accompagnons les propriétaires et professionnels dans le choix d'une solution adaptée à leur installation électrique parfois ancienne. L'accès au réseau BT en zone semi-rurale ne pose aucun problème à nos équipes habituées aux configurations atypiques.",
    coveredAreas: ['Ganges centre', 'Saint-Bauzille-de-Putois', 'Sumène', 'Le Vigan', 'Saint-Martin-de-Londres'],
    faq: [
      {
        question: 'Intervenez-vous dans les zones rurales et de montagne comme Ganges ?',
        answer:
          "Oui, nous couvrons l'ensemble de l'Hérault y compris les communes rurales et de piémont. Un éventuel surcoût de déplacement est clairement indiqué dans votre devis, sans surprise.",
      },
      {
        question: 'Mon installation électrique est ancienne, puis-je quand même installer une borne ?',
        answer:
          'Oui, mais une mise à niveau peut être nécessaire. Nous réalisons un diagnostic complet de votre tableau électrique lors de la visite technique préalable, et vous proposons si besoin une mise aux normes transparente et chiffrée.',
      },
    ],
    nearbyCities: ['quissac', 'sommieres', 'ales', 'montpellier', 'saint-genies-de-malgoires'],
    localProjects: [],
  },
  // ── Gard (30) ────────────────────────────────────────────────────────────
  {
    slug: 'nimes',
    name: 'Nîmes',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30000',
    geo: { latitude: 43.8367, longitude: 4.3601 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge à Nîmes et dans le Gard (30). Électricien IRVE. Particuliers, copropriétés, entreprises. Devis gratuit.',
    intro:
      "AFFRA RESEAUX, basé à Nîmes, est votre installateur IRVE de proximité dans le Gard. Nous réalisons l'installation de bornes de recharge pour particuliers, copropriétés et professionnels dans tous les quartiers de Nîmes ainsi que dans les communes du Grand Nîmes Métropole. Nos techniciens qualifiés IRVE interviennent rapidement — généralement sous 5 jours ouvrés — et garantissent une installation 100 % conforme à la réglementation IRVE.",
    coveredAreas: ['Centre-ville', 'Mas de Mingue', 'Pissevin', 'Valdegour', 'Nîmes-Ouest', 'Courbessac', 'Marguerittes', 'Caveirac', 'Milhaud'],
    faq: [
      {
        question: 'Quelle borne de recharge choisir pour une maison à Nîmes ?',
        answer:
          'Pour une maison individuelle, une wallbox 7,4 kW ou 11 kW est idéale. AFFRA RESEAUX vous accompagne dans le choix : nous étudions votre installation électrique existante et recommandons la puissance optimale selon votre véhicule et vos usages quotidiens.',
      },
      {
        question: 'Pouvez-vous installer une borne en copropriété à Nîmes ?',
        answer:
          "Oui, c'est l'une de nos spécialités. Nous gérons l'ensemble de la démarche : audit de faisabilité, préparation du dossier pour le vote en AG, installation et raccordement certifié. Le dispositif 'droit à la prise' vous garantit cette possibilité légalement.",
      },
      {
        question: 'Êtes-vous éligibles aux aides Advenir à Nîmes ?',
        answer:
          "Oui, AFFRA RESEAUX est inscrit au programme Advenir. En tant qu'operateur certifié IRVE, nous vous aidons à constituer votre dossier d'aide qui peut couvrir jusqu'à 50 % du coût pour les particuliers en copropriété.",
      },
    ],
    nearbyCities: ['garons', 'vauvert', 'vergeze', 'saint-genies-de-malgoires', 'saint-gilles'],
    localProjects: [],
  },
  {
    slug: 'ales',
    name: 'Alès',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30100',
    geo: { latitude: 44.1259, longitude: 4.0817 },
    metaDescription:
      'Installateur IRVE certifié à Alès et dans les Cévennes gardoises. AFFRA RESEAUX installe votre borne de recharge. Particuliers et pros. Devis gratuit.',
    intro:
      "Installateur IRVE certifié à Alès et dans les Cévennes gardoises, AFFRA RESEAUX réalise vos projets d'installation de bornes de recharge électrique. Alès, deuxième pôle urbain du Gard, connaît une adoption croissante des véhicules électriques. Nous intervenons pour les particuliers, copropriétés et entreprises d'Alès Agglomération, avec des solutions adaptées aux besoins spécifiques des territoires cévenols — souvent avec des installations électriques nécessitant une mise à niveau avant pose de la borne.",
    coveredAreas: ['Centre-ville', 'Tamaris', 'Les Près-Saint-Jean', 'La Grand-Combe', 'Saint-Ambroix', 'Saint-Christol-lez-Alès'],
    faq: [
      {
        question: 'Intervenez-vous sur Alès Agglomération et les Cévennes gardoises ?',
        answer:
          'Oui, nous couvrons Alès et toute son agglomération : Saint-Christol-lez-Alès, Saint-Hilaire-de-Brethmas, Bagard, Vézénobres, La Grand-Combe, Saint-Ambroix et les communes cévenoles avoisinantes.',
      },
      {
        question: 'Ma maison est ancienne, puis-je tout de même installer une borne à Alès ?',
        answer:
          "Oui. Nos techniciens réalisent systématiquement un bilan de votre installation électrique avant pose. Si un renforcement du tableau est nécessaire, nous l'incluons dans le devis global pour un tarif transparent.",
      },
    ],
    nearbyCities: ['saint-genies-de-malgoires', 'quissac', 'uzes', 'ganges', 'nimes'],
    localProjects: [],
  },
  {
    slug: 'sommieres',
    name: 'Sommières',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30250',
    geo: { latitude: 43.7799, longitude: 4.0893 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge à Sommières et dans le Vidourle gardois (30). Electricien certifié IRVE. Devis gratuit.',
    intro:
      "AFFRA RESEAUX intervient à Sommières et dans le bassin du Vidourle pour l'installation de bornes de recharge IRVE. Commune médiévale à mi-chemin entre Nîmes et Montpellier, Sommières attire de nombreux résidents travaillant dans les deux métropoles — un profil idéal pour la recharge à domicile nocturne. Particuliers en maison de village ou en lotissement récent, nous avons la solution adaptée.",
    coveredAreas: ['Sommières centre', 'Calvisson', 'Villevieille', 'Lecques', 'Aspères', 'Aubais'],
    faq: [
      {
        question: 'Intervenez-vous sur Sommières et les villages du Vidourle gardois ?',
        answer:
          'Oui, nous couvrons Sommières et le Pays du Vidourle : Calvisson, Aubais, Villevieille, Salinelles, Aspères, Saint-Dionisy et les communes de la vallée.',
      },
    ],
    nearbyCities: ['lunel', 'vergeze', 'aimargues', 'quissac', 'vauvert'],
    localProjects: ['aigues-vives', 'montmirat'],
  },
  {
    slug: 'uzes',
    name: 'Uzès',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30700',
    geo: { latitude: 44.0134, longitude: 4.4204 },
    metaDescription:
      'Installez votre borne de recharge à Uzès avec AFFRA RESEAUX, electricien certifié IRVE dans le Gard (30). Devis gratuit pour particuliers et entreprises.',
    intro:
      "AFFRA RESEAUX intervient à Uzès et dans le pays d'Uzès pour l'installation de bornes de recharge IRVE. Cité ducale réputée pour son patrimoine, Uzès accueille une population aisée très tôt adoptante des véhicules électriques haut de gamme. Maisons de caractère avec tableaux anciens, mas gardois avec longues allées d'entrée ou résidences récentes : nos techniciens adaptent chaque installation à la configuration du lieu.",
    coveredAreas: ['Uzès centre', 'Arpaillargues-et-Aureillac', 'Saint-Quentin-la-Poterie', 'Bagnols-sur-Cèze', 'Remoulins'],
    faq: [
      {
        question: 'Peut-on installer une borne dans une maison de caractère ou un mas à Uzès ?',
        answer:
          "Oui, c'est même une configuration courante dans le pays d'Uzès. Nos techniciens évaluent la longueur de tirage de câble nécessaire et l'état du tableau pour recommander la solution optimale — parfois avec une goulotte extérieure discrète ou un tirage en dalle.",
      },
      {
        question: 'Couvrez-vous Bagnols-sur-Cèze et le nord du Gard ?',
        answer:
          'Oui, nous intervenons sur le nord-est du Gard : Uzès, Bagnols-sur-Cèze, Pont-Saint-Esprit, Saint-Gilles, Remoulins et les communes de la vallée du Rhône et du Gardon.',
      },
    ],
    nearbyCities: ['remoulins', 'saint-genies-de-malgoires', 'nimes', 'beaucaire', 'ales'],
    localProjects: [],
  },
  {
    slug: 'vauvert',
    name: 'Vauvert',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30600',
    geo: { latitude: 43.6937, longitude: 4.2753 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge à Vauvert et en Petite Camargue gardoise (30). Electricien certifié IRVE. Devis gratuit.',
    intro:
      "AFFRA RESEAUX intervient à Vauvert et dans toute la Petite Camargue gardoise pour l'installation de bornes de recharge IRVE. Entre Nîmes et la mer, ce territoire de plaine concentre de nombreuses maisons individuelles récentes avec garage — la configuration idéale pour une wallbox murale. Nous accompagnons particuliers, agriculteurs et professionnels du secteur depuis notre siège nîmois, à moins de 30 km.",
    coveredAreas: ['Vauvert centre', 'Gallician', 'Montcalm', 'Aimargues', 'Vergèze', 'Codognan'],
    faq: [
      {
        question: 'Couvrez-vous Aimargues, Vergèze et la zone entre Nîmes et la mer ?',
        answer:
          'Oui, nous intervenons sur tout ce secteur : Vauvert, Aimargues, Vergèze, Codognan, Gallargues-le-Montueux, Milhaud et les communes de la Petite Camargue gardoise.',
      },
    ],
    nearbyCities: ['vergeze', 'aimargues', 'lunel', 'saint-gilles', 'garons'],
    localProjects: ['vauvert', 'aigues-vives'],
  },
  {
    slug: 'beaucaire',
    name: 'Beaucaire',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30300',
    geo: { latitude: 43.8067, longitude: 4.6406 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge à Beaucaire et sur les rives du Rhône (30). Electricien certifié IRVE. Devis gratuit.',
    intro:
      "AFFRA RESEAUX intervient à Beaucaire et sur les rives gardoises du Rhône pour l'installation de bornes de recharge IRVE. Entre Nîmes et Arles, Beaucaire est un pôle économique actif avec une zone industrielle en croissance et de nombreux particuliers équipés de véhicules électriques. Nous répondons à la fois aux besoins résidentiels du centre-ville et aux projets de recharge de flotte pour les entreprises de la zone.",
    coveredAreas: ['Beaucaire centre', 'Zone industrielle', 'Bellegarde', 'Jonquières-Saint-Vincent', 'Comps'],
    faq: [
      {
        question: 'Intervenez-vous sur la zone industrielle de Beaucaire pour des bornes de flotte ?',
        answer:
          "Oui, nous réalisons des installations de bornes de recharge pour flottes d'entreprise sur la zone industrielle de Beaucaire. De 1 à 20 bornes, nous dimensionnons le projet selon vos besoins et contraintes de réseau.",
      },
      {
        question: "Couvrez-vous aussi Tarascon de l'autre côté du Rhône ?",
        answer:
          'Tarascon est en Bouches-du-Rhône (13), mais nous y intervenons régulièrement depuis Beaucaire. Aucun problème pour couvrir les deux rives du Rhône.',
      },
    ],
    nearbyCities: ['remoulins', 'garons', 'saint-gilles', 'nimes', 'uzes'],
    localProjects: [],
  },
  {
    slug: 'le-grau-du-roi',
    name: 'Le Grau-du-Roi',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30240',
    geo: { latitude: 43.5363, longitude: 4.1335 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge au Grau-du-Roi et à Port-Camargue (30). Electricien certifié IRVE. Devis gratuit.',
    intro:
      "AFFRA RESEAUX intervient au Grau-du-Roi, à Port-Camargue et sur le littoral gardois pour l'installation de bornes de recharge IRVE. Station balnéaire prisée, la commune compte de nombreuses résidences secondaires et copropriétés en front de mer. Nous proposons des solutions adaptées à l'environnement marin : matériel résistant à la corrosion saline, câblage protégé contre l'humidité, mise en service certifiée IRVE.",
    coveredAreas: ['Le Grau-du-Roi centre', 'Port-Camargue', "L'Espiguette", 'Aigues-Mortes', "Saint-Laurent-d'Aigouze"],
    faq: [
      {
        question: 'Peut-on installer une borne dans une résidence secondaire au bord de mer au Grau-du-Roi ?',
        answer:
          "Oui, et c'est même de plus en plus courant. Nous prenons en compte les contraintes spécifiques de l'environnement marin dans le choix du matériel et du mode de pose pour garantir la durabilité de l'installation.",
      },
      {
        question: 'Couvrez-vous Aigues-Mortes et les villages de la Camargue gardoise ?',
        answer:
          "Oui, nous intervenons sur l'ensemble du littoral gardois : Le Grau-du-Roi, Port-Camargue, Aigues-Mortes, Saint-Laurent-d'Aigouze et les communes de la Camargue.",
      },
    ],
    nearbyCities: ['lunel', 'aimargues', 'vauvert', 'montpellier', 'vergeze'],
    localProjects: [],
  },
  {
    slug: 'saint-gilles',
    name: 'Saint-Gilles',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30800',
    geo: { latitude: 43.6769, longitude: 4.4311 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge à Saint-Gilles et en Petite Camargue gardoise (30). Electricien certifié IRVE. Devis gratuit.',
    intro:
      "AFFRA RESEAUX intervient à Saint-Gilles et dans la plaine gardoise pour l'installation de bornes de recharge IRVE. Ville historique aux portes de la Camargue, Saint-Gilles est entourée d'exploitations agricoles et de complexes touristiques qui multiplient les projets de recharge pour leur flotte ou leurs visiteurs. Nous proposons des solutions pour toutes les configurations : maison individuelle avec garage, gîte rural, parking de camping ou exploitation rizicole.",
    coveredAreas: ['Saint-Gilles centre', 'Gallician', 'Franquevaux', 'Vauvert', 'Aimargues'],
    faq: [
      {
        question: 'Proposez-vous des bornes pour les gîtes et hébergements touristiques à Saint-Gilles ?',
        answer:
          "Oui, c'est un besoin croissant. Nous installons des bornes de type T2 ou T3 pour les hébergements souhaitant attirer les voyageurs en véhicule électrique. Une borne de recharge est désormais un critère de choix pour de nombreux touristes.",
      },
    ],
    nearbyCities: ['garons', 'vauvert', 'vergeze', 'aimargues', 'nimes'],
    localProjects: ['vauvert'],
  },
  {
    slug: 'remoulins',
    name: 'Remoulins',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30210',
    geo: { latitude: 43.9373, longitude: 4.5607 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge à Remoulins et dans le secteur Pont-du-Gard (30). Electricien certifié IRVE. Devis gratuit.',
    intro:
      "AFFRA RESEAUX intervient à Remoulins et dans le secteur du Pont-du-Gard pour l'installation de bornes de recharge IRVE. À mi-chemin entre Nîmes et Avignon sur l'axe A9, Remoulins attire un tourisme de passage important et de nombreux résidents travaillant à Nîmes ou Avignon. Nous intervenons pour les particuliers du secteur, les hôtels et auberges du territoire, et les entreprises de la zone d'activité.",
    coveredAreas: ['Remoulins centre', 'Vers-Pont-du-Gard', 'Castillon-du-Gard', 'Collias', 'Poulx'],
    faq: [
      {
        question: 'Couvrez-vous tout le secteur du Pont-du-Gard ?',
        answer:
          'Oui, nous intervenons sur Remoulins, Vers-Pont-du-Gard, Castillon-du-Gard, Collias, Poulx et tous les villages du secteur entre Nîmes et Uzès.',
      },
    ],
    nearbyCities: ['uzes', 'beaucaire', 'nimes', 'garons', 'saint-genies-de-malgoires'],
    localProjects: [],
  },
  {
    slug: 'garons',
    name: 'Garons',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30128',
    geo: { latitude: 43.7605, longitude: 4.4186 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge à Garons, à 10 min de Nîmes (30). Entreprise qualifiée IRVE. Devis gratuit.',
    intro:
      "AFFRA RESEAUX intervient à Garons, commune péri-urbaine au sud de Nîmes, pour l'installation de bornes de recharge IRVE. Zone pavillonnaire en fort développement et zone d'activité aéroportuaire : nous répondons aux besoins des particuliers en maison individuelle et des entreprises installées autour de l'aéroport Nîmes-Alès-Camargue-Cévennes. Notre siège nîmois nous permet d'intervenir à Garons sous 48h.",
    coveredAreas: ['Garons centre', 'Zone Aéroport', 'Milhaud', 'Caveirac', 'Bernis'],
    faq: [
      {
        question: 'Intervenez-vous aussi sur Milhaud, Caveirac et les communes proches de Nîmes-sud ?',
        answer:
          "Oui, le secteur Garons-Milhaud-Caveirac-Bernis est dans notre zone d'intervention prioritaire. Nos délais d'intervention y sont parmi les plus courts (souvent 3 à 7 jours ouvrés).",
      },
    ],
    nearbyCities: ['saint-gilles', 'nimes', 'vauvert', 'vergeze', 'beaucaire'],
    localProjects: ['vauvert'],
  },
  {
    slug: 'quissac',
    name: 'Quissac',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30260',
    geo: { latitude: 43.9076, longitude: 3.9987 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge à Quissac et dans le Piémont gardois (30). Electricien certifié IRVE. Devis gratuit.',
    intro:
      "AFFRA RESEAUX intervient à Quissac et dans le Piémont gardois pour l'installation de bornes de recharge IRVE. Ce secteur entre garrigue et Cévennes, apprécié pour son cadre de vie, attire de nombreux propriétaires de véhicules électriques qui souhaitent recharger à domicile. Maisons de village avec cours intérieures ou propriétés rurales avec garage : nous trouvons toujours la solution technique adaptée.",
    coveredAreas: ['Quissac', 'Sauve', 'Vic-le-Fesq', 'Conqueyrac', 'Corconne'],
    faq: [
      {
        question: 'Intervenez-vous dans les villages du Piémont gardois comme Sauve et Quissac ?',
        answer:
          'Oui, nous couvrons le Piémont gardois : Quissac, Sauve, Vic-le-Fesq, Conqueyrac, Corconne et les villages entre Nîmes et les Cévennes.',
      },
    ],
    nearbyCities: ['sommieres', 'saint-genies-de-malgoires', 'ganges', 'ales', 'lunel'],
    localProjects: ['montmirat'],
  },
  {
    slug: 'vergeze',
    name: 'Vergèze',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30310',
    geo: { latitude: 43.7213, longitude: 4.2278 },
    metaDescription:
      'AFFRA RESEAUX installe vos bornes de recharge à Vergèze et dans la plaine gardoise (30). Electricien certifié IRVE. Devis gratuit.',
    intro:
      "AFFRA RESEAUX intervient à Vergèze et dans la plaine gardoise pour l'installation de bornes de recharge IRVE. Connue pour sa source Perrier, Vergèze est une commune résidentielle sur l'axe Nîmes-Montpellier, dont la population active profite de la proximité des deux métropoles. Les maisons individuelles récentes avec garage sont nombreuses — une configuration parfaite pour une wallbox 7,4 kW ou 11 kW installée en une demi-journée.",
    coveredAreas: ['Vergèze centre', 'Codognan', 'Calvisson', 'Gallargues-le-Montueux', 'Aigues-Vives'],
    faq: [
      {
        question: 'Couvrez-vous Codognan, Calvisson et les communes entre Nîmes et Montpellier ?',
        answer:
          "Oui, tout ce corridor est notre zone d'intervention quotidienne. Vergèze, Codognan, Calvisson, Gallargues-le-Montueux, Aigues-Vives : nous y intervenons régulièrement avec des délais courts.",
      },
    ],
    nearbyCities: ['aimargues', 'vauvert', 'lunel', 'sommieres', 'garons'],
    localProjects: ['aigues-vives', 'vauvert'],
  },
  {
    slug: 'aimargues',
    name: 'Aimargues',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30470',
    geo: { latitude: 43.685, longitude: 4.209 },
    metaDescription:
      'Borne de recharge à Aimargues (30470), en Petite Camargue : installation IRVE pour maisons, mas et pros. Électricien qualifié IRVE, devis gratuit sous 24h.',
    intro:
      "AFFRA RESEAUX installe des bornes de recharge à Aimargues et dans toute la Petite Camargue gardoise. Commune du Gard tournée vers Montpellier autant que vers Nîmes, Aimargues compte de nombreux actifs qui font chaque jour la route vers l'une ou l'autre métropole : une borne à domicile permet de repartir chaque matin batterie pleine. L'habitat y est surtout individuel (maisons avec garage, cour ou mas) : la borne se pose le plus souvent en façade ou sous abri, et la longueur de câble jusqu'au tableau est étudiée dès la visite. Nous avons réalisé une installation du même type à Vauvert, à quelques kilomètres.",
    coveredAreas: ['Aimargues centre', 'Le Cailar', "Saint-Laurent-d'Aigouze", 'Gallargues-le-Montueux', 'Codognan', 'Vergèze'],
    faq: [
      {
        question: 'Quelle puissance de borne choisir pour une maison à Aimargues ?',
        answer:
          "Pour un trajet quotidien vers Montpellier, Nîmes ou Lunel, une borne de 7,4 kW en monophasé suffit dans la grande majorité des cas : elle recharge une batterie entière en une nuit. Si votre maison est raccordée en triphasé, une borne de 22 kW est possible. Nous vérifions votre abonnement et votre tableau électrique lors de la visite technique.",
      },
      {
        question: "Intervenez-vous au Cailar, à Saint-Laurent-d'Aigouze et dans le reste de la Petite Camargue ?",
        answer:
          "Oui, nous couvrons Aimargues et les communes voisines de la Petite Camargue : Le Cailar, Saint-Laurent-d'Aigouze, Gallargues-le-Montueux, Codognan, Vergèze, ainsi que Vauvert et Lunel.",
      },
      {
        question: 'Quel délai pour installer une borne à Aimargues ?',
        answer:
          "Nous intervenons généralement sous 5 à 15 jours ouvrés après validation du devis. La visite technique préalable est gratuite et permet de chiffrer précisément le cheminement du câble.",
      },
    ],
    nearbyCities: ['vergeze', 'vauvert', 'lunel', 'sommieres', 'le-grau-du-roi'],
    localProjects: ['vauvert', 'aigues-vives'],
  },
  {
    slug: 'saint-genies-de-malgoires',
    name: 'Saint-Geniès-de-Malgoirès',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30190',
    geo: { latitude: 43.946, longitude: 4.214 },
    metaDescription:
      'Borne de recharge à Saint-Geniès-de-Malgoirès (30190), entre Nîmes et Alès. Installation IRVE pour maisons et pros, devis gratuit sous 24h.',
    intro:
      "AFFRA RESEAUX installe des bornes de recharge à Saint-Geniès-de-Malgoirès et dans les villages alentour. Rattachée à Nîmes Métropole et située sur l'axe Nîmes – Alès, la commune voit de nombreux habitants faire chaque jour la navette vers l'une ou l'autre ville : un usage idéal pour la recharge à domicile. Entre maisons de village en pierre et quartiers pavillonnaires plus récents, chaque installation demande une étude du cheminement du câble et de la capacité du tableau électrique. Nous avons notamment installé une borne à Montmirat, à une dizaine de kilomètres.",
    coveredAreas: ['Saint-Geniès centre', 'Fons', 'Saint-Mamert-du-Gard', 'Montignargues', 'La Calmette', 'Gajan'],
    faq: [
      {
        question: 'Peut-on installer une borne dans une maison de village en pierre à Saint-Geniès ?',
        answer:
          "Oui. Dans le bâti ancien, la difficulté porte surtout sur le passage du câble (murs épais, absence de gaine) et sur l'emplacement de la borne quand il n'y a pas de garage. Nous proposons un percement propre ou un cheminement en apparent soigné, et une pose en façade si nécessaire.",
      },
      {
        question: 'Intervenez-vous à Fons, Saint-Mamert-du-Gard et La Calmette ?',
        answer:
          "Oui, nous couvrons Saint-Geniès-de-Malgoirès et les communes voisines entre Nîmes et Alès : Fons, Saint-Mamert-du-Gard, Montignargues, Gajan, La Calmette et les villages du secteur.",
      },
      {
        question: 'Quel délai pour une installation à Saint-Geniès-de-Malgoirès ?',
        answer:
          "Comptez en général 5 à 15 jours ouvrés après validation du devis. La visite technique est gratuite et permet de vous remettre un devis ferme.",
      },
    ],
    nearbyCities: ['nimes', 'uzes', 'quissac', 'sommieres', 'ales'],
    localProjects: ['montmirat'],
  },
]

/** Villes validées (schéma zod + références croisées). Une erreur ici fait échouer le build. */
export const cities: readonly City[] = parseCities(
  CITIES_INPUT,
  REALISATIONS.map((r) => r.id),
)

const citiesBySlug = new Map(cities.map((city) => [city.slug, city]))

/**
 * Retourne la ville correspondant à un slug.
 *
 * @param slug - Slug d'URL (/zone-intervention/{slug}).
 * @returns La ville, ou `undefined` si aucune page n'existe pour ce slug.
 */
export function getCityBySlug(slug: string): City | undefined {
  return citiesBySlug.get(slug)
}
