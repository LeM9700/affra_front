import assert from 'node:assert/strict'
import { test } from 'node:test'

import { resolveSiteEnv } from './site-env.ts'

test('preview uniquement sur valeur explicite', () => {
  assert.equal(resolveSiteEnv('preview'), 'preview')
  assert.equal(resolveSiteEnv(' Preview '), 'preview')
})

test('production par défaut, y compris variable absente ou inconnue', () => {
  assert.equal(resolveSiteEnv(undefined), 'production')
  assert.equal(resolveSiteEnv(''), 'production')
  assert.equal(resolveSiteEnv('production'), 'production')
  assert.equal(resolveSiteEnv('staging'), 'production')
  assert.equal(resolveSiteEnv('prod'), 'production')
})
