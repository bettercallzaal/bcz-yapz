'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { StartTime } from '@/app/[num]/StartTime'
import { currentUpcoming } from '@/lib/upcoming-state'
import type { Upcoming } from '@/lib/upcoming'

interface Props {
  upcoming: Upcoming[]
  initial: Upcoming | null
}

// /live is prerendered, so the build picks the first episode shown and the
// browser re-picks it, which drops a guest once their episode has ended.
export function LiveGuest({ upcoming, initial }: Props) {
  const [u, setU] = useState(initial)

  useEffect(() => {
    const pick = () => setU(currentUpcoming(upcoming, Date.now()))
    pick()
    const id = setInterval(pick, 60_000)
    return () => clearInterval(id)
  }, [upcoming])

  if (!u) return null

  return (
    <div className="mb-8">
      {u.thumbnail ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
          <Image
            src={u.thumbnail}
            alt={`BCZ YapZ episode ${u.episode} with ${u.guest}`}
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f5a623]">
            Episode {u.episode}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{u.title}</h2>
          {u.summary ? (
            <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">{u.summary}</p>
          ) : null}
          {u.guest_links.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {u.guest_links.map((href) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white/85 transition hover:border-[#f5a623]/60 hover:text-[#f5a623]"
                >
                  Follow {u.guest}
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <StartTime startsAt={u.starts_at} durationMin={u.duration_min} />
      </div>
    </div>
  )
}
