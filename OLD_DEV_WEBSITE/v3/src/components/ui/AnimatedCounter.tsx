import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1200,
  className = '',
}: Props) {
  const { ref, isVisible } = useIntersectionObserver<HTMLSpanElement>()
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!isVisible) return
    if (reducedMotion) {
      setDisplay(value)
      return
    }

    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [isVisible, value, duration, reducedMotion])

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {prefix}{display}{suffix}
    </span>
  )
}
