# KN WEB & TECHNOLOGY — site + dashboard admin

Site vitrine de l'agence **KN WEB & TECHNOLOGY**, reconstruit en **React + Vite**,
avec mode sombre/clair, animations (Framer Motion), images optimisées en WebP,
et un **tableau de bord admin** (Supabase) pour gérer le contenu sans toucher au code :
blog/actualités, services, projets, équipe, bannières promo planifiées, annonces,
FAQ et messages reçus.

---

## 1. Démarrage rapide (sans Supabase)

Le site fonctionne **immédiatement**, avec son contenu par défaut, sans aucune
configuration :

```bash
npm install
npm run dev
```

Ouvrez http://localhost:5173. Le dashboard admin (http://localhost:5173/admin)
affichera un écran d'installation tant que Supabase n'est pas connecté (étape 2).

## 2. Connecter Supabase (pour activer le dashboard admin)

1. Créez un projet gratuit sur [supabase.com](https://supabase.com).
2. Dans **SQL Editor**, collez et exécutez `supabase/schema.sql` (crée toutes les
   tables, la sécurité RLS, et le bucket de stockage `media`).
3. Exécutez ensuite `supabase/seed.sql` dans le même éditeur : il remplit le
   dashboard avec le contenu réel du site (vous pourrez tout modifier ensuite).
4. Dans **Authentication → Sign In / Providers**, laissez le fournisseur
   **Email activé** (sinon la connexion admin échoue avec une erreur 422) et
   désactivez seulement « Allow new users to sign up » (le dashboard n'a pas de
   page d'inscription publique — c'est voulu).
5. Dans **Authentication → Users → Add user**, créez votre propre compte
   (email + mot de passe) : c'est votre identifiant pour vous connecter à
   `/admin`.
6. Dans **Project Settings → API**, copiez `Project URL` et `anon public key`.
7. Copiez `.env.example` vers `.env` et renseignez ces deux valeurs :

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

8. Relancez `npm run dev`. Connectez-vous sur `/admin/login`.

À partir de là, tout ce que vous modifiez dans `/admin` remplace automatiquement
le contenu affiché sur le site public — sans redéploiement.

## 3. Le dashboard admin (`/admin`)

| Section | Ce que vous pouvez faire |
|---|---|
| **Blog & actualités** | Rédiger des articles (Markdown), les publier immédiatement ou les **programmer** à une date future, gérer les brouillons — utile pour publier régulièrement du contenu et améliorer le référencement. Le **temps de lecture** est calculé automatiquement depuis le texte (≈ 200 mots/min) si le champ est laissé vide ; la date s'affiche dans la langue choisie par le visiteur. |
| **Services** | Ajouter, modifier, réordonner ou masquer une offre (prix, description, image, points forts, page dédiée). |
| **Projets** | Gérer le portfolio de réalisations. |
| **Équipe** | Ajouter/retirer des membres, photo, rôle, réseaux sociaux. |
| **Bannières promo** | Créer une bannière (image + texte + bouton) avec une **date de début et de fin d'affichage** précise — parfait pour une offre limitée dans le temps. |
| **Annonces** | Un bandeau texte tout en haut du site, lui aussi programmable dans le temps. |
| **FAQ** | Gérer les questions/réponses affichées sur la page « Comment nous travaillons ». |
| **Messages** | Consulter les demandes reçues via le formulaire de contact du site. |
| **Réglages** | Téléphone, WhatsApp, email, adresse, réseaux sociaux affichés partout sur le site. |

Toutes les images uploadées depuis le dashboard sont stockées dans le bucket
Supabase Storage `media` (créé automatiquement par `schema.sql`).

## 4. Scripts disponibles

```bash
npm run dev       # serveur de développement
npm run build     # build de production dans dist/
npm run preview   # prévisualiser le build de production
npm run sitemap   # régénère public/sitemap.xml à partir du contenu (Supabase ou local)
```

`npm run sitemap` génère un sitemap **statique** : utile en secours, mais il
faut redéployer après chaque publication. Pour ne **jamais** redéployer, activez
le SEO à la demande décrit en section 5 bis.

## 5. Déploiement

Le projet se déploie comme n'importe quelle app Vite statique (Netlify, Vercel,
Cloudflare Pages…) :

```bash
npm run build
```

Déployez le contenu de `dist/`. Pensez à renseigner les variables d'environnement
`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` dans les réglages de votre
hébergeur. Configurez également une redirection SPA (`/* → /index.html`,
généralement automatique sur Netlify/Vercel) pour que les URL comme
`/blog/mon-article` fonctionnent au rechargement.

### Hébergement mutualisé par FTP (LWS, cPanel…)

Le site est 100 % statique : il fonctionne sur un hébergement qui n'accepte que le FTP.

1. Vérifiez que `.env` contient vos clés Supabase (elles sont intégrées au site pendant le build).
2. `npm run build`
3. Avec FileZilla, envoyez **le contenu** du dossier `dist/` (pas le dossier lui-même) dans `public_html`. Activez *Serveur → Forcer l'affichage des fichiers cachés* pour que `.htaccess` soit bien envoyé : il gère la redirection HTTPS, les URL comme `/blog/mon-article` et le cache.
4. Le contenu publié depuis `/admin` n'a jamais besoin de nouvel envoi : seul un changement de code en demande un.

Limite : sans code serveur, le SEO à la demande (section 5 bis) n'est pas disponible, sauf via Cloudflare placé devant le site.

## 5 bis. SEO sans redéploiement (recommandé)

Sans cette étape, un nouvel article publié depuis `/admin` est visible par les
visiteurs immédiatement, mais Google ne le voit qu'après exécution du
JavaScript et n'a pas de sitemap à jour. Le dossier `edge/` règle le problème :
à chaque requête sur `/blog/:slug`, `/solutions/:slug` ou `/sitemap.xml`, un
petit code lit Supabase en direct et renvoie le HTML complet (titre, meta,
Open Graph, JSON-LD, texte de l'article) ou le sitemap à jour. Résultat mis en
cache 5 minutes : **vous publiez, c'est en ligne et indexable, sans rien
redéployer**. Un article programmé apparaît tout seul à son heure.

Il suffit de définir deux variables d'environnement chez l'hébergeur :
`SUPABASE_URL` et `SUPABASE_ANON_KEY` (mêmes valeurs que dans `.env`).

| Hébergement | Fichiers utilisés | À faire |
|---|---|---|
| **Netlify** | `netlify/edge-functions/seo.js` | Rien d'autre : détecté automatiquement. |
| **Vercel** | `api/seo.js` + `vercel.json` | Supprimer `public/sitemap.xml` (un fichier statique prend le pas sur la route dynamique). |
| **Cloudflare** (gratuit, se place devant *n'importe quel* hébergeur, Namecheap inclus) | `edge/cloudflare-worker.js` | Déployer le Worker, ajouter les routes `/blog/*`, `/solutions/*`, `/sitemap.xml`. |
| **Hébergement classique seul** (cPanel…) | `supabase/functions/sitemap` | Sitemap dynamique uniquement : `supabase functions deploy sitemap --no-verify-jwt`, puis pointer la ligne `Sitemap:` de `robots.txt` vers l'URL de la fonction. Le HTML enrichi des articles n'est pas possible sans code serveur : préférez Cloudflare. |

Alternative sans code : dans Supabase, un *Database Webhook* sur la table
`articles` peut appeler le *Deploy Hook* de Netlify/Vercel pour relancer le
build automatiquement à chaque publication (le site est alors régénéré en
1 à 2 minutes). Les articles programmés ne déclenchent rien : préférez la
solution ci-dessus.

## 5 ter. Assistant IA flottant (`FloatingAssistant`)

Un bouton flottant (juste au-dessus du bouton WhatsApp) ouvre un petit chat
sur le site. Dans sa version actuelle, c'est un **moteur de réponses par
mots-clés**, pensé pour ne jamais exposer de données sensibles : il ne lit
que du contenu public déjà affiché sur le site (services, FAQ, étapes de la
méthode, prix, délais, zone d'intervention, contact) — jamais le contenu de
`/admin` (messages reçus, identifiants, etc.).

Fichier : `src/components/FloatingAssistant.jsx`. La base de connaissances
est construite dans `knowledgeBase` (via `useMemo`) à partir de
`useServices()`, `useFaqs()` et `src/data/processSteps.js`, plus quelques
réponses génériques codées en dur (tarifs, délais, zone, paiement, contact).
La fonction `findAnswer()` fait un score par mots-clés communs entre la
question posée et chaque entrée, et renvoie la meilleure correspondance — ou,
à défaut, invite à continuer la conversation sur WhatsApp.

**Pour le faire évoluer vers un assistant propulsé par un vrai LLM :**

1. Remplacer `findAnswer()` par un appel à une API (OpenAI, Anthropic, ou
   une fonction Supabase Edge qui relaie vers l'un de ces fournisseurs) —
   en passant toujours `knowledgeBase` en contexte système, pour que les
   réponses restent ancrées dans le contenu réel du site (pas d'invention
   de prix ou de délais).
2. Garder le filtre « contenu public uniquement » : ne jamais injecter les
   tables `contact_messages` ou les données d'authentification dans le
   prompt envoyé au LLM.
3. Pour capter des leads automatiquement : dès qu'un message contient une
   intention claire (devis, budget, délai, « je veux commencer »…),
   afficher une mini-étape de collecte (nom + téléphone ou email) directement
   dans le fil de chat, puis enregistrer la conversation dans une nouvelle
   table Supabase (`chat_leads`) — visible ensuite dans `/admin`, comme les
   messages du formulaire de contact.
4. Pour relancer automatiquement les visiteurs indécis, ajouter après 2–3
   échanges sans conversion un message proactif du type « Discutons de
   votre projet sur WhatsApp » avec le lien `waLink()` déjà utilisé
   partout sur le site (numéro principal `672173778`).
5. Envisager un historique persistant par visiteur (`localStorage` pour
   l'ID de session + table Supabase pour l'historique) afin de reprendre une
   conversation interrompue.

## 5 quater. Langue de l'interface (FR / EN)

Un sélecteur **FR | EN** (à côté du bouton clair/sombre, et dans le menu
mobile) traduit **l'interface** du site public : navigation, boutons, titres
et textes des pages, formulaires, bandeau cookies, assistant, pied de page.

- Le **contenu géré depuis `/admin`** (services, projets, équipe, articles du
  blog, FAQ, témoignages, annonces) reste tel que vous l'avez écrit, en
  français. En anglais, une petite mention le signale sur le blog.
- Le français reste **toujours la langue par défaut** : le site ne bascule
  jamais tout seul selon la langue du navigateur (les robots de Google
  naviguent en anglais et doivent continuer à indexer la version française).
  Le choix du visiteur est mémorisé (`localStorage`, clé `kn-lang`).
- Les pages légales (mentions, confidentialité, CGV) et le dashboard admin ne
  sont pas traduits.

Fichiers : `src/i18n/fr.js` et `src/i18n/en.js` (mêmes clés dans les deux),
`src/i18n/LanguageContext.jsx` (`useT()` / `useLanguage()`), `src/i18n/Rich.jsx`
(petite syntaxe dans les textes : `[mot]` = partie mise en couleur,
`**mot**` = gras, `\n` = retour à la ligne).

Pour modifier un texte : changez-le dans `fr.js` **et** `en.js`. Pour ajouter
un texte : créez la même clé dans les deux fichiers, puis
`const t = useT();` et `{t('ma.cle')}` dans le composant. Une clé oubliée en
anglais retombe sur le français (avec un avertissement dans la console en
développement). Pour ajouter une langue : un nouveau fichier de dictionnaire
+ une ligne dans `LANGUAGES` (`LanguageContext.jsx`).

## 5 quinquies. Migration depuis l'ancien site (redirections 301)

Adresse officielle : **https://knwebtechnology.com** (sans www), comme les
balises canonical de l'ancien site. `www.` et `http://` redirigent en 301.

Toutes les anciennes URL (`agence.html`, `site-web-vitrine.html`,
`contact.php`, `service-web.html`, `CGV.html`…) redirigent en **301** vers la
nouvelle page équivalente : Google transfère leur référencement et aucune
ancienne page ne renvoie d'erreur 404. La même liste existe dans trois
fichiers, un par type d'hébergement — à garder identiques :

- `public/.htaccess` (LWS / cPanel / Apache)
- `public/_redirects` (Netlify)
- `vercel.json` (Vercel)

Les ancres de l'ancien site fonctionnent toujours (`/#contact`,
`/#services`, `/agence#vision`…). Le fichier de validation Google Search
Console (`public/googlec2b8a00c2a1ca9e0.html`) est conservé.

Après la mise en ligne : dans Google Search Console, soumettez
`https://knwebtechnology.com/sitemap.xml`.

## 6. Structure du projet

```
src/
  admin/            Dashboard admin (chargé en lazy-loading, jamais téléchargé
                     par un visiteur public)
  components/       Composants partagés du site public (Navbar, Footer, cartes…)
  context/          Thème (clair/sombre) et authentification admin
  i18n/             Dictionnaires FR/EN de l'interface + LanguageContext
  data/             Contenu par défaut (utilisé tant que Supabase est vide)
  hooks/            Accès aux données (Supabase si connecté, sinon fallback local)
  lib/              Client Supabase, upload d'images, CRUD générique
  pages/            Pages publiques du site
  styles/           Design system (variables CSS, thèmes, utilitaires)
supabase/
  schema.sql        Tables + sécurité (RLS) + bucket de stockage
  seed.sql          Contenu de démarrage (à exécuter après schema.sql)
scripts/
  generate-sitemap.mjs
edge/               SEO à la demande (core.js + adaptateur Cloudflare)
netlify/, api/      Adaptateurs Netlify et Vercel
public/
  seed-images/      Images réelles utilisées par seed.sql
```

## 7. Notes techniques

- **Performance** : images converties en WebP et redimensionnées, dashboard
  admin en chargement différé (code-splitting), polices avec `preconnect`.
- **Mode sombre/clair** : géré via variables CSS (`data-theme` sur `<html>`),
  mémorisé dans `localStorage`, sans flash au chargement.
- **SEO** : balises meta/OG par page (`react-helmet-async`), données
  structurées Schema.org (LocalBusiness, Service, Article, FAQPage),
  `sitemap.xml` régénérable, `robots.txt`.
- **Formulaire de contact** : enregistre chaque message dans Supabase
  (visible dans `/admin/messages`) et envoie aussi une copie par email via
  Formspree en secours.
