# v4 Personal Website — Claude Design prompt

How to use: paste **Block 0** first to establish the system, then paste each
section prompt in order. Self-contained — all copy is included. Optional: attach
a headshot image if you want a real photo in the hero / Now section.

---

```
════════════════════════════════════════════════════════════════
BLOCK 0 — PROJECT & DESIGN SYSTEM  (paste this first)
════════════════════════════════════════════════════════════════

PROJECT
Design a personal website for Eduard Capanu — a Technical Product Manager
(Growth) in Rome who came up through 9+ years of engineering. The site's job
is to make a hiring manager or founder think: "This is a product person with
unusually deep technical range, who ships outcomes and writes clearly." It is
NOT a developer portfolio and NOT a course-selling page. Product judgment is
the hero; engineering is his edge, not his identity.

REFERENCE FEEL
Minimal, warm, editorial, content-first, conversational (in the spirit of
jhforster.me). Generous whitespace, human voice, work shown as a quiet grid
with short narratives instead of metric peacocking. Confident but humble.
The opposite of a flashy neon dev portfolio.

VISUAL STYLE
Calm editorial. Warm paper background, near-black ink, ONE restrained accent.
Craft shows through typography, spacing, and restraint — not effects.
No particle fields, no neon, no glassmorphism, no cinematic hero.

COLOR
- Background (paper):     #FAF9F6
- Ink (primary text):     #1A1A1A
- Secondary text:         #6B6B6B
- Hairline borders:       #E7E4DD
- Accent (single):        #B4521E  (warm terracotta — swap freely; a calm
                          ink-blue #2A5BD7 also works. Use ONE, sparingly:
                          links, active states, outcome lines, one CTA.)
- Optional dark mode:     ink #0F0F0E bg, #EDEAE3 text, same accent.

TYPOGRAPHY  (this duality is the concept)
- Display / name / section headers: a warm editorial SERIF (Fraunces or
  Newsreader). Signals product, judgment, writing.
- Body: a clean humanist SANS (Inter / system-ui). Reading size, line-height ~1.6.
- Labels, eyebrows, tags, dates, outcome figures: a MONOSPACE (JetBrains Mono
  or IBM Plex Mono), small and letter-spaced. This is the ONLY nod to his
  engineering roots — a quiet signature, not the whole aesthetic.
- Fluid sizing with clamp(). The name is large but not shouting.

SPACING & SHAPE
- Text column max ~720px; work grid can go wider (~1040px). Left-aligned.
- Spacing scale: 4, 8, 16, 24, 40, 64, 96. Sections separated by big vertical
  air (80–120px), not by boxes and borders.
- Radius: 8px on cards; pills fully rounded. 1px hairline borders, used
  sparingly. No heavy shadows.

MOTION
- Restrained. Subtle fade-and-rise on scroll entry (opacity 0→1, translateY
  12px→0, ~400ms ease). Nothing else. Honor prefers-reduced-motion. Fast and
  accessible (target Lighthouse 95+).

VOICE (write all copy like this)
- First person, warm, concrete, humble. Short sentences. Specific over vague.
  No buzzword soup ("synergy", "passionate", "ninja"). Let outcomes speak.
  A little human and dry-funny is welcome.


════════════════════════════════════════════════════════════════
SECTION 1 — HERO
════════════════════════════════════════════════════════════════
A quiet, text-first hero on the paper background. No image required (an
optional small, natural square headshot to the side is fine — not stock).

- Eyebrow (mono, small, tracked):  PRODUCT · GROWTH · BASED IN ROME
- Headline (serif, large):  I'm Eduard Capanu.
- Sub-headline (serif, medium):  A product manager who came up through nine
  years of engineering — and still reads the pull requests.
- Paragraph (sans, body):  "I lead Growth product — I own the roadmap from
  discovery to delivery, run the experiments, and stay close enough to the
  code to debug a webhook when it matters. I like the stage where strategy
  and execution are the same conversation."
- A "currently" line (mono label "NOW —" + sans):  building AI-native
  features with Claude Code, going deep on product-led growth, and teaching
  kids to code at CoderDojo Rome.
- One text link in the accent color: "See what I've shipped ↓"

Top nav: just text links, small, right-aligned — Work · Approach · Now ·
Writing · Contact. No logo box; his name in mono at left is enough.


════════════════════════════════════════════════════════════════
SECTION 2 — SELECTED WORK
════════════════════════════════════════════════════════════════
A responsive grid of quiet cards (2 col desktop, 1 mobile): a row of small
mono TAG pills, a serif title, a 1–2 line sans narrative, and ONE short mono
outcome line in the accent color. Framed by area of impact, not project names.

Section eyebrow (mono): SELECTED WORK
Section header (serif): A few areas where I've moved the needle.

Card 1 — tags [ MONETIZATION · RETENTION ]
  Title: Turning a cancel moment into a stay moment
  Narrative: "Redesigned a subscription flow so customers could adjust their
  plan themselves instead of churning outright — with the billing edge cases
  handled cleanly behind the scenes."
  Outcome: Protected recurring revenue, fewer support tickets

Card 2 — tags [ 0→1 · AI ]
  Title: An AI-native integration, shipped early
  Narrative: "Took an AI capability from idea to production — letting assistants
  work with the platform in plain language — early enough to be first in the
  category."
  Outcome: First-to-market in its space

Card 3 — tags [ GROWTH · EXPERIMENTATION ]
  Title: Small tests, real revenue
  Narrative: "Ran a series of checkout and onboarding experiments, using A/B
  testing and analytics to strip friction from the paths that actually convert."
  Outcome: Measurable lift in conversion

Card 4 — tags [ PRODUCT JUDGMENT · DATA ]
  Title: The number that didn't add up
  Narrative: "A report flagged a small handful of affected accounts. The math
  felt off, so I kept pulling the thread — the real impact was orders of
  magnitude larger. Wrote the spec, drove the fix, closed it out."
  Outcome: ~100× bigger than first reported

Card 5 — tags [ 0→1 · PLATFORM ]
  Title: A site rebuilt in a month
  Narrative: "Rebuilt a company's marketing site from scratch in four weeks —
  faster, SEO-first, and built to convert."
  Outcome: 4 weeks, from scratch

Card 6 — tags [ CROSS-FUNCTIONAL · DELIVERY ]
  Title: Shipping across the whole org
  Narrative: "Owned the specs and coordinated engineering, design, and QA to
  ship revenue features across both self-serve and sales-led motions."
  Outcome: Delivered end-to-end


════════════════════════════════════════════════════════════════
SECTION 3 — HOW I WORK
════════════════════════════════════════════════════════════════
A short, editorial list. Each principle: a serif sub-head + one sans line.
No icons, no cards — just clean typographic rhythm on the paper.

Section eyebrow (mono): HOW I WORK
Section header (serif): Close to the code, close to the customer.

- Data-informed, not data-paralyzed. "I use metrics to steer, but I'd rather
  ship something small and learn than wait for perfect data."
- Close to the code. "I review PRs and understand the constraints, so decisions
  are faster and less gets lost in translation between product and engineering."
- Write it down first. "Thorough specs before anyone writes a line — the
  thinking should be done on paper, not in the pull request."
- Ship in phases. "Reliability first, experience second. Big-bang launches are
  where good products go to break."
- Ask 'why?' one more time. "The best product signal is usually the number that
  doesn't add up. I pull that thread."


════════════════════════════════════════════════════════════════
SECTION 4 — NOW
════════════════════════════════════════════════════════════════
Warm and personal. A short intro line + a simple bulleted list. This is where
personality lives.

Section eyebrow (mono): NOW
Section header (serif): What I'm into these days.

- Building AI-native, with Claude Code and Codex as daily tools.
- Went deep at an Agentic AI bootcamp — built AI content moderation with
  large language models.
- Mentoring kids at CoderDojo Rome, with four years of corporate training
  (React, TypeScript, Redux) behind me.
- Recognized as a Microsoft MVP.


════════════════════════════════════════════════════════════════
SECTION 5 — WRITING
════════════════════════════════════════════════════════════════
A clean, scannable list of articles — not cards, just editorial rows. Each
row: date (mono, small, faint) · serif title (links out) · one grey sans line
of description · small mono tag pills. Hover lifts the title into the accent
color. Show ~6 most recent; a "Read all on dev.to →" link at the bottom.

Section eyebrow (mono): WRITING
Section header (serif): I write to think out loud.
Intro (sans, one line): "Mostly on engineering, React, and how I actually use
AI day to day. A running list — newest first."

Rows:
- 2024 · "Which E2E Tool to Use with React?" — Playwright vs the field. [react, testing]
- 2024 · "ReactTS: Is React.FC really necessary?" — a small opinion, strongly held. [react, typescript]
- 2024 · "React: You Might Not Need Another Library" — resisting dependency creep. [react]
- 2022 · "7 Signs You're a Good Programmer" — habits over syntax. [career]
- 2022 · "5 Ways to Get Started with Azure" — a practical on-ramp. [azure]
- 2020 · "How to Create a Power Apps Component Framework (PCF)" — my most-read piece. [microsoft]


════════════════════════════════════════════════════════════════
SECTION 6 — CONNECT  (minimal footer)
════════════════════════════════════════════════════════════════
Quiet close. One serif line, a row of text links in the accent color, done.

- Line (serif): Building the right thing is the hard part. Let's talk about it.
- Links (mono/sans): Email · LinkedIn · dev.to
- Footer micro-line (mono, faint): Built in Rome, with curiosity.


════════════════════════════════════════════════════════════════
BUILD ORDER
════════════════════════════════════════════════════════════════
1. Hero + nav (sets the type system and voice)
2. Selected Work (the centerpiece — get the quiet-card rhythm right first)
3. How I Work
4. Now
5. Writing
6. Connect
Keep it a single scrolling page. Prioritize typographic craft and whitespace
over any effect.
```
