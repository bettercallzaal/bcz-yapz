import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllEpisodes } from '@/lib/episodes'

const SITE_URL = 'https://bczyapz.com'

export const metadata: Metadata = {
  title: 'Topics - BCZ YapZ',
  description:
    'Browse BCZ YapZ episodes by topic - web3 music, bounties, governance, Farcaster, coordination, and more.',
  alternates: { canonical: `${SITE_URL}/topics` },
  openGraph: {
    title: 'BCZ YapZ - Topics',
    description: 'Browse the archive by topic.',
    type: 'website',
    url: `${SITE_URL}/topics`,
  },
}

export const revalidate = 3600

export default async function TopicsPage() {
  const episodes = await getAllEpisodes()
  const counts = new Map<string, number>()
  for (const ep of episodes) {
    for (const t of ep.frontmatter.topics) {
      counts.set(t, (counts.get(t) ?? 0) + 1)
    }
  }
  const sorted = [...counts.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  )

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
            Browse the archive
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Topics
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/65 sm:text-base">
            {sorted.length} topics tagged across {episodes.length} episodes.
            Click any topic to see every conversation that touches it.
          </p>

          <ul className="mt-10 flex flex-wrap gap-2 text-sm">
            {sorted.map(([topic, count]) => (
              <li key={topic}>
                <Link
                  href={`/topic/${topic}`}
                  className="inline-flex items-baseline gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/85 transition hover:border-[#f5a623]/60 hover:bg-white/[0.08] hover:text-[#f5a623]"
                >
                  <span>{topic.replace(/-/g, ' ')}</span>
                  <span className="text-xs text-white/45">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
