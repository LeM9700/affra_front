/** Sens de défilement : 1 vers l'offre suivante, -1 vers la précédente. */
export type SensRouleau = 1 | -1

/**
 * Index de l'élément voisin dans un rouleau qui tourne en boucle.
 *
 * @param index Index courant.
 * @param total Nombre d'éléments du rouleau (au moins 1).
 * @param sens 1 pour le suivant, -1 pour le précédent.
 * @returns L'index voisin, ramené dans [0, total[.
 */
export function indexVoisin(index: number, total: number, sens: SensRouleau): number {
  if (total < 1) throw new RangeError('Un rouleau contient au moins un élément.')
  return (((index + sens) % total) + total) % total
}

/**
 * Sens le plus court pour aller d'un index à un autre (clic sur un point de navigation).
 * À distance égale, on tourne vers l'avant, comme le défilement automatique.
 *
 * @param depuis Index affiché.
 * @param vers Index demandé.
 * @param total Nombre d'éléments du rouleau.
 * @returns Le sens dans lequel la nouvelle carte doit arriver.
 */
export function sensVers(depuis: number, vers: number, total: number): SensRouleau {
  const enAvant = (((vers - depuis) % total) + total) % total
  return enAvant <= total - enAvant ? 1 : -1
}

/** Part de la carte à parcourir pour valider un glissement lent. */
export const SEUIL_GLISSE_RATIO = 0.2
/** Vitesse (px/ms) à partir de laquelle un geste court suffit (glissement « lancé »). */
export const SEUIL_VITESSE_PX_MS = 0.45
/** Distance minimale d'un geste lancé, pour ignorer les micro-mouvements. */
export const DISTANCE_MIN_LANCE_PX = 24

/**
 * Décide si un glissement doit changer de carte, et dans quel sens.
 * Glisser vers la gauche (ou vers le haut) affiche l'offre suivante, comme le défilement auto.
 *
 * @param deplacement Déplacement en px le long de l'axe du geste (négatif = gauche / haut).
 * @param taille Taille de la carte le long de cet axe, en px.
 * @param vitesse Vitesse en fin de geste, en px/ms (valeur absolue ou signée).
 * @returns Le sens du changement, ou `null` si la carte doit revenir en place.
 */
export function decisionGlisse(deplacement: number, taille: number, vitesse: number): SensRouleau | null {
  const distance = Math.abs(deplacement)
  const assezLoin = taille > 0 && distance >= taille * SEUIL_GLISSE_RATIO
  const lance = distance >= DISTANCE_MIN_LANCE_PX && Math.abs(vitesse) >= SEUIL_VITESSE_PX_MS
  if (!assezLoin && !lance) return null
  return deplacement < 0 ? 1 : -1
}
