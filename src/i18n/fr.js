/**
 * Dictionnaire de l'interface — FRANÇAIS (langue de référence).
 *
 * Convention : en.js doit avoir exactement les mêmes clés.
 * Petite syntaxe disponible dans les textes rendus via <Rich> :
 *   [mot]  → partie mise en valeur   **mot** → gras   \n → retour à la ligne
 * Variables : {name} → remplacée par t('clé', { name: '…' }).
 */
const fr = {
  common: {
    whatsappDirect: 'WhatsApp direct',
    startProject: 'Démarrer mon projet',
    learnMore: 'En savoir plus',
    close: 'Fermer',
    contact: 'Contact',
    waDefaultMessage: 'Bonjour, je souhaite discuter de mon projet digital.',
  },

  a11y: {
    skipLink: 'Aller au contenu principal',
    mainNav: 'Navigation principale',
    homeLink: 'KN WEB & TECHNOLOGY — Accueil',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    themeToLight: 'Activer le mode clair',
    themeToDark: 'Activer le mode sombre',
    language: 'Langue du site',
    switchTo: 'Passer en {name}',
    backToTop: 'Retour en haut de la page',
    backToTopShort: 'Retour en haut',
    socialNetworks: 'Réseaux sociaux',
    whatsappChat: 'Discuter sur WhatsApp',
    closeAnnouncement: "Fermer l'annonce",
    closeBanner: 'Fermer la bannière',
    testimonials: 'Avis clients',
    pagination: 'Pagination des projets',
    prevPage: 'Page précédente',
    nextPage: 'Page suivante',
  },

  nav: {
    home: 'Accueil',
    solutions: 'Solutions',
    projects: 'Projets',
    method: 'Méthode',
    agency: 'Agence',
    blog: 'Blog',
    freeQuote: 'Devis gratuit',
    allSolutions: 'Voir toutes les solutions',
    allSolutionsShort: 'Toutes les solutions',
    darkMode: 'Mode sombre',
  },

  footer: {
    desc:
      'Agence digitale basée à Édéa, avec interventions à Douala, Yaoundé et partout au Cameroun. Sites web, e-commerce Mobile Money, WhatsApp Business, référencement Google.',
    solutions: 'Solutions',
    company: 'Entreprise',
    contact: 'Contact',
    rights: 'Tous droits réservés.',
    links: {
      agency: "L'agence",
      projects: 'Nos projets',
      method: 'Notre méthode',
      blog: 'Blog',
      contact: 'Contact',
      legal: 'Mentions légales',
      privacy: 'Politique de confidentialité',
      terms: 'CGV',
    },
    solutionLinks: {
      'site-web-vitrine': 'Site Web & Visibilité',
      'whatsapp-business-pro': 'WhatsApp Business Pro',
      'ecommerce-mobile-money': 'E-Commerce Mobile Money',
      'referencement-google': 'Référencement Google',
      'branding-identite': 'Branding & Identité',
    },
  },

  cards: {
    service: {
      priceLabel: 'Tarif',
      cta: 'Découvrir',
    },
    project: {
      featured: 'Coup de cœur',
      visitSite: 'Voir le site {title}',
      caseStudy: "Voir l'étude de cas",
    },
    blog: {
      readMore: "Lire l'article",
      readTime: '{time} de lecture',
    },
    team: {
      social: '{network} de {name}',
    },
  },

  blogCategories: {
    seo: 'SEO Local',
    whatsapp: 'WhatsApp Business',
    ecommerce: 'E-commerce',
    ia: 'IA & Automatisation',
  },

  projectCategories: {
    all: 'Tous',
    web: 'Sites Web',
    ecommerce: 'E-commerce',
    marketing: 'Marketing / SEO',
    branding: 'Branding',
  },

  contactForm: {
    success: 'Message envoyé ! Nous vous répondons sous 24h, souvent bien plus vite sur WhatsApp.',
    error: 'Une erreur est survenue. Réessayez ou écrivez-nous directement sur WhatsApp.',
    name: 'Nom complet *',
    namePlaceholder: 'Votre nom',
    phone: 'Téléphone *',
    email: 'Email',
    emailPlaceholder: 'vous@exemple.com',
    subject: 'Service concerné',
    subjectPlaceholder: 'Sélectionnez un service',
    subjectOther: 'Autre demande',
    message: 'Votre projet *',
    messagePlaceholder: 'Décrivez votre projet en quelques lignes…',
    sending: 'Envoi en cours…',
    submit: 'Envoyer ma demande',
  },

  newsletter: {
    tag: 'Newsletter',
    title: 'Recevez nos [infos]',
    sub:
      'Nouveaux articles, projets récents et conseils en développement web et astuces pour développer votre présence en ligne — directement dans votre boîte mail.',
    success: 'Merci ! Votre inscription a bien été prise en compte.',
    name: 'Nom',
    namePlaceholder: 'Votre nom',
    email: 'Email',
    emailPlaceholder: 'Votre email',
    sending: 'Envoi…',
    submit: "Je m'inscris",
    subscribe: "S'inscrire",
    error: 'Une erreur est survenue, merci de réessayer.',
  },

  cookies: {
    label: 'Préférences cookies',
    text: 'Notre site utilise des cookies pour améliorer votre expérience. Choisissez vos préférences.',
    decline: 'Refuser',
    accept: 'Accepter',
  },

  assistant: {
    open: "Ouvrir l'assistant virtuel",
    close: "Fermer l'assistant",
    title: 'Assistant KN WEB',
    subtitle: 'Répond généralement en quelques secondes',
    placeholder: 'Écrivez votre question…',
    send: 'Envoyer',
    greeting:
      "Bonjour 👋 Je suis l'assistant virtuel de KN WEB & TECHNOLOGY. Posez-moi une question sur nos services, nos tarifs, nos délais ou notre zone d'intervention — je fais de mon mieux pour vous répondre tout de suite.",
    fallback:
      "Je n'ai pas une réponse précise à vous donner pour ça. Le plus rapide est d'écrire directement à notre équipe sur WhatsApp, on vous répond généralement en moins de 2h.",
    contentNote: '',
    seeService: 'Voir ce service',
    writeWhatsapp: 'Écrire sur WhatsApp',
    waMessage: "Bonjour, j'ai une question suite à ma discussion avec l'assistant du site.",
    servicePrice: 'Tarif indicatif : {price}.',
    suggestions: ['Vos tarifs ?', 'Délai de livraison ?', 'Intervenez-vous hors Cameroun ?'],
    answers: {
      pricing:
        'Nos tarifs démarrent à 40 000 FCFA selon le service choisi (audit, site vitrine, e-commerce, SEO, etc.). Le devis exact dépend de votre projet — le plus simple est de nous écrire sur WhatsApp pour un chiffrage gratuit sous 24h.',
      delay: 'La plupart de nos sites vitrines sont livrés en 3 à 5 jours ouvrés après validation du contenu.',
      zone:
        "Nous sommes basés à Édéa et intervenons dans tout le Cameroun (Douala, Yaoundé, Bafoussam, Kribi, Limbé…) ainsi qu'à l'international pour la diaspora et les clients hors du pays — tout se fait très bien à distance.",
      contact: 'Vous pouvez nous joindre sur WhatsApp au {phone} ou par email à {email}.',
      payment:
        'Nous acceptons les paiements via Orange Money et MTN Mobile Money, en plus des virements classiques. Le paiement se fait généralement en deux temps : un acompte au démarrage et le solde à la livraison.',
      hello: "Bonjour ! Comment puis-je vous aider avec votre projet digital aujourd'hui ?",
      thanks: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions.",
    },
  },

  presence: {
    intlTitle: 'Rayonnement international',
    intlSub:
      'Basés à Édéa, nous accompagnons aussi des clients et la diaspora en dehors du Cameroun — tout se fait très bien à distance.',
    cityDesc: {
      hq: 'Siège social',
      regular: 'Interventions régulières',
      onDemand: 'Sur demande',
    },
    regions: {
      europe: { name: 'France & Europe', desc: 'Diaspora et entreprises partenaires' },
      americas: { name: 'Canada & États-Unis', desc: 'Diaspora et clients à distance' },
    },
  },

  constellation: {
    vision: 'Vision',
    visionTitle: 'Notre vision',
    value: 'Valeur {n}',
    mission: 'Mission',
    missionTitle: 'Notre mission',
  },

  // Contenu "institutionnel" codé en dur (étapes, valeurs, vision) —
  // ce n'est pas géré depuis /admin, donc il est traduit ici.
  process: {
    steps: [
      { num: '01', title: 'Audit & Brief', desc: 'Analyse de vos besoins, objectifs et contraintes.' },
      { num: '02', title: 'Stratégie & Design', desc: 'Maquettes, parcours utilisateur, validation.' },
      { num: '03', title: 'Développement', desc: 'Code propre, responsive, livraisons itératives.' },
      { num: '04', title: 'Tests & Recette', desc: 'Validation fonctionnelle, corrections, optimisation.' },
      { num: '05', title: 'Formation & Transfert', desc: 'Documentation, formation de votre équipe.' },
      { num: '06', title: 'Support Évolutif', desc: 'Maintenance, mises à jour, conseils stratégiques.' },
    ],
    values: [
      { n: '1', title: 'Excellence', desc: "Chaque livrable est soigné comme si c'était notre propre produit." },
      { n: '2', title: 'Innovation', desc: 'Les meilleures technologies au service de vos objectifs réels.' },
      { n: '3', title: 'Transparence', desc: 'Prix fixes, délais tenus, aucune surprise en fin de projet.' },
    ],
    vision:
      "Devenir l'agence digitale de référence en Afrique centrale, reconnue pour la qualité de son exécution et la proximité avec chaque client, du premier échange jusqu'au succès de leur projet.",
    missionStatement:
      'Rendre chaque PME camerounaise visible, compétitive et autonome sur le digital — avec des solutions accessibles, un accompagnement humain et des résultats mesurables.',
  },

  home: {
    seoTitle: 'Agence Digitale Cameroun — Sites Web, SEO, E-commerce',
    seoDesc:
      'Agence digitale basée à Édéa, Cameroun, avec interventions à Douala et Yaoundé. Création de sites web, e-commerce Mobile Money, WhatsApp Business, référencement Google. Livraison 3–5 jours, devis gratuit.',
    hero: {
      label: 'Agence digitale · Cameroun · Fondée en 2025',
      title: 'Votre présence\nen ligne est\n[votre meilleur]\n[commercial.]',
      sub:
        'Nous concevons des sites web, des e-commerces et des stratégies digitales qui transforment vos visiteurs en clients — avec des résultats mesurables à Douala, Yaoundé et dans tout le Cameroun.',
      ctaServices: 'Voir nos services',
      ctaTalk: 'Discutons maintenant',
      stats: {
        solutions: 'Solutions digitales',
        cities: 'Villes couvertes',
        team: "Membres d'équipe",
        fixedPrice: 'Prix fixe garanti',
      },
    },
    partners: '🤝 Ils nous font confiance',
    services: {
      tag: 'Nos solutions',
      title: 'Ce que nous concevons pour [vous]',
      sub:
        'Des solutions digitales clés-en-main, adaptées aux PME et entrepreneurs camerounais avec des résultats mesurables.',
    },
    projects: {
      tag: 'Nos réalisations',
      title: 'Des résultats [concrets] pour nos clients',
      cta: 'Voir tous nos projets',
    },
    method: {
      tag: 'Notre méthode',
      title: 'Une méthode claire, collaborative [et pédagogique]',
      sub: 'Nous avançons **avec vous** et non à votre place. Délai moyen : **3–5 jours**.',
      steps: [
        { num: '01', title: 'Comprendre', desc: 'Votre activité, vos enjeux, vos clients et vos contraintes.', tag: 'Brief + Audit gratuit' },
        { num: '02', title: 'Construire', desc: 'Une solution sur mesure, robuste techniquement et cohérente visuellement.', tag: 'Design + Développement' },
        { num: '03', title: 'Transmettre', desc: 'Documenter, former et rendre votre équipe autonome.', tag: 'Formation + Documentation' },
        { num: '04', title: 'Accompagner', desc: 'Support WhatsApp dédié, mises à jour, optimisations continues.', tag: 'Support + Maintenance' },
      ],
    },
    testimonials: {
      tag: 'Avis clients',
      title: 'Ce que [nos clients] disent de nous',
    },
    agency: {
      logoAlt: 'Logo KN WEB & TECHNOLOGY',
      missionTitle: 'Notre Mission',
      missionText:
        "Donner à chaque PME camerounaise les moyens d'exister en ligne : plus visible sur Google, plus compétitive face à la concurrence, et totalement autonome sur ses outils digitaux.",
      visionTitle: 'Notre Vision',
      visionText:
        "Devenir, projet après projet, l'agence digitale de référence en Afrique centrale — celle qu'on recommande parce qu'elle tient ses promesses.",
      tag: "L'agence",
      title: 'Une agence portée par une vision [entrepreneuriale]',
      values: [
        { title: 'Excellence', desc: 'Chaque livrable est soigné comme notre propre produit.' },
        { title: 'Innovation', desc: 'Les meilleures technologies au service de vos objectifs.' },
        { title: 'Transparence', desc: 'Prix fixes, délais tenus, aucune surprise.' },
      ],
      cta: 'Travailler avec nous',
    },
    ceo: {
      photoAlt: 'Nloka Victor Emmanuel, fondateur de KN WEB & TECHNOLOGY',
      tag: 'Fondateur',
      title: 'Fondateur & Consultant en transformation digitale',
      bio:
        "Nloka Victor dirige l'agence avec une vision tournée vers l'innovation et la qualité. Convaincu que chaque PME mérite une présence digitale professionnelle, il démocratise l'accès aux services web en Afrique centrale.",
      cta: 'Discutons de votre projet',
    },
    blog: {
      tag: 'Blog & Ressources',
      title: 'Conseils & [ressources digitales]',
      cta: 'Voir tous les articles',
    },
    contact: {
      tag: 'Contact',
      title: 'Parlons de votre [projet]',
      sub: 'Réponse garantie sous 24h. Consultation gratuite.',
      hereTitle: 'Nous sommes [là pour vous.]',
      basedIn: 'Basés à {address}, nous travaillons avec des clients dans tout le Cameroun.',
      whatsapp: 'WhatsApp direct',
      location: 'Localisation',
      locationValue: 'Édéa, Région Littoral, Cameroun',
      hours: 'Horaires',
      hoursValue: 'Lun–Sam · 8h00–19h00',
      formTitle: 'Demande de devis gratuit',
      formSub: 'Réponse sous 24h · Aucun engagement · Prix fixe garanti',
    },
    finalCta: {
      title: 'Votre entreprise mérite\n[d\'être trouvée.]',
      sub: 'Consultation gratuite. Devis sous 24h. Livraison en 3–5 jours.',
    },
  },

  solutions: {
    seoTitle: 'Nos Solutions Digitales',
    seoDesc:
      'Sites web, WhatsApp Business, e-commerce Mobile Money, référencement Google, branding, automatisation IA, hébergement et maintenance. Découvrez toutes nos solutions digitales pour PME au Cameroun.',
    tag: 'Nos solutions',
    title: 'Des solutions digitales [complètes], pensées pour les PME camerounaises',
    sub:
      "De votre premier site web à l'automatisation de votre service client, nous vous accompagnons avec des solutions concrètes, mesurables et à prix fixe.",
    whyTag: 'Pourquoi nous choisir',
    whyTitle: 'Une approche [transparente et efficace]',
    whyUs: [
      'Prix fixes annoncés à l’avance, aucune surprise',
      'Livraison en 3 à 5 jours ouvrés en moyenne',
      'Support et formation inclus, pas juste un site livré',
      'Paiement Mobile Money accepté (Orange Money, MTN)',
    ],
    quoteCta: 'Demander un devis gratuit',
    helpTitle: 'Vous ne savez pas quelle solution choisir ?',
    helpText:
      'Décrivez-nous votre activité et vos objectifs sur WhatsApp : nous vous recommandons la solution la plus adaptée, gratuitement et sans engagement.',
    helpLink: 'Découvrir notre méthode de travail',
  },

  serviceDetail: {
    tag: 'Solution {number}',
    quote: 'Demander un devis',
    seeProjects: 'Voir nos réalisations',
    interestedTitle: 'Intéressé(e) ?',
    interestedText: 'Écrivez-nous sur WhatsApp pour un devis gratuit et sans engagement, réponse sous 24h.',
    chatWhatsapp: 'Discuter sur WhatsApp',
    contactForm: 'Formulaire de contact',
    otherSolutions: 'Autres solutions',
    ctaTitle: 'Prêt à lancer [{service}] ?',
    ctaSub: 'Consultation gratuite. Devis sous 24h.',
  },

  agency: {
    seoTitle: "L'Agence",
    seoDesc:
      'Découvrez KN WEB & TECHNOLOGY : une équipe jeune et passionnée dédiée à la transformation digitale des entreprises au Cameroun, basée à Édéa avec interventions à Douala et Yaoundé.',
    heroTag: "L'Agence · KN WEB TECHNOLOGY",
    heroTitle: 'Une équipe [dynamique et passionnée]',
    heroText:
      "Nous sommes une agence dédiée à la transformation digitale des entreprises au Cameroun, avec une présence renforcée à Douala, Yaoundé et Édéa. Notre force : une équipe jeune, créative et rigoureuse, qui place la réussite de nos clients au cœur de chaque projet. De la création de site web vitrine à la mise en place de solutions e-commerce Mobile Money, en passant par le référencement naturel (SEO) et l'intelligence artificielle, nous vous offrons un accompagnement sur mesure. Notre agence a déjà accompagné plusieurs entreprises camerounaises, générant pour elles des résultats concrets : hausse de visibilité, augmentation des ventes en ligne et optimisation de la relation client via WhatsApp Business.",
    workWithUs: 'Travailler avec nous',
    teamPhotoAlt: 'Équipe KN WEB TECHNOLOGY',
    philosophyTag: 'Notre philosophie',
    philosophyTitle: 'Une agence qui relie [design, code, IA et pédagogie]',
    philosophyText:
      "Chez KN WEB TECHNOLOGY, on conçoit des expériences numériques utiles, élégantes et pensées pour durer. Basés à Édéa et intervenant à Douala, Yaoundé et dans tout le Cameroun, notre approche repose sur un équilibre simple : un design juste, un développement solide, l'intelligence artificielle quand elle apporte un vrai gain, et une pédagogie claire pour rendre vos équipes autonomes.",
    logoAlt: 'Logo complet KN WEB & TECHNOLOGY',
    valuesTitle: 'Nos valeurs',
    values: ['Innovation & Personnalisation', 'Engagement & Impact Durable', 'Transparence & Pédagogie'],
    visionTitle: 'Notre vision',
    missionTitle: 'Notre mission',
    missionText:
      "Transformer par le digital – créer des expériences mémorables qui renforcent l'engagement de chaque marque. Concevoir des solutions sur mesure, alliant esthétique et efficacité pour des résultats durables, que vous soyez à Douala, Yaoundé, Édéa ou ailleurs au Cameroun.",
    teamTag: "Rencontrez l'équipe",
    teamTitle: 'Des talents au service de [votre croissance]',
    methodTag: 'Comment nous travaillons',
    methodTitle: "De l'idée à la [livraison]",
    methodSub:
      'Un processus clair en 4 étapes. Délai moyen : **3–5 jours** de la validation du devis à la mise en ligne, pour des clients à Douala, Yaoundé, Édéa et partout au Cameroun.',
    methodSteps: [
      { num: '01', title: 'Comprendre', desc: 'Brief + audit gratuit de votre situation digitale.' },
      { num: '02', title: 'Construire', desc: 'Design + développement avec validation à chaque étape.' },
      { num: '03', title: 'Transmettre', desc: 'Formation + documentation pour votre autonomie.' },
      { num: '04', title: 'Accompagner', desc: 'Support WhatsApp, mises à jour et optimisations continues.' },
    ],
    presenceTag: 'Notre présence',
    presenceTitle: 'Basés à Édéa, [actifs dans tout le Cameroun]',
    contactTag: 'Contact',
    contactTitle: 'Parlons de votre [projet]',
    contactSub: 'Réponse garantie sous 24h. Consultation gratuite, aucun engagement.',
    whatsappAlt: 'Ou discutez avec nous sur WhatsApp',
  },

  projects: {
    seoTitle: 'Nos Réalisations',
    seoDesc:
      'Découvrez les sites web, e-commerces et projets digitaux réalisés par KN WEB & TECHNOLOGY pour des entreprises à Douala, Yaoundé et Édéa.',
    tag: 'Nos réalisations',
    title: 'Des projets qui [font la différence]',
    sub:
      'Chaque projet est une histoire de croissance : plus de visibilité, plus de commandes, plus de clients satisfaits.',
    empty: 'Aucun projet dans cette catégorie pour le moment.',
    ctaTitle: 'Votre projet pourrait être [le prochain]',
    ctaSub: 'Parlons de vos objectifs et voyons comment nous pouvons vous aider.',
  },

  projectDetail: {
    seoSuffix: 'Étude de cas',
    visit: 'Visiter le site',
    problem: 'Le problème',
    solution: 'La solution',
    preview: 'Aperçu du projet',
    previewAlt: '{title} — aperçu {n}',
    ctaTitle: 'Vous voulez [ce niveau de rendu] ?',
    ctaSub: "Ce niveau de rendu peut aussi s'adapter à votre projet, avec une exécution nette et sur mesure.",
    seeService: 'Voir le service',
    talk: 'Discutons ensemble',
  },

  process_page: {
    seoTitle: 'Comment nous travaillons',
    seoDesc:
      'Découvrez notre méthode en 6 étapes, nos valeurs et les réponses aux questions fréquentes sur nos délais, prix et engagements. Agence digitale à Édéa, Douala, Yaoundé.',
    tag: 'Notre méthode',
    title: 'Comment nous [travaillons]',
    sub:
      'Une approche claire, itérative et transparente. De la première idée à la mise en ligne, nous vous accompagnons pas à pas – que vous soyez à Douala, Yaoundé, Édéa ou partout au Cameroun.',
    faqTag: 'Foire aux questions',
    faqTitle: 'Vous avez des [questions ?]',
    faqSub:
      'Retrouvez les réponses aux interrogations les plus fréquentes sur notre méthode, nos délais et nos engagements.',
    agencyTag: 'Notre agence',
    agencyTitle: 'KN WEB TECHNOLOGY [en bref]',
    presenceTag: 'Présence',
    presenceTitle: 'Basés à Édéa, [actifs dans tout le Cameroun]',
    ctaTitle: 'Prêt à [démarrer votre projet ?]',
    ctaSub: 'Consultation gratuite. Devis sous 24h. Livraison en 3–5 jours.',
  },

  blog: {
    seoTitle: 'Blog & Ressources',
    seoDesc:
      "Conseils, guides et ressources sur le SEO local, WhatsApp Business, l'e-commerce Mobile Money et l'intelligence artificielle pour les PME au Cameroun.",
    tag: 'Blog & Ressources',
    title: 'Conseils & [ressources digitales]',
    sub: 'Des guides pratiques pour développer votre présence digitale, sans jargon inutile.',
    contentNote: '',
    all: 'Tous les articles',
    empty: 'Aucun article dans cette catégorie pour le moment.',
  },

  article: {
    back: 'Retour au blog',
    contentNote: '',
    related: 'À lire aussi',
    ctaTitle: 'Un projet en tête ?',
    cta: 'Discutons-en',
  },

  contact: {
    seoTitle: 'Contact',
    seoDesc:
      'Contactez KN WEB & TECHNOLOGY pour un devis gratuit. Réponse garantie sous 24h à Douala, Yaoundé, Édéa et dans tout le Cameroun.',
    tag: 'Contactez-nous',
    title: 'Parlons de votre [projet digital]',
    sub:
      'Que vous ayez un projet précis ou une simple idée, notre équipe est là pour vous écouter et vous conseiller. Réponse garantie sous 24h – à Douala, Yaoundé, Édéa et dans tout le Cameroun.',
    agencyTitle: 'Notre Agence',
    agencyText:
      'KN WEB TECHNOLOGY est basée à Édéa, Région du Littoral. Nous accompagnons les entreprises camerounaises et internationales dans leur transformation digitale, avec une présence renforcée à Douala et Yaoundé.',
    hq: 'Édéa, Cameroun (Siège) – Interventions à Douala, Yaoundé et partout au Cameroun',
    whatsapp: 'WhatsApp : {phone}',
    hoursTitle: 'Horaires & Disponibilité',
    weekdays: 'Lundi - Vendredi : 8h00 – 19h00',
    saturday: 'Samedi : 9h00 – 14h00 (télétravail)',
    emergency: 'Support Urgence : 7j/7 via WhatsApp',
    chatWhatsapp: 'Discuter directement sur WhatsApp',
    secondaryLine: 'Ligne secondaire :',
    formTitle: 'Écrivez-nous',
    formSub: 'Remplissez le formulaire ci-dessous et nous vous répondrons sous 24h.',
    presenceTitle: 'Notre présence au [Cameroun]',
    ctaTitle: 'Prêt à discuter de votre projet ?',
    ctaSub: 'Consultation gratuite, sans engagement.',
    seeSolutions: 'Voir nos solutions',
  },

  notFound: {
    seoTitle: 'Page introuvable',
    seoDesc: "Cette page n'existe pas ou plus.",
    title: "Cette page s'est égarée",
    sub: "La page que vous cherchez n'existe pas ou a été déplacée. Retournons à l'accueil.",
    home: "Retour à l'accueil",
    contact: 'Nous contacter',
  },

  seo: {
    defaultTitle: 'Agence Digitale Cameroun',
  },
};

export default fr;
