interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
}

interface ParticleSystemOptions {
  count?: number
  connectionDist?: number
  baseColor?: [number, number, number]
  speed?: number
}

export class ParticleSystem {
  private particles: Particle[] = []
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private animId = 0
  private W = 0
  private H = 0
  private mouseX = -1000
  private mouseY = -1000
  private time = 0
  private count: number
  private connectionDist: number
  private r: number
  private g: number
  private b: number
  private speed: number

  constructor(canvas: HTMLCanvasElement, options: ParticleSystemOptions = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.count = options.count ?? 35
    this.connectionDist = options.connectionDist ?? 160
    this.speed = options.speed ?? 0.3
    const [r, g, b] = options.baseColor ?? [0, 212, 255]
    this.r = r
    this.g = g
    this.b = b
  }

  private initParticles() {
    this.particles = []
    for (let i = 0; i < this.count; i++) {
      this.particles.push({
        x: Math.random() * this.W,
        y: Math.random() * this.H,
        vx: (Math.random() - 0.5) * this.speed,
        vy: (Math.random() - 0.5) * this.speed,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.2,
      })
    }
  }

  resize() {
    const dpr = window.devicePixelRatio
    this.W = this.canvas.offsetWidth
    this.H = this.canvas.offsetHeight
    this.canvas.width = this.W * dpr
    this.canvas.height = this.H * dpr
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (this.particles.length === 0) this.initParticles()
  }

  updateMouse(x: number, y: number) {
    this.mouseX = x
    this.mouseY = y
  }

  start() {
    this.resize()
    const draw = () => {
      this.time += 0.004
      this.ctx.clearRect(0, 0, this.W, this.H)

      const { r, g, b } = this

      // Update and draw particles
      for (const p of this.particles) {
        // Gentle mouse repulsion on desktop
        const dx = p.x - this.mouseX
        const dy = p.y - this.mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200 * 0.02
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        // Dampen velocity
        p.vx *= 0.999
        p.vy *= 0.999

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -10) p.x = this.W + 10
        if (p.x > this.W + 10) p.x = -10
        if (p.y < -10) p.y = this.H + 10
        if (p.y > this.H + 10) p.y = -10

        // Pulsing alpha
        const pulse = Math.sin(this.time * 2 + p.radius * 3) * 0.15
        const alpha = p.alpha + pulse

        this.ctx.beginPath()
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        this.ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const a = this.particles[i]
          const bP = this.particles[j]
          const dx = a.x - bP.x
          const dy = a.y - bP.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < this.connectionDist) {
            const alpha = (1 - dist / this.connectionDist) * 0.1
            this.ctx.beginPath()
            this.ctx.moveTo(a.x, a.y)
            this.ctx.lineTo(bP.x, bP.y)
            this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
            this.ctx.lineWidth = 0.5
            this.ctx.stroke()
          }
        }
      }

      // Center glow
      const cx = this.W / 2
      const cy = this.H * 0.4
      const gradient = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(this.W, this.H) * 0.5)
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.02)`)
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.005)`)
      gradient.addColorStop(1, 'transparent')
      this.ctx.fillStyle = gradient
      this.ctx.fillRect(0, 0, this.W, this.H)

      this.animId = requestAnimationFrame(draw)
    }

    this.animId = requestAnimationFrame(draw)
  }

  stop() {
    cancelAnimationFrame(this.animId)
  }
}
