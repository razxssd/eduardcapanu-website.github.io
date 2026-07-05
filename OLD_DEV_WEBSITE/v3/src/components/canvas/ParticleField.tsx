import { useEffect, useRef } from 'react'
import { ParticleSystem } from '../../animations/hero-particles'
import { useIsMobile } from '../../hooks/useIsMobile'

interface Props {
  className?: string
  opacity?: number
}

export default function ParticleField({ className = '', opacity = 0.7 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return
    const canvas = canvasRef.current
    if (!canvas) return

    const system = new ParticleSystem(canvas, {
      count: 35,
      connectionDist: 160,
      baseColor: [0, 212, 255],
      speed: 0.3,
    })

    system.start()

    const handleResize = () => system.resize()
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      system.updateMouse(e.clientX - rect.left, e.clientY - rect.top)
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      system.stop()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  )
}
