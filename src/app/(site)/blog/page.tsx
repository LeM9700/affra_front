import type { Metadata } from 'next'
import Link from 'next/link'
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
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Ressources techniques en cours de publication</h2>
              <p className="mt-4 text-slate-600">
                Nous publions des guides pratiques IRVE: choix de borne, budget, conformité et conseils
                d&apos;installation pour particuliers et professionnels.
              </p>
              <p className="mt-3 text-slate-600">
                Besoin d&apos;une réponse rapide sur votre projet ? Notre équipe peut vous orienter dès
                maintenant.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/devis"
                  className="inline-flex items-center rounded-lg bg-[#5BBF8A] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4da979]"
                >
                  Demander un devis
                </Link>
                <Link
                  href="/offres"
                  className="inline-flex items-center rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition-colors hover:bg-slate-100"
                >
                  Voir nos offres
                </Link>
              </div>
            </div>
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
