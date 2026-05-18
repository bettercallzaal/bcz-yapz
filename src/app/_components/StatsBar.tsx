import type { Episode } from '@/lib/types'

interface StatsBarProps {
  episodes: Episode[]
}

export function StatsBar({ episodes }: StatsBarProps) {
  const published = episodes.filter((e) => e.frontmatter.youtube_url)
  const totalMinutes = published.reduce(
    (sum, e) => sum + (e.frontmatter.duration_min ?? 0),
    0
  )
  const totalHours = (totalMinutes / 60).toFixed(0)
  const topics = new Set<string>()
  for (const e of published) for (const t of e.frontmatter.topics) topics.add(t)
  const guestCount = published.length

  const stats: Array<{ value: string; label: string }> = [
    { value: String(published.length), label: 'episodes' },
    { value: `${totalHours}+`, label: 'hours of conversation' },
    { value: String(guestCount), label: 'guests' },
    { value: String(topics.size), label: 'topics covered' },
  ]

  return (
    <section className="border-y border-white/10 bg-[#0a1628]/80 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <div className="text-3xl font-bold text-[#f5a623] sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-white/55 sm:text-sm">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
