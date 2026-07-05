export interface CareerBeat {
  id: string
  year: string
  heading: string
  narrative: string
  details: string[]
  color: 'cyan' | 'gold'
  metric?: { value: string; label: string }
}

export const CAREER_BEATS: CareerBeat[] = [
  {
    id: 'curiosity',
    year: '2019',
    heading: 'It started with curiosity.',
    narrative:
      'From a small town in Romania to Rome, Italy — what began as a fascination with how things work on the internet turned into a career in software. The first lines of code were messy. The ambition was not.',
    details: [
      'Joined Talentium as a Junior Developer',
      'Built solutions within Microsoft Dynamics 365',
      'Integrated social platforms — WhatsApp, Facebook, Instagram',
    ],
    color: 'cyan',
  },
  {
    id: 'build',
    year: '2019 – 2022',
    heading: 'First, I learned to build.',
    narrative:
      'Three promotions in under three years. From junior to senior to architect — not by waiting, but by shipping. Every project was a chance to learn something that wasn\'t in the documentation.',
    details: [
      'Drove adoption of modern React patterns and functional programming',
      'Led Microsoft 365 integrations — Graph API, Teams SDK, Azure Cognitive Services',
      'Transitioned to micro-frontend architecture for better modularity',
    ],
    color: 'cyan',
    metric: { value: '3 promotions', label: 'in under 3 years' },
  },
  {
    id: 'lead',
    year: '2022 – 2024',
    heading: 'Then, I learned to lead.',
    narrative:
      'Architecture decisions affect teams, not just code. Leading meant designing component libraries, setting engineering standards, mentoring developers — and rebuilding an entire website from scratch in four weeks.',
    details: [
      'Led frontend architecture for enterprise SaaS at Fincons Group',
      'Joined Rebrandly — rebuilt rebrandly.com in 4 weeks',
      'Optimized checkout conversion from 28% to 30%',
      'Introduced E2E testing, feature flags, and AI-assisted development',
    ],
    color: 'cyan',
    metric: { value: '4 weeks', label: 'to rebuild rebrandly.com' },
  },
  {
    id: 'decide',
    year: '2025 – present',
    heading: 'Now, I decide what to build.',
    narrative:
      'The move from engineering to product wasn\'t a career change — it was a career expansion. The same curiosity that drove the first line of code now drives product strategy, growth experiments, and data-informed decisions.',
    details: [
      'Technical Growth PM at Rebrandly — owning roadmap from discovery to delivery',
      'Shipped the Rebrandly MCP Server — first-to-market in branded link management',
      'Designed self-service downgrades protecting ~$50K ARR',
      'Championing data-driven decisions with Pendo, A/B testing, and analytics',
    ],
    color: 'gold',
    metric: { value: '~$50K', label: 'ARR protected' },
  },
  {
    id: 'share',
    year: 'Always',
    heading: 'And I share what I learn.',
    narrative:
      'Knowledge compounds when shared. Four years of corporate training, 143+ LinkedIn posts, free course materials downloaded thousands of times, and volunteering to teach children to code.',
    details: [
      'Corporate trainer — React, TypeScript, Redux (4 years)',
      'Microsoft MVP recognition (2024–2025)',
      '5K+ LinkedIn followers, 3K+ free downloads',
      'CoderDojo mentor — teaching children to code in Rome',
    ],
    color: 'gold',
    metric: { value: '143+', label: 'posts shared' },
  },
]
