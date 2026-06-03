-- AquaNote release schema updates.
-- Run this on existing Supabase projects before production QA.

alter table public.tanks
add column if not exists dimensions jsonb not null default '{}'::jsonb;

alter table public.reminders
add column if not exists tank_id uuid references public.tanks(id) on delete cascade;

update public.reminders reminder
set tank_id = (
  select id
  from public.tanks
  where owner_id = reminder.owner_id
  order by created_at asc
  limit 1
)
where reminder.tank_id is null;

alter table public.reminders
drop constraint if exists reminders_owner_id_task_key_key;

alter table public.reminders
drop constraint if exists reminders_owner_id_tank_id_task_key_key;

alter table public.reminders
add constraint reminders_owner_id_tank_id_task_key_key unique (owner_id, tank_id, task_key);

create index if not exists reminders_tank_idx on public.reminders(tank_id);

create table if not exists public.pwa_device_tests (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  local_id text not null,
  device text not null default '未記録',
  browser text not null default '未記録',
  test_scope text not null default 'install',
  status text not null default 'watch',
  note text not null default '',
  tested_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, local_id)
);

do $$
begin
  alter table public.pwa_device_tests
    add column if not exists test_scope text not null default 'install';
  alter table public.pwa_device_tests
    add column if not exists status text not null default 'watch';
  alter table public.pwa_device_tests
    add column if not exists note text not null default '';
  alter table public.pwa_device_tests
    add column if not exists tested_at timestamptz not null default now();
  alter table public.pwa_device_tests
    add column if not exists updated_at timestamptz not null default now();

  if exists (
    select 1 from pg_constraint
    where conname = 'pwa_device_tests_test_scope_check'
      and conrelid = 'public.pwa_device_tests'::regclass
  ) then
    alter table public.pwa_device_tests
      drop constraint pwa_device_tests_test_scope_check;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'pwa_device_tests_status_check'
      and conrelid = 'public.pwa_device_tests'::regclass
  ) then
    alter table public.pwa_device_tests
      drop constraint pwa_device_tests_status_check;
  end if;

  alter table public.pwa_device_tests
    add constraint pwa_device_tests_test_scope_check
    check (test_scope in ('install', 'notification', 'offline', 'ui_modes', 'custom_images', 'login'));
  alter table public.pwa_device_tests
    add constraint pwa_device_tests_status_check
    check (status in ('passed', 'watch', 'failed'));
end $$;

create table if not exists public.pwa_release_decisions (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'draft',
  review_status text not null default 'not_started',
  result_status text not null default 'unchecked',
  reviewer text not null default '',
  production_url text not null default '',
  note text not null default '',
  decided_at timestamptz,
  review_exported_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (owner_id)
);

do $$
begin
  alter table public.pwa_release_decisions
    add column if not exists review_status text not null default 'not_started';
  alter table public.pwa_release_decisions
    add column if not exists result_status text not null default 'unchecked';
  alter table public.pwa_release_decisions
    add column if not exists production_url text not null default '';
  alter table public.pwa_release_decisions
    add column if not exists review_exported_at timestamptz;
  alter table public.pwa_release_decisions
    add column if not exists updated_at timestamptz not null default now();

  if exists (
    select 1 from pg_constraint
    where conname = 'pwa_release_decisions_status_check'
      and conrelid = 'public.pwa_release_decisions'::regclass
  ) then
    alter table public.pwa_release_decisions
      drop constraint pwa_release_decisions_status_check;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'pwa_release_decisions_review_status_check'
      and conrelid = 'public.pwa_release_decisions'::regclass
  ) then
    alter table public.pwa_release_decisions
      drop constraint pwa_release_decisions_review_status_check;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'pwa_release_decisions_result_status_check'
      and conrelid = 'public.pwa_release_decisions'::regclass
  ) then
    alter table public.pwa_release_decisions
      drop constraint pwa_release_decisions_result_status_check;
  end if;

  alter table public.pwa_release_decisions
    add constraint pwa_release_decisions_status_check
    check (status in ('draft', 'ready', 'hold'));
  alter table public.pwa_release_decisions
    add constraint pwa_release_decisions_review_status_check
    check (review_status in ('not_started', 'running', 'done'));
  alter table public.pwa_release_decisions
    add constraint pwa_release_decisions_result_status_check
    check (result_status in ('unchecked', 'confirmed', 'issues'));
end $$;

create unique index if not exists pwa_device_tests_owner_local_idx on public.pwa_device_tests(owner_id, local_id);
create unique index if not exists pwa_release_decisions_owner_unique_idx on public.pwa_release_decisions(owner_id);
create index if not exists pwa_device_tests_owner_tested_idx on public.pwa_device_tests(owner_id, tested_at desc);
create index if not exists pwa_release_decisions_owner_updated_idx on public.pwa_release_decisions(owner_id, updated_at desc);

alter table public.pwa_device_tests enable row level security;
alter table public.pwa_release_decisions enable row level security;

drop policy if exists "Users manage own pwa device tests" on public.pwa_device_tests;
drop policy if exists "Users manage own pwa release decisions" on public.pwa_release_decisions;

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
