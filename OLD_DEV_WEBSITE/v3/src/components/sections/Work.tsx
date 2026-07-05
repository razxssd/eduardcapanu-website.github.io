import { useEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap-setup'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ACHIEVEMENTS } from '../../data/achievements'
import GlassCard from '../ui/GlassCard'

const colorMap = {
  cyan: { text: 'text-primary', glow: 'cyan' as const },
  gold: { text: 'text-secondary', glow: 'gold' as const },
  green: { text: 'text-accent-green', glow: 'green' as const },
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.work-card')
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector('.work-grid'),
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-24 md:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="mb-16 md:mb-20">
          <p className="font-mono text-xs md:text-sm text-primary tracking-widest uppercase mb-4">
            Impact
          </p>
          <h2
            className="font-mono font-bold text-text"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            The work that speaks
          </h2>
        </div>

        {/* Achievement cards grid */}
        <div className="work-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {ACHIEVEMENTS.map((achievement) => {
            const colors = colorMap[achievement.color]
            return (
              <GlassCard
                key={achievement.id}
                glow={colors.glow}
                className="work-card"
              >
                {/* Metric */}
                <div className={`font-mono font-bold text-2xl md:text-3xl ${colors.text} mb-1`}>
                  {achievement.metric}
                </div>
                <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-4">
                  {achievement.label}
                </div>

                {/* Narrative */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {achievement.narrative}
                </p>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
