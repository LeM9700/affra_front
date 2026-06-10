import type { Metadata } from 'next'
import Link from 'next/link'
import RealisationCard from '@/components/realisations/RealisationCard'
import RealisationsStats from '@/components/realisations/RealisationsStats'
import RealisationsAvantApres from '@/components/realisations/RealisationsAvantApres'
import RealisationsGallery from '@/components/realisations/RealisationsGallery'
import RealisationsSeoText from '@/components/realisations/RealisationsSeoText'
import PageHero from '@/components/shared/PageHero'
import Breadcrumb from '@/components/shared/Breadcrumb'
import CTABand from '@/components/shared/CTABand'
import ServiceFAQ from '@/components/services/ServiceFAQ'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { getPortfolioItems } from '@/lib/api/portfolio'
import { buildMetadata } from '@/lib/utils/metadata'

export const revalidate = false
export const dynamic = 'force-dynamic'

export const metadata: Metadata = buildMetadata({
  title: 'Nos réalisations IRVE — Bornes de recharge Occitanie & PACA',
  description:
    'Découvrez les installations de bornes de recharge réalisées par AFFRA Réseaux en Occitanie et PACA. +200 bornes installées à Nîmes, Montpellier, Marseille, Toulouse et dans toute la région.',
  path: '/realisations',
})

const faqItems = [
  {
    question: "Combien de temps dure l'installation d'une borne de recharge ?",
    answer:
      "Une installation standard chez un particulier prend entre 2 et 4 heures selon la configuration électrique du logement et la distance entre le tableau électrique et l'emplacement de la borne. Pour une copropriété ou un professionnel, le délai peut varier de 1 à 3 jours selon le nombre de points de charge.",
  },
  {
    question: 'Quelle puissance de borne choisir pour un particulier ?',
    answer:
      "Pour un usage quotidien à domicile, une Wallbox de 7,4 kW ou 11 kW est idéale. Elle permet de recharger complètement la plupart des véhicules électriques en 4 à 8 heures. Pour choisir la puissance adaptée, nos techniciens certifiés IRVE réalisent un audit de votre installation électrique avant toute préconisation.",
  },
  {
    question: "AFFRA Réseaux intervient-il dans toute l'Occitanie et la région PACA ?",
    answer:
      "Oui, nous couvrons l'ensemble de l'Occitanie (Gard, Hérault, Haute-Garonne, Aude, Pyrénées-Orientales…) et de la PACA (Bouches-du-Rhône, Var, Alpes-Maritimes, Vaucluse…). Notre équipe basée à Nîmes intervient rapidement dans toutes les villes de ces deux régions.",
  },
  {
    question: "Qu'est-ce que la certification IRVE et pourquoi est-elle importante ?",
    answer:
      "La certification IRVE (Infrastructure de Recharge pour Véhicules Électriques) est obligatoire pour tout installateur réalisant des bornes de recharge en France, conformément au décret n°2017-26. Elle garantit que l'installation respecte les normes électriques en vigueur (NF C 15-100) et que le technicien a reçu une formation spécifique. AFFRA Réseaux détient cette certification pour tous ses niveaux d'intervention (P1, P2, P3).",
  },
  {
    question: 'Peut-on installer une borne de recharge en copropriété ?',
    answer:
      "Oui, grâce au droit à la prise (article 24-5 de la loi du 10 juillet 1965), tout copropriétaire ou locataire peut faire installer une borne à sa place de stationnement, sous réserve de notification au syndic. AFFRA Réseaux accompagne les copropriétés dans toutes les démarches administratives et techniques, de la demande en AG à la mise en service.",
  },
  {
    question: 'Quelle différence entre une Wallbox et une borne de recharge rapide ?',
    answer:
      "Une Wallbox (3,7 à 22 kW en courant alternatif) est conçue pour la recharge lente ou semi-rapide à domicile ou en entreprise — idéale pour une recharge nocturne ou pendant les heures de travail. Une borne rapide (de 50 à 350 kW en courant continu) est destinée aux espaces publics ou aux flottes professionnelles nécessitant une recharge en moins d'une heure. AFFRA Réseaux installe ces deux types selon vos besoins.",
  },
]

const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Réalisations IRVE — AFFRA Réseaux',
  description:
    'Galerie des installations de bornes de recharge réalisées par AFFRA Réseaux en Occitanie et PACA',
  image: [
    {
      '@type': 'ImageObject',
      contentUrl: 'https://affra-reseaux.fr/images/realisations/galerie-01.webp',
      description: 'Installation borne de recharge IRVE Occitanie — pose Wallbox particulier',
    },
    {
      '@type': 'ImageObject',
      contentUrl: 'https://affra-reseaux.fr/images/realisations/galerie-02.webp',
      description: 'Pose borne de recharge voiture électrique PACA par installateur certifié IRVE',
    },
    {
      '@type': 'ImageObject',
      contentUrl: 'https://affra-reseaux.fr/images/realisations/galerie-03.webp',
      description: 'Raccordement tableau électrique borne IRVE — chantier Nîmes Gard',
    },
    {
      '@type': 'ImageObject',
      contentUrl: 'https://affra-reseaux.fr/images/realisations/galerie-04.webp',
      description: 'Installation Wallbox 11 kW chez particulier en Occitanie',
    },
    {
      '@type': 'ImageObject',
      contentUrl: 'https://affra-reseaux.fr/images/realisations/galerie-05.webp',
      description: 'Chantier borne de recharge Marseille Bouches-du-Rhône AFFRA Réseaux',
    },
    {
      '@type': 'ImageObject',
      contentUrl: 'https://affra-reseaux.fr/images/realisations/galerie-06.webp',
      description: 'Pose borne IRVE Montpellier Hérault — installation certifiée',
    },
    {
      '@type': 'ImageObject',
      contentUrl: 'https://affra-reseaux.fr/images/realisations/galerie-07.webp',
      description: 'Installation borne recharge Toulouse Haute-Garonne voiture électrique',
    },
  ],
  provider: {
    '@type': 'LocalBusiness',
    name: 'AFFRA Réseaux',
    url: 'https://affra-reseaux.fr',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Occitanie' },
      { '@type': 'AdministrativeArea', name: 'Provence-Alpes-Côte d\'Azur' },
    ],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default async function RealisationsPage() {
  const items = await getPortfolioItems().catch(() => [])

  return (
    <>
      <SchemaOrg schema={gallerySchema} />
      <SchemaOrg schema={faqSchema} />

      <PageHero
        imageSrc="/images/hero/realisations-hero.webp"
        imageAlt="Réalisations AFFRA Réseaux — installations de bornes de recharge IRVE en Occitanie et PACA"
        title="Nos réalisations"
        subtitle="Installateur IRVE certifié — Occitanie &amp; PACA"
      />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'Réalisations' },
            ]}
          />
        </div>
      </div>

      <RealisationsStats />

      <RealisationsAvantApres />

      <RealisationsGallery />

      {items.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <RealisationCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <RealisationsSeoText />

      <ServiceFAQ items={faqItems} />

      <CTABand />
    </>
  )
}
