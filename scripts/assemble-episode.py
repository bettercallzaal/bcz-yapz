#!/usr/bin/env python3
"""Assemble a BCZ YapZ episode: intro + raw recording + outro, one re-encode per part.

File-agnostic: probes the source recording and normalizes every part to match it
(resolution, fps, square pixels, loudnorm audio), then stitches with the ffmpeg
concat demuxer using stream copy - so the 48-minute main file is only encoded once.

Usage:
  python3 scripts/assemble-episode.py --source /path/to/raw.mp4 [--intro PATH] [--outro PATH] [--out PATH]
  python3 scripts/assemble-episode.py --source raw.mp4 --no-intro --no-outro   # normalize only

Defaults pull the standing BCZ intro/outro from ~/Movies/templetes/.
"""

import argparse
import json
import shutil
import subprocess
import sys
import tempfile
from fractions import Fraction
from pathlib import Path

DEFAULT_INTRO = Path.home() / "Movies/templetes/Zaal Intro.MOV"
DEFAULT_OUTRO = Path.home() / "Movies/templetes/Zaal Outro.MOV"

# One loudness target for every part so intro/main/outro sit at the same level.
LOUDNORM = "loudnorm=I=-16:TP=-1.5:LRA=11"
VIDEO_ARGS = ["-c:v", "libx264", "-preset", "medium", "-crf", "20",
              "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.1"]
AUDIO_ARGS = ["-c:a", "aac", "-ar", "48000", "-ac", "2", "-b:a", "192k"]


def run(cmd: list[str]) -> None:
    print("+ " + " ".join(str(c) for c in cmd), flush=True)
    subprocess.run(cmd, check=True)


def probe(path: Path) -> dict:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=width,height,r_frame_rate",
         "-show_entries", "format=duration",
         "-of", "json", str(path)],
        check=True, capture_output=True, text=True).stdout
    data = json.loads(out)
    stream = data["streams"][0]
    fps = Fraction(stream["r_frame_rate"])
    return {"width": int(stream["width"]), "height": int(stream["height"]),
            "fps": fps, "duration": float(data["format"]["duration"])}


def has_audio(path: Path) -> bool:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "a:0",
         "-show_entries", "stream=codec_name", "-of", "csv=p=0", str(path)],
        check=True, capture_output=True, text=True).stdout
    return bool(out.strip())


def normalize(src: Path, dest: Path, target: dict) -> None:
    """Re-encode one part to the shared target params (single encode per part)."""
    w, h, fps = target["width"], target["height"], target["fps"]
    vf = (f"scale={w}:{h}:force_original_aspect_ratio=decrease,"
          f"pad={w}:{h}:(ow-iw)/2:(oh-ih)/2,setsar=1,fps={fps}")
    cmd = ["ffmpeg", "-y", "-i", str(src)]
    if not has_audio(src):
        cmd += ["-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
                "-shortest", "-map", "0:v:0", "-map", "1:a:0"]
    cmd += ["-vf", vf, "-af", LOUDNORM, *VIDEO_ARGS, *AUDIO_ARGS,
            "-movflags", "+faststart", str(dest)]
    run(cmd)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--source", required=True, type=Path, help="raw episode recording")
    ap.add_argument("--intro", type=Path, default=DEFAULT_INTRO)
    ap.add_argument("--outro", type=Path, default=DEFAULT_OUTRO)
    ap.add_argument("--no-intro", action="store_true")
    ap.add_argument("--no-outro", action="store_true")
    ap.add_argument("--out", type=Path, help="output file (default: <source>-episode.mp4)")
    ap.add_argument("--keep-parts", action="store_true", help="keep normalized parts dir")
    args = ap.parse_args()

    if not shutil.which("ffmpeg") or not shutil.which("ffprobe"):
        sys.exit("ffmpeg/ffprobe not found on PATH")
    if not args.source.exists():
        sys.exit(f"source not found: {args.source}")

    parts_src: list[Path] = []
    if not args.no_intro:
        if not args.intro.exists():
            sys.exit(f"intro not found: {args.intro}")
        parts_src.append(args.intro)
    parts_src.append(args.source)
    if not args.no_outro:
        if not args.outro.exists():
            sys.exit(f"outro not found: {args.outro}")
        parts_src.append(args.outro)

    target = probe(args.source)
    print(f"target: {target['width']}x{target['height']} @ {target['fps']} fps "
          f"(from source, {target['duration']:.1f}s)")

    out = args.out or args.source.with_name(args.source.stem + "-episode.mp4")
    workdir = Path(tempfile.mkdtemp(prefix="bcz-assemble-"))
    try:
        normalized: list[Path] = []
        for i, part in enumerate(parts_src):
            dest = workdir / f"part{i}.mp4"
            normalize(part, dest, target)
            normalized.append(dest)

        concat_list = workdir / "list.txt"
        concat_list.write_text(
            "".join(f"file '{p}'\n" for p in normalized), encoding="utf-8")
        run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat_list),
             "-c", "copy", "-movflags", "+faststart", str(out)])

        expected = sum(probe(p)["duration"] for p in normalized)
        actual = probe(out)["duration"]
        print(f"\nassembled: {out}")
        print(f"duration: {actual:.1f}s (parts sum {expected:.1f}s)")
        if abs(actual - expected) > 2.0:
            print("WARNING: duration mismatch over 2s - inspect the output before publishing")
            return 1
    finally:
        if args.keep_parts:
            print(f"parts kept in {workdir}")
        else:
            shutil.rmtree(workdir, ignore_errors=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
