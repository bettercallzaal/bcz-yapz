import { HeroSection } from './_components/HeroSection'
import { FeaturedEpisode } from './_components/FeaturedEpisode'
import { EpisodeList } from './_components/EpisodeList'
import { FollowFooter } from './_components/FollowFooter'
import { getAllEpisodes } from '@/lib/episodes'
import { parseChapters, type Chapter } from '@/lib/chapters'

export const revalidate = 3600

export default async function BczYapzPage() {
  const episodes = await getAllEpisodes()
  const chaptersBySlug: Record<string, Chapter[] | null> = {}
  for (const ep of episodes) {
    chaptersBySlug[ep.slug] = await parseChapters(ep.slug)
  }

  const [latest, ...rest] = episodes

  return (
    <main className="min-h-screen bg-[#0a1628]">
      <HeroSection />
      {latest ? (
        <FeaturedEpisode episode={latest} displayIndex={episodes.length} />
      ) : null}
      <EpisodeList episodes={rest} chaptersBySlug={chaptersBySlug} />
      <FollowFooter />
    </main>
  )
}
