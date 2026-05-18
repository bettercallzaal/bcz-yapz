import type { Metadata } from 'next'
import Link from 'next/link'
import { BCZ_YAPZ_PAGE } from '@/lib/config'

const SITE_URL = 'https://bczyapz.com'

export const metadata: Metadata = {
  title: 'Press kit - BCZ YapZ',
  description:
    'Brand assets, copy, and contact info for BCZ YapZ. Logos, OG art, colors, host bio, official descriptions.',
  alternates: { canonical: `${SITE_URL}/press` },
  openGraph: {
    title: 'BCZ YapZ press kit',
    description: 'Brand assets + official copy.',
    url: `${SITE_URL}/press`,
    type: 'website',
  },
}

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <header className="border-b border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="text-xs text-white/60 hover:text-[#f5a623]">
            &larr; All episodes
          </Link>
        </div>
      </header>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
            For partners, press, and guests
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Press kit
          </h1>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Everything you need to write about, partner with, or cross-promote
            BCZ YapZ. If something is missing, ping{' '}
            <Link
              href={BCZ_YAPZ_PAGE.hostFarcaster}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5a623] hover:underline"
            >
              @zaal on Farcaster
            </Link>
            .
          </p>

          <h2 className="mt-12 text-xl font-bold sm:text-2xl">Show name</h2>
          <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <div className="font-mono text-sm text-white/90">BCZ YapZ</div>
            <div className="mt-2 text-xs text-white/55">
              Always capitalized as "BCZ YapZ" - never "BCZ Yaps" or "bcz
              yapz". One word, capital B-C-Z, capital Y, capital Z at the end.
            </div>
          </div>

          <h2 className="mt-10 text-xl font-bold sm:text-2xl">
            One-line description
          </h2>
          <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-white/90">{BCZ_YAPZ_PAGE.tagline}</p>
          </div>

          <h2 className="mt-10 text-xl font-bold sm:text-2xl">
            Paragraph description
          </h2>
          <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-white/90 leading-relaxed">
              {BCZ_YAPZ_PAGE.about}
            </p>
          </div>

          <h2 className="mt-10 text-xl font-bold sm:text-2xl">Host</h2>
          <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] p-5 space-y-2">
            <p className="text-white/90">
              <span className="font-semibold">Zaal</span> - founder of{' '}
              <Link
                href="https://thezao.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5a623] hover:underline"
              >
                The ZAO
              </Link>
              .
            </p>
            <p className="text-white/70 text-sm">
              Farcaster:{' '}
              <Link
                href={BCZ_YAPZ_PAGE.hostFarcaster}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5a623] hover:underline"
              >
                @zaal
              </Link>
              {' · '}
              X:{' '}
              <Link
                href="https://x.com/bettercallzaal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5a623] hover:underline"
              >
                @bettercallzaal
              </Link>
            </p>
          </div>

          <h2 className="mt-10 text-xl font-bold sm:text-2xl">Colors</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { name: 'Navy', hex: '#0a1628', desc: 'background' },
              { name: 'Gold', hex: '#f5a623', desc: 'accent' },
              { name: 'Soft Navy', hex: '#0d1b2a', desc: 'cards' },
              { name: 'White', hex: '#ffffff', desc: 'text' },
            ].map((c) => (
              <div
                key={c.hex}
                className="overflow-hidden rounded-lg border border-white/10"
              >
                <div
                  className="aspect-video w-full"
                  style={{ background: c.hex }}
                />
                <div className="bg-white/[0.04] p-3">
                  <div className="font-semibold text-white">{c.name}</div>
                  <div className="font-mono text-xs text-white/65">
                    {c.hex}
                  </div>
                  <div className="mt-1 text-xs text-white/45">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-xl font-bold sm:text-2xl">Assets</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href="/og-image.jpg"
              download
              className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#f5a623]/40"
            >
              <div className="font-semibold text-white">OG image</div>
              <div className="mt-1 text-xs text-white/55">
                1600x900 - generic social card
              </div>
              <div className="mt-2 text-xs text-[#f5a623]">Download</div>
            </a>
            <a
              href="/opengraph-image"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#f5a623]/40"
            >
              <div className="font-semibold text-white">Dynamic OG</div>
              <div className="mt-1 text-xs text-white/55">
                1200x630 with live stats baked in
              </div>
              <div className="mt-2 text-xs text-[#f5a623]">Preview</div>
            </a>
            <a
              href="/feed.xml"
              className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#f5a623]/40"
            >
              <div className="font-semibold text-white">RSS feed</div>
              <div className="mt-1 text-xs text-white/55">
                Apple/Spotify-ready podcast RSS
              </div>
              <div className="mt-2 text-xs text-[#f5a623]">Open</div>
            </a>
            <a
              href="/sitemap.xml"
              className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-[#f5a623]/40"
            >
              <div className="font-semibold text-white">Sitemap</div>
              <div className="mt-1 text-xs text-white/55">All eps + pages</div>
              <div className="mt-2 text-xs text-[#f5a623]">Open</div>
            </a>
          </div>

          <h2 className="mt-10 text-xl font-bold sm:text-2xl">Where to find</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { label: 'YouTube', url: BCZ_YAPZ_PAGE.follow.youtube.url },
              {
                label: 'Farcaster',
                url: BCZ_YAPZ_PAGE.follow.farcaster.url,
              },
              { label: 'X', url: BCZ_YAPZ_PAGE.follow.x.url },
              { label: 'Live', url: '/live' },
              { label: 'RSS', url: '/feed.xml' },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.url}
                target={l.url.startsWith('http') ? '_blank' : undefined}
                rel={l.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/85 transition hover:border-[#f5a623]/60 hover:text-[#f5a623]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
