-- Remove the discontinued glance display mode from existing AquaNote projects.
-- Existing glance selections are migrated back to the basic display mode.
-- The posting-focused display mode continues to use the internal `live` value.

update public.profiles
set ui_mode = 'standard'
where ui_mode = 'glance';

alter table public.profiles
drop constraint if exists profiles_ui_mode_check;

alter table public.profiles
add constraint profiles_ui_mode_check
check (ui_mode in ('standard', 'simple', 'adult', 'live'));
