'use client'

interface TopicChipsProps {
  topics: string[]
  active: string | null
  onSelect: (topic: string | null) => void
  counts: Record<string, number>
  totalEpisodes: number
}

export function TopicChips({
  topics,
  active,
  onSelect,
  counts,
  totalEpisodes,
}: TopicChipsProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
      <ul className="flex flex-nowrap gap-2 text-xs">
        <li>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className={`whitespace-nowrap rounded-full border px-3 py-1 transition ${
              active === null
                ? 'border-[#f5a623] bg-[#f5a623]/15 text-[#f5a623]'
                : 'border-white/10 bg-white/5 text-white/65 hover:border-white/25 hover:text-white'
            }`}
          >
            All ({totalEpisodes})
          </button>
        </li>
        {topics.map((topic) => (
          <li key={topic}>
            <button
              type="button"
              onClick={() => onSelect(topic)}
              className={`whitespace-nowrap rounded-full border px-3 py-1 transition ${
                active === topic
                  ? 'border-[#f5a623] bg-[#f5a623]/15 text-[#f5a623]'
                  : 'border-white/10 bg-white/5 text-white/65 hover:border-white/25 hover:text-white'
              }`}
            >
              {topic.replace(/-/g, ' ')} ({counts[topic] ?? 0})
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
