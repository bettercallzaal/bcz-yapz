import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { BCZ_YAPZ_PAGE } from '@/lib/config'
import './globals.css'

const SITE_URL = 'https://bczyapz.com'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: BCZ_YAPZ_PAGE.title,
  description: BCZ_YAPZ_PAGE.tagline,
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
      <body>{children}</body>
    </html>
  )
}
