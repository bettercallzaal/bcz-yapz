'use client'

import { useEffect, useState } from 'react'

const CHANNEL = 'bettercallzaal'

export function LivePlayer() {
  const [parent, setParent] = useState<string | null>(null)

  useEffect(() => {
    setParent(window.location.hostname)
  }, [])

  if (!parent) {
    return <div className="aspect-video w-full bg-black" />
  }

  return (
    <div className="relative aspect-video w-full">
      <iframe
        src={`https://player.twitch.tv/?channel=${CHANNEL}&parent=${parent}&muted=false`}
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        title="bettercallzaal on Twitch"
      />
    </div>
  )
}
