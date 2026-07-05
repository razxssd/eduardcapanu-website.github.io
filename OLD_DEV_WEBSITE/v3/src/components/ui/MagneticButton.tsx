import { useRef, type ReactNode } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

interface Props {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.3,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0, 0)'
    ref.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = ''
    }, 400)
  }

  const Tag = href ? 'a' : 'button'
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border transition-colors duration-300 hover:border-border-hover ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...linkProps}
    >
      {children}
    </Tag>
  )
}
