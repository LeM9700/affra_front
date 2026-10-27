import { IS_PREVIEW } from '@/lib/site-env'

/** Bandeau visible uniquement en pré-production (NEXT_PUBLIC_SITE_ENV=preview). */
export default function PreviewBanner() {
  if (!IS_PREVIEW) return null
  return (
    <div role="status" className="bg-amber-400 px-4 py-2 text-center text-xs font-semibold text-slate-900 sm:text-sm">
      Version de pré-production : les formulaires n’envoient aucune donnée.
    </div>
  )
}
