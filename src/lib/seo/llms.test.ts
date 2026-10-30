import assert from 'node:assert/strict'
import { test } from 'node:test'

import { buildLlmsTxt, type LlmsInput } from './llms.ts'

const input: LlmsInput = {
  siteUrl: 'https://exemple.test',
  name: 'EXEMPLE',
  summary: 'Installateur de bornes.',
  facts: ['Basé à Nîmes'],
  pages: [{ title: 'Offres', path: '/offres', description: 'Nos prix' }],
  offres: [
    { titre: 'Borne A', marque: 'Marque', prixTtc: 1290, soustitre: '7,4 kW', anchor: 'borne-a' },
    { titre: 'La Borne Maison', marque: 'La Borne Maison', prixTtc: 999, soustitre: '22 kW', anchor: 'maison' },
  ],
  villes: [
    { nom: 'Uzès', aVille: 'à Uzès', departement: '30', slug: 'uzes' },
    { nom: 'Alès', aVille: 'à Alès', departement: '30', slug: 'ales' },
    { nom: 'Le Grau-du-Roi', aVille: 'au Grau-du-Roi', departement: '30', slug: 'le-grau-du-roi' },
    { nom: 'Sète', aVille: 'à Sète', departement: '34', slug: 'sete' },
  ],
  realisations: [{ titre: 'Borne à Vauvert', ville: 'Vauvert', codePostal: '30600', resume: 'Pose en façade.' }],
  articles: [],
  optional: [{ title: 'Mentions légales', path: '/mentions-legales' }],
}

const txt = buildLlmsTxt(input)

test('respecte la structure llmstxt.org : H1, résumé en citation, sections H2', () => {
  const lines = txt.split('\n')
  assert.equal(lines[0], '# EXEMPLE')
  assert.equal(lines[2], '> Installateur de bornes.')
  assert.ok(txt.endsWith('\n'))
  assert.match(txt, /^## Optional$/m)
})

test('liens absolus et prix lisibles', () => {
  assert.match(txt, /- \[Offres\]\(https:\/\/exemple\.test\/offres\) : Nos prix/)
  assert.match(txt, /\[Borne A \(Marque\)\]\(https:\/\/exemple\.test\/offres#borne-a\) : 7,4 kW, dès 1 290 € TTC/)
})

test('villes groupées par département et triées à la française', () => {
  const gard = txt.slice(txt.indexOf('Gard (30)'), txt.indexOf('Hérault (34)'))
  assert.ok(gard.indexOf('Alès') < gard.indexOf('Uzès'))
  assert.match(txt, /\[Borne de recharge à Sète\]\(https:\/\/exemple\.test\/zone-intervention\/sete\)/)
})

test('section articles omise quand le blog est vide ou indisponible', () => {
  assert.doesNotMatch(txt, /Guides et articles/)
  const avecArticle = buildLlmsTxt({ ...input, articles: [{ titre: 'Prix', slug: 'prix', description: null }] })
  assert.match(avecArticle, /- \[Prix\]\(https:\/\/exemple\.test\/blog\/prix\)\n/)
})

test('préposition contractée et marque non répétée', () => {
  assert.match(txt, /\[Borne de recharge au Grau-du-Roi\]/)
  assert.match(txt, /- \[La Borne Maison\]\(https:\/\/exemple\.test\/offres#maison\)/)
})
