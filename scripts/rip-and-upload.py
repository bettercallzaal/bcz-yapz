#!/usr/bin/env python3
"""Rip MP3 from each episode's YouTube URL, upload to S3-compatible host, patch frontmatter.

Reads content/transcripts/*.md, for each episode with `youtube_url` but no
`audio_url`, downloads the audio via yt-dlp, uploads to the configured S3
host (Cloudflare R2 by default), computes byte length + duration, and writes
audio_url/audio_bytes/audio_duration_sec back into the frontmatter.

Env required:
  AUDIO_HOST_ACCESS_KEY     S3-compatible access key id
  AUDIO_HOST_SECRET_KEY     S3-compatible secret access key
  AUDIO_HOST_BUCKET         Bucket name (e.g., bcz-yapz-audio)
  AUDIO_HOST_PUBLIC_PREFIX  Public URL prefix for objects
                            (R2: https://pub-<hash>.r2.dev)
                            (Storj: https://link.storjshare.io/raw/<grant>/<bucket>)
  AUDIO_HOST_ENDPOINT       S3 API endpoint URL
                            (R2: https://<accountid>.r2.cloudflarestorage.com)
                            (Storj: https://gateway.storjshare.io)

Optional flags:
  --slug <slug>       Rip a single episode by slug
  --all               Rip every episode missing audio_url
  --force             Re-rip even if audio_url already set
  --dry-run           Show what would happen without downloading/uploading
  --bitrate 64K       Audio bitrate. Default 64K (good for spoken word)
"""
from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
TRANSCRIPTS_DIR = REPO / "content" / "transcripts"

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)


def die(msg: str) -> "None":
    print(f"error: {msg}", file=sys.stderr)
    sys.exit(1)


def read_frontmatter(path: Path) -> tuple[dict, str, str]:
    text = path.read_text(encoding="utf-8")
    m = FRONTMATTER_RE.match(text)
    if not m:
        die(f"{path}: no frontmatter found")
    raw = m.group(1)
    body = text[m.end():]
    fm: dict = {}
    current_key: str | None = None
    list_buffer: list[str] = []
    for line in raw.splitlines():
        if line.startswith("  - ") and current_key is not None:
            list_buffer.append(line[4:].strip().strip("'\""))
            fm[current_key] = list_buffer
            continue
        if line.startswith("  ") and current_key is not None:
            continue
        m2 = re.match(r"^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$", line)
        if not m2:
            continue
        key, val = m2.group(1), m2.group(2).strip()
        if val == "":
            current_key = key
            list_buffer = []
            fm[key] = []
        else:
            current_key = key
            list_buffer = []
            fm[key] = val.strip("'\"")
    return fm, raw, body


def patch_frontmatter(path: Path, updates: dict[str, str | int]) -> None:
    fm, raw, body = read_frontmatter(path)
    lines = raw.splitlines()
    for key, value in updates.items():
        replacement = f"{key}: {value}"
        replaced = False
        for i, line in enumerate(lines):
            if re.match(rf"^{re.escape(key)}:\s*", line):
                lines[i] = replacement
                replaced = True
                break
        if not replaced:
            lines.append(replacement)
    new_fm = "\n".join(lines)
    path.write_text(f"---\n{new_fm}\n---\n{body}", encoding="utf-8")


def ensure_env() -> dict[str, str]:
    required = [
        "AUDIO_HOST_ACCESS_KEY",
        "AUDIO_HOST_SECRET_KEY",
        "AUDIO_HOST_BUCKET",
        "AUDIO_HOST_PUBLIC_PREFIX",
        "AUDIO_HOST_ENDPOINT",
    ]
    missing = [k for k in required if not os.environ.get(k)]
    if missing:
        die(
            "missing required env: "
            + ", ".join(missing)
            + ". See scripts/PODCAST-SETUP.md."
        )
    return {
        "access_key": os.environ["AUDIO_HOST_ACCESS_KEY"],
        "secret_key": os.environ["AUDIO_HOST_SECRET_KEY"],
        "bucket": os.environ["AUDIO_HOST_BUCKET"],
        "prefix": os.environ["AUDIO_HOST_PUBLIC_PREFIX"].rstrip("/"),
        "endpoint": os.environ["AUDIO_HOST_ENDPOINT"],
    }


def get_s3_client(env: dict[str, str]):
    try:
        import boto3
    except ImportError:
        die("boto3 not installed. Run: pip3 install -r scripts/requirements.txt")
    from botocore.config import Config

    return boto3.client(
        "s3",
        endpoint_url=env["endpoint"],
        aws_access_key_id=env["access_key"],
        aws_secret_access_key=env["secret_key"],
        config=Config(signature_version="s3v4", s3={"addressing_style": "path"}),
    )


def rip_audio(youtube_url: str, out_path: Path, bitrate: str) -> None:
    cmd = [
        "yt-dlp",
        "-x",
        "--audio-format", "mp3",
        "--audio-quality", bitrate,
        "--no-playlist",
        "--restrict-filenames",
        "-o", str(out_path),
        youtube_url,
    ]
    print(f"  yt-dlp -> {out_path.name} ...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        die(f"yt-dlp failed: {res.stderr.strip()}")


def probe_duration_sec(mp3_path: Path) -> int | None:
    if not shutil.which("ffprobe"):
        return None
    res = subprocess.run(
        [
            "ffprobe", "-v", "error",
            "-show_entries", "format=duration",
            "-of", "json",
            str(mp3_path),
        ],
        capture_output=True, text=True,
    )
    if res.returncode != 0:
        return None
    try:
        return int(float(json.loads(res.stdout)["format"]["duration"]))
    except (KeyError, ValueError):
        return None


def upload(s3, bucket: str, key: str, path: Path) -> None:
    print(f"  upload -> s3://{bucket}/{key}")
    s3.upload_file(
        str(path),
        bucket,
        key,
        ExtraArgs={
            "ContentType": "audio/mpeg",
            "CacheControl": "public, max-age=31536000",
        },
    )


def process_episode(
    path: Path,
    env: dict[str, str],
    s3,
    bitrate: str,
    force: bool,
    dry_run: bool,
) -> bool:
    fm, _, _ = read_frontmatter(path)
    slug = path.stem
    yt = fm.get("youtube_url")
    if not yt:
        print(f"[skip] {slug}: no youtube_url")
        return False
    if fm.get("audio_url") and not force:
        print(f"[skip] {slug}: audio_url already set")
        return False

    print(f"[rip] {slug}: {yt}")
    if dry_run:
        print("  (dry-run) skipping download + upload")
        return True

    with tempfile.TemporaryDirectory() as tmpdir:
        mp3 = Path(tmpdir) / f"{slug}.mp3"
        rip_audio(yt, mp3, bitrate)
        if not mp3.exists():
            die(f"{slug}: rip produced no file")
        size = mp3.stat().st_size
        duration = probe_duration_sec(mp3)
        key = f"{slug}.mp3"
        upload(s3, env["bucket"], key, mp3)
        public_url = f"{env['prefix']}/{key}"

    updates: dict[str, str | int] = {
        "audio_url": public_url,
        "audio_bytes": size,
        "audio_mime": "audio/mpeg",
    }
    if duration is not None:
        updates["audio_duration_sec"] = duration

    patch_frontmatter(path, updates)
    print(f"[done] {slug}: {public_url} ({size:,} bytes, {duration}s)")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slug", help="rip one episode by slug")
    parser.add_argument("--all", action="store_true", help="rip every missing episode")
    parser.add_argument("--force", action="store_true", help="re-rip even if audio_url set")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--bitrate", default="64K")
    args = parser.parse_args()

    if not args.slug and not args.all:
        parser.error("specify --slug <slug> or --all")

    if not shutil.which("yt-dlp"):
        die("yt-dlp not on PATH. brew install yt-dlp")

    env = ensure_env()
    s3 = get_s3_client(env)

    if args.slug:
        path = TRANSCRIPTS_DIR / f"{args.slug}.md"
        if not path.exists():
            die(f"transcript not found: {path}")
        targets = [path]
    else:
        targets = sorted(TRANSCRIPTS_DIR.glob("*.md"))

    processed = 0
    for path in targets:
        if process_episode(path, env, s3, args.bitrate, args.force, args.dry_run):
            processed += 1

    print(f"\nprocessed {processed} episode(s)")


if __name__ == "__main__":
    main()
