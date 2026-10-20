/** Coordonnées de contact AFFRA RESEAUX (source unique pour les liens tel:/mailto:). */
export const CONTACT_PHONE_E164 = '+33766304687'
export const CONTACT_PHONE_DISPLAY = '+33 7 66 30 46 87'
export const CONTACT_PHONE_DISPLAY_NATIONAL = '07 66 30 46 87'
export const CONTACT_EMAIL = 'affrareseaux@gmail.com'

/**
 * Fiche Google Business Profile (bouton « Voir tous nos avis sur Google »).
 * Surchargeable via NEXT_PUBLIC_GOOGLE_REVIEWS_URL ; à vérifier avant mise en production.
 */
export const GOOGLE_REVIEWS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ?? 'https://share.google/YTc6qfCWuioKNSWnB'
