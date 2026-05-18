import Link from 'next/link'
import { BCZ_YAPZ_PAGE } from '@/lib/config'

export function FollowFooter() {
  const { follow, youtubeChannel } = BCZ_YAPZ_PAGE

  return (
    <footer className="border-t border-white/10 bg-[#0a1628] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
            Subscribe
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#f5a623] px-3 py-2 text-xs font-semibold text-[#0a1628] transition hover:brightness-110"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="currentColor"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
              </svg>
              YouTube
            </Link>
            <Link
              href="/feed.xml"
              className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="currentColor"
              >
                <path d="M3.4 4.7v3a13 13 0 0 1 13 13h3a16 16 0 0 0-16-16zm0 5.7v3a7.3 7.3 0 0 1 7.3 7.3h3a10.3 10.3 0 0 0-10.3-10.3zm2.1 6.1a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2z" />
              </svg>
              RSS
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
            Follow Zaal
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <span className="text-white/45">Farcaster: </span>
              <Link
                href={follow.farcaster.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5a623] hover:underline"
              >
                {follow.farcaster.handle}
              </Link>
            </li>
            <li>
              <span className="text-white/45">X: </span>
              <Link
                href={follow.x.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5a623] hover:underline"
              >
                {follow.x.handle}
              </Link>
            </li>
          </ul>

          <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
            The ZAO
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>
              <Link
                href={follow.zaoChannel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5a623] hover:underline"
              >
                Farcaster channel {follow.zaoChannel.handle}
              </Link>
            </li>
            <li>
              <Link
                href={follow.zaoSite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5a623] hover:underline"
              >
                {follow.zaoSite.label}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl border-t border-white/5 pt-6 text-xs text-white/45">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>BCZ YapZ - long-form interview show, hosted by Zaal. The ZAO presents.</span>
          <Link href="/about" className="hover:text-[#f5a623]">
            About
          </Link>
          <Link href="/subscribe" className="hover:text-[#f5a623]">
            Subscribe
          </Link>
          <Link href="/guests" className="hover:text-[#f5a623]">
            Guests
          </Link>
          <Link href="/topics" className="hover:text-[#f5a623]">
            Topics
          </Link>
          <Link href="/press" className="hover:text-[#f5a623]">
            Press
          </Link>
          <Link href="/live" className="hover:text-[#f5a623]">
            Live
          </Link>
          <Link href="/feed.xml" className="hover:text-[#f5a623]">
            RSS
          </Link>
        </div>
      </div>
    </footer>
  )
}
