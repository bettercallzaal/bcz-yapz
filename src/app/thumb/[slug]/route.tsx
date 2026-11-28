import { ImageResponse } from 'next/og'
import { getAllEpisodes } from '@/lib/episodes'
import { formatThumbDate } from '@/lib/thumbnail'

// Code-drawn 1280x720 episode thumbnail, laid out like the hand-made EP 27
// card (title band, guest centre, host / date / guest bar) in the site palette.
// Used for every episode without a thumbnail_override; a Canva file in
// public/thumbnails replaces it per episode.

export const dynamic = 'force-static'
export const revalidate = 3600

// Prerender one image per episode at build time; rendering per request costs
// CPU on the Vercel Hobby cap (same reason as ep/[slug]/opengraph-image).
export async function generateStaticParams() {
  const episodes = await getAllEpisodes()
  return episodes.map((ep) => ({ slug: ep.slug }))
}

const NAVY = '#0a1628'
const GOLD = '#f5a623'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const episodes = await getAllEpisodes()
  const ep = episodes.find((e) => e.slug === slug)
  if (!ep) return new Response('not found', { status: 404 })

  const fm = ep.frontmatter
  const guest = fm.guest
  const org = fm.guest_org
  const date = formatThumbDate(ep.displayDate)
  const nameSize = guest.length > 22 ? 84 : guest.length > 14 ? 104 : 128

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: NAVY,
          backgroundImage: `radial-gradient(circle at 50% 45%, #16294a 0%, ${NAVY} 70%)`,
          fontFamily: 'system-ui, sans-serif',
          color: 'white',
        }}
      >
        {/* Title band */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '44px 64px 0',
          }}
        >
          <div style={{ display: 'flex', fontSize: 96, fontWeight: 900, letterSpacing: -2, color: GOLD }}>
            BCZ YAPZ
          </div>
          {fm.episode ? (
            <div
              style={{
                display: 'flex',
                fontSize: 44,
                fontWeight: 800,
                color: NAVY,
                backgroundColor: GOLD,
                borderRadius: 16,
                padding: '10px 26px',
              }}
            >
              {`EP ${fm.episode}`}
            </div>
          ) : null}
        </div>

        {/* Guest */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 64px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', fontSize: 30, letterSpacing: 8, color: 'rgba(255,255,255,0.6)' }}>
            IN CONVERSATION WITH
          </div>
          <div style={{ display: 'flex', fontSize: nameSize, fontWeight: 900, lineHeight: 1.05, marginTop: 12 }}>
            {guest}
          </div>
          {org ? (
            <div style={{ display: 'flex', fontSize: 48, fontWeight: 600, color: GOLD, marginTop: 14 }}>
              {org}
            </div>
          ) : null}
        </div>

        {/* Host / date / guest bar */}
        <div style={{ display: 'flex', alignItems: 'stretch', margin: '0 48px 48px', height: 92 }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              color: NAVY,
              fontSize: 34,
              fontWeight: 800,
              borderRadius: '14px 0 0 14px',
            }}
          >
            BETTERCALLZAAL
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: GOLD,
              color: NAVY,
              fontSize: 40,
              fontWeight: 900,
              padding: '0 40px',
            }}
          >
            {date ?? 'BCZ YAPZ'}
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              color: NAVY,
              fontSize: 34,
              fontWeight: 800,
              borderRadius: '0 14px 14px 0',
              padding: '0 16px',
            }}
          >
            {guest.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    { width: 1280, height: 720 }
  )
}
