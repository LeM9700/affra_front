import { defaultUrlTransform, type Options } from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 * Configuration de rendu des articles de blog (markdown saisi dans le back-office).
 *
 * Le contenu vient de l'API : on le traite comme non fiable.
 * - `skipHtml` : tout HTML brut du markdown est ignoré (aucun <script>, <img onerror>…).
 *   Ne jamais ajouter `rehype-raw` ici sans passer par `rehype-sanitize`.
 * - `urlTransform` : liste blanche de protocoles (http, https, mailto, tel…) ;
 *   les liens `javascript:` / `data:` sont vidés.
 *
 * Centralisée hors du composant pour être testée avec node:test.
 */
export const ARTICLE_MARKDOWN_OPTIONS = {
  remarkPlugins: [remarkGfm],
  skipHtml: true,
  urlTransform: defaultUrlTransform,
} satisfies Omit<Options, 'children'>
