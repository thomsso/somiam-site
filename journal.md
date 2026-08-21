# Journal — Site so-miam.com

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
