'use client'

import { useEffect, useState } from 'react'

const CHANNEL = 'bettercallzaal'

export function LiveEmbed() {
  const [parent, setParent] = useState<string | null>(null)

  useEffect(() => {
    setParent(window.location.hostname)
  }, [])

  if (!parent) {
    return <div className="aspect-video w-full rounded-2xl bg-black" />
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://player.twitch.tv/?channel=${CHANNEL}&parent=${parent}&muted=true`}
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          title="bettercallzaal on Twitch"
        />
      </div>
    </div>
  )
}
