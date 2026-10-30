/**
 * Génère le fichier /llms.txt (convention llmstxt.org) : un résumé Markdown du site destiné aux
 * assistants IA (ChatGPT, Claude, Perplexity…). Il leur donne en une lecture les faits citables
 * (qui, où, quoi, combien) et les liens vers les pages de référence.
 *
 * Fonction pure : toutes les données viennent des sources uniques du site (offres, villes,
 * réalisations, blog), passées en paramètre. Le fichier ne peut donc pas contredire les pages.
 */

export interface LlmsLink {
  title: string
  path: string
  description?: string
}

export interface LlmsInput {
  siteUrl: string
  name: string
  summary: string
  /** Faits courts et vérifiables, un par ligne. */
  facts: string[]
  pages: LlmsLink[]
  offres: { titre: string; marque: string; prixTtc: number; soustitre: string; anchor: string }[]
  /** `aVille` : nom précédé de sa préposition (« à Nîmes », « au Grau-du-Roi »). */
  villes: { nom: string; aVille: string; departement: string; slug: string }[]
  realisations: { titre: string; ville: string; codePostal: string; resume: string }[]
  articles: { titre: string; slug: string; description?: string | null }[]
  /** Pages utiles mais secondaires (section « Optional » du format). */
  optional: LlmsLink[]
}

/** Formate un prix entier en euros à la française, espaces ordinaires (texte brut). */
const formatEuros = (montant: number): string => `${montant.toLocaleString('fr-FR').replace(/\s/g, ' ')} €`

const link = (siteUrl: string, { title, path, description }: LlmsLink): string =>
  `- [${title}](${siteUrl}${path})${description ? ` : ${description}` : ''}`

/**
 * Construit le contenu de /llms.txt.
 *
 * @param input Données du site.
 * @returns Le fichier Markdown, terminé par un saut de ligne.
 */
export function buildLlmsTxt(input: LlmsInput): string {
  const { siteUrl } = input
  const sections: string[] = [`# ${input.name}`, `> ${input.summary}`, input.facts.map((f) => `- ${f}`).join('\n')]

  sections.push(['## Pages principales', ...input.pages.map((p) => link(siteUrl, p))].join('\n'))

  if (input.offres.length > 0) {
    sections.push(
      [
        '## Offres (prix « à partir de », TTC, pose comprise)',
        ...input.offres.map(
          (o) => `- [${o.titre.includes(o.marque) ? o.titre : `${o.titre} (${o.marque})`}](${siteUrl}/offres#${o.anchor}) : ${o.soustitre}, dès ${formatEuros(o.prixTtc)} TTC`,
        ),
      ].join('\n'),
    )
  }

  for (const [departement, label] of [
    ['30', 'Gard (30)'],
    ['34', 'Hérault (34)'],
  ] as const) {
    const villes = input.villes
      .filter((v) => v.departement === departement)
      .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
    if (villes.length === 0) continue
    sections.push(
      [
        `## Installation de bornes de recharge : ${label}`,
        ...villes.map((v) => `- [Borne de recharge ${v.aVille}](${siteUrl}/zone-intervention/${v.slug})`),
      ].join('\n'),
    )
  }

  if (input.realisations.length > 0) {
    sections.push(
      [
        '## Chantiers réalisés',
        ...input.realisations.map((r) => `- [${r.titre} (${r.codePostal})](${siteUrl}/realisations) : ${r.resume}`),
      ].join('\n'),
    )
  }

  if (input.articles.length > 0) {
    sections.push(
      [
        '## Guides et articles',
        ...input.articles.map((a) =>
          link(siteUrl, { title: a.titre, path: `/blog/${a.slug}`, description: a.description ?? undefined }),
        ),
      ].join('\n'),
    )
  }

  if (input.optional.length > 0) {
    sections.push(['## Optional', ...input.optional.map((p) => link(siteUrl, p))].join('\n'))
  }

  return `${sections.join('\n\n')}\n`
}
