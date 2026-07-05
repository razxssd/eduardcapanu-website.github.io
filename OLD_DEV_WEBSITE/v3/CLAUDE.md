# CLAUDE.md — v3 Personal Website

## Project Overview

Eduard Capanu's personal website v3 — a futuristic, mobile-first single-page app with cinematic scroll-driven animations. Lives in `/v3` inside the `eduardcapanu-website.github.io` GitHub Pages repo. V1 (static HTML at repo root) and V2 (React app at `/v2`) are left untouched.

The design philosophy is **narrative storytelling** — the site tells Eduard's career journey through scroll-driven animations with a humble tone ("Helping teams build what matters", not "I am the best").

## Commands

```bash
npm run dev        # Vite dev server (port auto-assigned, base: /v3/)
npm run build      # tsc -b && vite build → dist/
npm run preview    # Preview production build
```

## Architecture

- **Single-page scroll** — no router. 6 sections rendered in order in `App.tsx`.
- **Section order:** Hero → Story → Capabilities → Work → Voices → Connect.
- **Lazy loading:** All sections except Hero are loaded via `React.lazy` + `Suspense` for performance.
- **Animation engine:** GSAP 3 + ScrollTrigger (registered in `src/animations/gsap-setup.ts`). All GSAP imports should come from this file, never directly from `'gsap'`.
- **Smooth scroll:** Lenis (initialized in `useSmoothScroll` hook, synced with GSAP ticker).

## File Structure

```
src/
├── main.tsx                          # React entry
├── App.tsx                           # Section composition (Hero eager, rest lazy)
├── index.css                         # Design tokens, glassmorphism, keyframes, scan-lines
├── animations/
│   ├── gsap-setup.ts                 # GSAP + ScrollTrigger registration (SINGLE SOURCE)
│   ├── hero-particles.ts            # ParticleSystem class for Canvas 2D
│   ├── scroll-sequences.ts          # Reusable scroll animation factories
│   └── text-reveal.ts               # Cinematic text animation utilities
├── components/
│   ├── canvas/
│   │   ├── ParticleField.tsx         # Hero particle constellation (desktop only)
│   │   └── AuroraBackground.tsx      # CSS gradient aurora effect
│   ├── layout/
│   │   ├── Layout.tsx                # Root wrapper (Lenis, nav, scroll progress)
│   │   ├── Navigation.tsx            # Floating glass nav, hamburger menu
│   │   └── ScrollProgress.tsx        # Gradient progress bar at top
│   ├── sections/
│   │   ├── Hero.tsx                  # 4-phase cinematic reveal + particles
│   │   ├── Story.tsx                 # Career narrative timeline (scroll-driven)
│   │   ├── Capabilities.tsx          # Skills two-column + animated bars
│   │   ├── Work.tsx                  # Achievement case-study cards
│   │   ├── Voices.tsx                # Testimonials
│   │   └── Connect.tsx               # Contact + footer
│   └── ui/
│       ├── GlassCard.tsx             # Glassmorphism card (glow prop: cyan/gold/green)
│       ├── AnimatedCounter.tsx       # Count-up on scroll-enter
│       ├── TextReveal.tsx            # GSAP word-by-word blur→sharp reveal
│       ├── MagneticButton.tsx        # Cursor-following button (desktop)
│       └── SplitText.tsx             # Splits text into .word or .char spans
├── hooks/
│   ├── useIsMobile.ts               # matchMedia, default 768px breakpoint
│   ├── useReducedMotion.ts          # prefers-reduced-motion detection
│   ├── useScrollProgress.ts         # 0-1 scroll position
│   ├── useIntersectionObserver.ts   # Scroll-triggered visibility
│   ├── useSmoothScroll.ts           # Lenis + GSAP ticker sync
│   └── useGsapScrollTrigger.ts      # GSAP ScrollTrigger React hook
└── data/
    ├── career.ts                    # CareerBeat[] — 5 narrative beats
    ├── skills.ts                    # SkillGroup[] + CERTIFICATIONS
    ├── achievements.ts              # Achievement[] — 6 impact cards
    └── testimonials.ts              # Testimonial[] — 4 quotes
```

## Design System (index.css)

All design tokens live in `src/index.css` inside the `@theme` block. Single source of truth.

### Color Convention

- **Cyan (`--color-primary`, `#00d4ff`)** = engineering, technical, code.
- **Gold (`--color-secondary`, `#ffd700`)** = product, growth, strategy.
- **Green (`--color-accent-green`, `#00ff88`)** = success, active, native.
- This duality is a core concept — the Story section's gradient line transitions from cyan to gold, mirroring the career arc from engineering to product.

### Key CSS Classes

- `.glass-card` — glassmorphism. Use `GlassCard` component, not this class directly.
- `.glow-cyan` / `.glow-gold` / `.glow-green` — hover glow. Applied via `GlassCard`'s `glow` prop.
- `.scan-lines` — applied to root `Layout` div. Fixed overlay of faint horizontal lines.
- `.aurora` — radial gradient with hue-shift animation. Used in `AuroraBackground`.
- `.animate-float` / `.animate-pulse-glow` / `.animate-fade-up` — utility animation classes.

### Self-Hosted Fonts

JetBrains Mono Regular (400) and Bold (700) in `public/fonts/` as woff2. Loaded via `@font-face` in `index.css` with `font-display: swap`. Preloaded in `index.html`.

### Responsive Rules

- Mobile is `< 768px` (detected by `useIsMobile` hook).
- All base CSS targets mobile. Desktop adds complexity via `md:`, `lg:` prefixes.
- On mobile: **no Canvas elements** — `ParticleField` returns `null`, CSS aurora used instead.
- On mobile: glass-card blur reduced from `12px` to `8px`.
- On mobile: GSAP uses simple play-once triggers (no `scrub`).
- On desktop: GSAP uses `scrub: true` for scroll-linked animations.
- `prefers-reduced-motion: reduce` kills all animations globally.

## Key Patterns

### GSAP Import Pattern

**Always import from `src/animations/gsap-setup.ts`**, never from `'gsap'` directly. This file registers ScrollTrigger and sets defaults.

```ts
// CORRECT
import { gsap, ScrollTrigger } from '../../animations/gsap-setup'

// WRONG — ScrollTrigger won't be registered
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
```

### Adding a New Section

1. Create `src/components/sections/NewSection.tsx`.
2. Use GSAP ScrollTrigger for scroll animations (import from `gsap-setup`).
3. Check `useReducedMotion()` and skip animations when true.
4. Add lazy import in `App.tsx` inside the `Suspense` block.
5. Add section ID to `SECTIONS` array in `Navigation.tsx`.
6. Extract data to `src/data/` if the section has significant content.

### Hero Animation Architecture

The hero uses a **4-phase GSAP timeline** (not React state transitions):

1. **Aurora** (0.1s) — CSS gradient fades in via React state
2. **Narrative** (0.4s–2.6s) — Phrases blur-to-sharp via `gsap.fromTo` with `filter: blur()`
3. **Name** (2.6s–3.4s) — Characters stagger in from random positions via `gsap.fromTo`
4. **Ambient** (on complete) — Particle field mounts, narrative hides

**Critical:** The narrative div and name div are absolutely positioned in the same container so they crossfade in place — no layout shift. Don't change this to normal flow or the transition will jump.

The `phaseRef` (not state) tracks the current phase to avoid re-render loops. `skipToAmbient()` kills the timeline and sets everything to final state.

### Animation Approach

- **GSAP** for programmatic animations (hero timeline, scroll-triggered entrances, scrub animations).
- **CSS keyframes** (in `index.css`) for ambient/looping effects (float, pulse-glow, aurora-shift).
- **CSS transitions** for hover effects (border-color, box-shadow, transform).
- All animations use **only `transform` and `opacity`** (GPU-composited). Never animate `width`, `height`, `top`, `left`, `margin`.
- Canvas components must clean up with `cancelAnimationFrame` on unmount and handle `resize`.
- Canvas components return `null` on mobile (checked via `useIsMobile`).

### Component Conventions

- **GlassCard** — use for all card containers. Props: `glow` (cyan/gold/green/none), `hover` (boolean), `className`.
- **AnimatedCounter** — counts from 0 to `value` on scroll-enter. Respects `prefers-reduced-motion`.
- **MagneticButton** — cursor-following on desktop, normal button on mobile. Props: `href`, `onClick`, `strength`, `className`.
- **SplitText** — splits text into `.word` or `.char` spans for per-element GSAP animation. Props: `text`, `mode` (words/chars).
- **TextReveal** — GSAP-powered word-by-word blur→sharp reveal. Props: `trigger` (boolean), `delay`, `staggerLines`.

### Hook Conventions

- **`useIsMobile(breakpoint?)`** — returns `boolean`. Default 768px.
- **`useReducedMotion()`** — returns `boolean`. True when `prefers-reduced-motion: reduce`.
- **`useScrollProgress()`** — returns `number` (0 to 1).
- **`useIntersectionObserver<T>(options?)`** — returns `{ ref, isVisible }`. Options: `threshold`, `rootMargin`, `once`.
- **`useSmoothScroll()`** — initializes Lenis + GSAP sync. Called once in `Layout.tsx`.

## Content Sources

### Career Data

Eduard's full career profile is available at:
- `/Users/eduardcapanu/Eduard/Other/Personal/personal/career-ops/` — comprehensive CV, resume, compensation targets, job search pipeline.
- `/Users/eduardcapanu/Eduard/Other/Personal/git/epd_context/Argus/personal/` — professional profile, work history, project outcomes, leadership patterns, career goals.

**Key career facts:**
- Technical Growth Product Manager at Rebrandly (Nov 2025 – present, transitioning to Core team Apr 2026)
- 9+ years engineering experience (13+ years coding total)
- Microsoft MVP (Sep 2024 – Oct 2025)
- Career arc: Junior Dev (2019) → Senior (2021) → Lead Architect (2022) → Tech Lead (2024) → Growth PM (2025)
- Key achievements: rebrandly.com rebuild (4 weeks), checkout optimization (28%→30%), MCP Server (first-to-market), Self-Service Downgrades (~$50K ARR)
- Corporate Trainer for 4 years (React, TypeScript, Redux)
- CoderDojo volunteer in Rome
- Based in Rome, Italy. EU citizen.
- Languages: Romanian (native), Italian (bilingual), English (advanced), French (learning)
- Contact: capanueduard98@gmail.com, LinkedIn: /in/eduardcapanu

### Testimonials

From `src/data/testimonials.ts` — 4 testimonials from Michele Gaggini, Davide Bonardi, Davide Laverga, Nicolò Marziale. Original full testimonials also exist in v1's `../index.html` in the `#customer-reviews` section.

## Deployment

- `vite.config.ts` has `base: '/v3/'` for GitHub Pages subfolder.
- To promote to main site: change `base` to `'/'`, build, copy `dist/` to repo root.
- Pure static — no API, no server, no environment variables.

## Remaining Work

### Polish
- Create Open Graph image (`public/og-image.png`) — dark bg, name or "EC" monogram.
- Lighthouse audit — target 95+ Performance, 100 Accessibility, 90+ SEO.
- Test breakpoints: 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), 1024px, 1440px, 1920px.
- Fine-tune animation timings in browser — hero speed, scroll entrance delays, counter durations.
- Convert profile photo to WebP with explicit `width`/`height`.
- Verify `prefers-reduced-motion` path end-to-end.
- Cross-browser testing: Safari, Chrome, Firefox, Edge.

### Possible Enhancements
- Mouse parallax on hero particles (stronger effect on desktop).
- Horizontal scroll testimonial carousel on desktop (currently vertical grid).
- Blog/Writings section showcasing LinkedIn posts (exists in v2, not yet ported).
- SVG skill constellation visualization (currently progress bars — simpler but less "wow").
- Dark/light mode toggle.
- i18n (Romanian, Italian, English).
- GitHub Actions deployment workflow.
- Analytics integration (Microsoft Clarity).
- Project showcase section with live demos.
