#!/usr/bin/env python3
"""Scaffold a new BCZ YapZ episode transcript file.

Creates content/transcripts/<date>-<slug>.md with valid frontmatter that
passes EpisodeFrontmatterSchema. The transcript body is left blank for
you to paste in.

Usage:
  python3 scripts/new-ep.py --slug erik-fotocaster --guest "Erik" --org "Fotocaster" --episode 21
  python3 scripts/new-ep.py --slug roni --guest "Roni" --date 2026-06-01

Date defaults to today. Episode number defaults to one more than the
highest existing.
"""
from __future__ import annotations

import argparse
import datetime as dt
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
TRANSCRIPTS_DIR = REPO / "content" / "transcripts"


def highest_ep_number() -> int:
    max_n = 0
    for f in TRANSCRIPTS_DIR.glob("*.md"):
        text = f.read_text(encoding="utf-8")
        m = re.search(r"^episode:\s*(\d+)", text, re.M)
        if m:
            n = int(m.group(1))
            if n > max_n:
                max_n = n
    return max_n


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--slug", required=True, help="kebab-case slug, e.g. erik-fotocaster")
    ap.add_argument("--guest", required=True, help="guest name (display)")
    ap.add_argument("--org", default="", help="guest org / company")
    ap.add_argument("--episode", type=int, help="episode number (auto if omitted)")
    ap.add_argument("--date", help="YYYY-MM-DD; defaults to today")
    ap.add_argument(
        "--farcaster", help="optional Farcaster handle to seed guest_links"
    )
    ap.add_argument("--x", dest="x_handle", help="optional X handle to seed guest_links")
    args = ap.parse_args()

    if not re.match(r"^[a-z0-9-]+$", args.slug):
        ap.error("slug must be kebab-case, lowercase a-z 0-9 and hyphens only")

    date_str = args.date or dt.date.today().isoformat()
    try:
        dt.date.fromisoformat(date_str)
    except ValueError:
        ap.error(f"--date must be YYYY-MM-DD, got {date_str!r}")

    episode = args.episode if args.episode is not None else highest_ep_number() + 1
    filepath = TRANSCRIPTS_DIR / f"{date_str}-{args.slug}.md"
    if filepath.exists():
        print(f"error: {filepath.name} already exists", file=sys.stderr)
        sys.exit(1)

    org_line = f"guest_org: {args.org}\n" if args.org else ""
    links_lines = []
    if args.farcaster:
        h = args.farcaster.lstrip("@")
        links_lines.append(f'  - "farcaster: @{h}"')
    if args.x_handle:
        h = args.x_handle.lstrip("@")
        links_lines.append(f'  - "x: @{h}"')
    links_block = ""
    if links_lines:
        links_block = "guest_links:\n" + "\n".join(links_lines) + "\n"

    title = f"BCZ YapZ w/{args.guest}"
    if args.org:
        title = f"BCZ YapZ w/{args.guest} ({args.org})"

    body = f"""---
title: {title}
show: BCZ YapZ
episode: {episode}
guest: {args.guest}
{org_line}{links_block}host: Zaal
date: {date_str}T00:00:00.000Z
format: video-podcast
language: en
status: raw-undated
topics: []
keywords: []
entities:
  orgs: []
  people:
    - {args.guest}
    - Zaal
  projects: []
summary: ""
---

## Transcript

Transcript pending.
"""

    filepath.write_text(body, encoding="utf-8")
    print(f"created {filepath.relative_to(REPO)}")
    print(f"  ep {episode} | {args.guest}{' / ' + args.org if args.org else ''} | {date_str}")
    print()
    print("Next:")
    print(f"  1. Fill youtube_url + youtube_video_id after publishing")
    print(f"  2. Paste timestamped transcript into the ## Transcript section")
    print(f"  3. npm run rip:audio -- --slug {date_str}-{args.slug}")
    print(f"  4. npm run ingest:bonfire")
    print(f"  5. /bcz-yapz-description {date_str}-{args.slug}")
    print(f"  6. git commit + push")


if __name__ == "__main__":
    main()
