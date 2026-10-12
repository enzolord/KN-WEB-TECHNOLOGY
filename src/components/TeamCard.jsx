import { SocialIcon } from './IconMap';
import Reveal from './Reveal';
import { useT } from '../i18n/LanguageContext';
import './TeamCard.css';

const NETWORK_NAMES = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
  github: 'GitHub',
  behance: 'Behance',
  dribbble: 'Dribbble',
  whatsapp: 'WhatsApp',
};

export default function TeamCard({ member, index = 0 }) {
  const t = useT();
  const socials = Object.entries(member.social || {}).filter(([, url]) => url && url !== '#');

  return (
    <Reveal as="article" className="team-card card" delay={index * 0.07}>
      <div className="team-card-media">
        <img src={member.image} alt={member.name} loading="lazy" width="500" height="600" />
        {socials.length > 0 && (
          <div className="team-card-social">
            {socials.map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('cards.team.social', { network: NETWORK_NAMES[name] || name, name: member.name })}
              >
                <SocialIcon name={name} size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="team-card-body">
        {member.role && <span className="team-card-role">{member.role}</span>}
        <h3>{member.name}</h3>
        {member.desc && <p>{member.desc}</p>}
      </div>
    </Reveal>
  );
}
