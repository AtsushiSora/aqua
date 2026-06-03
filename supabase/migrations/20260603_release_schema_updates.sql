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
