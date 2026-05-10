import { apiFetch } from './client'
import type { BlogPost, BlogPostFull } from '@/types/blog'

export async function getBlogPosts(): Promise<BlogPost[]> {
  return apiFetch<BlogPost[]>('/api/v1/blog', { next: { tags: ['blog'] } })
}

export async function getBlogPost(slug: string): Promise<BlogPostFull> {
  return apiFetch<BlogPostFull>(`/api/v1/blog/${slug}`, {
    next: { tags: [`blog-${slug}`] },
  })
}
