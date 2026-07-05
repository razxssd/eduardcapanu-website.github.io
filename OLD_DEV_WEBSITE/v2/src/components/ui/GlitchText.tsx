import { useState, useEffect } from 'react'

interface Props {
  texts: string[]
  interval?: number
  className?: string
}

export default function GlitchText({ texts, interval = 3000, className = '' }: Props) {
  const [index, setIndex] = useState(0)
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    if (texts.length <= 1) return
    const timer = setInterval(() => {
      setGlitching(true)
      setTimeout(() => {
        setIndex((i) => (i + 1) % texts.length)
        setGlitching(false)
      }, 350)
    }, interval)
    return () => clearInterval(timer)
  }, [texts, interval])

  return (
    <span
      className={`inline-block ${glitching ? 'animate-glitch' : ''} ${className}`}
    >
      {texts[index]}
    </span>
  )
}
