import type { Metadata } from 'next'
import BlogCard from '@/components/blog/BlogCard'
import PageHero from '@/components/shared/PageHero'
import CTABand from '@/components/shared/CTABand'
import { getBlogPosts } from '@/lib/api/blog'
import { buildMetadata } from '@/lib/utils/metadata'

export const revalidate = false // ISR on-demand

export const metadata: Metadata = buildMetadata({
  title: 'Blog — Conseils et actualités IRVE',
  description:
    "Conseils d'installation, actualités IRVE et retours d'expérience — le blog d'AFFRA Réseaux.",
  path: '/blog',
})

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => [])

  return (
    <>
      <PageHero
        imageSrc="/images/hero/blog-hero.webp"
        imageAlt="Blog AFFRA Réseaux — conseils installation borne de recharge"
        title="Blog"
        subtitle="Conseils, actualités IRVE et retours d'expérience terrain."
      />

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-slate-500 text-center py-20">
              Nos premiers articles arrivent bientôt.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand />
    </>
  )
}
