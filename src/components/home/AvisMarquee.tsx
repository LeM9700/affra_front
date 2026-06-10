'use client'

import { useEffect, useRef } from 'react'
import type { UnifiedReview } from '@/types/review'

const TYPE_CLIENT_LABELS: Record<string, string> = {
  maison: 'Particulier (maison)',
  copropriete: 'Copropriété',
  entreprise: 'Entreprise',
  autre: 'Client',
}

const SPEED_PX_PER_SEC = 30
const RESUME_DELAY_MS = 3000

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
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

function authorInitials(author: string) {
  return author
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

function ReviewCard({ review }: { review: UnifiedReview }) {
  return (
    <div className="flex w-[85vw] max-w-sm flex-shrink-0 snap-start flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-card)] sm:w-[360px]">
      <StarRating rating={review.rating} />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 line-clamp-5">
        {review.text}
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2] text-xs font-bold text-white">
          {authorInitials(review.author)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900">{review.author}</p>
          {review.meta.type === 'google' ? (
            <p className="text-xs text-slate-400">Avis Google · {review.meta.relativeTime}</p>
          ) : (
            <p className="text-xs text-slate-400">
              {TYPE_CLIENT_LABELS[review.meta.typeClient] ?? 'Client'} (anonymisé) · {review.meta.ville} ({review.meta.departement})
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

interface AvisMarqueeProps {
  reviews: UnifiedReview[]
}

export default function AvisMarquee({ reviews }: AvisMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frameId: number
    let lastTime: number | null = null

    const step = (time: number) => {
      if (lastTime === null) lastTime = time
      const delta = (time - lastTime) / 1000
      lastTime = time

      if (!pausedRef.current) {
        const halfWidth = track.scrollWidth / 2
        track.scrollLeft += SPEED_PX_PER_SEC * delta
        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth
        }
      }

      frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frameId)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [])

  const pause = () => {
    pausedRef.current = true
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false
    }, RESUME_DELAY_MS)
  }

  return (
    <div
      ref={trackRef}
      className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5"
      onPointerDown={pause}
      onTouchStart={pause}
      onWheel={pause}
      role="region"
      aria-label="Avis clients"
    >
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
      {reviews.map((review) => (
        <div key={`${review.id}-dup`} aria-hidden="true">
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  )
}
