import Image from 'next/image'
import PhotoPlaceholder from '@/components/shared/PhotoPlaceholder'
import SectionTitle from '@/components/shared/SectionTitle'
import FadeIn from '@/components/shared/FadeIn'

const isDev = process.env.NODE_ENV === 'development'

const photos = [
  { src: '/images/realisations/galerie-01.webp', alt: 'Installation borne de recharge IRVE Occitanie — pose Wallbox particulier' },
  { src: '/images/realisations/galerie-02.webp', alt: 'Pose borne de recharge voiture électrique PACA par installateur certifié IRVE' },
  { src: '/images/realisations/galerie-03.webp', alt: 'Raccordement tableau électrique borne IRVE — chantier Nîmes Gard' },
  { src: '/images/realisations/galerie-04.webp', alt: 'Installation Wallbox 11 kW chez particulier en Occitanie' },
  { src: '/images/realisations/galerie-05.webp', alt: 'Chantier borne de recharge Marseille Bouches-du-Rhône AFFRA Réseaux' },
  { src: '/images/realisations/galerie-06.webp', alt: 'Pose borne IRVE Montpellier Hérault — installation certifiée' },
  { src: '/images/realisations/galerie-07.webp', alt: 'Installation borne recharge Toulouse Haute-Garonne voiture électrique' },
]

export default function RealisationsGallery() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionTitle
            eyebrow="Nos chantiers"
            title="Installations en images"
            subtitle="Découvrez quelques-unes de nos réalisations de bornes de recharge en Occitanie et PACA."
          />
        </FadeIn>

        <div className="mt-12 columns-2 md:columns-3 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <FadeIn key={i} delay={i * 0.06} className="break-inside-avoid">
              <div className="group relative overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                {isDev ? (
                  <PhotoPlaceholder
                    width={600}
                    height={i % 3 === 0 ? 500 : 400}
                    label={photo.src}
                    className="w-full"
                  />
                ) : (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={600}
                    height={i % 3 === 0 ? 500 : 400}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-[#5BBF8A]/0 transition-colors duration-300 group-hover:bg-[#5BBF8A]/15 rounded-xl pointer-events-none" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
