// Navigation & footer identiques sur toutes les pages
(function () {
  const path = window.location.pathname;
  const isHome = path.endsWith('/') || path.endsWith('index.html') || !path.includes('.html');

  function lnk(id) {
    return isHome ? '#' + id : 'index.html#' + id;
  }

  function getCurrentPage() {
    return document.body.dataset.page || 'accueil';
  }

  function navActive(page) {
    return getCurrentPage() === page ? ' active' : '';
  }

  window.KN_LINK = lnk;

  // --------------------------------------------------------------
  // Fonctions globales utilisées dans le HTML
  // --------------------------------------------------------------
  window.toggleMobile = function() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('open');
  };

  window.scrollToSection = function(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // --------------------------------------------------------------
  // Popup newsletter
  // --------------------------------------------------------------
  function showNewsletterPopup() {
    let popup = document.getElementById('newsletterPopup');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'newsletterPopup';
      popup.className = 'popup-overlay';
      popup.innerHTML = `
        <div class="popup-card" style="max-width:350px;">
          <div class="popup-icon"><i class="fas fa-check-circle"></i></div>
          <div class="popup-title">Inscription réussie !</div>
          <div class="popup-message">Vous recevrez bientôt nos conseils digitaux.</div>
          <button class="popup-close" onclick="closeNewsletterPopup()">Fermer</button>
        </div>
      `;
      document.body.appendChild(popup);
    }
    popup.style.display = 'flex';
    setTimeout(() => {
      if (popup) popup.style.display = 'none';
    }, 4000);
  }

  window.closeNewsletterPopup = function() {
    const popup = document.getElementById('newsletterPopup');
    if (popup) popup.style.display = 'none';
  };

  // --------------------------------------------------------------
  // Envoi AJAX newsletter (Formspree)
  // --------------------------------------------------------------
  async function submitNewsletter(email) {
    const endpoint = 'https://formspree.io/f/xgobryya';
    const formData = new FormData();
    formData.append('email', email);
    formData.append('_subject', 'Nouvelle inscription newsletter');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        showNewsletterPopup();
        return true;
      } else {
        throw new Error('Erreur Formspree');
      }
    } catch (err) {
      console.error(err);
      if (typeof showToast === 'function') {
        showToast('❌ Erreur, veuillez réessayer.', 'error');
      } else {
        alert('Erreur réseau. Réessayez plus tard.');
      }
      return false;
    }
  }

  function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const email = input.value.trim();
      if (!email || !email.includes('@')) {
        if (typeof showToast === 'function') {
          showToast('Veuillez entrer un email valide.', 'error');
        } else {
          alert('Email invalide');
        }
        return;
      }
      const btn = newsletterForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      const success = await submitNewsletter(email);
      if (success) {
        input.value = '';
      }
      btn.disabled = false;
      btn.innerHTML = originalText;
    });
  }

  // --------------------------------------------------------------
  // Structure HTML de la navbar et du footer
  // --------------------------------------------------------------
  const NAV = `
  <nav class="navbar" id="navbar">
    <div class="nav-inner">
      <a class="nav-brand" href="${isHome ? '#hero' : 'index.html'}">
        <div class="logo-circle"><img src="images/logo/logo.png" alt="KN Web Technology" class="logo-img"></div>
        <div class="brand-text"><span class="brand-name">KN WEB & TECHNOLOGY</span><span class="brand-tagline">Le digital au service de votre croissance</span></div>
      </a>
      <ul class="nav-menu">
        <li><a href="${isHome ? '#hero' : 'index.html'}" class="nav-link${navActive('accueil')}">Accueil</a></li>
        <li class="has-mega">
          <a href="solutions.html" class="nav-link${navActive('solutions')} has-arr">Solutions <i class="fas fa-chevron-down arr"></i></a>
          <div class="megamenu megamenu-solutions">
            <div class="megamenu-inner">
              <div class="mega-solutions">
                <a href="site-web-vitrine.html" class="mega-card"><div class="mega-icon"><i class="fas fa-globe"></i></div><h4>Site Web & SEO</h4><p>Sites vitrines responsives, optimisés pour Google et livrés en 5 jours.</p><span class="mega-link-arrow">Voir la solution →</span></a>
                <a href="whatsapp-business-pro.html" class="mega-card"><div class="mega-icon"><i class="fab fa-whatsapp"></i></div><h4>WhatsApp Business Pro</h4><p>Catalogue automatique, réponses instantanées et chatbot 24h/24.</p><span class="mega-link-arrow">Voir la solution →</span></a>
                <a href="ecommerce-mobile-money.html" class="mega-card"><div class="mega-icon"><i class="fas fa-shopping-cart"></i></div><h4>E-Commerce Mobile Money</h4><p>Boutique en ligne avec paiement MTN / Orange Money intégré.</p><span class="mega-link-arrow">Voir la solution →</span></a>
                <a href="referencement-google.html" class="mega-card"><div class="mega-icon"><i class="fas fa-search"></i></div><h4>Référencement Google</h4><p>Audit SEO, optimisation technique et suivi des positions.</p><span class="mega-link-arrow">Voir la solution →</span></a>
                <a href="branding-identite.html" class="mega-card"><div class="mega-icon"><i class="fas fa-palette"></i></div><h4>Branding & Identité</h4><p>Logo, charte graphique et identité visuelle complète.</p><span class="mega-link-arrow">Voir la solution →</span></a>
                <a href="automatisation-ia.html" class="mega-card"><div class="mega-icon"><i class="fas fa-robot"></i></div><h4>Automatisation & IA</h4><p>Chatbots IA, workflow automatisés et intégrations sur mesure.</p><span class="mega-link-arrow">Voir la solution →</span></a>
                <a href="hebergement-infra.html" class="mega-card"><div class="mega-icon"><i class="fas fa-cloud"></i></div><h4>Hébergement & Infra</h4><p>Serveurs sécurisés, SSL, sauvegardes et disponibilité 99.9%.</p><span class="mega-link-arrow">Voir la solution →</span></a>
                <a href="maintenance-support.html" class="mega-card"><div class="mega-icon"><i class="fas fa-wrench"></i></div><h4>Maintenance & Support</h4><p>Mises à jour, sécurité et assistance WhatsApp sous 2h.</p><span class="mega-link-arrow">Voir la solution →</span></a>
              </div>
            </div>
          </div>
        </li>
        <li class="has-mega">
          <a href="agence.html" class="nav-link${navActive('agence')} has-arr">L'Agence <i class="fas fa-chevron-down arr"></i></a>
          <div class="megamenu megamenu-agence">
            <div class="megamenu-inner">
              <div class="mega-agence-simple">
                <div class="mega-col"><h5>Découvrir l’agence</h5><ul class="mega-links-list"><li><a href="agence.html#vision"><i class="fas fa-eye"></i> Notre vision</a></li><li><a href="agence.html#mission"><i class="fas fa-bullseye"></i> Notre mission</a></li><li><a href="agence.html"><i class="fas fa-users"></i> Notre équipe</a></li><li><a href="comment-nous-travaillons.html"><i class="fas fa-route"></i> Notre méthode</a></li><li><a href="agence.html#valeurs"><i class="fas fa-gem"></i> Nos valeurs</a></li></ul></div>
                <div class="mega-col"><h5>Ils nous font confiance</h5><ul class="mega-links-list"><li><a href="projets.html"><i class="fas fa-th-large"></i> Réalisations</a></li><li><a href="contact.html"><i class="fas fa-paper-plane"></i> Contactez-nous</a></li></ul></div>
              </div>
            </div>
          </div>
        </li>
        <li><a href="projets.html" class="nav-link${navActive('projets')}">Réalisations</a></li>
        <li><a href="blog.html" class="nav-link${navActive('blog')}">Blog</a></li>
        <li><a href="contact.html" class="nav-link${navActive('contact')}">Contact</a></li>
      </ul>
      <button class="nav-cta" onclick="window.location.href='contact.html'" type="button">
        <span class="nav-cta-text">Discutons ensemble</span>
        <i class="fas fa-arrow-up-right-from-square"></i>
      </button>
      <div class="hamburger" id="hamburger" onclick="toggleMobile()"><i class="fas fa-bars" id="hIcon"></i></div>
    </div>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    <ul class="mobile-nav-links">
      <li><a href="${isHome ? '#hero' : 'index.html'}" onclick="toggleMobile()"><i class="fas fa-home"></i> Accueil</a></li>
      <li><a href="solutions.html" onclick="toggleMobile()"><i class="fas fa-layer-group"></i> Solutions</a></li>
      <li><a href="agence.html" onclick="toggleMobile()"><i class="fas fa-building"></i> L'Agence</a></li>
      <li><a href="projets.html" onclick="toggleMobile()"><i class="fas fa-th-large"></i> Réalisations</a></li>
      <li><a href="blog.html" onclick="toggleMobile()"><i class="fas fa-pen-fancy"></i> Blog</a></li>
      <li><a href="contact.html" onclick="toggleMobile()"><i class="fas fa-paper-plane"></i> Contact</a></li>
      <li><a href="contact.html" onclick="toggleMobile()" class="mobile-cta"><i class="fab fa-whatsapp"></i> Discutons ensemble</a></li>
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

  const currentYear = new Date().getFullYear();

  const FOOTER = `
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="${isHome ? '#hero' : 'index.html'}" class="footer-logo-wrap">
          <div class="logo-circle-small"><img src="images/logo/logo.png" alt="KN Web Technology" class="footer-logo-img"></div>
          <div class="footer-brand-text"><span class="footer-brand-name">KN WEB & TECHNOLOGY</span><span class="footer-brand-tagline">Le digital au service de votre croissance</span></div>
        </a>
        <p>L'agence digitale de référence pour les PME camerounaises. Sites web, SEO, WhatsApp Business, e-commerce Mobile Money — des solutions qui rapportent de vrais clients.</p>
        <div class="footer-social">
          <a class="fs-a" href="https://wa.me/237620819290" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i></a>
          <a class="fs-a" href="#"><i class="fab fa-facebook-f"></i></a>
          <a class="fs-a" href="#"><i class="fab fa-instagram"></i></a>
          <a class="fs-a" href="#"><i class="fab fa-linkedin-in"></i></a>
          <a class="fs-a" href="#"><i class="fab fa-youtube"></i></a>
        </div>
        <div class="footer-newsletter">
          <p>Newsletter — Conseils digitaux gratuits</p>
          <form id="newsletterForm" class="newsletter-form">
            <input type="email" name="email" placeholder="votreemail@email.com" required>
            <button type="submit"><i class="fas fa-arrow-right"></i></button>
          </form>
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
          <li><a href="agence.html"><i class="fas fa-chevron-right"></i> Notre équipe</a></li>
          <li><a href="agence.html#vision"><i class="fas fa-chevron-right"></i> Notre vision</a></li>
          <li><a href="process.html"><i class="fas fa-chevron-right"></i> Notre méthode</a></li>
          <li><a href="projets.html"><i class="fas fa-chevron-right"></i> Réalisations</a></li>
          <li><a href="blog.html"><i class="fas fa-chevron-right"></i> Blog</a></li>
          <li><a href="contact.html"><i class="fas fa-chevron-right"></i> Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Contact</h5>
        <ul>
          <li><a href="https://wa.me/237620819290" target="_blank"><i class="fab fa-whatsapp"></i> +237 620 819 290</a></li>
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
          <a href="politique-confidentialite.html">Politique de confidentialité</a>
          <a href="cgv.html">CGV</a>
        </div>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/237620819290?text=Bonjour%2C%20je%20souhaite%20une%20consultation%20gratuite." class="float-wa" target="_blank"><i class="fab fa-whatsapp"></i></a>
  <button class="float-top" id="ftop" onclick="window.scrollTo({top:0,behavior:'smooth'})"><i class="fas fa-arrow-up"></i></button>`;

  // --------------------------------------------------------------
  // Injection
  // --------------------------------------------------------------
  function inject() {
    const header = document.getElementById('site-header');
    const footer = document.getElementById('site-footer');
    if (header) header.innerHTML = NAV + SIDENAV;
    if (footer) footer.innerHTML = FOOTER;
    document.dispatchEvent(new CustomEvent('kn:layout-ready'));
    initNewsletterForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
