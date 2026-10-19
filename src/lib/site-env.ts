/**
 * Environnement du site, fixé par contexte de déploiement Netlify via NEXT_PUBLIC_SITE_ENV.
 *
 * - `preview` (Deploy Previews, Branch deploys) : version de validation client. Aucune donnée
 *   n'est envoyée au backend (formulaire de devis, attribution) et le site n'est pas indexé.
 * - toute autre valeur, ou variable absente : comportement de production. Une variable oubliée
 *   ne peut donc jamais désactiver le vrai site.
 */
export type SiteEnv = 'production' | 'preview'

/**
 * Normalise la valeur brute de NEXT_PUBLIC_SITE_ENV.
 *
 * @param value - Valeur de la variable d'environnement (peut être absente).
 * @returns `preview` uniquement si la valeur l'indique explicitement, sinon `production`.
 */
export function resolveSiteEnv(value: string | undefined): SiteEnv {
  return value?.trim().toLowerCase() === 'preview' ? 'preview' : 'production'
}

export const SITE_ENV: SiteEnv = resolveSiteEnv(process.env.NEXT_PUBLIC_SITE_ENV)
export const IS_PREVIEW = SITE_ENV === 'preview'
