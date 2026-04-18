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
