/** Données nécessaires pour déclarer une offre en `Product` (schema.org). */
export interface ProduitSchema {
  titre: string
  marque: string
  descriptionSchema: string
  image: string
  prixTtc: number
  fabriqueEnFrance?: boolean
}

/**
 * Construit le `Product` schema.org d'une offre, prix « à partir de » TTC pose comprise.
 *
 * @param produit Offre à déclarer.
 * @param baseUrl URL absolue du site, sans barre finale.
 * @param vendeur Nom de l'entreprise qui vend et installe.
 * @returns L'objet JSON-LD à sérialiser.
 */
export function buildProductSchema(produit: ProduitSchema, baseUrl: string, vendeur: string) {
  const prix = String(produit.prixTtc)
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: produit.titre,
    description: produit.descriptionSchema,
    image: `${baseUrl}${produit.image}`,
    brand: { '@type': 'Brand', name: produit.marque },
    ...(produit.fabriqueEnFrance ? { countryOfOrigin: { '@type': 'Country', name: 'France' } } : {}),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: prix,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: prix,
        priceCurrency: 'EUR',
      },
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'LocalBusiness', name: vendeur },
    },
  }
}
