/**
 * Préremplissage du type de projet du formulaire de devis via `/devis?projet=…`.
 * Les valeurs sont celles de l'enum `type_client` attendu par l'API (voir lib/validations/devis.ts).
 */

export const PROJET_VALUES = ['maison', 'copropriete', 'entreprise'] as const

export type ProjetValue = (typeof PROJET_VALUES)[number]

/** Liens d'entrée vers le formulaire, utilisés par les CTA du site. */
export const DEVIS_HREF = {
  particulier: '/devis?projet=maison',
  entreprise: '/devis?projet=entreprise',
} as const

/**
 * Valide le paramètre d'URL `projet`.
 *
 * @param value - Valeur brute de `searchParams.projet` (chaîne, tableau si répétée, ou absente).
 * @returns Le type de projet reconnu, ou `undefined` si la valeur est absente ou invalide.
 */
export function parseProjetParam(value: string | string[] | undefined): ProjetValue | undefined {
  const raw = Array.isArray(value) ? value[0] : value
  return PROJET_VALUES.find((v) => v === raw)
}
