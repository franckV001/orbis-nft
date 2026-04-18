# NFT Detail Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an immersive full-screen NFT detail page at `/nft/:id` with video background, overlay info, prev/next navigation, and wire existing card chevrons to it.

**Architecture:** Add `description` field to `NFTItem`, create `src/pages/NFTDetail.tsx` using `useParams` + `useNavigate`, register route in `App.tsx`, update chevron buttons in `Gallery.tsx` and `Home.tsx` to be `<Link>` elements.

**Tech Stack:** React 18, TypeScript, react-router-dom v6, Tailwind CSS 3, lucide-react

---

## File Map

| Action | File | Change |
|--------|------|--------|
| Modify | `src/data/nfts.ts` | Add `description` to `NFTItem` interface + all 9 entries |
| Create | `src/pages/NFTDetail.tsx` | Full-screen detail page |
| Modify | `src/App.tsx` | Add `/nft/:id` route |
| Modify | `src/pages/Gallery.tsx` | Wrap chevron button in `<Link to={/nft/${nft.id}}>` |
| Modify | `src/pages/Home.tsx` | Same — section 3 card chevrons become links |

---

## Task 1: Add `description` field to NFT data

**Files:**
- Modify: `src/data/nfts.ts`

- [ ] **Step 1: Update `NFTItem` interface and all 9 entries**

Replace the entire content of `src/data/nfts.ts` with:

```typescript
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
```

- [ ] **Step 2: Verify build passes**

```bash
cd c:/Users/franc/Documents/orbit && npm run build
```

Expected: `✓ built in` with no TypeScript errors.

---

## Task 2: Create NFTDetail page

**Files:**
- Create: `src/pages/NFTDetail.tsx`

- [ ] **Step 1: Create `src/pages/NFTDetail.tsx`**

```tsx
import { useParams, useNavigate, Link } from 'react-router-dom'
import { NFTS } from '../data/nfts'
import type { RarityTier } from '../data/nfts'

const TIER_COLOR: Record<RarityTier, string> = {
  RARE: 'text-blue-300 border-blue-300/40 bg-blue-300/10',
  EPIC: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
  LEGENDARY: 'text-neon border-neon/40 bg-neon/10',
}

export default function NFTDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const currentIndex = NFTS.findIndex((n) => n.id === Number(id))

  if (currentIndex === -1) {
    navigate('/gallery', { replace: true })
    return null
  }

  const nft = NFTS[currentIndex]
  const prevNft = NFTS[(currentIndex - 1 + NFTS.length) % NFTS.length]
  const nextNft = NFTS[(currentIndex + 1) % NFTS.length]

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-screen video background */}
      <video
        key={nft.id}
        src={nft.video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay — bottom 60% */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Back button — top left */}
      <Link
        to="/gallery"
        className="absolute top-8 left-6 sm:left-10 lg:left-16 z-10 liquid-glass rounded-[1rem] px-5 py-3 flex items-center gap-2 font-grotesk text-[13px] uppercase text-cream hover:bg-white/10 transition-colors duration-200"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link>

      {/* NFT counter — top right */}
      <div className="absolute top-8 right-6 sm:right-10 lg:right-16 z-10 liquid-glass rounded-[1rem] px-5 py-3 font-grotesk text-[13px] uppercase text-cream/60">
        {currentIndex + 1} / {NFTS.length}
      </div>

      {/* Bottom overlay content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 lg:pb-16">
        {/* Tier badge */}
        <div className="mb-4">
          <span className={`inline-block font-grotesk text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full border ${TIER_COLOR[nft.tier]}`}>
            {nft.tier}
          </span>
        </div>

        {/* Name */}
        <h1
          className="font-grotesk uppercase text-cream leading-none mb-4"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
        >
          {nft.name}
        </h1>

        {/* Score + price row */}
        <div className="flex items-center gap-6 mb-4 flex-wrap">
          <span className="font-mono text-[14px] sm:text-[16px] text-cream/70 uppercase">
            Score: {nft.score}
          </span>
          <span className="font-mono text-[14px] sm:text-[16px] text-neon uppercase">
            {nft.price}
          </span>
        </div>

        {/* Description */}
        <p className="font-mono text-[13px] sm:text-[15px] text-cream/60 max-w-[600px] leading-relaxed mb-8">
          {nft.description}
        </p>

        {/* Bottom row: prev/next + mint */}
        <div className="flex items-center justify-between gap-4">
          {/* Prev / Next */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/nft/${prevNft.id}`)}
              className="liquid-glass rounded-[1rem] w-12 h-12 flex items-center justify-center text-cream hover:bg-white/10 transition-colors duration-200"
              title={prevNft.name}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="hidden sm:flex flex-col">
              <span className="font-grotesk text-[10px] uppercase text-cream/40 tracking-wider">Prev</span>
              <span className="font-grotesk text-[12px] uppercase text-cream/60">{prevNft.name}</span>
            </div>
            <div className="hidden sm:flex flex-col ml-6">
              <span className="font-grotesk text-[10px] uppercase text-cream/40 tracking-wider">Next</span>
              <span className="font-grotesk text-[12px] uppercase text-cream/60">{nextNft.name}</span>
            </div>
            <button
              onClick={() => navigate(`/nft/${nextNft.id}`)}
              className="liquid-glass rounded-[1rem] w-12 h-12 flex items-center justify-center text-cream hover:bg-white/10 transition-colors duration-200"
              title={nextNft.name}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Mint Now */}
          <Link
            to="/buy"
            className="bg-gradient-to-br from-[#b724ff] to-[#7c3aed] text-white font-grotesk text-[14px] uppercase tracking-wider px-8 py-4 rounded-[16px] shadow-lg shadow-purple-500/40 hover:scale-[1.02] transition-transform duration-200"
          >
            Mint Now
          </Link>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd c:/Users/franc/Documents/orbit && npm run build
```

Expected: `✓ built in` with no errors.

---

## Task 3: Register route + wire card chevrons

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/Gallery.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Add `/nft/:id` route to `src/App.tsx`**

Replace the entire file with:

```tsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import BuyNFT from './pages/BuyNFT'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import NFTDetail from './pages/NFTDetail'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="buy" element={<BuyNFT />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="nft/:id" element={<NFTDetail />} />
      </Route>
    </Routes>
  )
}
```

- [ ] **Step 2: Update chevron button in `src/pages/Gallery.tsx`**

Add `import { Link } from 'react-router-dom'` at the top.

Replace the chevron `<button>` inside the card overlay bar with a `<Link>`:

Find this block (inside the `{visible.map(...)}` loop, inside the overlay bar div):
```tsx
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
```

Replace with:
```tsx
                <Link
                  to={`/nft/${nft.id}`}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform duration-200 flex-shrink-0"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
```

- [ ] **Step 3: Update chevron button in `src/pages/Home.tsx`**

Add `import { Link } from 'react-router-dom'` at the top of `src/pages/Home.tsx` (alongside the existing lucide-react and nfts imports).

In section 3 (`{NFTS.slice(0, 3).map((nft) => ...}`), find the same chevron `<button>` pattern and replace with the same `<Link to={/nft/${nft.id}}>` pattern as above.

- [ ] **Step 4: Verify final build**

```bash
cd c:/Users/franc/Documents/orbit && npm run build
```

Expected: `✓ built in` with no TypeScript errors.

---

## Self-Review

- ✅ `description` field added to interface + all 9 NFTS entries — no TBD
- ✅ Invalid `:id` redirects to `/gallery` via `navigate('/gallery', { replace: true })`
- ✅ Prev/next wraps around using modulo
- ✅ "Mint Now" links to `/buy` (existing page) — no new page needed
- ✅ Both Gallery and Home chevrons wired to `/nft/:id`
- ✅ Route registered under existing `<Layout />` — navbar stays visible
- ✅ Type `RarityTier` consistent across all files
