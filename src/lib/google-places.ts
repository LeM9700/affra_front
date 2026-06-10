export interface GoogleReview {
  name: string
  relativePublishTimeDescription: string
  rating: number
  text?: { text: string; languageCode: string }
  authorAttribution: { displayName: string; uri: string; photoUri: string }
}

export interface GooglePlacesData {
  reviews: GoogleReview[]
  rating: number
  userRatingCount: number
}

async function findPlaceId(): Promise<string | null> {
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY!,
      'X-Goog-FieldMask': 'places.id',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ textQuery: 'AFFRA Réseaux Nîmes' }),
    next: { revalidate: 86400 },
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.places?.[0]?.id ?? null
}

export async function getGoogleReviews(): Promise<GooglePlacesData | null> {
  if (!process.env.GOOGLE_PLACES_API_KEY) return null
  const placeId = await findPlaceId()
  if (!placeId) return null
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount&languageCode=fr`,
    {
      headers: { 'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY },
      next: { revalidate: 86400 },
    },
  )
  if (!res.ok) return null
  return res.json()
}
