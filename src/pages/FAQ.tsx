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
