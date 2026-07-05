import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
}

const NODE_COUNT = 70
const CONNECTION_DIST = 180
const PULSE_COUNT = 5

export default function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0
    let W = 0
    let H = 0

    // Initialize nodes
    const nodes: Node[] = []

    function initNodes() {
      nodes.length = 0
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.3,
        })
      }
    }

    function resize() {
      if (!canvas) return
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * window.devicePixelRatio
      canvas.height = H * window.devicePixelRatio
      ctx!.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
      if (nodes.length === 0) initNodes()
    }
    resize()
    window.addEventListener('resize', resize)

    const r = 0, g = 212, b = 255 // #00d4ff

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      time += 0.006

      const cx = W / 2
      const cy = H * 0.45

      // === 1. Radial pulse waves ===
      for (let i = 0; i < PULSE_COUNT; i++) {
        const phase = (time * 0.4 + i * 0.2) % 1
        const radius = phase * Math.min(W, H) * 0.6
        const fadeOut = 1 - phase
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${fadeOut * 0.04})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // === 2. Perspective grid floor ===
      const gridY = H * 0.72
      const gridSpread = W * 1.5

      for (let i = 0; i < 10; i++) {
        const t = i / 10
        const y = gridY + t * t * (H - gridY) * 1.2
        const perspScale = 1 - t * 0.3
        const x1 = cx - gridSpread * perspScale
        const x2 = cx + gridSpread * perspScale
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(1 - t) * 0.06})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      for (let i = -16; i <= 16; i++) {
        const x = cx + i * 60
        const lineAlpha = (1 - Math.abs(i) / 16) * 0.04
        ctx.beginPath()
        ctx.moveTo(cx + (x - cx) * 0.1, cy)
        ctx.lineTo(x, H)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // === 3. Update and draw nodes ===
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > W) node.vx *= -1
        if (node.y < 0 || node.y > H) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${node.alpha})`
        ctx.fill()
      }

      // === 4. Draw connections ===
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.12
            // Pulse traveling along line
            const pulse = Math.sin(time * 3 + i * 0.5) * 0.5 + 0.5
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * (0.5 + pulse * 0.5)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // === 5. Ambient center glow ===
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.4)
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.025)`)
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.008)`)
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, W, H)

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  )
}
