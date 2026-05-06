import Image from 'next/image'
import Link from 'next/link'
import type { Episode } from '@/lib/types'

interface FeaturedEpisodeProps {
  episode: Episode
  displayIndex: number
}

export function FeaturedEpisode({ episode, displayIndex }: FeaturedEpisodeProps) {
  const { frontmatter, hasYoutube, thumbnailUrl } = episode
  const epNum = frontmatter.episode ?? displayIndex
  const topics = frontmatter.topics.slice(0, 4)

  return (
    <section className="bg-[#0a1628] px-4 pb-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#f5a623]">
          Latest episode
        </p>
        <Link
          href={`/ep/${episode.slug}`}
          className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-white/30 hover:bg-white/[0.06]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-video w-full overflow-hidden bg-black md:aspect-auto md:h-full">
              {thumbnailUrl ? (
                <>
                  <Image
                    src={thumbnailUrl}
                    alt={`${frontmatter.guest} - BCZ YapZ episode ${epNum}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition group-hover:scale-[1.02]"
                  />
                  {hasYoutube ? (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                      <div className="rounded-full bg-[#f5a623] p-5 shadow-2xl">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-7 w-7 text-[#0a1628]"
                          fill="currentColor"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-white/40">
                  Recorded - not yet posted
                </div>
              )}
              <div className="absolute left-4 top-4 rounded-md bg-black/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                EP {epNum}
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/55">
                <span>{episode.displayDate ?? 'TBD'}</span>
                {frontmatter.duration_min ? (
                  <>
                    <span>·</span>
                    <span>{frontmatter.duration_min} min</span>
                  </>
                ) : null}
                {!hasYoutube ? (
                  <>
                    <span>·</span>
                    <span className="text-white/45">unposted</span>
                  </>
                ) : null}
              </div>
              <h3 className="mt-2 text-3xl font-bold leading-tight text-white sm:text-4xl">
                {frontmatter.guest}
                {frontmatter.guest_org ? (
                  <span className="block text-base font-semibold text-white/55 sm:text-lg">
                    {frontmatter.guest_org}
                  </span>
                ) : null}
              </h3>
              {frontmatter.summary ? (
                <p className="mt-4 line-clamp-5 text-sm text-white/75 sm:text-base">
                  {frontmatter.summary}
                </p>
              ) : null}
              {topics.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-1.5 text-[11px]">
                  {topics.map((topic) => (
                    <li
                      key={topic}
                      className="rounded-full border border-white/10 px-2 py-0.5 text-white/55"
                    >
                      {topic.replace(/-/g, ' ')}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f5a623] transition group-hover:gap-3">
                Open episode
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
