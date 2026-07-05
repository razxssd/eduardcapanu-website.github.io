# Eduard Capanu — Personal Website V3

A futuristic, mobile-first personal website with cinematic scroll-driven animations and a narrative storytelling approach. Built with React 19, GSAP, and Tailwind CSS 4.

## Live Preview

- **V3 (dev):** `http://localhost:5175/v3/`
- **V2 (current):** `https://eduardcapanu-website.github.io/v2/`
- **V1 (legacy):** `https://eduardcapanu-website.github.io/`

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19.2 | UI framework |
| Vite | 8.0 | Build tool |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | 4.2 | Utility-first styling |
| GSAP 3 + ScrollTrigger | 3.12 | Scroll-driven animations |
| Lenis | 1.1 | Smooth scrolling |
| Canvas 2D | native | Hero particle effects |

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build → dist/
npm run preview    # Preview production build
```

## Bundle Size

| Chunk | Gzipped |
|-------|---------|
| Main (React + Hero) | ~67 KB |
| GSAP + shared hooks | ~47 KB |
| CSS | ~6 KB |
| Lazy sections (each) | 1.5–3 KB |
| **Total initial load** | **~120 KB** |

## Architecture

Single-page scroll app with 6 narrative sections. Below-fold sections are lazy-loaded via `React.lazy`.

```
Hero → Story → Capabilities → Work → Voices → Connect
```

### Key Design Decisions

- **GSAP over CSS-only animations:** Scroll-driven scrub animations, timeline orchestration, and the hero cinematic sequence require programmatic control that CSS keyframes + IntersectionObserver can't provide.
- **Lenis for smooth scroll:** Provides buttery-smooth scrolling and syncs with GSAP ScrollTrigger for precise scroll-linked animations.
- **Canvas 2D over Three.js:** The hero particle field uses native Canvas 2D (~0 KB) instead of Three.js (~150 KB). Sufficient for the effect, massive bundle savings.
- **No Framer Motion:** GSAP handles all animations. Framer Motion would add ~30 KB of overlap.
- **Narrative section names:** "Story", "Capabilities", "Voices", "Connect" instead of generic "About", "Skills", "Testimonials", "Contact" — reinforces the storytelling approach.

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#0a0a0f` | Page background |
| `--color-primary` | `#00d4ff` | Cyan — engineering, technical |
| `--color-secondary` | `#ffd700` | Gold — product, growth |
| `--color-accent-green` | `#00ff88` | Success, active states |
| `--color-text` | `#e0e0e0` | Primary text |
| `--color-text-secondary` | `#888888` | Secondary text |

### Typography

- **Display / Headings:** JetBrains Mono (self-hosted woff2, 400 + 700)
- **Body:** System sans-serif (Inter, system-ui, -apple-system)
- **Fluid sizing:** All display text uses `clamp()` — no breakpoint jumps

### Glassmorphism

Cards use `backdrop-filter: blur(12px)` on desktop, `blur(8px)` on mobile. Applied via the `.glass-card` CSS class or `GlassCard` component.

### Glow Effects

`.glow-cyan`, `.glow-gold`, `.glow-green` — box-shadow based, applied on hover via `GlassCard`'s `glow` prop.

## Sections

### Hero
- **4-phase cinematic animation:** dark → aurora gradient → narrative text reveal (blur-to-sharp, word by word) → name character reveal (staggered from random positions)
- Narrative and name are absolutely positioned in the same container for smooth crossfade
- Particle field (Canvas 2D) activates on desktop after animation completes
- Mobile: compressed timings (0.5x speed), CSS aurora only (no canvas)
- Click/tap anywhere to skip to final state
- `prefers-reduced-motion` skips directly to final state

### Story
- 5 career narrative beats with scroll-driven GSAP animations
- Alternating left/right layout on desktop
- SVG gradient line (cyan→gold) draws itself on scroll via `stroke-dashoffset`
- Desktop: `scrub: true` (scroll-linked). Mobile: play-once triggers

### Capabilities
- Two-column layout: Engineering (cyan) / Product (gold)
- Animated progress bars (`scaleX` from 0) on scroll entry
- Certification pills with hover effects

### Work
- 6 achievement case-study cards
- Staggered entrance (GSAP `stagger: 0.12`)
- Color-coded by domain (cyan/gold/green)

### Voices
- 4 testimonials with decorative quote mark
- GlassCard layout, staggered fade-in

### Connect
- MagneticButton components (cursor-following on desktop)
- Email, LinkedIn, Website links
- Languages: Romanian (native), Italian (bilingual), English (advanced), French (learning)
- Footer: "Built with curiosity, from Rome."

## Deployment

### Development (current)

V3 lives at `/v3/` with `base: '/v3/'` in `vite.config.ts`.

### Promotion to Main Site

1. Change `base` in `vite.config.ts` from `'/v3/'` to `'/'`
2. Update font paths in `src/index.css` from `'/fonts/...'` to `'/fonts/...'` (relative stays the same)
3. Update `index.html` preload hrefs
4. `npm run build`
5. Copy `dist/` contents to repo root
6. Archive v1 files to `/v1/` if desired

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| FCP | < 1.0s |
| LCP | < 1.5s |
| CLS | < 0.05 |
| TBT | < 150ms |

## Browser Support

Chrome, Firefox, Safari, Edge (latest 2 versions). `prefers-reduced-motion` fully supported.
