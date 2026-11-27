INGEST BATCH: BCZ YapZ Episode 26 — Retrospect (2026-11-14).

Build a manifest of nodes and edges, preview the first 3 nodes, then ask me to approve. Verbatim quote text must be preserved exactly. Topics, platforms, chains, and tools must be stored as attributes on the Episode node, NEVER as standalone Entity nodes per scope_constraint trait.

## EPISODE NODE
Subject: BCZ YapZ w/Retrospect
Type: PodcastEpisode
Date: 2026-11-14
Show: BCZ YapZ
Episode number: 26
Format: video-podcast
YouTube URL: https://www.youtube.com/watch?v=06u0eKEZOgY
YouTube video ID: 06u0eKEZOgY
Description: Zaal interviews Retrospect.
Source: https://www.youtube.com/watch?v=06u0eKEZOgY
Confidence: 1.0

## PERSON NODE — Guest
Subject: Retrospect
Type: Person
Source: https://www.youtube.com/watch?v=06u0eKEZOgY
Confidence: 1.0

## QUOTE NODE 1
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "give us a little bit about your Polish uh like what is growing up in Poland"
Timestamp: 00:00:53
YouTube deeplink: https://youtu.be/06u0eKEZOgY?t=53
Confidence: 1.0

## QUOTE NODE 2
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "and maybe do it like an NFTs or or something like that. So I did it like"
Timestamp: 00:05:06
YouTube deeplink: https://youtu.be/06u0eKEZOgY?t=306
Confidence: 1.0

## QUOTE NODE 3
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "you know like since uh only you know like lately when the WaveWarZ came you know like more"
Timestamp: 00:09:21
YouTube deeplink: https://youtu.be/06u0eKEZOgY?t=561
Confidence: 1.0

## QUOTE NODE 4
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "goal at this moment where you're like, "Okay, these are the next steps that I'm reaching towards and"
Timestamp: 00:13:32
YouTube deeplink: https://youtu.be/06u0eKEZOgY?t=812
Confidence: 1.0

## QUOTE NODE 5
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "uh niche of individuals learning how to automate different pieces of what they're doing in different"
Timestamp: 00:18:21
YouTube deeplink: https://youtu.be/06u0eKEZOgY?t=1101
Confidence: 1.0

## QUOTE NODE 6
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "single day. I think we're all trying to find our way to do that, right? And it's harder and harder"
Timestamp: 00:22:32
YouTube deeplink: https://youtu.be/06u0eKEZOgY?t=1352
Confidence: 1.0

## QUOTE NODE 7
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "synro a bit. But I did it in, you know, like my tough top game. So my three signal game."
Timestamp: 00:26:18
YouTube deeplink: https://youtu.be/06u0eKEZOgY?t=1578
Confidence: 1.0

## EDGES TO ASSERT
- Zaal Panthaki -[hosted]-> BCZ YapZ w/Retrospect
- Retrospect -[appeared_on]-> BCZ YapZ w/Retrospect
- BCZ YapZ w/Retrospect -[contains_quote]-> Quote 1 through Quote 7

---
Build the manifest, preview the first 3 nodes inline, then ask me "approve all?". Do not commit until I say yes. If existing Episode/Person/Org nodes match by name, MERGE; do not create parallel nodes. Topics in the description are attributes, not entities.