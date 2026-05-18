import { ImageResponse } from 'next/og'
import { getAllEpisodes } from '@/lib/episodes'

export const revalidate = 3600
export const alt = 'BCZ YapZ episode'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface OgProps {
  params: Promise<{ slug: string }>
}

export default async function OpengraphImage({ params }: OgProps) {
  const { slug } = await params
  const episodes = await getAllEpisodes()
  const ep = episodes.find((e) => e.slug === slug)

  const fm = ep?.frontmatter
  const epNum = fm?.episode ?? ''
  const guest = fm?.guest ?? 'BCZ YapZ'
  const guestOrg = fm?.guest_org
  const duration = fm?.duration_min ? `${fm.duration_min} min` : null
  const date = ep?.displayDate

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
          padding: 64,
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 6,
              color: '#f5a623',
              textTransform: 'uppercase',
            }}
          >
            The ZAO presents
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 24,
            marginTop: 16,
          }}
        >
          <div style={{ fontSize: 96, fontWeight: 900, color: '#ffffff' }}>
            BCZ YapZ
          </div>
          {epNum ? (
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: '#f5a623',
                letterSpacing: 2,
              }}
            >
              EP {epNum}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#ffffff',
              maxWidth: 1000,
            }}
          >
            {guest}
          </div>
          {guestOrg ? (
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.6)',
                marginTop: 10,
              }}
            >
              {guestOrg}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginTop: 32,
            fontSize: 22,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          {date ? <div>{date}</div> : null}
          {date && duration ? <div>·</div> : null}
          {duration ? <div>{duration}</div> : null}
          {(date || duration) && <div>·</div>}
          <div>hosted by BetterCallZaal</div>
          <div style={{ marginLeft: 'auto', color: '#f5a623', fontWeight: 700 }}>
            bczyapz.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
