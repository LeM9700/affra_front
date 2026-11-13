/**
 * Sérialisation sûre des données structurées injectées dans un <script type="application/ld+json">.
 *
 * Le contenu d'une balise <script> n'est pas échappé par le navigateur : une chaîne contenant
 * `</script>` ferme la balise et la suite est interprétée comme du HTML (XSS). JSON.stringify
 * ne protège pas contre ça. On remplace donc les caractères sensibles par leur séquence
 * d'échappement Unicode JSON (\u003c…) : le JSON reste strictement équivalent une fois parsé
 * par Google, mais le parseur HTML ne voit plus aucune balise.
 */

const UNSAFE_CHARS = /[<>&\u2028\u2029]/g

const ESCAPES: Record<string, string> = {
  '<': '\\u003c',
  '>': '\\u003e',
  '&': '\\u0026',
  // Séparateurs de ligne/paragraphe Unicode : valides en JSON, historiquement cassants en JS.
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
}

/**
 * Sérialise un objet schema.org en JSON sûr pour une insertion brute dans une balise <script>.
 *
 * @param data - Données JSON-LD (objet ou tableau sérialisable).
 * @returns Chaîne JSON dont `<`, `>`, `&`, U+2028 et U+2029 sont échappés en `\uXXXX`.
 * @throws {TypeError} Si `data` n'est pas sérialisable en JSON (undefined, fonction…).
 * @example
 * serializeJsonLd({ name: '</script>' }) // '{"name":"\\u003c/script\\u003e"}'
 */
export function serializeJsonLd(data: unknown): string {
  const json = JSON.stringify(data)
  if (json === undefined) {
    throw new TypeError('serializeJsonLd: data is not JSON-serializable')
  }
  return json.replace(UNSAFE_CHARS, (char) => ESCAPES[char])
}
