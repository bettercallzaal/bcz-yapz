import { ImageResponse } from 'next/og'
import { getAllEpisodes } from '@/lib/episodes'

export const revalidate = 3600
export const alt = 'BCZ YapZ - long-form interviews with web3 builders'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const episodes = await getAllEpisodes()
  const published = episodes.filter((e) => e.frontmatter.youtube_url)
  const totalMinutes = published.reduce(
    (sum, e) => sum + (e.frontmatter.duration_min ?? 0),
    0
  )
  const totalHours = Math.round(totalMinutes / 60)
  const topics = new Set<string>()
  for (const e of published) for (const t of e.frontmatter.topics) topics.add(t)

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #0a1628 0%, #112138 50%, #0a1628 100%)',
          padding: 72,
          fontFamily: 'system-ui, sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              'linear-gradient(90deg, #f5a623 0%, #f5a623 35%, transparent 35%, transparent 65%, #f5a623 65%, #f5a623 100%)',
          }}
        />

        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 6,
            color: '#f5a623',
            textTransform: 'uppercase',
          }}
        >
          The ZAO presents
        </div>

        <div
          style={{
            fontSize: 160,
            fontWeight: 900,
            color: '#ffffff',
            marginTop: 16,
            lineHeight: 1,
          }}
        >
          BCZ YapZ
        </div>

        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.75)',
            marginTop: 24,
            maxWidth: 980,
            lineHeight: 1.25,
          }}
        >
          Long-form interviews with web3 builders, music-first founders,
          and coordination misfits.
        </div>

        <div
          style={{
            display: 'flex',
            gap: 48,
            marginTop: 'auto',
            fontSize: 26,
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
            <span style={{ fontSize: 40, fontWeight: 800, color: '#f5a623' }}>
              {published.length}
            </span>
            <span>episodes</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
            <span style={{ fontSize: 40, fontWeight: 800, color: '#f5a623' }}>
              {totalHours}
            </span>
            <span>hours</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
            <span style={{ fontSize: 40, fontWeight: 800, color: '#f5a623' }}>
              {topics.size}
            </span>
            <span>topics</span>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              color: '#f5a623',
              fontWeight: 700,
              fontSize: 26,
            }}
          >
            bczyapz.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
