import { useEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap-setup'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { TESTIMONIALS } from '../../data/testimonials'
import GlassCard from '../ui/GlassCard'

export default function Voices() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate the quote mark
      const quoteMark = sectionRef.current?.querySelector('.quote-mark')
      if (quoteMark) {
        gsap.from(quoteMark, {
          opacity: 0,
          scale: 0.5,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Animate testimonial cards
      const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.voice-card')
      if (cards) {
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current?.querySelector('.voice-grid'),
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
      id="voices"
      className="relative py-24 md:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section heading with decorative quote mark */}
        <div className="mb-16 md:mb-20 relative">
          <span className="quote-mark absolute -top-8 -left-4 md:-left-8 text-primary/10 font-mono leading-none select-none pointer-events-none"
            style={{ fontSize: 'clamp(6rem, 15vw, 12rem)' }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="font-mono text-xs md:text-sm text-primary tracking-widest uppercase mb-4">
            Voices
          </p>
          <h2
            className="font-mono font-bold text-text"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            What others say
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="voice-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <GlassCard
              key={testimonial.id}
              glow="cyan"
              hover={false}
              className="voice-card"
            >
              <blockquote className="text-sm md:text-base text-text-secondary leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <footer className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-mono text-primary">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-mono text-text">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-text-muted">
                    {testimonial.role}
                  </div>
                </div>
              </footer>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
