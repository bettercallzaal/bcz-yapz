import type { MetadataRoute } from 'next'
import { getAllEpisodes } from '@/lib/episodes'

const SITE_URL = 'https://bczyapz.com'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const episodes = await getAllEpisodes()

  const epEntries: MetadataRoute.Sitemap = episodes.map((ep) => ({
    url: `${SITE_URL}/ep/${ep.slug}`,
    lastModified: ep.displayDate ? new Date(ep.displayDate) : new Date(),
    changeFrequency: 'weekly',
    priority: ep.frontmatter.youtube_url ? 0.7 : 0.4,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/feed.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    ...epEntries,
  ]
}
