/**
 * Convertit des photos originales (JPG/PNG) en WebP optimisé pour le site.
 *
 * Usage :
 *   node scripts/optimize-photos.mjs <dossier-source> [dossier-sortie]
 *
 * Prérequis : sharp, déjà installé avec Next.js (dépendance optionnelle de next) — aucun ajout
 * à package.json nécessaire.
 *
 * Chaque fichier listé dans PHOTOS ci-dessous est cherché dans <dossier-source>,
 * redimensionné (côté le plus long : 1600 px, sans agrandissement), corrigé de son
 * orientation EXIF puis encodé en WebP (qualité 80).
 * Les fichiers sont écrits sous le nom définitif utilisé par src/data/realisations.ts.
 */
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const PHOTOS = [
  { source: 'IMG_5594', output: 'chantier-montmirat.webp' },
  { source: 'IMG_5595', output: 'chantier-aigues-vives.webp' },
  { source: 'IMG_3823', output: 'chantier-vauvert.webp' },
]

const MAX_SIDE = 1600
const QUALITY = 80

const [, , sourceDir, outDirArg] = process.argv
if (!sourceDir) {
  console.error('Usage : node scripts/optimize-photos.mjs <dossier-source> [dossier-sortie]')
  process.exit(1)
}
const outDir = outDirArg ?? path.join(process.cwd(), 'public', 'images', 'realisations')

const files = await readdir(sourceDir)
await mkdir(outDir, { recursive: true })

for (const { source, output } of PHOTOS) {
  const match = files.find((f) => f.toLowerCase().startsWith(source.toLowerCase()) && /\.(jpe?g|png|heic)$/i.test(f))
  if (!match) {
    console.warn(`⚠  ${source}.* introuvable dans ${sourceDir} — ignoré`)
    continue
  }
  const info = await sharp(path.join(sourceDir, match))
    .rotate()
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(path.join(outDir, output))
  console.log(`✔  ${match} → ${output} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} Ko)`)
}
