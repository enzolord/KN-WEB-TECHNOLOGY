import logoPoussin from '../assets/images/logo/logo_poussinsarl.webp';
import logoAriefood from '../assets/images/logo/ariefood_and_family.webp';
import logoIut from '../assets/images/logo/Logo_IUT_Douala.webp';

// Fallback / seed data shown until (or unless) Supabase is configured and the
// `partners` table has rows — see admin/pages/PartnersManager.jsx.
export const partners = [
  { id: 1, name: 'Poussin SARL', logo: logoPoussin, link: '' },
  { id: 2, name: 'Ariefood & Family', logo: logoAriefood, link: '' },
  { id: 3, name: 'IUT Douala', logo: logoIut, link: '' },
];
