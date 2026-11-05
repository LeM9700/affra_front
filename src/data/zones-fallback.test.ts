import assert from 'node:assert/strict'
import { test } from 'node:test'

import { normalizeCityName } from '../lib/cities/zone-links.ts'
import { cities } from './villes-seo.ts'
import { FALLBACK_CITIES_BY_DEPARTMENT } from './zones-fallback.ts'

test('chaque commune de la liste de secours a une page ville dans le bon département', () => {
  const byName = new Map(cities.map((city) => [normalizeCityName(city.name), city]))
  for (const [department, names] of Object.entries(FALLBACK_CITIES_BY_DEPARTMENT)) {
    for (const name of names) {
      const city = byName.get(normalizeCityName(name))
      assert.ok(city, `« ${name} » n’a pas d’entrée dans villesSeo`)
      assert.equal(city.department, department, name)
      assert.equal(city.name, name, 'graphie identique à la page ville')
    }
  }
})
