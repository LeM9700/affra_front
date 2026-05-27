import Image from 'next/image'
import PhotoPlaceholder from '@/components/shared/PhotoPlaceholder'
import type { PortfolioItem } from '@/types/portfolio'

const isDev = process.env.NODE_ENV === 'development'

interface RealisationCardProps {
  item: PortfolioItem
}

export default function RealisationCard({ item }: RealisationCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {item.type_client && (
            <span className="text-xs bg-[#5BBF8A]/10 text-[#5BBF8A] px-2 py-0.5 rounded-full font-medium">
              {item.type_client}
            </span>
          )}
          {item.ville && (
            <span className="text-xs text-slate-500">{item.ville}</span>
          )}
        </div>
        <h3 className="text-slate-900 font-bold mb-1">{item.titre}</h3>
        {item.puissance_kw && (
          <p className="text-slate-500 text-sm">{item.type_borne} {item.puissance_kw} kW</p>
        )}

      </div>
    </div>
  )
}
