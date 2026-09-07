# Journal — Site so-miam.com

## 2026-09-07

### Audit SEO complet + corrections on-page

**Contexte :** premier passage sur la Search Console. Sitemap soumis, pages
principales envoyées à l'indexation. Audit on-page lancé dans la foulée
(skill `seo-audit`, scripts + vérification navigateur).

**Problème principal trouvé (non détecté par l'audit basique) :**
La page d'accueil déclarait un schéma `FAQPage` de 3 questions dont **aucune
n'était rendue visible** dans le HTML. Violation directe des guidelines Google
sur le balisage de contenu invisible — risque de perte des résultats enrichis
voire d'action manuelle. Les 4 autres pages portant un FAQPage étaient
conformes, c'était isolé sur la home.
→ Section FAQ visible ajoutée, reprenant mot pour mot le contenu balisé.
Effet secondaire : +151 mots de contenu réel (708 → 859).

**Corrections effectuées :**
- `LocalBusiness` : champ obligatoire `telephone` ajouté (+33699297756).
  Le schéma passait Fail → sans lui, aucune éligibilité aux résultats enrichis locaux
- `Organization` : ajout d'un `contactPoint`
- Title home : 64 → 58 car. (plus de troncature SERP)
- Meta description home : 217 → 144 car., preuves chiffrées conservées dans la zone visible
- H1 : « Votre resto » → « Votre restaurant » (« resto » n'est pas un terme recherché)
- Hero : mot-clé « communication de ton restaurant » placé naturellement dans le chapô
- `og:title` / `twitter:title` réalignés sur le nouveau title
- **Email unifié sur `thomas@so-miam.com`** — 12 occurrences remplacées.
  Le site exposait 2 adresses concurrentes (légales vs marketing/schémas), ce qui
  affaiblissait le NAP recoupé par Google

**Nouvelle page `/contact` :**
- L'URL renvoyait un 404 : page de confiance E-E-A-T manquante
- CTA principaux = email + appel stratégique. Téléphone en texte brut non cliquable
  dans les coordonnées (Thomas ne veut pas d'appels entrants)
- Schema `ContactPage` + `LocalBusiness`, NAP cohérent avec la home
- Liée depuis le footer des 14 pages, ajoutée au sitemap

**Technique :**
- `vercel.json` : règle de redirection apex → www en 308. **Inerte** — la redirection
  configurée au niveau du domaine Vercel s'exécute avant le routage projet
- `reports/` ajouté au `.gitignore`

**Résultat audit :** 1 critique / 6 warnings → **0 critique / 2 warnings / 18 conformes**

**Points en attente :**
- Redirection apex → www toujours en 307 : à passer en 308 dans Vercel
  (Settings → Domains → so-miam.com → status code). Impact réel faible
- **Fiche Google Business à aligner** sur `thomas@so-miam.com` + `06 99 29 77 56`
  (c'est là que le NAP pèse le plus en SEO local)
- Home à 859 mots vs 1200-1800 chez les concurrents positionnés. Pas de bourrage :
  la piste est 2-3 études de cas chiffrées (Maison L, Café de Paris, Bouillon Pignol),
  qui servent aussi la conversion
- Scores PageSpeed non mesurés (API rate-limitée, 429) — à lancer sur pagespeed.web.dev
- **Mentions légales inexactes** : déclarent un hébergement o2switch alors que le site
  tourne sur Vercel. Mention légale obligatoire, à corriger (non fait, texte juridique)

## 2026-08-21

### Repositionnement national + blog SEO/GEO complet

**Blog :**
- Migration Astro (HTML existant dans `public/`, blog dans `src/`)
- 4 articles publiés :
  1. `repondre-avis-google-restaurant` — Avis Google, ~1500 mots
  2. `fiche-google-restaurant-position-1` — Google Maps, ~1800 mots
  3. `quoi-poster-instagram-restaurateur` — Instagram, ~1800 mots
  4. `guide-communication-restaurant` — **Méga-guide pilier ~5000 mots**, structuré par douleur réelle, stats sourcées, verbatims restaurateurs
- `blog-instructions.md` complet pour agent Cowork (ton, mots-clés, liens sortants/internes, verbatims, workflow)
- Automatisation : Cowork scheduled chaque lundi 10h → 1 article/semaine

**Repositionnement national (Gusto first) :**
- Homepage : title/meta/OG nationales (plus de Lille), schema Organization + SoftwareApplication, nav Gusto en premier, CTA Gusto primaire
- Gusto : schema SoftwareApplication + FAQPage (6 items)
- Page `/a-propos` créée : bio Thomas, résultats chiffrés, équipe, schema Person (E-E-A-T)

**Responsive mobile :**
- Audit complet toutes pages (12 fichiers)
- Touch targets 44-48px, grids single column, buttons full-width, padding mobile

**Footer :**
- Double footer : principal (Gusto IA, Blog, Avis, Agence, Meta Ads, Shooting) + sous-footer discret (légal)
- Lien À propos ajouté partout

**Analyse concurrents GEO :**
- 4 "concurrents" Gemini analysés → 3 hallucinations, 1 faible (Studio Ducasse)
- Audit GEO so-miam.com : bon schema, manquait profondeur contenu (résolu avec blog + guide)
- Stratégie liens sortants/entrants documentée

**Points en attente :**
- Pages études de cas clients (Bouillon Pignol, Café de Paris, Maison L)
- Scheduled agent Cowork (configuré par Thomas dans claude.ai)
- Retester Gemini/ChatGPT dans 2-3 semaines après indexation
- Stratégie backlinks (Zenchef co-article, JDN tribune, annuaires)

### Migration Astro + lancement blog SEO/GEO

**Travail effectué :**
- Migration du site vers Astro (pages HTML existantes dans `public/`, blog Astro dans `src/`)
- Correction des chemins images (`/public/images/` → `/images/`)
- Création infrastructure blog : content collection, layout article, page index, template dynamique `[...slug].astro`
- Écriture de 3 articles piliers :
  1. `repondre-avis-google-restaurant` — Cluster avis Google, 1500 mots
  2. `fiche-google-restaurant-position-1` — Cluster Google Maps/GMB, 1800 mots
  3. `quoi-poster-instagram-restaurateur` — Cluster Instagram, 1800 mots
- Chaque article : SEO optimisé (title, meta, schema.org Article, OG), verbatims restaurateurs intégrés, mention Gusto subtile, CTA Gusto en bloc layout
- Blog index avec cards articles, tri par date
- Ajout lien "Blog" dans nav + footer de toutes les pages existantes
- Sitemap mis à jour avec /blog + 3 articles
- `blog-instructions.md` créé pour l'agent rédacteur scheduled (ton, mots-clés, structure, résultats clients, calendrier saisonnier)

**Structure technique :**
- `src/content/blog/` — articles en Markdown avec frontmatter
- `src/layouts/BlogLayout.astro` — template article (nav, header, content, CTA Gusto, footer)
- `src/pages/blog/index.astro` — listing articles
- `src/pages/blog/[...slug].astro` — pages article dynamiques
- `src/content.config.ts` — schema Zod pour le frontmatter
- `blog-instructions.md` — instructions pour l'agent hebdomadaire

**Points en attente :**
- Scheduled agent pour écrire 1 article/semaine automatiquement
- Système d'analyse performance articles (quand trafic suffisant)
- Éventuelle migration complète des pages HTML existantes vers Astro (pas urgent)

## 2026-08-19

### Refonte page Gusto (so-miam.com/gusto)

**Travail effectué :**
- Refonte complète de la page de vente Gusto (SaaS 59€/mois)
- Hero interactif avec input "Le nom de votre restaurant" → redirige vers recette.so-miam.com (temporaire, futur : app.so-miam.com/onboarding)
- Hero centré H+V en 100vh, dashboard invisible above fold, chevron scroll-down animé
- Dashboard sorti du hero dans sa propre section avec respiration visuelle (60px padding-top)
- 4 float cards bénéfices autour du dashboard : Publication auto, Réponses IA 24/7, Health Score, SEO Google Maps
- Image dashboard sans width/height forcés (ratio naturel, plus de déformation)
- Social proof marquee avec résultats clients réels
- Section problème (3 pain points)
- 3 étapes "Comment ça marche" avec screenshots (hauteur normalisée 260px)
- 4 features : Contenu IA, Réponses avis Google (automatiques), Calendrier, Story Designer
- Calendrier : grid 1fr/2fr pour image plus grande, image "beau calendrier.png"
- Résultats clients (6 cartes)
- Témoignages vidéo (3 Tella embeds)
- Pricing comparatif (outils concurrents barrés vs Gusto 59€)
- FAQ accordion centré
- CTA final avec input restaurant
- Sticky CTA bar
- Responsive tablet + mobile

**Points en attente :**
- Stripe Checkout integration dans la plateforme (paiement 59€/mois + trial 14j)
- Onboarding flow à app.so-miam.com (redirect CTA)
- Upsell La Recette So MIAM (géré manuellement pour l'instant)
- Prix formation (1400€) ne doit JAMAIS apparaître sur la page

**Screenshots utilisés :** `/public/images/gusto/` — dashbord restaurateur.png, planning editorial.png, descriptions generees.png, reponses aux avis.png, beau calendrier.png, banque de contenu.png, story-designer.jpg
