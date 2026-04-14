import { gsap, ScrollTrigger } from './gsap-setup'

/**
 * Fade-up entrance animation triggered on scroll.
 */
export function createFadeUpEntrance(
  elements: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
  options: {
    trigger?: HTMLElement
    start?: string
    stagger?: number
    scrub?: boolean
    y?: number
  } = {},
) {
  const {
    trigger,
    start = 'top 85%',
    stagger = 0.1,
    scrub = false,
    y = 40,
  } = options

  return gsap.from(elements, {
    opacity: 0,
    y,
    stagger,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: trigger ?? (elements instanceof HTMLElement ? elements : (elements as HTMLElement[])[0]),
      start,
      scrub,
      toggleActions: scrub ? undefined : 'play none none none',
    },
  })
}

/**
 * Creates a scroll-driven SVG line drawing animation.
 */
export function createLineDrawAnimation(
  svgPath: SVGPathElement,
  options: {
    trigger?: HTMLElement
    start?: string
    end?: string
  } = {},
) {
  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
  } = options

  const length = svgPath.getTotalLength()
  gsap.set(svgPath, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })

  return gsap.to(svgPath, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger ?? svgPath,
      start,
      end,
      scrub: 1,
    },
  })
}

/**
 * Mobile-optimized simple fade-up (no scrub, play-once).
 */
export function createMobileFadeUp(
  elements: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
  options: {
    trigger?: HTMLElement
    stagger?: number
  } = {},
) {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    stagger: options.stagger ?? 0.08,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: options.trigger ?? (elements instanceof HTMLElement ? elements : (elements as HTMLElement[])[0]),
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  })
}

// Re-export for convenience
export { gsap, ScrollTrigger }
