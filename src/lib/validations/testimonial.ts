import { z } from 'zod'

export const testimonialSchema = z.object({
  initiales: z
    .string()
    .min(3, 'Initiales requises')
    .max(10, 'Initiales trop longues')
    .regex(/^[A-Za-z.\s-]+$/, 'Format initiales invalide'),
  ville: z.string().min(2, 'Ville requise').max(100),
  departement: z.enum(['13', '30', '34'], { error: 'Departement invalide' }),
  type_client: z.enum(['maison', 'copropriete', 'entreprise', 'autre'], {
    error: 'Type de client invalide',
  }),
  type_projet: z.string().max(120).optional().or(z.literal('')),
  resultat: z.string().max(160).optional().or(z.literal('')),
  temoignage: z
    .string()
    .min(40, 'Le temoignage doit faire au moins 40 caracteres')
    .max(2000, 'Le temoignage est trop long'),
  source_channel: z.enum(['formulaire_web', 'email', 'whatsapp', 'sms', 'autre'], {
    error: 'Source invalide',
  }),
  consent_publication: z.literal(true, {
    error: 'Le consentement de publication est requis',
  }),
  website: z.string().max(0).optional(),
})
