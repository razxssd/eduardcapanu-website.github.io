import { useRef } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import GlassCard from '../ui/GlassCard'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useIsMobile } from '../../hooks/useIsMobile'

interface CareerNode {
  period: string
  role: string
  company: string
  achievement: string
  metric?: string
  accent: 'cyan' | 'gold' | 'mixed'
}

const CAREER_NODES: CareerNode[] = [
  {
    period: '2019',
    role: 'Junior Developer',
    company: 'Talentium',
    achievement: 'Started building end-to-end solutions in Microsoft Dynamics 365. Social platform integrations.',
    metric: 'First role',
    accent: 'cyan',
  },
  {
    period: '2021',
    role: 'Senior Engineer',
    company: 'Talentium',
    achievement: 'Led micro-frontend transitions, Azure Cognitive Services integrations, full-stack NestJS.',
    metric: '3 promotions',
    accent: 'cyan',
  },
  {
    period: '2022–2024',
    role: 'Lead Architect',
    company: 'Fincons Group',
    achievement: 'Full frontend architecture for AllRights enterprise SaaS. Internal component libraries with advanced JS metaprogramming.',
    metric: 'Enterprise scale',
    accent: 'mixed',
  },
  {
    period: '2024',
    role: 'Tech Lead',
    company: 'Rebrandly',
    achievement: 'Rebuilt rebrandly.com in 4 weeks. Checkout optimization 28%→30%. Promoted in 3 months.',
    metric: 'Microsoft MVP',
    accent: 'mixed',
  },
  {
    period: '2025–Now',
    role: 'Growth PM',
    company: 'Rebrandly',
    achievement: 'End-to-end product strategy. MCP Server (first-to-market). Self-Service Downgrades protecting ~$50K ARR.',
    metric: 'Building & deciding',
    accent: 'gold',
  },
]

function AccentDot({ accent, active }: { accent: string; active: boolean }) {
  const color =
    accent === 'gold'
      ? 'bg-secondary'
      : accent === 'mixed'
        ? 'bg-gradient-to-r from-primary to-secondary'
        : 'bg-primary'

  return (
    <div className={`relative flex-shrink-0`}>
      <div
        className={`w-4 h-4 rounded-full ${color} ${
          active ? 'animate-pulse-glow scale-125' : ''
        } transition-transform duration-300`}
      />
      {active && (
        <div className="absolute inset-0 rounded-full bg-secondary/20 animate-ping" />
      )}
    </div>
  )
}

export default function CareerJourney() {
  const isMobile = useIsMobile()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })

  if (isMobile) {
    return (
      <SectionWrapper id="career">
        <div ref={sectionRef}>
          <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-12 text-center">
            {'// career_path'}
          </p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-0 bottom-0 w-px">
              <div
                className="w-full h-full"
                style={{
                  background: 'linear-gradient(to bottom, #00d4ff, #ffd700)',
                  transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'top',
                  transition: 'transform 1.5s ease-out',
                }}
              />
            </div>

            <div className="space-y-8">
              {CAREER_NODES.map((node, i) => (
                <div
                  key={i}
                  className={`flex gap-4 transition-all duration-600 ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <AccentDot accent={node.accent} active={i === CAREER_NODES.length - 1} />
                  <GlassCard className="flex-1" glow={node.accent === 'gold' ? 'gold' : 'cyan'} hover={false}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] text-text-muted">{node.period}</span>
                      {node.metric && (
                        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                          node.accent === 'gold' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                        }`}>
                          {node.metric}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-text">{node.role}</h3>
                    <p className="text-xs text-text-secondary mt-0.5">{node.company}</p>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed">{node.achievement}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    )
  }

  // Desktop: horizontal scroll
  return (
    <SectionWrapper id="career" className="!px-0">
      <div ref={sectionRef}>
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-12 text-center px-6">
          {'// career_path'}
        </p>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto px-12 pb-8 snap-x snap-mandatory scrollbar-thin"
          style={{ scrollbarColor: 'var(--color-border-hover) transparent' }}
        >
          {CAREER_NODES.map((node, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-72 snap-center transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Node dot + connecting line */}
              <div className="flex items-center gap-0 mb-4">
                <AccentDot accent={node.accent} active={i === CAREER_NODES.length - 1} />
                {i < CAREER_NODES.length - 1 && (
                  <div
                    className="h-px flex-1"
                    style={{
                      background:
                        node.accent === 'gold'
                          ? 'linear-gradient(to right, #ffd700, #ffd700)'
                          : node.accent === 'mixed'
                            ? 'linear-gradient(to right, #00d4ff, #ffd700)'
                            : 'linear-gradient(to right, #00d4ff, #00d4ff)',
                      opacity: 0.3,
                    }}
                  />
                )}
              </div>

              <GlassCard glow={node.accent === 'gold' ? 'gold' : 'cyan'}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] text-text-muted">{node.period}</span>
                  {node.metric && (
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                      node.accent === 'gold' ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                    }`}>
                      {node.metric}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-text">{node.role}</h3>
                <p className="text-sm text-text-secondary mt-0.5">{node.company}</p>
                <p className="text-xs text-text-muted mt-3 leading-relaxed">{node.achievement}</p>
              </GlassCard>
            </div>
          ))}
          {/* Spacer — ensures the last card is fully visible when scrolled to the end */}
          <div className="flex-shrink-0 w-12" aria-hidden="true" />
        </div>

        <p className="text-center font-mono text-[10px] text-text-muted mt-2">
          scroll horizontally &rarr;
        </p>
      </div>
    </SectionWrapper>
  )
}
