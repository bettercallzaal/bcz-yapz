// Pure, browser-safe: no node imports. Used by the countdown on /[num].
export type UpcomingState = 'upcoming' | 'live' | 'ended'

export function upcomingState(
  startsAt: string,
  durationMin: number,
  now: number
): UpcomingState {
  const start = Date.parse(startsAt)
  const end = start + durationMin * 60_000
  if (now < start) return 'upcoming'
  if (now < end) return 'live'
  return 'ended'
}
