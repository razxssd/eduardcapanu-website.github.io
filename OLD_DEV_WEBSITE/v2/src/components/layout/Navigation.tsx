import { useState } from 'react'

interface Props {
  sections: readonly string[]
}

const LABELS: Record<string, string> = {
  hero: 'Home',
  about: 'About',
  career: 'Career',
  skills: 'Skills',
  impact: 'Impact',
  writings: 'Writing',
  testimonials: 'Voices',
  contact: 'Contact',
}

export default function Navigation({ sections }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-6 right-6 z-50 font-mono text-sm tracking-widest text-primary hover:text-secondary transition-colors duration-300"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? (
          <span className="animate-glitch inline-block">CLOSE</span>
        ) : (
          'MENU'
        )}
      </button>

      {/* Fullscreen overlay */}
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center bg-bg/95 backdrop-blur-md transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-6 text-center">
          {sections.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="group relative font-mono text-2xl md:text-4xl font-bold text-text hover:text-primary transition-colors duration-300"
              style={{ animationDelay: open ? `${i * 80}ms` : '0ms' }}
            >
              <span className="relative z-10">{LABELS[id] ?? id}</span>
              {/* Scan-line hover */}
              <span className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
