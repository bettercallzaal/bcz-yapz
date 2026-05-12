'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  text: string
}

export function ShareButtons({ url, text }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)
  const farcasterHref = `https://warpcast.com/~/compose?text=${encodedText}&embeds[]=${encodedUrl}`
  const xHref = `https://x.com/intent/post?text=${encodedText}&url=${encodedUrl}`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-white/55">Share</span>
      <a
        href={farcasterHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-white/85 transition hover:border-[#f5a623]/60 hover:text-[#f5a623]"
      >
        Farcaster
      </a>
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-white/85 transition hover:border-[#f5a623]/60 hover:text-[#f5a623]"
      >
        X
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-white/85 transition hover:border-[#f5a623]/60 hover:text-[#f5a623]"
      >
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}
