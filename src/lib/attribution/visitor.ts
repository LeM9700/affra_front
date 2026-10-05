/**
 * Identifiant navigateur first-party `affra_vid`.
 *
 * - UUID v4 cryptographiquement aléatoire (crypto.randomUUID / getRandomValues), aucun fingerprinting ;
 * - ne contient aucune donnée personnelle ;
 * - cookie first-party, durée max. 13 mois (recommandation CNIL), non renouvelée à chaque visite ;
 * - lu côté serveur par la route /api/attribution et l'action submitDevis.
 *
 * C'est le SEUL module qui lit ou écrit ce cookie côté navigateur.
 */

export const VISITOR_COOKIE = 'affra_vid'
export const VISITOR_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 395 // ≈ 13 mois

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function isValidVisitorId(value: unknown): value is string {
  return typeof value === 'string' && UUID_RE.test(value)
}

export function randomUUID(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

/**
 * Point unique de décision « le suivi d'attribution est-il autorisé ? ».
 * Brancher ici un futur gestionnaire de consentement (CMP) si nécessaire.
 */
export function isAttributionAllowed(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined' && navigator.cookieEnabled
}

function readCookie(name: string): string | null {
  const prefix = `${name}=`
  for (const part of document.cookie.split(';')) {
    const trimmed = part.trim()
    if (trimmed.startsWith(prefix)) return decodeURIComponent(trimmed.slice(prefix.length))
  }
  return null
}

export function readVisitorId(): string | null {
  if (!isAttributionAllowed()) return null
  const value = readCookie(VISITOR_COOKIE)
  return isValidVisitorId(value) ? value : null
}

/** Retourne l'identifiant existant ou en crée un. null si le suivi est indisponible (SSR, cookies bloqués). */
export function getOrCreateVisitorId(): string | null {
  if (!isAttributionAllowed()) return null
  const existing = readVisitorId()
  if (existing) return existing

  const id = randomUUID()
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${VISITOR_COOKIE}=${id}; Max-Age=${VISITOR_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`
  return readVisitorId()
}
