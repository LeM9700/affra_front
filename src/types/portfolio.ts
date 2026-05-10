export interface PortfolioItem {
  id: string
  slug: string
  titre: string
  type_client: string | null
  type_borne: string | null
  puissance_kw: number | null
  ville: string | null
  description: string | null
  image_urls: string[] | null
  subvention_obtenue: string | null
  created_at: string
}
