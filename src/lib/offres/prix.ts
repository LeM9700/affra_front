const PRIX_FORMATTER = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

/**
 * Formate un prix TTC entier à la française (« 1 290 € »).
 * Les espaces produites sont insécables : le montant ne se coupe jamais en fin de ligne.
 *
 * @param montant Prix en euros.
 * @returns Le prix formaté, sans décimales.
 */
export function formatPrixTtc(montant: number): string {
  return PRIX_FORMATTER.format(montant)
}
