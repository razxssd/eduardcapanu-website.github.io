import SectionWrapper from '../ui/SectionWrapper'
import GlassCard from '../ui/GlassCard'
import AnimatedCounter from '../ui/AnimatedCounter'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export default function About() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 })

  return (
    <SectionWrapper id="about" className="overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-12 text-center">
          {'// who_am_i'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-0 items-start">
          {/* Left — Engineer */}
          <div
            className={`space-y-6 lg:pr-12 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}
          >
            <p className="font-mono text-xs text-primary tracking-widest">{'// engineer'}</p>

            <div className="flex items-baseline gap-3">
              <AnimatedCounter value={9} suffix="+" className="text-4xl md:text-5xl font-extrabold text-primary" />
              <span className="text-text-secondary text-sm">years in code</span>
            </div>

            <GlassCard className="font-mono text-xs text-text-muted/60 leading-relaxed">
              <pre className="whitespace-pre-wrap">{`const career = {
  stack: ['React', 'TypeScript', 'Node'],
  cloud: ['AWS', 'Azure'],
  passion: 'solving problems',
};`}</pre>
            </GlassCard>

            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'AWS', 'Azure', 'Architecture'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-primary/20 text-primary/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Center — Profile + divider */}
          <div
            className={`flex flex-col items-center gap-6 lg:px-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Profile photo with rotating ring */}
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-border">
                <img
                  src="/v2/profile.jpeg"
                  alt="Eduard Capanu"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Rotating ring */}
              <svg
                className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]"
                viewBox="0 0 200 200"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="96"
                  fill="none"
                  stroke="rgba(0, 212, 255, 0.15)"
                  strokeWidth="0.8"
                  strokeDasharray="15 8 4 8"
                  style={{
                    animation: 'ring-spin 20s linear infinite',
                    transformOrigin: '100px 100px',
                  }}
                />
              </svg>
            </div>

            {/* Divider line (desktop) */}
            <div className="hidden lg:block w-px flex-1 min-h-[120px] relative">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="rgba(0, 212, 255, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="300"
                  strokeDashoffset={isVisible ? '0' : '300'}
                  style={{ transition: 'stroke-dashoffset 1.2s ease-out 0.5s' }}
                />
              </svg>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs text-text-muted bg-bg px-2">
                &amp;
              </span>
            </div>

            {/* Bio */}
            <p className="text-sm md:text-base text-text-secondary text-center max-w-sm leading-relaxed">
              Curiosity-driven builder with 9 years in engineering and a deliberate pivot to product.
              I review PRs and write PRDs on the same day.{' '}
              <span className="text-primary/80">Microsoft MVP</span>, Corporate Trainer,
              and the person who made AI assistants talk to{' '}
              <span className="text-secondary/80">Rebrandly</span> — first in the industry.
            </p>
          </div>

          {/* Right — Product Mind */}
          <div
            className={`space-y-6 lg:pl-12 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
            }`}
          >
            <p className="font-mono text-xs text-secondary tracking-widest">{'// product'}</p>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-extrabold text-secondary">Growth</span>
              <span className="text-text-secondary text-sm">PM</span>
            </div>

            <GlassCard className="font-mono text-xs text-text-muted/60 leading-relaxed">
              <pre className="whitespace-pre-wrap">{`## Product Spec: Growth Unit
- Owner: Eduard Capanu
- Scope: acquisition → retention
- Method: data-driven experiments
- Status: SHIPPING`}</pre>
            </GlassCard>

            <div className="flex flex-wrap gap-2">
              {['Strategy', 'Growth', 'A/B Testing', 'Data', 'Conversion', 'Revenue'].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-secondary/20 text-secondary/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
