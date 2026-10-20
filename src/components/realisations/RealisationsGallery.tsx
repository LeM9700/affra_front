import SectionTitle from '@/components/shared/SectionTitle'
import CardCarousel from '@/components/shared/CardCarousel'
import ChantierCard from '@/components/realisations/ChantierCard'
import { REALISATIONS } from '@/data/realisations'

export default function RealisationsGallery() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Nos chantiers"
          title="Découvrez nos installations de bornes de recharge"
          subtitle="Chaque installation est différente. Découvrez trois projets réalisés par AFFRA RESEAUX dans le Gard, avec des solutions adaptées à la configuration électrique et aux besoins de chaque client."
          accentWord="installations"
          size="md"
        />

        <div className="mt-12">
          <CardCarousel label="Nos chantiers de bornes de recharge">
            {REALISATIONS.map((item) => (
              <ChantierCard key={item.id} item={item} detailed />
            ))}
          </CardCarousel>
        </div>
      </div>
    </section>
  )
}
