'use server'

import { redirect } from 'next/navigation'

import { backendHeaders, readVisitorIdFromRequest } from '@/lib/attribution/server'
import { devisSchema } from '@/lib/validations/devis'
import type { DevisPayload } from '@/types/devis'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export async function submitDevis(payload: DevisPayload) {
  // Server-side validation
  const parsed = devisSchema.safeParse(payload)
  if (!parsed.success) {
    return { success: false as const, errors: parsed.error.flatten().fieldErrors as Record<string, string[]> }
  }

  // Honeypot check
  if (payload.website) {
    // Silently succeed to not leak honeypot logic
    redirect('/devis/merci')
  }

  // Attribution : le cookie first-party affra_vid relie le devis au parcours du visiteur (optionnel).
  const anonymousId = await readVisitorIdFromRequest()

  let res: Response
  try {
    res = await fetch(`${API_URL}/api/v1/devis`, {
      method: 'POST',
      headers: await backendHeaders(),
      body: JSON.stringify(anonymousId ? { ...parsed.data, anonymous_id: anonymousId } : parsed.data),
    })
  } catch {
    return { success: false as const, errors: { _form: ['Le service est momentanément indisponible. Veuillez réessayer.'] } as Record<string, string[]> }
  }

  if (!res.ok) {
    if (res.status === 429) {
      return { success: false as const, errors: { _form: ['Trop de demandes. Réessayez dans une heure.'] } as Record<string, string[]> }
    }
    return { success: false as const, errors: { _form: ['Une erreur est survenue. Veuillez réessayer.'] } as Record<string, string[]> }
  }

  redirect('/devis/merci')
}
