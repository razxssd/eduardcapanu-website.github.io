import { useEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap-setup'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SKILL_GROUPS, CERTIFICATIONS } from '../../data/skills'

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate skill groups
      const groups = sectionRef.current?.querySelectorAll<HTMLElement>('.skill-group')
      groups?.forEach((group) => {
        gsap.from(group, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })

        // Animate progress bars within the group
        const bars = group.querySelectorAll<HTMLElement>('.skill-bar-fill')
        gsap.from(bars, {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Animate certifications
      const certs = sectionRef.current?.querySelectorAll<HTMLElement>('.cert-pill')
      if (certs) {
        gsap.from(certs, {
          opacity: 0,
          scale: 0.8,
          stagger: 0.05,
          duration: 0.4,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: certs[0]?.parentElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative py-24 md:py-32 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <div className="mb-16 md:mb-20">
          <p className="font-mono text-xs md:text-sm text-primary tracking-widest uppercase mb-4">
            Capabilities
          </p>
          <h2
            className="font-mono font-bold text-text"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            What I bring
          </h2>
        </div>

        {/* Two-column layout: Engineering / Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Engineering column */}
          <div>
            <h3 className="font-mono text-sm text-primary tracking-wider uppercase mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Engineering
            </h3>
            <div className="space-y-8">
              {SKILL_GROUPS.filter((g) => g.domain === 'engineering').map((group) => (
                <div key={group.label} className="skill-group">
                  <h4 className="text-xs text-text-muted font-mono uppercase tracking-wider mb-4">
                    {group.label}
                  </h4>
                  <div className="space-y-3">
                    {group.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-text">{skill.name}</span>
                          <span className="text-xs text-text-muted font-mono">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-[3px] bg-border rounded-full overflow-hidden">
                          <div
                            className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product column */}
          <div>
            <h3 className="font-mono text-sm text-secondary tracking-wider uppercase mb-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Product & Growth
            </h3>
            <div className="space-y-8">
              {SKILL_GROUPS.filter((g) => g.domain === 'product').map((group) => (
                <div key={group.label} className="skill-group">
                  <h4 className="text-xs text-text-muted font-mono uppercase tracking-wider mb-4">
                    {group.label}
                  </h4>
                  <div className="space-y-3">
                    {group.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-text">{skill.name}</span>
                          <span className="text-xs text-text-muted font-mono">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-[3px] bg-border rounded-full overflow-hidden">
                          <div
                            className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-secondary/80 to-secondary"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16 md:mt-20">
          <h3 className="font-mono text-xs text-text-muted tracking-wider uppercase mb-6">
            Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="cert-pill inline-block px-3 py-1.5 text-xs font-mono text-text-secondary border border-border rounded-full hover:border-primary/40 hover:text-primary transition-colors duration-300"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
