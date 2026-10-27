import assert from 'node:assert/strict'
import { test } from 'node:test'

import { buildAboutPageSchema, personId } from './about.ts'

const equipe = [
  { id: 'a', prenom: 'Alice', nom: 'Martin', role: 'Cogérante', fondateur: true, bio: [], diplomes: ['CAP électricien'], expertises: ['IRVE'], linkedin: 'https://www.linkedin.com/in/alice' },
  { id: 'b', prenom: 'Bob', role: 'Technicien', fondateur: false, bio: [], diplomes: [], expertises: [] },
]

const org = {
  id: 'https://exemple.test/#organization',
  name: 'EXEMPLE',
  url: 'https://exemple.test',
  address: { '@type': 'PostalAddress', addressLocality: 'Nîmes' },
  areaServed: [{ '@type': 'State', name: 'Gard' }],
  sameAs: ['https://www.linkedin.com/company/exemple'],
}

const graph = buildAboutPageSchema(equipe, org)['@graph'] as Record<string, unknown>[]
const entreprise = graph[1]
const [alice, bob] = graph.slice(2)

test('relie la page, l’entreprise et chaque membre', () => {
  assert.equal(graph.length, 4)
  assert.deepEqual(graph[0].mainEntity, { '@id': org.id })
  assert.equal(entreprise['@id'], org.id)
  assert.deepEqual(entreprise.employee, [{ '@id': personId(org.url, 'a') }, { '@id': personId(org.url, 'b') }])
})

test('seuls les fondateurs sont déclarés en founder', () => {
  assert.deepEqual(entreprise.founder, [{ '@id': personId(org.url, 'a') }])
})

test('LinkedIn déclaré en sameAs uniquement s’il est renseigné', () => {
  assert.deepEqual(alice.sameAs, ['https://www.linkedin.com/in/alice'])
  assert.equal('sameAs' in bob, false)
})

test('nom complet si disponible, sinon prénom seul', () => {
  assert.equal(alice.name, 'Alice Martin')
  assert.equal(bob.name, 'Bob')
  assert.equal('familyName' in bob, false)
})

test('diplômes déclarés seulement s’il y en a', () => {
  assert.equal((alice.hasCredential as unknown[]).length, 1)
  assert.equal('hasCredential' in bob, false)
})
