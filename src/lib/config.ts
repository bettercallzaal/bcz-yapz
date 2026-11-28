export const BCZ_YAPZ_PAGE = {
  title: 'BCZ YapZ',
  tagline:
    'Long-form conversations with creators and founders about what they are building and why.',
  about:
    "BCZ YapZ is a long-form interview show hosted by BetterCallZaal. Each episode is a conversation with a builder, founder, or organizer working on something worth understanding - web3 music distribution, decentralized governance, AI tooling, on-chain photography, Maine community infrastructure, and more. Episodes run about 20 to 50 minutes, recorded live and posted to YouTube. Transcripts are archived in the open so the full catalog stays searchable.",
  hostName: 'BetterCallZaal',
  hostFarcaster: 'https://farcaster.xyz/zaal',
  youtubeChannel: 'https://youtube.com/@bettercallzaal',
  fallbackPlaylistUrl: 'https://youtube.com/@bettercallzaal',
  // Sign-up goes to the newsletter's own subscribe page; no email is collected or stored here.
  newsletter: {
    label: 'The ZAO newsletter on Paragraph',
    url: 'https://paragraph.com/@thezao',
  },
  follow: {
    farcaster: {
      handle: '@zaal',
      url: 'https://farcaster.xyz/zaal',
    },
    x: {
      handle: '@bettercallzaal',
      url: 'https://x.com/bettercallzaal',
    },
    youtube: {
      handle: '@bettercallzaal',
      url: 'https://youtube.com/@bettercallzaal',
    },
    zaoChannel: {
      handle: '/zao',
      url: 'https://farcaster.xyz/~/channel/zao',
    },
    zaoSite: {
      label: 'thezao.com',
      url: 'https://thezao.com',
    },
  },
} as const
