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

### SEO & contenu
- **Email de contact officiel : `thomas@so-miam.com`** — partout (pages, CTA, schémas JSON-LD). Ne jamais réintroduire `thomas@so-media.fr` : deux adresses concurrentes cassent le NAP que Google recoupe entre le site, les données structurées et la fiche Google Business.
- **Téléphone (06 99 29 77 56) : discret uniquement.** Présent dans les schémas JSON-LD + en texte brut (subfooter home, coordonnées `/contact`). **Jamais de lien `tel:`, jamais de bouton, jamais de CTA.** Thomas ne veut pas d'appels entrants.
- **Un schéma `FAQPage` exige un rendu visible** de ses questions/réponses sur la page. Baliser du contenu invisible viole les guidelines Google (risque d'action manuelle). Vérifier avant d'ajouter ou de déplacer un bloc FAQ.
- **Toute nouvelle page** → l'ajouter à `public/sitemap.xml` ET la lier depuis le footer de toutes les pages (`public/*.html` + `src/layouts/BlogLayout.astro` + `src/pages/blog/index.astro`).
- Cibles à ne pas cannibaliser : la home vise « communication restaurant » (national), `/agence-communication-restaurant-lille` vise la requête locale.

### Cloudflare
Scrape Shield obfusque les emails du HTML servi (`[email protected]` + décodeur JS). **C'est normal, ne pas « corriger ».** Les visiteurs voient bien l'adresse une fois le script exécuté, et les blocs JSON-LD ne sont pas touchés : le signal NAP destiné à Google passe par les schémas.

### Déploiement
- Toujours commit + push après chaque modification (convention Thomas)
- Variables sensibles dans `.env.local` (gitignored) + Vercel env vars
- Jamais de clé API, secret, ou token dans le code
- **Redirections apex → www** : configurées au niveau du domaine dans le dashboard Vercel, exécutées AVANT le routage du projet. Une règle `vercel.json` avec `has: host` reste donc inerte — le status code (307/308) se change dans Settings → Domains.

### Stripe
- Checkout Session : 59€/mois, 14j essai gratuit
- Webhook `/api/webhook` → crée compte sur app.so-miam.com via invite-restaurateur (hasFormation: false)
- Price ID : dans env var `STRIPE_PRICE_ID`
