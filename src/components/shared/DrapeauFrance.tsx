interface DrapeauFranceProps {
  className?: string
}

/**
 * Drapeau français en SVG. Remplace l'émoji 🇫🇷, que Windows affiche en lettres « FR ».
 * Décoratif : le texte voisin dit déjà « France ».
 */
export default function DrapeauFrance({ className }: DrapeauFranceProps) {
  return (
    <svg
      viewBox="0 0 3 2"
      aria-hidden="true"
      focusable="false"
      className={['rounded-[2px] ring-1 ring-slate-300/70', className].filter(Boolean).join(' ')}
    >
      <rect width="1" height="2" fill="#002395" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#ED2939" />
    </svg>
  )
}
