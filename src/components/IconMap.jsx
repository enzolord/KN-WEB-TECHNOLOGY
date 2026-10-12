import {
  FaGlobe,
  FaWhatsapp,
  FaCartShopping,
  FaChartLine,
  FaPalette,
  FaRobot,
  FaCloud,
  FaWrench,
  FaCode,
  FaMagnifyingGlassChart,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaGithub,
  FaBehance,
  FaDribbble,
} from 'react-icons/fa6';

const ICONS = {
  globe: FaGlobe,
  whatsapp: FaWhatsapp,
  cart: FaCartShopping,
  chart: FaChartLine,
  palette: FaPalette,
  robot: FaRobot,
  cloud: FaCloud,
  wrench: FaWrench,
  code: FaCode,
  audit: FaMagnifyingGlassChart,
};

export function ServiceIcon({ name, ...props }) {
  const Cmp = ICONS[name] || FaGlobe;
  return <Cmp {...props} />;
}

export const SOCIAL_ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  tiktok: FaTiktok,
  github: FaGithub,
  behance: FaBehance,
  dribbble: FaDribbble,
  whatsapp: FaWhatsapp,
};

export function SocialIcon({ name, ...props }) {
  const Cmp = SOCIAL_ICONS[name];
  if (!Cmp) return null;
  return <Cmp {...props} />;
}
