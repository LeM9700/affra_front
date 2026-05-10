import { z } from 'zod'

import { testimonialSchema } from '@/lib/validations/testimonial'

export type TestimonialFormData = z.infer<typeof testimonialSchema>

export interface TestimonialPayload extends TestimonialFormData {
  website?: string
}

export interface TestimonialSeoItem {
  id: string
  initiales: string
  ville: string
  departement: string
  type_client: string
  type_projet: string | null
  resultat: string | null
  temoignage: string
  published_at: string | null
}
