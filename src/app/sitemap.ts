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

  const topicSet = new Set<string>()
  for (const ep of episodes)
    for (const t of ep.frontmatter.topics) topicSet.add(t)
  const topicEntries: MetadataRoute.Sitemap = [...topicSet].map((slug) => ({
    url: `${SITE_URL}/topic/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/live`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/press`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/guests`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/topics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/subscribe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/feed.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    ...epEntries,
    ...topicEntries,
  ]
}
