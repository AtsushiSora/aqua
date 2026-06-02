-- Add per-tank filter management metadata for existing AquaNote projects.
-- Run this once in the Supabase SQL Editor before relying on cloud sync for filter care.

alter table public.tanks
add column if not exists filter_profile jsonb not null default '{}'::jsonb;
