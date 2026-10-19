import { FaStar, FaQuoteLeft } from 'react-icons/fa6';
import { useTestimonials } from '../hooks/useContent';
import { useT } from '../i18n/LanguageContext';
import './TestimonialsMarquee.css';

const initials = (name = '') =>
  name
    .replace(/['’]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && /^[A-ZÀ-Ý]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('') || name.slice(0, 2).toUpperCase();

export default function TestimonialsMarquee() {
  const { data: testimonials } = useTestimonials();
  const tr = useT();
  if (!testimonials.length) return null;

  const shouldMarquee = testimonials.length > 2;
  const track = shouldMarquee ? [...testimonials, ...testimonials] : testimonials;

  return (
    <div className="testimonials-marquee" role="region" aria-label={tr('a11y.testimonials')}>
      <div className="marquee-fade marquee-fade-left" />
      <div className="marquee-fade marquee-fade-right" />
      <div className={`marquee-track ${shouldMarquee ? 'is-scrolling' : 'is-static'}`}>
        {track.map((t, i) => (
          <article className="testimonial-card" key={`${t.id}-${i}`}>
            <FaQuoteLeft className="testimonial-quote-icon" size={20} />
            {/* Stars only when the client actually gave a rating */}
            {t.rating >= 1 && (
              <div className="testimonial-stars" aria-label={`${t.rating}/5`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <FaStar key={s} size={12} className={s < t.rating ? 'is-filled' : ''} />
                ))}
              </div>
            )}
            <p className="testimonial-message">{t.message}</p>
            <div className="testimonial-author">
              {t.photo ? (
                <img src={t.photo} alt={t.authorName} loading="lazy" width="44" height="44" />
              ) : (
                <span className="testimonial-initials" aria-hidden="true">
                  {initials(t.authorName)}
                </span>
              )}
              <div>
                <strong>{t.authorName}</strong>
                <span>{t.authorRole}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
