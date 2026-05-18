import { ImageResponse } from 'next/og'

export const revalidate = 3600
export const size = { width: 3000, height: 3000 }
export const contentType = 'image/png'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #0a1628 0%, #122438 50%, #0a1628 100%)',
          fontFamily: 'system-ui, sans-serif',
          color: '#ffffff',
          position: 'relative',
          padding: 200,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 24,
            background:
              'linear-gradient(90deg, #f5a623 0%, #f5a623 35%, transparent 35%, transparent 65%, #f5a623 65%, #f5a623 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 24,
            background:
              'linear-gradient(90deg, #f5a623 0%, #f5a623 35%, transparent 35%, transparent 65%, #f5a623 65%, #f5a623 100%)',
          }}
        />

        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: 24,
            color: '#f5a623',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          The ZAO presents
        </div>

        <div
          style={{
            fontSize: 480,
            fontWeight: 900,
            color: '#ffffff',
            marginTop: 80,
            lineHeight: 0.95,
            letterSpacing: -8,
            textAlign: 'center',
          }}
        >
          BCZ
        </div>
        <div
          style={{
            fontSize: 480,
            fontWeight: 900,
            color: '#f5a623',
            lineHeight: 0.95,
            letterSpacing: -8,
            textAlign: 'center',
          }}
        >
          YapZ
        </div>

        <div
          style={{
            fontSize: 60,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.7)',
            marginTop: 120,
            maxWidth: 2200,
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          Long-form interviews with web3 builders, music-first founders,
          and coordination misfits. Hosted by Zaal.
        </div>
      </div>
    ),
    { ...size }
  )
}
