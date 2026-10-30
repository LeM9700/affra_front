import assert from 'node:assert/strict'
import { test } from 'node:test'

import { formatPrixTtc } from './prix.ts'

const normaliser = (s: string) => s.replace(/[  ]/g, ' ')

test('formate les milliers et l’euro à la française, sans décimales', () => {
  assert.equal(normaliser(formatPrixTtc(1290)), '1 290 €')
  assert.equal(normaliser(formatPrixTtc(499)), '499 €')
})

test('utilise des espaces insécables pour ne jamais couper le prix', () => {
  assert.doesNotMatch(formatPrixTtc(1290), / /)
})
