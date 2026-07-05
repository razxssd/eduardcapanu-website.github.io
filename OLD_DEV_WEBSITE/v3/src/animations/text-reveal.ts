import { gsap } from 'gsap'

/**
 * Creates a cinematic text reveal timeline.
 * Each phrase blurs in from invisible, with staggered timing.
 */
export function createTextRevealTimeline(
  elements: HTMLElement[],
  options: {
    staggerDelay?: number
    blurFrom?: number
    yOffset?: number
    duration?: number
  } = {},
) {
  const {
    staggerDelay = 0.2,
    blurFrom = 20,
    yOffset = 20,
    duration = 0.8,
  } = options

  const tl = gsap.timeline()

  // Set initial state
  gsap.set(elements, {
    opacity: 0,
    y: yOffset,
    filter: `blur(${blurFrom}px)`,
  })

  elements.forEach((el, i) => {
    tl.to(
      el,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration,
        ease: 'power3.out',
      },
      i * (duration * 0.6 + staggerDelay),
    )
  })

  return tl
}

/**
 * Creates a staggered character reveal from random positions.
 */
export function createCharacterRevealTimeline(
  container: HTMLElement,
  options: {
    duration?: number
    stagger?: number
  } = {},
) {
  const { duration = 0.6, stagger = 0.03 } = options
  const chars = container.querySelectorAll<HTMLElement>('.char')

  const tl = gsap.timeline()

  gsap.set(chars, {
    opacity: 0,
    y: () => gsap.utils.random(-40, 40),
    x: () => gsap.utils.random(-20, 20),
    scale: 0.8,
  })

  tl.to(chars, {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    duration,
    stagger,
    ease: 'back.out(1.2)',
  })

  return tl
}
