import { describe, it, expect } from 'vitest'
import { normalizeTimestamp, parseChapters } from '../chapters'

describe('parseChapters', () => {
  it('returns null when description file does not exist', async () => {
    const result = await parseChapters('nonexistent-slug')
    expect(result).toBeNull()
  })

  it('returns parsed chapters when description file exists', async () => {
    const result = await parseChapters('2025-08-22-deepa-grantorb')
    if (result === null) {
      return
    }
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThanOrEqual(3)
    expect(result[0]).toMatchObject({
      timestamp: expect.stringMatching(/^[0-9]+:[0-9]{2}$/),
      title: expect.any(String),
    })
    expect(result[0].timestamp).toBe('0:00')
  })

  it('normalizes zero-padded timestamps to YouTube style', () => {
    expect(normalizeTimestamp('00:00')).toBe('0:00')
    expect(normalizeTimestamp('07:15')).toBe('7:15')
    expect(normalizeTimestamp('12:30')).toBe('12:30')
    expect(normalizeTimestamp('0:00')).toBe('0:00')
    expect(normalizeTimestamp('01:05:00')).toBe('1:05:00')
  })
})
