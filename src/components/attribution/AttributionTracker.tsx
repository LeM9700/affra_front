'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { recordLanding, trackPageView } from '@/lib/attribution/events'

// Gardes au niveau module : un seul enregistrement par chargement de page et par page affichée,
// y compris avec le double montage de React StrictMode.
let landingRecorded = false
let lastTrackedPath: string | null = null

/**
 * Initialise affra_vid, enregistre la visite (LANDING) puis une page vue (PAGE_VIEW)
 * à chaque changement de page de l'App Router. Ne rend rien.
 */
export default function AttributionTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!landingRecorded) {
      landingRecorded = true
      recordLanding()
    }
    if (pathname && pathname !== lastTrackedPath) {
      lastTrackedPath = pathname
      trackPageView()
    }
  }, [pathname])

  return null
}
