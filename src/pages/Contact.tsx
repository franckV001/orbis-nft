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
