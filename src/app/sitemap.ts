import { MetadataRoute } from 'next'
import { villesSeo } from '@/data/villes-seo'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://affra-reseaux.fr'

const staticRoutes: { path: string; priority: number; changefreq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: '/offres', priority: 0.9, changefreq: 'monthly' },
  { path: '/services/particuliers', priority: 0.9, changefreq: 'monthly' },
  { path: '/services/coproprietes', priority: 0.9, changefreq: 'monthly' },
  { path: '/services/professionnels', priority: 0.9, changefreq: 'monthly' },
  { path: '/services/promoteurs', priority: 0.9, changefreq: 'monthly' },
  { path: '/realisations', priority: 0.8, changefreq: 'weekly' },
  { path: '/zone-intervention', priority: 0.8, changefreq: 'monthly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/a-propos', priority: 0.6, changefreq: 'monthly' },
  { path: '/devis', priority: 0.9, changefreq: 'monthly' },
  { path: '/mentions-legales', priority: 0.2, changefreq: 'yearly' },
  { path: '/politique-confidentialite', priority: 0.2, changefreq: 'yearly' },
]

async function getBlogSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blog`, {
      headers: { 'X-API-Key': process.env.API_SECRET_KEY || '' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const posts = await res.json()
    return posts.map((p: { slug: string }) => p.slug)
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getBlogSlugs()

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority, changefreq }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: changefreq,
    priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const villeEntries: MetadataRoute.Sitemap = villesSeo.map((v) => ({
    url: `${BASE_URL}/zone-intervention/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticEntries, ...blogEntries, ...villeEntries]
}
