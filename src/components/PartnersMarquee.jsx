import { usePartners } from '../hooks/useContent';
import './PartnersMarquee.css';

export default function PartnersMarquee() {
  const { data: partners } = usePartners();
  if (!partners.length) return null;

  // Auto-scroll (marquee) only kicks in once there are enough logos that a
  // static row would feel cramped; a handful of logos just sit centered.
  const shouldMarquee = partners.length > 4;
  const track = shouldMarquee ? [...partners, ...partners] : partners;

  const Logo = ({ p }) => {
    const img = <img src={p.logo} alt={p.name} loading="lazy" width="150" height="48" />;
    return (
      <div className="partner-logo" key={p.id}>
        {p.link ? (
          <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
            {img}
          </a>
        ) : (
          img
        )}
      </div>
    );
  };

  return (
    <div className={`partners-marquee-wrap ${shouldMarquee ? 'is-scrolling' : 'is-static'}`}>
      <div className="partners-marquee-track">
        {track.map((p, i) => (
          <Logo p={p} key={`${p.id}-${i}`} />
        ))}
      </div>
    </div>
  );
}
