import Seo from '../../components/Seo';
import Reveal from '../../components/Reveal';
import './Legal.css';

export default function Cgv() {
  return (
    <>
      <Seo
        title="Conditions Générales de Vente"
        description="Conditions générales de vente (CGV) applicables aux prestations de KN WEB & TECHNOLOGY."
        path="/cgv"
        noindex
      />
      <section className="section">
        <div className="container legal-content">
          <Reveal>
            <div className="tag">
              <span className="dot" /> Conditions
            </div>
            <h1 className="section-title">Conditions Générales de Vente (CGV)</h1>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les prestations de services
              fournies par l'agence KN WEB &amp; TECHNOLOGY (ci-après « le Prestataire ») à ses clients
              (ci-après « le Client »). Toute commande implique l'acceptation sans réserve des présentes.
            </p>

            <h2>1. Objet</h2>
            <p>
              Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le
              cadre de la fourniture de prestations digitales : création de sites web, applications
              web/mobiles, e-commerce, SEO, WhatsApp Business, maintenance, hébergement, etc.
            </p>

            <h2>2. Devis et commande</h2>
            <p>
              Chaque prestation fait l'objet d'un devis détaillé envoyé par le Prestataire. La commande est
              ferme après signature du devis et versement d'un acompte de 40% à 60% selon la nature du
              projet. Le devis est valable 30 jours. Passé ce délai, un nouveau devis peut être établi.
            </p>

            <h2>3. Prix et modalités de paiement</h2>
            <p>
              Les prix sont indiqués en francs CFA (XAF), hors taxes (TVA non applicable pour les
              auto-entrepreneurs sous certains seuils). Les paiements sont acceptés par :
            </p>
            <ul>
              <li>Virement bancaire</li>
              <li>Mobile Money (MTN Mobile Money, Orange Money)</li>
              <li>Espèces (dans la limite légale)</li>
            </ul>
            <p>
              Le solde est dû à la livraison du projet, sauf mention contraire dans le devis. Tout retard de
              paiement entraîne des pénalités au taux de 1,5% par mois, conformément aux usages commerciaux
              camerounais.
            </p>

            <h2>4. Délais de livraison</h2>
            <p>
              Les délais indiqués dans le devis (généralement 3 à 10 jours ouvrés pour un site vitrine) sont
              donnés à titre indicatif. Un retard ne peut donner lieu à des dommages et intérêts, sauf faute
              lourde du Prestataire. En cas de dépendance à des éléments fournis par le Client (contenus,
              accès), les délais sont prolongés d'autant.
            </p>

            <h2>5. Propriété intellectuelle</h2>
            <p>
              Le Prestataire conserve la propriété du code source et des éléments graphiques jusqu'au
              paiement intégral. Après paiement, le Client devient propriétaire du code livré, à l'exception
              des bibliothèques tierces (licences spécifiques). Le Prestataire se réserve le droit de
              mentionner le projet dans son portfolio.
            </p>

            <h2>6. Obligations du Client</h2>
            <p>Le Client s'engage à :</p>
            <ul>
              <li>Fournir tous les contenus (textes, images) nécessaires dans les délais</li>
              <li>Respecter les lois en vigueur sur son site (notamment droit à l'image, données personnelles)</li>
              <li>Ne pas utiliser les prestations à des fins illégales</li>
            </ul>

            <h2>7. Réception et garantie</h2>
            <p>
              Le Client dispose de 7 jours à compter de la mise en ligne pour signaler par écrit les
              éventuelles anomalies. Passé ce délai, la prestation est réputée conforme. Le Prestataire
              garantit son travail contre les vices cachés pendant 30 jours. Les corrections mineures sont
              incluses ; les évolutions (nouvelles fonctionnalités) feront l'objet d'un nouveau devis.
            </p>

            <h2>8. Responsabilité</h2>
            <p>
              Le Prestataire ne saurait être tenu responsable d'une perte de données due à une négligence du
              Client (absence de sauvegarde) ou d'une indisponibilité du site liée à l'hébergeur. La
              responsabilité totale du Prestataire est limitée au montant des prestations facturées.
            </p>

            <h2>9. Confidentialité</h2>
            <p>
              Les parties s'engagent à garder confidentiels les échanges et informations sensibles relatives
              au projet.
            </p>

            <h2>10. Résiliation</h2>
            <p>
              En cas d'inexécution grave, la partie lésée peut résilier le contrat par mise en demeure restée
              sans effet pendant 15 jours. Le Client peut annuler le projet avant le début des travaux,
              l'acompte reste alors acquis.
            </p>

            <h2>11. Droit applicable et règlement des litiges</h2>
            <p>
              Les présentes CGV sont soumises au droit camerounais et, subsidiairement, aux dispositions de
              l'OHADA. Tout litige sera soumis à la compétence exclusive des tribunaux de Douala ou Édéa, à
              défaut de règlement amiable.
            </p>

            <p className="legal-updated">Dernière mise à jour : juin 2025</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
