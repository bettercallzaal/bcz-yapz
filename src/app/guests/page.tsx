import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllEpisodes } from '@/lib/episodes'

const SITE_URL = 'https://bczyapz.com'

export const metadata: Metadata = {
  title: 'Guests - BCZ YapZ',
  description:
    'Every builder, founder, and organizer Zaal has sat down with on BCZ YapZ.',
  alternates: { canonical: `${SITE_URL}/guests` },
  openGraph: {
    title: 'BCZ YapZ - Guests',
    description: 'The full archive of guests, by appearance.',
    type: 'website',
    url: `${SITE_URL}/guests`,
  },
}

export const revalidate = 3600

export default async function GuestsPage() {
  const episodes = await getAllEpisodes()

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <header className="border-b border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="text-xs text-white/60 hover:text-[#f5a623]">
            &larr; All episodes
          </Link>
        </div>
      </header>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
            The full archive
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Guests
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/65 sm:text-base">
            Every builder, founder, and organizer Zaal has sat down with -
            in order of appearance. Click any card to open the episode.
          </p>

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {episodes.map((ep) => {
              const fm = ep.frontmatter
              const epNum = fm.episode ?? ''
              return (
                <li key={ep.slug}>
                  <Link
                    href={`/ep/${ep.slug}`}
                    className="group block overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition hover:border-[#f5a623]/40 hover:bg-white/[0.07]"
                  >
                    <div className="relative aspect-video w-full bg-black">
                      {ep.thumbnailUrl ? (
                        <Image
                          src={ep.thumbnailUrl}
                          alt={`${fm.guest} on BCZ YapZ`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-white/30">
                          unposted
                        </div>
                      )}
                      {epNum ? (
                        <div className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold backdrop-blur">
                          EP {epNum}
                        </div>
                      ) : null}
                    </div>
                    <div className="p-3">
                      <div className="line-clamp-2 text-sm font-semibold leading-tight text-white">
                        {fm.guest}
                      </div>
                      {fm.guest_org ? (
                        <div className="mt-1 line-clamp-1 text-xs text-white/55">
                          {fm.guest_org}
                        </div>
                      ) : null}
                      {ep.displayDate ? (
                        <div className="mt-2 text-[11px] text-white/40">
                          {ep.displayDate}
                        </div>
                      ) : null}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </main>
  )
}
