/**
 * Liaison entre les communes affichées sur /zone-intervention et les pages ville.
 *
 * Règle : on relie par `slug` (champ de la table zones). La comparaison par nom normalisé
 * n'est qu'un repli TEMPORAIRE, le temps que le backend expose le slug partout ; chaque repli
 * est signalé par un console.warn pour être corrigé dans le back-office.
 */

/** Zone telle que la page la manipule (API ou liste de secours). */
export interface ZoneLike {
  ville: string
  departement: string
  /** Absent tant que l'API backend n'est pas déployée avec la migration 0008. */
  slug?: string | null
}

/** Ville minimale nécessaire à la liaison. */
export interface LinkableCity {
  slug: string
  name: string
}

/**
 * Normalise un nom de commune pour comparaison (accents, casse, ponctuation).
 *
 * @param value - Nom affiché, ex. « Saint-Geniès-de-Malgoirès ».
 * @returns Forme normalisée, ex. « saint-genies-de-malgoires ».
 */
export function normalizeCityName(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

type Warn = (message: string) => void

/** Messages déjà émis : la page étant dynamique, on évite de répéter le même avertissement à chaque requête. */
const emittedWarnings = new Set<string>()

/**
 * Avertissement par défaut : console.warn, une seule fois par message et par processus.
 *
 * @param message - Message à journaliser.
 */
export function warnOnce(message: string): void {
  if (emittedWarnings.has(message)) return
  emittedWarnings.add(message)
  console.warn(message)
}

/**
 * Construit un résolveur zone → slug de page ville.
 *
 * @param cities - Pages ville existantes.
 * @param warn - Journalisation des replis (warnOnce par défaut, injectable pour les tests).
 * @returns Fonction renvoyant le slug de la page, ou `null` si la zone n'a pas de page.
 */
export function createZoneLinkResolver(
  cities: readonly LinkableCity[],
  warn: Warn = warnOnce,
): (zone: ZoneLike) => string | null {
  const slugs = new Set(cities.map((city) => city.slug))
  const byNormalizedName = new Map(cities.map((city) => [normalizeCityName(city.name), city.slug]))

  return (zone) => {
    if (zone.slug && slugs.has(zone.slug)) return zone.slug

    const fallback = byNormalizedName.get(normalizeCityName(zone.ville))
    if (fallback) {
      warn(
        zone.slug
          ? `[zones] slug « ${zone.slug} » sans page ville pour « ${zone.ville} » : repli sur le nom (${fallback}).`
          : `[zones] zone « ${zone.ville} » sans slug : repli temporaire sur le nom (${fallback}).`,
      )
      return fallback
    }

    warn(`[zones] « ${zone.ville} » (${zone.departement}) n'a pas de page ville : affichée sans lien.`)
    return null
  }
}
