import assert from 'node:assert/strict'
import { test } from 'node:test'

import { indexVoisin, sensVers } from './rouleau.ts'

test('tourne en boucle dans les deux sens', () => {
  assert.equal(indexVoisin(0, 2, 1), 1)
  assert.equal(indexVoisin(1, 2, 1), 0)
  assert.equal(indexVoisin(0, 2, -1), 1)
  assert.equal(indexVoisin(0, 3, -1), 2)
})

test('un rouleau d’un seul élément reste sur place', () => {
  assert.equal(indexVoisin(0, 1, 1), 0)
})

test('refuse un rouleau vide', () => {
  assert.throws(() => indexVoisin(0, 0, 1), RangeError)
})

test('choisit le sens le plus court, vers l’avant à égalité', () => {
  assert.equal(sensVers(0, 1, 2), 1)
  assert.equal(sensVers(1, 0, 2), 1)
  assert.equal(sensVers(0, 3, 4), -1)
  assert.equal(sensVers(0, 1, 4), 1)
})
