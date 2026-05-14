'use client'

import { useState } from 'react'
import { BCZ_YAPZ_PAGE } from '@/lib/config'

interface ShareButtonsProps {
  url: string
  guestName: string
  guestOrg?: string
  guestLinks: string[]
}

function parseHandles(links: string[], platform: 'farcaster' | 'x'): string[] {
  const seen = new Set<string>()
  for (const link of links) {
    const match = link.match(/^\s*(\w+)\s*:\s*(.+)$/)
    if (!match) continue
    if (match[1].toLowerCase() !== platform) continue
    const handle = match[2].trim()
    if (handle.startsWith('@')) seen.add(handle)
  }
  return [...seen]
}

function joinHandles(handles: string[], fallback: string): string {
  if (handles.length === 0) return fallback
  if (handles.length === 1) return handles[0]
  if (handles.length === 2) return `${handles[0]} and ${handles[1]}`
  return `${handles.slice(0, -1).join(', ')}, and ${handles[handles.length - 1]}`
}

export function ShareButtons({
  url,
  guestName,
  guestOrg,
  guestLinks,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const fcHost = BCZ_YAPZ_PAGE.follow.farcaster.handle
  const xHost = BCZ_YAPZ_PAGE.follow.x.handle

  const fcGuests = joinHandles(parseHandles(guestLinks, 'farcaster'), guestName)
  const xGuests = joinHandles(parseHandles(guestLinks, 'x'), guestName)
  const orgSuffix = guestOrg ? ` (${guestOrg})` : ''

  const fcText = `Just watched ${fcGuests}${orgSuffix} on ${fcHost}'s BCZ YapZ - great conversation, worth a watch:`
  const xText = `Just watched ${xGuests}${orgSuffix} on ${xHost}'s BCZ YapZ - great conversation, worth a watch:`
  const plainText = `Just watched ${guestName}${orgSuffix} on BCZ YapZ - great conversation, worth a watch:`

  const farcasterHref = `https://farcaster.xyz/~/compose?text=${encodeURIComponent(
    fcText
  )}&embeds[]=${encodeURIComponent(url)}`
  const xHref = `https://x.com/intent/post?text=${encodeURIComponent(
    xText
  )}&url=${encodeURIComponent(url)}`

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(`${plainText} ${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-white/55">Share this episode</span>
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
        onClick={copyShare}
        className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-white/85 transition hover:border-[#f5a623]/60 hover:text-[#f5a623]"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
