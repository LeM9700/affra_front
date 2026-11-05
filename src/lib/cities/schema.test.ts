import assert from 'node:assert/strict'
import { test } from 'node:test'

import { parseCities, type CityInput } from './schema.ts'

function city(overrides: Partial<CityInput> = {}): CityInput {
  return {
    slug: 'nimes',
    name: 'Nîmes',
    department: '30',
    departmentName: 'Gard',
    postalCode: '30000',
    geo: { latitude: 43.83, longitude: 4.36 },
    metaDescription: 'Borne de recharge à Nîmes : installation IRVE pour particuliers et pros. Devis gratuit.',
    intro: 'Intro',
    coveredAreas: [],
    faq: [],
    nearbyCities: [],
    ...overrides,
  }
}

test('données valides : localProjects vaut [] par défaut', () => {
  const [parsed] = parseCities([city()], [])
  assert.deepEqual(parsed.localProjects, [])
})

test('refuse un département hors zone et un code postal incohérent', () => {
  assert.throws(() => parseCities([city({ department: '13' as '30' })], []), /department/)
  assert.throws(() => parseCities([city({ postalCode: '13200' })], []), /postalCode/)
})

test('refuse une meta description de plus de 155 caractères', () => {
  assert.throws(() => parseCities([city({ metaDescription: 'x'.repeat(156) })], []), /nimes\.metaDescription/)
})

test('refuse un slug en double, un voisin inconnu ou soi-même, une réalisation inconnue', () => {
  assert.throws(() => parseCities([city(), city()], []), /Slug en double/)
  assert.throws(() => parseCities([city({ nearbyCities: ['ales'] })], []), /Voisin invalide : ales/)
  assert.throws(() => parseCities([city({ nearbyCities: ['nimes'] })], []), /Voisin invalide : nimes/)
  assert.throws(() => parseCities([city({ localProjects: ['inconnu'] })], ['vauvert']), /Réalisation inconnue/)
})
