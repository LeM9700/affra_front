import type { GoogleReview } from '@/lib/google-places'
import type { DisplayReview } from '@/types/review'

/**
 * Choisit les avis à afficher.
 *
 * Priorité aux avis renvoyés par l'API Google Places (texte non vide uniquement, triés par
 * note décroissante, l'ordre de pertinence de Google étant conservé à note égale). Si l'API
 * ne fournit pas au moins `max` avis exploitables, on bascule entièrement sur le jeu de
 * secours vérifié afin de ne jamais afficher une section incomplète ni mélanger les sources.
 *
 * @param google - Avis bruts de l'API Google Places (ou `null` si indisponible).
 * @param fallback - Avis vérifiés utilisés en repli.
 * @param max - Nombre d'avis à afficher (3 par défaut).
 * @returns Une liste d'au plus `max` avis prêts à l'affichage.
 */
export function selectDisplayReviews(
  google: readonly GoogleReview[] | null | undefined,
  fallback: readonly DisplayReview[],
  max = 3,
): DisplayReview[] {
  const fromGoogle: DisplayReview[] = (google ?? [])
    .map((review, index) => ({ review, index }))
    .filter(({ review }) => (review.text?.text ?? '').trim().length > 0)
    .sort((a, b) => b.review.rating - a.review.rating || a.index - b.index)
    .map(({ review, index }) => ({
      id: `google-${index}`,
      author: review.authorAttribution.displayName,
      rating: review.rating,
      text: (review.text?.text ?? '').trim(),
    }))

  return (fromGoogle.length >= max ? fromGoogle : fallback).slice(0, max)
}
