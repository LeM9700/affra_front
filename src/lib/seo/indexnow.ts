/**
 * IndexNow : signale aux moteurs participants (Bing, Yandex, Seznam, Naver…) qu'une URL a été
 * créée ou modifiée. Bing alimente aussi la recherche de ChatGPT et de Copilot : c'est le levier
 * le plus direct pour que les IA voient vite un nouveau contenu.
 *
 * La clé n'est pas un secret : elle doit être publiée à la racine du site
 * (`public/<clé>.txt`, contenu = la clé) pour prouver que nous contrôlons le domaine.
 * Changer la clé = renommer ce fichier ET modifier la constante ci-dessous (un test vérifie
 * qu'ils restent synchronisés).
 */
export const INDEXNOW_KEY = '658c21ea5d73d4840de5b73d45a58cb2'

/** Point d'entrée partagé : un envoi est relayé à tous les moteurs participants. */
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

/** Limite imposée par le protocole pour un envoi groupé. */
export const INDEXNOW_MAX_URLS = 10_000

export interface IndexNowPayload {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

/**
 * Prépare le corps d'un envoi IndexNow : ne garde que les URLs absolues du site, sans doublons.
 * Une URL d'un autre domaine ferait rejeter tout l'envoi (HTTP 422), d'où le filtrage.
 *
 * @param siteUrl URL du site, par exemple `https://affra-reseaux.fr`.
 * @param urls URLs à signaler.
 * @param key Clé IndexNow publiée sur le site.
 * @returns Le corps de la requête, ou `null` s'il ne reste aucune URL valide.
 */
export function buildIndexNowPayload(
  siteUrl: string,
  urls: readonly string[],
  key: string = INDEXNOW_KEY,
): IndexNowPayload | null {
  const site = new URL(siteUrl)
  const urlList = [
    ...new Set(
      urls.filter((raw) => {
        try {
          const url = new URL(raw)
          return url.host === site.host && url.protocol === site.protocol
        } catch {
          return false
        }
      }),
    ),
  ].slice(0, INDEXNOW_MAX_URLS)

  if (urlList.length === 0) return null

  return {
    host: site.host,
    key,
    keyLocation: `${site.origin}/${key}.txt`,
    urlList,
  }
}

export interface IndexNowResult {
  ok: boolean
  status: number | null
  submitted: number
}

/**
 * Envoie des URLs à IndexNow. Ne lève jamais d'exception : un échec de notification ne doit
 * pas faire échouer l'action qui l'a déclenchée (revalidation, déploiement).
 *
 * Codes utiles : 200/202 = reçu ; 403 = clé introuvable sur le site ; 422 = URL hors domaine.
 *
 * @param siteUrl URL du site.
 * @param urls URLs à signaler.
 * @param fetchImpl Implémentation de fetch (injectable pour les tests).
 * @param timeoutMs Délai maximal de la requête.
 * @returns Le statut de l'envoi.
 */
export async function submitToIndexNow(
  siteUrl: string,
  urls: readonly string[],
  fetchImpl: typeof fetch = fetch,
  timeoutMs = 5000,
): Promise<IndexNowResult> {
  const payload = buildIndexNowPayload(siteUrl, urls)
  if (!payload) return { ok: false, status: null, submitted: 0 }

  try {
    const res = await fetchImpl(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    })
    return { ok: res.ok, status: res.status, submitted: payload.urlList.length }
  } catch {
    return { ok: false, status: null, submitted: 0 }
  }
}
