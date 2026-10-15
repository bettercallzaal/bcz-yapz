import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getAllEpisodes } from '@/lib/episodes'
import { getAllUpcoming } from '@/lib/upcoming'
import { LiveStage } from '@/app/live/LiveStage'
import { StartTime } from './StartTime'

const SITE_URL = 'https://bczyapz.com'

// bczyapz.com/<episode number>. A number with a published page goes to it;
// an upcoming one gets this page: thumbnail, guest, time and the live stream.
export const dynamicParams = false
export const revalidate = 3600

interface PageProps {
  params: Promise<{ num: string }>
}

export async function generateStaticParams() {
  const nums = new Set<number>()
  for (const ep of await getAllEpisodes()) {
    if (ep.frontmatter.episode) nums.add(ep.frontmatter.episode)
  }
  for (const u of getAllUpcoming()) nums.add(u.episode)
  return [...nums].map((n) => ({ num: String(n) }))
}

async function publishedSlug(num: number): Promise<string | null> {
  const episodes = await getAllEpisodes()
  const ep = episodes.find((e) => e.frontmatter.episode === num)
  return ep ? ep.slug : null
}

function findUpcoming(num: number) {
  return getAllUpcoming().find((u) => u.episode === num) ?? null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const num = Number((await params).num)
  const u = findUpcoming(num)
  if (!u) return { title: `Ep ${num} - BCZ YapZ` }
  const title = `Ep ${u.episode} - ${u.guest} - BCZ YapZ`
  const description = u.summary || `${u.guest} on BCZ YapZ`
  const image = u.thumbnail ? `${SITE_URL}${u.thumbnail}` : undefined
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${u.episode}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/${u.episode}`,
      images: image ? [{ url: image, width: 1280, height: 720 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@bettercallzaal',
      images: image ? [image] : undefined,
    },
  }
}

export default async function EpisodeNumberPage({ params }: PageProps) {
  const num = Number((await params).num)
  if (!Number.isInteger(num) || num <= 0) notFound()

  const slug = await publishedSlug(num)
  if (slug) redirect(`/ep/${slug}`)

  const u = findUpcoming(num)
  if (!u) notFound()

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <header className="border-b border-white/10 bg-[#0a1628] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="text-xs text-white/60 hover:text-[#f5a623]">
            &larr; All episodes
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f5a623]">
            Episode {u.episode}
          </p>
        </div>
      </header>

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {u.thumbnail ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
              <Image
                src={u.thumbnail}
                alt={`BCZ YapZ episode ${u.episode} with ${u.guest}`}
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{u.title}</h1>
              <p className="mt-2 text-base text-white/75">
                With {u.guest}
                {u.guest_org ? <span className="text-white/50"> - {u.guest_org}</span> : null}
              </p>
              {u.summary ? (
                <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">{u.summary}</p>
              ) : null}
              {u.topics.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {u.topics.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <a
                  href={u.watch_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-[#f5a623] px-4 py-2 font-semibold text-[#0a1628] transition hover:opacity-90"
                >
                  Watch live
                </a>
                {u.guest_links.map((href) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-white/85 transition hover:border-[#f5a623]/60 hover:text-[#f5a623]"
                  >
                    Follow {u.guest}
                  </a>
                ))}
              </div>
            </div>
            <StartTime startsAt={u.starts_at} durationMin={u.duration_min} />
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-4 text-lg font-semibold text-white">The stream</h2>
          <LiveStage />
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-lg font-semibold text-white">More from Zaal</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-[#f5a623]/60"
            >
              <p className="text-sm font-semibold text-white">BCZ YapZ interviews</p>
              <p className="mt-1 text-xs text-white/60">Every episode, searchable.</p>
            </Link>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">ZABAL Gamez</p>
              <p className="mt-1 text-xs text-white/60">Coming soon.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">X Spaces</p>
              <p className="mt-1 text-xs text-white/60">Coming soon.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
