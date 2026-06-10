import type { GooglePlacesData } from '@/lib/google-places'

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-4 h-4 ${s <= rating ? 'text-yellow-400' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

const AVATAR_COLORS = [
  'bg-[#5BBF8A] text-white',
  'bg-[#29ABE2] text-white',
  'bg-slate-700 text-white',
]

interface OffresAvisProps {
  data: GooglePlacesData | null
}

export default function OffresAvis({ data }: OffresAvisProps) {
  if (!data || !data.reviews?.length) return null

  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Ce que disent nos clients</h2>
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <StarRating rating={Math.round(data.rating)} />
            <span className="font-semibold text-lg text-slate-800">{data.rating.toFixed(1)}</span>
            <span className="text-sm text-slate-500">({data.userRatingCount} avis Google)</span>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.reviews.slice(0, 3).map((review, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                  {initials(review.authorAttribution.displayName)}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{review.authorAttribution.displayName}</p>
                  <p className="text-xs text-slate-400">{review.relativePublishTimeDescription}</p>
                </div>
              </div>
              <StarRating rating={review.rating} />
              {review.text?.text && (
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">{review.text.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
