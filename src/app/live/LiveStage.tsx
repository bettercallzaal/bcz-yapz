'use client'

import { useEffect, useState } from 'react'

const CHANNEL = 'bettercallzaal'

export function LiveStage() {
  const [parent, setParent] = useState<string | null>(null)

  useEffect(() => {
    setParent(window.location.hostname)
  }, [])

  if (!parent) {
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="aspect-video w-full rounded-2xl border border-white/10 bg-black" />
        <div className="h-[420px] rounded-2xl border border-white/10 bg-black lg:h-auto" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
        <div className="relative aspect-video w-full">
          <iframe
            src={`https://player.twitch.tv/?channel=${CHANNEL}&parent=${parent}&muted=false`}
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            title="bettercallzaal on Twitch"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
        <iframe
          src={`https://www.twitch.tv/embed/${CHANNEL}/chat?parent=${parent}&darkpopout`}
          className="h-[420px] w-full border-0 lg:h-full lg:min-h-[480px]"
          title="Twitch chat"
        />
      </div>
    </div>
  )
}
