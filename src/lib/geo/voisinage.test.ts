import assert from 'node:assert/strict'
import { test } from 'node:test'

import { REALISATIONS } from '../../data/realisations.ts'
import { villesSeo } from '../../data/villes-seo.ts'
import { CHANTIERS_MAX_KM, buildVoisinage, distanceKm, nearest, roundKm } from './voisinage.ts'

const base = { lat: 43.8367, lng: 4.3601 }
const ville = (slug: string) => villesSeo.find((v) => v.slug === slug)!

test('chaque page ville propose des villes voisines, jamais elle-même', () => {
  for (const v of villesSeo) {
    const { villesProches } = buildVoisinage(v, villesSeo, REALISATIONS, base)
    assert.equal(villesProches.length, 4, v.slug)
    assert.ok(villesProches.every(({ item }) => item.slug !== v.slug), v.slug)
  }
})

test('la ville de départ n’affiche pas de distance', () => {
  assert.equal(buildVoisinage(ville('nimes'), villesSeo, REALISATIONS, base).distanceBaseKm, null)
  assert.equal(buildVoisinage(ville('montpellier'), villesSeo, REALISATIONS, base).distanceBaseKm, 45)
})

test('le chantier de la commune passe en premier', () => {
  const { chantiers } = buildVoisinage(ville('vauvert'), villesSeo, REALISATIONS, base)
  assert.equal(chantiers[0].item.id, 'vauvert')
  assert.ok(chantiers[0].km < 1)
})

test('aucun chantier lointain présenté comme « proche »', () => {
  for (const v of villesSeo) {
    const { chantiers } = buildVoisinage(v, villesSeo, REALISATIONS, base)
    assert.ok(chantiers.every(({ km }) => km <= CHANTIERS_MAX_KM), v.slug)
  }
  assert.equal(buildVoisinage(ville('beziers'), villesSeo, REALISATIONS, base).chantiers.length, 0)
})

test('les données sources ont des slugs uniques', () => {
  assert.equal(new Set(villesSeo.map((v) => v.slug)).size, villesSeo.length)
})

const nimes = base
const montpellier = { lat: 43.6108, lng: 3.8767 }

test('distance Nîmes–Montpellier cohérente (≈ 45 km à vol d’oiseau)', () => {
  const km = distanceKm(nimes, montpellier)
  assert.ok(km > 43 && km < 47, `distance inattendue : ${km}`)
})

test('distance nulle et symétrique', () => {
  assert.equal(distanceKm(nimes, nimes), 0)
  assert.equal(distanceKm(nimes, montpellier), distanceKm(montpellier, nimes))
})

test('nearest trie, exclut, filtre par distance et limite', () => {
  const points = [
    { id: 'loin', lat: 44.5, lng: 4.3 },
    { id: 'origine', ...nimes },
    { id: 'proche', lat: 43.8, lng: 4.35 },
    { id: 'moyen', lat: 43.7, lng: 4.2 },
  ]
  const result = nearest(nimes, points, { exclude: (p) => p.id === 'origine', maxKm: 50, limit: 5 })
  assert.deepEqual(
    result.map((r) => r.item.id),
    ['proche', 'moyen'],
  )
  assert.equal(nearest(nimes, points, { limit: 1 })[0].item.id, 'origine')
})

test('roundKm reste honnête sur la précision', () => {
  assert.equal(roundKm(0.2), 1)
  assert.equal(roundKm(7.6), 8)
  assert.equal(roundKm(12.4), 10)
  assert.equal(roundKm(43.9), 45)
})
