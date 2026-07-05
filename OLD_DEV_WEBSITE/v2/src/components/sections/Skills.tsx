import { useMemo } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import GlassCard from '../ui/GlassCard'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useIsMobile } from '../../hooks/useIsMobile'

interface SkillAxis {
  label: string
  value: number // 0–1
}

const TECH_SKILLS: SkillAxis[] = [
  { label: 'React / Frontend', value: 0.95 },
  { label: 'TypeScript', value: 0.92 },
  { label: 'Architecture', value: 0.88 },
  { label: 'Cloud (AWS/Azure)', value: 0.75 },
  { label: 'API Design', value: 0.82 },
  { label: 'Performance', value: 0.85 },
]

const PRODUCT_SKILLS: SkillAxis[] = [
  { label: 'Growth Strategy', value: 0.88 },
  { label: 'Data Analysis', value: 0.82 },
  { label: 'User Research', value: 0.72 },
  { label: 'Roadmap Planning', value: 0.9 },
  { label: 'Stakeholder Mgmt', value: 0.85 },
  { label: 'Experimentation', value: 0.88 },
]

const CERTIFICATIONS = [
  // Awards & Recognition
  { name: 'Microsoft MVP', year: '2024–2025', accent: 'mvp' as const },
  // AI & Cloud
  { name: 'AI Fluency: Framework & Foundations', year: '2025', accent: 'gold' as const },
  { name: 'Google Introduction to AI', year: '2025', accent: 'gold' as const },
  { name: 'AWS Cloud Practitioner', year: '2023', accent: 'cyan' as const },
  // Azure & Microsoft
  { name: 'Azure AI Fundamentals', year: '2021', accent: 'cyan' as const },
  { name: 'Azure Data Fundamentals', year: '2021', accent: 'cyan' as const },
  { name: 'Azure Fundamentals', year: '2021', accent: 'cyan' as const },
  { name: 'Power Platform Fundamentals', year: '2022', accent: 'cyan' as const },
  { name: 'Dynamics 365 Core (MB-200)', year: '2020', accent: 'cyan' as const },
  { name: 'Dynamics 365 Customization (MB2-716)', year: '2019', accent: 'cyan' as const },
  // Dev tools & web
  { name: 'Git Certified (GitKraken)', year: '2024', accent: 'cyan' as const },
  { name: 'Responsive Web Design (freeCodeCamp)', year: '2020', accent: 'cyan' as const },
]

function RadarChart({
  skills,
  color,
  size,
  animated,
}: {
  skills: SkillAxis[]
  color: string
  size: number
  animated: boolean
}) {
  const cx = size / 2
  const cy = size / 2
  const maxR = size * 0.38
  const axisCount = skills.length

  const points = useMemo(() => {
    return skills.map((skill, i) => {
      const angle = (i / axisCount) * Math.PI * 2 - Math.PI / 2
      const r = skill.value * maxR
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        labelX: cx + Math.cos(angle) * (maxR + 20),
        labelY: cy + Math.sin(angle) * (maxR + 20),
        axisEndX: cx + Math.cos(angle) * maxR,
        axisEndY: cy + Math.sin(angle) * maxR,
        label: skill.label,
      }
    })
  }, [skills, cx, cy, maxR, axisCount])

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(' ')
  const rgba = color === '#00d4ff' ? '0, 212, 255' : '255, 215, 0'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto">
      {/* Grid rings */}
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <polygon
          key={scale}
          points={Array.from({ length: axisCount })
            .map((_, i) => {
              const angle = (i / axisCount) * Math.PI * 2 - Math.PI / 2
              return `${cx + Math.cos(angle) * maxR * scale},${cy + Math.sin(angle) * maxR * scale}`
            })
            .join(' ')}
          fill="none"
          stroke={`rgba(${rgba}, 0.06)`}
          strokeWidth="0.5"
        />
      ))}

      {/* Axes */}
      {points.map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.axisEndX}
          y2={p.axisEndY}
          stroke={`rgba(${rgba}, 0.1)`}
          strokeWidth="0.5"
        />
      ))}

      {/* Data polygon */}
      <g
        style={{
          transform: animated ? 'scale(1)' : 'scale(0)',
          transformOrigin: `${cx}px ${cy}px`,
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <polygon
          points={polygonPoints}
          fill={`rgba(${rgba}, 0.08)`}
          stroke={color}
          strokeWidth="1.5"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill={color}
            style={{ opacity: animated ? 1 : 0, transition: `opacity 0.5s ease ${300 + i * 80}ms` }}
          />
        ))}
      </g>

      {/* Labels */}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.labelX}
          y={p.labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-text-secondary"
          fontSize="9"
          fontFamily="'JetBrains Mono', monospace"
        >
          {p.label}
        </text>
      ))}
    </svg>
  )
}

export default function Skills() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 })
  const isMobile = useIsMobile()
  const radarSize = isMobile ? 280 : 340

  return (
    <SectionWrapper id="skills">
      <div ref={ref} className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-12 text-center">
          {'// dual_expertise'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Technical radar */}
          <div
            className={`text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="font-mono text-sm text-primary tracking-wider mb-6">ENGINEERING</h3>
            <RadarChart skills={TECH_SKILLS} color="#00d4ff" size={radarSize} animated={isVisible} />
          </div>

          {/* Product radar */}
          <div
            className={`text-center transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="font-mono text-sm text-secondary tracking-wider mb-6">PRODUCT</h3>
            <RadarChart skills={PRODUCT_SKILLS} color="#ffd700" size={radarSize} animated={isVisible} />
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-6 text-center">
            {'// certifications'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CERTIFICATIONS.map((cert) => (
              <GlassCard
                key={cert.name}
                className={`!p-3 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } ${cert.accent === 'mvp' ? 'glow-cyan border-primary/40 !bg-primary/5' : ''}`}
                glow={cert.accent === 'mvp' ? 'cyan' : cert.accent === 'gold' ? 'gold' : 'cyan'}
                hover
              >
                <p className={`font-mono text-xs font-bold ${
                  cert.accent === 'mvp'
                    ? 'text-white'
                    : cert.accent === 'gold'
                      ? 'text-secondary'
                      : 'text-primary'
                }`}>
                  {cert.name}
                </p>
                <p className={`font-mono text-[10px] mt-0.5 ${
                  cert.accent === 'mvp' ? 'text-primary' : 'text-text-muted'
                }`}>{cert.year}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
