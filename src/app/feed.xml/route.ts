import { getAllEpisodes } from '@/lib/episodes'
import { BCZ_YAPZ_PAGE } from '@/lib/config'

export const revalidate = 3600

const SITE_URL = 'https://bczyapz.com'
const OWNER_NAME = 'Zaal'
const OWNER_EMAIL = 'zaalp99@gmail.com'
const PODCAST_COVER = `${SITE_URL}/podcast-cover.jpg`

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(date: string): string {
  return new Date(date).toUTCString()
}

function toHms(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}

export async function GET() {
  const episodes = await getAllEpisodes()
  const now = new Date().toUTCString()

  const items = episodes
    .filter((ep) => ep.frontmatter.audio_url)
    .map((ep) => {
      const fm = ep.frontmatter
      const link = `${SITE_URL}/ep/${ep.slug}`
      const guid = fm.audio_url ?? link
      const pubDate = ep.displayDate ? toRfc822(ep.displayDate) : now
      const description = fm.summary || `${fm.guest} on BCZ YapZ`
      const epNum = fm.episode
      const durationSec =
        fm.audio_duration_sec ??
        (fm.duration_min ? fm.duration_min * 60 : null)
      const durationStr = durationSec ? toHms(durationSec) : null
      const enclosureUrl = fm.audio_url!
      const enclosureBytes = fm.audio_bytes ?? 0
      const enclosureMime = fm.audio_mime ?? 'audio/mpeg'
      const titleParts = [
        epNum ? `Ep ${epNum}` : null,
        fm.guest,
        fm.guest_org ? `(${fm.guest_org})` : null,
      ]
        .filter(Boolean)
        .join(' - ')
      const imageHref = ep.thumbnailUrl ?? PODCAST_COVER

      return `    <item>
      <title>${escapeXml(titleParts)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(guid)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      <enclosure url="${escapeXml(enclosureUrl)}" length="${enclosureBytes}" type="${enclosureMime}" />
      ${durationStr ? `<itunes:duration>${durationStr}</itunes:duration>` : ''}
      ${epNum ? `<itunes:episode>${epNum}</itunes:episode>` : ''}
      <itunes:episodeType>full</itunes:episodeType>
      <itunes:explicit>false</itunes:explicit>
      <itunes:author>${escapeXml(OWNER_NAME)}</itunes:author>
      <itunes:summary><![CDATA[${description}]]></itunes:summary>
      <itunes:image href="${escapeXml(imageHref)}" />
      <author>${escapeXml(OWNER_EMAIL)} (${escapeXml(OWNER_NAME)})</author>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BCZ_YAPZ_PAGE.title)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(BCZ_YAPZ_PAGE.tagline)}</description>
    <language>en-us</language>
    <copyright>(c) ${new Date().getFullYear()} ${escapeXml(OWNER_NAME)}</copyright>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>Next.js + bczyapz.com</generator>
    <itunes:author>${escapeXml(OWNER_NAME)}</itunes:author>
    <itunes:summary>${escapeXml(BCZ_YAPZ_PAGE.tagline)}</itunes:summary>
    <itunes:owner>
      <itunes:name>${escapeXml(OWNER_NAME)}</itunes:name>
      <itunes:email>${escapeXml(OWNER_EMAIL)}</itunes:email>
    </itunes:owner>
    <itunes:explicit>false</itunes:explicit>
    <itunes:image href="${PODCAST_COVER}" />
    <itunes:category text="Technology" />
    <itunes:category text="Music">
      <itunes:category text="Music Interviews" />
    </itunes:category>
    <itunes:type>episodic</itunes:type>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
