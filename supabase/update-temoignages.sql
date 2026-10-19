-- Remplace les 3 témoignages d'exemple par les retours réels des clients.
-- À exécuter UNE FOIS dans Supabase → SQL Editor (si seed.sql a déjà été lancé).
-- rating = 0 : le client n'a pas donné de note → aucune étoile n'est affichée.

delete from testimonials where author_name = 'Exemple à remplacer';

insert into testimonials (author_name, author_role, photo_url, message, rating, sort_order) values
  ('Alexa Shop', 'Boutique de mode en ligne', null,
    'Un accompagnement d''une vraie qualité. Notre boutique a été livrée en seulement 4 jours, et nos ventes ont été multipliées par 4 sur les trois premiers mois.', 0, 1),
  ('Empire Longrich', 'E-commerce bien-être & santé', null,
    'Nos commandes ont été multipliées. Nous avons apprécié la rapidité de livraison du site et la réactivité de l''équipe à chaque problème.', 0, 2),
  ('Les Délices d''Édéa', 'Restaurant à Édéa', null,
    'Depuis la mise en ligne de notre site, nos commandes à emporter ont augmenté de 80 %.', 0, 3),
  ('Ecohabitat', 'Rénovation', null,
    'Nous recevons aujourd''hui plus de 150 demandes de devis par mois grâce à notre site.', 0, 4);
