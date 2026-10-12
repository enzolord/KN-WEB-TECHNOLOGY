import { Helmet } from 'react-helmet-async';
import { LANGUAGES, useLanguage } from '../i18n/LanguageContext';

const SITE_NAME = 'KN WEB & TECHNOLOGY';
const SITE_URL = 'https://knwebtechnology.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
  noindex = false,
}) {
  const { lang, t } = useLanguage();
  const locale = (LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]).locale;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${t('seo.defaultTitle')}`;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {!noindex && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

export { SITE_NAME, SITE_URL };
