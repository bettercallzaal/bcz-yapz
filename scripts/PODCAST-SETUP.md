# Podcast distribution setup

End-to-end guide to ripping MP3 audio from YouTube, hosting on Storj, and
submitting the BCZ YapZ feed to Apple Podcasts + Spotify.

---

## Prereqs (one-time)

- `yt-dlp` and `ffmpeg` installed (`brew install yt-dlp ffmpeg`)
- Python 3.10+ available as `python3`
- `pip3 install -r scripts/requirements.txt` to get `boto3`

---

## 1. Create a Storj project

1. Sign up at https://www.storj.io/ (free tier covers 25 GB).
2. Create a project: name it `bcz-yapz`.
3. Create a bucket: name it `bcz-yapz-audio`. Region: Global.

## 2. Create S3-compatible credentials (read+write)

In the Storj dashboard:

1. **Access Keys** → **Create Access Key**
2. Name: `bcz-yapz-rip-uploader`
3. Permissions: Read + Write + Delete
4. Buckets: `bcz-yapz-audio` only
5. Save the **Access Key ID**, **Secret Access Key**, and the
   **Endpoint** (usually `https://gateway.storjshare.io`).

## 3. Create a public sharing access grant (read-only)

This produces the public URL prefix every uploaded MP3 will be served from.

1. In the Storj dashboard, open the `bcz-yapz-audio` bucket.
2. **Share** → **Object browser sharing**.
3. Permissions: Read only.
4. Path: blank (entire bucket).
5. Expiration: Never (or as long as possible).
6. Copy the resulting URL. It looks like:
   `https://link.storjshare.io/s/<accessgrant>/bcz-yapz-audio`
7. The **raw** URL prefix (what we want for podcast enclosures) is the
   same URL but with `/raw/` instead of `/s/`:
   `https://link.storjshare.io/raw/<accessgrant>/bcz-yapz-audio`

## 4. Add the credentials to your shell

Add to `~/.zshrc` (or wherever you keep secrets):

```bash
export STORJ_ACCESS_KEY="<from step 2>"
export STORJ_SECRET_KEY="<from step 2>"
export STORJ_BUCKET="bcz-yapz-audio"
export STORJ_PUBLIC_PREFIX="https://link.storjshare.io/raw/<accessgrant>/bcz-yapz-audio"
# STORJ_ENDPOINT="https://gateway.storjshare.io"   # optional, this is the default
```

Then `source ~/.zshrc`.

---

## 5. Rip and upload

From the repo root:

```bash
# Test with one episode first
python3 scripts/rip-and-upload.py --slug 2026-05-05-kenny-poidh

# Backfill all 19 published episodes
python3 scripts/rip-and-upload.py --all

# Dry run (no download/upload, just shows what would happen)
python3 scripts/rip-and-upload.py --all --dry-run

# Re-rip a single ep (e.g. you updated youtube_url)
python3 scripts/rip-and-upload.py --slug 2026-05-05-kenny-poidh --force
```

Each rip writes back into the transcript frontmatter:

```yaml
audio_url: https://link.storjshare.io/raw/<accessgrant>/bcz-yapz-audio/2026-05-05-kenny-poidh.mp3
audio_bytes: 13456789
audio_duration_sec: 1680
audio_mime: audio/mpeg
```

Commit and push - Vercel rebuilds `/feed.xml` with the new audio enclosures.

---

## 6. Pre-flight checks before submitting

1. Hit `https://bczyapz.com/feed.xml` and verify every `<item>` has an
   `<enclosure>` pointing at a Storj MP3.
2. Validate the feed: paste the URL into https://podba.se/validate or
   https://www.castfeedvalidator.com/. Fix any errors.
3. Cover art: Apple needs **3000x3000 px** square JPG/PNG.
   - Drop it at `public/podcast-cover.jpg` and redeploy.
   - The feed already points at `${SITE_URL}/podcast-cover.jpg`.
4. Test playback: open `https://bczyapz.com/feed.xml` in
   https://podcasters.apple.com/support/preview to confirm Apple can read it.

---

## 7. Submit to directories

### Apple Podcasts Connect

1. Go to https://podcastsconnect.apple.com/
2. Sign in with an Apple ID.
3. **My Podcasts** → **+** → **New Show** → **Add Show with RSS Feed**.
4. Paste `https://bczyapz.com/feed.xml`.
5. Confirm category, language, owner email match what's in the feed.
6. Submit. Review usually takes 24-72 hrs.

### Spotify for Podcasters

1. Go to https://podcasters.spotify.com/
2. Sign in (any Spotify account works).
3. **Add a podcast you already host**.
4. Paste `https://bczyapz.com/feed.xml`.
5. Verify ownership via the emailed code sent to the address in the feed.
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
python3 scripts/rip-and-upload.py --slug <slug>
# 3. Regenerate bonfire ingest
npm run ingest:bonfire
# 4. Commit + push
git add content/transcripts/<slug>.md
git commit -m "feat(ep-XX): publish <guest> with audio"
git push
```

Vercel rebuilds, `/feed.xml` picks up the new item, Apple/Spotify ingest
the new episode within an hour.
