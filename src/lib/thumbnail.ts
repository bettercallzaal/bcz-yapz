/** "2026-11-14" or an ISO datetime -> "11/14/26", the style of the hand-made EP 27 card. */
export function formatThumbDate(iso: string | null | undefined): string | null {
  if (!iso) return null
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!m) return null
  return `${m[2]}/${m[3]}/${m[1].slice(2)}`
}

/** A hand-made file in public/thumbnails wins; otherwise the code-drawn card at /thumb/<slug>. */
export function thumbnailUrlFor(slug: string, override: string | null | undefined): string {
  return override || `/thumb/${slug}`
}
