import { useEffect, useRef } from 'react'
import { gsap } from '../../animations/gsap-setup'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import MagneticButton from '../ui/MagneticButton'

export default function Connect() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Heading reveal
      const heading = sectionRef.current?.querySelector('.connect-heading')
      if (heading) {
        gsap.from(heading, {
          opacity: 0,
          y: 30,
          filter: 'blur(8px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Subtitle and buttons stagger
      const items = sectionRef.current?.querySelectorAll<HTMLElement>('.connect-item')
      if (items) {
        gsap.from(items, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
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
      id="connect"
      className="relative py-24 md:py-32 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2
          className="connect-heading font-mono font-bold text-text mb-4"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
        >
          Let&apos;s start a conversation
        </h2>

        <p className="connect-item text-text-secondary mb-12 max-w-xl mx-auto leading-relaxed">
          Whether you need someone who speaks both engineering and product, or
          you&apos;re looking for a collaborator who ships fast and thinks deeply —
          I&apos;d love to hear about what you&apos;re building.
        </p>

        {/* Contact links */}
        <div className="connect-item flex flex-wrap items-center justify-center gap-4 mb-16">
          <MagneticButton
            href="mailto:capanueduard98@gmail.com"
            className="bg-primary/10 border-primary/30 hover:bg-primary/20 text-primary"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13L2 4" />
            </svg>
            Email
          </MagneticButton>

          <MagneticButton
            href="https://www.linkedin.com/in/eduardcapanu/"
            className="bg-card hover:bg-card-hover text-text"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </MagneticButton>

          <MagneticButton
            href="https://www.eduardcapanu.com"
            className="bg-card hover:bg-card-hover text-text"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
            Website
          </MagneticButton>
        </div>

        {/* Location & languages */}
        <div className="connect-item space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Rome, Italy
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-text-muted font-mono">
            <span>Romanian <span className="text-accent-green">native</span></span>
            <span className="text-border">|</span>
            <span>Italian <span className="text-accent-green">bilingual</span></span>
            <span className="text-border">|</span>
            <span>English <span className="text-primary">advanced</span></span>
            <span className="text-border">|</span>
            <span>French <span className="text-secondary">learning</span></span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto pt-12 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted font-mono">
          Built with curiosity, from Rome.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/eduardcapanu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="mailto:capanueduard98@gmail.com"
            className="text-text-muted hover:text-primary transition-colors"
            aria-label="Email"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13L2 4" />
            </svg>
          </a>
        </div>
      </footer>
    </section>
  )
}
