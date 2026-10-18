import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from '@/components/shared/SectionTitle'
import CardCarousel from '@/components/shared/CardCarousel'
import { REALISATIONS } from '@/data/realisations'
import { DEVIS_HREF } from '@/lib/devis/projet'

export default function RealisationsSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Nos installations de bornes de recharge dans le Gard"
          subtitle="Découvrez quelques-unes de nos installations réalisées chez des particuliers dans le Gard. Chaque projet bénéficie d’une solution adaptée aux besoins du client et aux contraintes de son installation électrique."
          accentWord="dans le Gard"
          size="md"
        />

        <div className="mt-12">
          <CardCarousel label="Nos installations de bornes de recharge">
            {REALISATIONS.map((item) => (
              <article
                key={item.id}
                className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/5] w-full bg-slate-100">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 82vw"
                    className="object-cover"
                    style={{ objectPosition: item.image.position }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#3a9e6c]">
                    {item.ville} ({item.codePostal})
                  </p>
                  <h3 className="mt-1 text-lg font-bold leading-snug text-slate-900">{item.titre}</h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{item.resume}</p>
                </div>
              </article>
            ))}
          </CardCarousel>
        </div>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href={DEVIS_HREF.particulier}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ boxShadow: 'var(--shadow-green)' }}
          >
            Planifier ma visite technique gratuite
          </Link>
          <Link
            href="/realisations"
            className="inline-flex items-center justify-center rounded-2xl border border-[#5BBF8A] bg-white px-7 py-3.5 text-sm font-semibold text-[#3a9e6c] transition-colors hover:bg-[#5BBF8A] hover:text-white"
          >
            Voir toutes nos réalisations
          </Link>
        </div>
      </div>
    </section>
  )
}
