import Image from 'next/image'
import SectionTitle from '@/components/shared/SectionTitle'

const certifications = [
  {
    src: '/images/certifications/logo-irve.webp',
    alt: 'Certification IRVE P1-P2',
    label: 'IRVE P1-P2',
    width: 160,
    height: 64,
  },
  {
    src: '/images/certifications/logo-qualifelec.webp',
    alt: 'Logo Qualifelec',
    label: 'Qualifelec',
    width: 160,
    height: 64,
  },
  {
    src: '/images/certifications/logo-rge.webp',
    alt: 'Reconnu Garant de l\'Environnement',
    label: 'RGE',
    width: 160,
    height: 64,
  },
  {
    src: '/images/certifications/logo-advenir.webp',
    alt: 'Programme Advenir',
    label: 'Advenir',
    width: 160,
    height: 64,
  },
  {
    src: '/images/AFNOR LOGO.png',
    alt: 'AFNOR Certification',
    label: 'AFNOR',
    width: 180,
    height: 72,
  },
]

export default function CertificationsSection() {
  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Certifications &amp; agréments"
          subtitle="Des garanties de qualité reconnues par les organismes officiels."
        />
      </div>

      {/* Infinite scrolling marquee */}
      <div className="mt-10 relative">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...certifications, ...certifications, ...certifications].map((cert, i) => (
            <div
              key={`${cert.label}-${i}`}
              className="mx-8 inline-flex flex-shrink-0 items-center justify-center bg-slate-50 border border-slate-200 rounded-xl px-10 py-6"
              style={{ minWidth: '210px' }}
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                width={cert.width}
                height={cert.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
