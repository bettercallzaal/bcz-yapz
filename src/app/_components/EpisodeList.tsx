'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Episode } from '@/lib/types'
import type { Chapter } from '@/lib/chapters'
import { EpisodeListCard } from './EpisodeListCard'
import { EpisodeGridCard } from './EpisodeGridCard'
import { SearchBox } from './SearchBox'
import { TopicChips } from './TopicChips'

type View = 'list' | 'grid'

const STORAGE_KEY = 'bcz-yapz:view'
const TOP_TOPIC_LIMIT = 12

interface EpisodeListProps {
  episodes: Episode[]
  chaptersBySlug: Record<string, Chapter[] | null>
}

export function EpisodeList({ episodes, chaptersBySlug }: EpisodeListProps) {
  const [view, setView] = useState<View>('list')
  const [mounted, setMounted] = useState(false)
  const [activeTopic, setActiveTopic] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'list' || stored === 'grid') setView(stored)
  }, [])

  useEffect(() => {
    if (!mounted) return
    window.localStorage.setItem(STORAGE_KEY, view)
  }, [view, mounted])

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
    <section className="bg-[#0a1628] px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
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
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {activeTopic ? (
              <>
                <span className="text-white/50">Filtered:</span>{' '}
                {activeTopic.replace(/-/g, ' ')}
              </>
            ) : (
              'All episodes'
            )}
            <span className="ml-2 text-sm font-normal text-white/45">
              ({filtered.length})
            </span>
          </h2>
          <div
            role="radiogroup"
            aria-label="View"
            className="inline-flex overflow-hidden rounded-md border border-white/10 text-xs"
          >
            <button
              type="button"
              role="radio"
              aria-checked={view === 'list'}
              onClick={() => setView('list')}
              className={`px-3 py-1.5 ${
                view === 'list'
                  ? 'bg-[#f5a623] text-[#0a1628]'
                  : 'bg-transparent text-white/65 hover:text-white'
              }`}
            >
              List
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={view === 'grid'}
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 ${
                view === 'grid'
                  ? 'bg-[#f5a623] text-[#0a1628]'
                  : 'bg-transparent text-white/65 hover:text-white'
              }`}
            >
              Grid
            </button>
          </div>
        </div>
        {filtered.length === 0 ? (
          <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-white/55">
            No episodes match this filter yet.
          </p>
        ) : view === 'list' ? (
          <ul className="space-y-3">
            {filtered.map((episode) => (
              <li key={episode.slug}>
                <EpisodeListCard
                  episode={episode}
                  displayIndex={
                    episodes.length - episodes.findIndex((e) => e.slug === episode.slug)
                  }
                  chapters={chaptersBySlug[episode.slug] ?? null}
                />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((episode) => (
              <li key={episode.slug}>
                <EpisodeGridCard
                  episode={episode}
                  displayIndex={
                    episodes.length - episodes.findIndex((e) => e.slug === episode.slug)
                  }
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
