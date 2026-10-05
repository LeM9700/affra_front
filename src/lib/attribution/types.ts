/**
 * Types partagés de l'attribution.
 *
 * Le navigateur ne transmet que des signaux bruts : la classification de la source
 * (GOOGLE_ORGANIC, CHATGPT…) est faite exclusivement par le backend.
 */

/** Événements que le navigateur est autorisé à émettre (LANDING passe par /visit). */
export type ClientEventType = 'QUOTE_STARTED' | 'PHONE_CLICK' | 'EMAIL_CLICK' | 'WHATSAPP_CLICK'

/** Métadonnées plates et courtes : jamais de données personnelles ni de secrets. */
export type EventMetadata = Record<string, string | number | boolean | null>

export interface TouchSignals {
  landing_page: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  gclid?: string
  gbraid?: string
  wbraid?: string
}

export interface VisitPayload extends TouchSignals {
  anonymous_id: string
  client_event_id: string
}

export interface EventPayload {
  anonymous_id: string
  client_event_id: string
  event_type: ClientEventType
  page_path?: string
  metadata?: EventMetadata
}
