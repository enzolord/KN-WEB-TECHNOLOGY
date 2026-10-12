import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './i18n/LanguageContext';

import Layout from './components/Layout';
import Home from './pages/Home';
const Solutions = lazy(() => import('./pages/Solutions'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Agence = lazy(() => import('./pages/Agence'));
const Projets = lazy(() => import('./pages/Projets'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Process = lazy(() => import('./pages/Process'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const Contact = lazy(() => import('./pages/Contact'));
const MentionsLegales = lazy(() => import('./pages/legal/MentionsLegales'));
const Confidentialite = lazy(() => import('./pages/legal/Confidentialite'));
const Cgv = lazy(() => import('./pages/legal/Cgv'));
const NotFound = lazy(() => import('./pages/NotFound'));

// The whole /admin dashboard is code-split into its own chunk so public
// visitors never download it — only someone who navigates to /admin does.
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminLogin = lazy(() => import('./admin/Login'));
const AdminSetup = lazy(() => import('./admin/Setup'));
const ProtectedRoute = lazy(() => import('./admin/ProtectedRoute'));
const Dashboard = lazy(() => import('./admin/Dashboard'));
const BlogManager = lazy(() => import('./admin/pages/BlogManager'));
const BlogEditor = lazy(() => import('./admin/pages/BlogEditor'));
const ServicesManager = lazy(() => import('./admin/pages/ServicesManager'));
const TeamManager = lazy(() => import('./admin/pages/TeamManager'));
const ProjectsManager = lazy(() => import('./admin/pages/ProjectsManager'));
const BannersManager = lazy(() => import('./admin/pages/BannersManager'));
const AnnouncementsManager = lazy(() => import('./admin/pages/AnnouncementsManager'));
const FaqManager = lazy(() => import('./admin/pages/FaqManager'));
const MessagesInbox = lazy(() => import('./admin/pages/MessagesInbox'));
const SettingsPage = lazy(() => import('./admin/pages/SettingsPage'));
const PartnersManager = lazy(() => import('./admin/pages/PartnersManager'));
const HeroImagesManager = lazy(() => import('./admin/pages/HeroImagesManager'));
const TestimonialsManager = lazy(() => import('./admin/pages/TestimonialsManager'));

function AdminSplash() {
  return (
    <div className="admin-splash">
      <div className="admin-spinner" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    // Anchors (/#contact, /agence#vision — also reached from old .html URLs):
    // pages are lazy-loaded, so retry briefly until the target exists.
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      if (el || ++tries > 30) {
        clearInterval(timer);
        if (el) el.scrollIntoView({ block: 'start' });
      }
    }, 100);
    return () => clearInterval(timer);
  }, [pathname, hash]);
  return null;
}

function Admin(Component) {
  return (
    <Suspense fallback={<AdminSplash />}>
      <Component />
    </Suspense>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Public site */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/solutions" element={<Solutions />} />
                  <Route path="/solutions/:slug" element={<ServiceDetail />} />
                  <Route path="/agence" element={<Agence />} />
                  <Route path="/projets" element={<Projets />} />
                  <Route path="/projets/:slug" element={<ProjectDetail />} />
                  <Route path="/comment-nous-travaillons" element={<Process />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogArticle />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/mentions-legales" element={<MentionsLegales />} />
                  <Route path="/politique-confidentialite" element={<Confidentialite />} />
                  <Route path="/cgv" element={<Cgv />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Admin dashboard (lazy-loaded, protected) */}
                <Route path="/admin/login" element={Admin(AdminLogin)} />
                <Route path="/admin/setup" element={Admin(AdminSetup)} />
                <Route
                  path="/admin"
                  element={
                    <Suspense fallback={<AdminSplash />}>
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    </Suspense>
                  }
                >
                  <Route index element={Admin(Dashboard)} />
                  <Route path="blog" element={Admin(BlogManager)} />
                  <Route path="blog/new" element={Admin(BlogEditor)} />
                  <Route path="blog/:id" element={Admin(BlogEditor)} />
                  <Route path="services" element={Admin(ServicesManager)} />
                  <Route path="team" element={Admin(TeamManager)} />
                  <Route path="projects" element={Admin(ProjectsManager)} />
                  <Route path="banners" element={Admin(BannersManager)} />
                  <Route path="announcements" element={Admin(AnnouncementsManager)} />
                  <Route path="faq" element={Admin(FaqManager)} />
                  <Route path="messages" element={Admin(MessagesInbox)} />
                  <Route path="partners" element={Admin(PartnersManager)} />
                  <Route path="hero-images" element={Admin(HeroImagesManager)} />
                  <Route path="testimonials" element={Admin(TestimonialsManager)} />
                  <Route path="settings" element={Admin(SettingsPage)} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
