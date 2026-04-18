import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NFTS } from '../data/nfts'
import type { RarityTier } from '../data/nfts'

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
                <Link
                  to={`/nft/${nft.id}`}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform duration-200 flex-shrink-0"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
