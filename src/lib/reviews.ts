import { getTestimonials } from '@/lib/api/testimonials'
import { getGoogleReviews, type GoogleReview } from '@/lib/google-places'
import type { TestimonialSeoItem } from '@/types/testimonial'
import type { UnifiedReview } from '@/types/review'

function siteReviewToUnified(item: TestimonialSeoItem): UnifiedReview {
  return {
    id: `site-${item.id}`,
    source: 'site',
    author: item.initiales,
    rating: 5,
    text: item.temoignage,
    sortDate: item.published_at,
    meta: {
      type: 'site',
      ville: item.ville,
      departement: item.departement,
      typeClient: item.type_client,
    },
  }
}

function googleReviewToUnified(review: GoogleReview, index: number): UnifiedReview {
  return {
    id: `google-${index}-${review.authorAttribution.displayName}`,
    source: 'google',
    author: review.authorAttribution.displayName,
    rating: review.rating,
    text: review.text?.text ?? '',
    sortDate: null,
    meta: {
      type: 'google',
      relativeTime: review.relativePublishTimeDescription,
      photoUri: review.authorAttribution.photoUri,
    },
  }
}

export async function getMergedReviews(): Promise<UnifiedReview[]> {
  const [siteReviews, googleData] = await Promise.all([
    getTestimonials().catch(() => [] as TestimonialSeoItem[]),
    getGoogleReviews().catch(() => null),
  ])

  const unified: UnifiedReview[] = [
    ...siteReviews.map(siteReviewToUnified),
    ...(googleData?.reviews ?? []).map(googleReviewToUnified),
  ]

  return unified
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating
      if (a.sortDate && b.sortDate) return b.sortDate.localeCompare(a.sortDate)
      if (a.sortDate) return -1
      if (b.sortDate) return 1
      return 0
    })
    .slice(0, 6)
}
