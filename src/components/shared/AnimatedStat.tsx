'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedStatProps {
  value: string
  label: string
  sub: string
  delay?: number
}

function parseValue(v: string): { prefix: string; num: number; suffix: string } {
  const match = v.match(/^([^0-9]*)(\d+)([^0-9]*)$/)
  if (!match) return { prefix: '', num: 0, suffix: v }
  return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] }
}

export default function AnimatedStat({ value, label, sub, delay = 0 }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [count, setCount] = useState(0)
  const { prefix, num, suffix } = parseValue(value)

  useEffect(() => {
    if (!isInView || num === 0) return
    let start: number | null = null
    const duration = 1400
    const delayMs = delay * 1000

    const frame = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start - delayMs
      if (elapsed < 0) {
        requestAnimationFrame(frame)
        return
      }
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * num))
      if (progress < 1) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }, [isInView, num, delay])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center bg-slate-900 px-6 py-10 text-center">
      <span className="text-5xl font-black tracking-tight text-white sm:text-6xl">
        {prefix}{num === 0 ? value : count}{suffix}
      </span>
      <span className="mt-2 text-sm font-semibold text-slate-300">{label}</span>
      <span className="mt-0.5 text-xs text-slate-500">{sub}</span>
    </div>
  )
}
