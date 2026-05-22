# AquaNote cloud storage plan

## Decision

Use Supabase first.

Reason:

- AquaNote already has relational data: profiles, tanks, logs, posts, comments, reminders, and media.
- Postgres keeps the production model close to the current local JSON state.
- Supabase Auth, Postgres Row Level Security, and Storage cover the next milestone without introducing a separate backend server.
- The static prototype can be migrated incrementally by replacing `localStorage` reads and writes with repository-style data functions later.

## Alternatives

| Option | Fit | Tradeoff |
| --- | --- | --- |
| Supabase | Best fit for the next version | Requires careful RLS policies and migration scripts |
| Firebase | Good for fast realtime prototypes | Relational queries and reporting become more awkward |
| Next.js + PostgreSQL | Strong long-term control | Larger rewrite before the product value is proven |

## Production tables

| Table | Purpose |
| --- | --- |
| `profiles` | Public user profile, visibility, and plan |
| `tanks` | Tank/pond profile, tags, and featured post |
| `logs` | Water temperature, pH, maintenance type, memo, and recorded date |
| `posts` | Community post metadata and tank relationship |
| `post_likes` | One like per user per post |
| `comments` | Post comments |
| `media` | Image/video object paths and generated thumbnails |
| `reminders` | Feeding/check reminders with daily, weekly, and interval schedules |
| `ai_results` | Saved analysis summaries for tanks and posts |

## Migration order

1. Create Supabase project and run `supabase/schema.sql`.
2. Create a private `aquanote-media` storage bucket.
3. Add environment config for the project URL and publishable key.
4. Connect Supabase Auth and sync `profiles`. Done in the prototype.
5. Sync local tanks to the `tanks` table. Done in the prototype.
6. Sync local logs to the `logs` table. Done in the prototype.
7. Move reminders.
8. Move posts, comments, likes, and media uploads.
9. Keep JSON export/import as a fallback during beta.

## Auth and permission rules

- Anonymous visitors can read public community posts and public profiles.
- Signed-in users can create and edit only their own tanks, logs, reminders, posts, comments, likes, media records, and AI results.
- Storage objects should be written under a user-owned prefix such as `<user_id>/<post_id>/<file>`.
- App-side checks are only UX; database RLS is the source of truth.

## Local state mapping

| Local field | Cloud destination |
| --- | --- |
| `state.account` | `profiles` |
| `state.tanks[]` | `tanks` |
| `tank.logs[]` | `logs` |
| `state.posts[]` | `posts` |
| `post.comments[]` | `comments` |
| `post.imageDataUrl` | upload to Storage, then `media.storage_path` |
| `post.videoDataUrl` | upload to Storage, then `media.storage_path` |
| `post.videoThumbnailDataUrl` | upload to Storage, then `media.thumbnail_path` |
| `state.reminders` | `reminders` |

## Next implementation slice

Sync local reminders to the `reminders` table after log sync:

- Upsert each task by `owner_id` and `task_key`.
- Store `enabled`, `schedule`, `weekdays`, `interval_days`, `start_date`, `notify_time`, and `last_notified_on`.
- Read back reminders on sign-in and merge them into local state.
- Keep JSON export/import as a recovery path while the sync model is being tested.
