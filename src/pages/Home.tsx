import { Mail, X, GitBranch } from 'lucide-react'
import { Link } from 'react-router-dom'
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
                  <Link
                    to={`/nft/${nft.id}`}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform duration-200 flex-shrink-0"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </Link>
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
