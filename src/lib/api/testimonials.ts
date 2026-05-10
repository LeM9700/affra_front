import { apiFetch } from './client'
import type { TestimonialSeoItem } from '@/types/testimonial'

export async function getTestimonials(): Promise<TestimonialSeoItem[]> {
  return apiFetch<TestimonialSeoItem[]>('/api/v1/testimonials', {
    next: { tags: ['testimonials'] },
  })
}
