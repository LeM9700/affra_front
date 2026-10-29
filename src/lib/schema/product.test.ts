import assert from 'node:assert/strict'
import { test } from 'node:test'

import { buildProductSchema } from './product.ts'

const base = {
  titre: 'Borne',
  marque: 'Marque',
  descriptionSchema: 'Description',
  image: '/images/borne.webp',
  prixTtc: 1290,
}

test('déclare le prix « à partir de » et une image absolue', () => {
  const schema = buildProductSchema(base, 'https://exemple.test', 'EXEMPLE')
  assert.equal(schema.image, 'https://exemple.test/images/borne.webp')
  assert.equal(schema.offers.price, '1290')
  assert.equal(schema.offers.priceSpecification.minPrice, '1290')
  assert.equal(schema.offers.seller.name, 'EXEMPLE')
})

test('déclare l’origine France uniquement pour un produit fabriqué en France', () => {
  assert.equal('countryOfOrigin' in buildProductSchema(base, 'https://exemple.test', 'EXEMPLE'), false)
  const fr = buildProductSchema({ ...base, fabriqueEnFrance: true }, 'https://exemple.test', 'EXEMPLE')
  assert.deepEqual(fr.countryOfOrigin, { '@type': 'Country', name: 'France' })
})
