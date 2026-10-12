import './HeroBackdrop.css';

/**
 * Sophisticated, theme-aware animated backdrop used behind hero/intro
 * sections site-wide. Purely decorative (aria-hidden) and sits at z-index 0
 * behind the section's text content — never touches the text itself, so the
 * existing gradient-clip effect on the homepage hero ("votre meilleur
 * commercial") is left completely untouched.
 */
export default function HeroBackdrop({ variant = 'default' }) {
  return (
    <div className={`hero-backdrop hero-backdrop-${variant}`} aria-hidden="true">
      <span className="hb-orb hb-orb-1" />
      <span className="hb-orb hb-orb-2" />
      <span className="hb-orb hb-orb-3" />
      <span className="hb-grid" />
      <span className="hb-ring" />
    </div>
  );
}
