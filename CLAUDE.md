# CLAUDE.md - BCZ YapZ

## What this is

BCZ YapZ archive site. Long-form interviews hosted by Zaal. Episodes drop on YouTube; transcripts archived here.

Static content site. No DB, no auth, no API routes. Markdown in `content/` is the source of truth; everything else renders from it.

## Stack

Next 16 App Router, React 19, Tailwind v4, TypeScript strict, Vitest.

Deps: `gray-matter`, `zod`, `next`, `react`, `react-dom`. That's it.

## Conventions

- `"use client"` directive on any component using hooks/event handlers (`EpisodeList`, `EpisodeListCard`)
- Mobile-first. Tailwind responsive prefixes.
- Dark theme: navy `#0a1628` background, gold `#f5a623` accent. Match existing component style; do not introduce new palette colors.
- `@/` import alias maps to `./src/`
- Tailwind v4 only. No inline styles, no CSS modules.
- No emojis anywhere. No em dashes. Hyphens instead.
- TypeScript strict. No `any`. Use `unknown` for untrusted input + narrow.
- Frontmatter must validate against `EpisodeFrontmatterSchema`. Add new fields to the schema before relying on them.

## Adding an episode (the loop)

1. Scaffold the file: `npm run new-ep -- --slug guest-name --guest "Guest Name" --org "Org"` - creates `content/transcripts/<today>-<slug>.md` with valid frontmatter and auto-increments the episode number.
2. Resolve guest handles: `npm run resolve-guest -- "Guest Name"` (or `--handle`/`--x-handle` for direct lookup). Copy the printed `guest_links` YAML into the transcript file.
3. Paste the timestamped transcript into the `## Transcript` section.
4. Validate: `npm run typecheck && npm run test`
5. After publishing on YouTube, fill `youtube_url` + `youtube_video_id`.
6. Generate description via global Claude skill: `/bcz-yapz-description <slug>` - writes to `content/youtube-descriptions/<slug>.md`.
7. Rip MP3 + upload to Cloudflare R2: `npm run rip:audio -- --slug <slug>` (needs `AUDIO_HOST_*` env vars - see `scripts/PODCAST-SETUP.md`).
8. Generate social drafts: `npm run draft-socials -- --slug <slug>` - writes `content/socials/<slug>.md` with one-click compose URLs for Farcaster + X with the guests already @-tagged.
9. Regenerate Bonfire ingest: `npm run ingest:bonfire`.
10. Commit + push. Vercel autodeploys to bczyapz.com.

## Skill location

The `bcz-yapz-description` skill lives globally at `~/.claude/skills/bcz-yapz-description/SKILL.md`. It's pinned to this repo (`/Users/zaalpanthaki/Documents/bcz-yapz/`) but callable from any session. If you change content paths, update the skill too.

## Per-file commands

| Pattern | Test | Lint |
|---------|------|------|
| `src/lib/**/*.ts` | `npx vitest run src/lib/<name>` | `npx tsc --noEmit` |
| `src/app/**/*.tsx` | `npx vitest run` | `npx tsc --noEmit` |

## Don't

- Don't add a database. The whole point of graduating from ZAO OS was to be a static archive.
- Don't add auth. There's nothing to authenticate.
- Don't add API routes unless YouTube/Vimeo embedding genuinely needs server-side fetching - prefer client-side embeds.
- Don't break the frontmatter schema without updating `EpisodeFrontmatterSchema` and tests.
- Don't commit `.env`. There are no secrets in this project; if you find yourself wanting one, ask first.

## History

Graduated from `github.com/bettercallzaal/zaoos` (ZAO OS monorepo) on 2026-05-06. Per the monorepo-as-lab pattern, code was deleted from ZAO OS once moved here and a 301 redirect was set up.
