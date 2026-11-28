import { describe, it, expect } from 'vitest'
import type { ReactElement } from 'react'
import HomePage from '../page'
import { EpisodeList } from '../_components/EpisodeList'
import { getAllEpisodes } from '@/lib/episodes'
import type { Episode } from '@/lib/types'

// Walk the element tree the page returns and find the EpisodeList element,
// wherever it sits (directly in <main>, or inside a wrapper such as tabs).
function findByType(node: unknown, type: unknown): ReactElement | null {
  if (!node || typeof node !== 'object') return null
  if (Array.isArray(node)) {
    for (const n of node) {
      const hit = findByType(n, type)
      if (hit) return hit
    }
    return null
  }
  const el = node as ReactElement<{ children?: unknown }>
  if (el.type === type) return el
  return findByType(el.props?.children, type)
}

describe('home page episode list', () => {
  it('passes every episode to the list, the featured one included', async () => {
    const all = await getAllEpisodes()
    const tree = await HomePage()
    const list = findByType(tree, EpisodeList) as ReactElement<{ episodes: Episode[] }> | null
    expect(list).not.toBeNull()
    expect(list!.props.episodes).toHaveLength(all.length)
    expect(list!.props.episodes[0].slug).toBe(all[0].slug)
  })
})
