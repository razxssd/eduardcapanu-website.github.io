import { useState, useEffect, useCallback } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import NeuralNetworkCanvas from '../canvas/NeuralNetworkCanvas'
import SVGRings from '../ui/SVGRings'
import GlitchText from '../ui/GlitchText'
import ScrollIndicator from '../ui/ScrollIndicator'

const BOOT_LINES = [
  '> initializing system...',
  '> loading modules: [engineering, architecture, product, growth]',
  '> career.version = "9.2"',
  '> status: OPERATIONAL',
  '> identity.resolve()',
]

const SUBTITLE_TEXTS = [
  'Technical Growth PM @ Rebrandly',
  'Started from curiosity, still learning every day.',
  '9 years of building — now I help teams build better.',
  'From writing code to shaping what gets built.',
]

type Phase = 'boot' | 'canvas' | 'reveal' | 'ambient'

export default function Hero() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reducedMotion ? 'ambient' : 'boot')
  const [visibleLines, setVisibleLines] = useState(0)
  const [skipped, setSkipped] = useState(reducedMotion)

  const skipBoot = useCallback(() => {
    if (phase === 'ambient') return
    setSkipped(true)
    setPhase('ambient')
    setVisibleLines(BOOT_LINES.length)
  }, [phase])

  // Boot sequence timing
  useEffect(() => {
    if (skipped || reducedMotion) return

    // Phase 1: Type boot lines — slower so each is readable
    const lineTimers: ReturnType<typeof setTimeout>[] = []
    const lineDelay = isMobile ? 500 : 650

    BOOT_LINES.forEach((_, i) => {
      lineTimers.push(
        setTimeout(() => setVisibleLines(i + 1), i * lineDelay),
      )
    })

    // Phase 2: Canvas awakens — give boot text time to be read
    const bootDuration = BOOT_LINES.length * lineDelay
    const canvasDelay = isMobile ? bootDuration + 400 : bootDuration + 600
    const canvasTimer = setTimeout(() => setPhase('canvas'), canvasDelay)

    // Phase 3: Name reveal — let canvas breathe
    const revealDelay = canvasDelay + (isMobile ? 1000 : 1800)
    const revealTimer = setTimeout(() => setPhase('reveal'), revealDelay)

    // Phase 4: Ambient
    const ambientDelay = revealDelay + (isMobile ? 1000 : 1500)
    const ambientTimer = setTimeout(() => setPhase('ambient'), ambientDelay)

    return () => {
      lineTimers.forEach(clearTimeout)
      clearTimeout(canvasTimer)
      clearTimeout(revealTimer)
      clearTimeout(ambientTimer)
    }
  }, [skipped, isMobile, reducedMotion])

  const showCanvas = !isMobile && (phase === 'canvas' || phase === 'reveal' || phase === 'ambient')
  const showRings = isMobile && (phase !== 'boot')
  const showName = phase === 'reveal' || phase === 'ambient'
  const showBoot = phase === 'boot' || phase === 'canvas' // visible during both boot and canvas phases

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden cursor-default"
      onClick={skipBoot}
    >
      {/* Canvas background (desktop only) */}
      {showCanvas && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: phase === 'canvas' ? 0.4 : 0.85 }}
        >
          <NeuralNetworkCanvas />
        </div>
      )}

      {/* SVG Rings (mobile fallback) */}
      {showRings && (
        <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: 0.7 }}>
          <SVGRings />
        </div>
      )}

      {/* Boot text */}
      <div
        className={`relative z-10 max-w-lg px-6 transition-opacity duration-500 ${
          showBoot && !skipped ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
        }`}
      >
        <div className="font-mono text-xs md:text-sm text-primary/60 space-y-1.5">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="whitespace-nowrap">
              {line}
            </div>
          ))}
          {visibleLines < BOOT_LINES.length && (
            <span className="inline-block w-2 h-4 bg-primary/50 animate-pulse" />
          )}
        </div>
      </div>

      {/* Name + subtitle */}
      <div
        className={`relative z-10 text-center transition-all duration-700 ${
          showName ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h1
          className={`font-extrabold tracking-tight text-text ${
            showName && !reducedMotion ? 'animate-glitch' : ''
          }`}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          EDUARD CAPANU
        </h1>

        <div className="mt-4 h-8">
          {phase === 'ambient' && (
            <div className="font-mono text-sm md:text-base text-primary/80">
              <GlitchText texts={SUBTITLE_TEXTS} interval={3000} />
            </div>
          )}
        </div>
      </div>

      {/* Floating geometric shapes (desktop only) */}
      {!isMobile && phase === 'ambient' && !reducedMotion && (
        <>
          <div
            className="absolute top-1/4 left-[15%] w-16 h-16 border border-primary/10 rotate-45 animate-float pointer-events-none"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="absolute bottom-1/3 right-[12%] w-12 h-12 pointer-events-none"
            style={{ animation: 'float 10s ease-in-out 2s infinite' }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,5 95,97.5 5,97.5"
                fill="none"
                stroke="rgba(0, 212, 255, 0.08)"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div
            className="absolute top-1/3 right-[25%] w-20 h-20 pointer-events-none"
            style={{ animation: 'float 12s ease-in-out 1s infinite' }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                fill="none"
                stroke="rgba(255, 215, 0, 0.06)"
                strokeWidth="0.8"
              />
            </svg>
          </div>
        </>
      )}

      {/* Scroll indicator */}
      {phase === 'ambient' && <ScrollIndicator />}

      {/* Skip hint on mobile */}
      {isMobile && phase === 'boot' && !skipped && (
        <p className="absolute bottom-12 text-text-muted text-xs font-mono">
          tap to skip
        </p>
      )}
    </section>
  )
}
