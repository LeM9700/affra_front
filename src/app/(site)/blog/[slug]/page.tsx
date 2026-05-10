import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import ArticleContent from '@/components/blog/ArticleContent'
import CTABand from '@/components/shared/CTABand'
import SchemaOrg from '@/components/shared/SchemaOrg'
import { getBlogPost, getBlogPosts } from '@/lib/api/blog'
import { formatDateFR } from '@/lib/utils/date'
import PhotoPlaceholder from '@/components/shared/PhotoPlaceholder'

export const revalidate = false // ISR on-demand

const isDev = process.env.NODE_ENV === 'development'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug).catch(() => null)
  if (!post) return {}

  return {
    title: `${post.titre} | AFFRA Réseaux`,
    description: post.meta_description ?? undefined,
    openGraph: {
      title: post.titre,
      description: post.meta_description ?? undefined,
      images: post.og_image_url ? [{ url: post.og_image_url }] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts().catch(() => [])
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug).catch(() => null)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.titre,
    description: post.meta_description,
    datePublished: post.published_at,
    dateModified: post.updated_at ?? post.published_at,
    author: { '@type': 'Organization', name: 'AFFRA Réseaux' },
    image: post.og_image_url,
  }

  return (
    <>
      <SchemaOrg schema={articleSchema} />

      {/* Image d'en-tête — [photo: blog_posts.og_image_url] */}
      <div className="relative h-[500px] overflow-hidden">
        {isDev && !post.og_image_url ? (
          <PhotoPlaceholder width={1200} height={500} label="blog_posts.og_image_url" className="h-full" />
        ) : (
          <Image
            src={post.og_image_url ?? '/images/placeholders/placeholder-hero.svg'}
            alt={post.titre}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h1 className="text-4xl font-bold text-white mb-3">{post.titre}</h1>
          {post.published_at && (
            <span className="text-slate-300 text-sm">{formatDateFR(post.published_at)}</span>
          )}
        </div>
      </div>

      <article className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleContent markdown={post.contenu_markdown ?? ''} />
        </div>
      </article>

      <CTABand />
    </>
  )
}
