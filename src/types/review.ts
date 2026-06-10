export interface UnifiedReview {
  id: string
  source: 'google' | 'site'
  author: string
  rating: number
  text: string
  sortDate: string | null
  meta:
    | { type: 'google'; relativeTime: string; photoUri?: string }
    | { type: 'site'; ville: string; departement: string; typeClient: string }
}
