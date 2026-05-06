import type { Episode } from './types'

function jaccard(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0
  const setA = new Set(a)
  const setB = new Set(b)
  let intersection = 0
  for (const x of setA) {
    if (setB.has(x)) intersection += 1
  }
  const union = setA.size + setB.size - intersection
  if (union === 0) return 0
  return intersection / union
}

export function relatedEpisodes(
  current: Episode,
  pool: Episode[],
  limit = 3
): Episode[] {
  const currentTopics = current.frontmatter.topics
  const candidates = pool
    .filter((ep) => ep.slug !== current.slug)
    .map((ep) => ({
      ep,
      score: jaccard(currentTopics, ep.frontmatter.topics),
    }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)

  return candidates.slice(0, limit).map((c) => c.ep)
}
