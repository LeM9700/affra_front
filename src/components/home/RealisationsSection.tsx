import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from '@/components/shared/SectionTitle'
import PhotoPlaceholder from '@/components/shared/PhotoPlaceholder'
import type { PortfolioItem } from '@/types/portfolio'

const isDev = process.env.NODE_ENV === 'development'

interface RealisationsSectionProps {
  items: PortfolioItem[]
}

export default function RealisationsSection({ items }: RealisationsSectionProps) {
  const displayed = items.slice(0, 3)

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Nos dernières réalisations"
          subtitle="Des installations certifiées IRVE pour tous types de clients."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayed.length > 0
            ? displayed.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* [photos: portfolio_items.image_urls[0]] */}
                  <div className="aspect-[3/2] relative">
                    {isDev && !item.image_urls?.[0] ? (
                      <PhotoPlaceholder width={600} height={400} label="portfolio_items.image_urls[0]" className="h-full" />
                    ) : (
                      <Image
                        src={item.image_urls?.[0] ?? '/images/placeholders/placeholder-card.svg'}
                        alt={item.titre}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-[#5BBF8A] font-semibold uppercase tracking-wide">
                      {item.type_client} {item.ville}
                    </span>
                    <h3 className="text-slate-900 font-bold mt-1 mb-2">{item.titre}</h3>
                    {item.puissance_kw && (
                      <p className="text-slate-500 text-sm">{item.puissance_kw} kW</p>
                    )}
                  </div>
                </div>
              ))
            : (
              <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold text-slate-900">Des réalisations documentées avec rigueur</h3>
                <p className="mt-3 text-slate-600">
                  Nos études de cas sont en préparation afin de présenter des projets complets,
                  conformes IRVE, avec contexte technique et résultats concrets.
                </p>
                <p className="mt-2 text-slate-600">
                  Notre équipe intervient déjà sur des projets résidentiels, collectifs et
                  professionnels dans le 34, le 30 et le 13.
                </p>
              </div>
            )}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/realisations"
            className="inline-block border border-[#5BBF8A] text-[#5BBF8A] hover:bg-[#5BBF8A] hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Voir toutes nos réalisations
          </Link>
        </div>
      </div>
    </section>
  )
}
