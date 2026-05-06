# BCZ YapZ

Long-form interview show hosted by Zaal. Each episode is a conversation with a builder, founder, or organizer working on something worth understanding - web3 music distribution, decentralized governance, AI tooling, coordination experiments, Maine community infrastructure, and more.

Episodes drop on YouTube. Transcripts are archived in the open so the catalog stays searchable.

Live at https://bczyapz.com.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind v4
- TypeScript strict
- Vitest for unit tests
- gray-matter + zod for transcript frontmatter

No database. No auth. No external services beyond YouTube. The episode list is generated at build time from markdown files in `content/`.

## Layout

| Path | What |
|------|------|
| `src/app/page.tsx` | Episode list page (server component, revalidates hourly) |
| `src/app/_components/` | HeroSection, EpisodeList, EpisodeListCard, EpisodeGridCard, FollowFooter |
| `src/lib/episodes.ts` | Reads `content/transcripts/*.md`, parses frontmatter via zod schema |
| `src/lib/chapters.ts` | Parses YouTube chapter list out of `content/youtube-descriptions/<slug>.md` |
| `src/lib/config.ts` | Show metadata, host links, follow URLs |
| `src/lib/types.ts` | `EpisodeFrontmatterSchema` + `Episode` interface |
| `content/transcripts/` | Source of truth: one `.md` per episode with full transcript + YAML frontmatter |
| `content/youtube-descriptions/` | Paste-ready YouTube descriptions with chapter timestamps |
| `content/bonfire-ingest/` | Bonfire knowledge graph ingest files generated from transcripts |
| `content/templates/` | YouTube description template, tags, link map |
| `scripts/generate-bonfire-ingest.py` | Regenerate ingest files from transcripts |

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run typecheck
npm run test
```

## Add an episode

1. Drop the transcript at `content/transcripts/YYYY-MM-DD-guest-slug.md`
2. Frontmatter must validate against `EpisodeFrontmatterSchema` (see `src/lib/types.ts`)
3. After publishing on YouTube, fill `youtube_url` and `youtube_video_id`
4. Generate a YouTube description with the global Claude skill `/bcz-yapz-description <slug>` - it writes to `content/youtube-descriptions/`
5. Regenerate Bonfire ingest: `npm run ingest:bonfire`

## Voice

Zaal hosts. Music-first, web3-curious, coordination-flavored. Episodes are 25-30 min and drop Tuesdays.

## History

BCZ YapZ began life inside the ZAO OS monorepo (`github.com/bettercallzaal/zaoos`) as a content archive page at `/bcz-yapz`. It graduated to its own repo on 2026-05-06 once the catalog was big enough and stable enough to stand alone. Research docs about the show stay in the ZAO OS repo as institutional memory:

- `research/dev-workflows/477-youtube-seo-bcz-yapz/`
- `research/dev-workflows/490-bcz-yapz-archive-page/`
- `research/community/533-poidh-clipup-bounty-bcz-yapz-hannah/`
- `research/identity/569-yapz-bonfire-ingestion-strategy/`

## License

All transcripts and original content: copyright Zaal Panthaki. Code: MIT.
