import { describe, it, expect } from 'vitest'
import { formatThumbDate, thumbnailUrlFor } from '../thumbnail'

describe('formatThumbDate', () => {
  it('formats a date as mm/dd/yy', () => {
    expect(formatThumbDate('2026-11-14')).toBe('11/14/26')
  })
  it('accepts an ISO datetime', () => {
    expect(formatThumbDate('2025-08-22T00:00:00.000Z')).toBe('08/22/25')
  })
  it('returns null for missing or odd input', () => {
    expect(formatThumbDate(null)).toBeNull()
    expect(formatThumbDate('TBD')).toBeNull()
  })
})

describe('thumbnailUrlFor', () => {
  it('prefers a hand-made override', () => {
    expect(thumbnailUrlFor('ep', '/thumbnails/ep.jpg')).toBe('/thumbnails/ep.jpg')
  })
  it('falls back to the drawn card', () => {
    expect(thumbnailUrlFor('2026-10-30-gigi-lit-studio', undefined)).toBe('/thumb/2026-10-30-gigi-lit-studio')
    expect(thumbnailUrlFor('x', null)).toBe('/thumb/x')
  })
})
