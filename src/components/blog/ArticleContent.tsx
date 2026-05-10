interface ArticleContentProps {
  markdown: string
}

/**
 * Rendu du contenu markdown d'un article de blog.
 * Pour l'instant affichage en texte brut — intégrer une lib markdown (ex: react-markdown)
 * à la phase de contenu réel.
 */
export default function ArticleContent({ markdown }: ArticleContentProps) {
  return (
    <div className="prose prose-invert prose-emerald max-w-none">
      {/* TODO: Remplacer par <ReactMarkdown> quand les articles sont rédigés */}
      <pre className="whitespace-pre-wrap text-slate-300 text-base leading-relaxed font-sans">
        {markdown}
      </pre>
    </div>
  )
}
