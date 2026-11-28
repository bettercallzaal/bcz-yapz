import Image from 'next/image'
import Link from 'next/link'
import { BCZ_YAPZ_PAGE } from '@/lib/config'

interface HeroSectionProps {
  /** Newest episode, for the secondary action. Omitted when there are none. */
  latest?: { slug: string; episode?: number; guest: string } | null
}

const iconLinkClass =
  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:border-[#f5a623]/60 hover:text-[#f5a623]'

export function HeroSection({ latest }: HeroSectionProps) {
  const { tagline, hostName, hostFarcaster, youtubeChannel, follow, newsletter } =
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

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 text-white sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14 lg:px-8 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
            The ZAO presents
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-white sm:text-7xl">
            BCZ YapZ
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl">
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
            <span className="mx-2 text-white/30">·</span>
            Recorded live, archived with full transcripts
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {latest ? (
              <Link
                href={`/ep/${latest.slug}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#f5a623]/60"
              >
                <span aria-hidden="true" className="text-[#f5a623]">
                  &#9654;
                </span>
                Watch the latest
                {latest.episode ? ` (EP ${latest.episode} w/ ${latest.guest})` : ` w/ ${latest.guest}`}
              </Link>
            ) : null}
            <nav aria-label="Follow BCZ YapZ" className="flex items-center gap-2">
              <Link href="/live" aria-label="Watch live" title="Watch live" className={iconLinkClass}>
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
              </Link>
              <Link
                href={youtubeChannel}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
                className={iconLinkClass}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
                </svg>
              </Link>
              <Link
                href={follow.farcaster.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Farcaster ${follow.farcaster.handle}`}
                title={`Farcaster ${follow.farcaster.handle}`}
                className={iconLinkClass}
              >
                <span aria-hidden="true" className="text-xs font-bold">FC</span>
              </Link>
              <Link
                href={follow.x.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`X ${follow.x.handle}`}
                title={`X ${follow.x.handle}`}
                className={iconLinkClass}
              >
                <span aria-hidden="true" className="text-sm font-bold">X</span>
              </Link>
            </nav>
          </div>
        </div>

        <aside
          aria-labelledby="hero-signup-title"
          className="rounded-2xl border border-[#f5a623]/30 bg-[#0a1628]/80 p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8"
        >
          <h2 id="hero-signup-title" className="text-2xl font-bold text-white sm:text-3xl">
            Stay in the loop
          </h2>
          <p className="mt-3 text-sm text-white/70">
            Sign up by email to follow what Zaal and The ZAO are building.
          </p>
          <Link
            href={newsletter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center rounded-md bg-[#f5a623] px-5 py-3 text-base font-semibold text-[#0a1628] transition hover:brightness-110"
          >
            Subscribe by email
          </Link>
          <p className="mt-3 text-xs text-white/45">
            Opens {newsletter.label}, where you enter your email.
          </p>
          <div className="mt-6 border-t border-white/10 pt-4 text-sm text-white/70">
            Building something worth talking about?{' '}
            <Link href="/subscribe#guest" className="font-semibold text-[#f5a623] hover:underline">
              Be a guest
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}
