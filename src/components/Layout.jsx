import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useT } from '../i18n/LanguageContext';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import NewsletterSection from './NewsletterSection';
import BackToTop from './BackToTop';
import CookieConsent from './CookieConsent';
import FloatingAssistant from './FloatingAssistant';
import { WhatsAppFloat, ScrollProgress } from './FloatingWidgets';

export default function Layout() {
  const t = useT();
  return (
    <>
      <ScrollProgress />
      <a href="#main-content" className="skip-link">
        {t('a11y.skipLink')}
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <Outlet />
        </Suspense>
      </main>
      <NewsletterSection />
      <Footer />
      <BackToTop />
      <FloatingAssistant />
      <WhatsAppFloat />
      <CookieConsent />
    </>
  );
}
