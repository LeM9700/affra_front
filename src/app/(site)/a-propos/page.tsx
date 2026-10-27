import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle, ClipboardCheck, Wrench, PlugZap, Headset, Award, CircleCheck } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import Breadcrumb from '@/components/shared/Breadcrumb'
import SectionTitle from '@/components/shared/SectionTitle'
import SchemaOrg from '@/components/shared/SchemaOrg'
import TeamTabs from '@/components/apropos/TeamTabs'
import { EQUIPE } from '@/data/equipe'
import { DEVIS_HREF } from '@/lib/devis/projet'
import { GOOGLE_REVIEWS_URL } from '@/lib/contact'
import { buildAboutPageSchema } from '@/lib/schema/about'
import {
  ORGANIZATION_ADDRESS,
  ORGANIZATION_AREA_SERVED,
  ORGANIZATION_ID,
  ORGANIZATION_NAME,
  ORGANIZATION_SAME_AS,
  SITE_URL,
} from '@/lib/schema/organization'
import { buildMetadata } from '@/lib/utils/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Qui sommes-nous ? Installateur de bornes à Nîmes',
  description:
    'AFFRA RESEAUX, entreprise qualifiée IRVE basée à Nîmes : découvrez notre histoire, notre méthode et l’équipe qui installe vos bornes de recharge dans le Gard et l’Hérault.',
  path: '/a-propos',
})

const lien = 'font-semibold text-[#29B4C5] underline-offset-4 hover:underline'

const METHODE = [
  {
    Icon: MessageCircle,
    titre: 'Tout commence par l’écoute',
    texte:
      'Dès le premier contact, nous prenons le temps de comprendre les habitudes de déplacement du client, son véhicule, ses besoins de recharge et les caractéristiques de son logement, notamment la présence éventuelle de panneaux photovoltaïques.',
  },
  {
    Icon: ClipboardCheck,
    titre: 'Une visite technique gratuite et complète',
    texte:
      'Nous examinons les conditions d’installation, les protections électriques existantes, la prise de terre et les éventuelles adaptations à prévoir, puis définissons avec le client le cheminement des câbles et l’emplacement le plus adapté. Cette préparation nous permet de proposer un devis détaillé et cohérent, généralement transmis sous 24 heures après la visite.',
  },
  {
    Icon: Wrench,
    titre: 'Des finitions soignées',
    texte: null, // contenu avec liens internes, rendu ci-dessous
  },
  {
    Icon: PlugZap,
    titre: 'Une mise en service accompagnée',
    texte:
      'Avant de terminer, nous vérifions le fonctionnement de la borne, configurons ses principales fonctionnalités et accompagnons le client dans sa prise en main. Le chantier est ensuite nettoyé.',
  },
  {
    Icon: Headset,
    titre: 'Un interlocuteur, même après les travaux',
    texte:
      'Nos clients peuvent continuer à échanger directement avec Sofiane ou Bechir s’ils ont une question ou rencontrent une difficulté. Parce qu’un accompagnement de qualité ne doit pas s’arrêter à la fin des travaux.',
  },
]

function Finitions() {
  return (
    <>
      Cheminements soignés, percements rebouchés et étanchéifiés, équipements électriques de marques reconnues
      (prise renforcée{' '}
      <Link href="/offres#green-up-legrand" className={lien}>Green’up de Legrand</Link>, bornes{' '}
      <Link href="/offres#dazebox-home-t" className={lien}>DazeBox Home T</Link> et{' '}
      <Link href="/offres#v2c-trydan" className={lien}>V2C Trydan</Link>) et solutions adaptées à l’esthétique du
      logement.{' '}
      <Link href="/realisations" className={lien}>Voir nos réalisations dans le Gard</Link>.
    </>
  )
}

const aboutSchema = buildAboutPageSchema(EQUIPE, {
  id: ORGANIZATION_ID,
  name: ORGANIZATION_NAME,
  url: SITE_URL,
  address: ORGANIZATION_ADDRESS,
  areaServed: ORGANIZATION_AREA_SERVED,
  sameAs: ORGANIZATION_SAME_AS,
})

export default function AProposPage() {
  return (
    <>
      <SchemaOrg schema={aboutSchema} />
      <PageHero
        imageSrc="/images/hero/a-propos-hero.webp"
        imageAlt="L’équipe AFFRA RESEAUX sur un chantier d’installation de borne de recharge"
        title="Qui sommes-nous ? AFFRA RESEAUX, installateur de bornes de recharge à Nîmes"
        subtitle="Une équipe de passionnés au service de votre projet, dans le Gard et l’Hérault."
      />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Qui sommes-nous ?' }]} />
        </div>
      </div>

      {/* Introduction + histoire */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-slate-700">
            Basée à Nîmes, AFFRA RESEAUX est une entreprise spécialisée dans l’installation de{' '}
            <Link href="/offres" className={lien}>bornes de recharge et de prises renforcées</Link> pour véhicules
            électriques, dans <Link href="/zone-intervention" className={lien}>le Gard et l’Hérault</Link>.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            Derrière chaque installation, il y a avant tout une équipe de trois professionnels aux parcours
            complémentaires, réunis autour d’une même conviction : un travail bien fait se reconnaît dans les détails.
          </p>

          <h2 className="mt-14 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Notre histoire : deux parcours, une même vision
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
            <p>
              L’histoire d’AFFRA RESEAUX commence en 2024, lorsque Sofiane Fazazi et Bechir Belghith décident d’unir leurs
              compétences pour créer une entreprise à leur image.
            </p>
            <p>
              D’un côté, six années d’expérience dans la coordination de travaux au sein d’une grande entreprise de
              télécommunications, avec des méthodes de travail rigoureuses et une solide connaissance du terrain. De
              l’autre, un parcours ancré dans les métiers du bâtiment et de l’électricité, ainsi qu’une expérience
              entrepreneuriale développée depuis 2017.
            </p>
            <p>
              Deux profils différents, mais une ambition commune : proposer une autre approche des travaux, où la qualité
              d’exécution, le respect du client et l’attention portée aux finitions passent avant la quantité de chantiers
              réalisés.
            </p>
          </div>
          <blockquote className="mt-8 rounded-2xl border-l-4 border-[#5BBF8A] bg-gradient-to-r from-[#5BBF8A]/10 to-transparent px-6 py-5 text-lg font-semibold leading-relaxed text-slate-800">
            Notre objectif depuis le premier jour : associer la rigueur et le professionnalisme des grandes entreprises à
            la proximité et à la souplesse d’une structure à taille humaine.
          </blockquote>
        </div>
      </section>

      {/* Mobilité électrique */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_360px] lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Pourquoi nous avons choisi la mobilité électrique
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-slate-600">
              <p>
                Passionnés par les nouvelles technologies et convaincus de l’avenir de la mobilité électrique, nous avons
                naturellement choisi de développer notre expertise dans l’installation de solutions de recharge. Cette
                spécialisation s’inscrit dans la continuité de nos expériences dans les réseaux, l’électricité et les
                installations techniques.
              </p>
              <p>
                Aujourd’hui, AFFRA RESEAUX est une entreprise qualifiée IRVE, qualification délivrée par AFNOR
                Certification. Notre équipe a également suivi les formations IRVE P1, P2 et P3 afin de développer ses
                compétences dans ce domaine.
              </p>
              <p>
                Notre ambition est simple : devenir un installateur de référence pour{' '}
                <Link href="/services/particuliers" className={lien}>les particuliers</Link> du Gard et de l’Hérault, sans
                jamais perdre ce qui fait notre identité : la proximité, le conseil et le travail soigné.
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-[#5BBF8A]/30 bg-white p-7 shadow-[var(--shadow-card)]">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5BBF8A] to-[#29ABE2]">
              <Award className="h-6 w-6 text-white" strokeWidth={1.75} aria-hidden />
            </span>
            <p className="mt-4 text-lg font-bold text-slate-900">Entreprise qualifiée IRVE</p>
            <p className="mt-1 text-sm text-slate-600">Qualification délivrée par AFNOR Certification.</p>
            <p className="mt-4 text-sm text-slate-600">Formations IRVE P1, P2 et P3 suivies par l’équipe.</p>
          </div>
        </div>
      </section>

      {/* Méthode */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Notre méthode"
            title="Notre différence se voit dans les détails"
            subtitle="Pour nous, une installation réussie ne se résume pas à fixer une borne au mur et à la raccorder électriquement."
            accentWord="dans les détails"
            size="md"
          />
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            {METHODE.map(({ Icon, titre, texte }) => (
              <div key={titre} className="w-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[var(--shadow-sm)] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#5BBF8A]/15 to-[#29ABE2]/10">
                  <Icon className="h-5 w-5 text-[#29B4C5]" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-4 font-bold leading-snug text-slate-900">{titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{texte ?? <Finitions />}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Nos garanties</h2>
          <ul className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Entreprise qualifiée IRVE, qualification délivrée par AFNOR Certification',
              'Assurance responsabilité civile décennale',
              'Visite technique gratuite et sans engagement',
            ].map((garantie) => (
              <li key={garantie} className="flex items-start gap-3 rounded-2xl bg-white p-5 text-sm font-medium text-slate-700 shadow-[var(--shadow-sm)]">
                <CircleCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#5BBF8A]" aria-hidden />
                {garantie}
              </li>
            ))}
            <li className="flex items-start gap-3 rounded-2xl bg-white p-5 text-sm font-medium text-slate-700 shadow-[var(--shadow-sm)]">
              <CircleCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#5BBF8A]" aria-hidden />
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className={lien}>
                Avis clients publiés sur Google
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Équipe */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Notre équipe"
            title="Trois parcours complémentaires, une exigence commune"
            subtitle="AFFRA RESEAUX, c’est avant tout une équipe de trois professionnels qui partagent la même vision du métier. Chacun apporte son expérience et son savoir-faire pour assurer une prise en charge complète des projets, de la première visite jusqu’à la mise en service."
            accentWord="une exigence commune"
            size="md"
          />
          <div className="mt-12">
            <TeamTabs equipe={EQUIPE} />
          </div>
        </div>
      </section>

      {/* Appel final (remplace le bandeau générique sur cette page) */}
      <section className="bg-white pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#5BBF8A]/25 bg-gradient-to-br from-[#5BBF8A]/10 to-[#29ABE2]/10 px-6 py-10 text-center sm:px-12">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Un projet de borne de recharge à Nîmes, dans le Gard ou l’Hérault ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600">
              Vous recherchez un installateur qualifié IRVE ? Notre équipe vous accompagne pour choisir une solution
              adaptée à votre véhicule, à votre installation électrique et à vos habitudes de recharge. Échangeons sur
              votre projet : la visite technique est gratuite et sans engagement.
            </p>
            <Link
              href={DEVIS_HREF.particulier}
              className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#5BBF8A] to-[#29ABE2] px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 sm:w-auto"
              style={{ boxShadow: 'var(--shadow-green)' }}
            >
              Demander ma visite technique gratuite
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
