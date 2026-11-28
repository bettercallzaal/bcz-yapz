import { describe, it, expect } from 'vitest'
import { ARCHIVE_TABS, matchesGuest, sharedTopics } from '../archive'

const ep = (guest: string, guest_org: string | undefined, topics: string[]) => ({
  frontmatter: { guest, guest_org, topics },
})

describe('ARCHIVE_TABS', () => {
  it('lists the four tabs in Zaal order with only BCZ YapZ ready', () => {
    expect(ARCHIVE_TABS.map((t) => t.label)).toEqual(['BCZ YapZ', 'X Spaces', 'ZABAL Gamez', 'Earned media'])
    expect(ARCHIVE_TABS.filter((t) => t.ready).map((t) => t.id)).toEqual(['yapz'])
  })
})

describe('sharedTopics', () => {
  const eps = [ep('A', 'X', ['music', 'ai']), ep('B', 'Y', ['music', 'daos']), ep('C', undefined, ['music', 'ai'])]
  it('keeps only topics used by at least two episodes, most used first', () => {
    expect(sharedTopics(eps)).toEqual([['music', 3], ['ai', 2]])
  })
  it('respects the limit', () => {
    expect(sharedTopics(eps, 2, 1)).toEqual([['music', 3]])
  })
})

describe('matchesGuest', () => {
  it('matches guest or project, any case', () => {
    expect(matchesGuest(ep('Alaskan Magpie', 'Shiny Things', []), 'magpie')).toBe(true)
    expect(matchesGuest(ep('Gigi', 'Lit Studio', []), 'LIT')).toBe(true)
    expect(matchesGuest(ep('Gigi', undefined, []), 'kenny')).toBe(false)
  })
  it('matches everything on an empty query', () => {
    expect(matchesGuest(ep('Gigi', undefined, []), '  ')).toBe(true)
  })
})
