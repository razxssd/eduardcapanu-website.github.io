import SectionWrapper from '../ui/SectionWrapper'
import GlassCard from '../ui/GlassCard'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface Post {
  title: string
  hook: string
  category: string
  categoryColor: 'cyan' | 'gold' | 'green'
  date: string
  url: string
}

const FEATURED_POSTS: Post[] = [
  {
    title: "I realized that being a Tech Lead doesn't mean being the best developer on the team.",
    hook: "Your main job isn't to write code — it's to enable others to write great code.",
    category: 'LEADERSHIP',
    categoryColor: 'gold',
    date: 'Feb 2026',
    url: 'https://www.linkedin.com/posts/eduardcapanu_softwaredevelopment-teammanagement-careergrowth-activity-7431670513489461249-LVTe',
  },
  {
    title: "I stopped writing code. And that's when I finally understood how developers should use AI.",
    hook: "The problem is never the tool. It's how you think before you use it. Context beats commands.",
    category: 'AI',
    categoryColor: 'green',
    date: 'Mar 2026',
    url: 'https://www.linkedin.com/posts/eduardcapanu_softwareengineering-engineeringleadership-activity-7434911863542546432-IRK0',
  },
  {
    title: "How I Actually Use AI as a Tech Lead (It's Not What You Think)",
    hook: "My #1 use case isn't writing code. It's writing Slack messages. 60% communication, 20% product thinking, 15% technical investigation.",
    category: 'AI + LEADERSHIP',
    categoryColor: 'gold',
    date: 'Feb 2026',
    url: 'https://www.linkedin.com/posts/eduardcapanu_techleadership-ai-leadership-activity-7426943088322834432-j_FK',
  },
  {
    title: '30+ React Tips & Tricks (Free)',
    hook: "Comprehensive free resource covering everything from Virtual DOM internals to Redux patterns. 3000+ downloads.",
    category: 'REACT',
    categoryColor: 'cyan',
    date: 'Apr 2024',
    url: 'https://www.linkedin.com/posts/eduardcapanu_reactjs-freereactjsmaterial-reactjstipsandtricks-activity-7180824833008484353-6J93',
  },
  {
    title: '30+ TypeScript Tips & Tricks (Free)',
    hook: "Utility types, type guards, interfaces vs type aliases, tsconfig deep-dive, React+TS cheatsheet. All free.",
    category: 'TYPESCRIPT',
    categoryColor: 'cyan',
    date: 'Sep 2024',
    url: 'https://www.linkedin.com/posts/eduardcapanu_typescript-typescripttipstricks-tstip-activity-7241721099850289152-Bymw',
  },
  {
    title: 'We Migrated to Astro — Here Are the Results',
    hook: "Complete rewrite of rebrandly.com from Gatsby to Astro. LCP, CLS, FCP optimized. An honest look at business vs. performance trade-offs.",
    category: 'CASE STUDY',
    categoryColor: 'cyan',
    date: 'May 2025',
    url: 'https://www.linkedin.com/posts/eduardcapanu_astrojs-webvitals-devtalk-activity-7341732343121940480-eeuF',
  },
]

const STATS = [
  { value: '143+', label: 'posts published' },
  { value: '5K+', label: 'followers' },
  { value: '3K+', label: 'free downloads' },
]

export default function Writings() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })

  return (
    <SectionWrapper id="writings">
      <div ref={ref} className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4 text-center">
          {'// signal_broadcast'}
        </p>

        <h2
          className={`text-2xl md:text-4xl font-extrabold text-text text-center mb-3 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Writing & Thinking
        </h2>

        <p
          className={`font-mono text-xs text-text-muted text-center mb-10 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Sharing what I learn — leadership, AI, React, TypeScript, and the craft of building products.
        </p>

        {/* Stats row */}
        <div
          className={`flex justify-center gap-8 md:gap-14 mb-14 transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-2xl md:text-3xl font-extrabold text-primary">
                {stat.value}
              </p>
              <p className="font-mono text-[10px] text-text-muted tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Featured posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_POSTS.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <GlassCard
                glow={post.categoryColor}
                className={`h-full flex flex-col transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <div style={{ transitionDelay: `${200 + i * 80}ms` }}>
                  {/* Category + date */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`font-mono text-[10px] tracking-widest font-bold ${
                        post.categoryColor === 'gold'
                          ? 'text-secondary'
                          : post.categoryColor === 'green'
                            ? 'text-accent-green'
                            : 'text-primary'
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="font-mono text-[10px] text-text-muted">
                      {post.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-text leading-snug mb-3 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Hook excerpt */}
                  <p className="text-xs text-text-secondary leading-relaxed flex-1">
                    {post.hook}
                  </p>

                  {/* Read indicator */}
                  <div className="mt-4 flex items-center gap-1.5 text-text-muted group-hover:text-primary transition-colors duration-300">
                    <span className="font-mono text-[10px] tracking-wider">READ ON LINKEDIN</span>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </GlassCard>
            </a>
          ))}
        </div>

        {/* CTA to full LinkedIn */}
        <div
          className={`text-center mt-10 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <a
            href="https://www.linkedin.com/in/eduardcapanu/recent-activity/all/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-primary transition-colors duration-300"
          >
            <span>View all 143+ posts on LinkedIn</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-3.5 h-3.5"
            >
              <path d="M4 12L12 4M12 4H6M12 4v6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
