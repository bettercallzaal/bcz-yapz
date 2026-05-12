import type { Metadata } from 'next'
import Link from 'next/link'
import { LiveStage } from './LiveStage'

const SITE_URL = 'https://bczyapz.com'

export const metadata: Metadata = {
  title: 'Live - BCZ YapZ',
  description:
    'Watch BetterCallZaal live on Twitch. Long-form conversations, music-first founders, web3 builders.',
  alternates: { canonical: `${SITE_URL}/live` },
  openGraph: {
    title: 'BCZ YapZ - Live',
    description: 'Watch BetterCallZaal live on Twitch.',
    type: 'website',
    url: `${SITE_URL}/live`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCZ YapZ - Live',
    description: 'Watch BetterCallZaal live on Twitch.',
    creator: '@bettercallzaal',
  },
}

export default function LivePage() {
  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <header className="border-b border-white/10 bg-[#0a1628] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-xs text-white/60 hover:text-[#f5a623]"
          >
            &larr; All episodes
          </Link>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#f5a623]">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            Live
          </p>
        </div>
      </header>

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                BCZ YapZ Live
              </h1>
              <p className="mt-2 text-sm text-white/65 sm:text-base">
                Streaming on twitch.tv/bettercallzaal. Offline panel shows when
                not live.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs">
              <a
                href="https://twitch.tv/bettercallzaal"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-white/85 transition hover:border-[#f5a623]/60 hover:text-[#f5a623]"
              >
                Open on Twitch
              </a>
              <a
                href="https://twitch.tv/bettercallzaal/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-white/85 transition hover:border-[#f5a623]/60 hover:text-[#f5a623]"
              >
                Pop-out chat
              </a>
            </div>
          </div>

          <LiveStage />
        </div>
      </section>
    </main>
  )
}
