/**
 * Émission des événements d'attribution depuis le navigateur.
 *
 * Fire-and-forget : navigator.sendBeacon (survit à la navigation / à l'ouverture de l'app Téléphone),
 * repli sur fetch({ keepalive: true }). Ne bloque jamais l'interface et ne lève jamais d'erreur.
 * Les requêtes partent vers le proxy same-origin /api/attribution/* (la clé API reste côté serveur).
 */
import { hasAcquisitionSignal, readTouchSignals } from './source'
import type { ClientEventType, EventMetadata, EventPayload, VisitPayload } from './types'
import { getOrCreateVisitorId, randomUUID } from './visitor'

const SESSION_FLAG = 'affra_touch_recorded'

function send(path: '/api/attribution/visit' | '/api/attribution/event', payload: VisitPayload | EventPayload): void {
  try {
    const body = JSON.stringify(payload)
    if (typeof navigator.sendBeacon === 'function') {
      const queued = navigator.sendBeacon(path, new Blob([body], { type: 'application/json' }))
      if (queued) return
    }
    void fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
      credentials: 'same-origin',
    }).catch(() => undefined)
  } catch {
    // Le tracking ne doit jamais casser un parcours.
  }
}

function sessionFlag(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_FLAG) === '1'
  } catch {
    return false
  }
}

function setSessionFlag(): void {
  try {
    window.sessionStorage.setItem(SESSION_FLAG, '1')
  } catch {
    // stockage indisponible (navigation privée stricte) : au pire une visite de plus
  }
}

/**
 * Enregistre la visite (LANDING) au premier chargement de la session, ou à chaque nouvelle
 * arrivée porteuse d'un signal d'acquisition (UTM, click ID, referrer externe).
 */
export function recordLanding(): void {
  if (typeof window === 'undefined') return
  const anonymousId = getOrCreateVisitorId()
  if (!anonymousId) return

  const signals = readTouchSignals(window.location, document.referrer)
  if (sessionFlag() && !hasAcquisitionSignal(signals)) return

  setSessionFlag()
  send('/api/attribution/visit', { anonymous_id: anonymousId, client_event_id: randomUUID(), ...signals })
}

export function trackEvent(eventType: ClientEventType, metadata?: EventMetadata): void {
  if (typeof window === 'undefined') return
  const anonymousId = getOrCreateVisitorId()
  if (!anonymousId) return
  send('/api/attribution/event', {
    anonymous_id: anonymousId,
    client_event_id: randomUUID(),
    event_type: eventType,
    page_path: window.location.pathname,
    metadata,
  })
}
