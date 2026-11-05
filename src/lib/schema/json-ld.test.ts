import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { serializeJsonLd } from './json-ld.ts'

const PAYLOAD = '</script><script>alert(1)</script>'

/** Reproduit exactement le rendu de <SchemaOrg> (le TSX n'est pas chargeable par node:test). */
function renderJsonLdScript(data: unknown): string {
  return renderToStaticMarkup(
    createElement('script', {
      type: 'application/ld+json',
      dangerouslySetInnerHTML: { __html: serializeJsonLd(data) },
    }),
  )
}

test('aucun caractère < > & brut dans la sortie', () => {
  const out = serializeJsonLd({ name: PAYLOAD, note: 'A & B > C' })
  assert.doesNotMatch(out, /[<>&]/)
  assert.match(out, /\\u003c\/script\\u003e/)
})

test('le JSON reste équivalent une fois parsé (Google lit les mêmes données)', () => {
  const data = { '@type': 'Electrician', name: PAYLOAD, list: ['a b', 'c d', 'é & ü'] }
  assert.deepEqual(JSON.parse(serializeJsonLd(data)), data)
})

test('U+2028 et U+2029 sont échappés', () => {
  const out = serializeJsonLd({ t: '  ' })
  assert.equal(out, '{"t":"\\u2028\\u2029"}')
})

test('injection neutralisée dans le HTML rendu : une seule balise <script> ouverte et fermée', () => {
  const html = renderJsonLdScript({ '@type': 'City', name: PAYLOAD })
  assert.equal(html.match(/<script/g)?.length, 1)
  assert.equal(html.match(/<\/script>/g)?.length, 1)
  assert.ok(html.endsWith('</script>'))
})

test('échappe aussi les clés et les valeurs imbriquées', () => {
  const out = serializeJsonLd({ [PAYLOAD]: { deep: [PAYLOAD] } })
  assert.doesNotMatch(out, /</)
})

test('refuse une valeur non sérialisable', () => {
  assert.throws(() => serializeJsonLd(undefined), TypeError)
})
