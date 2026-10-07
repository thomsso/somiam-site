# Blog So MIAM — rédaction, preuves et amélioration continue

Décisions confirmées par Thomas le 7 octobre 2026. Ce document remplace les anciennes consignes : deux articles par semaine, lundi et jeudi à 9 h Europe/Paris, publication automatique autorisée avec commit et push après contrôles.

## Avant chaque publication : observer, choisir, mesurer

1. Lire AGENTS.md, CLAUDE.md, ce document, les contrôles pertinents de .claude, les articles existants et le fichier privé voix-restaurateurs.md. Préserver les changements d’autres travaux.
2. Lire `.seo/performance.json`, `.seo/decisions.json` et `.seo/preuves.md`. Ce sont des données privées ignorées par Git, jamais servies par le site. Si elles manquent, les reconstruire depuis les sources, sans inventer de valeurs.
3. Dans Search Console, compte thomas@so-media.fr, propriété **sc-domain:so-miam.com**, prendre les 28 derniers jours complets disponibles et les 28 précédents. Noter la dernière date disponible, les filtres et la fraîcheur. Comparer aussi les deux derniers mois complets lors du premier passage du mois. Une valeur inconnue reste `null`, jamais zéro. Une somme d’impressions des pages n’est pas le total de la propriété.
4. Collecter par URL : clics, impressions, CTR, position et requêtes ; séparer marque et hors marque avec la règle employée. Dans le rapport IA Google, relever les impressions par page et le total. Ne pas assimiler impressions IA, visites et ventes. Ne pas extrapoler à ChatGPT ou Perplexity, dont le suivi est différé à la demande de Thomas.
5. Conserver une capture ou un relevé UI daté avec les périodes et filtres. Mettre à jour performance.json en conservant les anciens relevés dans `.seo/snapshots/`. Si export indisponible, le tableau visible suffit. Si accès indisponible, utiliser le dernier relevé en le datant explicitement ; ne prétendre ni avoir analysé des données fraîches ni avoir observé une progression.
6. Exécuter `npm run seo:opportunities`. Les suggestions sont des hypothèses : lire les requêtes, l’ancienneté et l’intention avant de décider. Une page récente, une faible exposition ou des périodes différentes ne permettent pas de déclarer un gagnant. Aucun seuil ci-dessous n’est une règle Google.
7. Choisir une action et inscrire dans decisions.json : date, URL source, requêtes observées, preuve, hypothèse, nouvel angle, intention distincte, cible commerciale, métriques initiales, date de contrôle à +28 jours, statut. Garder les identifiants et dates des publications pour éviter les doublons à la relance.
8. Un article qui gagne des clics ou des impressions IA peut donner un sujet voisin : diagnostic précis, cas documenté, procédure ou erreur fréquente. Il faut une autre question à résoudre, de nouvelles preuves et un lien vers l’article d’origine. Changer le titre et reformuler le même contenu n’est pas une nouvelle intention. Si les mêmes requêtes et la même réponse sont visées, améliorer la page existante sans créer un doublon.
9. En plus des deux nouveaux articles hebdomadaires, améliorer au maximum un ancien article par exécution si une opportunité est étayée. Corriger immédiatement une erreur factuelle. Hors correction nécessaire, éviter de réécrire une page déjà modifiée depuis moins de 28 jours ; laisser le temps d’observer.
10. À la date de contrôle, comparer des fenêtres complètes de même durée avant/après, avec délai de disponibilité des données et contexte saisonnier. Inscrire succès, résultat mitigé ou indéterminé, et pourquoi. Un avant/après n’établit pas seul une causalité. Réutiliser les apprentissages dans la sélection suivante.

## Veille et choix du sujet

Croiser les résultats avec les douleurs réelles des restaurateurs (voix-restaurateurs.md, priorités 1–5), Google Trends France, saisonnalité et les articles récents de malou.io/blog, be-hype.com/blog, guest-suite.com/blog et postine.fr. Les concurrents servent à la veille, pas à copier ni à prouver un chiffre. Sources indisponibles : le noter et chercher ailleurs. Ne jamais inventer de volume de recherche.

Clusters : remplissage midi/jours creux, fiche Google, avis, Instagram, autonomie, outils IA, publicité, fidélisation et saisonnalité. Respecter les pages commerciales existantes, notamment la home nationale et la page agence Lille. Octobre–novembre : préparer les groupes et décembre, seulement avec une intention distincte des pages existantes.

## Offres et liens : ne jamais les confondre

- `offer: gusto` : outil autonome **59 €/mois**, sans la formation ; lien `/gusto`. Rédaction de posts et de réponses aux avis : décrire uniquement les fonctions vérifiées. Aucun suivi automatique de positions géographiques, import CRM, relance SMS ou suivi du coût publicitaire sans preuve de fonctionnalité livrée.
- `offer: formation` : apprendre à gérer sa communication ; `https://recette.so-miam.com/` mène à une inscription, puis une vidéo et un appel de vente. Formation **1 400 €**, articulée avec abonnement **59 €/mois**. Ne pas appeler ce lien « essai Gusto », « achat immédiat » ou « réservation directe ». Ne promettre aucune durée offerte sans revalidation actuelle.
- `offer: agence` : besoin de déléguer, campagne ou production ; `/contact`. Aucun prix agence universel ajouté sans décision actuelle.

Choisir selon le besoin dominant, pas pousser systématiquement le logiciel. Le bloc final est géré par le layout. Une mention naturelle de Gusto dans le corps au maximum si pertinente ; ne pas forcer une fonction hors sujet.

## Place des études de cas — décision de Thomas du 7 octobre

Conserver le format pratique des articles : questions terrain, exemples fictifs signalés, tutoriels et checklists. Aucun bloc de résultats clients obligatoire. Les études de cas doivent rester rares : garde-fou éditorial d’au plus un nouvel article sur huit avec un résultat client, jamais deux publications consécutives, et ne pas recycler le même cas à chaque cycle. Ce plafond n’est pas un objectif à remplir. Consulter les huit dernières publications avant d’en utiliser un. Les performances servent surtout à trouver des questions voisines originales, pas à multiplier les récits clients. Les sources Notion servent à vérifier un résultat lorsqu’il est réellement utile, pas à alimenter chaque article.

## Preuves avant rédaction

Source de référence pour les cas : Notion « Résultats clients », identifiant `342dda7d76788069a212d0ad5395a974`, confirmé par Thomas. Consulter la version actuelle et garder le relevé privé dans `.seo/preuves.md`. Une archive commerciale ou un article ancien n’est pas une preuve primaire.

Pour chaque chiffre, conserver : source exacte consultée, date, période mesurée, unité, population et calcul. Un cas précis n’est pas une moyenne. Une réservation n’est pas un couvert. Une croissance de réservations ne prouve pas l’effet exclusif du SEO ou de la publicité. Une position Maps dépend du lieu, de la requête et de la date ; sans protocole complet, qualifier explicitement l’exemple d’historique non comparable.

Ne plus reprendre : Café de Paris « +100 % chaque mois », Bouillon Pignol « 250 000 €/mois », « 15 % du classement grâce aux réponses », « 520 % d’appels grâce aux photos », première place garantie ou gains de temps universels. Les anciens agrégats +30 % et CPA 5 € ne sont pas des moyennes actuelles sans période et calcul vérifiés.

Les fonctions Google/Meta doivent venir de leurs documentations officielles précises consultées. Une page d’accueil de documentation n’étaye pas un chiffre. Une étude étrangère ou ancienne garde son année, son pays et son périmètre. Retirer un chiffre invérifiable, jamais en inventer un pour le remplacer. Prix, droit et barèmes : revalider sur source officielle au moment de rédiger.

Avant publication, enregistrer une fiche privée par article dans `.seo/reviews/<slug>.json` : sources consultées et affirmations qu’elles soutiennent, verbatims exacts, résultats clients, fonctions produit, liens, limites, relecture critique et résultat des contrôles. Pas de « score qualité » automatique présenté comme une vérification factuelle. Une affirmation matérielle sans preuve bloque sa publication jusqu’à correction ou retrait.

## Format et ton

Français, tutoiement, concret, expert sans jargon ni promesse absolue. Cible : restaurateurs débordés qui veulent remplir leurs tables et comprendre quoi faire. Viser 1 200–2 000 mots utiles, pas du remplissage. Titre ≤65 caractères (le layout n’ajoute pas de suffixe), description 140–160 caractères. Réponse directe au début, 5–10 actions avec H2/H3, limites et exemples clairement fictifs si inventés, puis checklist terrain.

Frontmatter : title, description, date (publication réelle inchangée), updated uniquement pour une modification substantielle, author Thomas Vandeweghe, category, tags, offer (gusto/formation/agence), gusto_cta true. Image et imageAlt facultatifs. Conserver les anciens slugs quand on améliore un article.

Intégrer 2–3 citations exactes autorisées de voix-restaurateurs.md, anonymisées sans contexte privé. Ne jamais fabriquer un témoignage. Si aucun verbatim pertinent disponible, le signaler et ne pas forcer un témoignage. Ajouter 2–5 sources précises réellement consultées et 1–3 liens internes pertinents. Vérifier français, répétitions, utilité, offre et preuves dans une deuxième relecture critique distincte du brouillon.

Éviter : innovant, sur-mesure, synergies, booster, leverager, solution, dispositif, storytelling, branding, engagement, holistique, funnel, acquisition, reach, KPI, ROI, CTA, écosystème. Préférer réservations, couverts, service midi/soir, les réseaux, ma fiche Google, les avis, le menu. Une citation exacte ou un nom officiel ne doit pas être altéré pour satisfaire une liste de mots.

## GEO

Apporter des réponses compréhensibles, des exemples originaux, des sources identifiables et une expertise visible. Publier des informations accessibles et indexables avec un auteur identifié. Aucun fichier ou balisage magique ne garantit les citations IA. Google IA et les autres assistants sont des mesures distinctes.

## Contrôles et livraison

- Créer Markdown + URL canonique sitemap ; actualiser lastmod de la page et du blog lors d’une modification substantielle. Appliquer les règles de footer du projet.
- `npm run seo:check` vérifie les routes d’offres, métadonnées et erreurs réintroduites connues ; cela ne remplace pas la relecture ni la vérification des sources.
- Construire dans une copie temporaire complète, avec package-lock.json et configuration : npm ci puis npm run build. Ne pas installer dans le dépôt principal. Ne pas embarquer les changements préexistants d’autres travaux.
- Vérifier pages modifiées sur navigateur ordinateur/mobile : rendu, liens, offre, prix, canonical, indexabilité, ressources et sitemap. Questions visibles pour toute FAQ structurée. Mail thomas@so-miam.com ; pas de lien tel:.
- Après réussite, commit ciblé et push normal vers origin/main. Aucun push forcé, aucun nettoyage massif des verrous/objets Git. Si main contient des commits tiers non livrés, isoler le travail depuis origin/main.
- Vérifier Vercel READY pour le bon commit, URL publique HTTP 200 avec contenu attendu, index et sitemap. Un build local ne prouve pas une publication.
- Inspecter ensuite la nouvelle URL dans Search Console et demander l’indexation une seule fois si nécessaire. Suivre les demandes en attente. Respecter CAPTCHA, quota et connexion ; ne pas contourner. Pas d’Indexing API ni ancien ping sitemap pour le blog. Indexation et délai ne sont jamais garantis.
- Compte rendu : lien publié, sujet et justification fondée sur les données, ancienne page améliorée, hash, contrôles, indexation et date du prochain contrôle. Signaler seulement résultat nouveau, changement utile ou blocage/action humaine ; rester silencieux aux relances sans changement.
