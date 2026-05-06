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
    <section className="bg-[#0a1628] px-4 pb-2 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
          Latest episode
        </p>
        <Link
          href={`/ep/${episode.slug}`}
          className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-white/30"
        >
          <div className="grid grid-cols-1 sm:grid-cols-5">
            <div className="relative aspect-video bg-black sm:col-span-2 sm:aspect-auto">
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={`${frontmatter.guest} - BCZ YapZ episode ${epNum}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-white/40">
                  Recorded - not yet posted
                </div>
              )}
            </div>
            <div className="p-5 sm:col-span-3 sm:p-6">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/55">
                <span className="font-semibold text-[#f5a623]">Ep {epNum}</span>
                <span>·</span>
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
              <h3 className="mt-1 text-2xl font-bold leading-tight text-white">
                {frontmatter.guest}
                {frontmatter.guest_org ? (
                  <span className="text-white/55"> · {frontmatter.guest_org}</span>
                ) : null}
              </h3>
              {frontmatter.summary ? (
                <p className="mt-3 line-clamp-4 text-sm text-white/75 sm:text-[15px]">
                  {frontmatter.summary}
                </p>
              ) : null}
              {topics.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
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
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-md bg-[#f5a623] px-3 py-1.5 text-xs font-semibold text-[#0a1628] transition group-hover:brightness-110">
                  Open episode -&gt;
                </span>
                {hasYoutube && frontmatter.youtube_url ? (
                  <span className="inline-flex items-center rounded-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/80">
                    Watch on YouTube
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
