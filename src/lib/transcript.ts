import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const TRANSCRIPTS_DIR = path.join(process.cwd(), 'content/transcripts')

const TIMESTAMP_RE = /\[(\d{2}):(\d{2}):(\d{2})\]/g

export interface TranscriptParagraph {
  startSec: number
  text: string
}

function timestampToSec(h: string, m: string, s: string): number {
  return Number(h) * 3600 + Number(m) * 60 + Number(s)
}

function readTranscriptFile(slug: string): { frontmatterRaw: string; body: string } | null {
  const filepath = path.join(TRANSCRIPTS_DIR, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, 'utf-8')
  const parsed = matter(raw)
  return { frontmatterRaw: '', body: parsed.content }
}

export interface ParsedTranscript {
  paragraphs: TranscriptParagraph[]
  durationSec: number
}

export function parseTranscript(slug: string): ParsedTranscript | null {
  const file = readTranscriptFile(slug)
  if (!file) return null

  const afterHeader = file.body.split('## Transcript')
  const body = afterHeader.length > 1 ? afterHeader.slice(1).join('## Transcript') : file.body

  const lines = body.split('\n').filter((line) => line.trim().length > 0)

  const paragraphs: TranscriptParagraph[] = []
  let lastSec = 0

  for (const line of lines) {
    const match = line.match(/^\[(\d{2}):(\d{2}):(\d{2})\]/)
    if (!match) continue
    const startSec = timestampToSec(match[1], match[2], match[3])
    const cleaned = line
      .replace(TIMESTAMP_RE, '')
      .replace(/\s+/g, ' ')
      .trim()
    if (!cleaned) continue
    paragraphs.push({ startSec, text: cleaned })
    if (startSec > lastSec) lastSec = startSec
  }

  return { paragraphs, durationSec: lastSec }
}

export function formatTimestamp(sec: number): string {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }
  return `${m}:${String(s).padStart(2, '0')}`
}
