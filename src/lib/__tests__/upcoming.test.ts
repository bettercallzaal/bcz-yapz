import { describe, expect, it } from 'vitest'
import { parseUpcoming, upcomingState, currentUpcoming, getAllUpcoming } from '../upcoming'

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

  it('reads a replay id, and leaves it unset before one exists', () => {
    expect(parseUpcoming('25-someone', VALID)?.youtube_video_id).toBeUndefined()
    const aired = VALID.replace('---\nepisode', '---\nyoutube_video_id: abc123\nepisode')
    expect(parseUpcoming('25-someone', aired)?.youtube_video_id).toBe('abc123')
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

  it('picks the earliest episode that has not ended, not the lowest number', () => {
    const aired = { episode: 25, starts_at: '2026-10-15T22:00:00Z', duration_min: 90 }
    const next = { episode: 22, starts_at: '2026-10-30T21:00:00Z', duration_min: 90 }
    const later = { episode: 23, starts_at: '2026-11-06T21:00:00Z', duration_min: 90 }
    const list = [next, later, aired]
    const t = Date.parse(next.starts_at)

    expect(currentUpcoming(list, Date.parse(aired.starts_at))).toBe(aired)
    expect(currentUpcoming(list, t - 1)).toBe(next)
    expect(currentUpcoming(list, t + 89 * 60_000)).toBe(next)
    expect(currentUpcoming(list, t + 90 * 60_000)).toBe(later)
    expect(currentUpcoming(list, Date.parse(later.starts_at) + 90 * 60_000)).toBeNull()
  })

  it('every file in content/upcoming validates', () => {
    const all = getAllUpcoming()
    expect(all.length).toBeGreaterThan(0)
    for (const u of all) expect(u.slug.startsWith(String(u.episode))).toBe(true)
  })
})
