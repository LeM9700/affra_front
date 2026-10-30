/**
 * Contractions françaises devant un nom de commune à article : « à Le Grau-du-Roi » devient
 * « au Grau-du-Roi », « de Les Angles » devient « des Angles ». « La » et « L’ » ne se
 * contractent pas. « de » s'élide devant une voyelle (« d’Alès ») ; le h n'est pas traité,
 * muet ou aspiré selon les communes.
 */
const VOYELLE_INITIALE = /^[aeiouyàâéèêëîïôöûü]/i

const CONTRACTIONS: readonly { article: string; a: string; de: string }[] = [
  { article: 'Le ', a: 'au ', de: 'du ' },
  { article: 'Les ', a: 'aux ', de: 'des ' },
]

function contract(nom: string, kind: 'a' | 'de'): string {
  const match = CONTRACTIONS.find(({ article }) => nom.startsWith(article))
  if (!match) {
    if (kind === 'a') return `à ${nom}`
    return VOYELLE_INITIALE.test(nom) ? `d’${nom}` : `de ${nom}`
  }
  return `${match[kind]}${nom.slice(match.article.length)}`
}

/**
 * @param nom Nom de la commune.
 * @returns Le nom précédé de « à », contracté si besoin (« à Nîmes », « au Grau-du-Roi »).
 */
export function aVille(nom: string): string {
  return contract(nom, 'a')
}

/**
 * @param nom Nom de la commune.
 * @returns Le nom précédé de « de », contracté si besoin (« de Nîmes », « d’Alès », « du Grau-du-Roi »).
 */
export function deVille(nom: string): string {
  return contract(nom, 'de')
}
