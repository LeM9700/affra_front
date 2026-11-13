import assert from 'node:assert/strict'
import { test } from 'node:test'

import { cities } from '../../data/villes-seo.ts'
import { buildCitySitemapEntries } from './sitemap.ts'

test('le sitemap contient une entrée par page ville, aucune omise', () => {
  const urls = buildCitySitemapEntries('https://affra-reseaux.fr', cities).map((e) => e.url)
  assert.equal(urls.length, cities.length)
  assert.equal(new Set(urls).size, urls.length)
  assert.ok(urls.includes('https://affra-reseaux.fr/zone-intervention/aimargues'))
  assert.ok(urls.includes('https://affra-reseaux.fr/zone-intervention/saint-genies-de-malgoires'))
})
