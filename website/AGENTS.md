
# Agent Instructions: Build Nyxel Technologies Website

You are an expert front‑end developer. Your task is to generate a **complete, production‑ready React + Vite** project for **Nyxel Technologies** – a single‑page marketing website. Follow every specification below exactly.

---

## 1. Project Overview

**Nyxel Technologies** is an independent engineering and design studio. The site must be:

- A single page with smooth scrolling (Lenis)
- Fully responsive (adaptive rem grid)
- Animations powered by GSAP (entrance reveals, hovers, carousel, count‑up)
- Hero background: liquid‑cursor‑reveal (three.js or 2D Canvas) with two images
- Full‑screen loader, full‑screen nav menu, and a request modal (stubbed submit)
- Light palette with dark accents (colours specified below)

---

## 2. Brand Identity

| Property | Value |
|----------|-------|
| Company | Nyxel Technologies |
| Tagline | "Engineering tomorrow, today." |
| Hero heading (3 lines) | "Build smarter," / "ship faster," / "engineer the future." |
| About statement | "We partner with visionary teams to ship **reliable software, intelligent systems, and the architecture that powers them.**" |
| Footer tagline | "An independent engineering studio crafting systems, products, and the strategies that connect them." |
| Watermark | `NYXEL` (all caps, 13rem) |
| Logo | 4‑point spark SVG (provided in `Icons.jsx`) |
| Theme colour | `#021334` |

---

## 3. Colour Palette (exact hex values)

| Role | Hex |
|------|-----|
| Background (page) | `#ffffff` |
| Foreground (text) | `#021334` |
| Ink (dark surfaces) | `#021334` |
| Muted text | `#977086` |
| Subtle borders | `#A5C5CC` |
| Surface fills | `#f1f0ee` |
| Surface‑2 | `#e3e2df` |
| Accent (primary) | `#012A61` |
| Accent light | `#275A91` |
| Accent highlight | `#FDC787` |
| Hero background | linear‑gradient from `#A5C5CC` to `#275A91` |
| Loader background | `#021334` |
| Loader progress fill | `#FDC787` |

Radii: pill `9999px`, card `2rem`, card‑sm `1.25rem`, control `.875rem`.  
Shell max‑width: `88rem` with `margin-inline: auto`.

---

## 4. Tech Stack

- React 18+ (functional components, hooks)
- Vite
- Tailwind CSS (with adaptive rem grid)
- Lenis (`lenis@1.3.23`)
- GSAP (`gsap`)
- three.js (`three`) – optional; use 2D Canvas if preferred

---

## 5. Project Structure (generate all these files)

```
src/
├── components/
│   ├── common/
│   │   ├── PillButton.jsx
│   │   ├── Eyebrow.jsx
│   │   ├── TagChip.jsx
│   │   ├── AnimatedLink.jsx
│   │   ├── LogoMark.jsx
│   │   └── Icons.jsx
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── NavMenu.jsx
│   │   └── RequestModal.jsx
│   ├── sections/
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── LiquidReveal.jsx
│   │   ├── About.jsx
│   │   ├── CreateBand.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Services.jsx
│   │   └── Stats.jsx
│   └── PageLoader.jsx
├── hooks/
│   ├── useLenis.js
│   ├── useScrollLock.js
│   ├── useReveal.js
│   ├── useCountUp.js
│   ├── useClock.js
│   └── useGSAP.js
├── utils/
│   ├── constants.js
│   ├── gsapHelpers.js
│   └── adaptiveGrid.js
├── App.jsx
├── main.jsx
└── index.css
```

Also produce: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `.env.example`, `README.md`.

---

## 6. Content (copy exactly)

| Section | Content |
|---------|---------|
| **PageLoader** | LogoMark + "Nyxel Technologies"<br>Tagline: "Building the future, one system at a time." |
| **Header** | LogoMark + "Nyxel" (left); nav links: Home, Work, Services, Studio, Careers, Contact; clock chip + Menu button (right). |
| **Hero** | Eyebrow: "Engineering Studio"<br>H1: "Build smarter, ship faster, engineer the future."<br>Rating: "150+ products shipped" (5 stars)<br>CTAs: "Let's Talk" (dark) & "View Work" (outline)<br>Carousel items: 3 items (Full‑stack development – End‑to‑end solutions; Cloud architecture – Scalable infrastructure; Product design – Human‑centric interfaces).<br>Partners: Apex, Titan, Crest, Nova, Vanguard, Fortis, Zenith<br>Status bar: "Working since 2019" / "Remote‑first, worldwide" / "Scroll to explore" |
| **About** | Eyebrow: "The Studio"; text: "A distributed team of engineers and designers building across every time zone."<br>Statement: "We partner with visionary teams to ship reliable software, intelligent systems, and the architecture that powers them." (word reveal)<br>Social chips: X, GitHub, LinkedIn<br>Button: "About Us" (outline) |
| **CreateBand** | 4 tiles: "We" (light), "Build" (accent gradient), "→" (dark), "Better" (ghost). |
| **Portfolio** | Eyebrow "Portfolio" (with border), H2 "Selected Work".<br>4 cards: Astra Platform – Engineering – 2025 – "A modular microservices platform..." – tags: Backend, Cloud, DevOps; Nova Finance – Product – 2024 – "A fintech dashboard..." – tags: Full‑stack, Security, UI/UX; Helio Studio – Design – 2023 – "A design system..." – tags: Design System, React, Storybook; Pulse Health – Mobile – 2023 – "A telehealth app..." – tags: Mobile, AI, HIPAA. |
| **Services** | Eyebrow "Services", H2 "What we do best".<br>Rows: 01 Software Engineering – "Scalable, secure, and maintainable code for web and mobile."; 02 Product Design – "User‑centered interfaces that drive engagement."; 03 Cloud & DevOps – "Automated pipelines, infrastructure as code, and monitoring."; 04 Strategy & Consulting – "Technical roadmaps, team coaching, and architecture reviews." |
| **Stats** | Eyebrow "By the numbers" (light), H2 "Proof in the work, not the words."<br>Stats: 200+ "Projects delivered", 99% "Uptime guaranteed", 15 "Years of craft", 50+ "Team members". |
| **Footer** | CTA H2: "Have a project in mind? Let's engineer it together." + "Start a project" button.<br>Columns: Brand col (tagline), Company (About, Careers, Partners, Contact), Services (Engineering, Design, Cloud, Consulting), Social (X, GitHub, LinkedIn, YouTube).<br>Legal: "© 2025 Nyxel Technologies. All rights reserved." + Privacy, Terms.<br>Watermark: "NYXEL" (13rem, opacity 0.05). |
| **NavMenu** | Links: Home, Work, Services, Studio, Careers, Contact (each with index 0‑5). Bottom: "Local time — <live time>" + "Start a project →". |
| **RequestModal** | Title "Start a project" / "Tell us what you're building."<br>Form: Name, Email, Project (textarea).<br>Submit → "Sending…" → success "Request received" with "Close" button. |

---

## 7. Asset Management

- All asset URLs use `import.meta.env.VITE_ASSET_BASE_URL`.
- Hero images: `after.jpg` (always visible) and `before.jpg` (revealed under cursor) – placed in `/hero/` subfolder.
- Provide `.env.example` with `VITE_ASSET_BASE_URL=https://your-bucket-url/nyxel-assets`.

---

## 8. Responsive Adaptive Grid

**Media queries (in `index.css`):**
```css
@media (max-width: 1920px) { html { font-size: 0.833333vw; } }
@media (max-width: 1440px) { html { font-size: 1.111111vw; } }
@media (max-width: 1024px) { html { font-size: 1.5625vw; } }
@media (max-width: 640px)  { html { font-size: 4.444444vw; } }
```

**Scale‑up above 1920px** – in `App.jsx`:
```js
const FONT_BASE = 16, baseWidth = 1920, coef = 0.6666;
const w = window.innerWidth;
const widthReduction = ((baseWidth - w) / baseWidth) * 100;
const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;
if (size > FONT_BASE) document.documentElement.style.fontSize = size + 'px';
else document.documentElement.style.removeProperty('font-size');
```
Add resize listener. All sizes in `rem`.

---

## 9. Animation & Interaction Mechanics

### Loader
- Count 0→100 over 1300ms (easeInOutCubic). Update progress bar and counter (zero‑padded).
- Exit: slide up (translateY 0% → -100%) with spring‑like easing; content fades out. After exit, set `ready = true`, unlock scroll, remove loader.

### Liquid‑Reveal (Hero)
- Parameters: `brushRadius = 143`, `decay = 0.016`, `dpr = min(devicePixelRatio, 2)`.
- Offscreen canvas with `after.jpg` (object‑fit:cover). Main canvas erases with `destination-out` to reveal `before.jpg`.
- Pointer trail: interpolate points (step = max(radius*0.3,1), max 60 interp points). Brush uses radial gradient: stops at 0→1, 0.55→0.82, 1→0.
- Idle reset after 120 frames. Respect `prefers-reduced-motion`.

### Entrance Reveals (GSAP)
- **Line‑by‑line**: each line wrapped with `overflow:hidden`; inner span `y:100%` → `y:0`, `opacity:0→1`, duration 0.9s, easeOutCubic, stagger 0.12s (hero) or 0.1s (footer).
- **Word‑by‑word** (About): each word `y:24` → `y:0`, `opacity:0→1`, duration 0.7s, easeOutQuart, stagger 0.035s.
- **Element reveals**: `y:28/48/24/20` → `0`, opacity 0→1, with staggers per index (e.g., 120ms, 90ms, 80ms, 90ms). All triggered by IntersectionObserver (`once:true`) and gated on `ready` for hero.

### Hover Effects (GSAP)
- Use tweens on `mouseenter`/`mouseleave` with `ease: "back.out(1.7)"` or `"power2.out"`, duration ~0.35s.
- Specifics: brand/pills scale 1→1.04; nav links y -2px & opacity .8→1; social icons scale 1→1.18; partners y -2px & opacity .7→1; create tiles scale 1→1.03; portfolio cards y -8px & scale 1→1.012; services rows fill background & padding‑left expand; arrow translates 5px.
- Disable on touch devices.

### Carousel
- 3 items; next/prev wraps around. Swap: outgoing slides `y:±14` & fades, incoming slides from `y:∓14` to 0 & fades – duration 0.3s, spring‑like ease.

### Stats Count‑Up
- Scroll‑triggered between `top bottom` and `center center`. Update `Math.round(progress * target)`.

### NavMenu Stagger
- Each link: `y:1rem, opacity:0` → `y:0, opacity:1` with delay `index*45 + 80`ms, duration 0.5s.

### RequestModal
- Backdrop fades; panel slides from `translateY(28px)` to `translateY(0)` on enter, to `translateY(18px)` on exit – duration 0.26s, spring‑like ease.

---

## 10. Scroll & Locks

- Lenis with `{ smoothWheel: true }`.
- `stopScroll()`: `lenis.stop()` + set `html { position:relative; overflow:hidden; height:100% }`.
- `startScroll()`: `lenis.start()` + remove styles.
- `scrollTo(id)`: temporary disable, call `lenis.scrollTo` (or `window.scrollTo`), re‑enable after 100ms.
- Loader, NavMenu, RequestModal lock scroll when open, release on close.

---

## 11. Accessibility & Quality

- Skip link to `#main`.
- Semantic HTML (`section`, `article`, `nav`, `header`, `footer`).
- `aria` attributes on modals (`role="dialog"`, `aria-modal="true"`).
- `lang="en"` on `<html>`; meta description + Open Graph.
- Controlled forms with validation (required, email).
- Cleanup: GSAP contexts, three.js renderers, ResizeObservers, rAF.

---

## 12. Output Instructions

Generate **every file** listed in the project structure. Provide each file as a separate code block with its relative path as the title (e.g., `src/App.jsx`). Include `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `.env.example`, and `README.md`.

The final result must be a complete, runnable project. Do not omit any component or logic. Begin.
```

