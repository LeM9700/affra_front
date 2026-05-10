import Image from 'next/image'
import Link from 'next/link'

interface ServiceHeroProps {
  /** Chemin vers l'image hero (depuis /public) — ex: /images/hero/particuliers-hero.webp */
  imageSrc: string
  imageAlt: string
  title: string
  subtitle: string
}

export default function ServiceHero({
  imageSrc,
  imageAlt,
  title,
  subtitle,
}: ServiceHeroProps) {
  return (
    <section className="relative h-[500px] flex items-end overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/25 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-xl text-white/80 max-w-2xl mb-6">{subtitle}</p>
        <Link
          href="/devis"
          className="inline-block bg-gradient-to-r from-[#5BBF8A] via-[#29B4C5] to-[#29ABE2] text-white font-bold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition-opacity"
        >
          Demander un devis
        </Link>
      </div>
    </section>
  )
}
