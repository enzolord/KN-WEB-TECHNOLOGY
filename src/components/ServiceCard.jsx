import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { ServiceIcon } from './IconMap';
import Reveal from './Reveal';
import { useT } from '../i18n/LanguageContext';
import './ServiceCard.css';

export default function ServiceCard({ service, index = 0 }) {
  const t = useT();
  const href = `/solutions/${service.slug}`;

  return (
    <Reveal as="article" className="service-card card" delay={index * 0.06}>
      <div className="service-card-head">
        <span className="service-card-icon" aria-hidden="true">
          <ServiceIcon name={service.icon} size={22} />
        </span>
        {service.number && (
          <span className="service-card-number" aria-hidden="true">
            {service.number}
          </span>
        )}
      </div>

      <div className="service-card-body">
        {/* The title link is stretched over the whole card (see CSS), so the
            entire card is clickable while screen readers hear a single link. */}
        <h3>
          <Link to={href} className="service-card-link">
            {service.title}
          </Link>
        </h3>
        <p>{service.shortDesc}</p>
      </div>

      <div className="service-card-footer">
        {service.price && (
          <span className="service-card-price">
            <small>{t('cards.service.priceLabel')}</small>
            {service.price}
          </span>
        )}
        <span className="service-card-cta" aria-hidden="true">
          {t('cards.service.cta')} <FaArrowRight size={12} />
        </span>
      </div>
    </Reveal>
  );
}
