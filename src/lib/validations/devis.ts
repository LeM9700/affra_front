import { z } from 'zod'

// Écran 2 — Type de projet
export const devisScreen2Schema = z.object({
  type_client: z.enum(['maison', 'copropriete', 'entreprise'], {
    error: 'Sélectionnez votre type de projet',
  }),
})

// Écran 3 — Véhicule électrique
export const devisScreen3Schema = z.object({
  possede_vehicule: z.enum(['oui', 'pas_encore', 'livraison_prochaine'], {
    error: 'Répondez à la question',
  }),
})

// Écran 4 — Distance quotidienne
export const devisScreen4Schema = z.object({
  distance_quotidienne: z.enum(['0_50', '50_150', 'plus_150'], {
    error: 'Sélectionnez votre distance',
  }),
})

// Écran 5 — Délai
export const devisScreen5Schema = z.object({
  delai: z.enum(['rapidement', 'un_deux_mois', 'pas_urgent'], {
    error: 'Sélectionnez un délai',
  }),
})

// Écran 6 — Distance tableau électrique
export const devisScreen6Schema = z.object({
  distance_tableau: z.enum(['0_5m', '5_15m', 'plus_15m', 'ne_sait_pas'], {
    error: 'Sélectionnez une distance',
  }),
})

// Écran 7 — Coordonnées
export const devisScreen7Schema = z.object({
  prenom: z.string().min(1, 'Le prénom est obligatoire').max(100),
  telephone: z
    .string()
    .regex(/^(\+33|0)[1-9](\d{8})$/, 'Numéro de téléphone invalide'),
  email: z.string().email('Adresse email invalide'),
  ville: z.string().min(1, 'La ville est obligatoire').max(100),
})

export const devisSchema = devisScreen2Schema
  .merge(devisScreen3Schema)
  .merge(devisScreen4Schema)
  .merge(devisScreen5Schema)
  .merge(devisScreen6Schema)
  .merge(devisScreen7Schema)
