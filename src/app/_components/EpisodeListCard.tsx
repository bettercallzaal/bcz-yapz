'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Episode } from '@/lib/types'
import type { Chapter } from '@/lib/chapters'

interface EpisodeListCardProps {
  episode: Episode
  displayIndex: number
  chapters: Chapter[] | null
}

export function EpisodeListCard({
  episode,
  displayIndex,
  chapters,
}: EpisodeListCardProps) {
  const { frontmatter, hasYoutube, thumbnailUrl } = episode
  const epNumber = frontmatter.episode ?? displayIndex
  const topics = frontmatter.topics.slice(0, 3)

  return (
    <article className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-white/25 hover:bg-white/[0.05]">
      <Link href={`/ep/${episode.slug}`} className="block">
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-[280px_1fr] md:grid-cols-[320px_1fr]">
          <div
            className={`relative aspect-video w-full overflow-hidden bg-black sm:aspect-auto sm:h-full ${hasYoutube ? '' : 'opacity-50'}`}
          >
            {thumbnailUrl ? (
              <>
                <Image
                  src={thumbnailUrl}
                  alt={`${frontmatter.guest} - BCZ YapZ episode ${epNumber}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 320px"
                  className="object-cover transition group-hover:scale-105"
                />
                {hasYoutube ? (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                    <div className="rounded-full bg-[#f5a623] p-3 shadow-lg">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-[#0a1628]"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="flex h-full items-center justify-center px-3 text-center text-[10px] uppercase tracking-wider text-white/40">
                {hasYoutube ? 'No thumbnail' : 'Recorded - not yet posted'}
              </div>
            )}
            <div className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-[11px] font-bold text-white backdrop-blur">
              EP {epNumber}
            </div>
          </div>
          <div className="flex flex-col p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/55">
              <span>{episode.displayDate ?? 'TBD'}</span>
              {frontmatter.duration_min ? (
                <>
                  <span>·</span>
                  <span>{frontmatter.duration_min} min</span>
                </>
              ) : null}
              {chapters && chapters.length > 0 ? (
                <>
                  <span>·</span>
                  <span>{chapters.length} chapters</span>
                </>
              ) : null}
              {!hasYoutube ? (
                <>
                  <span>·</span>
                  <span className="text-white/40">unposted</span>
                </>
              ) : null}
            </div>
            <h2 className="mt-1.5 text-xl font-bold leading-tight text-white sm:text-2xl">
              {frontmatter.guest}
              {frontmatter.guest_org ? (
                <span className="font-semibold text-white/55">
                  {' · '}
                  {frontmatter.guest_org}
                </span>
              ) : null}
            </h2>
            {frontmatter.summary ? (
              <p className="mt-2.5 line-clamp-3 text-sm text-white/70 sm:text-[15px]">
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
          </div>
        </div>
      </Link>
    </article>
  )
}
