import SectionWrapper from '../ui/SectionWrapper'
import GlassCard from '../ui/GlassCard'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface Testimonial {
  quote: string
  author: string
  title: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Eduard stands out for his remarkable ability to work independently and deliver high-quality results while fostering clear and effective communication within the team. His technical skills are complemented by a strong sense of initiative and a collaborative spirit that elevates the entire group.',
    author: 'Nicolo Marziale',
    title: 'Project Manager, CES Award Winner',
  },
  {
    quote:
      'Eduard is a smart developer with a great passion for modern web technologies. His dedication to continuous learning and sharing knowledge makes him a valuable asset to any team.',
    author: 'Fabio Biondi',
    title: 'Google Developer Expert, Microsoft MVP',
  },
  {
    quote:
      'Working with Eduard has been a fantastic experience. His communication skills and ability to translate complex technical concepts into clear explanations are truly exceptional.',
    author: 'Newton Samin Urbanetz',
    title: 'Senior JavaScript Engineer',
  },
  {
    quote:
      'Eduard is highly skilled and always willing to help others grow. He combines deep technical expertise with genuine leadership qualities that make the team stronger.',
    author: 'Davide Derosa',
    title: 'Software Engineer, Frontend',
  },
]

export default function Testimonials() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })

  return (
    <SectionWrapper id="testimonials">
      <div ref={ref} className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-12 text-center">
          {'// signal_intercepts'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <GlassCard
              key={t.author}
              glow="none"
              hover={false}
              className={`relative overflow-hidden transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div style={{ transitionDelay: `${i * 120}ms` }}>
                {/* Large quote mark */}
                <span className="absolute top-2 left-4 font-mono text-6xl text-primary/8 leading-none select-none">
                  &ldquo;
                </span>

                {/* Left accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/20 rounded-full" />

                <blockquote className="relative z-10 text-sm text-text-secondary italic leading-relaxed pl-2">
                  {t.quote}
                </blockquote>

                <div className="mt-4 pl-2">
                  <p className="font-mono text-xs font-bold text-text">{t.author}</p>
                  <p className="font-mono text-[10px] text-text-muted mt-0.5">{t.title}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
