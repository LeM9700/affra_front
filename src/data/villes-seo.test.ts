import assert from 'node:assert/strict'
import { test } from 'node:test'

import { REALISATIONS } from './realisations.ts'
import { cities, getCityBySlug } from './villes-seo.ts'

test('les deux communes sans lien ont désormais leur page', () => {
  assert.equal(getCityBySlug('aimargues')?.postalCode, '30470')
  assert.equal(getCityBySlug('saint-genies-de-malgoires')?.name, 'Saint-Geniès-de-Malgoirès')
})

test('chaque ville a 4 à 5 voisines', () => {
  for (const city of cities) {
    assert.ok(city.nearbyCities.length >= 4 && city.nearbyCities.length <= 5, city.slug)
  }
})

test('aucune page ville orpheline : chacune reçoit au moins un lien d’une autre ville', () => {
  const linked = new Set(cities.flatMap((city) => city.nearbyCities))
  for (const city of cities) assert.ok(linked.has(city.slug), `${city.slug} ne reçoit aucun lien`)
})

test('les réalisations référencées existent et sont toutes rattachées à au moins une ville', () => {
  const ids = new Set(REALISATIONS.map((r) => r.id))
  const used = new Set(cities.flatMap((city) => city.localProjects))
  for (const id of used) assert.ok(ids.has(id), id)
  for (const id of ids) assert.ok(used.has(id), `${id} n’apparaît sur aucune page ville`)
})
