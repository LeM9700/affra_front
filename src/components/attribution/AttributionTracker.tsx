'use client'

import { useEffect } from 'react'

import { recordLanding } from '@/lib/attribution/events'

// Garde au niveau module : un seul enregistrement par chargement de page,
// y compris avec le double montage de React StrictMode et les navigations App Router.
let recorded = false

/** Initialise affra_vid et enregistre la visite (LANDING). Ne rend rien. */
export default function AttributionTracker() {
  useEffect(() => {
    if (recorded) return
    recorded = true
    recordLanding()
  }, [])

  return null
}
