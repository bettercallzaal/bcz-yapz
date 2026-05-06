'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
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
  const [chaptersOpen, setChaptersOpen] = useState(false)
  const { frontmatter, hasYoutube, thumbnailUrl } = episode
  const epNumber = frontmatter.episode ?? displayIndex
  const topics = frontmatter.topics.slice(0, 3)

  return (
    <article className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-white transition hover:border-white/20">
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-[180px_1fr]">
        <Link
          href={`/ep/${episode.slug}`}
          className={`relative block aspect-video w-full bg-black sm:aspect-auto sm:h-full ${hasYoutube ? '' : 'opacity-60'}`}
        >
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={`${frontmatter.guest} - BCZ YapZ episode ${epNumber}`}
              fill
              sizes="(max-width: 640px) 100vw, 180px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center text-[10px] uppercase tracking-wider text-white/40">
              {hasYoutube ? 'No thumbnail' : 'Unposted'}
            </div>
          )}
        </Link>
        <div className="flex flex-col p-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/55">
            <span className="font-semibold text-[#f5a623]">Ep {epNumber}</span>
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
                <span className="text-white/40">unposted</span>
              </>
            ) : null}
          </div>
          <h2 className="mt-1 text-lg font-semibold">
            <Link
              href={`/ep/${episode.slug}`}
              className="transition hover:text-[#f5a623]"
            >
              {frontmatter.guest}
              {frontmatter.guest_org ? (
                <span className="text-white/55"> · {frontmatter.guest_org}</span>
              ) : null}
            </Link>
          </h2>
          {frontmatter.summary ? (
            <p className="mt-1.5 line-clamp-3 text-sm text-white/70">
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
          <div className="mt-auto pt-4">
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/ep/${episode.slug}`}
                className="inline-flex items-center rounded-md bg-[#f5a623] px-3 py-1.5 text-xs font-semibold text-[#0a1628] transition hover:brightness-110"
              >
                Open episode
              </Link>
              {hasYoutube && frontmatter.youtube_url ? (
                <Link
                  href={frontmatter.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/75 transition hover:border-white/30 hover:text-white"
                >
                  YouTube
                </Link>
              ) : null}
              {chapters && chapters.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setChaptersOpen((v) => !v)}
                  className="inline-flex items-center rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/75 transition hover:border-white/30 hover:text-white"
                >
                  {chaptersOpen ? 'Hide chapters' : `${chapters.length} chapters`}
                </button>
              ) : null}
            </div>
            {chapters && chaptersOpen ? (
              <ol className="mt-3 space-y-1 font-mono text-xs text-white/70">
                {chapters.map((chapter) => (
                  <li key={`${chapter.timestamp}-${chapter.title}`}>
                    <span className="text-[#f5a623]">{chapter.timestamp}</span>
                    <span className="mx-2">-</span>
                    <span>{chapter.title}</span>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
