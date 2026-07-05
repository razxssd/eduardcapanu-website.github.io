import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

interface ScrollTriggerOptions {
  trigger?: string | HTMLElement
  start?: string
  end?: string
  scrub?: boolean | number
  toggleActions?: string
  pin?: boolean
  markers?: boolean
  onEnter?: () => void
  onLeave?: () => void
}

export function useGsapScrollTrigger<T extends HTMLElement>(
  options: ScrollTriggerOptions = {},
) {
  const ref = useRef<T>(null)
  const triggerRef = useRef<ScrollTriggerType | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const st = gsap.timeline({
      scrollTrigger: {
        trigger: options.trigger ?? el,
        start: options.start ?? 'top 80%',
        end: options.end ?? 'bottom 20%',
        scrub: options.scrub ?? false,
        toggleActions: options.toggleActions ?? 'play none none none',
        pin: options.pin ?? false,
        markers: options.markers ?? false,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
      },
    })

    triggerRef.current = st.scrollTrigger as ScrollTriggerType

    return () => {
      st.kill()
    }
  }, [options.start, options.end, options.scrub, options.toggleActions, options.pin, options.markers, options.trigger, options.onEnter, options.onLeave])

  return { ref, trigger: triggerRef }
}
