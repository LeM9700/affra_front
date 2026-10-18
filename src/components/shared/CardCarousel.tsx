import { Children, type ReactNode } from 'react'

interface CardCarouselProps {
  /** Libellé accessible de la région défilante. */
  label: string
  children: ReactNode
}

/**
 * Liste de cartes : grille de 3 colonnes dès `md`, carrousel horizontal manuel en dessous
 * (défilement tactile avec accroche, carte suivante partiellement visible, aucun autoplay).
 * Chaque enfant devient un <li> de même hauteur ; la carte doit occuper `h-full`.
 */
export default function CardCarousel({ label, children }: CardCarouselProps) {
  return (
    <ul
      role="region"
      aria-label={label}
      tabIndex={0}
      className="-mx-4 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-4 pb-4 scroll-pl-4 sm:scroll-pl-6 md:scroll-pl-0 [scrollbar-width:thin] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B4C5] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
    >
      {Children.map(children, (child) => (
        <li className="w-[82%] flex-shrink-0 snap-start sm:w-[60%] md:w-auto">{child}</li>
      ))}
    </ul>
  )
}
