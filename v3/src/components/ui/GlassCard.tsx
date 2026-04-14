import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  glow?: 'cyan' | 'gold' | 'green' | 'none'
  hover?: boolean
}

const glowClass = {
  cyan: 'hover:glow-cyan',
  gold: 'hover:glow-gold',
  green: 'hover:glow-green',
  none: '',
}

export default function GlassCard({ children, className = '', glow = 'cyan', hover = true }: Props) {
  return (
    <div
      className={`glass-card p-5 md:p-6 ${
        hover ? `transition-all duration-300 hover:-translate-y-1 ${glowClass[glow]}` : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
