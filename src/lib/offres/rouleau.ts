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
