import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'story', label: 'Story' },
  { id: 'capabilities', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'voices', label: 'Voices' },
  { id: 'connect', label: 'Connect' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      // Find active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 3) {
            setActiveSection(SECTIONS[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating nav bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-bg/80 backdrop-blur-md border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-14 md:h-16">
          {/* Logo / Name */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-mono text-sm md:text-base text-text-secondary hover:text-primary transition-colors"
          >
            EC<span className="text-primary">.</span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.slice(1).map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`text-sm font-mono transition-colors duration-300 ${
                  activeSection === s.id
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block w-5 h-[1.5px] bg-text transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-[5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-text transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-text transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-[5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-30 bg-bg/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`text-2xl font-mono transition-colors duration-300 ${
              activeSection === s.id ? 'text-primary' : 'text-text-secondary'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </>
  )
}
