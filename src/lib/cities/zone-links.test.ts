import assert from 'node:assert/strict'
import { test } from 'node:test'

import { createZoneLinkResolver, normalizeCityName, warnOnce } from './zone-links.ts'

const CITIES = [
  { slug: 'nimes', name: 'Nîmes' },
  { slug: 'saint-genies-de-malgoires', name: 'Saint-Geniès-de-Malgoirès' },
]

function setup() {
  const warnings: string[] = []
  return { warnings, resolve: createZoneLinkResolver(CITIES, (m) => warnings.push(m)) }
}

test('normalisation : accents, casse et espaces', () => {
  assert.equal(normalizeCityName('  SAINT-Geniès de Malgoirès '), 'saint-genies-de-malgoires')
})

test('liaison par slug : prioritaire et silencieuse', () => {
  const { resolve, warnings } = setup()
  assert.equal(resolve({ ville: 'Nimes (centre)', departement: '30', slug: 'nimes' }), 'nimes')
  assert.deepEqual(warnings, [])
})

test('zone sans slug : repli sur le nom normalisé avec avertissement', () => {
  const { resolve, warnings } = setup()
  assert.equal(resolve({ ville: 'Saint-Genies-de-Malgoires', departement: '30' }), 'saint-genies-de-malgoires')
  assert.equal(warnings.length, 1)
  assert.match(warnings[0], /sans slug/)
})

test('slug inconnu : repli sur le nom avec avertissement', () => {
  const { resolve, warnings } = setup()
  assert.equal(resolve({ ville: 'Nîmes', departement: '30', slug: 'nimes-centre' }), 'nimes')
  assert.match(warnings[0], /nimes-centre/)
})

test('zone sans page : pas de lien et avertissement', () => {
  const { resolve, warnings } = setup()
  assert.equal(resolve({ ville: 'Caveirac', departement: '30', slug: 'caveirac' }), null)
  assert.match(warnings[0], /n'a pas de page ville/)
})

test('warnOnce : un même avertissement n’est journalisé qu’une fois', (t) => {
  const warn = t.mock.method(console, 'warn', () => {})
  warnOnce('[zones] test-unique')
  warnOnce('[zones] test-unique')
  assert.equal(warn.mock.callCount(), 1)
})
