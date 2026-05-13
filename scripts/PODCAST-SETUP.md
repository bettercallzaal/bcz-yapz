# Podcast distribution setup

End-to-end guide to ripping MP3 audio from YouTube, hosting on
Cloudflare R2, and submitting the BCZ YapZ feed to Apple Podcasts +
Spotify.

R2 was picked over Storj DCS for cost ($0/mo at our scale), zero egress
fees (Apple/Spotify hammer the URL repeatedly), and a working signup.
See ZAO OS research doc 599 for the full comparison.

---

## Prereqs (one-time)

- `yt-dlp` and `ffmpeg` installed (`brew install yt-dlp ffmpeg`)
- Python 3.10+ available as `python3`
- `pip3 install -r scripts/requirements.txt` to get `boto3`
- A Cloudflare account (free tier is fine)

---

## 1. Create the R2 bucket

1. Open https://dash.cloudflare.com and sign in.
2. Left sidebar -> **R2**. If this is your first time, accept the free
   plan (no credit card required for the 10 GB tier).
3. **Create bucket**:
   - Name: `bcz-yapz-audio`
   - Location: Automatic
   - Default storage class: Standard
4. Open the bucket -> **Settings** -> **Public access** -> under "R2.dev
   subdomain" click **Allow Access** and confirm. Cloudflare assigns a
   stable hostname like `pub-<hash>.r2.dev`. Copy that value - it's your
   `AUDIO_HOST_PUBLIC_PREFIX`.

## 2. Create an R2 API token

Still in the R2 dashboard:

1. **Manage R2 API Tokens** -> **Create API token**.
2. Name: `bcz-yapz-rip-uploader`.
3. Permissions: **Object Read & Write**.
4. Specify bucket: **Apply to specific buckets** -> `bcz-yapz-audio`.
5. TTL: Forever (or as long as your security stance allows).
6. Click **Create API Token**.
7. Save the three values shown - they appear only once:
   - **Access Key ID**
   - **Secret Access Key**
   - **Endpoint** (the `https://<accountid>.r2.cloudflarestorage.com`
     URL, also called "S3 API endpoint")

## 3. Add credentials to your shell

Edit `~/.zshrc` (or wherever you keep secrets):

```bash
export AUDIO_HOST_ACCESS_KEY="<R2 access key id>"
export AUDIO_HOST_SECRET_KEY="<R2 secret access key>"
export AUDIO_HOST_BUCKET="bcz-yapz-audio"
export AUDIO_HOST_PUBLIC_PREFIX="https://pub-<your-hash>.r2.dev"
export AUDIO_HOST_ENDPOINT="https://<accountid>.r2.cloudflarestorage.com"
```

Then `source ~/.zshrc`. Verify:

```bash
echo $AUDIO_HOST_BUCKET   # should print bcz-yapz-audio
```

## 4. Install Python deps

```bash
cd /Users/zaalpanthaki/Documents/bcz-yapz
pip3 install -r scripts/requirements.txt
```

---

## 5. Rip and upload

From the repo root:

```bash
# Test with one episode first
npm run rip:audio -- --slug 2026-05-05-kenny-poidh

# Backfill all 19 published episodes
npm run rip:audio -- --all

# Dry run (no download/upload, just shows what would happen)
npm run rip:audio -- --all --dry-run

# Re-rip a single ep (e.g. you updated youtube_url)
npm run rip:audio -- --slug 2026-05-05-kenny-poidh --force
```

Each rip writes back into the transcript frontmatter:

```yaml
audio_url: https://pub-<hash>.r2.dev/2026-05-05-kenny-poidh.mp3
audio_bytes: 13456789
audio_duration_sec: 1680
audio_mime: audio/mpeg
```

Smoke test the audio_url in a browser - it should download/play the MP3.

Commit and push - Vercel rebuilds `/feed.xml` with the new audio
enclosures.

---

## 6. Pre-flight checks before submitting

1. Hit `https://bczyapz.com/feed.xml` and verify every `<item>` has an
   `<enclosure>` pointing at an R2 MP3.
2. Validate the feed: paste the URL into https://www.castfeedvalidator.com/
   or https://podba.se/validate. Fix any errors.
3. Cover art: Apple needs **3000x3000 px** square JPG/PNG.
   - Drop it at `public/podcast-cover.jpg` and redeploy.
   - The feed already points at `${SITE_URL}/podcast-cover.jpg`.
4. Test playback: open `https://bczyapz.com/feed.xml` in
   https://podcasters.apple.com/support/preview to confirm Apple can
   read it.

---

## 7. Submit to directories

### Apple Podcasts Connect

1. Go to https://podcastsconnect.apple.com/
2. Sign in with an Apple ID.
3. **My Podcasts** -> **+** -> **New Show** -> **Add Show with RSS Feed**.
4. Paste `https://bczyapz.com/feed.xml`.
5. Confirm category, language, owner email match what's in the feed.
6. Submit. Review usually takes 24-72 hrs.

### Spotify for Podcasters

1. Go to https://podcasters.spotify.com/
2. Sign in (any Spotify account works).
3. **Add a podcast you already host**.
4. Paste `https://bczyapz.com/feed.xml`.
5. Verify ownership via the emailed code sent to the address in the
   feed.
6. Submit. Spotify usually ingests within hours.

### Optional - other directories

- Pocket Casts: https://api.pocketcasts.com/web/submit_url - just submit the feed URL, no account needed.
- Overcast: auto-indexes any feed that's in Apple Podcasts after ~24 hr.
- Castbox, Stitcher, Podchaser: each accepts feed URLs via their dashboards.

---

## 8. Workflow for new episodes

After each new BCZ YapZ ep drops on YouTube:

```bash
# 1. Edit content/transcripts/<slug>.md - fill in youtube_url + youtube_video_id
# 2. Rip + upload
npm run rip:audio -- --slug <slug>
# 3. Regenerate bonfire ingest
npm run ingest:bonfire
# 4. Commit + push
git add content/transcripts/<slug>.md
git commit -m "feat(ep-XX): publish <guest> with audio"
git push
```

Vercel rebuilds, `/feed.xml` picks up the new item, Apple/Spotify ingest
the new episode within an hour.

---

## Switching hosts later

The script is host-agnostic; only the env vars change. If you ever want
to move to Storj DCS, Filebase, or another S3-compatible host, set the
new credentials + endpoint + public prefix and re-run
`npm run rip:audio -- --all --force`. Frontmatter `audio_url` values
get rewritten and Apple/Spotify re-fetch.
