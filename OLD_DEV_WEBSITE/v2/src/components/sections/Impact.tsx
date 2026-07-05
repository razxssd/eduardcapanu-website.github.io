import SectionWrapper from '../ui/SectionWrapper'
import GlassCard from '../ui/GlassCard'
import AnimatedCounter from '../ui/AnimatedCounter'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface MissionCard {
  id: string
  metric: string
  metricType: 'counter' | 'text'
  counterValue?: number
  counterSuffix?: string
  counterPrefix?: string
  context: string
  description: string
  glow: 'cyan' | 'gold' | 'green'
  barWidth: string
}

const MISSIONS: MissionCard[] = [
  {
    id: 'MISSION_001',
    metric: '4 WEEKS',
    metricType: 'counter',
    counterValue: 4,
    counterSuffix: ' WEEKS',
    context: 'From zero to production — rebrandly.com',
    description: 'The marketing site needed a complete rewrite. Led the team through scoping, architecture, and delivery of a fully rebuilt, SEO-optimized site in 4 weeks — fast execution without cutting corners.',
    glow: 'cyan',
    barWidth: '100%',
  },
  {
    id: 'MISSION_002',
    metric: '28% → 30%',
    metricType: 'text',
    context: 'Checkout conversion that moved revenue',
    description: 'Not just a UI change — the team ran A/B tests, instrumented analytics end-to-end, and iterated on the checkout flow until the data confirmed a +7% relative lift. Engineering meets growth thinking.',
    glow: 'gold',
    barWidth: '85%',
  },
  {
    id: 'MISSION_003',
    metric: 'FIRST',
    metricType: 'text',
    context: 'Rebrandly MCP Server — first-to-market',
    description: 'An opportunity spotted before anyone asked for it. Together with the team, architected and shipped an AI-native integration — making Rebrandly the first in branded link management to connect with AI agents.',
    glow: 'cyan',
    barWidth: '100%',
  },
  {
    id: 'MISSION_004',
    metric: '~$50K',
    metricType: 'counter',
    counterValue: 50,
    counterPrefix: '~$',
    counterSuffix: 'K',
    context: 'ARR protected through better product design',
    description: 'Customers were churning because downgrading was too hard. The team designed a self-service downgrade flow handling complex Stripe billing edge cases — turning a pain point into retained revenue.',
    glow: 'gold',
    barWidth: '90%',
  },
  {
    id: 'MISSION_005',
    metric: '4 YEARS',
    metricType: 'counter',
    counterValue: 4,
    counterSuffix: ' YEARS',
    context: 'Teaching what we practice',
    description: 'Four years designing and delivering React, TypeScript, and Redux courses to engineering teams. Teaching means understanding concepts deeply enough to explain them clearly — a skill that shapes every team conversation.',
    glow: 'cyan',
    barWidth: '75%',
  },
  {
    id: 'MISSION_006',
    metric: 'LIVE',
    metricType: 'text',
    context: 'Lupy — a personal AI trading assistant',
    description: 'A side project built end-to-end: React dashboard, Python trading bots, voice assistant, real-time analytics. A way to stay sharp across the full stack and keep experimenting with AI beyond the day job.',
    glow: 'green',
    barWidth: '100%',
  },
]

export default function Impact() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })

  return (
    <SectionWrapper id="impact">
      <div ref={ref} className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-12 text-center">
          {'// mission_log'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MISSIONS.map((mission, i) => (
            <GlassCard
              key={mission.id}
              glow={mission.glow}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="font-mono text-[10px] text-text-muted tracking-widest mb-3">
                  {mission.id}
                </p>

                {/* Large metric */}
                <div className="mb-1">
                  {mission.metricType === 'counter' && mission.counterValue != null ? (
                    <AnimatedCounter
                      value={mission.counterValue}
                      prefix={mission.counterPrefix}
                      suffix={mission.counterSuffix}
                      className={`text-3xl font-extrabold ${
                        mission.glow === 'gold'
                          ? 'text-secondary'
                          : mission.glow === 'green'
                            ? 'text-accent-green'
                            : 'text-primary'
                      }`}
                    />
                  ) : (
                    <span
                      className={`font-mono text-3xl font-extrabold ${
                        mission.glow === 'gold'
                          ? 'text-secondary'
                          : mission.glow === 'green'
                            ? 'text-accent-green'
                            : 'text-primary'
                      }`}
                    >
                      {mission.metric}
                    </span>
                  )}
                </div>

                <p className="font-mono text-xs text-text-secondary mb-2">
                  {mission.context}
                </p>

                <p className="text-xs text-text-muted leading-relaxed mb-4">
                  {mission.description}
                </p>

                {/* Status bar */}
                <div className="h-0.5 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      mission.glow === 'gold'
                        ? 'bg-secondary'
                        : mission.glow === 'green'
                          ? 'bg-accent-green'
                          : 'bg-primary'
                    }`}
                    style={{
                      width: isVisible ? mission.barWidth : '0%',
                      transitionDelay: `${400 + i * 100}ms`,
                    }}
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
