import assert from 'node:assert/strict'
import { test } from 'node:test'

import { buildWebsiteSchema } from './website.ts'

test('nom du site en graphie exacte, URL de la page d’accueil et éditeur relié', () => {
  const schema = buildWebsiteSchema({ name: 'AFFRA RESEAUX', url: 'https://affra-reseaux.fr', organizationId: 'https://affra-reseaux.fr/#organization' })
  assert.equal(schema['@type'], 'WebSite')
  assert.equal(schema.name, 'AFFRA RESEAUX')
  assert.equal(schema.url, 'https://affra-reseaux.fr/')
  assert.equal(schema['@id'], 'https://affra-reseaux.fr/#website')
  assert.deepEqual(schema.publisher, { '@id': 'https://affra-reseaux.fr/#organization' })
})
