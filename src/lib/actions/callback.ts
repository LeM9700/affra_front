'use server'

import { isBotUserAgent } from '@/lib/attribution/bots'
import { backendHeaders, backendUrl, readVisitorIdFromRequest } from '@/lib/attribution/server'
import { randomUUID } from '@/lib/attribution/visitor'
import { IS_PREVIEW } from '@/lib/site-env'
import { callbackSchema } from '@/lib/validations/callback'
import { headers } from 'next/headers'

export type CallbackResult =
  | { success: true }
  | { success: false; errors: Partial<Record<'nom' | 'telephone' | 'consent' | '_form', string[]>> }

export interface CallbackRequest {
  nom: string
  telephone: string
  consent: boolean
  /** Champ piège invisible : rempli uniquement par les robots. */
  website?: string
  pagePath?: string
}

const BACKEND_TIMEOUT_MS = 5000

/**
 * Demande de rappel (bouton « Être appelé pour une visite technique gratuite »).
 *
 * Le visiteur devient un prospect identifié côté backend (nom + téléphone), pas un lead.
 * L'identifiant visiteur vient du cookie affra_vid : sans lui, la demande n'est rattachée à aucun parcours,
 * elle est donc refusée (le bouton n'existe que sur le site, le cookie est toujours posé).
 *
 * @param input Saisie du formulaire.
 * @returns Le résultat, avec les erreurs par champ en cas d'échec.
 */
export async function requestCallback(input: CallbackRequest): Promise<CallbackResult> {
  const parsed = callbackSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }

  // Robot (champ piège rempli ou User-Agent automatisé) : faux succès, pour ne rien révéler.
  if (input.website || isBotUserAgent((await headers()).get('user-agent'))) return { success: true }

  // Pré-production : parcours complet sans créer de vrai prospect ni alerter le gérant.
  if (IS_PREVIEW) return { success: true }

  const anonymousId = await readVisitorIdFromRequest()
  if (!anonymousId) {
    return { success: false, errors: { _form: ['Activez les cookies de votre navigateur, ou appelez-nous directement.'] } }
  }

  const pagePath = typeof input.pagePath === 'string' && input.pagePath.startsWith('/') ? input.pagePath.slice(0, 500) : undefined
  let res: Response
  try {
    res = await fetch(backendUrl('/api/v1/attribution/callback'), {
      method: 'POST',
      headers: await backendHeaders(),
      body: JSON.stringify({
        anonymous_id: anonymousId,
        client_event_id: randomUUID(),
        nom: parsed.data.nom,
        telephone: parsed.data.telephone,
        consent: true,
        page_path: pagePath,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    })
  } catch {
    return { success: false, errors: { _form: ['Le service est momentanément indisponible. Appelez-nous directement.'] } }
  }

  if (res.status === 429) {
    return { success: false, errors: { _form: ['Vous avez déjà fait plusieurs demandes. Nous vous rappelons très vite.'] } }
  }
  if (!res.ok) {
    return { success: false, errors: { _form: ['Une erreur est survenue. Réessayez ou appelez-nous directement.'] } }
  }
  return { success: true }
}
