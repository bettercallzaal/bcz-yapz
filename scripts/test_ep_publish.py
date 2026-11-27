"""Tests for scripts/ep-publish.py. Run: npm run test:py"""

import importlib.util
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
_spec = importlib.util.spec_from_file_location("ep_publish", HERE / "ep-publish.py")
ep_publish = importlib.util.module_from_spec(_spec)
sys.modules["ep_publish"] = ep_publish  # dataclasses look the module up by name
_spec.loader.exec_module(ep_publish)

FULL = """---
title: Test
episode: 9
youtube_video_id: abc123
audio_url: https://audio.example/ep.mp3
thumbnail_override: /thumbnails/ep.jpg
guest_links:
  - https://x.com/someone
---

## Transcript

00:00:01 Zaal: hello
"""

BARE = """---
title: Test
episode: 9
---

## Transcript

"""


def make_repo(root: Path, slug: str, transcript: str, extras: bool) -> None:
    (root / "content" / "transcripts").mkdir(parents=True)
    (root / "content" / "transcripts" / f"{slug}.md").write_text(transcript)
    if extras:
        for d in ("youtube-descriptions", "socials", "bonfire-ingest"):
            (root / "content" / d).mkdir(parents=True)
            (root / "content" / d / f"{slug}.md").write_text("x")
        (root / "public" / "thumbnails").mkdir(parents=True)
        (root / "public" / "thumbnails" / "ep.jpg").write_bytes(b"x")


class EpisodeStatusTest(unittest.TestCase):
    def test_complete_episode_has_nothing_open(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t)
            make_repo(root, "ep", FULL, extras=True)
            checks = ep_publish.episode_status(root, "ep")
            self.assertEqual([c.name for c in checks if not c.done], [])
            self.assertEqual(len(checks), 7)

    def test_bare_episode_has_everything_open(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t)
            make_repo(root, "ep", BARE, extras=False)
            checks = ep_publish.episode_status(root, "ep")
            self.assertEqual([c for c in checks if c.done], [])

    def test_thumbnail_override_pointing_at_missing_file_is_open(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t)
            make_repo(root, "ep", FULL, extras=False)
            thumb = next(c for c in ep_publish.episode_status(root, "ep") if c.name == "custom thumbnail")
            self.assertFalse(thumb.done)

    def test_unknown_slug_exits(self):
        with tempfile.TemporaryDirectory() as t:
            root = Path(t)
            make_repo(root, "ep", FULL, extras=False)
            with self.assertRaises(SystemExit):
                ep_publish.episode_status(root, "nope")

    def test_frontmatter_reader_skips_lists_and_strips_quotes(self):
        with tempfile.TemporaryDirectory() as t:
            p = Path(t) / "x.md"
            p.write_text("---\nyoutube_url: 'https://youtu.be/a'\nguest_links:\n  - one\n---\nbody\n")
            fm = ep_publish.read_frontmatter_keys(p)
            self.assertEqual(fm["youtube_url"], "https://youtu.be/a")
            self.assertEqual(fm["guest_links"], "")


if __name__ == "__main__":
    unittest.main()
