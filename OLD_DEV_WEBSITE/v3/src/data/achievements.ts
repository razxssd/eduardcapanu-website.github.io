export interface Achievement {
  id: string
  metric: string
  label: string
  narrative: string
  color: 'cyan' | 'gold' | 'green'
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'rebuild',
    metric: '4 weeks',
    label: 'rebrandly.com rebuild',
    narrative:
      'Challenged to rebuild the corporate website from scratch. Delivered a high-performance, SEO-optimized platform that increased organic traffic and lead conversion.',
    color: 'cyan',
  },
  {
    id: 'checkout',
    metric: '28% → 30%',
    label: 'checkout conversion',
    narrative:
      'Identified conversion gaps in the checkout flow. Optimized the experience with A/B testing and data-driven design changes for measurable revenue impact.',
    color: 'gold',
  },
  {
    id: 'mcp',
    metric: '1st to market',
    label: 'MCP Server',
    narrative:
      'Saw an opportunity in AI-powered link management. Architected and shipped the Rebrandly MCP Server — enabling AI assistants to interact with the platform via natural language.',
    color: 'green',
  },
  {
    id: 'downgrades',
    metric: '~$50K ARR',
    label: 'revenue protected',
    narrative:
      'Identified churn risk in forced cancellations. Designed a self-service downgrade flow with Stripe billing logic, reducing support tickets and protecting recurring revenue.',
    color: 'gold',
  },
  {
    id: 'training',
    metric: '4 years',
    label: 'corporate training',
    narrative:
      'Designed and delivered intensive React, TypeScript, and Redux courses for enterprise clients. Created original materials, video content, and hands-on labs.',
    color: 'cyan',
  },
  {
    id: 'community',
    metric: '5K+',
    label: 'followers & community',
    narrative:
      'Built a community through consistent sharing — 143+ LinkedIn posts, free resources downloaded by thousands, and hands-on mentoring at CoderDojo in Rome.',
    color: 'green',
  },
]
