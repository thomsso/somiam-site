# Site so-miam.com

## Stack
- Astro (static) + pages HTML dans `public/`
- Blog Astro dans `src/content/blog/`
- Serverless functions Vercel dans `api/`
- Hébergé sur Vercel, déploiement auto via GitHub push

## Règles

### Anti-régression obligatoire
Avant de commit/push toute modification d'un fichier HTML ou CSS :
1. **Vérifier tous les chemins** (images, liens, scripts) dans le fichier modifié — pas seulement les lignes touchées
2. **Les fichiers dans `public/` sont servis à la racine** — jamais de `public/` dans les URLs (écrire `/images/...` pas `public/images/...`)
3. **Tester la page dans un navigateur** (dev server ou preview) avant de push — pas juste vérifier le code
4. **Si un CTA ou lien est modifié**, vérifier TOUS les CTAs/liens de la page (nav, mid, pricing, footer, sticky bar)

### Déploiement
- Toujours commit + push après chaque modification (convention Thomas)
- Variables sensibles dans `.env.local` (gitignored) + Vercel env vars
- Jamais de clé API, secret, ou token dans le code

### Stripe
- Checkout Session : 59€/mois, 14j essai gratuit
- Webhook `/api/webhook` → crée compte sur app.so-miam.com via invite-restaurateur (hasFormation: false)
- Price ID : dans env var `STRIPE_PRICE_ID`
