# CLAUDE.md — v2 Personal Website

## Project Overview

This is Eduard Capanu's personal website v2, a single-page React app with a futuristic dark UI. It lives in `/v2` inside the `eduardcapanu-website.github.io` GitHub Pages repo. The v1 site (static HTML/CSS/JS in the repo root) is left untouched.

## Commands

```bash
npm run dev        # Vite dev server at http://localhost:5173/v2/
npm run build      # tsc -b && vite build → dist/
npm run preview    # Preview production build
```

## Architecture

- **Single-page scroll** — no router. 8 sections rendered in order in `App.tsx`.
- **Section order:** Hero → About → CareerJourney → Skills → Impact → Writings → Testimonials → Contact.
- **Each section** is a standalone component in `src/components/sections/`. Sections use `SectionWrapper` for consistent padding and accept an `id` for scroll-spy navigation.
- **Shared UI** in `src/components/ui/` — `GlassCard`, `AnimatedCounter`, `GlitchText`, `SVGRings`, `ScrollIndicator`, `NavigationDots`, `SectionWrapper`.
- **Canvas** in `src/components/canvas/` — `NeuralNetworkCanvas` renders the hero background (desktop only).
- **Layout** in `src/components/layout/` — `Layout` wraps everything with scan-lines overlay + nav + dots. `Navigation` is the hamburger menu with fullscreen overlay.
- **Hooks** in `src/hooks/` — `useIntersectionObserver`, `useIsMobile`, `useReducedMotion`, `useScrollProgress`.

## Design System (index.css)

All design tokens live in `src/index.css` inside the `@theme` block. This is the single source of truth for colors, fonts, and variables.

### Color Convention

- **Cyan (`--color-primary`, `#00d4ff`)** = engineering, technical, code side of Eduard.
- **Gold (`--color-secondary`, `#ffd700`)** = product, growth, strategy side.
- **Green (`--color-accent-green`, `#00ff88`)** = success, live, active states.
- This duality is a core design concept — maintain it when adding new sections or elements.

### Key CSS Classes

- `.glass-card` — glassmorphism card. Use the `GlassCard` component instead of applying directly.
- `.glow-cyan` / `.glow-gold` / `.glow-green` — box-shadow glow. Applied via `GlassCard`'s `glow` prop on hover.
- `.scan-lines` — applied to the root `Layout` div. Adds a fixed overlay of faint horizontal lines.
- `.reveal` / `.reveal.visible` — scroll-triggered fade-up. But most sections handle their own IntersectionObserver transitions inline.
- `.animate-glitch` — 0.35s glitch shake. Use the `GlitchText` component for cycling text.
- `.animate-float` — 8s floating bob. Used on hero geometric shapes.
- `.animate-pulse-glow` — 2s pulse. Used on active nav dots.

### Responsive Rules

- Mobile is `< 768px` (detected by `useIsMobile` hook).
- On mobile: **no Canvas elements** — replace with CSS/SVG alternatives.
- On mobile: glass-card blur reduced from `12px` to `8px`.
- `prefers-reduced-motion: reduce` kills all animations and transitions globally.

## Key Patterns

### Adding a New Section

1. Create `src/components/sections/NewSection.tsx`.
2. Use `SectionWrapper` with an `id` prop matching the nav ID.
3. Use `useIntersectionObserver` for scroll-triggered animations.
4. Import and add it in `App.tsx` in the desired position.
5. Add the section ID to the `SECTIONS` array in `Layout.tsx`.
6. Add a label in the `LABELS` maps in both `Navigation.tsx` and `NavigationDots.tsx`.

### Animation Approach

- **NO external animation libraries.** Everything uses CSS keyframes (defined in `index.css`), CSS transitions (triggered by IntersectionObserver adding classes or changing inline styles), Canvas 2D (`requestAnimationFrame`), or SVG attributes.
- New keyframes go in `index.css` under the "Keyframe animations" section.
- Scroll-triggered animations use `useIntersectionObserver` → conditionally apply CSS classes or inline `transition` styles.
- Canvas components must clean up with `cancelAnimationFrame` on unmount and handle `resize` events.
- Canvas components must check `useIsMobile()` and return `null` on mobile.
- Canvas components must scale by `window.devicePixelRatio` for retina.

### Component Conventions

- **GlassCard** — always use this for card-like containers. Props: `glow` (cyan/gold/green/none), `hover` (boolean), `className`.
- **AnimatedCounter** — counts from 0 to `value` on scroll-enter. Respects `prefers-reduced-motion`. Props: `value`, `prefix`, `suffix`, `duration`, `className`.
- **GlitchText** — cycles through an array of strings with glitch transitions. Props: `texts`, `interval`, `className`.

### Hooks

- **`useIntersectionObserver<T>(options?)`** — returns `{ ref, isVisible }`. Options: `threshold` (default 0.1), `rootMargin`, `once` (default true).
- **`useIsMobile(breakpoint?)`** — returns `boolean`. Default breakpoint is 768px.
- **`useReducedMotion()`** — returns `boolean`. True when `prefers-reduced-motion: reduce` is active.
- **`useScrollProgress()`** — returns `number` (0 to 1) representing page scroll progress.

## Content Sources

### Career Data

Eduard's full career profile is available at:
- `/Users/eduardcapanu/Eduard/Other/Personal/personal/career-ops/` — comprehensive career data including CV, resume, job search pipeline, interview stories, compensation targets.
- `/Users/eduardcapanu/Eduard/Other/Personal/git/epd_context/Argus/personal/` — additional career context, professional profile, target roles.

**Key career facts for content:**
- Technical Growth Product Manager at Rebrandly (Nov 2025 – present)
- 9+ years engineering experience (13+ years coding total)
- Microsoft MVP (Sep 2024 – Oct 2025)
- Career arc: Junior Dev (2019) → Senior (2021) → Lead Architect (2022) → Tech Lead (2024) → Growth PM (2025)
- Key achievements: rebrandly.com rebuild (4 weeks), checkout optimization (28%→30%), MCP Server (first-to-market), Self-Service Downgrades (~$50K ARR)
- Corporate Trainer for 4 years (React, TypeScript, Redux)
- Based in Rome, Italy. EU citizen. Languages: Romanian (native), Italian (C1/C2), English (B2+), French (A1)
- Contact: capanueduard98@gmail.com, LinkedIn: /in/eduardcapanu

### LinkedIn Posts (Writings Section)

Eduard's full LinkedIn post archive (143+ posts, 2022–2026) is at:
- `/Users/eduardcapanu/Downloads/Private & Shared 36/Programmed posts/` — individual markdown files with metadata headers.

**Currently featured in `Writings.tsx` (6 posts):**
1. "I realized that being a Tech Lead doesn't mean being the best developer on the team." (Feb 2026) — LEADERSHIP
2. "I stopped writing code. And that's when I finally understood how developers should use AI." (Mar 2026) — AI
3. "How I Actually Use AI as a Tech Lead (It's Not What You Think)" (Feb 2026) — AI + LEADERSHIP
4. "30+ React Tips & Tricks (Free)" (Apr 2024) — REACT
5. "30+ TypeScript Tips & Tricks (Free)" (Sep 2024) — TYPESCRIPT
6. "We Migrated to Astro — Here Are the Results" (May 2025) — CASE STUDY

**Other strong posts that could be swapped in:**
- Microsoft MVP announcement (Sep 2024) — career milestone
- 5k followers milestone (Oct 2024) — social proof
- AWS Agentic AI Bootcamp in London (Feb 2026) — AI credibility
- "5 Skills a senior frontend engineer needs" (Jan 2024) — authoritative career guidance
- "What is React Virtual DOM?" (Mar 2024) — foundational technical explainer

**Stats displayed:** 143+ posts published, 5K+ followers, 3K+ free downloads.

**LinkedIn URLs:** Currently all cards link to `linkedin.com/in/eduardcapanu/recent-activity/all/`. If you find direct post URLs, update them in the `FEATURED_POSTS` array in `Writings.tsx`.

### Testimonials

Current testimonials are hardcoded in `Testimonials.tsx`. Original full testimonials are in the v1 site at `../index.html` in the `#customer-reviews` section.

### Design Inspiration

The design system was ported from the Lupy AI trading dashboard:
- **Source:** `/Users/eduardcapanu/Eduard/Other/Personal/XAU_personal_bot_v1/Lupy/apps/dashboard/`
- **Key files:**
  - `src/index.css` — color tokens, glass-card, glow effects, all keyframes
  - `src/components/home/JarvisBackground.tsx` — canvas animation pattern (radial pulses, perspective grid, frequency bars, energy streams)
  - `src/pages/Home.tsx` — SVG ring/orb composition, 3D card layout, state-based color changes
  - `src/components/home/HoloCard.tsx` — holographic card formation with dual canvas layers

## Deployment

- `vite.config.ts` has `base: '/v2/'` for GitHub Pages subfolder.
- To promote to main site: change `base` to `'/'` and copy `dist/` to repo root.
- The site is pure static — no API, no server, no environment variables.

## Remaining Work

### Phase 7: Polish
- Self-host JetBrains Mono font (currently using system mono fallback). Download Latin subset woff2 (400 + 700), place in `public/fonts/`, add `@font-face` in `index.css`.
- Create Open Graph image (`public/og-image.png`) — dark bg, cyan "EC" monogram or name.
- Lighthouse audit — target 95+ Performance, 100 Accessibility, 90+ SEO.
- Test all breakpoints: 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), 1024px, 1440px, 1920px.
- Fine-tune animation timings in the browser — hero boot speed, scroll entrance delays, counter durations.
- Ensure all images use WebP where possible, add explicit `width`/`height` to images.
- Verify `prefers-reduced-motion` path end-to-end.

### Phase 8: Deployment
- GitHub Actions workflow or manual deploy.
- Cross-browser testing: Safari, Chrome, Firefox, Edge.
- Optional: Vercel deployment as alternative.

### Possible Future Enhancements
- Mouse parallax on hero geometric shapes (desktop only) — track mouse position, apply transform offsets.
- Circuit-board canvas background for Career section (thin right-angle lines at low opacity).
- Particle drift background for Testimonials section (CSS-only using `drift` keyframe + `--dx`/`--dy` custom properties).
- Blog/writing section if Eduard wants to showcase articles.
- Project showcase section with live demos or screenshots.
- Dark/light mode toggle (currently dark-only).
- i18n support (Romanian, Italian, English versions).
- Analytics integration (Microsoft Clarity, currently on v1).
