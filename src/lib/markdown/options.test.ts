import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ReactMarkdown from 'react-markdown'

import { ARTICLE_MARKDOWN_OPTIONS } from './options.ts'

/** Même rendu que <ArticleContent>, sans le wrapper de mise en forme. */
function render(markdown: string): string {
  return renderToStaticMarkup(createElement(ReactMarkdown, ARTICLE_MARKDOWN_OPTIONS, markdown))
}

test('une balise <script> dans le markdown n’est jamais rendue', () => {
  const html = render('Intro\n\n</script><script>alert(1)</script>\n\nFin')
  assert.doesNotMatch(html, /<script/i)
  assert.match(html, /Intro/)
  assert.match(html, /Fin/)
})

test('HTML brut avec gestionnaire d’événement ignoré', () => {
  const html = render('<img src="x" onerror="alert(1)">\n\n<div onclick="alert(1)">x</div>')
  assert.doesNotMatch(html, /onerror|onclick|<img|<div/i)
})

test('liens javascript: et data: neutralisés, liens https conservés', () => {
  const html = render('[a](javascript:alert(1)) [b](data:text/html,<script>alert(1)</script>) [c](https://affra-reseaux.fr)')
  assert.doesNotMatch(html, /javascript:/i)
  assert.doesNotMatch(html, /data:text/i)
  assert.match(html, /href="https:\/\/affra-reseaux\.fr"/)
})

test('le markdown légitime (titres, gras, tableaux GFM) est toujours rendu', () => {
  const html = render('## Titre\n\n**gras**\n\n| a | b |\n|---|---|\n| 1 | 2 |')
  assert.match(html, /<h2>Titre<\/h2>/)
  assert.match(html, /<strong>gras<\/strong>/)
  assert.match(html, /<table>/)
})
