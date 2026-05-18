import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAllEpisodes } from '@/lib/episodes'

const SITE_URL = 'https://bczyapz.com'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const episodes = await getAllEpisodes()
  const topics = new Set<string>()
  for (const ep of episodes)
    for (const t of ep.frontmatter.topics) topics.add(t)
  return [...topics].map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const label = slug.replace(/-/g, ' ')
  const title = `${label} on BCZ YapZ`
  const description = `Every BCZ YapZ episode tagged ${label}.`
  return {
    title: `${label} - BCZ YapZ`,
    description,
    alternates: { canonical: `${SITE_URL}/topic/${slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/topic/${slug}`,
    },
  }
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params
  const episodes = await getAllEpisodes()
  const matching = episodes.filter((ep) =>
    ep.frontmatter.topics.includes(slug)
  )
  if (matching.length === 0) notFound()

  const label = slug.replace(/-/g, ' ')

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <header className="border-b border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/topics"
            className="text-xs text-white/60 hover:text-[#f5a623]"
          >
            &larr; All topics
          </Link>
        </div>
      </header>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f5a623]">
            Topic
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {label}
          </h1>
          <p className="mt-3 text-sm text-white/65 sm:text-base">
            {matching.length} episode{matching.length === 1 ? '' : 's'} tagged{' '}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-white/85">
              {slug}
            </code>
            .
          </p>

          <ul className="mt-10 space-y-4">
            {matching.map((ep) => {
              const fm = ep.frontmatter
              const epNum = fm.episode ?? ''
              return (
                <li key={ep.slug}>
                  <Link
                    href={`/ep/${ep.slug}`}
                    className="group flex gap-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition hover:border-[#f5a623]/40 hover:bg-white/[0.07] sm:gap-5"
                  >
                    <div className="relative aspect-video w-32 flex-shrink-0 bg-black sm:w-48">
                      {ep.thumbnailUrl ? (
                        <Image
                          src={ep.thumbnailUrl}
                          alt={`${fm.guest} on BCZ YapZ`}
                          fill
                          sizes="(max-width: 640px) 128px, 192px"
                          className="object-cover transition group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-white/30">
                          unposted
                        </div>
                      )}
                      {epNum ? (
                        <div className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold backdrop-blur">
                          EP {epNum}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-3 pr-4 sm:p-4">
                      <div className="text-base font-semibold leading-tight text-white sm:text-lg">
                        {fm.guest}
                        {fm.guest_org ? (
                          <span className="block text-sm font-medium text-white/55">
                            {fm.guest_org}
                          </span>
                        ) : null}
                      </div>
                      {ep.displayDate ? (
                        <div className="mt-1 text-xs text-white/40">
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
