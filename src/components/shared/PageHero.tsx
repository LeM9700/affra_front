import Image from 'next/image'

interface PageHeroProps {
  /** Chemin absolu vers l'image (depuis /public) */
  imageSrc: string
  imageAlt: string
  title: string
  subtitle?: string
  /** Priorité de chargement — true pour le LCP de la page */
  priority?: boolean
}

export default function PageHero({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  priority = true,
}: PageHeroProps) {
  return (
    <section className="relative h-[400px] md:h-[500px] flex items-end overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        className="object-cover"
        sizes="100vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{title}</h1>
        {subtitle && (
          <p className="text-xl text-white/80 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
