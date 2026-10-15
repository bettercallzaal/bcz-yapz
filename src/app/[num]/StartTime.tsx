'use client'

import { useEffect, useState } from 'react'
import { upcomingState, type UpcomingState } from '@/lib/upcoming-state'

interface Props {
  startsAt: string
  durationMin: number
}

function countdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000))
  const d = Math.floor(total / 86400)
  const h = Math.floor((total % 86400) / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return d > 0 ? `${d}d ${pad(h)}h ${pad(m)}m` : `${pad(h)}:${pad(m)}:${pad(s)}`
}

export function StartTime({ startsAt, durationMin }: Props) {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const start = new Date(startsAt)
  const eastern = start.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  const state: UpcomingState | null =
    now === null ? null : upcomingState(startsAt, durationMin, now)
  const local =
    now === null
      ? null
      : start.toLocaleString(undefined, {
          weekday: 'short',
          hour: 'numeric',
          minute: '2-digit',
          timeZoneName: 'short',
        })

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f5a623]">
        {state === 'live' ? 'Live now' : state === 'ended' ? 'Aired' : 'Upcoming'}
      </p>
      <p className="mt-2 text-lg font-semibold text-white sm:text-xl">{eastern}</p>
      {local ? <p className="mt-1 text-sm text-white/60">Your time: {local}</p> : null}
      {state === 'upcoming' && now !== null ? (
        <p className="mt-3 font-mono text-2xl text-white sm:text-3xl">
          {countdown(start.getTime() - now)}
        </p>
      ) : null}
      {state === 'ended' ? (
        <p className="mt-3 text-sm text-white/70">
          The replay goes up on YouTube. This page will link to it.
        </p>
      ) : null}
    </div>
  )
}
