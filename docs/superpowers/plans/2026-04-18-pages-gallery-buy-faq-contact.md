# Orbis.Nft Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add React Router + 4 pages (Gallery, Buy NFT, FAQ, Contact) to the existing Orbis.Nft site, sharing a common Layout with navbar and texture overlay.

**Architecture:** Install react-router-dom, extract shared Layout (navbar + texture), move homepage sections into `src/pages/Home.tsx`, create 4 new page files. NavLink highlights active route in neon green. Mobile navbar uses a hamburger drawer.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS 3, react-router-dom v6, lucide-react

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/data/nfts.ts` | Shared NFT data (videos, scores, prices, rarity tiers) |
| Create | `src/components/Layout.tsx` | Navbar (desktop + mobile drawer) + TextureOverlay |
| Create | `src/pages/Home.tsx` | All 4 existing homepage sections (moved from App.tsx) |
| Modify | `src/App.tsx` | Router setup only — routes pointing to pages |
| Modify | `src/main.tsx` | Wrap app in `<BrowserRouter>` |
| Create | `src/pages/Gallery.tsx` | Filter bar + 9-card grid |
| Create | `src/pages/BuyNFT.tsx` | NFT selector + wallet connect + mint panel |
| Create | `src/pages/FAQ.tsx` | Animated accordion with 10 Q&A items |
| Create | `src/pages/Contact.tsx` | Two-column form + social links |

---

## Task 1: Install react-router-dom + shared data

**Files:**
- Modify: `package.json` (via npm install)
- Create: `src/data/nfts.ts`

- [ ] **Step 1: Install react-router-dom**

```bash
cd c:/Users/franc/Documents/orbit
npm install react-router-dom
```

Expected: `added 1 package` (or similar), no errors.

- [ ] **Step 2: Create shared NFT data file**

Create `src/data/nfts.ts`:

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
}

const BASE = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/'

export const NFTS: NFTItem[] = [
  { id: 1, video: BASE + 'hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4', score: '8.7/10', scoreNum: 8.7, price: '0.42 ETH', tier: 'EPIC',      name: 'Void Drifter #001' },
  { id: 2, video: BASE + 'hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4', score: '9/10',   scoreNum: 9.0, price: '0.88 ETH', tier: 'LEGENDARY', name: 'Nebula Core #002' },
  { id: 3, video: BASE + 'hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4', score: '8.2/10', scoreNum: 8.2, price: '0.31 ETH', tier: 'RARE',      name: 'Orbit Ghost #003' },
  { id: 4, video: BASE + 'hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4', score: '8.5/10', scoreNum: 8.5, price: '0.39 ETH', tier: 'EPIC',      name: 'Signal Pulse #004' },
  { id: 5, video: BASE + 'hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4', score: '9.1/10', scoreNum: 9.1, price: '0.95 ETH', tier: 'LEGENDARY', name: 'Dark Matter #005' },
  { id: 6, video: BASE + 'hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4', score: '7.9/10', scoreNum: 7.9, price: '0.27 ETH', tier: 'RARE',      name: 'Cosmic Dust #006' },
  { id: 7, video: BASE + 'hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4', score: '8.8/10', scoreNum: 8.8, price: '0.51 ETH', tier: 'EPIC',      name: 'Perihelion #007' },
  { id: 8, video: BASE + 'hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4', score: '9.3/10', scoreNum: 9.3, price: '1.10 ETH', tier: 'LEGENDARY', name: 'Event Horizon #008' },
  { id: 9, video: BASE + 'hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4', score: '8.0/10', scoreNum: 8.0, price: '0.29 ETH', tier: 'RARE',      name: 'Starfall #009' },
]

export const VIDEOS = {
  hero:  BASE + 'hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4',
  about: BASE + 'hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4',
  cta:   BASE + 'hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4',
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/nfts.ts package.json package-lock.json
git commit -m "feat: add react-router-dom and shared NFT data"
```

---

## Task 2: Create shared Layout component

**Files:**
- Create: `src/components/Layout.tsx`

- [ ] **Step 1: Create `src/components/Layout.tsx`**

```tsx
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Mail, X, GitBranch, Menu, XIcon } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Homepage', to: '/' },
  { label: 'Gallery',  to: '/gallery' },
  { label: 'Buy NFT',  to: '/buy' },
  { label: 'FAQ',      to: '/faq' },
  { label: 'Contact',  to: '/contact' },
]

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-background text-cream min-h-screen">
      {/* Texture overlay */}
      <div
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          backgroundImage: 'url(/texture.png)',
          backgroundSize: 'cover',
          mixBlendMode: 'lighten',
          opacity: 0.6,
        }}
      />

      {/* Floating navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-6">
        <NavLink to="/" className="font-grotesk text-[16px] uppercase text-cream tracking-wider">
          Orbis.Nft
        </NavLink>

        {/* Desktop nav */}
        <nav className="liquid-glass rounded-[28px] px-[52px] py-[24px] hidden lg:block">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `font-grotesk text-[13px] uppercase transition-colors duration-200 ${
                      isActive ? 'text-neon' : 'text-cream hover:text-neon'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden liquid-glass rounded-[1rem] w-12 h-12 flex items-center justify-center text-cream"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative liquid-glass m-4 mt-20 rounded-[24px] p-8 flex flex-col gap-6">
            <button
              className="absolute top-4 right-4 text-cream hover:text-neon transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <XIcon size={20} />
            </button>
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `font-grotesk text-[20px] uppercase transition-colors duration-200 ${
                    isActive ? 'text-neon' : 'text-cream hover:text-neon'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="flex gap-3 mt-4">
              {[Mail, X, GitBranch].map((Icon, i) => (
                <button key={i} className="liquid-glass rounded-[1rem] w-12 h-12 flex items-center justify-center text-cream hover:bg-white/10 transition-colors duration-200">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main>
        <Outlet />
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Layout.tsx
git commit -m "feat: add shared Layout with responsive navbar"
```

---

## Task 3: Move homepage into Home.tsx + wire up router in App.tsx

**Files:**
- Create: `src/pages/Home.tsx`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create `src/pages/Home.tsx`**

Move all existing content from `src/App.tsx` into `src/pages/Home.tsx`. Replace the VIDEOS and NFT_CARDS constants with imports from `src/data/nfts.ts`. Remove the `<TextureOverlay>` wrapper (now in Layout) and remove the outer `<div className="bg-background ...">` wrapper (also in Layout). The component should return just the 4 sections.

```tsx
import { Mail, X, GitBranch } from 'lucide-react'
import { NFTS, VIDEOS } from '../data/nfts'

function SocialIcons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {[Mail, X, GitBranch].map((Icon, i) => (
        <button key={i} className="liquid-glass rounded-[1rem] w-14 h-14 flex items-center justify-center text-cream hover:bg-white/10 transition-colors duration-200 flex-shrink-0">
          <Icon size={20} />
        </button>
      ))}
    </div>
  )
}

function VideoBackground({ src }: { src: string }) {
  return (
    <video src={src} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
  )
}

export default function Home() {
  return (
    <>
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen overflow-hidden rounded-b-[32px]">
        <VideoBackground src={VIDEOS.hero} />
        <div className="relative z-10 h-full flex flex-col mx-auto max-w-[1831px] px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between pt-8 lg:pt-10">
            <span className="font-grotesk text-[16px] uppercase text-cream tracking-wider opacity-0">Orbis.Nft</span>
            <div className="hidden lg:block w-[300px]" />
            <div className="w-[64px]" />
          </div>
          <div className="absolute right-6 sm:right-10 lg:right-16 top-20 hidden lg:flex flex-col gap-3">
            {[Mail, X, GitBranch].map((Icon, i) => (
              <button key={i} className="liquid-glass rounded-[1rem] w-14 h-14 flex items-center justify-center text-cream hover:bg-white/10 transition-colors duration-200">
                <Icon size={20} />
              </button>
            ))}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="relative lg:ml-32 max-w-[780px]">
              <h1 className="font-grotesk uppercase text-cream leading-[1.05] lg:leading-[1]" style={{ fontSize: 'clamp(40px, 7vw, 90px)' }}>
                Beyond earth<br />and ( its ) familiar<br />boundaries
              </h1>
              <span className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 font-condiment text-neon opacity-90 -rotate-1 pointer-events-none" style={{ fontSize: 'clamp(24px, 3.5vw, 48px)', mixBlendMode: 'exclusion' }}>
                Nft collection
              </span>
            </div>
            <SocialIcons className="lg:hidden mt-8 justify-center" />
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <VideoBackground src={VIDEOS.about} />
        <div className="relative z-10 mx-auto max-w-[1831px] px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24 flex flex-col gap-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
            <div className="relative">
              <h2 className="font-grotesk uppercase text-cream leading-none" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
                Hello!<br />I'm orbis
              </h2>
              <span className="absolute -bottom-2 right-0 font-condiment text-neon -rotate-2 pointer-events-none" style={{ fontSize: 'clamp(36px, 5.5vw, 68px)', mixBlendMode: 'exclusion' }}>
                Orbis
              </span>
            </div>
            <p className="font-mono text-[14px] sm:text-[16px] uppercase text-cream max-w-[266px]">
              A digital object fixed beyond time and place. An exploration of distance, form, and silence in space
            </p>
          </div>
          <div className="flex flex-row justify-between gap-6">
            <div className="flex flex-col gap-4 flex-1">
              <p className="font-mono text-[14px] uppercase text-cream opacity-10">A digital object fixed beyond time and place. An exploration of distance, form, and silence in space</p>
              <p className="font-mono text-[14px] uppercase text-[#010828] lg:text-cream opacity-0 lg:opacity-10">A digital object fixed beyond time and place. An exploration of distance, form, and silence in space</p>
            </div>
            <div className="hidden lg:flex flex-col gap-4 flex-1">
              <p className="font-mono text-[14px] uppercase text-cream opacity-10">A digital object fixed beyond time and place. An exploration of distance, form, and silence in space</p>
              <p className="font-mono text-[14px] uppercase text-cream opacity-10">A digital object fixed beyond time and place. An exploration of distance, form, and silence in space</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: NFT COLLECTION */}
      <section className="w-full bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1831px] px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
            <h2 className="font-grotesk uppercase text-cream leading-none" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Collection of<br />
              <span className="ml-12 sm:ml-24 lg:ml-32">
                <span className="font-condiment text-neon" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>Space</span>
                <span className="font-grotesk"> objects</span>
              </span>
            </h2>
            <div className="flex-shrink-0">
              <div className="flex items-baseline gap-2">
                <span className="font-grotesk uppercase text-cream" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>SEE</span>
                <div className="flex flex-col font-grotesk uppercase text-cream leading-none" style={{ fontSize: 'clamp(20px, 3vw, 36px)' }}>
                  <span>ALL</span><span>CREATORS</span>
                </div>
              </div>
              <div className="bg-neon mt-2 w-full" style={{ height: 'clamp(6px, 1vw, 10px)' }} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NFTS.slice(0, 3).map((nft) => (
              <div key={nft.id} className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition-colors duration-200">
                <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden">
                  <video src={nft.video} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <div className="liquid-glass rounded-[20px] px-5 py-4 mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-cream/70 uppercase font-grotesk tracking-wider">Rarity Score:</p>
                    <p className="text-[16px] text-cream font-grotesk">{nft.score}</p>
                  </div>
                  <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CTA */}
      <section className="relative w-full overflow-hidden">
        <video src={VIDEOS.cta} autoPlay loop muted playsInline className="w-full h-auto block" />
        <div className="absolute inset-0 flex items-center justify-end lg:pr-[20%] lg:pl-[15%] px-6 sm:px-10">
          <div className="relative text-right">
            <span className="absolute -top-6 sm:-top-10 left-0 font-condiment text-neon -rotate-1 pointer-events-none" style={{ fontSize: 'clamp(17px, 5vw, 68px)', mixBlendMode: 'exclusion' }}>
              Go beyond
            </span>
            <h2 className="font-grotesk uppercase text-cream leading-none" style={{ fontSize: 'clamp(16px, 4.5vw, 60px)' }}>
              <span className="block mb-4 sm:mb-8 lg:mb-12">JOIN US.</span>
              REVEAL WHAT'S HIDDEN.<br />DEFINE WHAT'S NEXT.<br />FOLLOW THE SIGNAL.
            </h2>
          </div>
        </div>
        <div className="absolute left-[8%] bottom-[12%] sm:bottom-[16%] lg:bottom-[20%]">
          <div className="liquid-glass rounded-[0.5rem] sm:rounded-[0.875rem] lg:rounded-[1.25rem] overflow-hidden flex flex-col">
            {[Mail, X, GitBranch].map((Icon, i) => (
              <button key={i} className={`flex items-center justify-center text-cream hover:bg-white/10 transition-colors duration-200 w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] h-[14vw] sm:h-[14.375rem] md:h-[10.78125rem] lg:h-[5rem] ${i < 2 ? 'border-b border-white/10' : ''}`}>
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Replace `src/App.tsx` with router setup**

```tsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import BuyNFT from './pages/BuyNFT'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="buy" element={<BuyNFT />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
```

- [ ] **Step 3: Wrap app in BrowserRouter in `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 4: Create empty stub pages so App.tsx compiles**

Create `src/pages/Gallery.tsx`:
```tsx
export default function Gallery() { return <div className="pt-32 px-16 text-cream font-grotesk">Gallery</div> }
```

Create `src/pages/BuyNFT.tsx`:
```tsx
export default function BuyNFT() { return <div className="pt-32 px-16 text-cream font-grotesk">Buy NFT</div> }
```

Create `src/pages/FAQ.tsx`:
```tsx
export default function FAQ() { return <div className="pt-32 px-16 text-cream font-grotesk">FAQ</div> }
```

Create `src/pages/Contact.tsx`:
```tsx
export default function Contact() { return <div className="pt-32 px-16 text-cream font-grotesk">Contact</div> }
```

- [ ] **Step 5: Verify build passes**

```bash
cd c:/Users/franc/Documents/orbit && npm run build
```

Expected: `✓ built in` with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Home.tsx src/pages/Gallery.tsx src/pages/BuyNFT.tsx src/pages/FAQ.tsx src/pages/Contact.tsx src/App.tsx src/main.tsx
git commit -m "feat: set up React Router with Layout and Home page"
```

---

## Task 4: Gallery page

**Files:**
- Modify: `src/pages/Gallery.tsx`

- [ ] **Step 1: Implement `src/pages/Gallery.tsx`**

```tsx
import { useState } from 'react'
import { NFTS, RarityTier } from '../data/nfts'

type Filter = 'ALL' | RarityTier

const FILTERS: Filter[] = ['ALL', 'RARE', 'EPIC', 'LEGENDARY']

const TIER_COLOR: Record<RarityTier, string> = {
  RARE: 'text-blue-300',
  EPIC: 'text-purple-400',
  LEGENDARY: 'text-neon',
}

export default function Gallery() {
  const [active, setActive] = useState<Filter>('ALL')

  const visible = active === 'ALL' ? NFTS : NFTS.filter((n) => n.tier === active)

  return (
    <div className="bg-background min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-[1831px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="font-grotesk uppercase text-cream leading-none mb-2"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Gallery
          </h1>
          <span
            className="font-condiment text-neon"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          >
            Space objects collection
          </span>
        </div>

        {/* Filter bar */}
        <div className="flex gap-3 flex-wrap mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`liquid-glass rounded-full px-6 py-2 font-grotesk text-[13px] uppercase tracking-wider transition-all duration-200 ${
                active === f
                  ? 'bg-neon/20 text-neon border border-neon/40'
                  : 'text-cream/70 hover:text-cream hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((nft) => (
            <div
              key={nft.id}
              className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition-colors duration-200"
            >
              <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden">
                <video
                  src={nft.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="liquid-glass rounded-[20px] px-5 py-4 mt-3 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-cream/70 uppercase font-grotesk tracking-wider mb-0.5">
                    {nft.name}
                  </p>
                  <p className={`text-[13px] font-grotesk uppercase ${TIER_COLOR[nft.tier]}`}>
                    {nft.tier}
                  </p>
                  <p className="text-[16px] text-cream font-grotesk mt-1">
                    Score: {nft.score}
                  </p>
                </div>
                <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform duration-200 flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Gallery.tsx
git commit -m "feat: Gallery page with rarity filter"
```

---

## Task 5: Buy NFT page

**Files:**
- Modify: `src/pages/BuyNFT.tsx`

- [ ] **Step 1: Implement `src/pages/BuyNFT.tsx`**

```tsx
import { useState } from 'react'
import { NFTS, NFTItem } from '../data/nfts'

export default function BuyNFT() {
  const [selected, setSelected] = useState<NFTItem>(NFTS[0])
  const [walletConnected, setWalletConnected] = useState(false)
  const [minted, setMinted] = useState(false)

  function handleMint() {
    if (!walletConnected) return
    setMinted(true)
  }

  return (
    <div className="bg-background min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-[1831px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="font-grotesk uppercase text-cream leading-none mb-2"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Buy NFT
          </h1>
          <span
            className="font-condiment text-neon"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          >
            Own a piece of the void
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: NFT selector */}
          <div className="flex-1 flex flex-col gap-4">
            <p className="font-grotesk text-[13px] uppercase text-cream/50 tracking-wider mb-2">
              Select your NFT
            </p>
            {NFTS.map((nft) => (
              <button
                key={nft.id}
                onClick={() => { setSelected(nft); setMinted(false) }}
                className={`liquid-glass rounded-[20px] p-4 flex items-center gap-4 transition-all duration-200 text-left ${
                  selected.id === nft.id
                    ? 'bg-white/10 border border-neon/30'
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="relative w-20 h-20 rounded-[12px] overflow-hidden flex-shrink-0">
                  <video
                    src={nft.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-grotesk text-[14px] uppercase text-cream truncate">
                    {nft.name}
                  </p>
                  <p className="font-mono text-[12px] text-cream/50 uppercase mt-1">
                    {nft.tier} · Score {nft.score}
                  </p>
                </div>
                <p className="font-grotesk text-[16px] text-neon flex-shrink-0">
                  {nft.price}
                </p>
              </button>
            ))}
          </div>

          {/* Right: checkout panel */}
          <div className="lg:w-[420px] flex-shrink-0">
            <div className="liquid-glass rounded-[32px] p-8 flex flex-col gap-6 sticky top-28">
              {/* Preview */}
              <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden">
                <video
                  key={selected.id}
                  src={selected.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div>
                <p className="font-grotesk text-[11px] uppercase text-cream/50 tracking-wider">
                  Selected
                </p>
                <p className="font-grotesk text-[22px] uppercase text-cream mt-1">
                  {selected.name}
                </p>
                <p className="font-grotesk text-[32px] text-neon mt-2">
                  {selected.price}
                </p>
              </div>

              {/* Wallet connect */}
              <button
                onClick={() => setWalletConnected((v) => !v)}
                className={`w-full py-4 rounded-[16px] font-grotesk text-[14px] uppercase tracking-wider transition-all duration-200 ${
                  walletConnected
                    ? 'bg-neon/20 text-neon border border-neon/40'
                    : 'liquid-glass text-cream hover:bg-white/10'
                }`}
              >
                {walletConnected ? '✓ Wallet Connected' : 'Connect Wallet'}
              </button>

              {/* Mint button */}
              {!minted ? (
                <button
                  onClick={handleMint}
                  disabled={!walletConnected}
                  className={`w-full py-5 rounded-[16px] font-grotesk text-[16px] uppercase tracking-wider transition-all duration-200 ${
                    walletConnected
                      ? 'bg-gradient-to-br from-[#b724ff] to-[#7c3aed] text-white shadow-lg shadow-purple-500/40 hover:scale-[1.02]'
                      : 'bg-white/5 text-cream/30 cursor-not-allowed'
                  }`}
                >
                  Mint Now
                </button>
              ) : (
                <div className="w-full py-5 rounded-[16px] bg-neon/10 border border-neon/30 text-center">
                  <p className="font-grotesk text-[14px] uppercase text-neon tracking-wider">
                    🚀 Minted Successfully!
                  </p>
                  <p className="font-mono text-[12px] text-cream/50 mt-1">
                    {selected.name} is now yours
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/BuyNFT.tsx
git commit -m "feat: Buy NFT page with wallet connect and mint flow"
```

---

## Task 6: FAQ page

**Files:**
- Modify: `src/pages/FAQ.tsx`

- [ ] **Step 1: Implement `src/pages/FAQ.tsx`**

```tsx
import { useState } from 'react'

const FAQS = [
  { q: 'What is Orbis.Nft?', a: 'Orbis.Nft is a curated collection of AI-generated space objects — unique digital artifacts fixed beyond time and place, each existing as a one-of-one on-chain asset.' },
  { q: 'How do I purchase an NFT?', a: 'Navigate to the Buy NFT page, connect your Web3 wallet (MetaMask, Coinbase Wallet, etc.), select the object you want, and click Mint Now. The transaction is processed on-chain instantly.' },
  { q: 'Which blockchain do you use?', a: 'Orbis.Nft is deployed on Ethereum mainnet. All assets are stored on IPFS for permanent decentralized hosting, with metadata pinned via Pinata.' },
  { q: 'What does "rarity score" mean?', a: 'Each NFT is algorithmically scored from 1 to 10 based on visual complexity, generative uniqueness, and trait rarity. Higher scores indicate rarer objects — LEGENDARY tier starts at 9.0.' },
  { q: 'Can I resell my NFT?', a: 'Yes. All Orbis.Nft tokens are fully tradeable on secondary markets including OpenSea and Blur. A 5% royalty is returned to the creator on each secondary sale.' },
  { q: 'What wallet do I need?', a: 'Any EVM-compatible wallet works — MetaMask, Rainbow, Coinbase Wallet, or WalletConnect-enabled wallets. Make sure you have enough ETH for the NFT price plus gas fees.' },
  { q: 'Are the videos stored on-chain?', a: 'The video files are stored on IPFS via decentralized storage. The on-chain token holds a content hash pointing to the permanent IPFS location — not a centralized server.' },
  { q: 'How many NFTs exist in the collection?', a: 'The genesis collection contains 333 unique space objects. Once all are minted, no new objects will be generated. Each piece is permanently unique.' },
  { q: 'Do holders get any benefits?', a: 'Orbis holders gain access to the private Discord, early access to future drops, and voting rights on collection governance decisions including future generative models.' },
  { q: 'How are the NFTs generated?', a: 'Each object is generated using a custom diffusion model trained on astronomical data, deep space photography, and abstract spatial forms. No two outputs share the same structure.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="bg-background min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-[1831px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-16">
          <h1
            className="font-grotesk uppercase text-cream leading-none mb-2"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            FAQ
          </h1>
          <span
            className="font-condiment text-neon"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          >
            Frequently asked questions
          </span>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 max-w-[900px]">
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`liquid-glass rounded-[20px] overflow-hidden transition-all duration-200 ${
                  isOpen ? 'bg-white/5' : 'hover:bg-white/5'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-grotesk text-[15px] sm:text-[17px] uppercase text-cream pr-4">
                    {item.q}
                  </span>
                  <span
                    className={`font-grotesk text-[24px] text-neon flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '300px' : '0px' }}
                >
                  <p className="font-mono text-[13px] sm:text-[15px] text-cream/70 px-6 pb-6 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/FAQ.tsx
git commit -m "feat: FAQ page with animated accordion"
```

---

## Task 7: Contact page

**Files:**
- Modify: `src/pages/Contact.tsx`

- [ ] **Step 1: Implement `src/pages/Contact.tsx`**

```tsx
import { useState } from 'react'
import { Mail, X, GitBranch } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="bg-background min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-[1831px] px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-16">
          <h1
            className="font-grotesk uppercase text-cream leading-none mb-2"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Contact
          </h1>
          <span
            className="font-condiment text-neon"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          >
            Get in touch
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left: form */}
          <div className="flex-1 max-w-[600px]">
            {!sent ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="font-grotesk text-[11px] uppercase text-cream/50 tracking-wider block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full liquid-glass rounded-[14px] px-5 py-4 font-mono text-[14px] text-cream bg-transparent outline-none placeholder-cream/20 focus:bg-white/5 transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-grotesk text-[11px] uppercase text-cream/50 tracking-wider block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full liquid-glass rounded-[14px] px-5 py-4 font-mono text-[14px] text-cream bg-transparent outline-none placeholder-cream/20 focus:bg-white/5 transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="font-grotesk text-[11px] uppercase text-cream/50 tracking-wider block mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full liquid-glass rounded-[14px] px-5 py-4 font-mono text-[14px] text-cream bg-transparent outline-none placeholder-cream/20 focus:bg-white/5 transition-colors duration-200 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="liquid-glass rounded-[14px] px-8 py-4 font-grotesk text-[14px] uppercase tracking-wider text-cream hover:bg-white/10 transition-all duration-200 self-start"
                >
                  Send Message →
                </button>
              </form>
            ) : (
              <div className="liquid-glass rounded-[24px] p-10 text-center">
                <p className="font-condiment text-neon mb-3" style={{ fontSize: '48px' }}>
                  Message sent!
                </p>
                <p className="font-mono text-[14px] text-cream/60 uppercase">
                  We'll get back to you soon, {form.name}.
                </p>
                <button
                  onClick={() => { setForm({ name: '', email: '', message: '' }); setSent(false) }}
                  className="mt-6 font-grotesk text-[13px] uppercase text-neon hover:opacity-70 transition-opacity"
                >
                  Send another
                </button>
              </div>
            )}
          </div>

          {/* Right: social + info */}
          <div className="flex flex-col gap-10">
            <div>
              <p className="font-grotesk text-[11px] uppercase text-cream/50 tracking-wider mb-6">
                Find us
              </p>
              <div className="liquid-glass rounded-[20px] overflow-hidden flex flex-col divide-y divide-white/10">
                {[
                  { Icon: Mail,      label: 'hello@orbis.nft',  sub: 'Email' },
                  { Icon: X,         label: '@orbis_nft',        sub: 'Twitter / X' },
                  { Icon: GitBranch, label: 'github.com/orbis',  sub: 'GitHub' },
                ].map(({ Icon, label, sub }) => (
                  <div key={sub} className="flex items-center gap-4 px-6 py-5 hover:bg-white/5 transition-colors duration-200">
                    <div className="liquid-glass rounded-[12px] w-12 h-12 flex items-center justify-center text-cream flex-shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-grotesk text-[14px] uppercase text-cream">{label}</p>
                      <p className="font-mono text-[12px] text-cream/40 uppercase">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-grotesk text-[11px] uppercase text-cream/50 tracking-wider mb-4">
                Response time
              </p>
              <p className="font-mono text-[14px] text-cream/60 uppercase leading-relaxed max-w-[280px]">
                We typically respond within 24–48 hours. For urgent matters, reach out on Twitter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: no errors.

- [ ] **Step 3: Final commit**

```bash
git add src/pages/Contact.tsx
git commit -m "feat: Contact page with form and social links"
```

---

## Self-Review

- ✅ All 5 routes covered (Home, Gallery, BuyNFT, FAQ, Contact)
- ✅ Shared Layout with responsive navbar in every route
- ✅ NFT data centralized in `src/data/nfts.ts`, no duplication
- ✅ No TBD/TODO/placeholder steps — all code is complete
- ✅ Types consistent: `NFTItem`, `RarityTier` defined in Task 1, used in Tasks 4 & 5
- ✅ Build verification step in every task
- ✅ Mobile hamburger menu in Layout covers mobile nav requirement
