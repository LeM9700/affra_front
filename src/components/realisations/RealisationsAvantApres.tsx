import SectionTitle from '@/components/shared/SectionTitle'
import FadeIn from '@/components/shared/FadeIn'
import BeforeAfterSlider from '@/components/realisations/BeforeAfterSlider'

const transformations = [
  {
    beforeSrc: '/images/realisations/avant-1.webp',
    afterSrc: '/images/realisations/apres-1.webp',
    beforeAlt: 'Tableau électrique avant installation borne de recharge IRVE',
    afterAlt: 'Installation borne de recharge Wallbox terminée par AFFRA Réseaux',
    title: 'Transformation chez un particulier',
    badge: 'Installation Wallbox',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    beforeSrc: '/images/realisations/avant-2.webp',
    afterSrc: '/images/realisations/apres-2.webp',
    beforeAlt: 'Espace garage avant pose borne de recharge voiture électrique',
    afterAlt: 'Borne de recharge installée dans garage particulier par AFFRA Réseaux',
    title: 'Transformation chez un particulier',
    badge: 'Installation IRVE',
    aspectRatio: 'aspect-square',
  },
]

export default function RealisationsAvantApres() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionTitle
            eyebrow="Transformation"
            title="Avant / Après"
            accentWord="Après"
            subtitle="Glissez le curseur pour découvrir la transformation réalisée chez nos clients particuliers."
          />
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {transformations.map((t, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <BeforeAfterSlider
                beforeSrc={t.beforeSrc}
                afterSrc={t.afterSrc}
                beforeAlt={t.beforeAlt}
                afterAlt={t.afterAlt}
                title={t.title}
                badge={t.badge}
                aspectRatio={t.aspectRatio}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
