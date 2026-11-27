INGEST BATCH: BCZ YapZ Episode 27 — S.R. Chappell (2026-11-14).

Build a manifest of nodes and edges, preview the first 3 nodes, then ask me to approve. Verbatim quote text must be preserved exactly. Topics, platforms, chains, and tools must be stored as attributes on the Episode node, NEVER as standalone Entity nodes per scope_constraint trait.

## EPISODE NODE
Subject: BCZ YapZ w/S.R. Chappell
Type: PodcastEpisode
Date: 2026-11-14
Show: BCZ YapZ
Episode number: 27
Format: video-podcast
YouTube URL: https://www.youtube.com/watch?v=qC-5H_Pulhc
YouTube video ID: qC-5H_Pulhc
Description: Zaal interviews S.R. Chappell.
Source: https://www.youtube.com/watch?v=qC-5H_Pulhc
Confidence: 1.0

## PERSON NODE — Guest
Subject: S.R. Chappell
Type: Person
Source: https://www.youtube.com/watch?v=qC-5H_Pulhc
Confidence: 1.0

## QUOTE NODE 1
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "to kind of be in this battle, but more of a performance with you because he loves your music as well."
Timestamp: 00:01:18
YouTube deeplink: https://youtu.be/qC-5H_Pulhc?t=78
Confidence: 1.0

## QUOTE NODE 2
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "Um it ended up winning an honorable mention and I thought that was really cool because it was my"
Timestamp: 00:04:59
YouTube deeplink: https://youtu.be/qC-5H_Pulhc?t=299
Confidence: 1.0

## QUOTE NODE 3
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "not the best for someone that is looking to hit their viral moment, get their music heard by everyone around"
Timestamp: 00:09:20
YouTube deeplink: https://youtu.be/qC-5H_Pulhc?t=560
Confidence: 1.0

## QUOTE NODE 4
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "I thought about it, they will sit there and spin and spin and spin and another one will come and spin and spin"
Timestamp: 00:13:00
YouTube deeplink: https://youtu.be/qC-5H_Pulhc?t=780
Confidence: 1.0

## QUOTE NODE 5
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "the doors locked and the curtains drawn. Just got to hide cuz I can't go [music] on cuz"
Timestamp: 00:17:26
YouTube deeplink: https://youtu.be/qC-5H_Pulhc?t=1046
Confidence: 1.0

## QUOTE NODE 6
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "people that come into the space uh in different capacities because everyone's come in with their own unique"
Timestamp: 00:22:16
YouTube deeplink: https://youtu.be/qC-5H_Pulhc?t=1336
Confidence: 1.0

## QUOTE NODE 7
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "part, having audibles, right? Just be whoop audible. [laughter] >> Exactly. Exactly."
Timestamp: 00:26:33
YouTube deeplink: https://youtu.be/qC-5H_Pulhc?t=1593
Confidence: 1.0

## EDGES TO ASSERT
- Zaal Panthaki -[hosted]-> BCZ YapZ w/S.R. Chappell
- S.R. Chappell -[appeared_on]-> BCZ YapZ w/S.R. Chappell
- BCZ YapZ w/S.R. Chappell -[contains_quote]-> Quote 1 through Quote 7

---
Build the manifest, preview the first 3 nodes inline, then ask me "approve all?". Do not commit until I say yes. If existing Episode/Person/Org nodes match by name, MERGE; do not create parallel nodes. Topics in the description are attributes, not entities.