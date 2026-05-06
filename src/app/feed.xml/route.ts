import { getAllEpisodes } from '@/lib/episodes'
import { BCZ_YAPZ_PAGE } from '@/lib/config'

export const revalidate = 3600

const SITE_URL = 'https://bczyapz.com'

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

export async function GET() {
  const episodes = await getAllEpisodes()
  const now = new Date().toUTCString()

  const items = episodes
    .filter((ep) => ep.frontmatter.youtube_url)
    .map((ep) => {
      const fm = ep.frontmatter
      const link = `${SITE_URL}/ep/${ep.slug}`
      const guid = link
      const pubDate = ep.displayDate
        ? toRfc822(ep.displayDate)
        : now
      const description = fm.summary || `${fm.guest} on BCZ YapZ`
      const youtube = fm.youtube_url ?? ''
      const epNum = fm.episode ?? ''
      const duration = fm.duration_min ? `${fm.duration_min}:00` : ''
      const topics = fm.topics.slice(0, 8).map(escapeXml).join(', ')
      const titleParts = [
        epNum ? `Ep ${epNum}` : null,
        fm.guest,
        fm.guest_org ? `(${fm.guest_org})` : null,
      ]
        .filter(Boolean)
        .join(' - ')

      return `    <item>
      <title>${escapeXml(titleParts)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(guid)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      <category>${topics}</category>
      ${duration ? `<itunes:duration>${duration}</itunes:duration>` : ''}
      ${youtube ? `<enclosure url="${escapeXml(youtube)}" type="video/mp4" length="0" />` : ''}
      <author>noreply@bczyapz.com (Zaal)</author>
      <itunes:author>Zaal</itunes:author>
      <itunes:summary><![CDATA[${description}]]></itunes:summary>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BCZ_YAPZ_PAGE.title)}</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(BCZ_YAPZ_PAGE.tagline)}</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>Next.js + bczyapz.com</generator>
    <itunes:author>Zaal</itunes:author>
    <itunes:summary>${escapeXml(BCZ_YAPZ_PAGE.tagline)}</itunes:summary>
    <itunes:owner>
      <itunes:name>Zaal</itunes:name>
      <itunes:email>noreply@bczyapz.com</itunes:email>
    </itunes:owner>
    <itunes:explicit>false</itunes:explicit>
    <itunes:image href="${SITE_URL}/og-image.jpg" />
    <itunes:category text="Technology" />
    <itunes:category text="Music" />
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
