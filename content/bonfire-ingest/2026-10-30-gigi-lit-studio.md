INGEST BATCH: BCZ YapZ Episode 22 — Gigi from Lit Studio (2026-10-30).

Build a manifest of nodes and edges, preview the first 3 nodes, then ask me to approve. Verbatim quote text must be preserved exactly. Topics, platforms, chains, and tools must be stored as attributes on the Episode node, NEVER as standalone Entity nodes per scope_constraint trait.

## EPISODE NODE
Subject: BCZ YapZ w/Gigi (Lit Studio)
Type: PodcastEpisode
Date: 2026-10-30
Show: BCZ YapZ
Episode number: 22
Format: video-podcast
YouTube URL: https://www.youtube.com/watch?v=YdR6G8uex00
YouTube video ID: YdR6G8uex00
Description: Zaal interviews Gigi from Lit Studio.
Source: https://www.youtube.com/watch?v=YdR6G8uex00
Confidence: 1.0

## PERSON NODE — Guest
Subject: Gigi
Type: Person
Role: Founder/team at Lit Studio
Source: https://www.youtube.com/watch?v=YdR6G8uex00
Confidence: 1.0

## ORG NODE — Guest's organization
Subject: Lit Studio
Type: Org
Source: https://www.youtube.com/watch?v=YdR6G8uex00
Confidence: 0.9

## QUOTE NODE 1
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "um I continued to work for them hybrid and remote. And then like when 2020 hit"
Timestamp: 00:01:25
YouTube deeplink: https://youtu.be/YdR6G8uex00?t=85
Confidence: 1.0

## QUOTE NODE 2
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "anything in those sense or just prominent things from film from film and things like that. But um and then I"
Timestamp: 00:06:54
YouTube deeplink: https://youtu.be/YdR6G8uex00?t=414
Confidence: 1.0

## QUOTE NODE 3
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "last. He was like, you know, I want this like the ownership and like um kind of"
Timestamp: 00:11:55
YouTube deeplink: https://youtu.be/YdR6G8uex00?t=715
Confidence: 1.0

## QUOTE NODE 4
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "you know looking at reports every day to make sure you know it's actually helping"
Timestamp: 00:18:06
YouTube deeplink: https://youtu.be/YdR6G8uex00?t=1086
Confidence: 1.0

## QUOTE NODE 5
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "Catalyst, it was hilarious. Um, Stilo and Catalyst were like the two main people from WaveWarZ that I was"
Timestamp: 00:23:51
YouTube deeplink: https://youtu.be/YdR6G8uex00?t=1431
Confidence: 1.0

## QUOTE NODE 6
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "beginning sessions just like when they were rocking out and I was like, "This"
Timestamp: 00:28:47
YouTube deeplink: https://youtu.be/YdR6G8uex00?t=1727
Confidence: 1.0

## QUOTE NODE 7
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "his journey and everything and his projects really well um that's just kind of become like my main thing that I want"
Timestamp: 00:34:03
YouTube deeplink: https://youtu.be/YdR6G8uex00?t=2043
Confidence: 1.0

## EDGES TO ASSERT
- Zaal Panthaki -[hosted]-> BCZ YapZ w/Gigi (Lit Studio)
- Gigi -[appeared_on]-> BCZ YapZ w/Gigi (Lit Studio)
- Gigi -[part_of]-> Lit Studio
- BCZ YapZ w/Gigi (Lit Studio) -[contains_quote]-> Quote 1 through Quote 7

---
Build the manifest, preview the first 3 nodes inline, then ask me "approve all?". Do not commit until I say yes. If existing Episode/Person/Org nodes match by name, MERGE; do not create parallel nodes. Topics in the description are attributes, not entities.