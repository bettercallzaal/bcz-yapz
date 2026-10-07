// Every entry here was fetched and its content checked on MEDIA_CHECKED_ON.
// Do not add a link that has not been opened and read. If a link cannot be
// confirmed, leave it out and list it in the PR instead.

export const MEDIA_CHECKED_ON = '2026-10-07'

export interface MediaLink {
  label: string
  url: string
  note?: string
}

export interface MediaGroup {
  id: string
  title: string
  links: MediaLink[]
}

export interface Appearance {
  date: string
  show: string
  title: string
  url: string
}

export const MEDIA_GROUPS: MediaGroup[] = [
  {
    id: 'zaal',
    title: 'Zaal',
    links: [
      { label: 'bettercallzaal.com', url: 'https://bettercallzaal.com', note: 'Home base' },
      { label: 'Farcaster @zaal', url: 'https://farcaster.xyz/zaal' },
      { label: 'X @bettercallzaal', url: 'https://x.com/bettercallzaal' },
      { label: 'YouTube @bettercallzaal', url: 'https://www.youtube.com/@bettercallzaal', note: 'BCZ YapZ episodes' },
      { label: 'Twitch bettercallzaal', url: 'https://www.twitch.tv/bettercallzaal', note: 'Livestreams' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/zaalp/' },
      { label: 'GitHub', url: 'https://github.com/bettercallzaal' },
      { label: 'Portfolio', url: 'https://bettercallzaal.com/portfolio/' },
      { label: 'Book a call', url: 'https://cal.com/bettercallzaal' },
      { label: 'Context box for AI agents', url: 'https://context.thezao.com/bettercallzaal', note: 'Plain text' },
    ],
  },
  {
    id: 'the-zao',
    title: 'The ZAO',
    links: [
      { label: 'thezao.com', url: 'https://thezao.com' },
      { label: 'Farcaster channel /zao', url: 'https://farcaster.xyz/~/channel/zao' },
      { label: 'The ZAO Newsletter', url: 'https://paragraph.com/@thezao' },
      { label: 'Events calendar', url: 'https://luma.com/zao' },
      { label: 'Team board', url: 'https://thezao.xyz' },
      { label: 'The papers', url: 'https://thezao.xyz/papers' },
      { label: 'ZAO 101', url: 'https://101.thezao.com' },
      { label: 'ZAO Fractal', url: 'https://zaofractal.vercel.app' },
      { label: 'Hats tree', url: 'https://hats.thezao.com' },
      { label: 'GitHub, ZAO DEVZ', url: 'https://github.com/ZAODEVZ' },
      { label: 'Context box for AI agents', url: 'https://context.thezao.com/thezao', note: 'Plain text' },
    ],
  },
  {
    id: 'zao-festivals',
    title: 'ZAO Festivals and ZAOstock',
    links: [
      { label: 'zaostock.com', url: 'https://zaostock.com' },
      { label: 'YouTube @zaofestivals', url: 'https://www.youtube.com/@zaofestivals' },
      { label: 'Twitch replays', url: 'https://www.twitch.tv/zaofestivals/videos' },
      { label: 'Merch', url: 'https://merch.zaofestivals.com' },
    ],
  },
  {
    id: 'wavewarz',
    title: 'WaveWarZ',
    links: [
      { label: 'wavewarz.com', url: 'https://wavewarz.com' },
      { label: 'X @WaveWarZ', url: 'https://x.com/WaveWarZ' },
      { label: 'WaveWarZ newsletter', url: 'https://paragraph.com/@wavewarz' },
      { label: 'Battle analytics', url: 'https://wwtracker.vercel.app' },
    ],
  },
  {
    id: 'more',
    title: 'More projects',
    links: [
      { label: 'ZABAL Gamez', url: 'https://zabalgamez.com' },
      { label: 'The ZAO bounty board', url: 'https://poidhz.com' },
      { label: 'COC Concertz', url: 'https://cocconcertz.com' },
      { label: 'Zuke', url: 'https://zuke.thezao.com', note: 'Live audio rooms' },
      { label: 'ZAO OS on GitHub', url: 'https://github.com/bettercallzaal/ZAOOS' },
      { label: 'Every repo, one page', url: 'https://bettercallzaal.github.io/zao-repos/' },
    ],
  },
]

// Zaal as the guest or the subject. `title` is the video's own title and
// `show` is the channel it is published on, both read from YouTube.
export const APPEARANCES: Appearance[] = [
  {
    date: '2025-04-11',
    show: 'ReFi DAO',
    title: 'THE ZAO Interview',
    url: 'https://www.youtube.com/watch?v=oVp0d1BBmko',
  },
  {
    date: '2025-04-01',
    show: 'Token For Your Thoughts Podcast',
    title: 'How The ZAO Is Helping Artists Keep Their Music, Data, and Dollars',
    url: 'https://www.youtube.com/watch?v=SXmdO6l4Rfg',
  },
  {
    date: '2024-11-14',
    show: 'NovaCrypto LTD',
    title: 'ZAO Fractal: Musicians, artists, technologists united to unlock Web3',
    url: 'https://www.youtube.com/watch?v=0_WvwzBvs90',
  },
  {
    date: '2024-03-28',
    show: 'Zaal on YouTube',
    title: 'Blitzscaling Interview with Zaal Panthaki 3/28/2024 (Bayo Okusanya - NPC Labs)',
    url: 'https://youtu.be/FKyIS-h3fNY',
  },
]
