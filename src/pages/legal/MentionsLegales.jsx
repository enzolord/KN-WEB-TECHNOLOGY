import Seo from '../../components/Seo';
import Reveal from '../../components/Reveal';
import './Legal.css';

export default function MentionsLegales() {
  return (
    <>
      <Seo
        title="Mentions légales"
        description="Mentions légales du site KN WEB & TECHNOLOGY, agence digitale basée à Édéa, Cameroun."
        path="/mentions-legales"
        noindex
      />
      <section className="section">
        <div className="container legal-content">
          <Reveal>
            <div className="tag">
              <span className="dot" /> Informations légales
            </div>
            <h1 className="section-title">Mentions légales</h1>
            <p>
              Conformément aux dispositions de la loi n° 2010/013 du 21 décembre 2010 sur les
              communications électroniques au Cameroun, et aux textes de l'OHADA, voici les mentions
              légales du site knwebtechnology.com.
            </p>

            <h2>1. Éditeur du site</h2>
            <p>
              KN WEB &amp; TECHNOLOGY
              <br />
              Forme juridique : Entreprise individuelle / SARL (à adapter)
              <br />
              Siège social : Ancienne pharmacie de la République, Édéa, Cameroun
              <br />
              Téléphone : +237 672 173 778 / +237 640 288 919
              <br />
              Email : contact@knwebtechnology.com
              <br />
              Directeur de la publication : Nloka Victor, CEO
            </p>

            <h2>2. Hébergement</h2>
            <p>
              Ce site est hébergé par : Namecheap, Inc. — 4600 East Washington Street, Suite 305, Phoenix,
              AZ 85034, États-Unis. Téléphone : +1 (480) 505-8877. Le transfert de données respecte le RGPD
              pour les visiteurs européens et les règles de protection des données personnelles au Cameroun
              (loi n° 2010/012 du 21 décembre 2010).
            </p>

            <h2>3. Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus (textes, logos, images, vidéos, code source) est la propriété
              exclusive de KN WEB &amp; TECHNOLOGY, sauf mention contraire. Toute reproduction, distribution
              ou modification sans autorisation écrite est interdite (articles 2 et suivants de l'Acte
              uniforme OHADA relatif au droit des sociétés et aux droits de propriété intellectuelle).
            </p>

            <h2>4. Responsabilité</h2>
            <p>
              KN WEB &amp; TECHNOLOGY met tout en œuvre pour fournir des informations exactes et
              actualisées. Cependant, des erreurs ou omissions peuvent survenir. L'agence ne saurait être
              tenue responsable de dommages directs ou indirects liés à l'utilisation du site ou des
              services.
            </p>

            <h2>5. Collecte de données personnelles</h2>
            <p>
              Les données personnelles recueillies via les formulaires de contact sont traitées
              conformément à notre Politique de confidentialité. Conformément à la loi camerounaise sur la
              protection des données, vous disposez d'un droit d'accès, de rectification et d'opposition.
              Pour l'exercer, écrivez à contact@knwebtechnology.com.
            </p>

            <h2>6. Cookies</h2>
            <p>
              Le site utilise des cookies techniques nécessaires à son bon fonctionnement (session,
              sécurité). Aucun cookie publicitaire ou de suivi n'est déposé sans consentement préalable.
            </p>

            <h2>7. Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit camerounais et, le cas échéant, par le
              droit OHADA. Tout litige relève de la compétence exclusive des tribunaux de Douala ou Édéa.
            </p>

            <p className="legal-updated">Dernière mise à jour : juin 2025</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
