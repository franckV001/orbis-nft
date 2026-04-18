export type RarityTier = 'RARE' | 'EPIC' | 'LEGENDARY'

export interface NFTItem {
  id: number
  video: string
  score: string
  scoreNum: number
  price: string
  tier: RarityTier
  name: string
  description: string
}

const BASE = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/'

export const NFTS: NFTItem[] = [
  {
    id: 1,
    video: BASE + 'hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
    score: '8.7/10', scoreNum: 8.7, price: '0.42 ETH', tier: 'EPIC', name: 'Void Drifter #001',
    description: 'A spectral form drifting at the edge of observable space. Born from the collision of two dying stars, its shape shifts with each observation.',
  },
  {
    id: 2,
    video: BASE + 'hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
    score: '9/10', scoreNum: 9.0, price: '0.88 ETH', tier: 'LEGENDARY', name: 'Nebula Core #002',
    description: 'The condensed heart of a collapsed nebula, frozen at the moment of maximum compression. No light escapes its boundary — only signal.',
  },
  {
    id: 3,
    video: BASE + 'hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
    score: '8.2/10', scoreNum: 8.2, price: '0.31 ETH', tier: 'RARE', name: 'Orbit Ghost #003',
    description: 'An orbital remnant that has outlasted its parent body by millennia. It traces the same path endlessly, a memory written in velocity.',
  },
  {
    id: 4,
    video: BASE + 'hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
    score: '8.5/10', scoreNum: 8.5, price: '0.39 ETH', tier: 'EPIC', name: 'Signal Pulse #004',
    description: 'A recurring electromagnetic burst of unknown origin detected at the rim of the Milky Way. Periodic, precise, and entirely unexplained.',
  },
  {
    id: 5,
    video: BASE + 'hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
    score: '9.1/10', scoreNum: 9.1, price: '0.95 ETH', tier: 'LEGENDARY', name: 'Dark Matter #005',
    description: 'A visualisation of dark matter density mapped across a 40-light-year region. Invisible to instruments — rendered here for the first time.',
  },
  {
    id: 6,
    video: BASE + 'hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
    score: '7.9/10', scoreNum: 7.9, price: '0.27 ETH', tier: 'RARE', name: 'Cosmic Dust #006',
    description: 'Interstellar dust grains suspended between solar systems, older than the sun itself. Each particle carries the chemical signature of a dead world.',
  },
  {
    id: 7,
    video: BASE + 'hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4',
    score: '8.8/10', scoreNum: 8.8, price: '0.51 ETH', tier: 'EPIC', name: 'Perihelion #007',
    description: 'Captured at the precise moment of closest approach to its star. The heat distortion warps geometry — what appears solid is pure energy.',
  },
  {
    id: 8,
    video: BASE + 'hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4',
    score: '9.3/10', scoreNum: 9.3, price: '1.10 ETH', tier: 'LEGENDARY', name: 'Event Horizon #008',
    description: 'The boundary where spacetime curvature becomes absolute. This object was reconstructed from gravitational wave data recorded over 11 years.',
  },
  {
    id: 9,
    video: BASE + 'hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4',
    score: '8.0/10', scoreNum: 8.0, price: '0.29 ETH', tier: 'RARE', name: 'Starfall #009',
    description: 'A stellar fragment ejected during a supernova, still travelling at 0.04c. Its trajectory will carry it beyond the galaxy in six million years.',
  },
]

export const VIDEOS = {
  hero:  BASE + 'hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4',
  about: BASE + 'hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4',
  cta:   BASE + 'hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4',
}
