import type { Metadata } from 'next'
import Link from 'next/link'
import { BCZ_YAPZ_PAGE } from '@/lib/config'
import { LiveEmbed } from './LiveEmbed'

const SITE_URL = 'https://bczyapz.com'

export const metadata: Metadata = {
  title: 'Subscribe - BCZ YapZ',
  description:
    'Every way to follow BCZ YapZ - YouTube, Apple Podcasts, Spotify, RSS, Farcaster, X, and live on Twitch.',
  alternates: { canonical: `${SITE_URL}/subscribe` },
  openGraph: {
    title: 'Subscribe to BCZ YapZ',
    description: 'Every way to follow the show.',
    type: 'website',
    url: `${SITE_URL}/subscribe`,
  },
}

interface Channel {
  label: string
  desc: string
  url: string
  primary?: boolean
  badge?: string
}

const channels: Channel[] = [
  {
    label: 'YouTube',
    desc: 'Full video episodes, drops first here every Tuesday.',
    url: 'https://youtube.com/@bettercallzaal',
    primary: true,
  },
  {
    label: 'Apple Podcasts',
    desc: 'Audio episodes via the BCZ YapZ feed.',
    url: 'https://podcasts.apple.com/podcast/bcz-yapz',
    badge: 'coming soon',
  },
  {
    label: 'Spotify',
    desc: 'Audio episodes via the BCZ YapZ feed.',
    url: 'https://open.spotify.com/show/bcz-yapz',
    badge: 'coming soon',
  },
  {
    label: 'Pocket Casts / Overcast / any podcast app',
    desc: 'Add the feed URL directly.',
    url: `${SITE_URL}/feed.xml`,
  },
  {
    label: 'Twitch',
    desc: 'Watch live when Zaal is streaming an interview.',
    url: 'https://twitch.tv/bettercallzaal',
  },
  {
    label: 'Farcaster',
    desc: 'Follow Zaal - new episodes get cast here first.',
    url: BCZ_YAPZ_PAGE.follow.farcaster.url,
  },
  {
    label: '/zao channel on Farcaster',
    desc: 'The community where most of the guests come from.',
    url: BCZ_YAPZ_PAGE.follow.zaoChannel.url,
  },
  {
    label: 'X',
    desc: 'Cross-posted episode drops.',
    url: BCZ_YAPZ_PAGE.follow.x.url,
  },
]

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <header className="border-b border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-xs text-white/60 hover:text-[#f5a623]">
            &larr; All episodes
          </Link>
        </div>
      </header>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
            Follow the show
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Subscribe
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/65 sm:text-base">
            New BCZ YapZ episodes drop weekly on Tuesdays. Pick the
            channel that fits your habits.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="https://youtube.com/@bettercallzaal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#f5a623] px-5 py-3 text-sm font-bold text-[#0a1628] transition hover:brightness-110"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
              </svg>
              Subscribe on YouTube
            </Link>
            <Link
              href="/feed.xml"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              RSS feed
            </Link>
          </div>

          <div className="mt-10">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-xl font-bold sm:text-2xl">
                Live on Twitch
              </h2>
              <Link
                href="/live"
                className="text-sm text-[#f5a623] hover:underline"
              >
                Open /live for player + chat &rarr;
              </Link>
            </div>
            <p className="mb-4 text-xs text-white/55">
              Player shows the channel&apos;s offline panel when not
              streaming. Auto-switches to live when Zaal goes on.
            </p>
            <LiveEmbed />
          </div>

          <h2 className="mt-12 text-xl font-bold sm:text-2xl">
            Every channel
          </h2>
          <div className="mt-4 space-y-3">
            {channels.map((c) => (
              <Link
                key={c.label}
                href={c.url}
                target={c.url.startsWith('http') ? '_blank' : undefined}
                rel={
                  c.url.startsWith('http') ? 'noopener noreferrer' : undefined
                }
                className={`group flex items-center justify-between gap-4 rounded-xl border px-5 py-4 transition ${
                  c.primary
                    ? 'border-[#f5a623]/40 bg-[#f5a623]/[0.06] hover:border-[#f5a623]/70'
                    : 'border-white/10 bg-white/[0.04] hover:border-[#f5a623]/40 hover:bg-white/[0.07]'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="text-base font-semibold text-white sm:text-lg">
                      {c.label}
                    </div>
                    {c.badge ? (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                        {c.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-1 text-xs text-white/55 sm:text-sm">
                    {c.desc}
                  </div>
                </div>
                <div className="text-[#f5a623] transition group-hover:translate-x-1">
                  &rarr;
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-lg font-semibold text-white">
              Want to be a guest?
            </h2>
            <p className="mt-2 text-sm text-white/70">
              DM Zaal on Farcaster (
              <Link
                href={BCZ_YAPZ_PAGE.hostFarcaster}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5a623] hover:underline"
              >
                @zaal
              </Link>
              ) or X (
              <Link
                href="https://x.com/bettercallzaal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5a623] hover:underline"
              >
                @bettercallzaal
              </Link>
              ). If you're building something he should know about, the door
              is open.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
