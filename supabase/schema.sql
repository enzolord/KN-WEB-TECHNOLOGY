-- ============================================================================
-- KN WEB & TECHNOLOGY — Schéma Supabase
-- ============================================================================
-- Comment utiliser ce fichier :
-- 1. Ouvrez votre projet sur https://supabase.com/dashboard
-- 2. Allez dans "SQL Editor" -> "New query"
-- 3. Collez tout ce fichier et cliquez sur "Run"
-- 4. Copiez ensuite Project URL + anon public key (Settings -> API)
--    dans le fichier .env à la racine du projet (voir .env.example)
-- 5. IMPORTANT : Désactivez les inscriptions publiques
--    (Authentication -> Providers -> Email -> "Allow new users to sign up" = OFF)
--    puis créez vos comptes admin manuellement dans Authentication -> Users -> Add user
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Fonction utilitaire : met à jour automatiquement updated_at
-- ----------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================================
-- SERVICES
-- ============================================================================
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  number text,
  icon text default 'globe',
  title text not null,
  short_desc text,
  price_label text,
  price_value numeric,
  image_url text,
  hero_title text,
  hero_highlight text,
  lead text,
  h2 text,
  description text,
  features jsonb not null default '[]'::jsonb,
  wa_message text,
  meta_description text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger services_set_updated_at before update on services
  for each row execute function set_updated_at();

-- ============================================================================
-- MEMBRES DE L'ÉQUIPE
-- ============================================================================
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  description text,
  image_url text,
  social jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger team_members_set_updated_at before update on team_members
  for each row execute function set_updated_at();

-- ============================================================================
-- PROJETS / PORTFOLIO
-- ============================================================================
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  category text default 'web',
  tagline text,
  description text,
  image_url text,
  link text,
  featured boolean not null default false,
  problem text,
  solution text,
  tags jsonb not null default '[]'::jsonb,
  gallery jsonb not null default '[]'::jsonb,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger projects_set_updated_at before update on projects
  for each row execute function set_updated_at();

-- ============================================================================
-- PARTENAIRES (logos "ils nous font confiance")
-- ============================================================================
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  link text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger partners_set_updated_at before update on partners
  for each row execute function set_updated_at();

-- ============================================================================
-- IMAGES DU CARROUSEL (page d'accueil)
-- ============================================================================
create table if not exists hero_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger hero_images_set_updated_at before update on hero_images
  for each row execute function set_updated_at();

-- ============================================================================
-- TÉMOIGNAGES CLIENTS
-- ============================================================================
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_role text,
  photo_url text,
  message text not null,
  rating int not null default 5,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger testimonials_set_updated_at before update on testimonials
  for each row execute function set_updated_at();

-- ============================================================================
-- ARTICLES DE BLOG (contenu dynamique -> publication d'actualités pour le SEO)
-- ============================================================================
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  category text default 'actualite',
  content_md text not null default '',
  image_url text,
  author text default 'KN WEB & TECHNOLOGY',
  read_time text,
  status text not null default 'draft' check (status in ('draft','published')),
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists articles_status_published_idx on articles (status, published_at desc);
create trigger articles_set_updated_at before update on articles
  for each row execute function set_updated_at();

-- ============================================================================
-- BANNIÈRES PROMOTIONNELLES (avec fenêtre de diffusion planifiée)
-- ============================================================================
create table if not exists banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_url text,
  link_url text,
  cta_label text default 'En savoir plus',
  theme text not null default 'brand' check (theme in ('brand','gold','dark','light')),
  placement text not null default 'home_top',
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger banners_set_updated_at before update on banners
  for each row execute function set_updated_at();

-- ============================================================================
-- ANNONCES (bandeau fin en haut du site)
-- ============================================================================
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  link_url text,
  link_label text,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger announcements_set_updated_at before update on announcements
  for each row execute function set_updated_at();

-- ============================================================================
-- FAQ
-- ============================================================================
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- PARAMÈTRES DU SITE (clé/valeur — téléphone, adresse, réseaux sociaux...)
-- ============================================================================
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

insert into site_settings (key, value) values
  ('contact', '{"phone":"+237 672 173 778","whatsapp":"237672173778","whatsappSecondary":"237640288919","email":"contact@knwebtechnology.com","address":"Édéa, Cameroun"}'),
  ('social', '{"facebook":"","instagram":"","linkedin":"","tiktok":""}')
on conflict (key) do nothing;

-- ============================================================================
-- MESSAGES DE CONTACT (soumissions du formulaire, visibles dans le dashboard)
-- ============================================================================
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  subject text,
  message text,
  source text default 'contact_page',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table services enable row level security;
alter table team_members enable row level security;
alter table projects enable row level security;
alter table articles enable row level security;
alter table banners enable row level security;
alter table announcements enable row level security;
alter table faqs enable row level security;
alter table site_settings enable row level security;
alter table contact_messages enable row level security;
alter table partners enable row level security;
alter table hero_images enable row level security;
alter table testimonials enable row level security;

-- Lecture publique du contenu actif/publié
create policy "public read active services" on services for select using (is_active = true);
create policy "public read active team" on team_members for select using (is_active = true);
create policy "public read active projects" on projects for select using (is_active = true);
create policy "public read published articles" on articles for select using (status = 'published');
create policy "public read active banners" on banners for select using (
  is_active = true
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at >= now())
);
create policy "public read active announcements" on announcements for select using (
  is_active = true
  and (starts_at is null or starts_at <= now())
  and (ends_at is null or ends_at >= now())
);
create policy "public read active faqs" on faqs for select using (is_active = true);
create policy "public read settings" on site_settings for select using (true);
create policy "public read active partners" on partners for select using (is_active = true);
create policy "public read active hero images" on hero_images for select using (is_active = true);
create policy "public read active testimonials" on testimonials for select using (is_active = true);

-- Le formulaire de contact public peut uniquement insérer
create policy "public insert contact messages" on contact_messages for insert with check (true);

-- Les utilisateurs authentifiés (comptes admin) ont un accès complet
create policy "admin full access services" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access team" on team_members for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access projects" on projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access articles" on articles for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access banners" on banners for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access announcements" on announcements for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access faqs" on faqs for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access messages" on contact_messages for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access partners" on partners for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access hero images" on hero_images for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin full access testimonials" on testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ============================================================================
-- STOCKAGE (bucket public pour les images uploadées depuis le dashboard)
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects for select using (bucket_id = 'media');
create policy "admin upload media" on storage.objects for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin update media" on storage.objects for update using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "admin delete media" on storage.objects for delete using (bucket_id = 'media' and auth.role() = 'authenticated');

-- ============================================================================
-- Fin du schéma. Le site fonctionne avec des données de secours (locales)
-- tant que ces tables sont vides — dès que vous ajoutez du contenu depuis
-- /admin, il remplace automatiquement les données de secours sur le site public.
-- ============================================================================
