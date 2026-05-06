'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import FlexSearchModule from 'flexsearch'

const FlexSearch = FlexSearchModule as unknown as {
  Document: new (opts: object) => FlexSearchDoc
}

interface FlexSearchDoc {
  add(doc: SearchDoc): void
  search(
    query: string,
    opts?: { limit?: number }
  ): Array<{ field: string; result: string[] }>
}

interface SearchDoc {
  id: string
  slug: string
  ep: string
  guest: string
  guestOrg?: string
  topics: string[]
  startSec: number
  text: string
}

interface SearchIndex {
  docs: SearchDoc[]
}

function formatTimestamp(sec: number): string {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

function highlight(text: string, query: string): string {
  if (!query) return text
  const lower = text.toLowerCase()
  const q = query.toLowerCase()
  const idx = lower.indexOf(q)
  if (idx === -1) {
    return text.length > 220 ? `${text.slice(0, 220)}...` : text
  }
  const start = Math.max(0, idx - 60)
  const end = Math.min(text.length, idx + q.length + 140)
  const prefix = start > 0 ? '...' : ''
  const suffix = end < text.length ? '...' : ''
  return prefix + text.slice(start, end) + suffix
}

export function SearchBox() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchDoc[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const indexRef = useRef<FlexSearchDoc | null>(null)
  const docsRef = useRef<Map<string, SearchDoc>>(new Map())
  const containerRef = useRef<HTMLDivElement | null>(null)

  async function loadIndex() {
    if (indexRef.current) return
    setLoading(true)
    try {
      const res = await fetch('/search-index.json')
      const data: SearchIndex = await res.json()
      const idx = new FlexSearch.Document({
        document: {
          id: 'id',
          index: ['text', 'guest', 'guestOrg', 'topics', 'ep'],
        },
        tokenize: 'forward',
      })
      for (const doc of data.docs) {
        idx.add(doc)
        docsRef.current.set(doc.id, doc)
      }
      indexRef.current = idx
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    if (!indexRef.current) return
    const hits = indexRef.current.search(query, { limit: 8 })
    const seen = new Set<string>()
    const merged: SearchDoc[] = []
    for (const fieldHits of hits) {
      for (const id of fieldHits.result) {
        if (seen.has(id)) continue
        seen.add(id)
        const doc = docsRef.current.get(id)
        if (doc) merged.push(doc)
        if (merged.length >= 12) break
      }
      if (merged.length >= 12) break
    }
    setResults(merged)
  }, [query])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          loadIndex()
          setOpen(true)
        }}
        placeholder="Search transcripts..."
        className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-[#f5a623] focus:outline-none"
        aria-label="Search transcripts"
      />
      {open && query.trim().length > 0 ? (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-96 overflow-y-auto rounded-md border border-white/10 bg-[#0d1b2a] shadow-lg">
          {loading ? (
            <p className="px-3 py-2 text-xs text-white/60">Loading transcripts...</p>
          ) : results.length === 0 ? (
            <p className="px-3 py-2 text-xs text-white/60">No matches.</p>
          ) : (
            <ul className="divide-y divide-white/5">
              {results.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/ep/${r.slug}#t-${r.startSec}`}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm transition hover:bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-white/60">
                      <span className="font-semibold text-[#f5a623]">
                        {r.ep} - {r.guest}
                        {r.guestOrg ? ` (${r.guestOrg})` : ''}
                      </span>
                      <span className="font-mono">{formatTimestamp(r.startSec)}</span>
                    </div>
                    <p className="mt-1 text-white/80">
                      {highlight(r.text, query)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}
