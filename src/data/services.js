import siteWeb from '../assets/images/services/site-web.webp';
import whatsapp from '../assets/images/services/whatsapp-business.webp';
import mobileMoney from '../assets/images/services/mobile-money.webp';
import seo from '../assets/images/services/seo.webp';
import branding from '../assets/images/services/branding.webp';
import automatisation from '../assets/images/services/automatisation-ia.webp';
import hebergement from '../assets/images/services/hebergement.webp';
import maintenance from '../assets/images/services/maintenance.webp';
import appWeb from '../assets/images/services/app-web.webp';
import consultingAudit from '../assets/images/services/consulting-audit.webp';

export const services = [
  {
    slug: 'site-web-vitrine',
    number: '01',
    icon: 'globe',
    title: 'Site Web & Visibilité',
    shortDesc:
      'Votre entreprise trouvable sur Google en 3 jours. Site vitrine responsive + fiche Google Business optimisée + SEO local inclus.',
    price: 'À partir de 75 000 FCFA',
    priceValue: 75000,
    image: siteWeb,
    heroTitle: 'Votre entreprise ',
    heroHighlight: 'visible sur Google en 3 jours',
    lead: 'Site vitrine responsive, SEO local, fiche Google Business optimisée – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.',
    h2: 'Un site qui convertit vos visiteurs en clients',
    desc: 'Conçu pour être rapide, beau et optimisé pour les moteurs de recherche. Votre entreprise gagne en crédibilité et en visibilité.',
    features: [
      'Design moderne et 100% responsive',
      'Optimisation SEO locale (mots-clés ville + métier)',
      'Fiche Google Business Profile optimisée',
      'Formulaire de contact + carte interactive',
      'Livraison en 3 à 5 jours ouvrés',
      'Hébergement et nom de domaine inclus',
    ],
    waMessage: "Bonjour, je suis intéressé par la création d'un site web vitrine.",
    metaDescription:
      'Site vitrine responsive, SEO local, fiche Google Business. Votre entreprise trouvable sur Google en 3 jours à Douala, Yaoundé, Édéa et partout au Cameroun. Devis gratuit.',
  },
  {
    slug: 'whatsapp-business-pro',
    number: '02',
    icon: 'whatsapp',
    title: 'WhatsApp Business Pro',
    shortDesc:
      'Vos clients reçoivent une réponse 24h/24. Catalogue produits, chatbot FAQ, messages automatiques et formation équipe.',
    price: '50 000 FCFA + 15 000/mois',
    priceValue: 50000,
    image: whatsapp,
    heroTitle: 'Automatisez votre relation client avec ',
    heroHighlight: 'WhatsApp Business',
    lead: 'Catalogue interactif, chatbot FAQ, messages automatiques. Vos clients reçoivent une réponse 24h/24 – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.',
    h2: 'Une solution complète pour votre service client',
    desc: 'Transformez WhatsApp en un véritable canal de vente automatisé. Catalogue produits, réponses instantanées et formation de votre équipe incluses.',
    features: [
      'Catalogue produits avec prix et description',
      'Messages automatiques (accueil, FAQ, rappel)',
      'Chatbot simple pour qualifier les leads 24h/24',
      'Intégration avec votre CRM ou Google Sheets',
      'Formation de votre équipe (2 sessions)',
      'Support technique inclus',
    ],
    waMessage: 'Bonjour, je suis intéressé par la solution WhatsApp Business Pro.',
    metaDescription:
      'Catalogue interactif, chatbot FAQ, messages automatiques 24h/24 pour votre entreprise. Solution WhatsApp Business Pro pour PME à Douala, Yaoundé, Édéa.',
  },
  {
    slug: 'ecommerce-mobile-money',
    number: '03',
    icon: 'cart',
    title: 'E-Commerce Mobile Money',
    shortDesc:
      'Vendez en ligne et encaissez par MTN ou Orange Money dès le premier jour. Synchronisation WhatsApp et tableau de bord inclus.',
    price: 'À partir de 200 000 FCFA',
    priceValue: 200000,
    image: mobileMoney,
    heroTitle: 'Lancez votre boutique en ligne avec ',
    heroHighlight: 'paiement Mobile Money',
    lead: 'Vendez en ligne et encaissez par MTN ou Orange Money dès le premier jour. Catalogue illimité, dashboard administrateur et synchronisation WhatsApp – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.',
    h2: 'Vendez plus avec Mobile Money',
    desc: 'Intégrez les paiements Orange Money et MTN Mobile Money à votre site e-commerce. Gérez vos stocks, commandes et livraisons facilement.',
    features: [
      'Catalogue produits illimité avec variantes',
      'Paiement sécurisé via Orange Money et MTN Mobile Money',
      'Gestion des commandes, livraison et facturation automatique',
      'Dashboard administrateur complet',
      'Intégration WhatsApp pour suivi des commandes',
      'Formation de votre équipe incluse',
    ],
    waMessage: 'Bonjour, je suis intéressé par votre solution E-Commerce Mobile Money.',
    metaDescription:
      'Vendez en ligne et encaissez par MTN ou Orange Money dès le premier jour. Catalogue illimité, dashboard administrateur pour PME à Douala, Yaoundé, Édéa.',
  },
  {
    slug: 'referencement-google',
    number: '04',
    icon: 'chart',
    title: 'Référencement Google',
    shortDesc:
      'Premier sur Google dans votre ville. Audit SEO, optimisation technique, création de contenu et rapports mensuels transparents.',
    price: '25 000 FCFA/mois',
    priceValue: 25000,
    image: seo,
    heroTitle: 'Apparaissez en ',
    heroHighlight: 'première page sur Google',
    lead: 'Audit SEO technique, optimisation contenu, création de backlinks locaux et rapport mensuel transparent – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.',
    h2: 'Dominez les résultats de recherche localement',
    desc: 'Nous optimisons votre site pour les recherches locales et nationales. Résultats visibles dès les premières semaines.',
    features: [
      'Audit SEO technique gratuit initial',
      'Recherche de mots-clés stratégiques',
      'Optimisation on-page (balises, contenu, images)',
      'Netlinking local (citations locales)',
      'Rapport mensuel détaillé et suivi des positions',
      'Optimisation Google Business Profile',
    ],
    waMessage: 'Bonjour, je suis intéressé par vos services de référencement Google.',
    metaDescription:
      'Audit SEO, optimisation technique, création de contenu et backlinks locaux. Apparaissez en première page sur Google à Douala, Yaoundé, Édéa.',
  },
  {
    slug: 'branding-identite',
    number: '05',
    icon: 'palette',
    title: 'Branding & Identité',
    shortDesc:
      'Logo, charte graphique, kit complet de marque. Une identité visuelle forte qui inspire confiance et reconnaissance immédiate.',
    price: 'À partir de 45 000 FCFA',
    priceValue: 45000,
    image: branding,
    heroTitle: 'Créez une marque ',
    heroHighlight: 'forte et reconnaissable',
    lead: "Logo, charte graphique, pack identité complet. Une image forte qui inspire confiance – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.",
    h2: 'Une identité visuelle qui vous ressemble',
    desc: "Nous créons une image de marque cohérente et professionnelle, de la conception du logo à la charte graphique complète, pour que votre entreprise soit reconnaissable au premier regard.",
    features: [
      'Logo unique (3 propositions créatives)',
      'Charte graphique complète (couleurs, typographies)',
      'Kit de documents (papeterie, cartes de visite, factures)',
      'Maquette pour réseaux sociaux (covers, template stories)',
      'Fichiers source (AI, EPS, PNG, JPG)',
      "Livret de marque (guide d'utilisation)",
    ],
    waMessage: "Bonjour, je suis intéressé par vos services de branding et identité.",
    metaDescription:
      'Logo, charte graphique, pack identité complet. Créez une marque forte et reconnaissable à Douala, Yaoundé, Édéa et partout au Cameroun.',
  },
  {
    slug: 'automatisation-ia',
    number: '06',
    icon: 'robot',
    title: 'Automatisation & IA',
    shortDesc:
      "L'intelligence artificielle au service de votre productivité. Chatbots, réponses auto, qualification de leads, rapports intelligents.",
    price: 'Sur devis',
    priceValue: null,
    image: automatisation,
    heroTitle: "L'intelligence artificielle au service de votre ",
    heroHighlight: 'productivité',
    lead: 'Workflows intelligents, chatbots IA, automatisation des processus métier – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.',
    h2: 'Des solutions IA sur mesure',
    desc: 'Automatisez vos tâches répétitives, qualifiez vos leads 24h/24 et améliorez votre efficacité opérationnelle grâce à des solutions IA sur mesure.',
    features: [
      'Chatbot IA pour votre site ou WhatsApp',
      'Automatisation de campagnes email / SMS',
      'Intégration CRM avec synchronisation automatique',
      'Assistant IA pour la génération de contenu',
      'Analyse prédictive des ventes et comportement client',
      'Formation et accompagnement inclus',
    ],
    waMessage: "Bonjour, je suis intéressé par vos solutions d'automatisation et IA.",
    metaDescription:
      "Workflows intelligents, chatbots IA, automatisation des processus métier. Gagnez en productivité grâce à l'intelligence artificielle à Douala, Yaoundé, Édéa.",
  },
  {
    slug: 'hebergement-infra',
    number: '07',
    icon: 'cloud',
    title: 'Hébergement & Infra',
    shortDesc:
      'Serveurs rapides, SSL, sauvegardes quotidiennes et 99.9% de disponibilité. Votre site ne dort jamais.',
    price: 'À partir de 8 000 FCFA/mois',
    priceValue: 8000,
    image: hebergement,
    heroTitle: 'Un hébergement ',
    heroHighlight: 'fiable, rapide et sécurisé',
    lead: 'Serveurs ultra-rapides, SSL, sauvegardes quotidiennes et 99.9% de disponibilité – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.',
    h2: 'Votre site mérite le meilleur',
    desc: "Rapidité, sécurité et disponibilité garanties. Nous gérons toute la partie technique pour que vous n'ayez rien à faire.",
    features: [
      'Stockage SSD ultra rapide',
      'Certificat SSL inclus',
      'Sauvegardes automatiques quotidiennes',
      'Protection DDoS et firewall applicatif',
      'Support technique 7j/7',
      'Migration gratuite depuis un ancien hébergeur',
    ],
    waMessage: "Bonjour, je suis intéressé par vos services d'hébergement et d'infrastructure.",
    metaDescription:
      "Serveurs rapides, SSL, sauvegardes quotidiennes et 99.9% de disponibilité. Hébergement professionnel pour votre site à Douala, Yaoundé, Édéa.",
  },
  {
    slug: 'maintenance-support',
    number: '08',
    icon: 'wrench',
    title: 'Maintenance & Support',
    shortDesc:
      'Mises à jour, corrections, sécurité et support humain sur WhatsApp. Une vraie personne répond sous 2 heures.',
    price: '15 000 FCFA/mois',
    priceValue: 15000,
    image: maintenance,
    heroTitle: 'Votre site toujours ',
    heroHighlight: 'sécurisé et performant',
    lead: 'Mises à jour, corrections de bugs, sécurité et support WhatsApp sous 2h – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.',
    h2: 'Nous veillons sur votre site pour que vous vous concentriez sur votre cœur de métier',
    desc: "Intervention rapide en cas de problème et suivi régulier. Une tranquillité d'esprit totale.",
    features: [
      'Mises à jour de sécurité et correctifs',
      'Sauvegardes et restaurations',
      'Surveillance 24h/24 des performances',
      'Assistance par WhatsApp (réponse sous 2h)',
      "Rapport d'activité mensuel",
      'Optimisation des performances',
    ],
    waMessage: 'Bonjour, je suis intéressé par vos services de maintenance et support.',
    metaDescription:
      'Mises à jour, corrections de bugs, sécurité et support WhatsApp sous 2h. Tranquillité d’esprit pour votre site à Douala, Yaoundé, Édéa.',
  },
  {
    slug: 'app-web',
    number: '09',
    icon: 'code',
    title: 'Applications Web & SaaS',
    shortDesc:
      'Portails clients, tableaux de bord et plateformes SaaS sur mesure, scalables et sécurisées pour piloter votre activité.',
    price: 'À partir de 200 000 FCFA',
    priceValue: 200000,
    image: appWeb,
    heroTitle: 'Des outils digitaux puissants pour ',
    heroHighlight: 'piloter votre activité',
    lead: 'Des applications web sur mesure, plateformes SaaS et portails clients. Scalables, sécurisées et pensées pour votre métier – pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.',
    h2: 'Des applications intuitives et performantes',
    desc: "Nous concevons des applications web intuitives et performantes : portails clients, tableaux de bord, logiciels métiers, places de marché et solutions SaaS. Tout est développé sur mesure pour s'adapter parfaitement à vos processus.",
    features: [
      'Applications web responsives (React, Vue, Laravel)',
      'Plateformes SaaS multi-tenants',
      'Portails clients et tableaux de bord analytiques',
      "Intégration d'API (Mobile Money, CRM, paiements)",
      'Hébergement scalable et maintenance incluse',
      'Formation et documentation utilisateur',
    ],
    waMessage: "Bonjour, je suis intéressé par vos services d'applications web et SaaS.",
    metaDescription:
      'Applications web sur mesure, plateformes SaaS, portails clients et intégrations API pour votre entreprise à Douala, Yaoundé, Édéa.',
  },
  {
    slug: 'consulting-audit',
    number: '10',
    icon: 'audit',
    title: 'Consulting & Audit',
    shortDesc:
      "Un regard extérieur et expert sur votre présence digitale : audit complet, recommandations claires et plan d'action priorisé.",
    price: 'À partir de 40 000 FCFA',
    priceValue: 40000,
    image: consultingAudit,
    heroTitle: 'Un diagnostic clair pour ',
    heroHighlight: 'des décisions digitales éclairées',
    lead: "Audit de votre site, de votre visibilité et de vos outils digitaux, suivi de recommandations concrètes et priorisées — pour les entreprises à Douala, Yaoundé, Édéa et partout au Cameroun.",
    h2: 'Savoir précisément où investir en premier',
    desc: "Avant de dépenser dans un nouveau site ou une campagne, nous analysons l'existant : performance, sécurité, référencement, expérience utilisateur et outils internes. Vous repartez avec un plan d'action clair, chiffré et priorisé.",
    features: [
      'Audit technique et SEO complet de votre site actuel',
      'Analyse de votre présence digitale (réseaux sociaux, avis, concurrence)',
      'Évaluation de vos outils et processus internes',
      'Recommandations priorisées avec estimation de coûts',
      'Restitution en visioconférence ou en présentiel',
      "Rapport écrit détaillé, réutilisable avec n'importe quel prestataire",
    ],
    waMessage: 'Bonjour, je suis intéressé par un audit / consulting digital.',
    metaDescription:
      'Audit digital complet et recommandations priorisées pour votre entreprise à Douala, Yaoundé, Édéa. Consulting indépendant avant tout investissement.',
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);

export const WHATSAPP_NUMBER = '237672173778';
export const WHATSAPP_SECONDARY = '237640288919';
export const WHATSAPP_DISPLAY = '+237 672 173 778';
export const WHATSAPP_SECONDARY_DISPLAY = '+237 640 288 919';

export const waLink = (message, number = WHATSAPP_NUMBER) =>
  `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
