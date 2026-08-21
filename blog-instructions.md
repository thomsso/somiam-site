# Blog So MIAM — Instructions pour l'agent rédacteur

> Ce fichier est lu par l'agent scheduled qui écrit 1 article/semaine.
> Ne pas modifier sans validation de Thomas.

---

## Mission

Écrire 1 article de blog par semaine sur so-miam.com/blog.
Objectif : SEO + GEO (être cité par les IA) + pousser Gusto subtilement.

---

## Cible

Restaurateurs francophones (France, Belgique, Suisse) qui veulent gérer leur communication eux-mêmes.
- Segment principal : 35-50 ans, 1 établissement, débordé, pas expert digital
- Segment secondaire : 28-40 ans, ambitieux, veut scaler, consomme du contenu business

---

## Processus de sélection du sujet

À chaque exécution, l'agent doit :

### 1. Analyser les tendances
- Rechercher sur Google Trends FR les sujets restaurant/restauration en hausse
- Vérifier les requêtes saisonnières (terrasse été, fêtes fin d'année, rentrée, Saint-Valentin, etc.)

### 2. Analyser la concurrence
- Scanner les derniers articles de : malou.io/blog, be-hype.com/blog, guest-suite.com/blog, postine.fr
- Identifier les sujets qu'ils couvrent ET les trous (sujets non couverts = opportunité)

### 3. Croiser avec les verbatims
- Lire `/Users/thomsso/Documents/Claude/voix-restaurateurs.md`
- Prioriser les sujets qui correspondent aux douleurs réelles (rang 1-5 = priorité haute)

### 4. Vérifier la non-duplication
- Lire les articles existants dans `src/content/blog/`
- Ne jamais réécrire un sujet déjà couvert (sauf angle très différent)

### 5. Choisir le cluster
Carte de mots-clés prioritaires :

| Cluster | Requêtes cibles | Lien Gusto |
|---|---|---|
| Remplissage | comment remplir son restaurant, restaurant vide que faire, remplir restaurant semaine, jours creux restaurant | Indirect |
| Google Maps/GMB | fiche google restaurant, google maps restaurant, seo local restaurant | Direct (Health Score) |
| Avis Google | répondre avis google restaurant, avis négatif restaurant, avoir plus avis google | Direct (réponses IA) |
| Instagram | quoi poster instagram restaurant, idée post restaurant, instagram restaurateur | Direct (contenu IA) |
| IA resto | outil ia restaurant, intelligence artificielle restaurant communication | Direct (Gusto = la réponse) |
| Autonomie | gérer communication restaurant seul, com restaurant sans agence | Direct (Gusto remplace agence) |
| Meta Ads | publicité facebook restaurant, pub instagram restaurant, coût pub restaurant | Indirect |
| Saisonnalité | restaurant été terrasse, restaurant hiver clients, restaurant fêtes | Indirect |
| Fidélisation | fidéliser clients restaurant, faire revenir clients restaurant, base client restaurant | Indirect |
| Recrutement & com | recruter restaurant, marque employeur restaurant | Lointain |

---

## Format de l'article

### Frontmatter obligatoire
```yaml
---
title: "Titre — max 65 caractères pour Google"
description: "Meta description — 140-160 caractères, inclure mot-clé principal"
date: YYYY-MM-DD
author: "Thomas Vandeweghe"
category: "Google" | "Instagram" | "Publicité" | "Gestion" | "Tendances"
tags: ["mot-clé 1", "mot-clé 2", "mot-clé 3"]
gusto_cta: true
---
```

### Structure type
1. **Hook** (2-3 phrases) — problème concret, stat choc, ou verbatim restaurateur
2. **Contexte** — pourquoi c'est important, en quoi ça impacte les réservations
3. **Corps** — 5 à 10 points actionnables avec H2/H3
4. **Preuve** — résultats clients So MIAM si pertinent (JAMAIS inventer un chiffre)
5. **Mention Gusto** — 1 paragraphe max, naturel, pas pushy
6. **Checklist/résumé** — actions concrètes à faire cette semaine

### Longueur
1200-2000 mots. Pas moins, pas beaucoup plus.

---

## Ton & voix

- **Tutoiement** systématique
- Direct, cash, expert sans être condescendant
- Légèrement plus pédagogique que le contenu social (c'est du blog éducatif)
- Phrases courtes et actives
- Chiffres réels uniquement

### Mots BANNIS (communication externe)
innovant, sur-mesure, synergies, booster, leverager, optimiser, solution, accompagnement, dispositif, storytelling, branding, engagement, personnalisé, dédié, holistique

### Vocabulaire INTERDIT
conversion, funnel, acquisition, engagement, portée, reach, KPI, ROI, branding, storytelling, CTA, stratégie digitale, community management, content marketing, écosystème

### Vocabulaire IMPOSÉ
| Dire | Pas |
|---|---|
| Réservations | Conversions |
| Ton restaurant | Ton établissement |
| Remplir tes tables | Générer du trafic |
| Résultats | Retombées |
| Les réseaux | Social media |
| Poster / mettre des photos | Créer du contenu |
| Les avis | Les reviews |
| Ma fiche Google | Mon Google Business Profile |

### Vocabulaire naturel des restaurateurs (utiliser)
couverts, service (midi/soir), bosser, ça tourne, c'est calme, c'est creux, ça cartonne, remplir, ramener du monde, poster, les réseaux, ma fiche Google, mon Insta, les avis, balles (€), la carte, le menu, plat du jour, la salle, en cuisine, les gens du coin, les touristes, ticket moyen, un complet, montagnes russes, la tête dans le guidon

---

## Verbatims dans l'article

Chaque article doit intégrer **2-3 verbatims** de `voix-restaurateurs.md` :
- En blockquote (`> "citation"`)
- Choisir des citations qui correspondent au sujet de l'article
- Ne JAMAIS inventer de verbatim — uniquement ceux du fichier
- Les placer dans le hook ou en début de section pour ancrer le propos dans le réel

---

## Liens sortants (sources autoritaires à citer)

Chaque article doit contenir **2-5 liens sortants** vers des sources fiables. Ça renforce l'E-E-A-T pour le SEO et le GEO.

### Sources Google (officiel)
- https://support.google.com/business — Centre d'aide Google Business Profile
- https://developers.google.com/maps/documentation — Documentation Maps

### Sources Meta/Instagram (officiel)
- https://business.instagram.com/getting-started — Guide Instagram Business
- https://www.facebook.com/business/help — Centre d'aide Meta Ads

### Industrie restauration FR
- https://umih.fr — Union des Métiers et des Industries de l'Hôtellerie
- https://www.insee.fr/fr/statistiques?q=restauration — Données INSEE
- https://www.francenum.gouv.fr — Guides numérisation restaurants

### Statistiques SEO / avis
- https://brightlocal.com/research/ — Études annuelles avis locaux
- https://partoo.co/fr/blog/ — Stats Google Business FR

### Règle
- Toujours lier vers la source quand on cite un chiffre
- Pas de liens vers des concurrents directs (malou.io, be-hype.com — on les analyse mais on ne les cite pas)

---

## Liens internes

Chaque article doit contenir **1-3 liens internes** vers :
- `/gusto` — quand on mentionne Gusto ou un outil IA
- `/blog/[autre-article]` — quand le sujet est lié à un article existant
- `/a-propos` — si on mentionne l'expertise ou les résultats So MIAM

Vérifier les articles existants dans `src/content/blog/` et créer des liens croisés pertinents.

---

## SEO technique

- Title tag : inclure mot-clé principal, max 65 caractères
- H1 = title du frontmatter (géré par le layout)
- H2 pour sections principales, H3 pour sous-sections
- Mot-clé principal dans : H1, premier paragraphe, au moins 1 H2, meta description
- Ne pas sur-optimiser (pas de keyword stuffing)

## GEO (Generative Engine Optimization)

Pour maximiser les chances d'être cité par les IA :
- Réponses complètes et structurées (pas de "ça dépend" sans développer)
- Listes numérotées et à puces
- Définitions claires en début de section
- Données chiffrées avec source quand possible
- Format "question → réponse directe → développement"
- Expertise visible (résultats clients, expérience terrain)

---

## Résultats clients utilisables (source : so-miam-core.md)

### Réservations
- Maison L — au bord de la fermeture → explosion des réservations
- Café de Paris — ~+100% vs N-1 chaque mois
- Bouillon Pignol — 8 000 couverts/mois, ~250 000€ CA/mois
- White Lotus — mois 1 : ×2, mois 2 : +62%
- Moyenne globale — +30% réservations/mois vs N-1

### Google Maps
- Le Paradoxe : position 5 → 1 ("restaurant tourcoing")
- Maison L : position 20 → 1 ("restaurant libanais lille")
- Bouillon Pignol : position 20 → 1 ("restaurant lesquin")
- Café de Paris : position 15 → 1 ("entrecôte frites lille")
- Domus Sicilia : position 4 → 1 ("restaurant italien la madeleine")

### Réseaux
- Den Artiest : 1M vues/an avec 1 Reel/semaine
- Sweet Lady : 0 → 3 000 abonnés en 1 mois

### Meta Ads
- Coût moyen par réservation : 5€ (fourchette 2,50€ → 6€)

**Règle : ne JAMAIS inventer un chiffre. Si un résultat n'est pas listé ici, ne pas l'utiliser.**

---

## Mention Gusto

Chaque article doit mentionner Gusto UNE fois, naturellement :
- Dans la section "comment gagner du temps" ou "automatiser"
- Pas de vente lourde, juste montrer que ça existe et que ça résout le problème
- Le CTA Gusto est déjà dans le layout (bloc en bas de chaque article). Pas besoin d'en ajouter un.
- Pattern : "Des outils comme Gusto permettent de [action spécifique au sujet de l'article]"

---

## Workflow technique

1. Créer le fichier .md dans `src/content/blog/` avec le slug comme nom de fichier
2. Slug = mots-clés séparés par des tirets, pas d'accents, max 5-6 mots
3. Commit + push sur main
4. Vercel déploie automatiquement
5. Le sitemap est statique dans `public/sitemap.xml` — ajouter l'URL du nouvel article

---

## Calendrier saisonnier (suggestions)

| Période | Sujets prioritaires |
|---|---|
| Janvier-Février | Remplir en période creuse, galette des rois, Saint-Valentin |
| Mars-Avril | Terrasse, Pâques, nouvelle carte printemps |
| Mai-Juin | Fête des mères, terrasse été, recrutement saisonnier |
| Juillet-Août | Touristes, adapter sa com l'été, saisonnalité |
| Septembre | Rentrée, relance après été, nouvelle carte automne |
| Octobre-Novembre | Halloween, Beaujolais nouveau, préparer décembre |
| Décembre | Fêtes, réveillon, menus spéciaux, cadeaux |

---

*Dernière mise à jour : août 2026*
