---
name: premium-uiux-pro
description: "Design and build premium, emotionally immersive, cinematic web experiences with Apple-level polish. Combines frontend-design aesthetics, ui-ux-pro-max intelligence, web-design-guidelines compliance, react-best-practices performance, canvas-design philosophy, web-artifacts-builder architecture, composition-patterns scalability, context-optimization efficiency, and verification-before-completion rigor. Triggers on: premium website, cinematic UI, scroll storytelling, luxury web experience, immersive landing page, digital yearbook, memory archive, emotional design, parallax storytelling, motion design, GSAP animations, Framer Motion, scroll-triggered animations, interactive timeline, masonry gallery, story reels. Actions: design, build, animate, choreograph, optimize, verify."
---

# Premium UI/UX Pro — Cinematic Web Experience Engine

A synthesis of 9 specialized skills into one cohesive system for building world-class, emotionally immersive web experiences that feel handcrafted, not AI-generated.

## Design Philosophy: "Cinematic Nostalgia"

Every interface is a **directed film**, not a collection of components. The scroll is the screenplay. Each section is a scene. Motion is the cinematography. Typography is the voice. Color is the mood. Spacing is the rhythm.

### Core Principles

1. **Emotional Architecture** — Every section must evoke a specific emotion. Map sections to feelings: wonder → belonging → joy → nostalgia → pride → gratitude.
2. **Cinematic Choreography** — Scroll is the playhead. Content reveals in sequences, not all at once. Use pinned sections, parallax layers, and timed reveals.
3. **Restraint Over Excess** — Premium means knowing what NOT to include. Fewer effects, perfectly executed, beats many effects poorly timed.
4. **Depth & Dimension** — Layer elements at different scroll speeds. Use z-index, blur, opacity, and scale to create spatial depth.
5. **Typography as Voice** — Large, emotional headlines whisper or shout. Body text breathes. Quotes float. Every word is placed with intention.
6. **Color as Mood** — Dark bases with warm accent glows. Limited palette: 2-3 core colors + neutral scale. No rainbow, no template gradients.
7. **Motion as Meaning** — Every animation communicates something. Entrance = arrival. Fade = memory. Scale = importance. Parallax = depth of feeling.

## Pre-Design Checklist

Before writing any code, answer:

1. **Who is this for?** Define the emotional state of the target user.
2. **What should they feel?** Map the emotional journey section by section.
3. **What's the one moment?** Identify the single most impactful section — design that first.
4. **What's the visual metaphor?** Film? Book? Gallery? Journey? Time capsule?
5. **What makes it unforgettable?** One detail someone will remember and tell others about.

## Technical Architecture

### Stack Selection

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14+ (App Router) | SSR, performance, image optimization |
| Animation | GSAP + ScrollTrigger | Industry-standard scroll choreography |
| Motion | Framer Motion | Component-level micro-interactions |
| Styling | CSS Modules + CSS Variables | Scoped, maintainable, no utility bloat |
| Typography | Google Fonts (curated pairs) | Distinctive, not generic |
| Media | next/image + lazy loading | Performance with quality |
| State | React Context + useReducer | Simple, predictable for UI state |

### Component Architecture (from composition-patterns)

```
src/
├── components/
│   ├── layout/          # Shell, Nav, Footer, Section wrappers
│   ├── sections/        # Hero, Timeline, Gallery, Stories, etc.
│   ├── ui/              # Cards, Buttons, Modals, Badges
│   ├── animations/      # ScrollReveal, Parallax, TextReveal wrappers
│   └── interactive/     # StoryViewer, CampusMap, GuestBook
├── hooks/               # useScrollProgress, useInView, useParallax
├── styles/              # globals.css, variables.css, animations.css
├── lib/                 # utils, constants, data fetching
├── data/                # Static content, memory data, timeline events
└── app/                 # Next.js App Router pages
```

### Design System Tokens

```css
/* Typography Scale — Cinematic */
--font-display: 'Playfair Display', serif;    /* Headlines, emotional */
--font-body: 'Plus Jakarta Sans', sans-serif;  /* Body, modern */
--font-accent: 'Space Mono', monospace;        /* Labels, dates */

--text-hero: clamp(3rem, 8vw, 7rem);
--text-title: clamp(2rem, 4vw, 3.5rem);
--text-subtitle: clamp(1.25rem, 2vw, 1.75rem);
--text-body: clamp(1rem, 1.2vw, 1.125rem);
--text-caption: clamp(0.75rem, 1vw, 0.875rem);

/* Spacing Scale — Breathing Room */
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 2rem;
--space-lg: 4rem;
--space-xl: 6rem;
--space-2xl: 8rem;
--space-3xl: 12rem;

/* Color Palette — Warm Nostalgia on Dark */
--color-bg-deep: #0a0a0f;
--color-bg-surface: #13131a;
--color-bg-card: #1a1a24;
--color-accent-warm: #c8956c;
--color-accent-gold: #d4a574;
--color-accent-glow: #e8c9a0;
--color-text-primary: #f0ece4;
--color-text-secondary: #8a8694;
--color-text-muted: #5a5666;
--color-border: rgba(200, 149, 108, 0.12);
--color-glass: rgba(19, 19, 26, 0.7);

/* Motion — Refined Easing */
--ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
--duration-fast: 200ms;
--duration-normal: 400ms;
--duration-slow: 800ms;
--duration-cinematic: 1200ms;
```

## Animation Choreography Guide

### Scroll-Triggered Patterns

| Pattern | Use For | Timing |
|---------|---------|--------|
| Fade Up | Text blocks, cards | stagger: 0.1s each |
| Scale In | Hero elements, images | duration: 0.8s |
| Slide Reveal | Section transitions | duration: 1.2s |
| Parallax Float | Background layers | speed: 0.3-0.7x |
| Text Split | Headlines | per-character, 0.03s offset |
| Mask Wipe | Image reveals | left-to-right, 1s |
| Pin & Scroll | Storytelling sections | pin for 200vh scroll |
| Counter | Statistics, achievements | 2s count-up on enter |

### Performance Rules (from react-best-practices)

1. **Use `will-change` sparingly** — Only on elements about to animate
2. **Prefer `transform` and `opacity`** — GPU-accelerated, no layout thrash
3. **Use `IntersectionObserver`** — Don't animate off-screen elements
4. **Batch DOM reads/writes** — Via GSAP's built-in batching
5. **Lazy load media** — Images below fold use `loading="lazy"`
6. **Debounce scroll handlers** — 16ms minimum (requestAnimationFrame)
7. **Respect `prefers-reduced-motion`** — Disable animations for accessibility

### Section Reveal Choreography

```
Section enters viewport:
  T+0ms    → Background layer fades in (opacity 0→1)
  T+200ms  → Heading splits in character by character
  T+500ms  → Subtext fades up from 20px below
  T+700ms  → Media elements scale in (0.9→1, opacity 0→1)
  T+900ms  → Interactive elements slide in from edges
  T+1100ms → Accent lines/borders draw in
```

## Section Design Templates

### Hero Section
- Full viewport height, no scroll indicator initially
- Layered: video/image background → gradient overlay → floating particles → text
- Headline: 2 lines max, emotional, large display font
- Subtitle: 1 line, poetic, smaller, secondary color
- CTAs: Ghost button + filled button, spaced generously
- Ambient effects: Subtle floating light particles, film grain overlay
- Entrance: Staggered reveal over 2 seconds after page load

### Scroll Storytelling Chapter
- Pin the section for extended scroll
- Progress indicator (thin bar or dots)
- Content changes on scroll position:
  - 0-25%: Chapter title reveals
  - 25-50%: Image/media fades in with parallax
  - 50-75%: Body text and quote appear
  - 75-100%: Transition effect to next chapter
- Each chapter has a unique color accent shift

### Memory Gallery
- Masonry grid with varied card sizes (1x1, 2x1, 1x2, 2x2)
- Hover: Scale 1.02, subtle shadow lift, caption reveal
- Click: Fullscreen lightbox with smooth morph transition
- Filters: Horizontal scrolling pill buttons with active states
- Load more: Intersection-based infinite scroll, not pagination

### Interactive Timeline
- Horizontal on desktop, vertical on mobile
- Central line with milestone nodes
- Active node: Glowing accent color, expanded card
- Scroll-synced progress along the line
- Each milestone shows: Icon, date, title, thumbnail
- Click: Expands to full story with media

### Story Reels
- Horizontal scrollable row of vertical cards
- Each card: Full-bleed image, gradient overlay, category label
- Click: Opens immersive viewer
- Viewer: Fullscreen, auto-progress bar, swipe navigation
- Timer bar at top (5s per story frame)
- Categories styled with unique colors

## Quality Checklist (from verification-before-completion)

### Visual Quality
- [ ] No emojis used as icons — SVG only (Lucide icons)
- [ ] Typography hierarchy is clear and consistent
- [ ] Color palette limited to design tokens — no ad-hoc colors
- [ ] Spacing follows the scale — no magic numbers
- [ ] Dark mode contrast passes WCAG 4.5:1 for text
- [ ] No layout shift on any interaction or scroll
- [ ] Glass effects visible and legible
- [ ] Borders subtle but present where needed

### Motion Quality
- [ ] All animations use design token easings
- [ ] No animation exceeds 1.2s unless cinematic section
- [ ] Scroll animations are smooth at 60fps
- [ ] `prefers-reduced-motion` disables all non-essential motion
- [ ] No janky or flickering animations
- [ ] Stagger timing feels natural, not mechanical
- [ ] Parallax depth is subtle, not nauseating

### Interaction Quality
- [ ] All clickable elements have `cursor: pointer`
- [ ] Hover states provide clear visual feedback (200ms transition)
- [ ] Focus states visible for keyboard navigation
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Modal/lightbox has clear close affordance
- [ ] Loading states are smooth, not jarring

### Performance (from react-best-practices)
- [ ] Lighthouse Performance score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] No unused JavaScript in initial bundle
- [ ] Images optimized and lazy-loaded
- [ ] Fonts preloaded with `display: swap`
- [ ] Critical CSS inlined

### Responsive Quality
- [ ] Works at 320px, 768px, 1024px, 1440px, 1920px
- [ ] No horizontal scroll on any viewport
- [ ] Touch interactions work on mobile
- [ ] Typography scales smoothly with clamp()
- [ ] Navigation adapts to mobile (hamburger or bottom nav)
- [ ] Gallery layout adjusts columns by viewport

## Anti-Patterns — NEVER Do These

1. **Purple gradient on white** — The universal "AI made this" tell
2. **Inter/Roboto as display font** — Generic, forgettable
3. **Uniform card grids** — Monotonous, template-feeling
4. **Emoji as icons** — Unprofessional
5. **Centered everything** — No visual rhythm or flow
6. **Too many colors** — Rainbow = chaos
7. **Animation on every element** — Overwhelming, slow
8. **Stock photo aesthetic** — Flat, soulless
9. **Visible placeholder content** — "Lorem ipsum" = unfinished
10. **Inconsistent spacing** — Magic numbers = amateur

## Implementation Workflow

1. **Design tokens first** — Create `variables.css` with full token system
2. **Layout shell** — Navigation + Footer + Section containers
3. **Hero section** — The first impression, perfect it
4. **Core animations** — Set up GSAP + ScrollTrigger toolkit
5. **Section by section** — Build each section with animations
6. **Interactive elements** — Gallery, timeline, story viewer
7. **Responsive pass** — Every breakpoint, every section
8. **Performance audit** — Lighthouse, bundle analysis
9. **Verification** — Run through full quality checklist
10. **Polish** — The final 20% that makes it premium

## References

This skill synthesizes patterns from:
- `frontend-design` — Bold aesthetic direction, no generic AI aesthetics
- `ui-ux-pro-max` — Design intelligence database, pre-delivery checklist
- `web-design-guidelines` — Vercel web interface compliance
- `react-best-practices` — 64 performance rules across 8 categories
- `canvas-design` — Visual philosophy creation, expert craftsmanship
- `web-artifacts-builder` — Modern React + TypeScript architecture
- `composition-patterns` — Compound components, scalable APIs
- `context-optimization` — Efficient development, minimal waste
- `verification-before-completion` — Evidence before claims, always
- `project-development` — Pipeline architecture, iterative development
- `systematic-debugging` — Root cause investigation before fixes
