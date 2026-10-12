import empireLongrich from '../assets/images/projets/empire-longrich.webp';
import alexaShop from '../assets/images/projets/alexa-shop.webp';
import ecohabitat from '../assets/images/projets/ecohabitat.webp';
import delicesEdea from '../assets/images/projets/les-delices-d-edea.webp';
import poussinSarl from '../assets/images/projets/poussin-sarl.webp';
import ousmashe from '../assets/images/projets/ousmashe.webp';

export const projectCategories = [
  { id: 'all', label: 'Tous' },
  { id: 'web', label: 'Sites Web' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'marketing', label: 'Marketing / SEO' },
  { id: 'branding', label: 'Branding' },
];

// Maps a project's category to the matching service slug, used on the
// project detail page's "Voir le service" call-to-action button.
export const CATEGORY_TO_SERVICE = {
  web: 'site-web-vitrine',
  ecommerce: 'ecommerce-mobile-money',
  marketing: 'referencement-google',
  branding: 'branding-identite',
};

export const projects = [
  {
    id: 1,
    slug: 'empire-longrich',
    title: 'Empire - Longrich',
    category: 'ecommerce',
    featured: true,
    tagline: 'Bien-être & santé · E-commerce + SEO',
    description:
      "E-commerce bien-être et santé. Page 1 Google pour « Empire longrich » en 3 semaines. +200% de commandes en ligne grâce à l'intégration Mobile Money et au SEO local.",
    image: empireLongrich,
    gallery: [empireLongrich],
    link: 'https://longrich-empire.netlify.app/',
    problem:
      "Empire - Longrich vendait ses produits de bien-être uniquement par bouche-à-oreille et messages privés. Aucune présence en ligne, aucune visibilité sur Google, et des commandes prises à la main sans suivi ni moyen de paiement en ligne — impossible de grandir au-delà du réseau personnel du gérant.",
    solution:
      "Nous avons conçu une boutique e-commerce complète avec fiches produits détaillées, intégration Mobile Money (MTN & Orange) pour un paiement immédiat, et une stratégie SEO local ciblée sur « Empire Longrich » et les termes du secteur bien-être. Résultat : première page Google en 3 semaines et un flux de commandes en ligne continu.",
    tags: ['E-commerce', 'Mobile Money', 'SEO local', 'Bien-être'],
  },
  {
    id: 2,
    slug: 'alexa-shop',
    title: 'Alexa Shop',
    category: 'ecommerce',
    tagline: 'Mode · E-commerce',
    description:
      'Boutique e-commerce mode avec paiement MTN Mobile Money. Page 1 Google en 3 semaines. Interface fluide et catalogue produit dynamique.',
    image: alexaShop,
    gallery: [alexaShop],
    link: 'https://alexa-shop.vercel.app',
    problem:
      "Alexa Shop avait un catalogue mode qui changeait chaque semaine, mais aucun site pour le présenter : les clientes découvraient les nouveautés uniquement sur les statuts WhatsApp, avec un risque constant de rupture de stock non signalée et de commandes perdues dans la discussion.",
    solution:
      "Une boutique en ligne rapide avec catalogue dynamique facilement mis à jour depuis un back-office simple, paiement MTN Mobile Money intégré au tunnel de commande, et une structure pensée pour le référencement local. La boutique est aujourd'hui en première page Google trois semaines après la mise en ligne.",
    tags: ['E-commerce', 'Mode', 'Mobile Money', 'Catalogue dynamique'],
  },
  {
    id: 3,
    slug: 'ecohabitat',
    title: 'Ecohabitat',
    category: 'marketing',
    tagline: 'Rénovation · SEO',
    description:
      'Site web de rénovation optimisé SEO. +150 demandes de devis reçues par mois. Stratégie de contenu et backlinks locaux.',
    image: ecohabitat,
    gallery: [ecohabitat],
    link: 'https://ecohabitat-fr.vercel.app/',
    problem:
      "Ecohabitat avait un site vitrine existant mais quasiment invisible sur Google : zéro stratégie de mots-clés, contenu générique, et aucune demande de devis générée directement par le site malgré un vrai savoir-faire en rénovation.",
    solution:
      "Refonte du contenu autour des requêtes réellement tapées par les clients, optimisation technique complète (vitesse, balises, structure), et campagne de backlinks locaux. Le site génère désormais plus de 150 demandes de devis qualifiées par mois.",
    tags: ['SEO', 'Rénovation', 'Génération de leads', 'Contenu'],
  },
  {
    id: 4,
    slug: 'les-delices-d-edea',
    title: "Les délices d'Édéa",
    category: 'web',
    tagline: 'Restaurant · Site Web',
    description:
      'Site restaurant avec réservations en ligne et chatbot WhatsApp 24h/24. Augmentation de 80% des commandes à emporter.',
    image: delicesEdea,
    gallery: [delicesEdea],
    link: 'https://les-delices-d-edea.vercel.app',
    problem:
      "Le restaurant recevait toutes ses réservations et commandes à emporter par téléphone, avec des appels manqués aux heures de pointe et aucune trace écrite des commandes — source d'erreurs et de clients perdus.",
    solution:
      "Un site vitrine avec menu à jour, réservation de table en ligne et un chatbot WhatsApp disponible 24h/24 pour les commandes à emporter, connecté directement à la ligne du restaurant. Les commandes à emporter ont augmenté de 80% dans les deux mois suivant le lancement.",
    tags: ['Site Web', 'Restaurant', 'Chatbot WhatsApp', 'Réservation'],
  },
  {
    id: 5,
    slug: 'poussin-sarl',
    title: 'Poussin Sarl',
    category: 'web',
    featured: true,
    tagline: 'Aviculture · Site Web',
    description:
      "Site aviculture : réservation de poussins d'un jour en ligne, conseils (support PDF et vidéo). Gestion de stock et alertes SMS.",
    image: poussinSarl,
    gallery: [poussinSarl],
    link: 'https://poussin-sarl.vercel.app',
    problem:
      "Poussin Sarl gérait ses réservations de poussins d'un jour sur un cahier papier, sans visibilité sur les stocks disponibles en temps réel, ce qui provoquait des réservations en double et des éleveurs déçus en arrivant sur place.",
    solution:
      "Une plateforme de réservation en ligne avec stock synchronisé en temps réel, alertes SMS automatiques aux éleveurs, et une bibliothèque de conseils d'élevage (PDF et vidéo) accessible directement depuis le site. Zéro survente depuis la mise en service.",
    tags: ['Site Web', 'Aviculture', 'Réservation', 'Alertes SMS'],
  },
  {
    id: 6,
    slug: 'ousmashe',
    title: 'Ousmashe',
    category: 'branding',
    tagline: 'Terroir & Saveur · Site Web',
    description:
      'Site terroir & saveur. Identité visuelle complète + e-commerce avec commandes via WhatsApp. +150% de commandes en 2 mois.',
    image: ousmashe,
    gallery: [ousmashe],
    link: 'https://ousmashe.vercel.app',
    problem:
      "Ousmashe vendait des produits du terroir sans identité de marque reconnaissable ni vitrine en ligne cohérente — logo provisoire, aucune charte graphique, et des commandes dispersées entre plusieurs canaux sans suivi.",
    solution:
      "Création d'une identité de marque complète (logo, palette, ton éditorial) puis d'un site e-commerce aligné sur cette identité, avec un tunnel de commande simplifié via WhatsApp. Les commandes ont augmenté de 150% dans les deux mois suivant le lancement.",
    tags: ['Branding', 'E-commerce', 'Terroir', 'WhatsApp'],
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);
