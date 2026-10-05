/**
 * Lecture des signaux d'acquisition (UTM, click IDs Google Ads, referrer, landing page).
 *
 * Aucune classification ici : la source marketing est calculée côté serveur
 * (backend : app/services/attribution_classifier.py, implémentation unique).
 */
import type { TouchSignals } from './types'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const
const CLICK_ID_KEYS = ['gclid', 'gbraid', 'wbraid'] as const
const KEPT_LANDING_PARAMS = new Set<string>([...UTM_KEYS, ...CLICK_ID_KEYS])

/** Le referrer est externe s'il provient d'un autre hôte que le site courant. */
export function externalReferrer(referrer: string, currentHost: string): string | undefined {
  if (!referrer) return undefined
  try {
    const url = new URL(referrer)
    const strip = (h: string) => h.toLowerCase().replace(/^www\./, '')
    if (strip(url.hostname) === strip(currentHost)) return undefined
    // Sans query string : elle peut contenir des données personnelles.
    return `${url.protocol}//${url.hostname}${url.pathname}`
  } catch {
    return referrer.startsWith('android-app://') ? referrer.slice(0, 500) : undefined
  }
}

/** Chemin + paramètres d'attribution uniquement (tout autre paramètre est retiré). */
export function landingPath(location: Pick<Location, 'pathname' | 'search'>): string {
  const params = new URLSearchParams(location.search)
  const kept = new URLSearchParams()
  params.forEach((value, key) => {
    if (KEPT_LANDING_PARAMS.has(key)) kept.set(key, value.slice(0, 150))
  })
  const query = kept.toString()
  return query ? `${location.pathname}?${query}` : location.pathname
}

export function readTouchSignals(
  location: Pick<Location, 'pathname' | 'search' | 'host' | 'hostname'>,
  referrer: string,
): TouchSignals {
  const params = new URLSearchParams(location.search)
  const signals: TouchSignals = { landing_page: landingPath(location) }

  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim()
    if (value) signals[key] = value.slice(0, key === 'utm_campaign' ? 150 : 100)
  }
  for (const key of CLICK_ID_KEYS) {
    const value = params.get(key)?.trim()
    if (value && /^[A-Za-z0-9_\-.]{1,255}$/.test(value)) signals[key] = value
  }
  const ref = externalReferrer(referrer, location.hostname)
  if (ref) signals.referrer = ref
  return signals
}

/** Une nouvelle « touche » mérite d'être enregistrée : campagne, click ID ou arrivée depuis un autre site. */
export function hasAcquisitionSignal(signals: TouchSignals): boolean {
  return Boolean(
    signals.referrer || signals.utm_source || signals.utm_medium || signals.gclid || signals.gbraid || signals.wbraid,
  )
}
