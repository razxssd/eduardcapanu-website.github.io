import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../animations/gsap-setup'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'
import ParticleField from '../canvas/ParticleField'
import AuroraBackground from '../canvas/AuroraBackground'
import SplitText from '../ui/SplitText'

const NARRATIVE_PHRASES = [
  'From curiosity',
  'to code',
  'to products',
  'to impact.',
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const narrativeRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const phaseRef = useRef<string>('dark')

  const [showAurora, setShowAurora] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [hideNarrative, setHideNarrative] = useState(false)
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  function skipToAmbient() {
    if (phaseRef.current === 'ambient') return
    phaseRef.current = 'ambient'
    timelineRef.current?.kill()

    setShowAurora(true)
    setShowParticles(true)
    setHideNarrative(true)

    // Instantly show final state
    if (narrativeRef.current) gsap.set(narrativeRef.current, { opacity: 0 })
    if (nameRef.current) {
      gsap.set(nameRef.current, { opacity: 1 })
      const chars = nameRef.current.querySelectorAll('.char')
      gsap.set(chars, { opacity: 1, y: 0, x: 0, scale: 1 })
    }
    if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0 })
    if (scrollIndicatorRef.current) gsap.set(scrollIndicatorRef.current, { opacity: 1 })
  }

  useEffect(() => {
    if (reducedMotion) {
      skipToAmbient()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        phaseRef.current = 'ambient'
        setShowParticles(true)
        setHideNarrative(true)
      },
    })
    timelineRef.current = tl

    const speed = isMobile ? 0.5 : 1

    // Phase 1: Show aurora
    tl.call(() => setShowAurora(true), [], 0.1)

    // Phase 2: Narrative text reveal
    const phraseEls = narrativeRef.current?.querySelectorAll<HTMLElement>('.phrase')
    if (phraseEls && phraseEls.length > 0) {
      phraseEls.forEach((el, i) => {
        const t = (0.4 + i * 0.5) * speed
        tl.fromTo(
          el,
          { opacity: 0, y: 20, filter: 'blur(20px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 * speed, ease: 'power3.out' },
          t,
        )
      })

      // Color the last phrase cyan
      const lastPhrase = phraseEls[phraseEls.length - 1]
      if (lastPhrase) {
        const colorTime = (0.4 + (phraseEls.length - 1) * 0.5 + 0.5) * speed
        tl.to(lastPhrase, { color: '#00d4ff', duration: 0.4 }, colorTime)
      }
    }

    // Phase 3: Fade out narrative, reveal name
    const nameStart = (0.4 + NARRATIVE_PHRASES.length * 0.5 + 0.6) * speed

    if (narrativeRef.current) {
      tl.to(narrativeRef.current, { opacity: 0, scale: 0.95, duration: 0.5, ease: 'power2.in' }, nameStart)
    }

    // Name character reveal
    if (nameRef.current) {
      tl.set(nameRef.current, { opacity: 1 }, nameStart + 0.3)
      const chars = nameRef.current.querySelectorAll('.char')
      if (chars.length > 0) {
        tl.fromTo(
          chars,
          { opacity: 0, y: () => gsap.utils.random(-30, 30), x: () => gsap.utils.random(-15, 15), scale: 0.8 },
          { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.5, stagger: 0.025, ease: 'back.out(1.2)' },
          nameStart + 0.4,
        )
      }
    }

    // Subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        nameStart + 0.8,
      )
    }

    // Scroll indicator
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        nameStart + 1.2,
      )
    }

    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, isMobile])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg"
      onClick={phaseRef.current !== 'ambient' ? skipToAmbient : undefined}
    >
      {/* Aurora background */}
      <AuroraBackground
        className={`transition-opacity duration-1000 ${showAurora ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Particle field — desktop only, fades in during ambient */}
      {showParticles && <ParticleField opacity={0.7} />}

      {/* Content — stacked layers so narrative and name crossfade in place */}
      <div className="relative z-10 w-full px-6 max-w-4xl mx-auto">
        <div className="relative" style={{ minHeight: '12rem' }}>
          {/* Narrative phrases — absolutely positioned to overlap with name */}
          <div
            ref={narrativeRef}
            className={`absolute inset-0 flex flex-col items-center justify-center text-center ${hideNarrative ? 'pointer-events-none' : ''}`}
          >
            {NARRATIVE_PHRASES.map((phrase, i) => (
              <div
                key={i}
                className="phrase opacity-0 font-mono font-bold text-text leading-tight mb-2"
                style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}
              >
                {phrase}
              </div>
            ))}
          </div>

          {/* Name + subtitle — absolutely positioned, same space */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <div ref={nameRef} className="opacity-0">
              <h1
                className="font-mono font-bold text-text tracking-tight mb-4"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
              >
                <SplitText text="EDUARD CAPANU" mode="chars" />
              </h1>
            </div>

            <div ref={subtitleRef} className="opacity-0">
              <p
                className="font-mono text-text-secondary"
                style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}
              >
                Helping teams build what matters
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-primary/60 to-transparent animate-pulse-glow" />
      </div>
    </section>
  )
}
