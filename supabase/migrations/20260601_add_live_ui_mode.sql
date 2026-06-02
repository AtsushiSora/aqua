-- Allow the current AquaNote display modes on existing Supabase projects.
-- The posting-focused display mode is stored as `live` for backwards compatibility.

alter table public.profiles
drop constraint if exists profiles_ui_mode_check;

alter table public.profiles
add constraint profiles_ui_mode_check
check (ui_mode in ('standard', 'simple', 'adult', 'live'));
