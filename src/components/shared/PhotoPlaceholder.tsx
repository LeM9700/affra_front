/**
 * PhotoPlaceholder — visible uniquement en développement.
 * Affiche les dimensions attendues et le nom du fichier cible.
 * Remplacer par <Image> avec le vrai fichier en production.
 */
interface PhotoPlaceholderProps {
  width: number
  height: number
  /** Nom du fichier cible (ex: "hero/homepage-hero.webp") */
  label: string
  className?: string
}

export default function PhotoPlaceholder({
  width,
  height,
  label,
  className = '',
}: PhotoPlaceholderProps) {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div
      className={`flex flex-col items-center justify-center bg-slate-700 text-slate-400 text-xs border border-dashed border-slate-500 ${className}`}
      style={{ width: '100%', aspectRatio: `${width}/${height}` }}
      aria-hidden="true"
    >
      <span className="font-mono text-center px-2 break-all">{label}</span>
      <span className="mt-1 opacity-60">
        {width} × {height}px
      </span>
    </div>
  )
}
