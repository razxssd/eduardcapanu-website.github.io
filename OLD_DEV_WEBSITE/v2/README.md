# Eduard Capanu — Personal Website v2

A futuristic, mobile-first personal website for Eduard Capanu — Technical Growth Product Manager. Built with React 19, TypeScript, Vite, and Tailwind CSS 4. Zero animation libraries — all effects are pure CSS keyframes, Canvas 2D, and SVG.

## Quick Start

```bash
cd v2
npm install
npm run dev        # http://localhost:5173/v2/
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build → `dist/` |
| `npm run preview` | Preview the production build locally |

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 (Vite plugin) |
| Animations | Pure CSS keyframes + Canvas 2D API + SVG |
| Routing | None — single-page vertical scroll |

**No animation libraries** (no GSAP, no Framer Motion). Design system ported from the [Lupy dashboard](../../../XAU_personal_bot_v1/Lupy/apps/dashboard/).

## Project Structure

```
v2/
├── public/
│   ├── favicon.svg              # "EC" monogram in cyan
│   └── profile.jpeg             # Profile photo
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Root — renders all sections in order
│   ├── index.css                # Design system: @theme tokens, glass-card, glow, 13 keyframes, reduced-motion
│   ├── components/
│   │   ├── canvas/
│   │   │   └── NeuralNetworkCanvas.tsx  # Hero canvas (constellation nodes, pulse waves, perspective grid)
│   │   ├── layout/
│   │   │   ├── Layout.tsx               # Root wrapper (scan-lines overlay, nav, dots)
│   │   │   └── Navigation.tsx           # Hamburger → fullscreen overlay with glitch text
│   │   ├── sections/                    # Each full-page section
│   │   │   ├── Hero.tsx                 # "System Boot" — 4-phase boot sequence + canvas + name reveal
│   │   │   ├── About.tsx                # "Dual Interface" — engineer (cyan) vs product (gold) split
│   │   │   ├── CareerJourney.tsx        # "Signal Path" — horizontal scroll (desktop) / vertical timeline (mobile)
│   │   │   ├── Skills.tsx               # "Dual Radar" — overlapping SVG radar charts
│   │   │   ├── Impact.tsx               # "Mission Log" — metrics-driven glass cards
│   │   │   ├── Writings.tsx             # "Signal Broadcast" — featured LinkedIn posts + stats
│   │   │   ├── Testimonials.tsx         # "Signal Intercepts" — floating quote cards
│   │   │   └── Contact.tsx              # "Open Channel" — CTAs, location, languages, footer
│   │   └── ui/                          # Shared primitives
│   │       ├── GlassCard.tsx            # Glassmorphism card with glow variants
│   │       ├── AnimatedCounter.tsx      # Count-up on scroll-enter (IntersectionObserver)
│   │       ├── GlitchText.tsx           # Cycles text with glitch transition
│   │       ├── SVGRings.tsx             # 3 concentric rotating rings (mobile hero fallback)
│   │       ├── ScrollIndicator.tsx      # 3 cascading chevrons at bottom of hero
│   │       ├── SectionWrapper.tsx       # Consistent section padding + optional full-height
│   │       └── NavigationDots.tsx       # Right-side dot scroll-spy with labels on hover
│   └── hooks/
│       ├── useIntersectionObserver.ts   # Generic scroll-enter detection (once or continuous)
│       ├── useIsMobile.ts               # Media query hook (default 768px breakpoint)
│       ├── useReducedMotion.ts          # prefers-reduced-motion detection
│       └── useScrollProgress.ts         # 0–1 page scroll progress
├── index.html                   # Vite entry with meta tags
├── package.json                 # 6 deps + 4 devDeps
├── vite.config.ts               # React + Tailwind plugins, base: '/v2/'
├── tsconfig.json                # References app + node configs
├── tsconfig.app.json            # ES2023, strict, bundler mode
└── tsconfig.node.json           # For vite.config.ts
```

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#0a0a0f` | Page background |
| `--color-card` | `#12121a` | Glass card fill |
| `--color-primary` | `#00d4ff` | Cyan — engineering/tech accent |
| `--color-secondary` | `#ffd700` | Gold — product/growth accent |
| `--color-accent-green` | `#00ff88` | Success/live indicators |
| `--color-text` | `#e0e0e0` | Primary text |
| `--color-text-secondary` | `#888888` | Secondary text |
| `--color-text-muted` | `#555555` | Labels, muted elements |

### Typography

- **Display / Body:** Inter (system-ui fallback) — headings, paragraphs
- **Monospace:** JetBrains Mono → Fira Code → Cascadia Code → monospace — labels, metrics, code, nav

### Visual Effects

- **`.glass-card`** — `rgba(18,18,26,0.8)` + `backdrop-filter: blur(12px)` + border + hover state
- **`.glow-cyan`** / **`.glow-gold`** / **`.glow-green`** — box-shadow glow variants
- **`.scan-lines::before`** — subtle horizontal line overlay (fixed, pointer-events: none)
- **`.animate-float`** — 8s floating bob with slight rotation
- **`.animate-glitch`** — 0.35s glitch shake with clip-path
- **`.animate-pulse-glow`** — 2s pulsing glow for active indicators
- **`.reveal`** / **`.reveal.visible`** — scroll-triggered fade-up entrance

### Responsive Strategy

| Breakpoint | Behavior |
|------------|----------|
| **Mobile (<768px)** | No canvas. SVG rings for hero. Reduced blur (8px). Stacked layouts. Touch targets ≥44px. |
| **Tablet (768–1024px)** | Canvas with halved particles. Vertical career timeline. |
| **Desktop (>1024px)** | Full canvas, mouse parallax, horizontal career scroll, full glassmorphism. |
| **`prefers-reduced-motion`** | All animations killed, counters show final values, scroll-behavior: auto. |

### Animations Catalog (13 keyframes in `index.css`)

| Name | Duration | Usage |
|------|----------|-------|
| `float` | 8s infinite | Hero geometric shapes |
| `pulse-glow` | 2s infinite | Active navigation dots, live indicators |
| `glitchShake` | 0.35s forwards | Text transitions, name reveal |
| `glitchContent` | 0.35s forwards | Content opacity during glitch |
| `glitchFlash` | 0.35s forwards | Flash overlay during glitch |
| `typing` | varies | Terminal boot text |
| `blink-caret` | 0.7s infinite | Cursor blink |
| `fade-up` | 0.6s | Section content entrance |
| `slide-in-left` | 0.6s | About left column |
| `slide-in-right` | 0.6s | About right column |
| `draw-line` | 1.5s | SVG stroke drawing |
| `chevron-cascade` | 1.5s infinite | Scroll indicator chevrons |
| `ring-spin` | 15–30s infinite | SVG rings rotation |
| `drift` | variable | Background particle drift |

## Page Sections

1. **Hero** — "System Boot": terminal boot → canvas awakens → name glitch reveal → subtitle cycling → ambient state
2. **About** — "Dual Interface": engineer (cyan) vs product mind (gold) split, profile with rotating ring, bio
3. **Career** — "Signal Path": horizontal scroll timeline (desktop) / vertical (mobile), 5 career nodes, cyan→gold gradient
4. **Skills** — "Dual Radar": overlapping SVG radar charts for tech and product skills, certification badges
5. **Impact** — "Mission Log": 6 metrics-driven glass cards with animated counters and status bars
6. **Writings** — "Signal Broadcast": 6 featured LinkedIn posts (leadership, AI, React, TypeScript, case studies) + stats (143+ posts, 5K+ followers, 3K+ downloads)
7. **Testimonials** — "Signal Intercepts": 4 curated LinkedIn quotes in glass cards
8. **Contact** — "Open Channel": email, LinkedIn, GitHub, Medium buttons + location + languages + footer

## Build Output

```
dist/assets/index-*.css   ~6.8 KB gzipped
dist/assets/index-*.js   ~70.8 KB gzipped
```

## Deployment

Currently configured with `base: '/v2/'` for GitHub Pages subfolder deployment. To deploy as the main site, change `base` to `'/'` in `vite.config.ts` and copy `dist/` contents to the repo root.

## Origin

Design system, glassmorphism, glow effects, and animation patterns ported from the Lupy AI trading dashboard (`XAU_personal_bot_v1/Lupy/apps/dashboard/`). Key reference files:
- `Lupy/src/index.css` — tokens, classes, keyframes
- `Lupy/src/components/home/JarvisBackground.tsx` — canvas animation pattern
- `Lupy/src/pages/Home.tsx` — SVG ring composition
