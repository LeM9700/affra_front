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

test('glissement lent : change de carte au-delà de 20 % de la carte', async () => {
  const { decisionGlisse } = await import('./rouleau.ts')
  assert.equal(decisionGlisse(-80, 360, 0.1), 1)
  assert.equal(decisionGlisse(80, 360, 0.1), -1)
  assert.equal(decisionGlisse(-60, 360, 0.1), null)
})

test('glissement lancé : un geste court mais rapide suffit, pas un micro-mouvement', async () => {
  const { decisionGlisse } = await import('./rouleau.ts')
  assert.equal(decisionGlisse(-40, 360, 0.8), 1)
  assert.equal(decisionGlisse(-10, 360, 2), null)
})
