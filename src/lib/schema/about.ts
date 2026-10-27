import type { MembreEquipe } from '@/data/equipe'

/** Identité de l'entreprise injectée dans le schéma (voir src/lib/schema/organization.ts). */
export interface OrganisationSchema {
  id: string
  name: string
  url: string
  address: Record<string, unknown>
  areaServed: readonly Record<string, unknown>[]
  sameAs: readonly string[]
}

/**
 * `@id` schema.org d'un membre de l'équipe.
 *
 * @param siteUrl - URL racine du site.
 * @param id - Identifiant du membre.
 * @returns URL absolue servant d'identifiant unique.
 */
export function personId(siteUrl: string, id: string): string {
  return `${siteUrl}/a-propos#${id}`
}

function personSchema(membre: MembreEquipe, org: OrganisationSchema) {
  return {
    '@type': 'Person',
    '@id': personId(org.url, membre.id),
    name: membre.nom ? `${membre.prenom} ${membre.nom}` : membre.prenom,
    givenName: membre.prenom,
    ...(membre.nom && { familyName: membre.nom }),
    jobTitle: membre.role,
    worksFor: { '@id': org.id },
    ...(membre.photo && { image: `${org.url}${membre.photo}` }),
    ...(membre.diplomes.length > 0 && {
      hasCredential: membre.diplomes.map((diplome) => ({
        '@type': 'EducationalOccupationalCredential',
        name: diplome,
        credentialCategory: 'Diplôme',
      })),
    }),
    knowsAbout: membre.expertises,
    // Profil LinkedIn : relie la personne à une identité vérifiable (signal d'expertise).
    ...(membre.linkedin && { sameAs: [membre.linkedin] }),
  }
}

/**
 * Données structurées de la page « Qui sommes-nous ? » : la page, l'entreprise et chaque
 * membre de l'équipe, reliés entre eux par leurs `@id`.
 *
 * @param equipe - Membres de l'équipe (source : src/data/equipe.ts).
 * @param org - Identité de l'entreprise, partagée avec l'accueil (même `@id`).
 * @returns Un document JSON-LD `@graph`.
 */
export function buildAboutPageSchema(equipe: readonly MembreEquipe[], org: OrganisationSchema) {
  const pageUrl = `${org.url}/a-propos`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${pageUrl}#page`,
        url: pageUrl,
        name: `Qui sommes-nous ? – ${org.name}`,
        inLanguage: 'fr-FR',
        about: { '@id': org.id },
        mainEntity: { '@id': org.id },
      },
      {
        '@type': ['LocalBusiness', 'ElectricalContractor'],
        '@id': org.id,
        name: org.name,
        url: org.url,
        foundingDate: '2024',
        address: org.address,
        areaServed: org.areaServed,
        founder: equipe.filter((m) => m.fondateur).map((m) => ({ '@id': personId(org.url, m.id) })),
        employee: equipe.map((m) => ({ '@id': personId(org.url, m.id) })),
        numberOfEmployees: { '@type': 'QuantitativeValue', value: equipe.length },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Qualification IRVE',
          credentialCategory: 'Qualification professionnelle',
          recognizedBy: { '@type': 'Organization', name: 'AFNOR Certification' },
        },
        knowsAbout: [
          'Installation de bornes de recharge',
          'Infrastructure de recharge pour véhicules électriques (IRVE)',
          'Prise renforcée',
          'Véhicule électrique',
        ],
        sameAs: org.sameAs,
      },
      ...equipe.map((m) => personSchema(m, org)),
    ],
  }
}
