/**
 * Détection des robots (moteurs de recherche, aperçus de liens, navigateurs automatisés).
 *
 * Googlebot et Bingbot exécutent le JavaScript : sans ce filtre, ils créeraient des « visiteurs »
 * dans le tableau des prospects. Filtre volontairement large : rater une vraie visite humaine
 * d'un navigateur exotique coûte moins cher que polluer le tableau.
 */
const BOT_PATTERN = new RegExp(
  [
    'bot\\b', 'bot/', 'crawler', 'spider', 'crawling', 'slurp', 'mediapartners', 'adsbot',
    'googleother', 'google-inspectiontool', 'lighthouse', 'pagespeed', 'chrome-lighthouse', 'gtmetrix',
    'headlesschrome', 'phantomjs', 'puppeteer', 'playwright', 'selenium', 'wget', 'curl/', 'python-requests',
    'python-httpx', 'axios/', 'node-fetch', 'go-http-client', 'java/', 'okhttp', 'facebookexternalhit',
    'whatsapp', 'telegrambot', 'slackbot', 'discordbot', 'linkedinbot', 'twitterbot', 'embedly',
    'preview', 'monitor', 'uptime', 'pingdom', 'statuscake', 'semrush', 'ahrefs', 'mj12bot', 'dotbot',
    'petalbot', 'yandex', 'baiduspider', 'bytespider', 'gptbot', 'chatgpt-user', 'oai-searchbot',
    'claudebot', 'claude-web', 'anthropic-ai', 'perplexitybot', 'ccbot', 'applebot', 'duckduckbot',
  ].join('|'),
  'i',
)

/**
 * Indique si un User-Agent appartient à un robot ou à un navigateur automatisé.
 *
 * @param userAgent En-tête User-Agent de la requête (absent = robot : un navigateur en envoie toujours un).
 * @returns `true` si la requête ne doit pas être comptée comme une visite humaine.
 */
export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  if (!userAgent || userAgent.trim().length < 10) return true
  return BOT_PATTERN.test(userAgent)
}
