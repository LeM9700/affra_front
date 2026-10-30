import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/shared/PageHero'
import CTABand from '@/components/shared/CTABand'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { buildMetadata } from '@/lib/utils/metadata'
import { villesSeo, villesSlugMap } from '@/data/villes-seo'
import OffresSection from '@/components/home/OffresSection'
import Breadcrumb from '@/components/shared/Breadcrumb'
import VilleEnBref from '@/components/zones/VilleEnBref'
import VilleChantiers from '@/components/zones/VilleChantiers'
import VilleDeroulement from '@/components/zones/VilleDeroulement'
import VillesProches from '@/components/zones/VillesProches'
import { REALISATIONS } from '@/data/realisations'
import { buildVoisinage } from '@/lib/geo/voisinage'
import { CONTACT_PHONE_E164 } from '@/lib/contact'
import { aVille, deVille } from '@/lib/utils/preposition'
import {
  ORGANIZATION_ADDRESS,
  ORGANIZATION_BASE_COORDS,
  ORGANIZATION_ID,
  ORGANIZATION_NAME,
  SITE_URL,
} from '@/lib/schema/organization'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return villesSeo.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const ville = villesSlugMap[slug]
  if (!ville) return {}
  return buildMetadata({
    title: ville.metaTitle,
    description: ville.metaDescription,
    path: `/zone-intervention/${slug}`,
  })
}

export default async function VillePage({ params }: Props) {
  const { slug } = await params
  const ville = villesSlugMap[slug]
  if (!ville) notFound()

  const voisinage = buildVoisinage(ville, villesSeo, REALISATIONS, ORGANIZATION_BASE_COORDS)

  const city = {
    '@type': 'City',
    name: ville.nom,
    geo: { '@type': 'GeoCoordinates', latitude: ville.lat, longitude: ville.lng },
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: `${ville.nomDept} (${ville.departement})`,
    },
  }

  // Même `@id` que l'accueil et /a-propos : les moteurs et les IA rattachent cette page à
  // l'entreprise déjà connue au lieu de créer une entité « AFFRA RESEAUX » de plus.
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ElectricalContractor'],
    '@id': ORGANIZATION_ID,
    name: ORGANIZATION_NAME,
    url: SITE_URL,
    telephone: CONTACT_PHONE_E164,
    address: ORGANIZATION_ADDRESS,
    areaServed: city,
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/zone-intervention/${ville.slug}#service`,
    name: `Installation de borne de recharge ${aVille(ville.nom)}`,
    description: ville.intro,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: city,
    serviceType: 'Installation IRVE — Borne de recharge électrique',
  }

  const faqSchema =
    ville.faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: ville.faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }
      : null

  return (
    <>
      <SchemaOrg schema={localBusinessSchema} />
      <SchemaOrg schema={serviceSchema} />
      {faqSchema && <SchemaOrg schema={faqSchema} />}

      <PageHero
        imageSrc="/images/hero/zone-hero.webp"
        imageAlt={`Installation borne de recharge ${ville.nom}`}
        title={`Borne de recharge ${aVille(ville.nom)}`}
        subtitle={`Entreprise qualifiée IRVE — ${ville.nomDept} (${ville.departement})`}
      />

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: "Zone d'intervention", href: '/zone-intervention' },
              { label: ville.nom },
            ]}
          />

          {/* Intro */}
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Installation IRVE {aVille(ville.nom)} ({ville.departement})
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-10">{ville.intro}</p>

          <VilleEnBref
            nom={ville.nom}
            departement={ville.departement}
            nomDept={ville.nomDept}
            distanceBaseKm={voisinage.distanceBaseKm}
          />

          {/* Zones couvertes */}
          {ville.quartiers.length > 0 && (
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                Zones couvertes autour {deVille(ville.nom)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {ville.quartiers.map((q) => (
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
                desc: `Installation de wallbox pour votre maison ou appartement ${aVille(ville.nom)}. Certifié IRVE, éligible aux aides Advenir.`,
              },
              {
                titre: 'Copropriétés',
                href: '/services/coproprietes',
                desc: `Accompagnement droit à la prise et installation collective dans les résidences ${deVille(ville.nom)}.`,
              },
              {
                titre: 'Professionnels',
                href: '/services/professionnels',
                desc: `Bornes de recharge pour flottes d'entreprise, parkings et zones d'activité ${aVille(ville.nom)} et environs.`,
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

          <VilleChantiers nom={ville.nom} chantiers={voisinage.chantiers} />

          <VilleDeroulement nom={ville.nom} />

          {/* FAQ */}
          {ville.faqItems.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Questions fréquentes — {ville.nom}
              </h3>
              <div className="space-y-3">
                {ville.faqItems.map((item) => (
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

          {/* CTA inline */}
          <div className="bg-blue-950 rounded-2xl p-8 text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">
              Besoin d&apos;un devis {aVille(ville.nom)} ?
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

          <VillesProches nom={ville.nom} villes={voisinage.villesProches} />

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
