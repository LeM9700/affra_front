import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

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

  return NextResponse.json({ revalidated: true, path })
}
