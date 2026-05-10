'use server'

import { testimonialSchema } from '@/lib/validations/testimonial'
import type { TestimonialPayload } from '@/types/testimonial'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''
const API_SECRET_KEY = process.env.API_SECRET_KEY ?? ''

export async function submitTestimonial(payload: TestimonialPayload) {
  const parsed = testimonialSchema.safeParse(payload)
  if (!parsed.success) {
    return {
      success: false as const,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  if (parsed.data.website) {
    return { success: true as const }
  }

  let res: Response
  try {
    res = await fetch(`${API_URL}/internal/testimonials/collect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_SECRET_KEY,
      },
      body: JSON.stringify(parsed.data),
    })
  } catch {
    return {
      success: false as const,
      errors: {
        _form: ['Le service est momentanément indisponible. Merci de réessayer.'],
      } as Record<string, string[]>,
    }
  }

  if (!res.ok) {
    if (res.status === 429) {
      return {
        success: false as const,
        errors: {
          _form: ['Trop de tentatives. Merci de reessayer plus tard.'],
        } as Record<string, string[]>,
      }
    }

    return {
      success: false as const,
      errors: {
        _form: ['Impossible d\'envoyer votre temoignage pour le moment.'],
      } as Record<string, string[]>,
    }
  }

  return { success: true as const }
}
