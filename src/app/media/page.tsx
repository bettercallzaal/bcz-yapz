import type { Metadata } from 'next'
import Link from 'next/link'
import { FollowFooter } from '../_components/FollowFooter'
import { getAllEpisodes } from '@/lib/episodes'
import { APPEARANCES, MEDIA_CHECKED_ON, MEDIA_GROUPS } from '@/lib/media'

export const revalidate = 3600

const SITE_URL = 'https://bczyapz.com'

export const metadata: Metadata = {
  title: 'Media and links - BCZ YapZ',
  description:
    'Every BCZ YapZ episode, where Zaal and The ZAO publish, and appearances on other shows. One page of checked links.',
  alternates: { canonical: `${SITE_URL}/media` },
  openGraph: {
    title: 'BCZ YapZ media and links',
    description:
      'Every episode, every channel, and appearances on other shows.',
    url: `${SITE_URL}/media`,
    type: 'website',
  },
}

const externalLinkClass = 'font-semibold text-[#f5a623] hover:underline'

export default async function MediaPage() {
  const episodes = await getAllEpisodes()

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <header className="border-b border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="text-xs text-white/60 hover:text-[#f5a623]">
            &larr; All episodes
          </Link>
        </div>
      </header>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
            Everything in one place
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Media and links
          </h1>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Every BCZ YapZ episode, where Zaal and The ZAO publish, and
            appearances on other people&apos;s shows. Links last checked{' '}
            {MEDIA_CHECKED_ON}.
          </p>

          <h2 className="mt-12 text-xl font-bold sm:text-2xl">
            On other shows
          </h2>
          <ul className="mt-3 space-y-3">
            {APPEARANCES.map((a) => (
              <li
                key={a.url}
                className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="text-xs text-white/55">
                  {a.date} - {a.show}
                </div>
                <Link
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-1 block ${externalLinkClass}`}
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>

          {MEDIA_GROUPS.map((group) => (
            <div key={group.id} id={group.id}>
              <h2 className="mt-10 text-xl font-bold sm:text-2xl">
                {group.title}
              </h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {group.links.map((link) => (
                  <li
                    key={link.url}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3"
                  >
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm ${externalLinkClass}`}
                    >
                      {link.label}
                    </Link>
                    {link.note ? (
                      <span className="ml-2 text-xs text-white/55">
                        {link.note}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h2 className="mt-10 text-xl font-bold sm:text-2xl">
            BCZ YapZ episodes ({episodes.length})
          </h2>
          <ul className="mt-3 divide-y divide-white/10 rounded-lg border border-white/10 bg-white/[0.04]">
            {episodes.map((ep) => (
              <li key={ep.slug} className="px-4 py-3 text-sm">
                <Link
                  href={`/ep/${ep.slug}`}
                  className="text-white/90 hover:text-[#f5a623]"
                >
                  {ep.frontmatter.episode
                    ? `Ep ${ep.frontmatter.episode} - `
                    : ''}
                  {ep.frontmatter.guest}
                  {ep.frontmatter.guest_org
                    ? ` (${ep.frontmatter.guest_org})`
                    : ''}
                </Link>
                {ep.displayDate ? (
                  <span className="ml-2 text-xs text-white/45">
                    {ep.displayDate.slice(0, 10)}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FollowFooter />
    </main>
  )
}
