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
                      {item.type_client} — {item.ville}
                    </span>
                    <h3 className="text-slate-900 font-bold mt-1 mb-2">{item.titre}</h3>
                    {item.puissance_kw && (
                      <p className="text-slate-500 text-sm">{item.puissance_kw} kW</p>
                    )}
                  </div>
                </div>
              ))
            : // Placeholders pendant le chargement initial
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  <PhotoPlaceholder width={600} height={400} label="portfolio_items.image_urls[0]" />
                  <div className="p-5">
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
                    <div className="h-5 bg-slate-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
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
