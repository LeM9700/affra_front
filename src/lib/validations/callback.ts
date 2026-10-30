import { z } from 'zod'

/**
 * Normalise un numéro français en E.164 (« +33612345678 »), comme le backend
 * (app/services/phone.py) : 01-05 fixes, 06-07 mobiles, 09 box ; 08 (numéros spéciaux) refusé.
 *
 * @param raw Saisie libre (« 06 12 34 56 78 », « +33 6… », « 0033 6… »).
 * @returns Le numéro E.164, ou `null` s'il n'est pas valide.
 */
export function normalizeFrenchPhone(raw: string): string | null {
  let compact = raw.replace(/[\s.\-()/]/g, '')
  if (compact.startsWith('+33')) compact = `0${compact.slice(3)}`
  else if (compact.startsWith('0033')) compact = `0${compact.slice(4)}`
  const match = /^0([1-79])(\d{8})$/.exec(compact)
  return match ? `+33${match[1]}${match[2]}` : null
}

/** Lettres (accents compris), espaces, apostrophes, tirets et points : pas d'URL ni de chiffres. */
const NAME_PATTERN = /^[\p{L}]+(?:[ '’.\-][\p{L}]*)*$/u

export const callbackSchema = z.object({
  nom: z
    .string()
    .transform((value) => value.trim().replace(/\s+/g, ' '))
    .pipe(
      z
        .string()
        .min(2, 'Indiquez votre nom')
        .max(100, 'Nom trop long')
        .regex(NAME_PATTERN, 'Le nom ne doit contenir que des lettres'),
    ),
  telephone: z
    .string()
    .transform((value, ctx) => {
      const phone = normalizeFrenchPhone(value)
      if (!phone) {
        ctx.addIssue({ code: 'custom', message: 'Numéro de téléphone français invalide' })
        return z.NEVER
      }
      return phone
    }),
  consent: z.literal(true, { error: 'Votre accord est nécessaire pour être rappelé' }),
})

export type CallbackInput = z.input<typeof callbackSchema>
