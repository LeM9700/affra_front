import assert from 'node:assert/strict'
import { test } from 'node:test'

import { externalReferrer, hasAcquisitionSignal, landingPath, readTouchSignals } from './source.ts'
import { isValidVisitorId, randomUUID } from './visitor.ts'

const loc = (path: string, search = '') => ({ pathname: path, search, host: 'affra-reseaux.fr', hostname: 'affra-reseaux.fr' })

test('UTM Google Business are read as raw signals', () => {
  const s = readTouchSignals(loc('/', '?utm_source=google_business&utm_medium=organic_local'), '')
  assert.equal(s.utm_source, 'google_business')
  assert.equal(s.utm_medium, 'organic_local')
  assert.equal(s.landing_page, '/?utm_source=google_business&utm_medium=organic_local')
  assert.equal(hasAcquisitionSignal(s), true)
})

test('external referrer is kept without query string, internal one is ignored', () => {
  assert.equal(externalReferrer('https://www.google.com/search?q=dupont', 'affra-reseaux.fr'), 'https://www.google.com/search')
  assert.equal(externalReferrer('https://chatgpt.com/', 'affra-reseaux.fr'), 'https://chatgpt.com/')
  assert.equal(externalReferrer('https://www.affra-reseaux.fr/offres', 'affra-reseaux.fr'), undefined)
  assert.equal(externalReferrer('', 'affra-reseaux.fr'), undefined)
})

test('landing page drops non-attribution params (possible personal data)', () => {
  assert.equal(landingPath(loc('/devis', '?email=a@b.fr&utm_campaign=irve&gclid=abc')), '/devis?utm_campaign=irve&gclid=abc')
  assert.equal(landingPath(loc('/offres')), '/offres')
})

test('invalid click ids are ignored', () => {
  const s = readTouchSignals(loc('/', '?gclid=<script>'), '')
  assert.equal(s.gclid, undefined)
})

test('direct visit has no acquisition signal', () => {
  assert.equal(hasAcquisitionSignal(readTouchSignals(loc('/'), '')), false)
  assert.equal(hasAcquisitionSignal(readTouchSignals(loc('/'), 'https://affra-reseaux.fr/')), false)
})

test('visitor id is a random UUID v4', () => {
  const a = randomUUID()
  const b = randomUUID()
  assert.notEqual(a, b)
  assert.equal(isValidVisitorId(a), true)
  assert.equal(isValidVisitorId('not-a-uuid'), false)
  assert.equal(isValidVisitorId('../../etc'), false)
})
