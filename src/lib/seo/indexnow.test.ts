import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

import { INDEXNOW_ENDPOINT, INDEXNOW_KEY, buildIndexNowPayload, submitToIndexNow } from './indexnow.ts'

const SITE = 'https://affra-reseaux.fr'

test('le fichier de clé publié correspond à la constante', () => {
  assert.match(INDEXNOW_KEY, /^[a-f0-9]{32}$/)
  const published = readFileSync(new URL(`../../../public/${INDEXNOW_KEY}.txt`, import.meta.url), 'utf8')
  assert.equal(published.trim(), INDEXNOW_KEY)
})

test('ne garde que les URLs du site, sans doublons', () => {
  const payload = buildIndexNowPayload(SITE, [
    `${SITE}/blog/prix-borne`,
    `${SITE}/blog/prix-borne`,
    'https://autre-site.fr/page',
    'http://affra-reseaux.fr/http-non-securise',
    'pas une url',
    `${SITE}/zone-intervention/nimes`,
  ])
  assert.deepEqual(payload, {
    host: 'affra-reseaux.fr',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
    urlList: [`${SITE}/blog/prix-borne`, `${SITE}/zone-intervention/nimes`],
  })
})

test('aucun envoi sans URL valide', async () => {
  assert.equal(buildIndexNowPayload(SITE, ['https://autre-site.fr/']), null)
  let called = false
  const result = await submitToIndexNow(SITE, [], async () => {
    called = true
    return new Response(null, { status: 200 })
  })
  assert.equal(called, false)
  assert.deepEqual(result, { ok: false, status: null, submitted: 0 })
})

test('envoie le corps attendu et remonte le statut', async () => {
  let request: { url: string; body: unknown } | null = null
  const result = await submitToIndexNow(SITE, [`${SITE}/`], async (url, init) => {
    request = { url: String(url), body: JSON.parse(String(init?.body)) }
    return new Response(null, { status: 202 })
  })
  assert.deepEqual(result, { ok: true, status: 202, submitted: 1 })
  assert.equal(request!.url, INDEXNOW_ENDPOINT)
  assert.deepEqual((request!.body as { urlList: string[] }).urlList, [`${SITE}/`])
})

test('une erreur réseau ne lève pas d’exception', async () => {
  const result = await submitToIndexNow(SITE, [`${SITE}/`], async () => {
    throw new Error('réseau coupé')
  })
  assert.deepEqual(result, { ok: false, status: null, submitted: 0 })
})
