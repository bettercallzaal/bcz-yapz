#!/usr/bin/env python3
"""Resolve a BCZ YapZ guest's Farcaster + X handles.

Encapsulates the manual research process: given a name or partial handle,
search the Farcaster fname registry + Warpcast API, pull each candidate's
verified X account, and output a ranked list of matches plus a
ready-to-paste `guest_links` YAML block.

Usage:
  python3 scripts/resolve-guest.py "Erik"
  python3 scripts/resolve-guest.py --handle eriks
  python3 scripts/resolve-guest.py --x-handle eriksx  # reverse lookup

The script never edits files - it prints. Copy the YAML output into your
transcript's guest_links section.
"""
from __future__ import annotations

import argparse
import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

WARPCAST = "https://api.warpcast.com"
FNAMES = "https://fnames.farcaster.xyz"


def get(url: str, retries: int = 2) -> dict:
    for i in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            return json.load(urllib.request.urlopen(req, timeout=15))
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError) as e:
            if i == retries:
                return {"_err": str(e)}
            time.sleep(1 + i)
    return {"_err": "unreachable"}


def fid_for_handle(handle: str) -> int | None:
    h = handle.lstrip("@").strip()
    d = get(f"{WARPCAST}/v2/user-by-username?username={urllib.parse.quote(h)}")
    return d.get("result", {}).get("user", {}).get("fid")


def profile(fid: int) -> dict:
    d = get(f"{WARPCAST}/v2/user?fid={fid}")
    return d.get("result", {}).get("user", {})


def verified_x(fid: int) -> list[str]:
    d = get(f"{WARPCAST}/fc/account-verifications?fid={fid}")
    return [
        v["platformUsername"]
        for v in d.get("result", {}).get("verifications", [])
        if v.get("platform") == "x"
    ]


def search_users(query: str, limit: int = 8) -> list[dict]:
    d = get(
        f"{WARPCAST}/v2/search-users?q={urllib.parse.quote(query)}&limit={limit}"
    )
    return d.get("result", {}).get("users", []) or []


def search_by_handle(handle: str) -> list[dict]:
    """Direct handle lookup; returns at most one user."""
    fid = fid_for_handle(handle)
    if not fid:
        return []
    u = profile(fid)
    return [u] if u else []


def reverse_lookup_x(x_handle: str) -> list[dict]:
    """Find Farcaster accounts that have this X handle verified."""
    xh = x_handle.lstrip("@").lower()
    matches = []
    for q in [xh, xh.replace("_", " ")]:
        for u in search_users(q):
            fid = u.get("fid")
            if not fid:
                continue
            vx = [v.lower() for v in verified_x(fid)]
            if xh in vx:
                matches.append(u)
            time.sleep(0.15)
        time.sleep(0.2)
    seen = set()
    deduped = []
    for u in matches:
        if u.get("fid") in seen:
            continue
        seen.add(u.get("fid"))
        deduped.append(u)
    return deduped


def render_yaml(handles: dict[str, str]) -> str:
    lines = ["guest_links:"]
    if "farcaster" in handles:
        lines.append(f'  - "farcaster: {handles["farcaster"]}"')
    if "x" in handles:
        lines.append(f'  - "x: {handles["x"]}"')
    return "\n".join(lines)


def report(user: dict, label: str = "") -> None:
    un = user.get("username", "?")
    dn = user.get("displayName", "")
    fc = user.get("followerCount", 0)
    bio = (
        (user.get("profile", {}).get("bio", {}).get("text") or "")
        .replace("\n", " ")
        .strip()[:90]
    )
    fid = user.get("fid")
    vx_list = verified_x(fid) if fid else []
    xs = ", ".join(f"@{x}" for x in vx_list) or "(no verified X)"
    print(f"{label}@{un} | {dn} | fid={fid} | {fc}f | X: {xs}")
    if bio:
        print(f"     bio: {bio}")
    if fid and vx_list:
        print()
        print("  Ready-to-paste guest_links:")
        for line in render_yaml(
            {"farcaster": f"@{un}", "x": f"@{vx_list[0]}"}
        ).split("\n"):
            print(f"    {line}")
    elif fid:
        print()
        print("  Ready-to-paste guest_links (Farcaster only):")
        for line in render_yaml({"farcaster": f"@{un}"}).split("\n"):
            print(f"    {line}")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("name", nargs="?", help="guest name to search for")
    ap.add_argument("--handle", help="exact Farcaster handle to resolve")
    ap.add_argument(
        "--x-handle",
        help="reverse-lookup: X handle, find the matching Farcaster account",
    )
    ap.add_argument(
        "--limit", type=int, default=5, help="max search results to show"
    )
    args = ap.parse_args()

    if not (args.name or args.handle or args.x_handle):
        ap.error("provide a name, --handle, or --x-handle")

    if args.handle:
        print(f"=== direct handle lookup: @{args.handle.lstrip('@')} ===")
        users = search_by_handle(args.handle)
        if not users:
            print("  not found in registry")
            sys.exit(1)
        for u in users:
            report(u, "  ")
        return

    if args.x_handle:
        print(f"=== reverse lookup from X: @{args.x_handle.lstrip('@')} ===")
        matches = reverse_lookup_x(args.x_handle)
        if not matches:
            print("  no Farcaster account found with that X verified")
            sys.exit(1)
        for u in matches:
            report(u, "  ")
        return

    print(f"=== search: '{args.name}' ===")
    users = search_users(args.name, args.limit)
    if not users:
        print("  no results")
        sys.exit(1)
    for u in users[: args.limit]:
        report(u, "  ")
        time.sleep(0.15)


if __name__ == "__main__":
    main()
