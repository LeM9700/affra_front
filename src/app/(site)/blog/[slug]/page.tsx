import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
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
    publisher: {
      '@type': 'Organization',
      name: 'AFFRA Réseaux',
      logo: {
        '@type': 'ImageObject',
        url: 'https://affra-reseaux.fr/icons/affra_logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://affra-reseaux.fr/blog/${post.slug}`,
    },
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

          <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-800/70 p-6">
            <h2 className="text-xl font-bold text-white">Vous avez un projet de borne de recharge ?</h2>
            <p className="mt-2 text-slate-300">
              Obtenez une recommandation claire et un devis adapté a votre usage.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/devis"
                className="inline-flex items-center justify-center rounded-lg bg-[#5BBF8A] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#4da979]"
              >
                Demander un devis
              </Link>
              <a
                href="tel:+33766304687"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-5 py-3 font-semibold text-slate-200 transition-colors hover:bg-slate-700"
              >
                Appeler le 07 66 30 46 87
              </a>
              <Link
                href="/offres"
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-5 py-3 font-semibold text-slate-200 transition-colors hover:bg-slate-700"
              >
                Voir nos offres
              </Link>
            </div>
          </div>
        </div>
      </article>

      <CTABand />
    </>
  )
}
