import Link from 'next/link'
import SectionTitle from '@/components/shared/SectionTitle'
import CardCarousel from '@/components/shared/CardCarousel'
import { DEVIS_HREF } from '@/lib/devis/projet'
import { GOOGLE_REVIEWS_URL } from '@/lib/contact'
import type { DisplayReview } from '@/types/review'

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} étoiles sur 5`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          aria-hidden="true"
          className={`h-5 w-5 ${s <= rating ? 'text-yellow-400' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

function initials(author: string) {
  return author
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

interface AvisSectionProps {
  reviews: DisplayReview[]
}

export default function AvisSection({ reviews }: AvisSectionProps) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Avis clients Google"
          title="Leur satisfaction, notre meilleure publicité"
          subtitle="Découvrez les retours de clients qui nous ont fait confiance pour l’installation de leur borne de recharge. Des avis authentiques, publiés sur Google."
          accentWord="meilleure publicité"
        />

        <div className="mt-14">
          <CardCarousel label="Avis clients Google">
            {reviews.map((review) => (
              <figure
                key={review.id}
                className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[var(--shadow-card)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-2 left-5 select-none text-[80px] font-black leading-none text-slate-100"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  &ldquo;
                </span>
                <div className="relative">
                  <Stars rating={review.rating} />
                </div>
                <blockquote className="relative mb-6 mt-4 flex-1 text-[0.9375rem] leading-relaxed text-slate-700">
                  « {review.text} »
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2] text-xs font-bold text-white"
                  >
                    {initials(review.author)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-slate-900">{review.author}</span>
                    <span className="block text-xs text-slate-400">Avis publié sur Google</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </CardCarousel>
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Avis authentiques publiés sur notre fiche Google Business Profile.
        </p>
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={DEVIS_HREF.particulier}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ boxShadow: 'var(--shadow-green)' }}
          >
            Planifier ma visite technique gratuite
          </Link>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Voir tous nos avis sur Google
          </a>
        </div>
      </div>
    </section>
  )
}
