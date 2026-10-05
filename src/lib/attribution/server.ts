// Serveur uniquement (next/headers) : action submitDevis et route /api/attribution.
import { cookies, headers } from 'next/headers'

import { VISITOR_COOKIE, isValidVisitorId } from './visitor'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''
const API_SECRET_KEY = process.env.API_SECRET_KEY ?? ''

/** Valeur du cookie affra_vid de la requête courante (server action / route handler). */
export async function readVisitorIdFromRequest(): Promise<string | null> {
  const value = (await cookies()).get(VISITOR_COOKIE)?.value
  return isValidVisitorId(value) ? value : null
}

/**
 * IP du navigateur, transmise au backend dans X-Client-IP pour un rate limiting par visiteur
 * (sinon toutes les requêtes partagent l'IP de la plateforme d'hébergement).
 */
export async function clientIpFromRequest(): Promise<string | null> {
  const h = await headers()
  const candidates = [h.get('x-nf-client-connection-ip'), h.get('x-real-ip'), h.get('x-forwarded-for')?.split(',')[0]]
  const ip = candidates.map((c) => c?.trim()).find((c) => c && /^[0-9a-fA-F:.]{3,45}$/.test(c))
  return ip ?? null
}

export async function backendHeaders(): Promise<Record<string, string>> {
  const ip = await clientIpFromRequest()
  return {
    'Content-Type': 'application/json',
    'X-API-Key': API_SECRET_KEY,
    ...(ip ? { 'X-Client-IP': ip } : {}),
  }
}

export function backendUrl(path: string): string {
  return `${API_URL}${path}`
}
