import type { DisplayReview } from '@/types/review'

/**
 * Avis Google authentiques, repris à l'identique du cahier des charges (modification 10).
 * Affichés uniquement lorsque l'API Google Places est indisponible (clé absente, quota,
 * panne) ou renvoie moins d'avis exploitables que nécessaire.
 * Ne jamais reformuler ces textes ni ajouter de note moyenne.
 */
export const VERIFIED_GOOGLE_REVIEWS: readonly DisplayReview[] = [
  {
    id: 'verified-marc-mercier',
    author: 'Marc Mercier',
    rating: 5,
    text: 'Très satisfait de l’installation de la borne électrique. Travail soigné, ponctuels, à l’écoute du Client et efficaces. Rien à redire. Je recommande',
  },
  {
    id: 'verified-louis-grandgerard',
    author: 'Louis Grandgerard',
    rating: 5,
    text: 'Équipe au top, efficace et à l’écoute. Travail soigné, explications claires et installation impeccable. Je recommande cette entreprise sans hésitation !',
  },
  {
    id: 'verified-caroline-selosse',
    author: 'Caroline Selosse',
    rating: 5,
    text: 'Très réactif, compétent, à l’écoute de nos besoins et envies. Une équipe de pro au top, soucieux du travail bien fait. On recommande les yeux fermés !',
  },
]
