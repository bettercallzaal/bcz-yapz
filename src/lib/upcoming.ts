import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'

const UPCOMING_DIR = path.join(process.cwd(), 'content/upcoming')

function toIso(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString()
  return value
}

export const UpcomingSchema = z.object({
  episode: z.number().int().positive(),
  title: z.string(),
  guest: z.string(),
  guest_org: z.string().optional(),
  guest_links: z.array(z.string().url()).optional().default([]),
  starts_at: z.preprocess(toIso, z.string().datetime()),
  duration_min: z.number().int().positive().optional().default(90),
  watch_url: z.string().url(),
  thumbnail: z.string().optional(),
  announce_urls: z.array(z.string().url()).optional().default([]),
  topics: z.array(z.string()).optional().default([]),
  summary: z.string().optional().default(''),
})

export type Upcoming = z.infer<typeof UpcomingSchema> & { slug: string }

export { upcomingState, type UpcomingState } from './upcoming-state'

export function parseUpcoming(slug: string, raw: string): Upcoming | null {
  const parsed = matter(raw)
  const result = UpcomingSchema.safeParse(parsed.data)
  if (!result.success) {
    console.warn(
      `[bcz-yapz] skipping upcoming ${slug}: frontmatter invalid`,
      result.error.flatten()
    )
    return null
  }
  return { ...result.data, slug }
}

export function getAllUpcoming(): Upcoming[] {
  if (!fs.existsSync(UPCOMING_DIR)) return []
  return fs
    .readdirSync(UPCOMING_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) =>
      parseUpcoming(
        name.replace(/\.md$/, ''),
        fs.readFileSync(path.join(UPCOMING_DIR, name), 'utf-8')
      )
    )
    .filter((u): u is Upcoming => u !== null)
    .sort((a, b) => a.episode - b.episode)
}
