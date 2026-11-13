import assert from 'node:assert/strict'
import { test } from 'node:test'

import { getCityBySlug } from '../../data/villes-seo.ts'
import { serializeJsonLd } from './json-ld.ts'
import {
  buildCityElectricianSchema,
  buildCityServiceSchema,
  buildFaqPageSchema,
  cityPageUrl,
} from './local-business.ts'

const aimargues = getCityBySlug('aimargues')!

test('type Electrician, URL canonique absolue, téléphone, priceRange, geo du siège', () => {
  const schema = buildCityElectricianSchema(aimargues)
  assert.equal(schema['@type'], 'Electrician')
  assert.equal(schema.url, 'https://affra-reseaux.fr/zone-intervention/aimargues')
  assert.equal(schema.telephone, '+33766304687')
  assert.equal(schema.priceRange, '€€')
  assert.deepEqual(schema.geo, { '@type': 'GeoCoordinates', latitude: 43.8367, longitude: 4.3601 })
})

test('areaServed : la commune (avec geo et code postal) et son département', () => {
  const [cityArea, department] = buildCityElectricianSchema(aimargues).areaServed
  assert.equal(cityArea['@type'], 'City')
  assert.equal(cityArea.name, 'Aimargues')
  assert.equal(cityArea.postalCode, '30470')
  assert.deepEqual(cityArea.containedInPlace, { '@type': 'AdministrativeArea', name: 'Gard', identifier: '30' })
  assert.deepEqual(department, { '@type': 'AdministrativeArea', name: 'Gard', identifier: '30' })
})

test('aggregateRating absent par défaut, présent seulement avec des avis réels', () => {
  assert.equal('aggregateRating' in buildCityElectricianSchema(aimargues), false)
  assert.equal(
    'aggregateRating' in buildCityElectricianSchema(aimargues, { aggregateRating: { ratingValue: 5, reviewCount: 0 } }),
    false,
  )
  const withRating = buildCityElectricianSchema(aimargues, { aggregateRating: { ratingValue: 4.86, reviewCount: 12 } })
  assert.deepEqual(withRating.aggregateRating, {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12',
    bestRating: '5',
    worstRating: '1',
  })
})

test('Service rattaché à l’Electrician de la page', () => {
  assert.deepEqual(buildCityServiceSchema(aimargues).provider, { '@id': `${cityPageUrl(aimargues)}#electrician` })
})

test('FAQPage reprend exactement la FAQ affichée ; null si vide', () => {
  const faq = buildFaqPageSchema(aimargues.faq)!
  assert.equal(faq.mainEntity.length, aimargues.faq.length)
  assert.equal(faq.mainEntity[0].name, aimargues.faq[0].question)
  assert.equal(faq.mainEntity[0].acceptedAnswer.text, aimargues.faq[0].answer)
  assert.equal(buildFaqPageSchema([]), null)
})

test('injection via les données de la ville neutralisée à la sérialisation', () => {
  const payload = '</script><script>alert(1)</script>'
  const evil = { ...aimargues, name: payload, faq: [{ question: payload, answer: payload }] }
  for (const schema of [buildCityElectricianSchema(evil), buildCityServiceSchema(evil), buildFaqPageSchema(evil.faq)]) {
    const out = serializeJsonLd(schema)
    assert.doesNotMatch(out, /<\/?script/i)
    assert.deepEqual(JSON.parse(out), schema)
  }
})
