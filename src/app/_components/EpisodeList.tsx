'use client'

import { useMemo, useState } from 'react'
import type { Episode } from '@/lib/types'
import type { Chapter } from '@/lib/chapters'
import { EpisodeListCard } from './EpisodeListCard'
import { SearchBox } from './SearchBox'
import { TopicChips } from './TopicChips'

const TOP_TOPIC_LIMIT = 12

interface EpisodeListProps {
  episodes: Episode[]
  chaptersBySlug: Record<string, Chapter[] | null>
}

export function EpisodeList({ episodes, chaptersBySlug }: EpisodeListProps) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null)

  const { topTopics, topicCounts } = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const ep of episodes) {
      for (const topic of ep.frontmatter.topics) {
        counts[topic] = (counts[topic] ?? 0) + 1
      }
    }
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, TOP_TOPIC_LIMIT)
      .map(([t]) => t)
    return { topTopics: sorted, topicCounts: counts }
  }, [episodes])

  const filtered = useMemo(() => {
    if (!activeTopic) return episodes
    return episodes.filter((ep) => ep.frontmatter.topics.includes(activeTopic))
  }, [episodes, activeTopic])

  return (
    <section className="bg-[#0a1628] px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5">
          <SearchBox />
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
            {activeTopic ? (
              <>
                <span className="text-white/45">Filtered:</span>{' '}
                {activeTopic.replace(/-/g, ' ')}
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
                  displayIndex={
                    episodes.length -
                    episodes.findIndex((e) => e.slug === episode.slug)
                  }
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
