export interface Skill {
  name: string
  level: number // 0-100
  domain: 'engineering' | 'product'
}

export interface SkillGroup {
  label: string
  domain: 'engineering' | 'product'
  skills: Skill[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Frontend & Languages',
    domain: 'engineering',
    skills: [
      { name: 'React', level: 95, domain: 'engineering' },
      { name: 'TypeScript', level: 92, domain: 'engineering' },
      { name: 'JavaScript', level: 95, domain: 'engineering' },
      { name: 'Next.js', level: 75, domain: 'engineering' },
      { name: 'CSS / Tailwind', level: 88, domain: 'engineering' },
    ],
  },
  {
    label: 'Backend & Cloud',
    domain: 'engineering',
    skills: [
      { name: 'Node.js', level: 80, domain: 'engineering' },
      { name: 'AWS', level: 70, domain: 'engineering' },
      { name: 'Azure', level: 72, domain: 'engineering' },
      { name: 'NestJS', level: 65, domain: 'engineering' },
    ],
  },
  {
    label: 'Architecture & Practices',
    domain: 'engineering',
    skills: [
      { name: 'System Design', level: 82, domain: 'engineering' },
      { name: 'Testing (E2E/Unit)', level: 78, domain: 'engineering' },
      { name: 'CI/CD', level: 75, domain: 'engineering' },
      { name: 'Performance Tuning', level: 80, domain: 'engineering' },
    ],
  },
  {
    label: 'Product & Growth',
    domain: 'product',
    skills: [
      { name: 'Product Strategy', level: 80, domain: 'product' },
      { name: 'A/B Testing', level: 78, domain: 'product' },
      { name: 'Data Analysis', level: 72, domain: 'product' },
      { name: 'Roadmap Planning', level: 82, domain: 'product' },
    ],
  },
  {
    label: 'Tools & Analytics',
    domain: 'product',
    skills: [
      { name: 'Stripe / Billing', level: 75, domain: 'product' },
      { name: 'Pendo / Mixpanel', level: 70, domain: 'product' },
      { name: 'LaunchDarkly', level: 78, domain: 'product' },
      { name: 'Jira / Notion', level: 85, domain: 'product' },
    ],
  },
]

export const CERTIFICATIONS = [
  'Microsoft MVP',
  'AWS Cloud Practitioner',
  'Azure AI Fundamentals',
  'Azure Data Fundamentals',
  'Azure Fundamentals',
  'Power Platform Fundamentals',
  'Git Certified',
  'AI Fluency',
]
