/* KN WEB — Interactions & animations */

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) {
    if (!window.location.pathname.includes('index')) {
      window.location.href = 'index.html#' + id;
    }
    return;
  }
  const y = el.getBoundingClientRect().top + window.scrollY - 88;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function toggleMobile() {
  const m = document.getElementById('mobileMenu');
  const i = document.getElementById('hIcon');
  if (!m) return;
  const open = m.classList.toggle('open');
  if (i) i.className = open ? 'fas fa-times' : 'fas fa-bars';
  document.body.style.overflow = open ? 'hidden' : '';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  const tm = document.getElementById('tmsg');
  if (!t || !tm) return;
  tm.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

function handleForm(e) {
  e.preventDefault();
  showToast('Message envoyé ! Réponse sous 24h.');
  setTimeout(() => {
    window.open('https://wa.me/237620819290?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20mon%20projet.', '_blank');
  }, 1600);
  e.target.reset();
}

function filterProj(cat, btn) {
  document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('#projGrid .proj-card').forEach(c => {
    const cats = c.dataset.cat || '';
    const show = cat === 'all' || cats.includes(cat);
    c.style.transition = 'opacity 0.4s, transform 0.4s';
    if (show) {
      c.style.display = '';
      requestAnimationFrame(() => { c.style.opacity = '1'; c.style.transform = ''; });
    } else {
      c.style.opacity = '0';
      c.style.transform = 'scale(0.95)';
      setTimeout(() => { c.style.display = 'none'; }, 400);
    }
  });
}

let siteInited = false;

function initSite() {
  if (siteInited) return;
  siteInited = true;
  const nb = document.getElementById('navbar');
  const pb = document.getElementById('pgbar');
  const ft = document.getElementById('ftop');
  const snSections = ['hero', 'services', 'projets', 'agency', 'contact'];

  function onScroll() {
    const s = window.scrollY;
    if (nb) nb.classList.toggle('solid', s > 50);
    if (ft) ft.classList.toggle('show', s > 500);
    if (pb) {
      const tot = document.documentElement.scrollHeight - window.innerHeight;
      pb.style.width = tot > 0 ? (s / tot * 100) + '%' : '0%';
    }
    document.querySelectorAll('.sn-dot').forEach((dot, i) => {
      const id = snSections[i];
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      dot.classList.toggle('active', rect.top <= 140 && rect.bottom > 140);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mega menu touch */
  document.querySelectorAll('.has-mega').forEach(li => {
    li.addEventListener('mouseenter', () => li.classList.add('mega-open'));
    li.addEventListener('mouseleave', () => li.classList.remove('mega-open'));
  });

  /* Reveal */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(r => revObs.observe(r));

  /* Method steps */
  document.querySelectorAll('.m-step').forEach(step => {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('.m-step').forEach(s => s.classList.remove('active'));
          step.classList.add('active');
        }
      });
    }, { threshold: 0.45 }).observe(step);
  });

  /* 3D tilt cards */
  document.querySelectorAll('.srv-card, .proj-card, .blog-card, .mega-card[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* Magnetic buttons */
  document.querySelectorAll('.btn-primary, .btn-ai, .btn-ghost, .nav-cta, .cf-submit').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.2;
      const y = (e.clientY - r.top - r.height / 2) * 0.2;
      btn.style.transform = `translate(${x}px, ${y}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* GSAP */
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero h1', { duration: 1.1, y: 50, opacity: 0, ease: 'power3.out', delay: 0.25 });
    gsap.from('.hero-sub', { duration: 0.9, y: 28, opacity: 0, ease: 'power2.out', delay: 0.55 });
    gsap.from('.hero-btns', { duration: 0.8, y: 20, opacity: 0, ease: 'power2.out', delay: 0.75 });
    gsap.from('.hero-label', { duration: 0.7, y: -16, opacity: 0, ease: 'power2.out', delay: 0.1 });
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.s-title').forEach(el => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 88%' },
          y: 36, opacity: 0, duration: 0.9, ease: 'power3.out'
        });
      });
    }
  }

  /* Hash on load */
  if (window.location.hash) {
    const id = window.location.hash.slice(1);
    setTimeout(() => scrollToSection(id), 400);
  }
}
// Adaptation automatique : duplique le contenu pour un défilement infini
  (function() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    // Calcule la largeur totale du contenu original
    const originalWidth = track.scrollWidth;
    // Vérifie si la largeur est inférieure à la fenêtre ? On duplique assez pour que 2x dépasse
    // Mais pour un défilement continu avec translateX(-50%), il faut que le contenu soit au moins deux fois plus large que le conteneur.
    // On duplique une fois le contenu (sauf si déjà dupliqué manuellement)
    const children = Array.from(track.children);
    // On évite de dupliquer plusieurs fois
    if (track.getAttribute('data-cloned') === 'true') return;
    // Clone chaque élément et les ajoute à la suite
    children.forEach(child => {
      const clone = child.cloneNode(true);
      track.appendChild(clone);
    });
    track.setAttribute('data-cloned', 'true');
  })();
document.addEventListener('kn:layout-ready', initSite);
if (document.getElementById('navbar')) initSite();

