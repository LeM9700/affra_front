import { apiFetch } from './client'
import type { PortfolioItem } from '@/types/portfolio'

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  return apiFetch<PortfolioItem[]>('/api/v1/portfolio', {
    next: { tags: ['portfolio'] },
  })
}
