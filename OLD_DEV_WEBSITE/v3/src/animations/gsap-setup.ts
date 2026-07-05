import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Default GSAP settings for consistent behavior
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

// Configure ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
})

export { gsap, ScrollTrigger }
