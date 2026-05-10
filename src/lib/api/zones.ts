import { apiFetch } from './client'
import type { Zone } from '@/types/zones'

export async function getZones(): Promise<Zone[]> {
  return apiFetch<Zone[]>('/api/v1/zones', { next: { tags: ['zones'] } })
}
