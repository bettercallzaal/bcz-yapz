import { HeroSection } from './_components/HeroSection'
import { FeaturedEpisode } from './_components/FeaturedEpisode'
import { EpisodeList } from './_components/EpisodeList'
import { FollowFooter } from './_components/FollowFooter'
import { StatsBar } from './_components/StatsBar'
import { getAllEpisodes } from '@/lib/episodes'
import { parseChapters, type Chapter } from '@/lib/chapters'

export const revalidate = 3600

export default async function BczYapzPage() {
  const episodes = await getAllEpisodes()
  const chaptersBySlug: Record<string, Chapter[] | null> = {}
  for (const ep of episodes) {
    chaptersBySlug[ep.slug] = await parseChapters(ep.slug)
  }

  const latest = episodes[0]

  return (
    <main className="min-h-screen bg-[#0a1628]">
      <HeroSection />
      <StatsBar episodes={episodes} />
      {latest ? (
        <FeaturedEpisode episode={latest} />
      ) : null}
      {/* Every episode, featured one included, so the count and search cover all of them. */}
      <EpisodeList episodes={episodes} chaptersBySlug={chaptersBySlug} />
      <FollowFooter />
    </main>
  )
}
