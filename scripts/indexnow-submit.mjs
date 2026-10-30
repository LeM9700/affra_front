#!/usr/bin/env node
/**
 * Signale toutes les URLs du sitemap de production à IndexNow (Bing, Yandex, Seznam, Naver…).
 *
 * À lancer après un déploiement qui modifie beaucoup de pages (nouvelles pages villes, refonte) :
 *   npm run indexnow
 *   SITE_URL=https://affra-reseaux.fr npm run indexnow -- --dry-run
 *
 * Les mises à jour unitaires (articles, réalisations) sont déjà signalées automatiquement par
 * la route /api/revalidate. La clé est lue dans public/<clé>.txt, seule source de vérité.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = (process.env.SITE_URL ?? 'https://affra-reseaux.fr').replace(/\/$/, '')
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const DRY_RUN = process.argv.includes('--dry-run')

/** Lit la clé publiée dans public/ (fichier `<32 hex>.txt` dont le contenu est la clé). */
function readKey() {
  const publicDir = join(import.meta.dirname, '..', 'public')
  const files = readdirSync(publicDir).filter((f) => /^[a-f0-9]{32}\.txt$/.test(f))
  if (files.length !== 1) throw new Error(`Une seule clé IndexNow attendue dans public/, trouvé : ${files.length}`)
  const key = readFileSync(join(publicDir, files[0]), 'utf8').trim()
  if (`${key}.txt` !== files[0]) throw new Error('Le contenu du fichier de clé ne correspond pas à son nom')
  return key
}

/** Extrait les <loc> du sitemap publié. */
async function readSitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`)
  if (!res.ok) throw new Error(`Sitemap inaccessible : HTTP ${res.status}`)
  const xml = await res.text()
  const host = new URL(SITE_URL).host
  return [...new Set([...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]))].filter(
    (url) => new URL(url).host === host,
  )
}

async function main() {
  const key = readKey()

  // Le moteur vérifie la clé sur le site : inutile d'envoyer si elle n'est pas encore déployée.
  const keyRes = await fetch(`${SITE_URL}/${key}.txt`)
  if (!keyRes.ok || (await keyRes.text()).trim() !== key) {
    throw new Error(`Clé absente de ${SITE_URL}/${key}.txt : déployez d'abord le site.`)
  }

  const urlList = await readSitemapUrls()
  console.log(`${urlList.length} URL(s) trouvée(s) dans le sitemap.`)
  if (DRY_RUN) {
    urlList.forEach((u) => console.log(`  ${u}`))
    return
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE_URL).host, key, keyLocation: `${SITE_URL}/${key}.txt`, urlList }),
  })
  // 200 = reçu et clé validée ; 202 = reçu, validation de la clé en attente.
  console.log(`IndexNow : HTTP ${res.status}`)
  if (!res.ok) {
    console.error(await res.text())
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exitCode = 1
})
