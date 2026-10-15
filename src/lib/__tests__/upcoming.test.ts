import { describe, expect, it } from 'vitest'
import { parseUpcoming, upcomingState, getAllUpcoming } from '../upcoming'

const VALID = `---
episode: 25
title: Test
guest: Someone
starts_at: 2026-10-15T22:00:00Z
watch_url: https://twitch.tv/bettercallzaal
---
`

describe('upcoming', () => {
  it('parses valid frontmatter and defaults duration to 90', () => {
    const u = parseUpcoming('25-someone', VALID)
    expect(u?.episode).toBe(25)
    expect(u?.duration_min).toBe(90)
    expect(u?.starts_at).toBe('2026-10-15T22:00:00.000Z')
  })

  it('rejects frontmatter without a watch url', () => {
    expect(parseUpcoming('x', VALID.replace(/watch_url.*\n/, ''))).toBeNull()
  })

  it('moves from upcoming to live to ended', () => {
    const start = '2026-10-15T22:00:00Z'
    const t = Date.parse(start)
    expect(upcomingState(start, 90, t - 1)).toBe('upcoming')
    expect(upcomingState(start, 90, t)).toBe('live')
    expect(upcomingState(start, 90, t + 89 * 60_000)).toBe('live')
    expect(upcomingState(start, 90, t + 90 * 60_000)).toBe('ended')
  })

  it('every file in content/upcoming validates', () => {
    const all = getAllUpcoming()
    expect(all.length).toBeGreaterThan(0)
    for (const u of all) expect(u.slug.startsWith(String(u.episode))).toBe(true)
  })
})
