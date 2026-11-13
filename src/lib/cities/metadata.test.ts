import assert from 'node:assert/strict'
import { test } from 'node:test'

import { cities, getCityBySlug } from '../../data/villes-seo.ts'
import { buildCityMetadata, buildCityTitle, TITLE_MAX } from './metadata.ts'
import { META_DESCRIPTION_MAX } from './schema.ts'

test('toutes les pages ville : titre ≤ 60 et description ≤ 155 caractères', () => {
  for (const city of cities) {
    const title = buildCityTitle(city)
    assert.ok(title.length <= TITLE_MAX, `${city.slug} : ${title.length} — ${title}`)
    assert.ok(title.endsWith(' | AFFRA RESEAUX'), title)
    assert.ok(title.includes(city.name), title)
    assert.ok(city.metaDescription.length <= META_DESCRIPTION_MAX, city.slug)
  }
})

test('format cible quand il tient en 60 caractères', () => {
  assert.equal(buildCityTitle(getCityBySlug('montpellier')!), 'Borne de recharge Montpellier (34) | AFFRA RESEAUX')
  assert.equal(buildCityTitle(getCityBySlug('le-grau-du-roi')!), 'Borne de recharge Le Grau-du-Roi (30) | AFFRA RESEAUX')
})

test('nom long : le département est retiré avant de raccourcir « borne de recharge »', () => {
  assert.equal(
    buildCityTitle(getCityBySlug('saint-genies-de-malgoires')!),
    'Borne de recharge Saint-Geniès-de-Malgoirès | AFFRA RESEAUX',
  )
  assert.equal(buildCityTitle({ name: 'Saint-Jean-de-la-Blaquière-du-Lac', department: '34' }), 'Borne Saint-Jean-de-la-Blaquière-du-Lac (34) | AFFRA RESEAUX')
  assert.throws(() => buildCityTitle({ name: 'x'.repeat(60), department: '30' }), /60/)
})

test('metadata : titre absolu (pas de double marque), canonical absolu, Open Graph propre à la ville', () => {
  const meta = buildCityMetadata(getCityBySlug('aimargues')!)
  assert.deepEqual(meta.title, { absolute: 'Borne de recharge Aimargues (30) | AFFRA RESEAUX' })
  assert.equal(meta.alternates?.canonical, 'https://affra-reseaux.fr/zone-intervention/aimargues')
  const og = meta.openGraph as { title: string; url: string; description: string; images: { alt?: string }[] }
  assert.equal(og.title, 'Borne de recharge Aimargues (30) | AFFRA RESEAUX')
  assert.equal(og.url, 'https://affra-reseaux.fr/zone-intervention/aimargues')
  assert.equal(og.description, getCityBySlug('aimargues')!.metaDescription)
  assert.match(og.images[0].alt ?? '', /Aimargues/)
})
