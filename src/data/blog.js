import seoImg from '../assets/images/services/seo.webp';
import whatsappImg from '../assets/images/services/whatsapp-business.webp';
import mobileMoneyImg from '../assets/images/services/mobile-money.webp';
import iaImg from '../assets/images/services/automatisation-ia.webp';
import siteWebImg from '../assets/images/services/site-web.webp';
import contentImg from '../assets/images/misc/image_blog.webp';

export const blogCategories = {
  seo: 'SEO Local',
  whatsapp: 'WhatsApp Business',
  ecommerce: 'E-commerce',
  ia: 'IA & Automatisation',
};

// `publishedAt` (ISO) is formatted per language at display time, and the
// reading time is computed from `content` (see src/lib/articleMeta.js).
export const articles = [
  {
    id: 1,
    slug: 'seo-local-douala-edea-guide-2025',
    title: 'Comment être premier sur Google à Douala ou Édéa – Guide SEO local complet 2025',
    excerpt:
      'Découvrez les techniques avancées de référencement local au Cameroun : mots-clés géolocalisés, Google Business Profile, citations locales et netlinking.',
    category: 'seo',
    publishedAt: '2025-03-15',
    image: seoImg,
    content: [
      { type: 'h3', text: 'Pourquoi le SEO local est indispensable pour votre PME camerounaise ?' },
      {
        type: 'p',
        text: "Plus de 80 % des consommateurs utilisent Google pour trouver un service près de chez eux. Que vous soyez à Douala, Yaoundé, Édéa ou Bafoussam, apparaître dans les premiers résultats de recherche locale peut doubler votre chiffre d'affaires. Contrairement aux idées reçues, le référencement local ne nécessite pas un gros budget, mais une stratégie cohérente et une connaissance des spécificités camerounaises.",
      },
      { type: 'h3', text: '1. Optimisez votre fiche Google Business Profile (ex Google My Business)' },
      { type: 'p', text: 'La fiche Google est le pilier du SEO local. Voici les actions prioritaires :' },
      {
        type: 'ul',
        items: [
          "<strong>Complétez toutes les informations</strong> : nom, adresse, téléphone, site web, horaires d'ouverture précis.",
          "<strong>Ajoutez des photos régulièrement</strong> (locaux, produits, équipe). Les entreprises avec des images reçoivent 42 % de demandes d'itinéraire en plus.",
          '<strong>Encouragez les avis clients</strong> : répondez à chaque avis (positif ou négatif) avec professionnalisme. Utilisez les mots-clés dans vos réponses.',
          '<strong>Publiez des posts Google</strong> : annonces, offres spéciales, événements. Cela montre à Google que votre fiche est active.',
        ],
      },
      { type: 'h3', text: '2. Structurez votre site pour les recherches locales' },
      { type: 'p', text: 'Votre site doit parler aux robots et aux humains. Adoptez ces bonnes pratiques :' },
      {
        type: 'ul',
        items: [
          '<strong>Créez une page « Nous contacter »</strong> avec votre adresse complète, carte interactive et un schéma LocalBusiness (données structurées).',
          '<strong>Intégrez des pages « ville »</strong> : si vous couvrez plusieurs zones, dédiez une page par localité (ex : « plombier Douala », « plombier Édéa »).',
          '<strong>Utilisez des balises title et meta description</strong> incluant le nom de la ville et le service principal.',
          '<strong>Ajoutez un plan du site (sitemap)</strong> et assurez-vous que votre site est rapide et mobile-friendly.',
        ],
      },
      { type: 'h3', text: '3. Obtenez des citations et backlinks locaux' },
      {
        type: 'p',
        text: 'Les annuaires locaux et les liens depuis des sites camerounais renforcent votre autorité. Inscrivez-vous gratuitement sur :',
      },
      {
        type: 'ul',
        items: [
          'Annuaire camerounais (camerounweb, camerounlink, etc.)',
          'Chambres de commerce et sites d’associations professionnelles',
          "Blogs partenaires ou sites d'actualité locale (avec un article invité)",
        ],
      },
      { type: 'h3', text: '4. Mesurez vos résultats' },
      {
        type: 'p',
        text: "Utilisez Google Search Console et Google Analytics pour suivre vos positions, le trafic organique et les conversions. Avec une stratégie bien appliquée, vous pouvez atteindre le top 3 en 2 à 4 mois.",
      },
      {
        type: 'p',
        text: "<strong>Prêt à passer à l'action ?</strong> Nos experts SEO vous accompagnent avec un audit complet et un plan d'action mensuel sur mesure.",
      },
    ],
  },
  {
    id: 2,
    slug: 'whatsapp-business-automatisations-ventes',
    title: '5 automatisations WhatsApp Business qui transforment vos ventes',
    excerpt:
      'Utilisez WhatsApp Business pour générer des leads 24h/24, envoyer des rappels de paiement et fidéliser vos clients grâce à des scénarios automatisés.',
    category: 'whatsapp',
    publishedAt: '2025-04-02',
    image: whatsappImg,
    content: [
      {
        type: 'p',
        text: "WhatsApp est devenu le canal de communication commercial numéro 1 en Afrique centrale. Plus de 90 % des Camerounais équipés d'un smartphone l'utilisent quotidiennement. Automatiser certains échanges vous fait gagner un temps précieux tout en améliorant l'expérience client. Voici cinq automatisations puissantes que nous mettons en place pour nos clients.",
      },
      { type: 'h3', text: "1. Message d'accueil personnalisé avec qualification" },
      {
        type: 'p',
        text: "Dès qu'un client vous écrit, répondez instantanément avec un message chaleureux qui présente votre activité et propose un catalogue. Ajoutez un court formulaire (via boutons) pour collecter nom, téléphone et besoin. Cela permet de qualifier le lead avant même une intervention humaine.",
      },
      { type: 'h3', text: '2. Catalogue produit interactif' },
      {
        type: 'p',
        text: "WhatsApp Business permet de créer un catalogue avec images, prix et descriptions. En l'associant à un message automatique, vous offrez une vitrine 24h/24. Chaque produit peut être partagé en un clic, et le client commande directement par message.",
      },
      { type: 'h3', text: '3. Réponses rapides aux questions fréquentes' },
      {
        type: 'p',
        text: 'Créez des modèles pour les questions récurrentes : horaires, prix, livraison, modes de paiement. Utilisez des raccourcis clavier (ex : /prix, /livraison). Cela réduit le temps de réponse de 80 %.',
      },
      { type: 'h3', text: '4. Relances automatiques pour panier abandonné ou rappel de rendez-vous' },
      {
        type: 'p',
        text: "Grâce à des outils comme WATI ou Twilio, vous pouvez programmer des relances : par exemple, 2 heures après un devis non finalisé, envoyez un message avec un code promo. Pour les rendez-vous, un rappel 24h avant réduit les absences.",
      },
      { type: 'h3', text: '5. Chatbot simple pour la qualification et la prise de commande' },
      {
        type: 'p',
        text: "Un chatbot peut guider le client pas à pas : choix du produit, quantité, adresse de livraison, puis générer un récapitulatif. Ensuite, un humain ne reprend que la validation finale. Résultat : des ventes réalisées même la nuit ou le week-end.",
      },
      {
        type: 'p',
        text: "<strong>Besoin de mettre en place ces scénarios ?</strong> Nous configurons votre WhatsApp Business Pro avec formation de votre équipe. Forfait à partir de 50 000 FCFA + 15 000 FCFA/mois pour la maintenance et l'évolution des scénarios.",
      },
    ],
  },
  {
    id: 3,
    slug: 'mobile-money-ecommerce-cameroun-guide',
    title: 'Mobile Money et e-commerce au Cameroun : guide complet pour lancer votre boutique en ligne',
    excerpt:
      'Orange Money, MTN Mobile Money, gestion des stocks, sécurité des paiements – tout ce qu’il faut savoir pour réussir votre boutique en ligne.',
    category: 'ecommerce',
    publishedAt: '2025-04-20',
    image: mobileMoneyImg,
    content: [
      {
        type: 'p',
        text: "Le Mobile Money est le mode de paiement préféré des Camerounais pour les achats en ligne. Selon une étude récente, 73 % des internautes déclarent qu'ils achèteraient plus si le paiement par mobile money était disponible. Pourtant, de nombreuses boutiques en ligne échouent faute d'une intégration technique et d'une expérience utilisateur adaptée. Ce guide vous donne les clés du succès.",
      },
      { type: 'h3', text: 'Les deux opérateurs indispensables : Orange Money et MTN Mobile Money' },
      {
        type: 'p',
        text: 'Votre boutique doit accepter au minimum ces deux moyens de paiement. Les passerelles comme Lygos, Inlomba ou encore PayTech simplifient l’intégration. Nous recommandons Lygos pour sa fiabilité et son support réactif.',
      },
      { type: 'h3', text: 'Étapes pour créer votre e-commerce Mobile Money' },
      {
        type: 'ul',
        items: [
          '<strong>Choisissez une plateforme e-commerce</strong> : WooCommerce (WordPress) ou Shopify sont les plus adaptés. Nous développons des solutions sur mesure avec des interfaces simples.',
          "<strong>Intégrez le paiement Mobile Money</strong> : l'utilisateur sélectionne son opérateur, saisit son numéro, reçoit une demande de paiement sur son téléphone et confirme. La transaction est immédiate.",
          '<strong>Automatisez les confirmations</strong> : envoyez un message WhatsApp ou SMS dès que le paiement est validé, avec le récapitulatif de commande.',
          '<strong>Mettez en place une gestion de stock fiable</strong> : votre boutique doit décrémenter automatiquement les quantités et vous alerter en cas de rupture.',
          '<strong>Prévoyez un service client réactif</strong> : via WhatsApp intégré directement sur chaque page produit.',
        ],
      },
      { type: 'h3', text: 'Exemples de succès au Cameroun' },
      {
        type: 'p',
        text: "Nous avons accompagné une boutique de vêtements à Douala : en 3 mois, son chiffre d'affaires en ligne a augmenté de 200 % grâce à l'intégration Orange Money et à une campagne WhatsApp ciblée. De même, une quincaillerie à Édéa a vu ses commandes exploser après la mise en place de fiches produits détaillées et d'un chatbot pour les horaires.",
      },
      { type: 'h3', text: 'Pièges à éviter' },
      {
        type: 'ul',
        items: [
          'Ne pas tester le processus de paiement sur tous les opérateurs et tous les téléphones.',
          'Négliger la sécurisation du site (certificat SSL, protection contre les fraudes).',
          'Avoir des temps de chargement trop longs (les clients mobiles abandonnent après 3 secondes).',
        ],
      },
      {
        type: 'p',
        text: '<strong>Vous souhaitez lancer votre boutique e-commerce Mobile Money ?</strong> Contactez-nous pour un devis personnalisé. Nos solutions commencent à 200 000 FCFA, incluant la formation et 3 mois de support.',
      },
    ],
  },
  {
    id: 4,
    slug: 'ia-pme-5-applications-concretes',
    title: "L'intelligence artificielle pour les PME : 5 applications concrètes (sans budget énorme)",
    excerpt:
      "Chatbots, génération de contenu, analyse d'avis : découvrez 5 applications concrètes de l'IA accessibles aux petites entreprises camerounaises.",
    category: 'ia',
    publishedAt: '2025-05-05',
    image: iaImg,
    content: [
      {
        type: 'p',
        text: "L'intelligence artificielle n'est plus réservée aux multinationales. Aujourd'hui, des outils accessibles permettent aux PME camerounaises d'automatiser des tâches chronophages et d'améliorer leur relation client. Voici cinq applications que vous pouvez mettre en place dès maintenant, souvent avec des budgets très réduits.",
      },
      { type: 'h3', text: '1. Chatbot sur votre site et WhatsApp' },
      {
        type: 'p',
        text: "Des solutions comme ManyChat, Chatfuel ou même l'API de WhatsApp Business permettent de créer un chatbot visuel, sans coder. Votre bot peut répondre aux questions fréquentes (horaires, prix, disponibilité), qualifier des leads et même prendre des rendez-vous. Résultat : une disponibilité 24h/24 et une réduction de 50 % du temps passé par vos équipes.",
      },
      { type: 'h3', text: '2. Génération de contenu avec ChatGPT ou Google Bard' },
      {
        type: 'p',
        text: 'Rédiger des articles de blog, des descriptions de produits ou des posts pour les réseaux sociaux peut prendre des heures. Les IA génératives produisent des brouillons de qualité en quelques secondes. Il ne reste qu’à les relire et les personnaliser. Testez gratuitement ChatGPT-4 ou des versions spécialisées comme Jasper (payant mais très efficace).',
      },
      { type: 'h3', text: '3. Analyse automatique des avis clients' },
      {
        type: 'p',
        text: 'Des outils comme MonkeyLearn ou l’API Google Natural Language classent les avis positifs/négatifs et extraient les thèmes récurrents. Vous saurez en un coup d’œil ce que vos clients aiment ou ce qui les freine.',
      },
      { type: 'h3', text: '4. Prévisions de vente et optimisation des stocks' },
      {
        type: 'p',
        text: 'Avec des données historiques (même dans Excel), des IA comme Forecast Pro ou des modules sur Google Sheets peuvent anticiper les pics de demande. Vous éviterez les ruptures de stock ou les surstocks coûteux.',
      },
      { type: 'h3', text: '5. Assistant virtuel pour les rendez-vous et relances' },
      {
        type: 'p',
        text: 'Des calendriers intelligents (Calendly, vous êtes libre) couplés à un bot permettent à vos clients de réserver un créneau. Le bot envoie des confirmations et rappels automatiquement. Pour les factures impayées, un système de relance par email/SMS peut être automatisé avec des conditions simples.',
      },
      {
        type: 'p',
        text: "<strong>Prêt à intégrer l'IA dans vos processus ?</strong> Nous vous conseillons sur les outils les plus adaptés à votre activité et vous assistons dans leur mise en place. Offre d'audit gratuit.",
      },
    ],
  },
  {
    id: 5,
    slug: 'site-web-responsive-2025',
    title: "Pourquoi votre entreprise a besoin d'un site web responsive en 2025",
    excerpt:
      '80 % des Camerounais naviguent sur mobile. Un site non adapté vous fait perdre des clients et nuit à votre référencement. Explications et solutions.',
    category: 'seo',
    publishedAt: '2025-05-12',
    image: siteWebImg,
    content: [
      {
        type: 'p',
        text: "Le nombre d'utilisateurs de smartphones ne cesse de croître en Afrique. Au Cameroun, selon l'ART, plus de 12 millions de personnes utilisent leur téléphone pour se connecter à Internet. Pourtant, de nombreux sites d'entreprises locales ne sont pas optimisés pour les écrans mobiles. Conséquences : temps de chargement long, boutons trop petits, contenu illisible, et taux de rebond qui dépasse 70 %. Votre entreprise mérite mieux.",
      },
      { type: 'h3', text: "Qu'est-ce qu'un site responsive ?" },
      {
        type: 'p',
        text: "Un site responsive s'adapte automatiquement à la taille de l'écran (ordinateur, tablette, smartphone). La navigation, la lecture et l'interaction restent fluides quel que soit le support. Google le recommande vivement et l'utilise comme critère de classement dans ses résultats mobiles.",
      },
      { type: 'h3', text: "Les avantages concrets d'un site responsive" },
      {
        type: 'ul',
        items: [
          "<strong>Amélioration du référencement SEO</strong> : Google indexe d'abord la version mobile de votre site. S'il n'est pas responsive, vous serez pénalisé.",
          '<strong>Augmentation du taux de conversion</strong> : un visiteur frustré par une mauvaise expérience mobile part chez un concurrent. Un site responsive peut doubler vos demandes de devis.',
          '<strong>Réduction des coûts de maintenance</strong> : un seul site à gérer pour tous les appareils, au lieu d’une version desktop et d’une version mobile séparée.',
          '<strong>Partage facilité sur les réseaux sociaux</strong> : les liens renvoient vers la même URL, ce qui évite la perte de trafic.',
        ],
      },
      { type: 'h3', text: 'Comment savoir si votre site actuel est responsive ?' },
      {
        type: 'p',
        text: "Ouvrez votre site sur votre smartphone. Si vous devez zoomer pour lire le texte, si les images débordent ou si les menus sont inaccessibles, il n'est pas responsive. Vous pouvez aussi utiliser le test de Google : <em>Google Mobile-Friendly Test</em>.",
      },
      { type: 'h3', text: 'Nos solutions pour un site web performant' },
      {
        type: 'p',
        text: 'Chez KN WEB & TECHNOLOGY, tous nos sites sont développés en « mobile-first ». Nous partons des contraintes du mobile pour améliorer ensuite l’expérience sur grands écrans. Délai de livraison : 3 à 5 jours ouvrés. À partir de 75 000 FCFA, nous vous offrons un design moderne, responsive, optimisé SEO et avec une gestion de contenu facile.',
      },
      {
        type: 'p',
        text: '<strong>Ne laissez pas vos clients mobiles repartir.</strong> Contactez-nous pour un audit gratuit de votre site actuel et un devis sans engagement.',
      },
    ],
  },
  {
    id: 6,
    slug: 'strategie-contenu-pme-3-piliers',
    title: 'Stratégie de contenu pour PME : les 3 piliers qui génèrent des clients gratuitement',
    excerpt:
      'Blog, vidéos, publications WhatsApp : comment attirer des prospects sans budget publicitaire, grâce au marketing de contenu.',
    category: 'ia',
    publishedAt: '2025-05-28',
    image: contentImg,
    content: [
      {
        type: 'p',
        text: 'Le marketing de contenu consiste à créer et partager des informations utiles pour attirer naturellement votre cible. Contrairement aux publicités payantes, les effets du contenu sont durables. Une étude de HubSpot montre que les entreprises qui bloguent régulièrement génèrent 67 % de leads en plus. Voici comment construire votre stratégie en trois piliers.',
      },
      { type: 'h3', text: 'Pilier 1 : Le blog éducatif' },
      {
        type: 'p',
        text: 'Rédigez des articles qui répondent aux questions que se posent vos clients. Par exemple, un plombier peut écrire « Comment détecter une fuite d’eau avant qu’elle ne devienne grave ». Un restaurant peut partager des recettes ou des astuces de conservation. Ces articles vous positionnent comme expert et remontent dans les résultats de recherche.',
      },
      {
        type: 'p',
        text: '<strong>Fréquence recommandée :</strong> 2 à 4 articles par mois. Chaque article doit faire entre 800 et 1500 mots. Utilisez des titres accrocheurs, des listes, des images et une conclusion avec appel à l’action (contactez-nous, téléchargez un guide).',
      },
      { type: 'h3', text: 'Pilier 2 : Les vidéos courtes pour les réseaux sociaux et WhatsApp' },
      {
        type: 'p',
        text: "Les vidéos de moins d'une minute ont un fort taux d'engagement. Montrez votre savoir-faire en action : un artisan qui répare, un commercial qui présente un produit, un témoignage client. Publiez sur Facebook, TikTok, YouTube et surtout sur vos groupes WhatsApp. Une vidéo bien faite peut devenir virale et attirer des dizaines de prospects.",
      },
      { type: 'h3', text: 'Pilier 3 : Une newsletter ou une diffusion WhatsApp hebdomadaire' },
      {
        type: 'p',
        text: 'Collectez les numéros de téléphone de vos clients (avec consentement) et envoyez chaque semaine un conseil, une promotion ou une actualité. Le format doit être court et utile. Par exemple, une boutique de mode peut envoyer « Les 3 couleurs tendance de la saison » avec des photos. Un coach peut proposer « L’exercice de la semaine ».',
      },
      { type: 'h3', text: 'Outils gratuits pour vous aider' },
      {
        type: 'ul',
        items: [
          '<strong>Canva</strong> : pour créer des visuels et miniatures.',
          '<strong>ChatGPT</strong> : pour générer des idées de sujets et des brouillons.',
          '<strong>Later ou Buffer</strong> : pour planifier vos publications.',
        ],
      },
      {
        type: 'p',
        text: "<strong>Vous n'avez pas le temps de créer du contenu ?</strong> Nous proposons un service de rédaction et de gestion de contenu à partir de 25 000 FCFA/mois (2 articles par mois + 4 posts pour réseaux).",
      },
    ],
  },
];

export const getArticleBySlug = (slug) => articles.find((a) => a.slug === slug);
