import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import CTABand from '@/components/shared/CTABand'
import LocalBusinessJsonLd from '@/components/seo/LocalBusinessJsonLd'
import { buildMetadata } from '@/lib/utils/metadata'
import { cities, getCityBySlug } from '@/data/villes-seo'
import OffresSection from '@/components/home/OffresSection'
import Breadcrumb from '@/components/shared/Breadcrumb'
import NearbyCities from '@/components/cities/NearbyCities'
import LocalProjects from '@/components/cities/LocalProjects'
import { REALISATIONS } from '@/data/realisations'
import { resolveCityProjects } from '@/lib/cities/projects'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ville = getCityBySlug(slug)
  if (!ville) return {}
  return buildMetadata({
    title: `Borne de recharge ${ville.name} (${ville.department})`,
    description: ville.metaDescription,
    path: `/zone-intervention/${slug}`,
  })
}

export default async function VillePage({ params }: Props) {
  const { slug } = await params
  const ville = getCityBySlug(slug)
  if (!ville) notFound()
  const localProjects = resolveCityProjects(ville, REALISATIONS)

  return (
    <>
      <LocalBusinessJsonLd city={ville} />

      <PageHero
        imageSrc="/images/hero/zone-hero.webp"
        imageAlt={`Installation borne de recharge ${ville.name}`}
        title={`Borne de recharge à ${ville.name}`}
        subtitle={`Entreprise qualifiée IRVE — ${ville.departmentName} (${ville.department})`}
      />

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: "Zone d'intervention", href: '/zone-intervention' },
              { label: ville.name },
            ]}
          />

          {/* Intro */}
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Installation IRVE à {ville.name} ({ville.department})
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10">{ville.intro}</p>

          {/* Zones couvertes */}
          {ville.coveredAreas.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Zones couvertes autour de {ville.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {ville.coveredAreas.map((q) => (
                  <span
                    key={q}
                    className="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-sm"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                titre: 'Particuliers',
                href: '/services/particuliers',
                desc: `Installation de wallbox pour votre maison ou appartement à ${ville.name}. Certifié IRVE, éligible aux aides Advenir.`,
              },
              {
                titre: 'Copropriétés',
                href: '/services/coproprietes',
                desc: `Accompagnement droit à la prise et installation collective dans les résidences de ${ville.name}.`,
              },
              {
                titre: 'Professionnels',
                href: '/services/professionnels',
                desc: `Bornes de recharge pour flottes d'entreprise, parkings et zones d'activité à ${ville.name} et environs.`,
              },
            ].map(({ titre, href, desc }) => (
              <Link
                key={titre}
                href={href}
                className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {titre}
                </h3>
                <p className="text-slate-600 text-sm">{desc}</p>
              </Link>
            ))}
          </div>

          {/* Réalisations proches */}
          <LocalProjects cityName={ville.name} projects={localProjects} />

          {/* FAQ */}
          {ville.faq.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Questions fréquentes — {ville.name}
              </h3>
              <div className="space-y-3">
                {ville.faq.map((item) => (
                  <details
                    key={item.question}
                    className="bg-slate-50 rounded-xl border border-slate-200 p-5 group"
                  >
                    <summary className="font-medium text-slate-800 cursor-pointer list-none flex justify-between items-center">
                      {item.question}
                      <span className="text-slate-400 group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </summary>
                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Maillage interne */}
          <NearbyCities city={ville} cities={cities} />

          {/* CTA inline */}
          <div className="bg-blue-950 rounded-2xl p-8 text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">
              Besoin d&apos;un devis à {ville.name} ?
            </h3>
            <p className="text-blue-200 mb-5 text-sm">
              Réponse gratuite sous 24h — Entreprise qualifiée IRVE
            </p>
            <Link
              href="/devis"
              className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Demander un devis gratuit
            </Link>
          </div>

          {/* Lien retour */}
          <p className="text-sm text-slate-500 text-center">
            Voir toutes nos{' '}
            <Link href="/zone-intervention" className="text-blue-600 hover:underline">
              zones d&apos;intervention
            </Link>{' '}
            dans toute notre zone d’intervention.
          </p>
        </div>
      </section>

      <OffresSection />
      <CTABand />
    </>
  )
}
