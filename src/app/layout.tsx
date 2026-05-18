import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { BCZ_YAPZ_PAGE } from '@/lib/config'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0a1628',
}

const SITE_URL = 'https://bczyapz.com'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

const podcastSeriesLd = {
  '@context': 'https://schema.org',
  '@type': 'PodcastSeries',
  name: BCZ_YAPZ_PAGE.title,
  description: BCZ_YAPZ_PAGE.tagline,
  url: SITE_URL,
  image: OG_IMAGE,
  inLanguage: 'en',
  author: {
    '@type': 'Person',
    name: BCZ_YAPZ_PAGE.hostName,
    url: BCZ_YAPZ_PAGE.hostFarcaster,
  },
  webFeed: `${SITE_URL}/feed.xml`,
  sameAs: [
    BCZ_YAPZ_PAGE.follow.youtube.url,
    BCZ_YAPZ_PAGE.follow.x.url,
    BCZ_YAPZ_PAGE.follow.farcaster.url,
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: BCZ_YAPZ_PAGE.title,
  description: BCZ_YAPZ_PAGE.tagline,
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: BCZ_YAPZ_PAGE.title,
    description: BCZ_YAPZ_PAGE.tagline,
    type: 'website',
    url: SITE_URL,
    siteName: BCZ_YAPZ_PAGE.title,
    images: [
      {
        url: OG_IMAGE,
        width: 1600,
        height: 900,
        alt: 'BCZ YapZ - long-form interviews with web3 builders, hosted by Zaal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BCZ_YAPZ_PAGE.title,
    description: BCZ_YAPZ_PAGE.tagline,
    images: [OG_IMAGE],
    creator: '@bettercallzaal',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesLd) }}
        />
        <Analytics />
      </body>
    </html>
  )
}
