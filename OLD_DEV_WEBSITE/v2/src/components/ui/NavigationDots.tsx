import { useEffect, useState } from 'react'

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

export default function NavigationDots({ sections }: Props) {
  const [active, setActive] = useState(sections[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { threshold: 0.3 },
    )

    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {sections.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex items-center gap-3 justify-end"
          aria-label={LABELS[id]}
        >
          <span className="font-mono text-[10px] tracking-wider text-text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {LABELS[id]}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === id
                ? 'w-3 h-3 bg-primary animate-pulse-glow'
                : 'w-2 h-2 bg-text-muted/40 group-hover:bg-primary/60'
            }`}
          />
        </a>
      ))}
    </nav>
  )
}
