import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { IS_PREVIEW } from '@/lib/site-env'
import { SITE_URL } from '@/lib/schema/organization'
import { submitToIndexNow } from '@/lib/seo/indexnow'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('X-Revalidation-Secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  let path: string
  try {
    const body = await request.json()
    path = body.path
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  if (!path || typeof path !== 'string') {
    return NextResponse.json({ message: 'Missing or invalid path' }, { status: 400 })
  }

  // Whitelist allowed revalidation paths
  const allowedPaths = ['/blog', '/realisations', '/zone-intervention']
  const isAllowed =
    allowedPaths.includes(path) || allowedPaths.some((p) => path.startsWith(p + '/'))

  if (!isAllowed) {
    return NextResponse.json({ message: 'Path not allowed' }, { status: 400 })
  }

  revalidatePath(path)

  // Signale la page mise à jour aux moteurs IndexNow (Bing → ChatGPT/Copilot). Attendu ici car
  // une fonction serverless peut être coupée dès la réponse envoyée ; l'échec reste sans effet
  // sur la revalidation. Jamais depuis une pré-production : ses URLs ne doivent pas être indexées.
  const indexNow = IS_PREVIEW ? null : await submitToIndexNow(SITE_URL, [`${SITE_URL}${path}`])

  return NextResponse.json({ revalidated: true, path, indexNow })
}
