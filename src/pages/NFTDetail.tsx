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
