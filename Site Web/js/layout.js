/* Navigation & footer identiques sur toutes les pages */
(function () {
  const path = window.location.pathname;
  const isHome = path.endsWith('/') || path.endsWith('index.html') || !path.includes('.html');

  function lnk(id) {
    return isHome ? '#' + id : 'index.html#' + id;
  }

  function navActive(page) {
    const p = document.body.dataset.page || 'accueil';
    return p === page ? ' active' : '';
  }

  window.KN_LINK = lnk;

  const NAV = `
<nav class="navbar" id="navbar">
  <div class="nav-inner">
    <a class="nav-brand" href="${isHome ? '#hero' : 'index.html'}">
      <div class="logo-circle">
        <img src="images/logo.png" alt="KN Web Technology" class="logo-img">
      </div>
      <div class="brand-text">
        <span class="brand-name">KN WEB & TECHNOLOGY</span>
        <span class="brand-tagline">Votre partenaire digital</span>
      </div>
    </a>
    <ul class="nav-menu">
      <li><a href="${isHome ? '#hero' : 'index.html'}" class="nav-link${navActive('accueil')}">Accueil</a></li>
      <li class="has-mega">
        <a href="${lnk('services')}" class="nav-link has-arr">Solutions <i class="fas fa-chevron-down arr"></i></a>
        <div class="megamenu megamenu-solutions">
          <div class="megamenu-inner">
            <div class="mega-solutions">
              <!-- Service 1 : Site Web & SEO -->
              <a href="site-web-vitrine.html" class="mega-card">
                <div class="mega-icon"><i class="fas fa-globe"></i></div>
                <h4>Site Web & SEO</h4>
                <p>Sites vitrines responsives, optimisés pour Google et livrés en 5 jours.</p>
                <span class="mega-link-arrow">Voir la solution →</span>
              </a>
              <!-- Service 2 : WhatsApp Business Pro -->
              <a href="whatsapp-business-pro.html" class="mega-card">
                <div class="mega-icon"><i class="fab fa-whatsapp"></i></div>
                <h4>WhatsApp Business Pro</h4>
                <p>Catalogue automatique, réponses instantanées et chatbot 24h/24.</p>
                <span class="mega-link-arrow">Voir la solution →</span>
              </a>
              <!-- Service 3 : E-Commerce Mobile Money -->
              <a href="ecommerce-mobile-money.html" class="mega-card">
                <div class="mega-icon"><i class="fas fa-shopping-cart"></i></div>
                <h4>E-Commerce Mobile Money</h4>
                <p>Boutique en ligne avec paiement MTN / Orange Money intégré.</p>
                <span class="mega-link-arrow">Voir la solution →</span>
              </a>
              <!-- Service 4 : Référencement Google -->
              <a href="referencement-google.html" class="mega-card">
                <div class="mega-icon"><i class="fas fa-search"></i></div>
                <h4>Référencement Google</h4>
                <p>Audit SEO, optimisation technique et suivi des positions.</p>
                <span class="mega-link-arrow">Voir la solution →</span>
              </a>
              <!-- Service 5 : Branding & Identité -->
              <a href="branding-identite.html" class="mega-card">
                <div class="mega-icon"><i class="fas fa-palette"></i></div>
                <h4>Branding & Identité</h4>
                <p>Logo, charte graphique et identité visuelle complète.</p>
                <span class="mega-link-arrow">Voir la solution →</span>
              </a>
              <!-- Service 6 : Automatisation & IA -->
              <a href="automatisation-ia.html" class="mega-card">
                <div class="mega-icon"><i class="fas fa-robot"></i></div>
                <h4>Automatisation & IA</h4>
                <p>Chatbots IA, workflow automatisés et intégrations sur mesure.</p>
                <span class="mega-link-arrow">Voir la solution →</span>
              </a>
              <!-- Service 7 : Hébergement & Infra -->
              <a href="hebergement-infra.html" class="mega-card">
                <div class="mega-icon"><i class="fas fa-cloud"></i></div>
                <h4>Hébergement & Infra</h4>
                <p>Serveurs sécurisés, SSL, sauvegardes et disponibilité 99.9%.</p>
                <span class="mega-link-arrow">Voir la solution →</span>
              </a>
              <!-- Service 8 : Maintenance & Support -->
              <a href="maintenance-support.html" class="mega-card">
                <div class="mega-icon"><i class="fas fa-wrench"></i></div>
                <h4>Maintenance & Support</h4>
                <p>Mises à jour, sécurité et assistance WhatsApp sous 2h.</p>
                <span class="mega-link-arrow">Voir la solution →</span>
              </a>
            </div>
          </div>
        </div>
      </li>
      <li class="has-mega">
        <a href="${lnk('agency')}" class="nav-link has-arr">L'Agence <i class="fas fa-chevron-down arr"></i></a>
        <div class="megamenu megamenu-agence">
          <div class="megamenu-inner">
            <div class="mega-agence-simple">
              <div class="mega-col">
                <h5>Découvrir l’agence</h5>
                <ul class="mega-links-list">
                  <li><a href="${lnk('agency')}#vision"><i class="fas fa-eye"></i> Notre vision</a></li>
                  <li><a href="${lnk('agency')}#mission"><i class="fas fa-bullseye"></i> Notre mission</a></li>
                  <li><a href="${lnk('ceo')}"><i class="fas fa-users"></i> Notre équipe</a></li>
                  <li><a href="${lnk('method')}"><i class="fas fa-route"></i> Notre méthode</a></li>
                  <li><a href="agence.html"><i class="fas fa-gem"></i> Nos valeurs</a></li>
                </ul>
              </div>
              <div class="mega-col">
                <h5>Ils nous font confiance</h5>
                <ul class="mega-links-list">
                  <li><a href="${lnk('projets')}"><i class="fas fa-th-large"></i> Réalisations</a></li>
                  <li><a href="${lnk('contact')}"><i class="fas fa-paper-plane"></i> Contactez-nous</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li><a href="${lnk('projets')}" class="nav-link${navActive('realisations')}">Réalisations</a></li>
      <li><a href="blog.html" class="nav-link${navActive('blog')}">Blog</a></li>
      <li><a href="contact.html" class="nav-link${navActive('contact')}">Contact</a></li>
    </ul>
    <button class="nav-cta" onclick="scrollToSection('contact')" type="button">
      <span class="nav-cta-text">Discutons ensemble</span>
      <i class="fas fa-arrow-up-right-from-square"></i>
    </button>
    <div class="hamburger" id="hamburger" onclick="toggleMobile()"><i class="fas fa-bars" id="hIcon"></i></div>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <ul class="mobile-nav-links">
    <li><a href="${isHome ? '#hero' : 'index.html'}" onclick="toggleMobile()"><i class="fas fa-home"></i> Accueil</a></li>
    <li><a href="${lnk('services')}" onclick="toggleMobile()"><i class="fas fa-layer-group"></i> Solutions</a></li>
    <li><a href="${lnk('agency')}" onclick="toggleMobile()"><i class="fas fa-building"></i> L'Agence</a></li>
    <li><a href="${lnk('projets')}" onclick="toggleMobile()"><i class="fas fa-th-large"></i> Réalisations</a></li>
    <li><a href="${lnk('blog')}" onclick="toggleMobile()"><i class="fas fa-pen-fancy"></i> Blog</a></li>
    <li><a href="${lnk('contact')}" onclick="toggleMobile()"><i class="fas fa-paper-plane"></i> Contact</a></li>
    <li><a href="${lnk('contact')}" onclick="toggleMobile()" class="mobile-cta"><i class="fab fa-whatsapp"></i> Discutons ensemble</a></li>
  </ul>
</div>`;

  const SIDENAV = isHome ? `
<nav class="sidenav" id="sidenav" aria-label="Navigation sections">
  <div class="sn-dot active" data-target="hero" onclick="scrollToSection('hero')"><div class="sn-pip"></div><span class="sn-label">Accueil</span></div>
  <div class="sn-dot" data-target="services" onclick="scrollToSection('services')"><div class="sn-pip"></div><span class="sn-label">Services</span></div>
  <div class="sn-dot" data-target="projets" onclick="scrollToSection('projets')"><div class="sn-pip"></div><span class="sn-label">Réalisations</span></div>
  <div class="sn-dot" data-target="agency" onclick="scrollToSection('agency')"><div class="sn-pip"></div><span class="sn-label">Agence</span></div>
  <div class="sn-dot" data-target="contact" onclick="scrollToSection('contact')"><div class="sn-pip"></div><span class="sn-label">Contact</span></div>
</nav>` : '';

  // Année dynamique pour le copyright
  const currentYear = new Date().getFullYear();

  const FOOTER = `
<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="${isHome ? '#hero' : 'index.html'}" class="footer-logo-wrap">
        <div class="logo-circle-small">
          <img src="images/logo.png" alt="KN Web Technology" class="footer-logo-img">
        </div>
        <div class="footer-brand-text">
          <span class="footer-brand-name">KN WEB & TECHNOLOGY</span>
          <span class="footer-brand-tagline">Votre partenaire digital</span>
        </div>
      </a>
      <p>L'agence digitale de référence pour les PME camerounaises. Sites web, SEO, WhatsApp Business, e-commerce Mobile Money — des solutions qui rapportent de vrais clients.</p>
      <div class="footer-social">
        <a class="fs-a" href="https://wa.me/237620819290" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        <a class="fs-a" href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a class="fs-a" href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a class="fs-a" href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a class="fs-a" href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
      </div>
      <div class="footer-newsletter">
        <p>Newsletter — Conseils digitaux gratuits</p>
        <div class="newsletter-form">
          <input type="email" placeholder="votre@email.com" aria-label="Email newsletter">
          <button type="button" onclick="showToast('Inscription confirmée !')"><i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
    <div class="footer-col">
      <h5>Solutions</h5>
      <ul>
        <li><a href="site-web-vitrine.html"><i class="fas fa-chevron-right"></i> Site Web & SEO</a></li>
        <li><a href="whatsapp-business-pro.html"><i class="fas fa-chevron-right"></i> WhatsApp Business</a></li>
        <li><a href="ecommerce-mobile-money.html"><i class="fas fa-chevron-right"></i> E-Commerce Mobile Money</a></li>
        <li><a href="referencement-google.html"><i class="fas fa-chevron-right"></i> Référencement Google</a></li>
        <li><a href="branding-identite.html"><i class="fas fa-chevron-right"></i> Branding & Identité</a></li>
        <li><a href="automatisation-ia.html"><i class="fas fa-chevron-right"></i> Automatisation IA</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>L'Agence</h5>
      <ul>
        <li><a href="${lnk('ceo')}"><i class="fas fa-chevron-right"></i> Notre équipe</a></li>
        <li><a href="${lnk('agency')}"><i class="fas fa-chevron-right"></i> Notre vision</a></li>
        <li><a href="${lnk('method')}"><i class="fas fa-chevron-right"></i> Notre méthode</a></li>
        <li><a href="${lnk('projets')}"><i class="fas fa-chevron-right"></i> Réalisations</a></li>
        <li><a href="${lnk('blog')}"><i class="fas fa-chevron-right"></i> Blog</a></li>
        <li><a href="${lnk('contact')}"><i class="fas fa-chevron-right"></i> Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Contact</h5>
      <ul>
        <li><a href="https://wa.me/237620819290" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> +237 620 819 290</a></li>
        <li><a><i class="fas fa-map-marker-alt"></i> Édéa, Cameroun</a></li>
        <li><a><i class="fas fa-clock"></i> Lun–Sam · 8h–19h</a></li>
        <li><a><i class="fas fa-globe"></i> Tout le Cameroun</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom-wrap">
    <div class="footer-bottom">
      <p>© ${currentYear} Agence digitale · Basée à Édéa, Cameroun. Tous droits réservés.</p>
      <div class="footer-bottom-links">
        <a href="#">Mentions légales</a>
        <a href="#">Politique de confidentialité</a>
        <a href="#">CGV</a>
      </div>
    </div>
  </div>
</footer>
<a href="https://wa.me/237620819290?text=Bonjour%2C%20je%20souhaite%20une%20consultation%20gratuite." class="float-wa" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
<button class="float-top" id="ftop" type="button" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Retour en haut"><i class="fas fa-arrow-up"></i></button>`;

  function inject() {
    const header = document.getElementById('site-header');
    const footer = document.getElementById('site-footer');
    if (header) header.innerHTML = NAV + SIDENAV;
    if (footer) footer.innerHTML = FOOTER;
    document.dispatchEvent(new CustomEvent('kn:layout-ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();