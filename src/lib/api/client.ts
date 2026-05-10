const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''
const API_SECRET_KEY = process.env.API_SECRET_KEY ?? ''

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_SECRET_KEY,
      ...options.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`)
  }

  return res.json() as Promise<T>
}
