# Attribution digitale — côté site vitrine

La documentation complète (règles, commission, endpoints) est dans le backend :
`affra_back/docs/attribution-commission.md`.

## Fichiers

| Fichier | Rôle |
|---|---|
| `src/lib/attribution/visitor.ts` | Cookie first-party `affra_vid` : UUID aléatoire, 13 mois. Seul module qui le lit ou l'écrit côté navigateur. `isAttributionAllowed()` est le point unique où brancher un futur gestionnaire de consentement. |
| `src/lib/attribution/source.ts` | Lecture des signaux bruts : `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, `gbraid`, `wbraid`, referrer externe (sans query string), landing page (paramètres d'attribution seulement). **Aucune classification ici** : elle est faite par le backend. |
| `src/lib/attribution/events.ts` | `recordLanding()` et `trackEvent()` : envoi fire-and-forget (`navigator.sendBeacon`, repli `fetch keepalive`). Ne lève jamais d'erreur. |
| `src/lib/attribution/server.ts` | Côté serveur : lecture du cookie, IP visiteur (`X-Client-IP`), en-têtes backend. |
| `src/app/api/attribution/[kind]/route.ts` | Proxy same-origin `visit` / `event` → FastAPI, avec la clé API. Répond toujours 204. |
| `src/components/attribution/AttributionTracker.tsx` | Monté dans le layout racine. Enregistre une visite par chargement de page, protégé contre le double montage de StrictMode. |
| `src/components/attribution/TrackedLinks.tsx` | `TrackedPhoneLink`, `TrackedEmailLink` : tracking au clic, sans `preventDefault`. |
| `src/lib/contact.ts` | Numéro et email de contact : source unique. |

## Ce qui est enregistré

- **Visite** :
  - au premier chargement de la session ;
  - ensuite, seulement si l'URL ou le referrer apporte un signal d'acquisition (UTM, click ID, autre site).
- **QUOTE_STARTED** : clic sur « Commencer » dans `DevisWizard`.
- **QUOTE_SUBMITTED** : généré par le backend lors de `POST /api/v1/devis`. L'action `submitDevis` y ajoute
  `anonymous_id`, lu dans le cookie.
- **PHONE_CLICK / EMAIL_CLICK** : liens du footer, de `CTABand` et des articles de blog.

## Google Business Profile

Le lien du site dans la fiche Google Business Profile doit devenir :

```
https://affra-reseaux.fr/?utm_source=google_business&utm_medium=organic_local
```

Cette modification se fait manuellement dans GBP. Sans ces UTM, les visites depuis la fiche sont
confondues avec le SEO Google.

## Variables d'environnement

Aucune nouvelle variable : le proxy réutilise `NEXT_PUBLIC_API_URL` et `API_SECRET_KEY`.
