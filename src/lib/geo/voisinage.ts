/** Point géographique en degrés décimaux (WGS 84). */
export interface Coords {
  lat: number
  lng: number
}

/** Élément accompagné de sa distance à un point d'origine. */
export interface WithDistance<T> {
  item: T
  km: number
}

const EARTH_RADIUS_KM = 6371

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180

/**
 * Distance à vol d'oiseau entre deux points (formule de haversine).
 *
 * @param a Premier point.
 * @param b Second point.
 * @returns La distance en kilomètres, non arrondie.
 */
export function distanceKm(a: Coords, b: Coords): number {
  const dLat = toRadians(b.lat - a.lat)
  const dLng = toRadians(b.lng - a.lng)
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)))
}

/**
 * Trie des éléments géolocalisés du plus proche au plus éloigné d'une origine.
 *
 * @param origin Point de référence.
 * @param items Éléments candidats.
 * @param options.limit Nombre maximal d'éléments renvoyés.
 * @param options.maxKm Distance au-delà de laquelle un élément est écarté.
 * @param options.exclude Prédicat pour écarter un élément (par exemple l'origine elle-même).
 * @returns Les éléments retenus avec leur distance en kilomètres.
 */
export function nearest<T extends Coords>(
  origin: Coords,
  items: readonly T[],
  options: { limit?: number; maxKm?: number; exclude?: (item: T) => boolean } = {},
): WithDistance<T>[] {
  const { limit = Infinity, maxKm = Infinity, exclude } = options
  return items
    .filter((item) => !exclude?.(item))
    .map((item) => ({ item, km: distanceKm(origin, item) }))
    .filter(({ km }) => km <= maxKm)
    .sort((a, b) => a.km - b.km)
    .slice(0, limit)
}

/**
 * Arrondit une distance pour l'affichage : au kilomètre en dessous de 10 km, aux 5 km au-delà.
 * Les coordonnées étant celles du centre des communes, une précision plus fine serait trompeuse.
 *
 * @param km Distance brute.
 * @returns La distance arrondie, au minimum 1 km.
 */
export function roundKm(km: number): number {
  if (km < 10) return Math.max(1, Math.round(km))
  return Math.round(km / 5) * 5
}

/** Distance maximale pour présenter un chantier comme « près de » une ville. */
export const CHANTIERS_MAX_KM = 40

/** En dessous de ce seuil, la ville est considérée comme le point de départ lui-même. */
const BASE_RADIUS_KM = 3

export interface Voisinage<V, R> {
  /** Distance arrondie depuis le point de départ des interventions, `null` pour la ville de départ. */
  distanceBaseKm: number | null
  /** Chantiers réalisés à proximité, du plus proche au plus éloigné. */
  chantiers: WithDistance<R>[]
  /** Autres pages villes les plus proches (maillage interne). */
  villesProches: WithDistance<V>[]
}

/**
 * Calcule le contenu local d'une page ville à partir de données réelles : distance depuis
 * l'atelier, chantiers voisins et villes voisines. Chaque page obtient ainsi un contenu propre
 * et vérifiable, au lieu d'un gabarit identique où seul le nom change.
 *
 * @param ville Ville de la page.
 * @param villes Toutes les pages villes.
 * @param realisations Chantiers géolocalisés.
 * @param base Point de départ des interventions.
 * @param options.villesLimit Nombre de villes voisines à proposer.
 * @param options.chantiersLimit Nombre de chantiers à afficher.
 * @returns Le voisinage de la ville.
 */
export function buildVoisinage<V extends Coords & { slug: string }, R extends Coords>(
  ville: V,
  villes: readonly V[],
  realisations: readonly R[],
  base: Coords,
  options: { villesLimit?: number; chantiersLimit?: number } = {},
): Voisinage<V, R> {
  const { villesLimit = 4, chantiersLimit = 3 } = options
  const fromBase = distanceKm(base, ville)

  return {
    distanceBaseKm: fromBase < BASE_RADIUS_KM ? null : roundKm(fromBase),
    chantiers: nearest(ville, realisations, { maxKm: CHANTIERS_MAX_KM, limit: chantiersLimit }),
    villesProches: nearest(ville, villes, { exclude: (v) => v.slug === ville.slug, limit: villesLimit }),
  }
}
