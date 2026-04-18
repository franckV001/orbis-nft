# NFT Detail Page — Design Spec

## Goal
Add an immersive full-screen NFT detail page (`/nft/:id`) reachable by clicking any NFT card in the Gallery or Home section 3.

## Architecture

- **Route:** `/nft/:id` nested under the existing `<Layout />` in `src/App.tsx`
- **New file:** `src/pages/NFTDetail.tsx`
- **Data change:** Add `description: string` field to each `NFTItem` in `src/data/nfts.ts`
- **Card changes:** `Gallery.tsx` and `Home.tsx` section 3 chevron buttons become `<Link to={/nft/${nft.id}}>` wrappers

## Page Layout

**Background:** Full-viewport video (`object-cover`, autoPlay, loop, muted, playsInline) using the NFT's video URL.

**Top-left:** `← Back` button — liquid-glass, rounded-[1rem], links back to `/gallery`.

**Bottom overlay:** Dark gradient (`bg-gradient-to-t from-black/90 via-black/40 to-transparent`) covering ~60% of the viewport height. Contains:
1. Tier badge — pill with color: RARE=blue-300, EPIC=purple-400, LEGENDARY=neon
2. NFT name — Anton font, clamp(40px, 6vw, 80px), uppercase, text-cream
3. Score + price row — monospace 14–16px, text-cream/70
4. Description — monospace 13–15px, text-cream/60, max 2–3 lines, max-w-[600px]
5. "Mint Now" button — gradient from-[#b724ff] to-[#7c3aed], same style as BuyNFT page

**Prev/Next navigation:** Two liquid-glass arrow buttons at bottom-left and bottom-right of the overlay row. Clicking updates URL to `/nft/:prevId` or `/nft/:nextId` (wraps around). IDs cycle through all 9 NFTs in order.

## Data Changes

Each `NFTItem` gets a `description` field (1–2 sentences, space/void theme). Example:
- "A spectral form drifting at the edge of observable space. Born from the collision of two dying stars, its shape shifts with each observation."

## Navigation Flow

`Gallery` card chevron → `/nft/:id` → Back button → `/gallery`  
`Home` section 3 card chevron → `/nft/:id` → Back button → `/gallery`

## Constraints
- No new packages needed
- Reuses existing liquid-glass, font-grotesk, font-condiment, text-neon, bg-background tokens
- If `id` param doesn't match any NFT, redirect to `/gallery`
