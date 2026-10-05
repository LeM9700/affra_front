/**
 * Proxy same-origin des événements d'attribution : navigateur → Next.js → FastAPI.
 *
 * La clé API reste côté serveur. L'identifiant visiteur est pris dans le cookie affra_vid
 * (le corps n'est qu'un repli). Réponse 204 sans détail : le tracking est best-effort et
 * ne doit jamais remonter d'erreur au navigateur.
 */
import { NextRequest, NextResponse } from 'next/server'

import { backendHeaders, backendUrl, readVisitorIdFromRequest } from '@/lib/attribution/server'
import { isValidVisitorId } from '@/lib/attribution/visitor'

const MAX_BODY_BYTES = 4096
const BACKEND_TIMEOUT_MS = 3000
const KINDS = new Set(['visit', 'event'])

const noContent = () => new NextResponse(null, { status: 204 })

export async function POST(request: NextRequest, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params
  if (!KINDS.has(kind)) return NextResponse.json({ message: 'Not found' }, { status: 404 })

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ message: 'Payload too large' }, { status: 413 })

  let body: Record<string, unknown>
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid')
    body = parsed as Record<string, unknown>
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const cookieId = await readVisitorIdFromRequest()
  const anonymousId = cookieId ?? (isValidVisitorId(body.anonymous_id) ? body.anonymous_id : null)
  if (!anonymousId) return noContent()

  try {
    await fetch(backendUrl(`/api/v1/attribution/${kind}`), {
      method: 'POST',
      headers: await backendHeaders(),
      body: JSON.stringify({ ...body, anonymous_id: anonymousId }),
      cache: 'no-store',
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    })
  } catch {
    // Backend indisponible : l'événement est perdu, le parcours du visiteur continue.
  }
  return noContent()
}
