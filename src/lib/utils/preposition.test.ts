import assert from 'node:assert/strict'
import { test } from 'node:test'

import { aVille, deVille } from './preposition.ts'

test('contracte « Le » et « Les »', () => {
  assert.equal(aVille('Le Grau-du-Roi'), 'au Grau-du-Roi')
  assert.equal(deVille('Le Grau-du-Roi'), 'du Grau-du-Roi')
  assert.equal(aVille('Les Angles'), 'aux Angles')
  assert.equal(deVille('Les Angles'), 'des Angles')
})

test('laisse les autres noms intacts', () => {
  assert.equal(aVille('Nîmes'), 'à Nîmes')
  assert.equal(deVille('Nîmes'), 'de Nîmes')
  assert.equal(aVille('La Grande-Motte'), 'à La Grande-Motte')
  assert.equal(aVille('Lecques'), 'à Lecques')
})

test('élide « de » devant une voyelle, accentuée ou non', () => {
  assert.equal(deVille('Alès'), 'd’Alès')
  assert.equal(deVille('Uzès'), 'd’Uzès')
  assert.equal(deVille('Aigues-Vives'), 'd’Aigues-Vives')
  assert.equal(deVille('Éguilles'), 'd’Éguilles')
})
