// Episode length in whole minutes, from the latest timestamp in a transcript body.
// Accepts "[00:42:57]", "00:42:57", "(42:57)" or "42:57" at the start of a line.
const LINE_TIMESTAMP = /^\s*[[(]?(\d{1,2}):(\d{2})(?::(\d{2}))?[\])]?/

export function lastTimestampMinutes(body: string): number | null {
  let maxSeconds = -1
  for (const line of body.split('\n')) {
    const m = LINE_TIMESTAMP.exec(line)
    if (!m) continue
    const seconds = m[3] !== undefined
      ? Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3])
      : Number(m[1]) * 60 + Number(m[2])
    if (seconds > maxSeconds) maxSeconds = seconds
  }
  return maxSeconds > 0 ? Math.max(1, Math.round(maxSeconds / 60)) : null
}

/** Frontmatter wins when set; otherwise fall back to the transcript. */
export function episodeMinutes(frontmatterMin: number | undefined, body: string): number | null {
  return frontmatterMin ?? lastTimestampMinutes(body)
}
