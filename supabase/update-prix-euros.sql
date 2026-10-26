-- Tarifs en euros (affichés aux visiteurs hors Afrique). À exécuter UNE FOIS
-- dans Supabase → SQL Editor. Ensuite, modifiables dans /admin → Services.
alter table services add column if not exists price_eur_label text;

update services set price_eur_label = 'À partir de 1 900 € HT' where slug = 'site-web-vitrine';
update services set price_eur_label = '690 € HT + 79 €/mois' where slug = 'whatsapp-business-pro';
update services set price_eur_label = 'À partir de 3 900 € HT' where slug = 'ecommerce-mobile-money';
update services set price_eur_label = 'À partir de 690 € HT/mois' where slug = 'referencement-google';
update services set price_eur_label = 'À partir de 1 200 € HT' where slug = 'branding-identite';
update services set price_eur_label = 'Sur devis' where slug = 'automatisation-ia';
update services set price_eur_label = 'À partir de 29 € HT/mois' where slug = 'hebergement-infra';
update services set price_eur_label = 'À partir de 119 € HT/mois' where slug = 'maintenance-support';
update services set price_eur_label = 'À partir de 12 000 € HT' where slug = 'app-web';
update services set price_eur_label = 'À partir de 990 € HT' where slug = 'consulting-audit';
