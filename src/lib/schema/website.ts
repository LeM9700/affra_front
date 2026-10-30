/**
 * Données structurées `WebSite` de la page d'accueil.
 *
 * C'est la source que Google privilégie pour le « nom du site » affiché dans les résultats
 * (sinon il le devine, souvent d'après la recherche tapée : « affra reseaux » en minuscules).
 * Doc Google : « Provide a site name » — WebSite sur la page d'accueil, avec `name` et `url`.
 */
export interface WebsiteIdentity {
  name: string
  url: string
  organizationId: string
}

/**
 * Construit le JSON-LD `WebSite`.
 *
 * @param identity Nom exact du site (graphie de la marque), URL de la page d'accueil, `@id` de l'entreprise.
 * @returns L'objet JSON-LD à sérialiser.
 */
export function buildWebsiteSchema(identity: WebsiteIdentity) {
  const url = identity.url.endsWith('/') ? identity.url : `${identity.url}/`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}#website`,
    name: identity.name,
    url,
    inLanguage: 'fr-FR',
    publisher: { '@id': identity.organizationId },
  }
}
