import assert from 'node:assert/strict'
import { test } from 'node:test'

import { extractFaq } from './faq.ts'

const article = `## Introduction

### Pas une question de FAQ

Texte.

## Questions fréquentes

### Quel est le prix d'une borne ?

Comptez **1 250 €** posée, voir [nos offres](/offres).

Deuxième paragraphe.

### Question sans réponse ?

### Faut-il un vote en AG ?

Non.

## Contact

### Hors FAQ

Texte.
`

test('extrait uniquement les questions de la section FAQ, en texte brut', () => {
  assert.deepEqual(extractFaq(article), [
    {
      question: "Quel est le prix d'une borne ?",
      answer: 'Comptez 1 250 € posée, voir nos offres. Deuxième paragraphe.',
    },
    { question: 'Faut-il un vote en AG ?', answer: 'Non.' },
  ])
})

test('aucune FAQ sans section dédiée', () => {
  assert.deepEqual(extractFaq('## Titre\n\n### Question ?\n\nRéponse.'), [])
  assert.deepEqual(extractFaq(''), [])
})

test('accepte le titre « FAQ »', () => {
  assert.equal(extractFaq('## FAQ\n\n### Q ?\n\nR.').length, 1)
})
