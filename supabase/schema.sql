-- AquaNote Supabase schema draft.
-- Run this after creating a Supabase project. It assumes Supabase Auth owns auth.users.

create extension if not exists pgcrypto;

do $$
begin
  create type profile_visibility as enum ('public', 'friends', 'private');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type account_plan as enum ('free', 'plus', 'pro');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type media_kind as enum ('image', 'video');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type reminder_schedule as enum ('daily', 'weekly', 'interval');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text not null unique check (handle ~ '^[a-z0-9_]{3,24}$'),
  display_name text not null,
  email text,
  visibility profile_visibility not null default 'public',
  plan account_plan not null default 'free',
  ui_mode text not null default 'standard' check (ui_mode in ('standard', 'simple', 'glance', 'adult')),
  notification_channel text not null default 'browser' check (notification_channel in ('browser', 'push', 'email', 'none')),
  browser_notifications_enabled boolean not null default true,
  email_notifications_enabled boolean not null default false,
  quiet_hours_start time not null default '22:00',
  quiet_hours_end time not null default '07:00',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tanks (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  local_id text not null,
  name text not null,
  kind text not null,
  size_label text,
  volume_label text,
  residents text,
  tags text[] not null default '{}',
  featured_post_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

create table if not exists public.logs (
  id uuid primary key default gen_random_uuid(),
  tank_id uuid not null references public.tanks(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  local_id text not null,
  log_type text not null,
  temp_c numeric(4, 1),
  ph numeric(3, 1),
  note text,
  recorded_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (owner_id, tank_id, local_id)
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  tank_id uuid references public.tanks(id) on delete set null,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  local_id text not null,
  title text not null,
  tag text not null,
  body text not null,
  album_position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'tanks_featured_post_fk'
      and conrelid = 'public.tanks'::regclass
  ) then
    alter table public.tanks
      add constraint tanks_featured_post_fk
      foreign key (featured_post_id) references public.posts(id) on delete set null;
  end if;
end $$;

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  kind media_kind not null,
  storage_path text not null,
  thumbnail_path text,
  duration_seconds integer,
  width integer,
  height integer,
  created_at timestamptz not null default now(),
  unique (post_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  local_id text not null,
  body text not null check (char_length(body) <= 240),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (author_id, post_id, local_id)
);

create table if not exists public.post_likes (
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create table if not exists public.reminders (
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

create table if not exists public.notification_deliveries (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  task_key text not null,
  label text not null,
  channel text not null check (channel in ('push', 'email')),
  scheduled_for timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed', 'skipped', 'canceled')),
  attempt_count integer not null default 0,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, task_key, scheduled_for)
);

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  endpoint text not null,
  p256dh text not null,
  auth text not null,
  user_agent text,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, endpoint)
);

create table if not exists public.ai_results (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  tank_id uuid references public.tanks(id) on delete cascade,
  post_id uuid references public.posts(id) on delete set null,
  local_id text not null,
  status text not null,
  level text not null default '',
  summary text not null,
  items text[] not null default '{}',
  checked_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

create table if not exists public.ai_evaluations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  local_id text not null,
  target text not null,
  source text not null,
  model text,
  prompt_version text,
  status text not null,
  fallback_status text,
  summary text not null default '',
  fallback_summary text not null default '',
  difference text not null default '',
  retake_tips text[] not null default '{}',
  photo_condition text not null default 'unspecified' check (photo_condition in ('unspecified', 'normal', 'dark', 'small_fish', 'algae', 'reflection')),
  review_label text not null default 'unreviewed' check (review_label in ('unreviewed', 'good', 'needs_fix', 'watch')),
  note text not null default '',
  evaluated_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

create table if not exists public.ai_prompt_notes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  local_id text not null,
  prompt_version text,
  note text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

create table if not exists public.pwa_device_tests (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  local_id text not null,
  device text not null default '未記録',
  browser text not null default '未記録',
  test_scope text not null default 'install' check (test_scope in ('install', 'notification', 'offline', 'ui_modes', 'custom_images', 'login')),
  status text not null default 'watch' check (status in ('passed', 'watch', 'failed')),
  note text not null default '',
  tested_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'pwa_device_tests_test_scope_check'
      and conrelid = 'public.pwa_device_tests'::regclass
  ) then
    alter table public.pwa_device_tests
      drop constraint pwa_device_tests_test_scope_check;
  end if;

  alter table public.pwa_device_tests
    add constraint pwa_device_tests_test_scope_check
    check (test_scope in ('install', 'notification', 'offline', 'ui_modes', 'custom_images', 'login'));
end $$;

create table if not exists public.pwa_release_decisions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft', 'ready', 'hold')),
  review_status text not null default 'not_started' check (review_status in ('not_started', 'running', 'done')),
  result_status text not null default 'unchecked' check (result_status in ('unchecked', 'confirmed', 'issues')),
  reviewer text not null default '',
  production_url text not null default '',
  note text not null default '',
  decided_at timestamptz,
  review_exported_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (owner_id)
);

create or replace view public.post_stats
with (security_invoker = true) as
select
  posts.id as post_id,
  count(distinct post_likes.user_id) as likes_count,
  count(distinct comments.id) as comments_count,
  count(distinct post_likes.user_id) + count(distinct comments.id) * 3 as ranking_score
from public.posts
left join public.post_likes on post_likes.post_id = posts.id
left join public.comments on comments.post_id = posts.id
group by posts.id;

create index if not exists tanks_owner_idx on public.tanks(owner_id);
create index if not exists logs_tank_recorded_idx on public.logs(tank_id, recorded_at desc);
create index if not exists posts_tank_created_idx on public.posts(tank_id, created_at desc);
create index if not exists posts_owner_idx on public.posts(owner_id);
create index if not exists media_post_idx on public.media(post_id);
create index if not exists comments_post_created_idx on public.comments(post_id, created_at desc);
create index if not exists reminders_owner_idx on public.reminders(owner_id);
create index if not exists notification_deliveries_owner_scheduled_idx on public.notification_deliveries(owner_id, scheduled_for)
where status = 'pending';
create index if not exists push_subscriptions_owner_enabled_idx on public.push_subscriptions(owner_id)
where enabled = true;
create index if not exists ai_results_tank_checked_idx on public.ai_results(tank_id, checked_at desc);
create index if not exists ai_evaluations_owner_evaluated_idx on public.ai_evaluations(owner_id, evaluated_at desc);
create index if not exists ai_prompt_notes_owner_created_idx on public.ai_prompt_notes(owner_id, created_at desc);
create index if not exists pwa_device_tests_owner_tested_idx on public.pwa_device_tests(owner_id, tested_at desc);
create index if not exists pwa_release_decisions_owner_updated_idx on public.pwa_release_decisions(owner_id, updated_at desc);

alter table public.profiles enable row level security;
alter table public.tanks enable row level security;
alter table public.logs enable row level security;
alter table public.posts enable row level security;
alter table public.media enable row level security;
alter table public.comments enable row level security;
alter table public.post_likes enable row level security;
alter table public.reminders enable row level security;
alter table public.notification_deliveries enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.ai_results enable row level security;
alter table public.ai_evaluations enable row level security;
alter table public.ai_prompt_notes enable row level security;
alter table public.pwa_device_tests enable row level security;
alter table public.pwa_release_decisions enable row level security;

drop policy if exists "Public profiles are readable" on public.profiles;
drop policy if exists "Users insert own profile" on public.profiles;
drop policy if exists "Users update own profile" on public.profiles;
drop policy if exists "Users delete own profile" on public.profiles;
drop policy if exists "Public tanks are readable" on public.tanks;
drop policy if exists "Users manage own tanks" on public.tanks;
drop policy if exists "Users read own logs" on public.logs;
drop policy if exists "Users manage own logs" on public.logs;
drop policy if exists "Public posts are readable" on public.posts;
drop policy if exists "Users manage own posts" on public.posts;
drop policy if exists "Public media records are readable" on public.media;
drop policy if exists "Users manage own media records" on public.media;
drop policy if exists "Public comments are readable" on public.comments;
drop policy if exists "Users create own comments" on public.comments;
drop policy if exists "Users update own comments" on public.comments;
drop policy if exists "Users delete own comments" on public.comments;
drop policy if exists "Public likes are readable" on public.post_likes;
drop policy if exists "Users manage own likes" on public.post_likes;
drop policy if exists "Users manage own reminders" on public.reminders;
drop policy if exists "Users manage own notification deliveries" on public.notification_deliveries;
drop policy if exists "Users manage own push subscriptions" on public.push_subscriptions;
drop policy if exists "Users read own ai results" on public.ai_results;
drop policy if exists "Users manage own ai results" on public.ai_results;
drop policy if exists "Users manage own ai evaluations" on public.ai_evaluations;
drop policy if exists "Users manage own ai prompt notes" on public.ai_prompt_notes;
drop policy if exists "Users manage own pwa device tests" on public.pwa_device_tests;
drop policy if exists "Users manage own pwa release decisions" on public.pwa_release_decisions;

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

create policy "Users manage own notification deliveries"
on public.notification_deliveries for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Users manage own push subscriptions"
on public.push_subscriptions for all
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

create policy "Users manage own ai evaluations"
on public.ai_evaluations for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Users manage own ai prompt notes"
on public.ai_prompt_notes for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Users manage own pwa device tests"
on public.pwa_device_tests for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Users manage own pwa release decisions"
on public.pwa_release_decisions for all
to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'aquanote-media',
  'aquanote-media',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime', 'video/webm']
)
on conflict (id) do nothing;

drop policy if exists "Users read own aquanote media objects" on storage.objects;
drop policy if exists "Users insert own aquanote media objects" on storage.objects;
drop policy if exists "Users update own aquanote media objects" on storage.objects;
drop policy if exists "Users delete own aquanote media objects" on storage.objects;

create policy "Users read own aquanote media objects"
on storage.objects for select
to authenticated
using (
  bucket_id = 'aquanote-media'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Users insert own aquanote media objects"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'aquanote-media'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Users update own aquanote media objects"
on storage.objects for update
to authenticated
using (
  bucket_id = 'aquanote-media'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'aquanote-media'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

create policy "Users delete own aquanote media objects"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'aquanote-media'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);
