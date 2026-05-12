'use client'

import { useEffect, useState } from 'react'

const CHANNEL = 'bettercallzaal'
const POLL_MS = 60_000

export function TwitchLiveSwap({ children }: { children: React.ReactNode }) {
  const [isLive, setIsLive] = useState(false)
  const [parent, setParent] = useState<string | null>(null)

  useEffect(() => {
    setParent(window.location.hostname)

    let cancelled = false

    async function check() {
      try {
        const res = await fetch(
          `https://decapi.me/twitch/uptime/${CHANNEL}`,
          { cache: 'no-store' }
        )
        const text = (await res.text()).trim()
        const offline = /offline|not\s+found|404/i.test(text) || text.length === 0
        if (!cancelled) setIsLive(!offline)
      } catch {
        if (!cancelled) setIsLive(false)
      }
    }

    check()
    const id = setInterval(check, POLL_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  if (!isLive || !parent) return <>{children}</>

  return (
    <section className="bg-[#0a1628] px-4 pb-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#f5a623]">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          Live now on Twitch
        </p>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://player.twitch.tv/?channel=${CHANNEL}&parent=${parent}&muted=false`}
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              title="bettercallzaal on Twitch"
            />
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs">
            <span className="text-white/70">@bettercallzaal</span>
            <a
              href={`https://twitch.tv/${CHANNEL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5a623] hover:underline"
            >
              Open on Twitch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
