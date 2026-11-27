INGEST BATCH: BCZ YapZ Episode 21 — Danny from P2E Inferno (2026-10-07).

Build a manifest of nodes and edges, preview the first 3 nodes, then ask me to approve. Verbatim quote text must be preserved exactly. Topics, platforms, chains, and tools must be stored as attributes on the Episode node, NEVER as standalone Entity nodes per scope_constraint trait.

## EPISODE NODE
Subject: BCZ YapZ w/Danny (P2E Inferno)
Type: PodcastEpisode
Date: 2026-10-07
Show: BCZ YapZ
Episode number: 21
Format: video-podcast
YouTube URL: https://www.youtube.com/watch?v=IWeb6HPockk
YouTube video ID: IWeb6HPockk
Description: Zaal interviews Danny from P2E Inferno.
Source: https://www.youtube.com/watch?v=IWeb6HPockk
Confidence: 1.0

## PERSON NODE — Guest
Subject: Danny
Type: Person
Role: Founder/team at P2E Inferno
Source: https://www.youtube.com/watch?v=IWeb6HPockk
Confidence: 1.0

## ORG NODE — Guest's organization
Subject: P2E Inferno
Type: Org
Source: https://www.youtube.com/watch?v=IWeb6HPockk
Confidence: 0.9

## QUOTE NODE 1
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "All right. Awesome. Great question, because the journey kind of started out as something that didn't even have anything to do with what P2E eventually became."
Timestamp: 00:02:23
YouTube deeplink: https://youtu.be/IWeb6HPockk?t=143
Confidence: 1.0

## QUOTE NODE 2
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "foundation, which right now it's a token based on another token. If the reward layer is not stable,"
Timestamp: 00:11:49
YouTube deeplink: https://youtu.be/IWeb6HPockk?t=709
Confidence: 1.0

## QUOTE NODE 3
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "So you need to actually go to your profile to link the Telegram first."
Timestamp: 00:18:48
YouTube deeplink: https://youtu.be/IWeb6HPockk?t=1128
Confidence: 1.0

## QUOTE NODE 4
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "what was something that you didn't expect that happened?"
Timestamp: 00:23:55
YouTube deeplink: https://youtu.be/IWeb6HPockk?t=1435
Confidence: 1.0

## QUOTE NODE 5
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "on any of the socials,"
Timestamp: 00:28:24
YouTube deeplink: https://youtu.be/IWeb6HPockk?t=1704
Confidence: 1.0

## QUOTE NODE 6
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "So I'm really excited to be able to have the music events back into my like"
Timestamp: 00:33:39
YouTube deeplink: https://youtu.be/IWeb6HPockk?t=2019
Confidence: 1.0

## QUOTE NODE 7
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "That's the other thing people don't fully realize about tokens and launchpads is like,"
Timestamp: 00:39:09
YouTube deeplink: https://youtu.be/IWeb6HPockk?t=2349
Confidence: 1.0

## EDGES TO ASSERT
- Zaal Panthaki -[hosted]-> BCZ YapZ w/Danny (P2E Inferno)
- Danny -[appeared_on]-> BCZ YapZ w/Danny (P2E Inferno)
- Danny -[part_of]-> P2E Inferno
- BCZ YapZ w/Danny (P2E Inferno) -[contains_quote]-> Quote 1 through Quote 7

---
Build the manifest, preview the first 3 nodes inline, then ask me "approve all?". Do not commit until I say yes. If existing Episode/Person/Org nodes match by name, MERGE; do not create parallel nodes. Topics in the description are attributes, not entities.