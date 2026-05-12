import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not found - BCZ YapZ',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a1628] px-4 py-20 text-center text-white sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f5a623]">
        BCZ YapZ
      </p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
        404
      </h1>
      <p className="mt-3 max-w-md text-base text-white/70 sm:text-lg">
        That episode wandered off. The archive lives at the index.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md bg-[#f5a623] px-4 py-2 text-sm font-semibold text-[#0a1628] transition hover:brightness-110"
        >
          All episodes
        </Link>
        <Link
          href="/live"
          className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
        >
          Watch live
        </Link>
        <Link
          href="/feed.xml"
          className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
        >
          RSS
        </Link>
      </div>
    </main>
  )
}
