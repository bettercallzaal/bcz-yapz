import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { BCZ_YAPZ_PAGE } from '@/lib/config'
import './globals.css'

export const metadata: Metadata = {
  title: BCZ_YAPZ_PAGE.title,
  description: BCZ_YAPZ_PAGE.tagline,
  openGraph: {
    title: BCZ_YAPZ_PAGE.title,
    description: BCZ_YAPZ_PAGE.tagline,
    type: 'website',
    url: 'https://bczyapz.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: BCZ_YAPZ_PAGE.title,
    description: BCZ_YAPZ_PAGE.tagline,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
