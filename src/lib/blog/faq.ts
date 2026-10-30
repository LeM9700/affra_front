export interface FaqItem {
  question: string
  answer: string
}

const FAQ_HEADING = /^##\s+(questions fréquentes|faq)\s*$/i

/** Retire la syntaxe Markdown courante pour obtenir un texte brut lisible. */
function toPlainText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__|\*|_|`)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Extrait la FAQ d'un article : chaque titre `###` de la section « Questions fréquentes »
 * (ou « FAQ ») est une question, le texte qui le suit est la réponse. Sert à générer les
 * données structurées `FAQPage`, que reprennent les moteurs et les assistants IA.
 *
 * @param markdown Contenu Markdown de l'article.
 * @returns Les questions-réponses, vide si l'article n'a pas de FAQ.
 */
export function extractFaq(markdown: string): FaqItem[] {
  const lines = markdown.split('\n')
  const start = lines.findIndex((line) => FAQ_HEADING.test(line.trim()))
  if (start === -1) return []

  const items: FaqItem[] = []
  let current: { question: string; body: string[] } | null = null
  const flush = () => {
    const answer = current ? toPlainText(current.body.join('\n')) : ''
    if (current && answer) items.push({ question: toPlainText(current.question), answer })
  }

  for (const line of lines.slice(start + 1)) {
    if (/^##\s/.test(line)) break
    const question = line.match(/^###\s+(.+)$/)
    if (question) {
      flush()
      current = { question: question[1], body: [] }
    } else if (current) {
      current.body.push(line)
    }
  }
  flush()
  return items
}
