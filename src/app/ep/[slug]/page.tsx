import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getAllEpisodes } from '@/lib/episodes'
import { parseChapters } from '@/lib/chapters'
import { parseTranscript, formatTimestamp } from '@/lib/transcript'
import { relatedEpisodes } from '@/lib/related'
import { BCZ_YAPZ_PAGE } from '@/lib/config'
import { ShareButtons } from '@/app/_components/ShareButtons'

const SITE_URL = 'https://bczyapz.com'

function isoDuration(min: number | undefined): string | undefined {
  if (!min) return undefined
  return `PT${min}M`
}

export const revalidate = 3600

export async function generateStaticParams() {
  const episodes = await getAllEpisodes()
  return episodes.map((ep) => ({ slug: ep.slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const episodes = await getAllEpisodes()
  const ep = episodes.find((e) => e.slug === slug)
  if (!ep) return { title: 'Episode not found - BCZ YapZ' }

  const fm = ep.frontmatter
  const epNum = fm.episode ?? ''
  const title = `${epNum ? `Ep ${epNum} - ` : ''}${fm.guest}${fm.guest_org ? ` (${fm.guest_org})` : ''} - BCZ YapZ`
  const description = fm.summary || `${fm.guest} on BCZ YapZ`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://bczyapz.com/ep/${slug}`,
      images: ep.thumbnailUrl
        ? [{ url: ep.thumbnailUrl, width: 1280, height: 720, alt: title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ep.thumbnailUrl ? [ep.thumbnailUrl] : undefined,
    },
  }
}

export default async function EpisodePage({ params }: PageProps) {
  const { slug } = await params
  const episodes = await getAllEpisodes()
  const ep = episodes.find((e) => e.slug === slug)
  if (!ep) notFound()

  const fm = ep.frontmatter
  const epNum = fm.episode ?? episodes.findIndex((e) => e.slug === slug) + 1
  const chapters = await parseChapters(slug)
  const transcript = parseTranscript(slug)
  const related = relatedEpisodes(ep, episodes, 3)

  const youtubeId = fm.youtube_video_id
  const youtubeUrl = fm.youtube_url
  const episodeUrl = `${SITE_URL}/ep/${slug}`

  const shareTitle = `${fm.guest}${fm.guest_org ? ` (${fm.guest_org})` : ''} on BCZ YapZ`

  const episodeLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: shareTitle,
    url: episodeUrl,
    description: fm.summary || `${fm.guest} on BCZ YapZ`,
    datePublished: ep.displayDate ?? undefined,
    timeRequired: isoDuration(fm.duration_min),
    image: ep.thumbnailUrl ?? undefined,
    inLanguage: fm.language ?? 'en',
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'BCZ YapZ',
      url: SITE_URL,
    },
    author: {
      '@type': 'Person',
      name: fm.host,
      url: BCZ_YAPZ_PAGE.hostFarcaster,
    },
  }

  if (youtubeUrl) {
    episodeLd.associatedMedia = {
      '@type': 'MediaObject',
      contentUrl: youtubeUrl,
      embedUrl: youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : undefined,
    }
  }

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeLd) }}
      />
      <header className="border-b border-white/10 bg-[#0a1628] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/" className="text-xs text-white/60 hover:text-[#f5a623]">
            &larr; All episodes
          </Link>
          <p className="mt-3 text-xs text-white/60">
            <span className="font-semibold text-[#f5a623]">Ep {epNum}</span>
            {ep.displayDate ? <> · {ep.displayDate}</> : null}
            {fm.duration_min ? <> · {fm.duration_min} min</> : null}
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            {fm.guest}
            {fm.guest_org ? (
              <span className="text-white/60"> · {fm.guest_org}</span>
            ) : null}
          </h1>
          {fm.summary ? (
            <p className="mt-3 text-sm text-white/80 sm:text-base">{fm.summary}</p>
          ) : null}
          <div className="mt-5">
            <ShareButtons url={episodeUrl} text={shareTitle} />
          </div>
        </div>
      </header>

      {youtubeId ? (
        <section className="bg-[#0a1628] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto aspect-video max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
              title={`BCZ YapZ ep ${epNum} with ${fm.guest}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </section>
      ) : youtubeUrl ? (
        <section className="bg-[#0a1628] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-[#f5a623] px-5 py-2.5 text-sm font-semibold text-[#0a1628] transition hover:brightness-110"
            >
              Watch on YouTube
            </Link>
          </div>
        </section>
      ) : null}

      {chapters && chapters.length > 0 ? (
        <section className="bg-[#0a1628] px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-lg font-semibold">Chapters</h2>
            <ol className="mt-3 space-y-1 font-mono text-sm">
              {chapters.map((ch) => (
                <li key={`${ch.timestamp}-${ch.title}`}>
                  {youtubeId ? (
                    <Link
                      href={`https://youtu.be/${youtubeId}?t=${chapterToSec(ch.timestamp)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 hover:text-[#f5a623]"
                    >
                      <span className="text-[#f5a623]">{ch.timestamp}</span>
                      <span className="mx-2">-</span>
                      <span>{ch.title}</span>
                    </Link>
                  ) : (
                    <>
                      <span className="text-[#f5a623]">{ch.timestamp}</span>
                      <span className="mx-2">-</span>
                      <span className="text-white/80">{ch.title}</span>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {fm.topics.length > 0 ? (
        <section className="bg-[#0a1628] px-4 py-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <ul className="flex flex-wrap gap-2 text-xs">
              {fm.topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-white/10 px-2 py-0.5 text-white/60"
                >
                  {topic.replace(/-/g, ' ')}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {transcript && transcript.paragraphs.length > 0 ? (
        <section className="bg-[#0a1628] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-lg font-semibold">Transcript</h2>
            <p className="mt-1 text-xs text-white/50">
              Click any timestamp to jump to that point in the YouTube video.
            </p>
            <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-white/85">
              {transcript.paragraphs.map((para, idx) => (
                <p key={`${para.startSec}-${idx}`} id={`t-${para.startSec}`}>
                  {youtubeId ? (
                    <Link
                      href={`https://youtu.be/${youtubeId}?t=${para.startSec}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mr-2 inline-block font-mono text-xs text-[#f5a623] hover:underline"
                    >
                      [{formatTimestamp(para.startSec)}]
                    </Link>
                  ) : (
                    <span className="mr-2 inline-block font-mono text-xs text-white/50">
                      [{formatTimestamp(para.startSec)}]
                    </span>
                  )}
                  {para.text}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="border-t border-white/10 bg-[#0a1628] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-lg font-semibold">Related episodes</h2>
            <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {related.map((relEp) => {
                const relNum = relEp.frontmatter.episode ?? ''
                return (
                  <li key={relEp.slug}>
                    <Link
                      href={`/ep/${relEp.slug}`}
                      className="block overflow-hidden rounded-lg border border-white/10 bg-white/5 transition hover:border-white/30"
                    >
                      <div className="relative aspect-video w-full bg-[#0a1628]">
                        {relEp.thumbnailUrl ? (
                          <Image
                            src={relEp.thumbnailUrl}
                            alt={`${relEp.frontmatter.guest} - BCZ YapZ episode ${relNum}`}
                            fill
                            sizes="(max-width: 640px) 100vw, 33vw"
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold">
                          {relEp.frontmatter.guest}
                        </p>
                        <p className="mt-0.5 text-xs text-white/60">
                          {relNum ? `Ep ${relNum}` : ''}
                          {relEp.displayDate ? ` · ${relEp.displayDate}` : ''}
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      ) : null}

      <footer className="border-t border-white/10 bg-[#0a1628] px-4 py-8 text-sm sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-2 text-white/70">
          <p>
            <Link
              href={BCZ_YAPZ_PAGE.youtubeChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5a623] hover:underline"
            >
              Subscribe on YouTube
            </Link>
            {' · '}
            <Link href="/feed.xml" className="text-[#f5a623] hover:underline">
              RSS
            </Link>
            {' · '}
            <Link
              href={BCZ_YAPZ_PAGE.follow.farcaster.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5a623] hover:underline"
            >
              Farcaster {BCZ_YAPZ_PAGE.follow.farcaster.handle}
            </Link>
          </p>
        </div>
      </footer>
    </main>
  )
}

function chapterToSec(ts: string): number {
  const parts = ts.split(':').map((p) => Number(p))
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  return 0
}
