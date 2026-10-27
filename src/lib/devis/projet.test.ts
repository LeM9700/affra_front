import assert from 'node:assert/strict'
import { test } from 'node:test'

import { DEVIS_HREF, parseProjetParam } from './projet.ts'

test('accepte les trois types de projet connus', () => {
  assert.equal(parseProjetParam('maison'), 'maison')
  assert.equal(parseProjetParam('copropriete'), 'copropriete')
  assert.equal(parseProjetParam('entreprise'), 'entreprise')
})

test('ignore les valeurs absentes ou inconnues', () => {
  assert.equal(parseProjetParam(undefined), undefined)
  assert.equal(parseProjetParam(''), undefined)
  assert.equal(parseProjetParam('promoteur'), undefined)
  assert.equal(parseProjetParam('MAISON'), undefined)
})

test('prend la première valeur si le paramètre est répété', () => {
  assert.equal(parseProjetParam(['entreprise', 'maison']), 'entreprise')
  assert.equal(parseProjetParam(['inconnu', 'maison']), undefined)
})

test('les liens CTA pointent vers des valeurs valides', () => {
  for (const href of Object.values(DEVIS_HREF)) {
    const projet = new URL(href, 'https://example.test').searchParams.get('projet') ?? undefined
    assert.notEqual(parseProjetParam(projet), undefined)
  }
})
