<!--
BCZ YapZ YouTube Description Template
======================================
Fill the {{placeholders}} per episode. Paste the body (everything between the
START BODY and END BODY markers below) directly into the YouTube description
field. Paste the tags from `youtube-tags.txt` into the YouTube tags field
separately.

Title format (line 1, also used for YouTube video title):
  `BCZ YapZ Episode {{episode}} w/ {{guest}} from {{guest_org}}`
  Examples:
    BCZ YapZ Episode 19 w/ Kenny from POIDH
    BCZ YapZ Episode 18 w/ Andy Minton from Hangry Animals

Placeholder map -> transcript frontmatter (content/transcripts/*.md):
  {{episode}}            -> frontmatter.episode (integer)
  {{guest}}              -> frontmatter.guest
  {{guest_alias}}        -> frontmatter.guest_alias (fallback to first name)
  {{guest_role_at_org}}  -> "{{role}} at {{guest_org}}" e.g. "founder of POIDH"
  {{guest_org}}          -> frontmatter.guest_org
  {{core_topic}}         -> from summary
  {{one_line_context}}   -> who guest is + why this convo matters
  {{paragraph_2}}        -> 3-5 concrete beats from the ep, grounded
  {{paragraph_3}}        -> why it matters for ZAO / builders / musicians
  {{mm:ss}}              -> mm:ss chapter timestamp (round DOWN to nearest 5s)
  {{chapter_N_title}}    -> content-specific label, <50 chars
  {{entities.people}}    -> "{Name} ({handle if known})" comma-separated
  {{entities.projects}}  -> "{Project} - {url}" comma-separated
  {{entities.orgs}}      -> "{Org} - {url}" comma-separated
  {{guest_links}}        -> one line per link: "- {platform}: {handle or url}"
  {{playlist_url}}       -> BCZ YapZ playlist URL on YouTube. Default placeholder
                            until the canonical playlist URL is pinned:
                            https://youtube.com/@bettercallzaal (channel page, not
                            a specific playlist). Replace with the real BCZ YapZ
                            playlist link once created.

Empty-field handling:
- If `entities.people` empty -> omit the "People:" line.
- If `entities.projects` empty -> omit the "Projects:" line.
- If `entities.orgs` empty -> omit the "Orgs:" line.
- If the whole "MENTIONED IN THIS EPISODE" block would be empty, omit the
  section header + block entirely.
- If `guest_links` empty -> omit the entire "FOLLOW {{guest}}" block.

Rules:
- 10-15 chapters. First MUST be 0:00. Minimum 60s between chapters.
- CHAPTERS block at the BOTTOM of the description (after THE ZAO).
- No emojis. No em dashes. No hashtags in body.
- Zaal Farcaster handle is @zaal. X + YouTube are @bettercallzaal.
- ZAO Farcaster channel is /zao (NOT /thezao).
- Target body length 2,500-3,000 chars. Hard cap 4,800.
- No Warpcast - always Farcaster.
-->

--- START BODY ---

BCZ YapZ Episode {{episode}} w/ {{guest}} from {{guest_org}}

I sat down with {{guest}} ({{guest_role_at_org}}) to talk {{core_topic}}. {{one_line_context}}.

{{paragraph_2}}

{{paragraph_3}}

MENTIONED IN THIS EPISODE
People: {{entities.people}}
Projects: {{entities.projects}}
Orgs: {{entities.orgs}}

FOLLOW {{guest}}
{{guest_links}}

BCZ YAPZ
Playlist: {{playlist_url}}
Farcaster: @zaal
X: @bettercallzaal
YouTube: @bettercallzaal

THE ZAO
Site: https://thezao.com
Farcaster channel: /zao (https://farcaster.xyz/~/channel/zao)

CHAPTERS
0:00 - Welcome + who is {{guest_alias}}
{{mm:ss}} - {{chapter_2_title}}
{{mm:ss}} - {{chapter_3_title}}
{{mm:ss}} - {{chapter_4_title}}
{{mm:ss}} - {{chapter_5_title}}
{{mm:ss}} - {{chapter_6_title}}
{{mm:ss}} - {{chapter_7_title}}
{{mm:ss}} - {{chapter_8_title}}
{{mm:ss}} - {{chapter_9_title}}
{{mm:ss}} - {{chapter_10_title}}
{{mm:ss}} - Outro + where to find {{guest_alias}}

--- END BODY ---
