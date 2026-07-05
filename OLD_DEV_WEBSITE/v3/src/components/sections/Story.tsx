import { useEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap-setup'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { CAREER_BEATS } from '../../data/career'
import GlassCard from '../ui/GlassCard'

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate the gradient connecting line
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength()
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: isMobile ? false : 1,
            toggleActions: isMobile ? 'play none none none' : undefined,
          },
        })
      }

      // Animate each beat
      const beats = sectionRef.current?.querySelectorAll<HTMLElement>('.story-beat')
      beats?.forEach((beat, i) => {
        const heading = beat.querySelector('.beat-heading')
        const content = beat.querySelector('.beat-content')
        const metric = beat.querySelector('.beat-metric')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: beat,
            start: 'top 80%',
            end: 'top 30%',
            scrub: isMobile ? false : 0.8,
            toggleActions: isMobile ? 'play none none none' : undefined,
          },
        })

        if (heading) {
          tl.from(heading, {
            opacity: 0,
            y: 30,
            filter: 'blur(8px)',
            duration: 0.8,
          }, 0)
        }
        if (content) {
          tl.from(content, {
            opacity: 0,
            y: 20,
            duration: 0.6,
          }, 0.2)
        }
        if (metric) {
          tl.from(metric, {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
          }, isMobile ? 0.3 : 0.4)
        }

        // Stagger the detail items
        const details = beat.querySelectorAll('.beat-detail')
        if (details.length > 0) {
          tl.from(details, {
            opacity: 0,
            x: i % 2 === 0 ? -20 : 20,
            stagger: 0.08,
            duration: 0.4,
          }, isMobile ? 0.3 : 0.5)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile, reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative py-24 md:py-32 px-6"
    >
      {/* Section heading */}
      <div className="max-w-4xl mx-auto mb-16 md:mb-24">
        <p className="font-mono text-xs md:text-sm text-primary tracking-widest uppercase mb-4">
          The Journey
        </p>
        <h2
          className="font-mono font-bold text-text"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
        >
          How I got here
        </h2>
      </div>

      {/* Connecting gradient line (desktop) */}
      {!isMobile && (
        <svg
          className="absolute left-1/2 top-48 -translate-x-1/2 w-[2px] pointer-events-none"
          style={{ height: 'calc(100% - 16rem)' }}
          viewBox="0 0 2 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="60%" stopColor="#00d4ff" />
              <stop offset="80%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#ffd700" />
            </linearGradient>
          </defs>
          <path
            ref={lineRef}
            d="M1,0 L1,1000"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
        </svg>
      )}

      {/* Career beats */}
      <div className="max-w-4xl mx-auto space-y-16 md:space-y-24 relative">
        {CAREER_BEATS.map((beat, i) => (
          <div
            key={beat.id}
            className={`story-beat relative ${
              !isMobile && i % 2 === 0 ? 'md:pr-[55%]' : !isMobile ? 'md:pl-[55%]' : ''
            }`}
          >
            {/* Year badge */}
            <div
              className={`font-mono text-xs tracking-wider mb-3 ${
                beat.color === 'cyan' ? 'text-primary' : 'text-secondary'
              }`}
            >
              {beat.year}
            </div>

            {/* Heading */}
            <h3
              className="beat-heading font-mono font-bold text-text mb-4"
              style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
            >
              {beat.heading}
            </h3>

            {/* Narrative */}
            <div className="beat-content space-y-4">
              <p className="text-text-secondary leading-relaxed">
                {beat.narrative}
              </p>

              {/* Details */}
              <ul className="space-y-2">
                {beat.details.map((detail, j) => (
                  <li
                    key={j}
                    className={`beat-detail flex items-start gap-2 text-sm text-text-secondary`}
                  >
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                      beat.color === 'cyan' ? 'bg-primary' : 'bg-secondary'
                    }`} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Metric card */}
            {beat.metric && (
              <GlassCard
                glow={beat.color === 'cyan' ? 'cyan' : 'gold'}
                className="beat-metric mt-6 inline-block"
              >
                <div className={`font-mono font-bold text-xl ${
                  beat.color === 'cyan' ? 'text-primary' : 'text-secondary'
                }`}>
                  {beat.metric.value}
                </div>
                <div className="text-xs text-text-muted mt-1">
                  {beat.metric.label}
                </div>
              </GlassCard>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
