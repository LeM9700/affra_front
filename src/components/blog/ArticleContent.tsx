import ReactMarkdown from 'react-markdown'
import { ARTICLE_MARKDOWN_OPTIONS } from '@/lib/markdown/options'

interface ArticleContentProps {
  markdown: string
}

/**
 * Rendu d'un article de blog. Le markdown vient de l'API : HTML brut ignoré et URLs filtrées
 * (voir ARTICLE_MARKDOWN_OPTIONS).
 *
 * @param props.markdown - Corps de l'article en markdown.
 * @returns Article mis en forme.
 */
export default function ArticleContent({ markdown }: ArticleContentProps) {
  return (
    <div className="prose prose-invert prose-emerald max-w-none prose-headings:font-bold prose-a:text-[#5BBF8A] prose-strong:text-white">
      <ReactMarkdown {...ARTICLE_MARKDOWN_OPTIONS}>{markdown}</ReactMarkdown>
    </div>
  )
}
