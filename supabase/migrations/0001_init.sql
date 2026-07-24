-- Content tables (publicly readable) --------------------------------------

create table ventures (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  tag text,
  title text not null,
  blurb text,
  long_vision text,
  current_work text,
  theme_key text,
  hero_image_url text,
  status text not null default 'active',
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text not null default '',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Author-only annotations on a post. There is no public comment box, by design.
create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts(id) on delete cascade,
  author_email text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table resume_items (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  role text not null,
  org text,
  detail text,
  order_index int not null default 0
);

create table certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text,
  date_earned date,
  credential_url text,
  order_index int not null default 0
);

create table media_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('book', 'music', 'other')),
  title text not null,
  creator text,
  blurb text,
  order_index int not null default 0
);

create table socials (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  icon_key text,
  order_index int not null default 0
);

create table site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb
);

-- Private tables (server-side access only) ---------------------------------

create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  path text,
  section text,
  session_id text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table user_prefs (
  id uuid primary key default gen_random_uuid(),
  user_email text unique not null,
  theme text not null default 'dark',
  animation_on boolean not null default true,
  audio_on boolean not null default false,
  analytics_consent boolean not null default false,
  updated_at timestamptz not null default now()
);

-- Indexes ------------------------------------------------------------------

create index ventures_order_idx on ventures (order_index);
create index posts_published_idx on posts (published, published_at desc);
create index comments_post_idx on comments (post_id);
create index resume_items_order_idx on resume_items (order_index);
create index certifications_order_idx on certifications (order_index);
create index media_items_order_idx on media_items (category, order_index);
create index socials_order_idx on socials (order_index);
create index contact_submissions_created_idx on contact_submissions (created_at desc);
create index analytics_events_created_idx on analytics_events (created_at desc);
create index analytics_events_type_idx on analytics_events (event_type);

-- Row level security -------------------------------------------------------
-- Every table has RLS on. Anonymous clients get read-only access to the
-- content that the public site displays and nothing else. Writes, and all
-- access to the private tables, go through server routes using the service
-- role key, which are already gated on the single-admin allowlist.

alter table ventures enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table resume_items enable row level security;
alter table certifications enable row level security;
alter table media_items enable row level security;
alter table socials enable row level security;
alter table site_settings enable row level security;
alter table contact_submissions enable row level security;
alter table analytics_events enable row level security;
alter table user_prefs enable row level security;

create policy "public reads active ventures" on ventures
  for select to anon, authenticated using (status = 'active');

create policy "public reads published posts" on posts
  for select to anon, authenticated using (published = true);

create policy "public reads resume items" on resume_items
  for select to anon, authenticated using (true);

create policy "public reads certifications" on certifications
  for select to anon, authenticated using (true);

create policy "public reads media items" on media_items
  for select to anon, authenticated using (true);

create policy "public reads socials" on socials
  for select to anon, authenticated using (true);

create policy "public reads site settings" on site_settings
  for select to anon, authenticated using (true);

-- Triggers -----------------------------------------------------------------

create or replace function set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger ventures_set_updated_at
  before update on ventures
  for each row execute function set_updated_at();

create trigger posts_set_updated_at
  before update on posts
  for each row execute function set_updated_at();

create trigger user_prefs_set_updated_at
  before update on user_prefs
  for each row execute function set_updated_at();
