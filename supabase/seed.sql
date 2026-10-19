-- ============================================================================
-- KN WEB & TECHNOLOGY — Données de démarrage (seed)
-- À exécuter APRÈS schema.sql, dans le même SQL Editor Supabase.
-- Remplit le dashboard admin avec le contenu réel du site (modifiable ensuite
-- depuis /admin). Les images pointent vers /seed-images/*, fournies avec le
-- projet — vous pourrez les remplacer par vos propres visuels à tout moment.
-- ============================================================================

-- SERVICES
insert into services (slug, number, icon, title, short_desc, price_label, price_value, image_url, hero_title, hero_highlight, lead, h2, description, features, wa_message, meta_description, sort_order) values
  ('site-web-vitrine', '01', 'globe', 'Site Web & Visibilité', 'Votre entreprise trouvable sur Google en 3 jours. Site vitrine responsive + fiche Google Business optimisée + SEO local inclus.', 'À partir de 75 000 FCFA', 75000, '/seed-images/site-web.webp', 'Votre entreprise ', 'visible sur Google en 3 jours', 'Site vitrine responsive, SEO local, fiche Google Business optimisée – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.', 'Un site qui convertit vos visiteurs en clients', 'Conçu pour être rapide, beau et optimisé pour les moteurs de recherche. Votre entreprise gagne en crédibilité et en visibilité.', '["Design moderne et 100% responsive","Optimisation SEO locale (mots-clés ville + métier)","Fiche Google Business Profile optimisée","Formulaire de contact + carte interactive","Livraison en 3 à 5 jours ouvrés","Hébergement et nom de domaine inclus"]'::jsonb, 'Bonjour, je suis intéressé par la création d''un site web vitrine.', 'Site vitrine responsive, SEO local, fiche Google Business. Votre entreprise trouvable sur Google en 3 jours à Douala, Yaoundé, Édéa et partout au Cameroun. Devis gratuit.', 1),
  ('whatsapp-business-pro', '02', 'whatsapp', 'WhatsApp Business Pro', 'Vos clients reçoivent une réponse 24h/24. Catalogue produits, chatbot FAQ, messages automatiques et formation équipe.', '50 000 FCFA + 15 000/mois', 50000, '/seed-images/whatsapp-business.webp', 'Automatisez votre relation client avec ', 'WhatsApp Business', 'Catalogue interactif, chatbot FAQ, messages automatiques. Vos clients reçoivent une réponse 24h/24 – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.', 'Une solution complète pour votre service client', 'Transformez WhatsApp en un véritable canal de vente automatisé. Catalogue produits, réponses instantanées et formation de votre équipe incluses.', '["Catalogue produits avec prix et description","Messages automatiques (accueil, FAQ, rappel)","Chatbot simple pour qualifier les leads 24h/24","Intégration avec votre CRM ou Google Sheets","Formation de votre équipe (2 sessions)","Support technique inclus"]'::jsonb, 'Bonjour, je suis intéressé par la solution WhatsApp Business Pro.', 'Catalogue interactif, chatbot FAQ, messages automatiques 24h/24 pour votre entreprise. Solution WhatsApp Business Pro pour PME à Douala, Yaoundé, Édéa.', 2),
  ('ecommerce-mobile-money', '03', 'cart', 'E-Commerce Mobile Money', 'Vendez en ligne et encaissez par MTN ou Orange Money dès le premier jour. Synchronisation WhatsApp et tableau de bord inclus.', 'À partir de 200 000 FCFA', 200000, '/seed-images/mobile-money.webp', 'Lancez votre boutique en ligne avec ', 'paiement Mobile Money', 'Vendez en ligne et encaissez par MTN ou Orange Money dès le premier jour. Catalogue illimité, dashboard administrateur et synchronisation WhatsApp – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.', 'Vendez plus avec Mobile Money', 'Intégrez les paiements Orange Money et MTN Mobile Money à votre site e-commerce. Gérez vos stocks, commandes et livraisons facilement.', '["Catalogue produits illimité avec variantes","Paiement sécurisé via Orange Money et MTN Mobile Money","Gestion des commandes, livraison et facturation automatique","Dashboard administrateur complet","Intégration WhatsApp pour suivi des commandes","Formation de votre équipe incluse"]'::jsonb, 'Bonjour, je suis intéressé par votre solution E-Commerce Mobile Money.', 'Vendez en ligne et encaissez par MTN ou Orange Money dès le premier jour. Catalogue illimité, dashboard administrateur pour PME à Douala, Yaoundé, Édéa.', 3),
  ('referencement-google', '04', 'chart', 'Référencement Google', 'Premier sur Google dans votre ville. Audit SEO, optimisation technique, création de contenu et rapports mensuels transparents.', '25 000 FCFA/mois', 25000, '/seed-images/seo.webp', 'Apparaissez en ', 'première page sur Google', 'Audit SEO technique, optimisation contenu, création de backlinks locaux et rapport mensuel transparent – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.', 'Dominez les résultats de recherche localement', 'Nous optimisons votre site pour les recherches locales et nationales. Résultats visibles dès les premières semaines.', '["Audit SEO technique gratuit initial","Recherche de mots-clés stratégiques","Optimisation on-page (balises, contenu, images)","Netlinking local (citations locales)","Rapport mensuel détaillé et suivi des positions","Optimisation Google Business Profile"]'::jsonb, 'Bonjour, je suis intéressé par vos services de référencement Google.', 'Audit SEO, optimisation technique, création de contenu et backlinks locaux. Apparaissez en première page sur Google à Douala, Yaoundé, Édéa.', 4),
  ('branding-identite', '05', 'palette', 'Branding & Identité', 'Logo, charte graphique, kit complet de marque. Une identité visuelle forte qui inspire confiance et reconnaissance immédiate.', 'À partir de 45 000 FCFA', 45000, '/seed-images/branding.webp', 'Créez une marque ', 'forte et reconnaissable', 'Logo, charte graphique, pack identité complet. Une image forte qui inspire confiance – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.', 'Une identité visuelle qui vous ressemble', 'Nous créons une image de marque cohérente et professionnelle, de la conception du logo à la charte graphique complète, pour que votre entreprise soit reconnaissable au premier regard.', '["Logo unique (3 propositions créatives)","Charte graphique complète (couleurs, typographies)","Kit de documents (papeterie, cartes de visite, factures)","Maquette pour réseaux sociaux (covers, template stories)","Fichiers source (AI, EPS, PNG, JPG)","Livret de marque (guide d''utilisation)"]'::jsonb, 'Bonjour, je suis intéressé par vos services de branding et identité.', 'Logo, charte graphique, pack identité complet. Créez une marque forte et reconnaissable à Douala, Yaoundé, Édéa et partout au Cameroun.', 5),
  ('automatisation-ia', '06', 'robot', 'Automatisation & IA', 'L''intelligence artificielle au service de votre productivité. Chatbots, réponses auto, qualification de leads, rapports intelligents.', 'Sur devis', null, '/seed-images/automatisation-ia.webp', 'L''intelligence artificielle au service de votre ', 'productivité', 'Workflows intelligents, chatbots IA, automatisation des processus métier – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.', 'Des solutions IA sur mesure', 'Automatisez vos tâches répétitives, qualifiez vos leads 24h/24 et améliorez votre efficacité opérationnelle grâce à des solutions IA sur mesure.', '["Chatbot IA pour votre site ou WhatsApp","Automatisation de campagnes email / SMS","Intégration CRM avec synchronisation automatique","Assistant IA pour la génération de contenu","Analyse prédictive des ventes et comportement client","Formation et accompagnement inclus"]'::jsonb, 'Bonjour, je suis intéressé par vos solutions d''automatisation et IA.', 'Workflows intelligents, chatbots IA, automatisation des processus métier. Gagnez en productivité grâce à l''intelligence artificielle à Douala, Yaoundé, Édéa.', 6),
  ('hebergement-infra', '07', 'cloud', 'Hébergement & Infra', 'Serveurs rapides, SSL, sauvegardes quotidiennes et 99.9% de disponibilité. Votre site ne dort jamais.', 'À partir de 8 000 FCFA/mois', 8000, '/seed-images/hebergement.webp', 'Un hébergement ', 'fiable, rapide et sécurisé', 'Serveurs ultra-rapides, SSL, sauvegardes quotidiennes et 99.9% de disponibilité – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.', 'Votre site mérite le meilleur', 'Rapidité, sécurité et disponibilité garanties. Nous gérons toute la partie technique pour que vous n''ayez rien à faire.', '["Stockage SSD ultra rapide","Certificat SSL inclus","Sauvegardes automatiques quotidiennes","Protection DDoS et firewall applicatif","Support technique 7j/7","Migration gratuite depuis un ancien hébergeur"]'::jsonb, 'Bonjour, je suis intéressé par vos services d''hébergement et d''infrastructure.', 'Serveurs rapides, SSL, sauvegardes quotidiennes et 99.9% de disponibilité. Hébergement professionnel pour votre site à Douala, Yaoundé, Édéa.', 7),
  ('maintenance-support', '08', 'wrench', 'Maintenance & Support', 'Mises à jour, corrections, sécurité et support humain sur WhatsApp. Une vraie personne répond sous 2 heures.', '15 000 FCFA/mois', 15000, '/seed-images/maintenance.webp', 'Votre site toujours ', 'sécurisé et performant', 'Mises à jour, corrections de bugs, sécurité et support WhatsApp sous 2h – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.', 'Nous veillons sur votre site pour que vous vous concentriez sur votre cœur de métier', 'Intervention rapide en cas de problème et suivi régulier. Une tranquillité d''esprit totale.', '["Mises à jour de sécurité et correctifs","Sauvegardes et restaurations","Surveillance 24h/24 des performances","Assistance par WhatsApp (réponse sous 2h)","Rapport d''activité mensuel","Optimisation des performances"]'::jsonb, 'Bonjour, je suis intéressé par vos services de maintenance et support.', 'Mises à jour, corrections de bugs, sécurité et support WhatsApp sous 2h. Tranquillité d’esprit pour votre site à Douala, Yaoundé, Édéa.', 8),
  ('app-web', '09', 'code', 'Applications Web & SaaS', 'Portails clients, tableaux de bord et plateformes SaaS sur mesure, scalables et sécurisées pour piloter votre activité.', 'À partir de 200 000 FCFA', 200000, '/seed-images/app-web.webp', 'Des outils digitaux puissants pour ', 'piloter votre activité', 'Des applications web sur mesure, plateformes SaaS et portails clients. Scalables, sécurisées et pensées pour votre métier – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.', 'Des applications intuitives et performantes', 'Nous concevons des applications web intuitives et performantes : portails clients, tableaux de bord, logiciels métiers, places de marché et solutions SaaS. Tout est développé sur mesure pour s''adapter parfaitement à vos processus.', '["Applications web responsives (React, Vue, Laravel)","Plateformes SaaS multi-tenants","Portails clients et tableaux de bord analytiques","Intégration d''API (Mobile Money, CRM, paiements)","Hébergement scalable et maintenance incluse","Formation et documentation utilisateur"]'::jsonb, 'Bonjour, je suis intéressé par vos services d''applications web et SaaS.', 'Applications web sur mesure, plateformes SaaS, portails clients et intégrations API pour votre entreprise à Douala, Yaoundé, Édéa.', 9),
  ('consulting-audit', '10', 'audit', 'Consulting & Audit', 'Un regard extérieur et expert sur votre présence digitale : audit complet, recommandations claires et plan d''action priorisé.', 'À partir de 40 000 FCFA', 40000, '/seed-images/consulting-audit.webp', 'Un diagnostic clair pour ', 'des décisions digitales éclairées', 'Audit de votre site, de votre visibilité et de vos outils digitaux, suivi de recommandations concrètes et priorisées — pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.', 'Savoir précisément où investir en premier', 'Avant de dépenser dans un nouveau site ou une campagne, nous analysons l''existant : performance, sécurité, référencement, expérience utilisateur et outils internes. Vous repartez avec un plan d''action clair, chiffré et priorisé.', '["Audit technique et SEO complet de votre site actuel","Analyse de votre présence digitale (réseaux sociaux, avis, concurrence)","Évaluation de vos outils et processus internes","Recommandations priorisées avec estimation de coûts","Restitution en visioconférence ou en présentiel","Rapport écrit détaillé, réutilisable avec n''importe quel prestataire"]'::jsonb, 'Bonjour, je suis intéressé par un audit / consulting digital.', 'Audit digital complet et recommandations priorisées pour votre entreprise à Douala, Yaoundé, Édéa. Consulting indépendant avant tout investissement.', 10)
on conflict (slug) do nothing;

-- ÉQUIPE
insert into team_members (name, role, description, image_url, social, sort_order) values
  ('Nloka Victor Emmanuel', 'Fondateur & Consultant en transformation digitale', 'Responsable de la vision, de la stratégie et du développement de l''agence.', '/seed-images/Moi_.webp', '{"whatsapp":"https://wa.me/237672173778","linkedin":"#"}'::jsonb, 1),
  ('Njayou Ibrahim Mounir', 'CTO – Directeur Technique', 'Responsable du développement, de l''architecture et de la sécurité des solutions.', '/seed-images/ibrahim.webp', '{"github":"#","linkedin":"#"}'::jsonb, 2),
  ('Nguemtchoueng N. Lucreesse M.', 'QCP Manager', 'Responsable du contrôle qualité, des procédures et de la satisfaction client.', '/seed-images/manuella.webp', '{"linkedin":"#"}'::jsonb, 3),
  ('Ngo Kinyock Andreinna H.', 'CMCO – Marketing & Community', 'Responsable des réseaux sociaux, de l''animation de communauté et des statistiques.', '/seed-images/andreinna.webp', '{"instagram":"#","linkedin":"#"}'::jsonb, 4),
  ('Simo Nguebissi George M.', 'CCCO – Communication & Création', 'Responsable de la stratégie de communication, des supports visuels et des campagnes.', '/seed-images/Simo.webp', '{"behance":"#","dribbble":"#"}'::jsonb, 5),
  ('Mandeng Emmanuel James', 'CFO – Directeur Financier', 'Responsable de la comptabilité, de la trésorerie et du suivi des paiements.', '/seed-images/james.webp', '{"linkedin":"#"}'::jsonb, 6);

-- PROJETS
insert into projects (slug, title, category, tagline, description, image_url, link, featured, problem, solution, tags, gallery, sort_order) values
  ('empire-longrich', 'Empire - Longrich', 'ecommerce', 'Bien-être & santé · E-commerce + SEO', 'E-commerce bien-être et santé. Page 1 Google pour « Empire longrich » en 3 semaines. +200% de commandes en ligne grâce à l''intégration Mobile Money et au SEO local.', '/seed-images/empire-longrich.webp', 'https://longrich-empire.netlify.app/', true,
    'Empire - Longrich vendait ses produits de bien-être uniquement par bouche-à-oreille et messages privés. Aucune présence en ligne, aucune visibilité sur Google, et des commandes prises à la main sans suivi ni moyen de paiement en ligne — impossible de grandir au-delà du réseau personnel du gérant.',
    'Nous avons conçu une boutique e-commerce complète avec fiches produits détaillées, intégration Mobile Money (MTN & Orange) pour un paiement immédiat, et une stratégie SEO local ciblée sur « Empire Longrich » et les termes du secteur bien-être. Résultat : première page Google en 3 semaines et un flux de commandes en ligne continu.',
    '["E-commerce","Mobile Money","SEO local","Bien-être"]'::jsonb, '["/seed-images/empire-longrich.webp"]'::jsonb, 1),
  ('alexa-shop', 'Alexa Shop', 'ecommerce', 'Mode · E-commerce', 'Boutique e-commerce mode avec paiement MTN Mobile Money. Page 1 Google en 3 semaines. Interface fluide et catalogue produit dynamique.', '/seed-images/alexa-shop.webp', 'https://alexa-shop.vercel.app', false,
    'Alexa Shop avait un catalogue mode qui changeait chaque semaine, mais aucun site pour le présenter : les clientes découvraient les nouveautés uniquement sur les statuts WhatsApp, avec un risque constant de rupture de stock non signalée et de commandes perdues dans la discussion.',
    'Une boutique en ligne rapide avec catalogue dynamique facilement mis à jour depuis un back-office simple, paiement MTN Mobile Money intégré au tunnel de commande, et une structure pensée pour le référencement local. La boutique est aujourd''hui en première page Google trois semaines après la mise en ligne.',
    '["E-commerce","Mode","Mobile Money","Catalogue dynamique"]'::jsonb, '["/seed-images/alexa-shop.webp"]'::jsonb, 2),
  ('ecohabitat', 'Ecohabitat', 'marketing', 'Rénovation · SEO', 'Site web de rénovation optimisé SEO. +150 demandes de devis reçues par mois. Stratégie de contenu et backlinks locaux.', '/seed-images/ecohabitat.webp', 'https://ecohabitat-fr.vercel.app/', false,
    'Ecohabitat avait un site vitrine existant mais quasiment invisible sur Google : zéro stratégie de mots-clés, contenu générique, et aucune demande de devis générée directement par le site malgré un vrai savoir-faire en rénovation.',
    'Refonte du contenu autour des requêtes réellement tapées par les clients, optimisation technique complète (vitesse, balises, structure), et campagne de backlinks locaux. Le site génère désormais plus de 150 demandes de devis qualifiées par mois.',
    '["SEO","Rénovation","Génération de leads","Contenu"]'::jsonb, '["/seed-images/ecohabitat.webp"]'::jsonb, 3),
  ('les-delices-d-edea', 'Les délices d''Édéa', 'web', 'Restaurant · Site Web', 'Site restaurant avec réservations en ligne et chatbot WhatsApp 24h/24. Augmentation de 80% des commandes à emporter.', '/seed-images/les-delices-d-edea.webp', 'https://les-delices-d-edea.vercel.app', false,
    'Le restaurant recevait toutes ses réservations et commandes à emporter par téléphone, avec des appels manqués aux heures de pointe et aucune trace écrite des commandes — source d''erreurs et de clients perdus.',
    'Un site vitrine avec menu à jour, réservation de table en ligne et un chatbot WhatsApp disponible 24h/24 pour les commandes à emporter, connecté directement à la ligne du restaurant. Les commandes à emporter ont augmenté de 80% dans les deux mois suivant le lancement.',
    '["Site Web","Restaurant","Chatbot WhatsApp","Réservation"]'::jsonb, '["/seed-images/les-delices-d-edea.webp"]'::jsonb, 4),
  ('poussin-sarl', 'Poussin Sarl', 'web', 'Aviculture · Site Web', 'Site aviculture : réservation de poussins d''un jour en ligne, conseils (support PDF et vidéo). Gestion de stock et alertes SMS.', '/seed-images/poussin-sarl.webp', 'https://poussin-sarl.vercel.app', true,
    'Poussin Sarl gérait ses réservations de poussins d''un jour sur un cahier papier, sans visibilité sur les stocks disponibles en temps réel, ce qui provoquait des réservations en double et des éleveurs déçus en arrivant sur place.',
    'Une plateforme de réservation en ligne avec stock synchronisé en temps réel, alertes SMS automatiques aux éleveurs, et une bibliothèque de conseils d''élevage (PDF et vidéo) accessible directement depuis le site. Zéro survente depuis la mise en service.',
    '["Site Web","Aviculture","Réservation","Alertes SMS"]'::jsonb, '["/seed-images/poussin-sarl.webp"]'::jsonb, 5),
  ('ousmashe', 'Ousmashe', 'branding', 'Terroir & Saveur · Site Web', 'Site terroir & saveur. Identité visuelle complète + e-commerce avec commandes via WhatsApp. +150% de commandes en 2 mois.', '/seed-images/ousmashe.webp', 'https://ousmashe.vercel.app', false,
    'Ousmashe vendait des produits du terroir sans identité de marque reconnaissable ni vitrine en ligne cohérente — logo provisoire, aucune charte graphique, et des commandes dispersées entre plusieurs canaux sans suivi.',
    'Création d''une identité de marque complète (logo, palette, ton éditorial) puis d''un site e-commerce aligné sur cette identité, avec un tunnel de commande simplifié via WhatsApp. Les commandes ont augmenté de 150% dans les deux mois suivant le lancement.',
    '["Branding","E-commerce","Terroir","WhatsApp"]'::jsonb, '["/seed-images/ousmashe.webp"]'::jsonb, 6)
on conflict (slug) do nothing;

-- PARTENAIRES
insert into partners (name, logo_url, link, sort_order) values
  ('Poussin SARL', '/seed-images/logo_poussinsarl.webp', '', 1),
  ('Ariefood & Family', '/seed-images/ariefood_and_family.webp', '', 2),
  ('IUT Douala', '/seed-images/Logo_IUT_Douala.webp', '', 3)
on conflict do nothing;

-- CARROUSEL ACCUEIL
insert into hero_images (image_url, caption, sort_order) values
  ('/seed-images/poussin-sarl.webp', 'Poussin SARL', 1),
  ('/seed-images/ousmashe.webp', 'Ousmashe', 2),
  ('/seed-images/lycee-d-ekite2.webp', 'Lycée d''Ekité', 3),
  ('/seed-images/ecohabitat.webp', 'Ecohabitat', 4),
  ('/seed-images/empire-longrich.webp', 'Empire Longrich', 5)
on conflict do nothing;

-- TÉMOIGNAGES (retours réels des clients ; rating 0 = pas de note, pas d'étoiles)
insert into testimonials (author_name, author_role, photo_url, message, rating, sort_order) values
  ('Alexa Shop', 'Boutique de mode en ligne', null,
    'Un accompagnement d''une vraie qualité. Notre boutique a été livrée en seulement 4 jours, et nos ventes ont été multipliées par 4 sur les trois premiers mois.', 0, 1),
  ('Empire Longrich', 'E-commerce bien-être & santé', null,
    'Nos commandes ont été multipliées. Nous avons apprécié la rapidité de livraison du site et la réactivité de l''équipe à chaque problème.', 0, 2),
  ('Les Délices d''Édéa', 'Restaurant à Édéa', null,
    'Depuis la mise en ligne de notre site, nos commandes à emporter ont augmenté de 80 %.', 0, 3),
  ('Ecohabitat', 'Rénovation', null,
    'Nous recevons aujourd''hui plus de 150 demandes de devis par mois grâce à notre site.', 0, 4)
on conflict do nothing;

-- ARTICLES DE BLOG (read_time à null = temps de lecture calculé automatiquement)
insert into articles (slug, title, excerpt, category, content_md, image_url, read_time, status, published_at, seo_title, seo_description) values
  ('seo-local-douala-edea-guide-2025', 'Comment être premier sur Google à Douala ou Édéa – Guide SEO local complet 2025', 'Découvrez les techniques avancées de référencement local au Cameroun : mots-clés géolocalisés, Google Business Profile, citations locales et netlinking.', 'seo', '### Pourquoi le SEO local est indispensable pour votre PME camerounaise ?

Plus de 80 % des consommateurs utilisent Google pour trouver un service près de chez eux. Que vous soyez à Douala, Yaoundé, Édéa ou Bafoussam, apparaître dans les premiers résultats de recherche locale peut doubler votre chiffre d''affaires. Contrairement aux idées reçues, le référencement local ne nécessite pas un gros budget, mais une stratégie cohérente et une connaissance des spécificités camerounaises.

### 1. Optimisez votre fiche Google Business Profile (ex Google My Business)

La fiche Google est le pilier du SEO local. Voici les actions prioritaires :

- <strong>Complétez toutes les informations</strong> : nom, adresse, téléphone, site web, horaires d''ouverture précis.
- <strong>Ajoutez des photos régulièrement</strong> (locaux, produits, équipe). Les entreprises avec des images reçoivent 42 % de demandes d''itinéraire en plus.
- <strong>Encouragez les avis clients</strong> : répondez à chaque avis (positif ou négatif) avec professionnalisme. Utilisez les mots-clés dans vos réponses.
- <strong>Publiez des posts Google</strong> : annonces, offres spéciales, événements. Cela montre à Google que votre fiche est active.

### 2. Structurez votre site pour les recherches locales

Votre site doit parler aux robots et aux humains. Adoptez ces bonnes pratiques :

- <strong>Créez une page « Nous contacter »</strong> avec votre adresse complète, carte interactive et un schéma LocalBusiness (données structurées).
- <strong>Intégrez des pages « ville »</strong> : si vous couvrez plusieurs zones, dédiez une page par localité (ex : « plombier Douala », « plombier Édéa »).
- <strong>Utilisez des balises title et meta description</strong> incluant le nom de la ville et le service principal.
- <strong>Ajoutez un plan du site (sitemap)</strong> et assurez-vous que votre site est rapide et mobile-friendly.

### 3. Obtenez des citations et backlinks locaux

Les annuaires locaux et les liens depuis des sites camerounais renforcent votre autorité. Inscrivez-vous gratuitement sur :

- Annuaire camerounais (camerounweb, camerounlink, etc.)
- Chambres de commerce et sites d’associations professionnelles
- Blogs partenaires ou sites d''actualité locale (avec un article invité)

### 4. Mesurez vos résultats

Utilisez Google Search Console et Google Analytics pour suivre vos positions, le trafic organique et les conversions. Avec une stratégie bien appliquée, vous pouvez atteindre le top 3 en 2 à 4 mois.

<strong>Prêt à passer à l''action ?</strong> Nos experts SEO vous accompagnent avec un audit complet et un plan d''action mensuel sur mesure.', '/seed-images/seo.webp', null, 'published', now() - interval '60 days', 'Comment être premier sur Google à Douala ou Édéa – Guide SEO local complet 2025', 'Découvrez les techniques avancées de référencement local au Cameroun : mots-clés géolocalisés, Google Business Profile, citations locales et netlinking.'),
  ('whatsapp-business-automatisations-ventes', '5 automatisations WhatsApp Business qui transforment vos ventes', 'Utilisez WhatsApp Business pour générer des leads 24h/24, envoyer des rappels de paiement et fidéliser vos clients grâce à des scénarios automatisés.', 'whatsapp', 'WhatsApp est devenu le canal de communication commercial numéro 1 en Afrique centrale. Plus de 90 % des Camerounais équipés d''un smartphone l''utilisent quotidiennement. Automatiser certains échanges vous fait gagner un temps précieux tout en améliorant l''expérience client. Voici cinq automatisations puissantes que nous mettons en place pour nos clients.

### 1. Message d''accueil personnalisé avec qualification

Dès qu''un client vous écrit, répondez instantanément avec un message chaleureux qui présente votre activité et propose un catalogue. Ajoutez un court formulaire (via boutons) pour collecter nom, téléphone et besoin. Cela permet de qualifier le lead avant même une intervention humaine.

### 2. Catalogue produit interactif

WhatsApp Business permet de créer un catalogue avec images, prix et descriptions. En l''associant à un message automatique, vous offrez une vitrine 24h/24. Chaque produit peut être partagé en un clic, et le client commande directement par message.

### 3. Réponses rapides aux questions fréquentes

Créez des modèles pour les questions récurrentes : horaires, prix, livraison, modes de paiement. Utilisez des raccourcis clavier (ex : /prix, /livraison). Cela réduit le temps de réponse de 80 %.

### 4. Relances automatiques pour panier abandonné ou rappel de rendez-vous

Grâce à des outils comme WATI ou Twilio, vous pouvez programmer des relances : par exemple, 2 heures après un devis non finalisé, envoyez un message avec un code promo. Pour les rendez-vous, un rappel 24h avant réduit les absences.

### 5. Chatbot simple pour la qualification et la prise de commande

Un chatbot peut guider le client pas à pas : choix du produit, quantité, adresse de livraison, puis générer un récapitulatif. Ensuite, un humain ne reprend que la validation finale. Résultat : des ventes réalisées même la nuit ou le week-end.

<strong>Besoin de mettre en place ces scénarios ?</strong> Nous configurons votre WhatsApp Business Pro avec formation de votre équipe. Forfait à partir de 50 000 FCFA + 15 000 FCFA/mois pour la maintenance et l''évolution des scénarios.', '/seed-images/whatsapp-business.webp', null, 'published', now() - interval '50 days', '5 automatisations WhatsApp Business qui transforment vos ventes', 'Utilisez WhatsApp Business pour générer des leads 24h/24, envoyer des rappels de paiement et fidéliser vos clients grâce à des scénarios automatisés.'),
  ('mobile-money-ecommerce-cameroun-guide', 'Mobile Money et e-commerce au Cameroun : guide complet pour lancer votre boutique en ligne', 'Orange Money, MTN Mobile Money, gestion des stocks, sécurité des paiements – tout ce qu’il faut savoir pour réussir votre boutique en ligne.', 'ecommerce', 'Le Mobile Money est le mode de paiement préféré des Camerounais pour les achats en ligne. Selon une étude récente, 73 % des internautes déclarent qu''ils achèteraient plus si le paiement par mobile money était disponible. Pourtant, de nombreuses boutiques en ligne échouent faute d''une intégration technique et d''une expérience utilisateur adaptée. Ce guide vous donne les clés du succès.

### Les deux opérateurs indispensables : Orange Money et MTN Mobile Money

Votre boutique doit accepter au minimum ces deux moyens de paiement. Les passerelles comme Lygos, Inlomba ou encore PayTech simplifient l’intégration. Nous recommandons Lygos pour sa fiabilité et son support réactif.

### Étapes pour créer votre e-commerce Mobile Money

- <strong>Choisissez une plateforme e-commerce</strong> : WooCommerce (WordPress) ou Shopify sont les plus adaptés. Nous développons des solutions sur mesure avec des interfaces simples.
- <strong>Intégrez le paiement Mobile Money</strong> : l''utilisateur sélectionne son opérateur, saisit son numéro, reçoit une demande de paiement sur son téléphone et confirme. La transaction est immédiate.
- <strong>Automatisez les confirmations</strong> : envoyez un message WhatsApp ou SMS dès que le paiement est validé, avec le récapitulatif de commande.
- <strong>Mettez en place une gestion de stock fiable</strong> : votre boutique doit décrémenter automatiquement les quantités et vous alerter en cas de rupture.
- <strong>Prévoyez un service client réactif</strong> : via WhatsApp intégré directement sur chaque page produit.

### Exemples de succès au Cameroun

Nous avons accompagné une boutique de vêtements à Douala : en 3 mois, son chiffre d''affaires en ligne a augmenté de 200 % grâce à l''intégration Orange Money et à une campagne WhatsApp ciblée. De même, une quincaillerie à Édéa a vu ses commandes exploser après la mise en place de fiches produits détaillées et d''un chatbot pour les horaires.

### Pièges à éviter

- Ne pas tester le processus de paiement sur tous les opérateurs et tous les téléphones.
- Négliger la sécurisation du site (certificat SSL, protection contre les fraudes).
- Avoir des temps de chargement trop longs (les clients mobiles abandonnent après 3 secondes).

<strong>Vous souhaitez lancer votre boutique e-commerce Mobile Money ?</strong> Contactez-nous pour un devis personnalisé. Nos solutions commencent à 200 000 FCFA, incluant la formation et 3 mois de support.', '/seed-images/mobile-money.webp', null, 'published', now() - interval '40 days', 'Mobile Money et e-commerce au Cameroun : guide complet pour lancer votre boutique en ligne', 'Orange Money, MTN Mobile Money, gestion des stocks, sécurité des paiements – tout ce qu’il faut savoir pour réussir votre boutique en ligne.'),
  ('ia-pme-5-applications-concretes', 'L''intelligence artificielle pour les PME : 5 applications concrètes (sans budget énorme)', 'Chatbots, génération de contenu, analyse d''avis : découvrez 5 applications concrètes de l''IA accessibles aux petites entreprises camerounaises.', 'ia', 'L''intelligence artificielle n''est plus réservée aux multinationales. Aujourd''hui, des outils accessibles permettent aux PME camerounaises d''automatiser des tâches chronophages et d''améliorer leur relation client. Voici cinq applications que vous pouvez mettre en place dès maintenant, souvent avec des budgets très réduits.

### 1. Chatbot sur votre site et WhatsApp

Des solutions comme ManyChat, Chatfuel ou même l''API de WhatsApp Business permettent de créer un chatbot visuel, sans coder. Votre bot peut répondre aux questions fréquentes (horaires, prix, disponibilité), qualifier des leads et même prendre des rendez-vous. Résultat : une disponibilité 24h/24 et une réduction de 50 % du temps passé par vos équipes.

### 2. Génération de contenu avec ChatGPT ou Google Bard

Rédiger des articles de blog, des descriptions de produits ou des posts pour les réseaux sociaux peut prendre des heures. Les IA génératives produisent des brouillons de qualité en quelques secondes. Il ne reste qu’à les relire et les personnaliser. Testez gratuitement ChatGPT-4 ou des versions spécialisées comme Jasper (payant mais très efficace).

### 3. Analyse automatique des avis clients

Des outils comme MonkeyLearn ou l’API Google Natural Language classent les avis positifs/négatifs et extraient les thèmes récurrents. Vous saurez en un coup d’œil ce que vos clients aiment ou ce qui les freine.

### 4. Prévisions de vente et optimisation des stocks

Avec des données historiques (même dans Excel), des IA comme Forecast Pro ou des modules sur Google Sheets peuvent anticiper les pics de demande. Vous éviterez les ruptures de stock ou les surstocks coûteux.

### 5. Assistant virtuel pour les rendez-vous et relances

Des calendriers intelligents (Calendly, vous êtes libre) couplés à un bot permettent à vos clients de réserver un créneau. Le bot envoie des confirmations et rappels automatiquement. Pour les factures impayées, un système de relance par email/SMS peut être automatisé avec des conditions simples.

<strong>Prêt à intégrer l''IA dans vos processus ?</strong> Nous vous conseillons sur les outils les plus adaptés à votre activité et vous assistons dans leur mise en place. Offre d''audit gratuit.', '/seed-images/automatisation-ia.webp', null, 'published', now() - interval '30 days', 'L''intelligence artificielle pour les PME : 5 applications concrètes (sans budget énorme)', 'Chatbots, génération de contenu, analyse d''avis : découvrez 5 applications concrètes de l''IA accessibles aux petites entreprises camerounaises.'),
  ('site-web-responsive-2025', 'Pourquoi votre entreprise a besoin d''un site web responsive en 2025', '80 % des Camerounais naviguent sur mobile. Un site non adapté vous fait perdre des clients et nuit à votre référencement. Explications et solutions.', 'seo', 'Le nombre d''utilisateurs de smartphones ne cesse de croître en Afrique. Au Cameroun, selon l''ART, plus de 12 millions de personnes utilisent leur téléphone pour se connecter à Internet. Pourtant, de nombreux sites d''entreprises locales ne sont pas optimisés pour les écrans mobiles. Conséquences : temps de chargement long, boutons trop petits, contenu illisible, et taux de rebond qui dépasse 70 %. Votre entreprise mérite mieux.

### Qu''est-ce qu''un site responsive ?

Un site responsive s''adapte automatiquement à la taille de l''écran (ordinateur, tablette, smartphone). La navigation, la lecture et l''interaction restent fluides quel que soit le support. Google le recommande vivement et l''utilise comme critère de classement dans ses résultats mobiles.

### Les avantages concrets d''un site responsive

- <strong>Amélioration du référencement SEO</strong> : Google indexe d''abord la version mobile de votre site. S''il n''est pas responsive, vous serez pénalisé.
- <strong>Augmentation du taux de conversion</strong> : un visiteur frustré par une mauvaise expérience mobile part chez un concurrent. Un site responsive peut doubler vos demandes de devis.
- <strong>Réduction des coûts de maintenance</strong> : un seul site à gérer pour tous les appareils, au lieu d’une version desktop et d’une version mobile séparée.
- <strong>Partage facilité sur les réseaux sociaux</strong> : les liens renvoient vers la même URL, ce qui évite la perte de trafic.

### Comment savoir si votre site actuel est responsive ?

Ouvrez votre site sur votre smartphone. Si vous devez zoomer pour lire le texte, si les images débordent ou si les menus sont inaccessibles, il n''est pas responsive. Vous pouvez aussi utiliser le test de Google : <em>Google Mobile-Friendly Test</em>.

### Nos solutions pour un site web performant

Chez KN WEB & TECHNOLOGY, tous nos sites sont développés en « mobile-first ». Nous partons des contraintes du mobile pour améliorer ensuite l’expérience sur grands écrans. Délai de livraison : 3 à 5 jours ouvrés. À partir de 75 000 FCFA, nous vous offrons un design moderne, responsive, optimisé SEO et avec une gestion de contenu facile.

<strong>Ne laissez pas vos clients mobiles repartir.</strong> Contactez-nous pour un audit gratuit de votre site actuel et un devis sans engagement.', '/seed-images/site-web.webp', null, 'published', now() - interval '20 days', 'Pourquoi votre entreprise a besoin d''un site web responsive en 2025', '80 % des Camerounais naviguent sur mobile. Un site non adapté vous fait perdre des clients et nuit à votre référencement. Explications et solutions.'),
  ('strategie-contenu-pme-3-piliers', 'Stratégie de contenu pour PME : les 3 piliers qui génèrent des clients gratuitement', 'Blog, vidéos, publications WhatsApp : comment attirer des prospects sans budget publicitaire, grâce au marketing de contenu.', 'ia', 'Le marketing de contenu consiste à créer et partager des informations utiles pour attirer naturellement votre cible. Contrairement aux publicités payantes, les effets du contenu sont durables. Une étude de HubSpot montre que les entreprises qui bloguent régulièrement génèrent 67 % de leads en plus. Voici comment construire votre stratégie en trois piliers.

### Pilier 1 : Le blog éducatif

Rédigez des articles qui répondent aux questions que se posent vos clients. Par exemple, un plombier peut écrire « Comment détecter une fuite d’eau avant qu’elle ne devienne grave ». Un restaurant peut partager des recettes ou des astuces de conservation. Ces articles vous positionnent comme expert et remontent dans les résultats de recherche.

<strong>Fréquence recommandée :</strong> 2 à 4 articles par mois. Chaque article doit faire entre 800 et 1500 mots. Utilisez des titres accrocheurs, des listes, des images et une conclusion avec appel à l’action (contactez-nous, téléchargez un guide).

### Pilier 2 : Les vidéos courtes pour les réseaux sociaux et WhatsApp

Les vidéos de moins d''une minute ont un fort taux d''engagement. Montrez votre savoir-faire en action : un artisan qui répare, un commercial qui présente un produit, un témoignage client. Publiez sur Facebook, TikTok, YouTube et surtout sur vos groupes WhatsApp. Une vidéo bien faite peut devenir virale et attirer des dizaines de prospects.

### Pilier 3 : Une newsletter ou une diffusion WhatsApp hebdomadaire

Collectez les numéros de téléphone de vos clients (avec consentement) et envoyez chaque semaine un conseil, une promotion ou une actualité. Le format doit être court et utile. Par exemple, une boutique de mode peut envoyer « Les 3 couleurs tendance de la saison » avec des photos. Un coach peut proposer « L’exercice de la semaine ».

### Outils gratuits pour vous aider

- <strong>Canva</strong> : pour créer des visuels et miniatures.
- <strong>ChatGPT</strong> : pour générer des idées de sujets et des brouillons.
- <strong>Later ou Buffer</strong> : pour planifier vos publications.

<strong>Vous n''avez pas le temps de créer du contenu ?</strong> Nous proposons un service de rédaction et de gestion de contenu à partir de 25 000 FCFA/mois (2 articles par mois + 4 posts pour réseaux).', '/seed-images/image_blog.webp', null, 'published', now() - interval '10 days', 'Stratégie de contenu pour PME : les 3 piliers qui génèrent des clients gratuitement', 'Blog, vidéos, publications WhatsApp : comment attirer des prospects sans budget publicitaire, grâce au marketing de contenu.')
on conflict (slug) do nothing;

-- FAQ
insert into faqs (question, answer, sort_order) values
  ('Quel est le délai moyen de réalisation d''un site vitrine ?', 'Comptez entre 5 et 10 jours ouvrés selon la complexité. Un site simple (3-5 pages) peut être livré en 5 jours.', 1),
  ('Proposez-vous des contrats de maintenance ?', 'Oui, nous avons des formules mensuelles incluant mises à jour, sauvegardes et support prioritaire (à partir de 15 000 FCFA/mois).', 2),
  ('Quels modes de paiement acceptez-vous ?', 'Nous acceptons les virements bancaires, Mobile Money (Orange Money, MTN) et paiements par carte via facture Stripe.', 3),
  ('Faut-il un hébergement spécifique pour votre e-commerce ?', 'Nous fournissons un hébergement optimisé avec SSL et sauvegardes quotidiennes inclus dans nos offres.', 4),
  ('Proposez-vous des audits SEO gratuits ?', 'Oui, lors du premier échange nous réalisons un audit technique et sémantique de votre site existant.', 5),
  ('Puis-je mettre à jour mon site moi-même ?', 'Absolument. Nous intégrons un CMS simple (WordPress ou personnalisé) et vous formons à son utilisation.', 6),
  ('Quelles technologies utilisez-vous ?', 'Laravel, Node.js, React, Tailwind, MySQL, ainsi que des solutions IA comme GPT, Make, etc.', 7),
  ('Offrez-vous une garantie après la livraison ?', 'Oui, 30 jours de corrections gratuites après la livraison, puis contrat de maintenance optionnel.', 8),
  ('Comment se passe la communication pendant le projet ?', 'Un canal WhatsApp dédié, des points d’avancement réguliers et un tableau de bord de suivi.', 9),
  ('Acceptez-vous les projets à l''international ?', 'Oui, nous travaillons en français et en anglais, avec des clients en Afrique, Europe et Amérique du Nord.', 10),
  ('Quel est le coût moyen d''un site e-commerce Mobile Money ?', 'À partir de 200 000 FCFA, incluant catalogue produits, paiement Orange Money/MTN et formation.', 11),
  ('Puis-je intégrer un chatbot sur mon site ?', 'Bien sûr. Nous développons des chatbots IA (WhatsApp, Messenger ou web) adaptés à vos besoins.', 12),
  ('Faites-vous du référencement local ?', 'Oui, nous optimisons votre fiche Google Business et les pages pour les recherches géolocalisées (Douala, Yaoundé, Édéa, etc.).', 13),
  ('Combien coûte une stratégie de contenu mensuelle ?', 'Nos packs commencent à 25 000 FCFA pour 2 articles de blog et 4 posts pour réseaux sociaux.', 14),
  ('Proposez-vous des services d''automatisation des processus ?', 'Oui, nous créons des automatisations sur mesure (Zapier, Make, scripts personnalisés).', 15),
  ('Quelle est votre politique de confidentialité ?', 'Nous ne revendons aucune donnée. Tous vos accès restent confidentiels et sont protégés.', 16),
  ('Puis-je avoir un devis gratuit ?', 'Oui, il vous suffit de remplir le formulaire de contact ou de nous écrire sur WhatsApp.', 17),
  ('Quels sont vos horaires de support ?', 'Lundi au samedi de 8h à 19h, avec des interventions d''urgence 7j/7 pour les clients maintenance.', 18),
  ('Faites-vous des remises pour les start-ups ?', 'Oui, nous offrons -10% sur le premier projet pour les jeunes entreprises de moins d''un an.', 19),
  ('Comment sont gérés les droits d''auteur et la propriété intellectuelle ?', 'Le code et le design vous appartiennent intégralement après paiement final.', 20);

