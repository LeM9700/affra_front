import assert from 'node:assert/strict'
import { test } from 'node:test'

import { REALISATIONS } from '../../data/realisations.ts'
import { getCityBySlug } from '../../data/villes-seo.ts'
import { formatProjectLocation, resolveCityProjects } from './projects.ts'

test('chantier voisin : vraie commune et distance arrondie', () => {
  const projects = resolveCityProjects(getCityBySlug('aimargues')!, REALISATIONS)
  assert.deepEqual(
    projects.map(formatProjectLocation),
    ['Chantier à Vauvert, à 5 km', 'Chantier à Aigues-Vives, à 7 km'],
  )
})

test('chantier dans la commune même : pas de distance', () => {
  const [first] = resolveCityProjects(getCityBySlug('vauvert')!, REALISATIONS)
  assert.equal(first.isSameCity, true)
  assert.equal(formatProjectLocation(first), 'Chantier à Vauvert')
})

test('ville sans réalisation : liste vide', () => {
  assert.deepEqual(resolveCityProjects(getCityBySlug('beziers')!, REALISATIONS), [])
})
