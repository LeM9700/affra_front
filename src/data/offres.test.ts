import assert from 'node:assert/strict'
import { test } from 'node:test'

import { COLONNES_OFFRES, OFFRE_RECOMMANDEE, OFFRES, ORDRE_OFFRES } from './offres.ts'

test('trois emplacements, chaque offre affichée une seule fois', () => {
  assert.equal(COLONNES_OFFRES.length, 3)
  assert.equal(new Set(ORDRE_OFFRES).size, Object.keys(OFFRES).length)
})

test('la recommandation est seule dans la colonne centrale', () => {
  assert.deepEqual(COLONNES_OFFRES[1], [OFFRE_RECOMMANDEE])
  assert.equal(OFFRES[OFFRE_RECOMMANDEE].badgeVariante, 'recommandation')
})

test('La Borne Tricolore ouvre le rouleau et reste affichée plus longtemps que la V2C Trydan', () => {
  const rouleau = COLONNES_OFFRES[2]
  assert.equal(rouleau[0], 'la-borne-tricolore')
  assert.ok(
    (OFFRES['la-borne-tricolore'].dureeAffichageMs ?? 0) > (OFFRES['v2c-trydan'].dureeAffichageMs ?? 0),
  )
})

test('chaque identifiant correspond à sa clé (ancres /offres#id)', () => {
  for (const [cle, offre] of Object.entries(OFFRES)) assert.equal(offre.id, cle)
})
