import { getAllEpisodes } from '@/lib/episodes'
import { parseTranscript } from '@/lib/transcript'

export const revalidate = 3600

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

export async function GET() {
  const episodes = await getAllEpisodes()

  const docs: SearchDoc[] = []

  for (const ep of episodes) {
    const transcript = parseTranscript(ep.slug)
    if (!transcript) continue

    const epLabel = ep.frontmatter.episode
      ? `Ep ${ep.frontmatter.episode}`
      : ep.slug

    for (let i = 0; i < transcript.paragraphs.length; i += 1) {
      const para = transcript.paragraphs[i]
      const text = para.text.length > 400 ? para.text.slice(0, 400) : para.text
      docs.push({
        id: `${ep.slug}#${para.startSec}-${i}`,
        slug: ep.slug,
        ep: epLabel,
        guest: ep.frontmatter.guest,
        guestOrg: ep.frontmatter.guest_org,
        topics: ep.frontmatter.topics,
        startSec: para.startSec,
        text,
      })
    }
  }

  return new Response(JSON.stringify({ docs, builtAt: new Date().toISOString() }), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
