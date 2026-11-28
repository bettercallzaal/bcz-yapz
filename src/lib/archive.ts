// The media archive on the home page is split into tabs (Zaal, 27 Nov):
// BCZ YapZ first, then X Spaces, ZABAL Gamez and Earned media.
// A tab shows as "Soon" until it has content and `ready` is set.
export interface ArchiveTab {
  id: 'yapz' | 'x-spaces' | 'zabal-gamez' | 'earned-media'
  label: string
  ready: boolean
}

export const ARCHIVE_TABS: readonly ArchiveTab[] = [
  { id: 'yapz', label: 'BCZ YapZ', ready: true },
  { id: 'x-spaces', label: 'X Spaces', ready: false },
  { id: 'zabal-gamez', label: 'ZABAL Gamez', ready: false },
  { id: 'earned-media', label: 'Earned media', ready: false },
]

interface Filterable {
  frontmatter: { guest: string; guest_org?: string; topics: string[] }
}

/** Topics shared by at least `min` episodes, most used first, capped at `limit`. */
export function sharedTopics(episodes: Filterable[], min = 2, limit = 10): Array<[string, number]> {
  const counts = new Map<string, number>()
  for (const ep of episodes) for (const t of ep.frontmatter.topics) counts.set(t, (counts.get(t) ?? 0) + 1)
  return [...counts.entries()]
    .filter(([, n]) => n >= min)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
}

/** Case-insensitive match on guest name or project; an empty query matches everything. */
export function matchesGuest(ep: Filterable, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    ep.frontmatter.guest.toLowerCase().includes(q) ||
    (ep.frontmatter.guest_org ?? '').toLowerCase().includes(q)
  )
}
