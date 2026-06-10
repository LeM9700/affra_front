import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ArticleContentProps {
  markdown: string
}

export default function ArticleContent({ markdown }: ArticleContentProps) {
  return (
    <div className="prose prose-invert prose-emerald max-w-none prose-headings:font-bold prose-a:text-[#5BBF8A] prose-strong:text-white">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  )
}
