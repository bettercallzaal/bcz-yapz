import { describe, it, expect } from 'vitest'
import { episodeMinutes, lastTimestampMinutes } from '../duration'

describe('lastTimestampMinutes', () => {
  it('reads bracketed hh:mm:ss and takes the largest', () => {
    const body = '[00:00:00] hi\n[00:12:30] middle\n[00:42:57] end\n'
    expect(lastTimestampMinutes(body)).toBe(43)
  })

  it('reads bare mm:ss lines', () => {
    expect(lastTimestampMinutes('00:05 a\n29:31 b\n')).toBe(30)
  })

  it('ignores timestamps that are not at the start of a line', () => {
    expect(lastTimestampMinutes('we met at 10:30 today\n[00:01:00] x')).toBe(1)
  })

  it('returns null with no timestamps', () => {
    expect(lastTimestampMinutes('no times here')).toBeNull()
  })

  it('handles an hour-plus episode', () => {
    expect(lastTimestampMinutes('[01:05:00] late\n')).toBe(65)
  })
})

describe('episodeMinutes', () => {
  it('prefers the frontmatter value', () => {
    expect(episodeMinutes(30, '[00:50:00] x')).toBe(30)
  })

  it('falls back to the transcript', () => {
    expect(episodeMinutes(undefined, '[00:50:00] x')).toBe(50)
  })
})
