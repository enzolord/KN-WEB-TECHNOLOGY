import poussinImg from '../assets/images/projets/poussin-sarl.webp';
import ousmasheImg from '../assets/images/projets/ousmashe.webp';
import ekiteImg from '../assets/images/projets/lycee-d-ekite2.webp';
import ecohabitatImg from '../assets/images/projets/ecohabitat.webp';
import empireImg from '../assets/images/projets/empire-longrich.webp';

// Fallback / seed data for the homepage hero carousel, shown until (or unless)
// Supabase is configured and the `hero_images` table has rows — see
// admin/pages/HeroImagesManager.jsx.
export const heroImages = [
  { id: 1, image: poussinImg, caption: 'Poussin SARL' },
  { id: 2, image: ousmasheImg, caption: 'Ousmashe' },
  { id: 3, image: ekiteImg, caption: 'Lycée d’Ekité' },
  { id: 4, image: ecohabitatImg, caption: 'Ecohabitat' },
  { id: 5, image: empireImg, caption: 'Empire Longrich' },
];
