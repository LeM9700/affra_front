/** Avis prêt à l'affichage sur le site (issu de Google, ou du jeu de secours vérifié). */
export interface DisplayReview {
  id: string
  author: string
  /** Note de 1 à 5. */
  rating: number
  /** Texte exact de l'avis, jamais réécrit. */
  text: string
}
