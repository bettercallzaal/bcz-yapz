# BCZ YapZ -> Bonfires.ai - integration recap

> Repo egress points + recommended API path to auto-ingest every new BCZ YapZ episode into your Bonfire knowledge graph.

---

## Part 1 - what the bcz-yapz repo exposes

### Source-of-truth data

- **Transcripts**: `content/transcripts/<date>-<slug>.md`, one per episode. Each starts with a YAML frontmatter that validates against `EpisodeFrontmatterSchema` (see `src/lib/types.ts`). Body has inline `[HH:MM:SS]` timestamps for click-to-seek + alignment.
- **Frontmatter fields** (all available to any integration):
  - identity: `title`, `show`, `episode`, `guest`, `guest_org`, `guest_alias`, `host`, `date`, `published`, `language`, `status`
  - links: `youtube_url`, `youtube_video_id`, `audio_url`, `audio_bytes`, `audio_duration_sec`, `audio_mime`, `thumbnail_override`
  - graph-ready: `topics[]`, `keywords[]`, `entities.{orgs, people, projects}[]`, `summary`, `action_items[]`, `guest_links[]`
- **Bonfire ingest output**: `scripts/generate-bonfire-ingest.py` reads each transcript and emits `content/bonfire-ingest/<slug>.md`. Each output starts with `INGEST BATCH: BCZ YapZ Episode <N>...` then EPISODE NODE, PERSON NODE, ORG NODE, QUOTE NODE * 7 with verbatim text + `youtube.com/watch?v=ID&t=SEC` deeplinks + confidence scores. The format matches doc 569's recommended schema (Speaker as node, EpisodeSegment with source_url, Topic relations).

### Web egress points (live on bczyapz.com)

| URL | Content | Update trigger |
|---|---|---|
| `/feed.xml` | Apple/Spotify-compatible podcast RSS (filters by `audio_url`) | Vercel rebuild on push |
| `/search-index.json` | Full transcript chunks indexed by FlexSearch (id, slug, ep, guest, topics, startSec, text) | Vercel rebuild |
| `/sitemap.xml` | Every ep + topic + page URL | Vercel rebuild |
| `/ep/<slug>` | Per-ep page with embedded JSON-LD PodcastEpisode (schema.org) | Vercel rebuild |
| `/ep/<slug>/opengraph-image` | Per-ep dynamic OG art (1200x630) | On-demand |
| `/podcast-cover.png` | 3000x3000 Apple/Spotify cover | On-demand |

### Automation already wired

- `npm run new-ep` - scaffold transcript
- `npm run resolve-guest` - Farcaster + X handle lookup
- `npm run rip:audio` - YouTube -> MP3 -> R2 (when env vars set)
- `npm run ingest:bonfire` - regenerate `content/bonfire-ingest/*.md`
- `npm run draft-socials` - Farcaster + X compose drafts
- `.github/workflows/draft-socials.yml` - on every push touching transcripts, runs draft-socials and uploads artifact

**When a new episode ships**: a commit lands on `main` touching `content/transcripts/<slug>.md` with `youtube_url` filled. That's the universal trigger any integration can hang off.

---

## Part 2 - Bonfire integration: 3 options + recommendation

### Context (from ZAO OS research)

Bonfires.ai (Joshua.eth, founder) - semantic knowledge graph platform. Telegram-native agent + REST API + MCP server. ETHBoulder ran 88K nodes / 7 days. Per ZAO research doc 569, the recommended YapZ pipeline progresses through 3 stages: per-node streaming -> batch kengrams -> continuous agents.sync. Schema: `Episode`, `Speaker`, `EpisodeSegment`, `Topic` nodes with `source_url = youtube.com/watch?v=<id>&t=<sec>` first-class on every chunk.

### Three options

| # | Approach | How | Pros | Cons |
|---|---|---|---|---|
| A | **GitHub Action POSTs to Bonfire REST API** | On push touching `content/transcripts/*.md`, action reads frontmatter + `content/bonfire-ingest/<slug>.md`, POSTs to `https://api.bonfires.ai/v1/kengrams/batch` (or equivalent) with auth header | Push-based, atomic, idempotent, runs in CI, no external infra | Requires Bonfire API key + endpoint - confirm with Joshua.eth |
| B | **Bonfire MCP server pulls from `/feed.xml` + `/search-index.json`** | Configure Bonfire's MCP integration to poll the static endpoints; map RSS items to Episode nodes, search-index chunks to EpisodeSegments | No CI work, no Bonfire creds in repo | Polling delay; doesn't carry full frontmatter (entities, action_items); RSS only has audio-published eps |
| C | **GitHub Action sends INGEST BATCH via Telegram bot** | Action runs `ingest:bonfire`, then uses Telegram Bot API to DM the rendered `content/bonfire-ingest/<slug>.md` to `@Bonfires` (same channel humans use today) | Reuses existing INGEST BATCH format + Telegram extraction pipeline that already works | Telegram-as-API is fragile; rate-limited; harder to verify ingest success |

### Recommendation: **Option A**

POST `content/bonfire-ingest/<slug>.md` to Bonfire's REST API directly. The output format already maps to doc 569's schema (Episode, Person, Org, Quote nodes with source_url + confidence). The action skeleton:

```yaml
# .github/workflows/bonfire-ingest.yml
on:
  push:
    branches: [main]
    paths: ['content/transcripts/**.md']
jobs:
  ingest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: python3 scripts/generate-bonfire-ingest.py
      - run: |
          for f in content/bonfire-ingest/*.md; do
            slug="$(basename "$f" .md)"
            curl -X POST "$BONFIRE_API_URL/v1/kengrams/batch" \
              -H "Authorization: Bearer $BONFIRE_API_KEY" \
              -H "Content-Type: text/markdown" \
              -H "X-Idempotency-Key: bcz-yapz-$slug" \
              --data-binary @"$f"
          done
        env:
          BONFIRE_API_URL: ${{ secrets.BONFIRE_API_URL }}
          BONFIRE_API_KEY: ${{ secrets.BONFIRE_API_KEY }}
```

**To unlock**: ask Joshua.eth for (1) the kengram batch endpoint URL, (2) an API key scoped to your tenant, (3) confirmation that the existing INGEST BATCH markdown format is the accepted payload (or a JSON variant). The idempotency key uses the episode slug so re-runs upsert instead of duplicating.

**Fallback if API isn't ready**: keep Option C (Telegram bot) wired in parallel - the format is identical so you can swap transports without touching the generator.

---

## Action items

1. **DM Joshua.eth**: API endpoint, auth, payload format. Confirm idempotency semantics.
2. **Create GH secrets**: `BONFIRE_API_URL`, `BONFIRE_API_KEY` in the bcz-yapz repo.
3. **Add `.github/workflows/bonfire-ingest.yml`** using the skeleton above.
4. **Smoke test**: push a no-op change to ep 20's transcript, verify the kengram appears in graph.bonfires.ai.
5. **Backfill**: trigger the workflow with `workflow_dispatch` to ingest all 20 existing episodes one-shot.
