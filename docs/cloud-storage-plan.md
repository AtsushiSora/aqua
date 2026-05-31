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
| `profiles` | Public user profile, visibility, plan, UI mode, and notification preferences |
| `tanks` | Tank/pond profile, tags, and featured post |
| `logs` | Water temperature, pH, maintenance type, memo, and recorded date |
| `posts` | Community post metadata and tank relationship |
| `post_likes` | One like per user per post |
| `comments` | Post comments |
| `media` | Image/video object paths and generated thumbnails |
| `reminders` | Feeding/check reminders with daily, weekly, and interval schedules |
| `notification_deliveries` | Pending Push/email delivery jobs and retry state |
| `push_subscriptions` | Browser Push endpoints and encryption keys |
| `ai_results` | Saved analysis summaries for tanks and posts |
| `ai_evaluations` | AI Gateway/fallback comparison logs and review notes |
| `ai_prompt_notes` | Prompt-improvement notes for AI model tuning |
| `pwa_device_tests` | Production PWA device rehearsal results |
| `pwa_release_decisions` | Final PWA release decision memo |

## Migration order

1. Create Supabase project and run `supabase/schema.sql`.
2. Create a private `aquanote-media` storage bucket.
3. Add environment config for the project URL and publishable key.
4. Connect Supabase Auth and sync `profiles`. Done in the prototype.
5. Sync local tanks to the `tanks` table. Done in the prototype.
6. Sync local logs to the `logs` table. Done in the prototype.
7. Sync reminders to the `reminders` table. Done in the prototype.
8. Sync posts and comments to the `posts` and `comments` tables. Done in the prototype.
9. Sync likes and ranking stats through `post_likes` and `post_stats`. Done in the prototype.
10. Move image/video uploads to Storage. Done in the prototype.
11. Sync saved AI analysis results to `ai_results`. Done in the prototype.
12. Sync notification preferences through `profiles`. Done in the prototype.
13. Sync next Push/email notification deliveries to `notification_deliveries`. Done in the prototype.
14. Sync browser Push subscriptions to `push_subscriptions`. Done in the prototype.
15. Keep JSON export/import as a fallback during beta.

Existing Supabase projects should add `profiles.ui_mode` with `standard`, `simple`, `glance`, and `adult` values before enabling profile sync for UI mode preferences.

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
| `state.reminders` | `reminders`, `notification_deliveries` |

## Current implementation slice

PWA Push subscription scaffold:

- Save Push API subscription endpoints in `push_subscriptions`. Done in the prototype.
- Add service worker `push` and `notificationclick` handlers. Done in the prototype.
- Send saved subscriptions directly from the delivery worker with VAPID-signed Web Push. Done in the prototype.
- Disable expired Push subscriptions after `404` / `410` responses. Done in the prototype.
- Show recent Push/email delivery history in the account view. Done in the prototype.
- Filter delivery history by status and retry failed deliveries. Done in the prototype.
- Expand delivery history rows with error context and operational notes. Done in the prototype.
- Surface a production notification verification checklist in the account view. Done in the prototype.
- Surface a production notification rehearsal flow in the account view. Done in the prototype.
- Surface production notification environment variables and dry-run release notes in the account view. Done in the prototype.
- Store production notification environment, dry-run, and send-result confirmation notes locally. Done in the prototype.
- Apply delivery log sent/failed/skipped results to the production notification confirmation memo. Done in the prototype.
- Store the selected UI mode on the local profile and Supabase profile payload. Done in the prototype.
- Add PWA install assets, app shortcuts, and offline fallback page. Done in the prototype.
- Surface a PWA release checklist in the account view. Done in the prototype.
- Surface a production PWA rehearsal flow in the account view. Done in the prototype.
- Store production PWA device test notes locally and export them as JSON. Done in the prototype.
- Sync production PWA device test notes to `pwa_device_tests`. Done in the prototype.
- Summarize production PWA device test coverage in the account view. Done in the prototype.
- Capture a local final PWA release decision memo. Done in the prototype.
- Sync the final PWA release decision memo to `pwa_release_decisions`. Done in the prototype.
- Summarize final PWA production review evidence in the account view. Done in the prototype.
- Export final PWA production review evidence as JSON. Done in the prototype.
- Show next actions or completion state for the PWA production review. Done in the prototype.
- Document the production PWA review operation flow in the app and README. Done in the prototype.
- Store the reviewed production URL in the final PWA release decision memo. Done in the prototype.
- Store the production review JSON export timestamp in the final PWA release decision memo. Done in the prototype.
- Show final QA status for the PWA release review. Done in the prototype.
- Store the real-device review execution status in the final PWA release decision memo. Done in the prototype.
- Store the PWA production review result confirmation status in the final release memo. Done in the prototype.
- Store user-selected local images for app background and button surfaces. Done in the prototype.
- Strengthen mode-specific home copy and custom button image surfaces. Done in the prototype.
- Add custom-image appearance checks to required PWA device review scope. Done in the prototype.
- Surface UI mode and custom-image QA guidance in the PWA device review. Done in the prototype.
- Fine-tune mobile spacing, copy length, and button sizing across UI modes. Done in the prototype.
- Include UI mode and custom-image evidence in final PWA review output. Done in the prototype.
- Add per-scope note guidance to PWA device QA recording. Done in the prototype.
- Add per-scope note templates to PWA device QA recording. Done in the prototype.
- Extract watch/failed PWA device QA items into release action evidence. Done in the prototype.
- Mark PWA device QA action items resolved when a later passing result exists. Done in the prototype.
- Add a Netlify Function entrypoint for AI image/log analysis. Done in the prototype.
- Show AI Gateway/model verification status in the AI view. Done in the prototype.
- Send real post photos to the AI Gateway as high-detail image input and harden JSON parsing. Done in the prototype.
- Classify the latest unreviewed Gateway photo directly from the validation summary. Done in the prototype.
- Tag the latest unreviewed Gateway photo with a photo condition from the validation summary. Done in the prototype.
- Show per-condition real-photo sample progress against a two-sample target. Done in the prototype.
- Convert the latest needs-fix Gateway photo review into a prompt improvement note. Done in the prototype.
- Tune the AI prompt to v3 with visible evidence, confidence, retake tips, and non-diagnostic care guidance. Done in the prototype.
- Keep local comparison logs and review notes for AI Gateway versus fallback results. Done in the prototype.
- Sync AI comparison logs and review notes to `ai_evaluations`. Done in the prototype.
- Filter AI evaluation logs and keep prompt-improvement notes in the AI view. Done in the prototype.
- Sync prompt-improvement notes to `ai_prompt_notes`. Done in the prototype.
- Classify AI evaluation rows as good, needs-fix, or watch. Done in the prototype.
- Aggregate AI evaluation labels and surface prompt-improvement candidates. Done in the prototype.
- Export filtered AI evaluation reviews as CSV/JSON. Done in the prototype.
- Filter AI review exports by date range and review label. Done in the prototype.
- Summarize real-photo Gateway validation progress in the AI view. Done in the prototype.
- Store prompt v3 retake tips in AI evaluation logs and exports. Done in the prototype.
- Tag prompt v3 evaluation samples by photo condition. Done in the prototype.
- Summarize needs-fix rates by prompt v3 photo condition. Done in the prototype.
- Fill prompt-improvement notes from weak-condition suggestions. Done in the prototype.
- Save weak-condition prompt improvements directly to prompt-note history. Done in the prototype.
- Draft prompt v4 candidates from reviewed v3 notes. Done in the prototype.
- Export prompt v4 draft items with AI review CSV/JSON. Done in the prototype.
- Apply prompt v4 guidance to the AI analysis function. Done in the prototype.
- Summarize prompt v4 real-photo validation against prompt v3. Done in the prototype.
- Export prompt generation and v4 validation status with AI review CSV/JSON. Done in the prototype.
- Show a prompt v4 production validation checklist in the AI view. Done in the prototype.
- Export prompt v4 production checklist status with AI review JSON. Done in the prototype.
- Use saved needs-fix notes to strengthen the next prompt draft. Done in the prototype.
- Review the prompt draft impact from saved needs-fix notes. Done in the prototype.
- Re-test Gateway photo output after the prompt draft impact review. Done in the prototype.
- Summarize condition-level improvement after Gateway photo re-tests. Done in the prototype.
- Turn re-test conditions that still need adjustment back into prompt notes. Done in the prototype.
- Strengthen the prompt draft from re-test adjustment notes. Done in the prototype.
- Re-review Gateway photos after the strengthened prompt draft. Done in the prototype.
- Capture the final go/no-go decision from re-reviewed Gateway photos. Done in the prototype.
- Strengthen JSON evidence for the Gateway production decision. Done in the prototype.
- Strengthen the in-app summary for the Gateway production decision. Done in the prototype.
- Add the release path after the Gateway production decision is ready. Done in the prototype.
- Connect the Gateway production decision to final PWA QA evidence. Done in the prototype.
- Integrate Gateway production evidence into the PWA review JSON. Done in the prototype.
- Show the Gateway production decision checklist in the release review view. Done in the prototype.
- Improve incomplete-action guidance for Gateway production review. Done in the prototype.
- Keep the optional `WEB_PUSH_ENDPOINT` provider path for hosted push gateways.
- Keep in-app reminder checks as a fallback while notification delivery is tested.

## Next implementation slice

Production release evidence:

- Improve condition-level incomplete-action guidance for Gateway production review.
- Review needs-fix examples and turn them into prompt improvement notes.
- Run PWA installation, notification, offline, UI mode, and custom-image checks on the production URL.
- Review synced `pwa_device_tests` rows before production launch.
- Capture the final production release decision after the required PWA checks pass.
- Review synced `pwa_release_decisions` before production launch.
- Export the final PWA review evidence for release notes.
- Finish the production review handoff flow in the account view.
- Document the exact production review operation flow for testers.
- Run the documented production review on the live URL.
- Confirm the reviewed production URL is included in exported release evidence.
- Perform final QA on the PWA release review flow.
- Execute the PWA production review on real devices.
- Confirm the real-device review status is marked done before production launch.
- Confirm the PWA production review result status is marked confirmed before production launch.
- Finish the release decision after live-device QA on the production URL.
- Keep JSON export/import as a recovery path while the sync model is being tested.
