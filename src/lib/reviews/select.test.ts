import assert from 'node:assert/strict'
import { test } from 'node:test'

import { selectDisplayReviews } from './select.ts'

const fallback = [
  { id: 'f1', author: 'A', rating: 5, text: 'a' },
  { id: 'f2', author: 'B', rating: 5, text: 'b' },
  { id: 'f3', author: 'C', rating: 5, text: 'c' },
]

function google(rating: number, text: string | undefined, name = 'X') {
  return {
    name: `n-${name}`,
    relativePublishTimeDescription: 'il y a 1 mois',
    rating,
    text: text === undefined ? undefined : { text, languageCode: 'fr' },
    authorAttribution: { displayName: name, uri: '', photoUri: '' },
  }
}

test('bascule sur le jeu vérifié quand Google est indisponible', () => {
  assert.deepEqual(selectDisplayReviews(null, fallback), fallback)
  assert.deepEqual(selectDisplayReviews(undefined, fallback), fallback)
  assert.deepEqual(selectDisplayReviews([], fallback), fallback)
})

test('ignore les avis Google sans texte', () => {
  const reviews = [google(5, 'ok', 'P1'), google(5, undefined, 'P2'), google(4, '   ', 'P3')]
  assert.deepEqual(selectDisplayReviews(reviews, fallback), fallback)
})

test('utilise Google quand au moins trois avis ont du texte, triés par note', () => {
  const reviews = [google(4, 'quatre', 'P1'), google(5, 'cinq-a', 'P2'), google(5, 'cinq-b', 'P3'), google(3, 'trois', 'P4')]
  const result = selectDisplayReviews(reviews, fallback)
  assert.deepEqual(result.map((r) => r.author), ['P2', 'P3', 'P1'])
  assert.equal(result.length, 3)
})

test('ne mélange jamais les deux sources', () => {
  const reviews = [google(5, 'seul', 'P1'), google(5, 'deux', 'P2')]
  const result = selectDisplayReviews(reviews, fallback)
  assert.deepEqual(result, fallback)
})

test('conserve le texte exact, sans réécriture', () => {
  const text = 'Très bien ! « Super »'
  const result = selectDisplayReviews([google(5, text, 'A'), google(5, text, 'B'), google(5, text, 'C')], fallback)
  assert.ok(result.every((r) => r.text === text))
})
