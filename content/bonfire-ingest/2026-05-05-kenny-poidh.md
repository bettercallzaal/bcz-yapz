INGEST BATCH: BCZ YapZ Episode 19 — Kenny from POIDH (2026-05-05).

Build a manifest of nodes and edges, preview the first 3 nodes, then ask me to approve. Verbatim quote text must be preserved exactly. Topics, platforms, chains, and tools must be stored as attributes on the Episode node, NEVER as standalone Entity nodes per scope_constraint trait.

## EPISODE NODE
Subject: BCZ YapZ w/Kenny (POIDH)
Type: PodcastEpisode
Date: 2026-05-05
Show: BCZ YapZ
Episode number: 19
Format: video-podcast
YouTube URL: https://www.youtube.com/watch?v=IFG_34K7Vig
YouTube video ID: IFG_34K7Vig
Description: Zaal interviews Kenny from POIDH.
Source: https://www.youtube.com/watch?v=IFG_34K7Vig
Confidence: 1.0

## PERSON NODE — Guest
Subject: Kenny
Type: Person
Role: Founder/team at POIDH
Source: https://www.youtube.com/watch?v=IFG_34K7Vig
Confidence: 1.0

## ORG NODE — Guest's organization
Subject: POIDH
Type: Org
Source: https://www.youtube.com/watch?v=IFG_34K7Vig
Confidence: 0.9

## QUOTE NODE 1
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "podcast, uh, that's a really good one to catch up on, learn more about me and learn more about"
Timestamp: 00:00:55
YouTube deeplink: https://youtu.be/IFG_34K7Vig?t=55
Confidence: 1.0

## QUOTE NODE 2
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "in terms of human coordination out there. Like, everybody understands we don't have a good healthcare"
Timestamp: 00:05:15
YouTube deeplink: https://youtu.be/IFG_34K7Vig?t=315
Confidence: 1.0

## QUOTE NODE 3
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "wallet as well, right? You don't even need to have a social profile connected. Yeah, yeah. That's something that I'm"
Timestamp: 00:09:20
YouTube deeplink: https://youtu.be/IFG_34K7Vig?t=560
Confidence: 1.0

## QUOTE NODE 4
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "clean the community, right? And I was like, "All right, these are good. These are br- but these are kind of broad." Like-"
Timestamp: 00:13:15
YouTube deeplink: https://youtu.be/IFG_34K7Vig?t=795
Confidence: 1.0

## QUOTE NODE 5
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "So it's... Yeah, I don't know if you wanna share a few words on this, um, in addition to that"
Timestamp: 00:17:45
YouTube deeplink: https://youtu.be/IFG_34K7Vig?t=1065
Confidence: 1.0

## QUOTE NODE 6
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "Um, 11 different people created 11 different things, which was awesome. Kenny, you added a little bit"
Timestamp: 00:21:35
YouTube deeplink: https://youtu.be/IFG_34K7Vig?t=1295
Confidence: 1.0

## QUOTE NODE 7
Type: Quote
Speaker: (mark Zaal or guest based on context)
Text (verbatim): "That's what I was saying, 'cause like I'm very curious how we could play around with this. So I'll think about that when I create the"
Timestamp: 00:25:20
YouTube deeplink: https://youtu.be/IFG_34K7Vig?t=1520
Confidence: 1.0

## EDGES TO ASSERT
- Zaal Panthaki -[hosted]-> BCZ YapZ w/Kenny (POIDH)
- Kenny -[appeared_on]-> BCZ YapZ w/Kenny (POIDH)
- Kenny -[part_of]-> POIDH
- BCZ YapZ w/Kenny (POIDH) -[contains_quote]-> Quote 1 through Quote 7

---
Build the manifest, preview the first 3 nodes inline, then ask me "approve all?". Do not commit until I say yes. If existing Episode/Person/Org nodes match by name, MERGE; do not create parallel nodes. Topics in the description are attributes, not entities.