import { z } from 'zod'
import { devisSchema } from '@/lib/validations/devis'

export type DevisFormData = z.infer<typeof devisSchema>

export interface DevisPayload extends DevisFormData {
  website?: string // honeypot
}
