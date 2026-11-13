import assert from 'node:assert/strict'
import { test } from 'node:test'

import { cities, getCityBySlug } from '../../data/villes-seo.ts'
import { selectNearbyCities } from './nearby.ts'
import type { City } from './schema.ts'

const slugs = (list: City[]) => list.map((c) => c.slug)

test('utilise nearbyCities dans l’ordre déclaré', () => {
  const nimes = getCityBySlug('nimes')!
  assert.deepEqual(slugs(selectNearbyCities(nimes, cities)), nimes.nearbyCities)
})

test('repli : même département, du plus proche au plus éloigné', () => {
  const nimes = { ...getCityBySlug('nimes')!, nearbyCities: [] }
  const result = selectNearbyCities(nimes, cities)
  assert.equal(result.length, 4)
  assert.ok(result.every((c) => c.department === '30'))
  assert.equal(result[0].slug, 'garons') // 10 km, la plus proche
})

test('complète une liste trop courte et ignore les slugs inconnus ou la ville elle-même', () => {
  const lunel = { ...getCityBySlug('lunel')!, nearbyCities: ['montpellier', 'inconnue', 'lunel', 'montpellier'] }
  const result = selectNearbyCities(lunel, cities)
  assert.equal(result[0].slug, 'montpellier')
  assert.equal(result.length, 4)
  assert.ok(!slugs(result).includes('lunel'))
  assert.equal(new Set(slugs(result)).size, result.length)
  assert.ok(result.slice(1).every((c) => c.department === '34'))
})

test('jamais plus de 5 liens, toujours au moins 4 sur les données réelles', () => {
  for (const city of cities) {
    const n = selectNearbyCities(city, cities).length
    assert.ok(n >= 4 && n <= 5, `${city.slug}: ${n}`)
  }
})
