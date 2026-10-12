import Seo from '../../components/Seo';
import Reveal from '../../components/Reveal';
import './Legal.css';

export default function Confidentialite() {
  return (
    <>
      <Seo
        title="Politique de confidentialité"
        description="Politique de confidentialité et protection des données personnelles de KN WEB & TECHNOLOGY."
        path="/politique-confidentialite"
        noindex
      />
      <section className="section">
        <div className="container legal-content">
          <Reveal>
            <div className="tag">
              <span className="dot" /> Vos données
            </div>
            <h1 className="section-title">Politique de confidentialité</h1>
            <p>
              KN WEB &amp; TECHNOLOGY accorde une grande importance à la protection de vos données
              personnelles. Cette politique décrit comment nous collectons, utilisons et protégeons vos
              informations conformément à la législation camerounaise (loi n° 2010/012 du 21 décembre 2010
              sur la protection des données à caractère personnel) et aux principes OHADA.
            </p>

            <h2>1. Collecte des données</h2>
            <p>Nous collectons les informations que vous nous fournissez volontairement via :</p>
            <ul>
              <li>Formulaire de contact (nom, email, téléphone, message)</li>
              <li>Demande de devis</li>
              <li>Newsletter (email)</li>
              <li>Échanges par WhatsApp ou courrier électronique</li>
            </ul>
            <p>Nous ne collectons pas de données sensibles (santé, opinions politiques, etc.).</p>

            <h2>2. Utilisation des données</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul>
              <li>Répondre à vos demandes de contact et de devis</li>
              <li>Gérer notre relation client (facturation, suivi de projet)</li>
              <li>Vous envoyer des informations sur nos services (si vous avez consenti)</li>
              <li>Améliorer notre site et nos offres (statistiques anonymes)</li>
            </ul>

            <h2>3. Durée de conservation</h2>
            <p>
              Les données relatives aux prospects sont conservées 3 ans après le dernier contact. Les
              données des clients sont conservées pendant toute la durée de la relation commerciale, puis
              archivées conformément aux obligations légales (notamment fiscales et comptables – 10 ans
              pour les factures).
            </p>

            <h2>4. Partage des données</h2>
            <p>Nous ne vendons ni ne louons vos données personnelles. Elles peuvent être partagées avec :</p>
            <ul>
              <li>Nos prestataires techniques (hébergeur, outils de gestion) qui s'engagent à respecter cette politique</li>
              <li>Les autorités judiciaires sur réquisition légale</li>
            </ul>

            <h2>5. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
              vos données contre la perte, l'utilisation abusive ou l'accès non autorisé (SSL, accès
              restreint, sauvegardes).
            </p>

            <h2>6. Vos droits</h2>
            <p>
              Conformément à la loi camerounaise, vous disposez d'un droit d'accès, de rectification,
              d'effacement et d'opposition au traitement de vos données. Pour les exercer, écrivez à
              contact@knwebtechnology.com ou par courrier à notre adresse. Nous vous répondrons dans un
              délai maximum de 30 jours.
            </p>

            <h2>7. Cookies</h2>
            <p>
              Notre site utilise uniquement des cookies techniques (session) sans stockage de données
              personnelles. Aucun cookie tiers de suivi n'est déployé sans votre consentement explicite.
            </p>

            <h2>8. Modification de la politique</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique. La version en ligne fait foi. Nous
              vous informerons de toute modification substantielle via le site.
            </p>

            <p className="legal-updated">Dernière mise à jour : juin 2025</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
