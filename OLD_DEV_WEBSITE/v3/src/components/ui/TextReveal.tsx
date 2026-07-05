import { useEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap-setup'

interface Props {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  trigger?: boolean
  delay?: number
  staggerLines?: boolean
}

export default function TextReveal({
  children,
  as: Tag = 'p',
  className = '',
  trigger = true,
  delay = 0,
  staggerLines = false,
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!trigger || !ref.current) return

    const words = ref.current.querySelectorAll<HTMLElement>('.word')
    if (words.length === 0) return

    gsap.set(words, { opacity: 0, y: 20, filter: 'blur(8px)' })

    const tl = gsap.timeline({ delay })

    if (staggerLines) {
      tl.to(words, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
      })
    } else {
      tl.to(words, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.04,
        ease: 'power3.out',
      })
    }

    return () => { tl.kill() }
  }, [trigger, delay, staggerLines])

  // Split text into words
  const words = children.split(' ')

  return (
    <Tag ref={ref as React.RefObject<never>} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="word inline-block" aria-hidden="true">
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
