import { describe, it, expect } from 'vitest'
import { compareEpisodes } from '../episodes'

const ep = (slug: string, displayDate: string | null, episode?: number) => ({
  slug,
  displayDate,
  frontmatter: { episode },
})

const order = (list: ReturnType<typeof ep>[]) => [...list].sort(compareEpisodes).map((e) => e.slug)

describe('compareEpisodes', () => {
  it('puts newer dates first', () => {
    expect(order([ep('old', '2026-01-01', 1), ep('new', '2026-11-14', 2)])).toEqual(['new', 'old'])
  })

  it('on the same date puts the higher episode number first, whatever the slug order', () => {
    // EP 26 Retrospect and EP 27 S.R. Chappell share 2026-11-14; "retrospect" sorts before "sr-chappell".
    expect(
      order([ep('2026-11-14-retrospect', '2026-11-14', 26), ep('2026-11-14-sr-chappell', '2026-11-14', 27)])
    ).toEqual(['2026-11-14-sr-chappell', '2026-11-14-retrospect'])
  })

  it('on the same date and number falls back to slug order', () => {
    expect(order([ep('b', '2026-11-14', 5), ep('a', '2026-11-14', 5)])).toEqual(['a', 'b'])
  })

  it('puts undated episodes last', () => {
    expect(order([ep('undated', null, 9), ep('dated', '2025-01-01', 1)])).toEqual(['dated', 'undated'])
  })
})
