'use client'

import { useMemo, useState } from 'react'
import type { Episode } from '@/lib/types'
import type { Chapter } from '@/lib/chapters'
import { EpisodeListCard } from './EpisodeListCard'
import { SearchBox } from './SearchBox'
import { TopicChips } from './TopicChips'
import { matchesGuest, sharedTopics } from '@/lib/archive'

interface EpisodeListProps {
  episodes: Episode[]
  chaptersBySlug: Record<string, Chapter[] | null>
}

export function EpisodeList({ episodes, chaptersBySlug }: EpisodeListProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null)
  const [guestQuery, setGuestQuery] = useState('')

  // Only topics two or more episodes share; one-off tags made the chips thin.
  const { topTopics, topicCounts } = useMemo(() => {
    const shared = sharedTopics(episodes)
    return { topTopics: shared.map(([t]) => t), topicCounts: Object.fromEntries(shared) }
  }, [episodes])

  const filtered = useMemo(
    () =>
      episodes.filter(
        (ep) =>
          (!activeTopic || ep.frontmatter.topics.includes(activeTopic)) &&
          matchesGuest(ep, guestQuery)
      ),
    [episodes, activeTopic, guestQuery]
  )
  const isFiltered = Boolean(activeTopic) || guestQuery.trim() !== ''

  return (
    <section className="bg-[#0a1628] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_16rem]">
          <SearchBox />
          <label className="block">
            <span className="sr-only">Filter by guest or project</span>
            <input
              type="search"
              value={guestQuery}
              onChange={(e) => setGuestQuery(e.target.value)}
              placeholder="Guest or project"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[#f5a623]/60 focus:outline-none"
            />
          </label>
        </div>
        <div className="mb-5">
          <TopicChips
            topics={topTopics}
            active={activeTopic}
            onSelect={setActiveTopic}
            counts={topicCounts}
            totalEpisodes={episodes.length}
          />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            {isFiltered ? (
              <>
                <span className="text-white/45">Filtered:</span>{' '}
                {[activeTopic?.replace(/-/g, ' '), guestQuery.trim() ? `"${guestQuery.trim()}"` : null]
                  .filter(Boolean)
                  .join(' + ')}
              </>
            ) : (
              'All episodes'
            )}
            <span className="ml-2 text-base font-normal text-white/45">
              ({filtered.length})
            </span>
          </h2>
        </div>
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-12 text-center text-sm text-white/55">
            No episodes match this filter yet.
          </p>
        ) : (
          <ul className="space-y-4 group/list">
            {filtered.map((episode) => (
              <li key={episode.slug} className="group">
                <EpisodeListCard
                  episode={episode}
                  chapters={chaptersBySlug[episode.slug] ?? null}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
