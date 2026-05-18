import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllEpisodes } from '@/lib/episodes'
import { BCZ_YAPZ_PAGE } from '@/lib/config'

const SITE_URL = 'https://bczyapz.com'

export const metadata: Metadata = {
  title: 'About - BCZ YapZ',
  description:
    'BCZ YapZ is a long-form interview show hosted by Zaal. Each episode is a conversation with a builder, founder, or organizer working on something worth understanding.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About BCZ YapZ',
    description: 'The show, the host, the why.',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
}

export const revalidate = 3600

export default async function AboutPage() {
  const episodes = await getAllEpisodes()
  const published = episodes.filter((e) => e.frontmatter.youtube_url)
  const totalMin = published.reduce(
    (s, e) => s + (e.frontmatter.duration_min ?? 0),
    0
  )
  const totalHours = Math.round(totalMin / 60)

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
            The ZAO presents
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            About BCZ YapZ
          </h1>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-white/85 sm:text-lg">
            <p>
              BCZ YapZ is a long-form interview show hosted by Zaal. Each
              episode is a conversation with a builder, founder, or organizer
              working on something worth understanding - web3 music
              distribution, decentralized governance, AI tooling, coordination
              experiments, Maine community infrastructure, and more.
            </p>
            <p>
              Episodes run 25-35 minutes and drop on YouTube, Twitch, and
              (soon) Apple Podcasts + Spotify. Full transcripts are archived
              here so the entire catalog stays searchable - click any timestamp
              on an episode page to jump to that point in the conversation.
            </p>
            <p>
              The show lives inside <Link href="https://thezao.com" target="_blank" rel="noopener noreferrer" className="text-[#f5a623] hover:underline">The ZAO</Link> ecosystem - a 188+ member Farcaster-native community building open social, music, governance, and AI infrastructure. If a guest belongs anywhere in that orbit, they belong on this show.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 border-y border-white/10 py-6">
            <div>
              <div className="text-3xl font-bold text-[#f5a623]">
                {published.length}
              </div>
              <div className="text-xs uppercase tracking-wider text-white/55">
                episodes
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#f5a623]">
                {totalHours}+
              </div>
              <div className="text-xs uppercase tracking-wider text-white/55">
                hours
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#f5a623]">weekly</div>
              <div className="text-xs uppercase tracking-wider text-white/55">
                cadence
              </div>
            </div>
          </div>

          <h2 className="mt-14 text-2xl font-bold sm:text-3xl">
            Hosted by Zaal
          </h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-white/85 sm:text-lg">
            <p>
              Zaal (<Link href={BCZ_YAPZ_PAGE.hostFarcaster} target="_blank" rel="noopener noreferrer" className="text-[#f5a623] hover:underline">@zaal on Farcaster</Link>) founded The ZAO to bring profit-margin data and IP rights back to independent artists. He runs ZAO OS, COC Concertz, WaveWarZ, and a stack of related experiments at the intersection of music, web3, and coordination.
            </p>
            <p>
              The show is one of the ways he meets the people building in
              parallel - and how he gives them a megaphone.
            </p>
          </div>

          <h2 className="mt-14 text-2xl font-bold sm:text-3xl">
            What you can do
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/"
              className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 transition hover:border-[#f5a623]/40 hover:bg-white/[0.08]"
            >
              <div className="text-sm font-semibold text-white">
                Browse the archive
              </div>
              <div className="mt-1 text-xs text-white/60">
                Every episode with searchable transcripts
              </div>
            </Link>
            <Link
              href="/live"
              className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 transition hover:border-[#f5a623]/40 hover:bg-white/[0.08]"
            >
              <div className="text-sm font-semibold text-white">
                Watch live
              </div>
              <div className="mt-1 text-xs text-white/60">
                Tuesdays on Twitch when streaming
              </div>
            </Link>
            <Link
              href={BCZ_YAPZ_PAGE.youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 transition hover:border-[#f5a623]/40 hover:bg-white/[0.08]"
            >
              <div className="text-sm font-semibold text-white">
                Subscribe on YouTube
              </div>
              <div className="mt-1 text-xs text-white/60">
                Episodes drop here first
              </div>
            </Link>
            <Link
              href="/feed.xml"
              className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 transition hover:border-[#f5a623]/40 hover:bg-white/[0.08]"
            >
              <div className="text-sm font-semibold text-white">
                Podcast RSS
              </div>
              <div className="mt-1 text-xs text-white/60">
                For Apple / Spotify / Overcast / Pocket Casts
              </div>
            </Link>
          </div>

          <h2 className="mt-14 text-2xl font-bold sm:text-3xl">Want to be on?</h2>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
            DM Zaal on Farcaster (<Link href={BCZ_YAPZ_PAGE.hostFarcaster} target="_blank" rel="noopener noreferrer" className="text-[#f5a623] hover:underline">@zaal</Link>) or X (<Link href="https://x.com/bettercallzaal" target="_blank" rel="noopener noreferrer" className="text-[#f5a623] hover:underline">@bettercallzaal</Link>). If you're building something he should know about, the door is open.
          </p>
        </div>
      </section>
    </main>
  )
}
