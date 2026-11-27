#!/usr/bin/env python3
"""One entry point for the local half of the episode loop (CLAUDE.md steps 4, 8, 9).

  npm run ep:publish -- --slug 2026-11-14-retrospect           # run the local steps, then report
  npm run ep:publish -- --slug 2026-11-14-retrospect --check   # report only, change nothing

What it runs, in order: typecheck, tests, draft-socials for this slug, Bonfire ingest.
What it never does: post, upload, publish, push or commit. Steps that need Zaal's
hands or another tool (YouTube upload, the description skill, the R2 audio rip,
commit and push) are printed as a checklist of what is still open.
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent


@dataclass
class Check:
    name: str
    done: bool
    next_step: str


def read_frontmatter_keys(path: Path) -> dict[str, str]:
    """Top-level scalar keys of the YAML frontmatter. Lists and nested maps are skipped."""
    text = path.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        raise SystemExit(f"error: no frontmatter in {path}")
    out: dict[str, str] = {}
    for line in m.group(1).splitlines():
        km = re.match(r"^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$", line)
        if km:
            out[km.group(1)] = km.group(2).strip().strip("'\"")
    return out


def episode_status(repo: Path, slug: str) -> list[Check]:
    """What exists for one episode and what is still open. Reads files only."""
    transcript = repo / "content" / "transcripts" / f"{slug}.md"
    if not transcript.exists():
        raise SystemExit(f"error: {transcript.relative_to(repo)} not found")
    fm = read_frontmatter_keys(transcript)
    body = transcript.read_text(encoding="utf-8").split("## Transcript", 1)
    has_transcript = len(body) == 2 and re.search(r"\d{1,2}:\d{2}", body[1]) is not None

    thumb = fm.get("thumbnail_override", "")
    thumb_ok = bool(thumb) and (repo / "public" / thumb.lstrip("/")).exists()

    return [
        Check("timestamped transcript", has_transcript,
              "paste the timestamped transcript under '## Transcript'"),
        Check("youtube_video_id", bool(fm.get("youtube_video_id")),
              "after the YouTube upload, fill youtube_url and youtube_video_id"),
        Check("youtube description", (repo / "content" / "youtube-descriptions" / f"{slug}.md").exists(),
              f"in a Claude session in this repo: /bcz-yapz-description {slug}"),
        Check("custom thumbnail", thumb_ok,
              "optional: add public/thumbnails/<slug>.jpg and set thumbnail_override (else YouTube's is used)"),
        Check("audio_url (podcast feed)", bool(fm.get("audio_url")),
              f"needs AUDIO_HOST_* env (scripts/PODCAST-SETUP.md): npm run rip:audio -- --slug {slug}"),
        Check("social drafts", (repo / "content" / "socials" / f"{slug}.md").exists(),
              f"npm run draft-socials -- --slug {slug}"),
        Check("bonfire ingest file", (repo / "content" / "bonfire-ingest" / f"{slug}.md").exists(),
              "npm run ingest:bonfire"),
    ]


def run(cmd: list[str]) -> bool:
    print(f"\n$ {' '.join(cmd)}", flush=True)
    return subprocess.run(cmd, cwd=REPO).returncode == 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--slug", required=True, help="transcript filename without .md")
    ap.add_argument("--check", action="store_true", help="report only; run nothing, change nothing")
    args = ap.parse_args()

    episode_status(REPO, args.slug)  # fail fast on a bad slug before running anything

    failed: list[str] = []
    if not args.check:
        steps = [
            ("typecheck", ["npm", "run", "-s", "typecheck"]),
            ("tests", ["npm", "run", "-s", "test"]),
            ("social drafts", [sys.executable, "scripts/draft-socials.py", "--slug", args.slug]),
            ("bonfire ingest", [sys.executable, "scripts/generate-bonfire-ingest.py"]),
        ]
        for name, cmd in steps:
            if not run(cmd):
                failed.append(name)
                if name in ("typecheck", "tests"):
                    break  # do not generate files on a broken tree

    checks = episode_status(REPO, args.slug)
    print(f"\nEpisode {args.slug}")
    for c in checks:
        print(f"  [{'DONE' if c.done else 'OPEN'}] {c.name}")
    open_items = [c for c in checks if not c.done]
    if open_items:
        print("\nStill open:")
        for c in open_items:
            print(f"  - {c.name}: {c.next_step}")
    print("\nThen: review the diff, commit, push a branch and open a PR. Nothing was posted or pushed.")
    if failed:
        print(f"\nFAILED: {', '.join(failed)}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
