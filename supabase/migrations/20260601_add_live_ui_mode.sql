-- Allow the live display mode on existing AquaNote Supabase projects.
-- Run this once in the Supabase SQL Editor before syncing profiles that use live mode.

alter table public.profiles
drop constraint if exists profiles_ui_mode_check;

alter table public.profiles
add constraint profiles_ui_mode_check
check (ui_mode in ('standard', 'simple', 'glance', 'adult', 'live'));
