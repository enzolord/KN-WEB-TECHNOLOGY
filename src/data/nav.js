// `key` → libellé traduit (src/i18n, sections nav/footer/presence) ;
// `label`/`desc` restent comme valeur française de référence.
export const mainNav = [
  { key: 'home', label: 'Accueil', path: '/' },
  { key: 'solutions', label: 'Solutions', path: '/solutions', megaMenu: true },
  { key: 'projects', label: 'Projets', path: '/projets' },
  { key: 'method', label: 'Méthode', path: '/comment-nous-travaillons' },
  { key: 'agency', label: 'Agence', path: '/agence' },
  { key: 'blog', label: 'Blog', path: '/blog' },
];

export const footerLinks = {
  solutions: [
    { label: 'Site Web & Visibilité', path: '/solutions/site-web-vitrine' },
    { label: 'WhatsApp Business Pro', path: '/solutions/whatsapp-business-pro' },
    { label: 'E-Commerce Mobile Money', path: '/solutions/ecommerce-mobile-money' },
    { label: 'Référencement Google', path: '/solutions/referencement-google' },
    { label: 'Branding & Identité', path: '/solutions/branding-identite' },
  ],
  entreprise: [
    { key: 'agency', label: "L'agence", path: '/agence' },
    { key: 'projects', label: 'Nos projets', path: '/projets' },
    { key: 'method', label: 'Notre méthode', path: '/comment-nous-travaillons' },
    { key: 'blog', label: 'Blog', path: '/blog' },
    { key: 'contact', label: 'Contact', path: '/contact' },
  ],
  legal: [
    { key: 'legal', label: 'Mentions légales', path: '/mentions-legales' },
    { key: 'privacy', label: 'Politique de confidentialité', path: '/politique-confidentialite' },
    { key: 'terms', label: 'CGV', path: '/cgv' },
  ],
};

export const cities = [
  { name: 'Édéa', desc: 'Siège social', descKey: 'hq', lat: 3.798, lng: 10.132, primary: true },
  { name: 'Douala', desc: 'Interventions régulières', descKey: 'regular', lat: 4.0511, lng: 9.7679 },
  { name: 'Yaoundé', desc: 'Interventions régulières', descKey: 'regular', lat: 3.848, lng: 11.5021 },
  { name: 'Bafoussam', desc: 'Sur demande', descKey: 'onDemand', lat: 5.4737, lng: 10.4176 },
  { name: 'Kribi', desc: 'Sur demande', descKey: 'onDemand', lat: 2.9373, lng: 9.9095 },
  { name: 'Limbé', desc: 'Sur demande', descKey: 'onDemand', lat: 4.0225, lng: 9.2148 },
];

// Shown as a side panel next to the map: countries/regions served remotely,
// outside Cameroon — the agency's international reach.
export const internationalReach = [
  { key: 'europe', region: 'France & Europe', lat: 46.6, lng: 2.4, desc: 'Diaspora et entreprises partenaires' },
  { key: 'americas', region: 'Canada & États-Unis', lat: 45, lng: -85, desc: 'Diaspora et clients à distance' },
];
