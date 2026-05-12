import Image from 'next/image'
import Link from 'next/link'
import { BCZ_YAPZ_PAGE } from '@/lib/config'

export function HeroSection() {
  const { tagline, hostName, hostFarcaster, youtubeChannel, follow } =
    BCZ_YAPZ_PAGE

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#0a1628]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/og-image.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/40 via-[#0a1628]/70 to-[#0a1628]" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
          The ZAO presents
        </p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight text-white sm:text-6xl">
          BCZ YapZ
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/80 sm:text-lg">
          {tagline}
        </p>
        <p className="mt-3 text-sm text-white/55">
          Hosted by{' '}
          <Link
            href={hostFarcaster}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f5a623] hover:underline"
          >
            {hostName}
          </Link>
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          <Link
            href="/live"
            className="inline-flex items-center gap-2 rounded-md bg-[#9146ff] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            Watch Live
          </Link>
          <Link
            href={youtubeChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#f5a623] px-4 py-2 text-sm font-semibold text-[#0a1628] transition hover:brightness-110"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
            </svg>
            YouTube
          </Link>
          <Link
            href="/feed.xml"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M3.4 4.7v3a13 13 0 0 1 13 13h3a16 16 0 0 0-16-16zm0 5.7v3a7.3 7.3 0 0 1 7.3 7.3h3a10.3 10.3 0 0 0-10.3-10.3zm2.1 6.1a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2z" />
            </svg>
            RSS
          </Link>
          <Link
            href={follow.farcaster.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
          >
            Farcaster
          </Link>
          <Link
            href={follow.x.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
          >
            X
          </Link>
        </div>
      </div>
    </section>
  )
}
