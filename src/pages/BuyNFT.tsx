import { useState } from 'react'
import { NFTS } from '../data/nfts'
import type { NFTItem } from '../data/nfts'

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
