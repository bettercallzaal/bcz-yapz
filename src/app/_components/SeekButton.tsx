'use client'

interface SeekButtonProps {
  sec: number
  label: string
  className?: string
  iframeId?: string
}

const DEFAULT_IFRAME_ID = 'bcz-yt-player'

function seekYouTube(sec: number, iframeId: string) {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement | null
  if (!iframe || !iframe.contentWindow) return false

  iframe.contentWindow.postMessage(
    JSON.stringify({
      event: 'command',
      func: 'seekTo',
      args: [sec, true],
    }),
    '*'
  )
  iframe.contentWindow.postMessage(
    JSON.stringify({
      event: 'command',
      func: 'playVideo',
      args: [],
    }),
    '*'
  )

  iframe.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}

export function SeekButton({
  sec,
  label,
  className,
  iframeId = DEFAULT_IFRAME_ID,
}: SeekButtonProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        const ok = seekYouTube(sec, iframeId)
        if (!ok) return
        e.preventDefault()
      }}
      className={className}
    >
      {label}
    </button>
  )
}
