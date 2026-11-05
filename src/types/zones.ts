export interface Zone {
  id: string
  ville: string
  /** Slug de la page ville ; optionnel tant que l'API n'expose pas la migration 0008 partout. */
  slug?: string | null
  departement: string
  active: boolean
}
