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

// The episode /live should show: the earliest one that has not ended.
export function currentUpcoming<T extends { starts_at: string; duration_min: number }>(
  list: T[],
  now: number
): T | null {
  const open = list.filter((u) => upcomingState(u.starts_at, u.duration_min, now) !== 'ended')
  open.sort((a, b) => Date.parse(a.starts_at) - Date.parse(b.starts_at))
  return open[0] ?? null
}
