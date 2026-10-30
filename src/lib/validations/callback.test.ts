import assert from 'node:assert/strict'
import { test } from 'node:test'

import { callbackSchema, normalizeFrenchPhone } from './callback.ts'

test('toutes les écritures courantes donnent le même numéro', () => {
  for (const raw of ['06 12 34 56 78', '0612345678', '06.12.34.56.78', '+33 6 12 34 56 78', '0033612345678', '(06) 12-34-56-78']) {
    assert.equal(normalizeFrenchPhone(raw), '+33612345678', raw)
  }
})

test('numéros invalides, spéciaux ou étrangers refusés', () => {
  for (const raw of ['', '06 12 34 56', '08 00 00 00 00', '+44 20 7946 0958', '06 12 34 56 7a', '00 12 34 56 78']) {
    assert.equal(normalizeFrenchPhone(raw), null, raw)
  }
})

test('demande valide : nom nettoyé et téléphone normalisé', () => {
  const parsed = callbackSchema.parse({ nom: '  Marie-Hélène   d’Arc ', telephone: '07 66 30 46 87', consent: true })
  assert.deepEqual(parsed, { nom: 'Marie-Hélène d’Arc', telephone: '+33766304687', consent: true })
})

test('consentement obligatoire, nom en lettres, téléphone français', () => {
  const base = { nom: 'Jean Dupont', telephone: '0612345678', consent: true }
  assert.equal(callbackSchema.safeParse({ ...base, consent: false }).success, false)
  assert.equal(callbackSchema.safeParse({ ...base, nom: 'http://spam.example' }).success, false)
  assert.equal(callbackSchema.safeParse({ ...base, nom: 'Jean2' }).success, false)
  assert.equal(callbackSchema.safeParse({ ...base, nom: 'J' }).success, false)
  assert.equal(callbackSchema.safeParse({ ...base, telephone: '0800000000' }).success, false)
})
