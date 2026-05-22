-- AquaNote Supabase schema draft.
-- Run this after creating a Supabase project. It assumes Supabase Auth owns auth.users.

create extension if not exists pgcrypto;

create type profile_visibility as enum ('public', 'friends', 'private');
create type account_plan as enum ('free', 'plus', 'pro');
create type media_kind as enum ('image', 'video');
create type reminder_schedule as enum ('daily', 'weekly', 'interval');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text not null unique check (handle ~ '^[a-z0-9_]{3,24}$'),
  display_name text not null,
  email text,
  visibility profile_visibility not null default 'public',
  plan account_plan not null default 'free',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tanks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  kind text not null,
  size_label text,
  volume_label text,
  residents text,
  tags text[] not null default '{}',
  featured_post_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.logs (
  id uuid primary key default gen_random_uuid(),
  tank_id uuid not null references public.tanks(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  log_type text not null,
  temp_c numeric(4, 1),
  ph numeric(3, 1),
  note text,
  recorded_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  tank_id uuid references public.tanks(id) on delete set null,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  tag text not null,
  body text not null,
  album_position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tanks
  add constraint tanks_featured_post_fk
  foreign key (featured_post_id) references public.posts(id) on delete set null;

create table public.media (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  kind media_kind not null,
  storage_path text not null,
  thumbnail_path text,
  duration_seconds integer,
  width integer,
  height integer,
  created_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) <= 240),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.post_likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  task_key text not null,
  label text not null,
  enabled boolean not null default true,
  schedule reminder_schedule not null default 'daily',
  weekdays integer[] not null default '{0,1,2,3,4,5,6}',
  interval_days integer not null default 1 check (interval_days >= 1),
  start_date date not null default current_date,
  notify_time time not null,
  last_notified_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, task_key)
);

create table public.ai_results (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  tank_id uuid references public.tanks(id) on delete cascade,
  post_id uuid references public.posts(id) on delete set null,
  status text not null,
  level text not null default '',
  summary text not null,
  items text[] not null default '{}',
  checked_at timestamptz not null default now()
);

create view public.post_stats as
select
  posts.id as post_id,
  count(distinct post_likes.user_id) as likes_count,
  count(distinct comments.id) as comments_count,
  count(distinct post_likes.user_id) + count(distinct comments.id) * 3 as ranking_score
from public.posts
left join public.post_likes on post_likes.post_id = posts.id
left join public.comments on comments.post_id = posts.id
group by posts.id;

create index tanks_owner_idx on public.tanks(owner_id);
create index logs_tank_recorded_idx on public.logs(tank_id, recorded_at desc);
create index posts_tank_created_idx on public.posts(tank_id, created_at desc);
create index posts_owner_idx on public.posts(owner_id);
create index media_post_idx on public.media(post_id);
create index comments_post_created_idx on public.comments(post_id, created_at desc);
create index reminders_owner_idx on public.reminders(owner_id);
create index ai_results_tank_checked_idx on public.ai_results(tank_id, checked_at desc);

alter table public.profiles enable row level security;
alter table public.tanks enable row level security;
alter table public.logs enable row level security;
alter table public.posts enable row level security;
alter table public.media enable row level security;
alter table public.comments enable row level security;
alter table public.post_likes enable row level security;
alter table public.reminders enable row level security;
alter table public.ai_results enable row level security;

create policy "Public profiles are readable"
on public.profiles for select
to anon, authenticated
using (visibility = 'public' or id = (select auth.uid()));

create policy "Users insert own profile"
on public.profiles for insert
to authenticated
with check (id = (select auth.uid()));

create policy "Users update own profile"
on public.profiles for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy "Users delete own profile"
on public.profiles for delete
to authenticated
using (id = (select auth.uid()));

create policy "Public tanks are readable"
on public.tanks for select
to anon, authenticated
using (
  owner_id = (select auth.uid())
  or exists (
    select 1 from public.profiles
    where profiles.id = tanks.owner_id
      and profiles.visibility = 'public'
  )
);

create policy "Users manage own tanks"
on public.tanks for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Users read own logs"
on public.logs for select
to authenticated
using (owner_id = (select auth.uid()));

create policy "Users manage own logs"
on public.logs for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Public posts are readable"
on public.posts for select
to anon, authenticated
using (true);

create policy "Users manage own posts"
on public.posts for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Public media records are readable"
on public.media for select
to anon, authenticated
using (true);

create policy "Users manage own media records"
on public.media for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Public comments are readable"
on public.comments for select
to anon, authenticated
using (true);

create policy "Users create own comments"
on public.comments for insert
to authenticated
with check (author_id = (select auth.uid()));

create policy "Users update own comments"
on public.comments for update
to authenticated
using (author_id = (select auth.uid()))
with check (author_id = (select auth.uid()));

create policy "Users delete own comments"
on public.comments for delete
to authenticated
using (author_id = (select auth.uid()));

create policy "Public likes are readable"
on public.post_likes for select
to anon, authenticated
using (true);

create policy "Users manage own likes"
on public.post_likes for all
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "Users manage own reminders"
on public.reminders for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Users read own ai results"
on public.ai_results for select
to authenticated
using (owner_id = (select auth.uid()));

create policy "Users manage own ai results"
on public.ai_results for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

-- Storage bucket name: aquanote-media
-- Suggested object path: <owner_id>/<post_id>/<filename>
-- Add matching storage.objects policies after creating the bucket in Supabase.
