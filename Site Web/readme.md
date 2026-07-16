<!-- Logos partenaires -->
<div id="partnersComponent"></div>

<!-- Carte interactive -->
<div id="mapComponent"></div>

<!-- Section philosophie -->
<div id="philosophyComponent"></div>

<!-- Section équipe -->
<div id="teamComponent"></div>

<script src="js/components.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Logos partenaires
        renderPartnersLogos('partnersComponent', {
            title: "Ils nous font confiance",
            bgColor: "#ffffff"
        });
        
        // Carte interactive
        renderInteractiveMap('mapComponent', {
            title: "Basés à Édéa, actifs dans tout le Cameroun"
        });
        
        // Section philosophie
        renderPhilosophySection('philosophyComponent', {
            title: "Notre philosophie"
        });
        
        // Section équipe
        renderTeamSection('teamComponent', {
            title: "Rencontrez l'équipe"
        });
    });
</script>
/* Styles pour les logos partenaires */
.partners-section {
    padding: 3rem 0;
    margin: 2rem 0;
}
.partners-badge span {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    background: #f0f2f5;
    padding: 0.5rem 1.2rem;
    border-radius: 40px;
    color: #6366f1;
    border: 1px solid #e0e4e8;
}
.partners-line .line {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 0.7rem;
    color: #6366f1;
}
.partners-line .line span {
    width: 30px;
    height: 1px;
    background: #6366f1;
    opacity: 0.5;
}
.logo-animated {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-radius: 16px;
    padding: 12px 16px;
    transition: all 0.25s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}
.logo-animated img {
    max-height: 70px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
}
.logo-animated:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
}

/* Styles pour la section philosophie */
.about-section {
    background: radial-gradient(ellipse at 30% 40%, rgba(99,102,241,0.1), transparent);
}
.values-mission-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
}
.value-card, .mission-card {
    background: rgba(15,23,42,0.5);
    backdrop-filter: blur(8px);
    border-radius: 2rem;
    padding: 2rem;
    border: 1px solid rgba(99,102,241,0.2);
}
.value-card ul, .mission-card ul {
    list-style: none;
}
.value-card li, .mission-card li {
    margin: 0.8rem 0;
    display: flex;
    align-items: center;
    gap: 0.6rem;
}