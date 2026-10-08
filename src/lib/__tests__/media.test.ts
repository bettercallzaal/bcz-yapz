import { describe, it, expect } from 'vitest'
import { APPEARANCES, MEDIA_CHECKED_ON, MEDIA_GROUPS } from '../media'

const allLinks = MEDIA_GROUPS.flatMap((g) => g.links)

describe('media links', () => {
  it('has groups and every group has links', () => {
    expect(MEDIA_GROUPS.length).toBeGreaterThan(0)
    for (const group of MEDIA_GROUPS) {
      expect(group.links.length).toBeGreaterThan(0)
    }
  })

  it('uses https and a non-empty label on every link', () => {
    for (const link of [...allLinks, ...APPEARANCES]) {
      expect(link.url).toMatch(/^https:\/\//)
      expect(() => new URL(link.url)).not.toThrow()
    }
    for (const link of allLinks) {
      expect(link.label.trim().length).toBeGreaterThan(0)
    }
  })

  it('never lists the same URL twice', () => {
    const urls = [...allLinks, ...APPEARANCES].map((l) => l.url)
    expect(new Set(urls).size).toBe(urls.length)
  })

  it('has unique group ids', () => {
    const ids = MEDIA_GROUPS.map((g) => g.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('carries ISO dates and lists appearances newest first', () => {
    expect(MEDIA_CHECKED_ON).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    const dates = APPEARANCES.map((a) => a.date)
    for (const d of dates) {
      expect(d).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
    expect([...dates].sort().reverse()).toEqual(dates)
  })
})
