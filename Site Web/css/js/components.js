// js/components.js

// Composant : Logos partenaires
function renderPartnersLogos(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const defaultLogos = [
        { src: "images/logo_poussinsarl.png", alt: "Poussin SARL", name: "Poussin SARL" },
        { src: "images/logo_pnpe.png", alt: "PNPE", name: "PNPE" },
        { src: "images/Logo_IUT_Douala.avif", alt: "IUT Douala", name: "IUT Douala" }
    ];
    
    const logos = options.logos || defaultLogos;
    const title = options.title || "Ils nous font confiance";
    const bgColor = options.bgColor || "#ffffff";
    
    container.innerHTML = `
        <div class="partners-section" style="background: ${bgColor};">
            <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div class="partners-badge">
                    <span><i class="fas fa-handshake mr-2"></i> ${title}</span>
                </div>
                <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 md:gap-10 items-center justify-items-center">
                    ${logos.map(logo => `
                        <div class="logo-animated w-full flex justify-center">
                            <img src="${logo.src}" alt="${logo.alt}" class="h-[70px] w-auto max-w-full object-contain" loading="lazy">
                        </div>
                    `).join('')}
                </div>
                <div class="partners-line">
                    <div class="line">
                        <span></span>
                        INNOVATION & CONFIANCE
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Composant : Carte interactive Leaflet
function renderInteractiveMap(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const defaultCities = {
        "Édéa": [3.8048, 10.1382, "Siège social"],
        "Douala": [4.0511, 9.7679, "Capitale économique"],
        "Yaoundé": [3.8480, 11.5021, "Capitale politique"],
        "Bafoussam": [5.4776, 10.4176, "Ouest Cameroun"],
        "Garoua": [9.2999, 13.3927, "Nord"],
        "Kribi": [2.9379, 9.9095, "Port en eau profonde"],
        "Limbé": [4.0121, 9.2078, "Ville balnéaire"],
        "Bertoua": [4.5792, 13.6837, "Est"],
        "Ngaoundéré": [7.3167, 13.5833, "Adamaoua"],
        "Maroua": [10.591, 14.3159, "Extrême-Nord"]
    };
    
    const cities = options.cities || defaultCities;
    const title = options.title || "Basés à Édéa, actifs dans tout le Cameroun";
    const subtitle = options.subtitle || "Notre présence sur le territoire";
    const center = cities["Édéa"] || [3.8048, 10.1382];
    
    container.innerHTML = `
        <div class="fade-up">
            <div class="s-label"><i class="fas fa-map-marked-alt"></i> Présence</div>
            <h2 class="s-title">${title}</h2>
            <div class="map-container" id="mapContainer">
                <div id="camerounMap" style="height: 420px; width: 100%;"></div>
            </div>
            <div class="city-list" id="cityList"></div>
        </div>
    `;
    
    // Initialisation de la carte après l'insertion du HTML
    setTimeout(() => initMap(cities, center), 100);
}

function initMap(cities, center) {
    if (typeof L === 'undefined') {
        console.error('Leaflet not loaded');
        return;
    }
    
    const map = L.map('camerounMap').setView(center, 6.5);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> & CartoDB'
    }).addTo(map);
    
    const edeaIcon = L.divIcon({ 
        html: '<i class="fas fa-map-marker-alt" style="font-size:28px; color:#fbbf24; filter:drop-shadow(0 2px 4px black);"></i>', 
        iconSize: [28,28], 
        className: 'custom-marker' 
    });
    L.marker(center, { icon: edeaIcon }).addTo(map).bindPopup('<b>Édéa</b><br>Siège social').openPopup();
    
    for (let [name, coords] of Object.entries(cities)) {
        if (name !== "Édéa") {
            L.marker([coords[0], coords[1]]).addTo(map).bindPopup(`<b>${name}</b><br>${coords[2]}`);
        }
    }
    
    const lines = [];
    for (let [name, coords] of Object.entries(cities)) {
        if (name !== "Édéa") {
            L.polyline([center, [coords[0], coords[1]]], { color: '#6366f1', weight: 2.5, opacity: 0.6, dashArray: '8, 6' }).addTo(map);
            lines.push({ from: center, to: [coords[0], coords[1]] });
        }
    }
    
    function animateCurrentLine({ from, to }) {
        const start = L.latLng(from[0], from[1]);
        const end = L.latLng(to[0], to[1]);
        const duration = 3800;
        let startTime = performance.now();
        const circle = L.circleMarker(start, { radius: 5, color: '#fbbf24', weight: 2, fillOpacity: 0.9 }).addTo(map);
        function step(now) {
            const elapsed = now - startTime;
            let t = Math.min(1, elapsed / duration);
            const lat = start.lat + (end.lat - start.lat) * t;
            const lng = start.lng + (end.lng - start.lng) * t;
            circle.setLatLng([lat, lng]);
            if (t < 1) requestAnimationFrame(step);
            else { map.removeLayer(circle); setTimeout(() => animateCurrentLine({ from, to }), 400); }
        }
        requestAnimationFrame(step);
    }
    
    setTimeout(() => { lines.forEach((line, idx) => { setTimeout(() => animateCurrentLine(line), idx * 600); }); }, 800);
    
    const cityListDiv = document.getElementById('cityList');
    if (cityListDiv) {
        for (let [name, coords] of Object.entries(cities)) {
            const badge = document.createElement('span');
            badge.className = 'city-badge';
            badge.innerHTML = `<i class="fas fa-map-pin"></i> ${name}`;
            badge.addEventListener('click', () => {
                map.setView([coords[0], coords[1]], 9);
                map.closePopup();
                L.popup().setLatLng([coords[0], coords[1]]).setContent(`<b>${name}</b><br>${coords[2]}`).openOn(map);
            });
            cityListDiv.appendChild(badge);
        }
    }
}

// Composant : Section Notre philosophie (valeurs + mission)
function renderPhilosophySection(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const defaultValues = [
        { number: "1", title: "Excellence", description: "Chaque livrable est soigné comme si c'était notre propre produit." },
        { number: "2", title: "Innovation", description: "Les meilleures technologies au service de vos objectifs réels." },
        { number: "3", title: "Transparence", description: "Prix fixes, délais tenus, aucune surprise en fin de projet." }
    ];
    
    const defaultMission = [
        { title: "Rendre visible", description: "Chaque PME camerounaise mérite une présence digitale à la hauteur de ses ambitions." },
        { title: "Accompagner", description: "Des solutions accessibles, efficaces et sur mesure pour les entrepreneurs locaux." },
        { title: "Transmettre", description: "Former et rendre autonome — nous avançons avec vous, pas à votre place." }
    ];
    
    const values = options.values || defaultValues;
    const mission = options.mission || defaultMission;
    const title = options.title || "Notre philosophie";
    
    container.innerHTML = `
        <div class="section about-section">
            <div class="wrap">
                <div class="agency-header fade-up" style="text-align:center">
                    <div class="s-label" style="justify-content:center"><i class="fas fa-building"></i> ${title}</div>
                    <h2 class="s-title">Une agence qui relie <span>design, code, IA et pédagogie</span></h2>
                    <p style="max-width:800px; margin:0 auto; color:var(--muted);">Chez KN Web Technology, on conçoit des expériences numériques utiles, élégantes et pensées pour durer. Notre approche repose sur un équilibre simple : un design juste, un développement solide, l'intelligence artificielle quand elle apporte un vrai gain, et une pédagogie claire.</p>
                </div>
                <div class="values-mission-grid">
                    <div class="value-card fade-up">
                        <h3><i class="fas fa-gem" style="color:var(--gold)"></i> Nos valeurs</h3>
                        <ul>
                            ${values.map(v => `<li><i class="fas fa-check-circle" style="color:var(--gold)"></i> ${v.title}</li>`).join('')}
                        </ul>
                        <div style="margin-top: 1rem; font-size: 0.85rem; color: var(--muted);">${values[0]?.description || ''}</div>
                    </div>
                    <div class="mission-card fade-up">
                        <h3><i class="fas fa-bullseye" style="color:var(--gold)"></i> Notre mission</h3>
                        <ul>
                            ${mission.map(m => `<li style="margin-bottom: 1rem;"><strong>${m.title}</strong><br><span style="color:var(--muted); font-size:0.85rem;">${m.description}</span></li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Composant : Section Équipe (CEO + membres)
function renderTeamSection(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const defaultTeam = [
        { name: "Nloka Victor", role: "CEO & Fondateur", desc: "Visionnaire, étudiant‑entrepreneur, développeur web & mobile.", img: "images/Moi.png", social: { whatsapp: "237640288619", linkedin: "#" } },
        { name: "Sarah D.", role: "Lead Developer", desc: "Full‑stack, architecte de solutions performantes.", img: "https://randomuser.me/api/portraits/women/68.jpg", social: { github: "#", linkedin: "#" } },
        { name: "Michaël T.", role: "SEO & Content Manager", desc: "Expert en référencement local, top 1 Google.", img: "https://randomuser.me/api/portraits/men/75.jpg", social: { twitter: "#", linkedin: "#" } },
        { name: "Léa K.", role: "UI/UX Designer", desc: "Interfaces intuitives et élégantes, expérience utilisateur optimale.", img: "https://randomuser.me/api/portraits/women/44.jpg", social: { behance: "#", dribbble: "#" } }
    ];
    
    const team = options.team || defaultTeam;
    const title = options.title || "Rencontrez l'équipe";
    
    container.innerHTML = `
        <div class="section">
            <div class="wrap">
                <div style="text-align:center" class="fade-up">
                    <div class="s-label" style="justify-content:center"><i class="fas fa-heart"></i> ${title}</div>
                    <h2 class="s-title">Des talents au service de <span>votre croissance</span></h2>
                </div>
                <div class="team-grid" id="teamGrid">
                    ${team.map(member => `
                        <div class="team-card fade-up">
                            <div class="team-avatar"><img src="${member.img}" alt="${member.name}" loading="lazy"></div>
                            <div class="team-name">${member.name}</div>
                            <div class="team-role">${member.role}</div>
                            <div class="team-desc">${member.desc}</div>
                            <div class="team-social">
                                ${member.social.whatsapp ? `<a href="https://wa.me/${member.social.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i></a>` : ''}
                                ${member.social.linkedin ? `<a href="${member.social.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>` : ''}
                                ${member.social.github ? `<a href="${member.social.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                                ${member.social.twitter ? `<a href="${member.social.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
                                ${member.social.behance ? `<a href="${member.social.behance}" target="_blank"><i class="fab fa-behance"></i></a>` : ''}
                                ${member.social.dribbble ? `<a href="${member.social.dribbble}" target="_blank"><i class="fab fa-dribbble"></i></a>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}