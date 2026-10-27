'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import PhotoPlaceholder from '@/components/shared/PhotoPlaceholder'

const isDev = process.env.NODE_ENV === 'development'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  title: string
  badge: string
  /** Classe Tailwind d'aspect-ratio du conteneur (ex: "aspect-[4/3]", "aspect-square") */
  aspectRatio?: string
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  title,
  badge,
  aspectRatio = 'aspect-[4/3]',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  // Verrouillage d'axe au toucher : un geste vertical défile la page, il ne doit pas déplacer le curseur.
  const touchOrigin = useRef<{ x: number; y: number } | null>(null)
  const touchAxis = useRef<'x' | 'y' | null>(null)

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current
    if (!container) return
    const { left, width } = container.getBoundingClientRect()
    const pct = Math.min(Math.max(((clientX - left) / width) * 100, 0), 100)
    setPosition(pct)
  }, [])

  const onMouseDown = () => {
    isDragging.current = true
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    updatePosition(e.clientX)
  }
  const onMouseUp = () => {
    isDragging.current = false
  }
  const onTouchStart = (e: React.TouchEvent) => {
    touchOrigin.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    touchAxis.current = null
  }
  const onTouchMove = (e: React.TouchEvent) => {
    const origin = touchOrigin.current
    if (!origin) return
    const touch = e.touches[0]
    if (touchAxis.current === null) {
      const dx = Math.abs(touch.clientX - origin.x)
      const dy = Math.abs(touch.clientY - origin.y)
      if (Math.max(dx, dy) < 6) return
      touchAxis.current = dx > dy ? 'x' : 'y'
    }
    if (touchAxis.current === 'x') updatePosition(touch.clientX)
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 20 : 5
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(p - step, 0))
    else if (e.key === 'ArrowRight') setPosition((p) => Math.min(p + step, 100))
    else if (e.key === 'Home') setPosition(0)
    else if (e.key === 'End') setPosition(100)
    else return
    e.preventDefault()
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        className={`relative ${aspectRatio} w-full overflow-hidden rounded-2xl border border-slate-200 shadow-card cursor-col-resize select-none touch-pan-y`}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >
        {/* Image AVANT */}
        {isDev && !beforeSrc.endsWith('.webp') ? (
          <PhotoPlaceholder width={800} height={600} label={beforeSrc} className="absolute inset-0 h-full" />
        ) : (
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            draggable={false}
          />
        )}

        {/* Image APRÈS — clippée à droite du curseur */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        >
          {isDev && !afterSrc.endsWith('.webp') ? (
            <PhotoPlaceholder width={800} height={600} label={afterSrc} className="absolute inset-0 h-full" />
          ) : (
            <Image
              src={afterSrc}
              alt={afterAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              draggable={false}
            />
          )}
        </div>

        {/* Barre verticale + poignée */}
        <div
          className="absolute inset-y-0 z-10 flex items-center justify-center"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-0.5 h-full bg-white/80 shadow-md" />
          <button
            className="absolute flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-lg border border-slate-200"
            onMouseDown={onMouseDown}
            onTouchStart={() => (isDragging.current = true)}
            onKeyDown={onKeyDown}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            aria-label="Glisser pour comparer avant et après"
          >
            <span className="text-slate-600 text-xs font-bold select-none">⇔</span>
          </button>
        </div>

        {/* Labels AVANT / APRÈS */}
        <span className="absolute top-3 left-3 z-10 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          Avant
        </span>
        <span className="absolute top-3 right-3 z-10 rounded-full bg-[#5BBF8A]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          Après
        </span>
      </div>

      {/* Légende */}
      <div className="flex items-center gap-2">
        <span className="inline-block rounded-full bg-[#5BBF8A]/10 px-3 py-0.5 text-xs font-semibold text-[#3a9e6c] border border-[#5BBF8A]/25">
          {badge}
        </span>
        <p className="text-sm font-medium text-slate-700">{title}</p>
      </div>
    </div>
  )
}
