import Image from 'next/image'
import Link from 'next/link'
import PhotoPlaceholder from '@/components/shared/PhotoPlaceholder'
import { formatDateFR } from '@/lib/utils/date'
import type { BlogPost } from '@/types/blog'

const isDev = process.env.NODE_ENV === 'development'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col hover:border-[#5BBF8A] hover:shadow-md transition-all">
      {/* [photo: blog_posts.og_image_url] */}
      <div className="aspect-[16/9] relative overflow-hidden">
        {isDev && !post.og_image_url ? (
          <PhotoPlaceholder width={800} height={450} label="blog_posts.og_image_url" />
        ) : (
          <Image
            src={post.og_image_url ?? '/images/placeholders/placeholder-card.svg'}
            alt={post.titre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        {post.published_at && (
          <span className="text-xs text-slate-500 mb-2">{formatDateFR(post.published_at)}</span>
        )}
        <h2 className="text-slate-900 font-bold text-lg mb-2 group-hover:text-[#29B4C5] transition-colors">
          {post.titre}
        </h2>
        {post.meta_description && (
          <p className="text-slate-500 text-sm leading-relaxed flex-1">{post.meta_description}</p>
        )}
        <span className="mt-4 text-[#5BBF8A] text-sm font-semibold">Lire l&apos;article &#x2192;</span>
      </div>
    </Link>
  )
}
