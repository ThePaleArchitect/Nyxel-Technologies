AGENTS.md — Null Execution Collective (NXC ✦)

Version: 7.0 (Complete Production Specification)
Last Updated: 2026-06-29
Status: Ready for Implementation

---

1. PROJECT OVERVIEW

1.1 Mission

Build a stealth, faceless engineering studio website that converts leads through exclusivity, technical credibility, and tiered pricing—without ever revealing founder identities. The brand embodies "abnormal" design, merging four distinct visual styles into a cohesive, hacker-first aesthetic.

1.2 Core Architecture

Hybrid Web2/Web3:

Tier Auth Payment Storage Messaging
Personal ($50–$300) Email + OTP Stripe Static Email
Incubation ($500–$5,000) Email + OTP Stripe (default) / USDC Static Email
Scale ($18,000+) Wallet + SIWE USDC Escrow IPFS XMTP + Email

1.3 Brand DNA

· Personality: Mysterious, elite, secure, technical, minimalist, rebellious.
· Tone: Direct, confident, unapologetically anonymous, slightly cryptic.
· Vibe: Cyberpunk command center meets Swiss minimalism meets art gallery editorial.

1.4 Design Styles (Four-Way Fusion)

Style Application Key Characteristics
Neo-Brutalism CTAs, cards, pricing tables, borders Raw edges, thick borders, stark contrast, unpolished, bold colors
Minimalist Navigation, typography, spacing Clean lines, ample whitespace, functional, restrained
Dynamic Editorial Headlines, pull-quotes, Charter Oversized serif, asymmetrical grids, overlapping elements, expressive layout
Glassmorphism Modals, Vault session bar, header Frosted glass, backdrop blur, subtle depth, futuristic

---

2. GLOBAL STYLES & EFFECTS

2.1 Global Rules

· Default background: #0A0A0A (pure black) with subtle grain texture (CSS ::before overlay).
· No light mode. Dark mode is the only mode.
· Asymmetry is encouraged. Cards may be offset. Text may overlap images. Grids may break alignment.
· Glitch effects on hover and page load (CSS @keyframes glitch).
· Scanline overlay on hero section and Vault (CSS pseudo-element).
· Terminal cursor (▌) blinking at the end of the Hero sub-headline.

2.2 Texture & Effects Code

```css
/* Grain texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}

/* Scanline overlay (hero) */
.scanline::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
  pointer-events: none;
}

/* Glitch animation */
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-1px, 1px); }
  80% { transform: translate(1px, -1px); }
  100% { transform: translate(0); }
}
.glitch:hover {
  animation: glitch 0.3s ease-in-out;
}
```

2.3 Spacing & Layout System

Unit Value Usage
Base Unit 4px Grid foundation
Space (XS) 8px Tight spacing (icon → label)
Space (SM) 16px Input padding, card padding
Space (MD) 32px Section padding, gap between cards
Space (LG) 64px Major section breaks
Space (XL) 128px Hero padding, page tops
Max Width 1200px Container width
Border Radius 4px Sharp, minimal (neo-brutalist)
Border Radius (Glass) 12px Glassmorphism cards

2.4 Responsive Breakpoints

Breakpoint Device Nav Behavior Grid
≥ 1200px Desktop XL Full nav 4-column
1024–1199px Desktop Full nav 3-column
768–1023px Tablet Full nav (compact) 2-column
< 768px Mobile Hamburger menu 1-column

---

3. COLOR PALETTE

3.1 Color Palette

Role Hex Code Usage
Background (Primary) #0A0A0A Main page backgrounds
Background (Secondary) #121212 Cards, panels, modals
Background (Tertiary) #1A1A1A Inputs, hover states
Text (Primary) #EAEAEA Body text, headings
Text (Secondary) #888888 Metadata, placeholders
Accent (Cyan) #00F0FF Glassmorphism glow, links, interactive highlights
Accent (Neo-Orange) #FF4500 Primary CTAs, thick borders, neo-brutalist elements
Accent (Neo-Gold) #FFD700 Pull-quote highlights, accent blocks
Accent (Crimson) #FF1A1A Errors, Incident Response
Glass Base rgba(255,255,255,0.03) Glassmorphism backgrounds
Glass Border rgba(255,255,255,0.08) Glass borders
Border (Default) #2A2A2A Standard borders
Neo-Brutalist Border #FF4500 Thick (4px) borders on neo elements

3.2 Semantic CSS Variables

```css
:root {
  /* Backgrounds */
  --bg-primary: #0A0A0A;
  --bg-secondary: #121212;
  --bg-tertiary: #1A1A1A;
  --bg-glass: rgba(255, 255, 255, 0.03);
  --bg-input: #1A1A1A;

  /* Text */
  --text-primary: #EAEAEA;
  --text-secondary: #888888;
  --text-inverse: #0A0A0A;

  /* Accents */
  --accent-cyan: #00F0FF;
  --accent-orange: #FF4500;
  --accent-gold: #FFD700;
  --accent-crimson: #FF1A1A;

  /* Borders */
  --border-default: #2A2A2A;
  --border-glass: rgba(255, 255, 255, 0.08);
  --border-neo: #FF4500;

  /* Glass */
  --glass-backdrop: blur(12px);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #0A0A0A 0%, #1A0A0A 50%, #0A0A0A 100%);
}
```

3.3 Color Usage Rules

Element Background Text Border
Page #0A0A0A #EAEAEA —
Cards #121212 #EAEAEA #2A2A2A
Glass Cards rgba(255,255,255,0.03) #EAEAEA rgba(255,255,255,0.08)
Neo Cards #121212 #EAEAEA 4px solid #FF4500
Buttons (Primary) #FF4500 #0A0A0A 4px solid #FF4500
Buttons (Ghost) Transparent #00F0FF 1px solid #00F0FF
Inputs #1A1A1A #EAEAEA #2A2A2A
Modals rgba(0,0,0,0.85) #EAEAEA 1px solid rgba(255,255,255,0.08)

---

4. TYPOGRAPHY & FONTS

4.1 Font Stack (Next.js 15 Native)

We use Next.js built-in next/font/google for optimized, self-hosted fonts. No CSS @import or @font-face rules are needed.

In src/app/layout.tsx:

```tsx
import { Playfair_Display, JetBrains_Mono } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

4.2 Tailwind Configuration

tailwind.config.js:

```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
};
```

4.3 Typographic Hierarchy

Role Font Weight Size Letter Spacing
H1 (Hero) Serif (Playfair) 700 clamp(4rem, 12vw, 8rem) -0.02em
H2–H4 Serif 600 clamp(2.5rem, 5vw, 4rem) -0.01em
Pull-quotes Serif (italic) 700 clamp(2rem, 4vw, 3.5rem) -0.01em
Body Text Monospace (JetBrains) 400 1rem 0
Meta / Micro Monospace 400 0.75rem 0.02em
Buttons / CTAs Monospace 600 0.9rem 0.05em
Code / Terminal Monospace 400 0.85rem 0
Labels / Inputs Monospace 400 0.9rem 0
Nav Links Monospace 500 0.85rem 0.04em

4.4 Usage Examples

```tsx
// Hero
<h1 className="font-serif text-[clamp(4rem,12vw,8rem)] font-bold leading-[1.05] tracking-[-0.02em]">
  Build in stealth.
</h1>

// Sub-headline
<p className="font-mono text-[1rem] text-[#888888] max-w-2xl">
  We are the faceless engineering collective...
</p>

// Section Header
<h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.01em]">
  The Charter
</h2>

// Pull-quote
<blockquote className="font-serif italic font-bold text-[clamp(2rem,4vw,3.5rem)] text-[#FFD700] tracking-[-0.01em]">
  "Your IP is yours—exclusively."
</blockquote>

// Body
<p className="font-mono text-[1rem] text-[#EAEAEA] leading-[1.6]">
  We retain nothing. We fork nothing.
</p>
```

---

5. COMPONENT LIBRARY

5.1 Icon Library

We use Lucide React icons via shadcn/ui.

Installation:

```bash
npm install lucide-react
```

All icons are imported from lucide-react:

```tsx
import {
  Lock, ArrowRight, Shield, Zap, Globe, Mail, Wallet, Github, Twitter, Linkedin,
  Clock, X, Menu, Send, Copy, AlertTriangle, FileText, Calculator, Cpu, Cloud,
  Layout, BarChart, Check, ArrowLeft, Terminal, User, Briefcase, Calendar
} from 'lucide-react';
```

Icon Usage Map:

Icon Import Name Usage
Vault/Lock Lock Primary CTA, Vault access
Arrow Right ArrowRight Secondary CTAs, links
Shield Shield Trust badges, Charter
Zap Zap Speed/performance highlights
Globe Globe 3D globe decoration, Network
Mail Mail Channel/email forms
Wallet Wallet Web3 wallet connect
Github Github Footer social link
Twitter/X Twitter Footer social link
Linkedin Linkedin Footer social link
Check Check Guarantees, feature lists
Alert Triangle AlertTriangle Incident Response
X (Close) X Modal close
Menu Menu Mobile hamburger
Terminal Terminal Code/terminal sections
Clock Clock Session timer
Copy Copy PGP key copy
Send Send Form submission
FileText FileText Docs/legal pages
Calculator Calculator "Calculate My Build"
Cpu Cpu Core Engine pillar
Cloud Cloud Mission Control pillar
Layout Layout Interface pillar
BarChart BarChart StratOps pillar

5.2 Button Variants

```tsx
// Neo-Brutalist Primary CTA
<Button variant="neo">
  <Lock className="w-4 h-4 mr-2" />
  Request Vault Access
</Button>
// Styles: bg-#FF4500, text-#0A0A0A, border-4 border-#FF4500, rounded-none, font-mono, font-semibold, -rotate-0.5deg (subtle tilt)

// Ghost (Cyan)
<Button variant="ghost">
  View Details
  <ArrowRight className="w-4 h-4 ml-2" />
</Button>
// Styles: transparent, text-#00F0FF, border border-#00F0FF, rounded-none

// Glass
<Button variant="glass">
  <Mail className="w-4 h-4 mr-2" />
  Open Secure Channel
</Button>
// Styles: bg-white/5, backdrop-blur, border border-white/10, text-white

// Danger (Crimson)
<Button variant="danger">
  <AlertTriangle className="w-4 h-4 mr-2" />
  Incident Response
</Button>
// Styles: bg-#FF1A1A, text-white, rounded-none
```

5.3 Card Variants

```tsx
// Standard Card
<Card>
  // bg-#121212, border border-#2A2A2A, p-6, rounded-none
</Card>

// Glass Card
<Card variant="glass">
  // bg-white/5, backdrop-blur, border border-white/10, p-6, rounded-2xl
</Card>

// Neo Card
<Card variant="neo">
  // bg-#121212, border-4 border-#FF4500, p-6, rounded-none, shadow-none
</Card>

// Editorial Card (asymmetric offset)
<Card variant="editorial">
  // bg-#121212, border border-#2A2A2A, p-8, transform rotate-1 (slight tilt)
</Card>
```

5.4 Input Styles

```tsx
<input
  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-none px-4 py-3 font-mono text-[#EAEAEA] placeholder:text-[#666666] focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/20 transition-colors"
  placeholder="your@email.com"
/>
```

5.5 Navigation

```tsx
<nav className="sticky top-0 z-50 bg-black/85 backdrop-blur-[12px] border-b border-white/5 px-6 py-4">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <div className="font-mono text-[#00F0FF] text-xl font-bold tracking-tight">
      NXC ✦
    </div>
    <div className="hidden md:flex gap-8 font-mono text-sm text-[#888888]">
      <a href="/charter" className="hover:text-[#EAEAEA] transition-colors">Charter</a>
      <a href="/network" className="hover:text-[#EAEAEA] transition-colors">Network</a>
      <a href="/capabilities" className="hover:text-[#EAEAEA] transition-colors">Capabilities</a>
      <a href="/vault" className="hover:text-[#EAEAEA] transition-colors">Vault</a>
      <a href="/channel" className="hover:text-[#EAEAEA] transition-colors">Channel</a>
    </div>
    <Button variant="ghost" size="sm">
      <Lock className="w-4 h-4 mr-1" />
      Vault Access
    </Button>
  </div>
</nav>
```

5.6 Footer

```tsx
<footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] py-12 px-6 font-mono text-[#888888] text-sm">
  <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
    <div>
      <div className="text-[#00F0FF] font-bold mb-2">NXC ✦</div>
      <p className="text-xs">© 2026 · Anonymous Engineering Collective</p>
    </div>
    <div>
      <div className="font-bold text-[#EAEAEA] mb-2">Pages</div>
      <ul className="space-y-1 text-xs">
        <li><a href="/charter" className="hover:text-[#EAEAEA]">Charter</a></li>
        <li><a href="/network" className="hover:text-[#EAEAEA]">Network</a></li>
        <li><a href="/capabilities" className="hover:text-[#EAEAEA]">Capabilities</a></li>
        <li><a href="/vault" className="hover:text-[#EAEAEA]">Vault</a></li>
        <li><a href="/channel" className="hover:text-[#EAEAEA]">Channel</a></li>
      </ul>
    </div>
    <div>
      <div className="font-bold text-[#EAEAEA] mb-2">Docs</div>
      <ul className="space-y-1 text-xs">
        <li><a href="/docs/how-we-bill" className="hover:text-[#EAEAEA]">How We Bill</a></li>
        <li><a href="/privacy" className="hover:text-[#EAEAEA]">Privacy</a></li>
        <li><a href="/terms" className="hover:text-[#EAEAEA]">Terms</a></li>
      </ul>
    </div>
    <div>
      <div className="font-bold text-[#EAEAEA] mb-2">Connect</div>
      <ul className="space-y-1 text-xs flex gap-4">
        <li><a href="#" className="hover:text-[#EAEAEA]"><Github className="w-4 h-4" /></a></li>
        <li><a href="#" className="hover:text-[#EAEAEA]"><Twitter className="w-4 h-4" /></a></li>
        <li><a href="#" className="hover:text-[#EAEAEA]"><Linkedin className="w-4 h-4" /></a></li>
      </ul>
    </div>
  </div>
  <div className="mt-8 pt-8 border-t border-[#2A2A2A] text-center text-xs text-[#666666]">
    <p>Built in stealth. Deployed in scale. Null Execution Collective.</p>
    <p className="mt-1">
      Null Execution Collective (formerly Nyxel Technologies). Read our{' '}
      <Link href="/docs/brand-transition" className="text-[#00F0FF] hover:underline">
        Brand Transition & Domain Notice
      </Link>.
    </p>
  </div>
</footer>
```

---

6. SITEMAP & PAGE SPECIFICATIONS

6.1 Complete Sitemap

```
nyxeltechnologies.com/
│
├── /                            → Homepage
├── /charter                     → The Charter (6 Principles + EAS Attestation)
├── /network                     → The Network (Roster + Assembly Logic)
├── /capabilities                → Capabilities (4 Pillars + 3 Tracks Overview)
├── /docs/
│   └── /how-we-bill             → How We Bill (Pricing Matrix + Add-ons + Examples)
├── /vault                       → Vault (Public Teaser + Auth Selection)
├── /vault/dashboard             → Vault Unlocked (5 Projects + Blueprints)
├── /verify                      → OTP Verification (Web2)
├── /wallet                      → Wallet Callback (Web3)
├── /channel                     → Secure Channel (Web2 Form + Web3 XMTP)
├── /privacy                     → Privacy Policy
├── /terms                       → Terms of Service
├── /cookies                     → Cookie Policy
├── /refund                      → Refund Policy
├── /dmca                        → DMCA / Copyright Notice
├── /gdpr                        → GDPR Data Deletion Request
├── /404                         → Custom 404 (Terminal Style)
└── /sitemap.xml                 → Auto-generated
```

6.2 Homepage (/)

Hero Section:

· Visual: Full viewport. Dark background with animated dot grid (Three.js). Scanline overlay. Glitch effect on load.
· Headline (H1): "Build in stealth. Deploy at scale." (Serif, oversized)
· Sub-headline: "We are the faceless engineering collective that designs, builds, and secures the architecture for funded startups, enterprises, and solo builders—without ever leaving a public trace. No bylines. No blog posts. No noise." (Monospace)
· Terminal Cursor: Blinking ▌ after sub-headline (implemented via <span className="animate-pulse">▌</span>)
· Trust Badge: "48hr architecture audit · 100% IP indemnified · 99.99% uptime guarantee"
· Primary CTA: Neo-brutalist orange button with <Lock /> icon

4 Pillars Teaser (2x2 grid):

· Core Engine (<Cpu /> icon) — Backend & API. Go, Rust, Node.js.
· Mission Control (<Cloud /> icon) — Cloud & DevOps. K8s, Terraform.
· Interface (<Layout /> icon) — Product Design & Frontend. React, Next.js.
· StratOps (<BarChart /> icon) — Strategy & Technical Audit.

Vault Teaser:

· Headline: "CLASSIFIED DEPLOYMENTS" (Monospace, cyan)
· Metrics: "5 Deployments · 100% Uptime Record · 42M Daily Requests Handled"
· Visual: Animated 3D wireframe globe (Three.js) with glowing nodes.
· CTA: <ArrowRight /> Enter the Vault →

Tracks Comparison (Neo-brutalist 3-column grid):

Personal Incubation Scale
Solo builders Bootstrapped founders Funded startups
$50–$300 $500–$5,000 $18,000+
3–7 days 8–12 days Rolling cycles
<ArrowRight /> View Plans <ArrowRight /> View Sprints <ArrowRight /> View Retainers

Charter Pull-quote:

"Your IP is yours—exclusively. We retain nothing. We fork nothing. We sign your NDA before we even see your repository." (Serif, gold, italic)
— From The Charter, Principle I (Monospace, small)

Network Tease (Marquee):

Architect Ω · Distributed Δ · Interface Γ · Cloud Ψ · Data Σ · Mobile Ξ

Final Conversion Zone:

Ready to move in silence?
<Lock /> Request Vault Access · <Shield /> Read The Charter · <Mail /> Open Secure Channel · <Calculator /> Calculate My Build

---

6.3 Charter (/charter)

Page Title: The Charter (Serif)
Sub-headline: The immutable principles that govern every engagement. (Monospace)

6 Principles (Editorial/Neo grid):

· Each principle is a card with neo-brutalist left border (4px gold).
· Roman numeral (gold, serif).
· Title (serif).
· Description (monospace).

EAS Attestation Link:

"These principles are immutably attested on-chain." (Link to EAS Explorer)

Closing: If these principles resonate, your infrastructure is ready for us.

---

6.4 Network (/network)

Page Title: The Network (Serif)
Sub-headline: A distributed collective of senior engineers, architects, and designers.

Roster Grid (3 columns, glass cards):

Handle Role Experience Core Stack Timezone
Architect Ω Lead Systems Architect 16 yrs Rust, Go, K8s, CockroachDB UTC -5
Distributed Δ Senior Backend Engineer 12 yrs Node.js, Python, Kafka, Redis UTC +1
Interface Γ Principal Frontend Engineer 10 yrs React, Next.js, Framer, Tailwind UTC -8
Cloud Ψ DevOps / SRE Lead 14 yrs Terraform, AWS/GCP, Prometheus UTC +3
Data Σ Data / ML Engineer 9 yrs PostgreSQL, Snowflake, dbt, Python UTC +5:30
Mobile Ξ Mobile Architect 11 yrs Swift, Kotlin, React Native UTC +10

Assembly Logic:

No single engineer touches your entire stack. We assemble a custom squad for every project.

Trust Block:

Every member has passed a 5-stage technical interview and contributed to at least 3 production-grade open-source projects.

CTA: <Mail /> Secure Channel

---

6.5 Capabilities (/capabilities)

Page Title: Capabilities (Serif)
Sub-headline: Four engineering pillars. Three investment tracks. Two authentication models.

3 Tracks Overview (Neo cards):

Personal Incubation Scale
$50–$300 $500–$5,000 $18,000+
Web2 (Email) Web2 (Email) Web3 (Wallet)
Stripe Stripe / USDC USDC Escrow
<ArrowRight /> View Details <ArrowRight /> View Details <ArrowRight /> View Details

Auth Model Comparison:

Feature Web2 Web3
Login Email + OTP Wallet + SIWE
Payment Stripe USDC Escrow
Storage Static IPFS
Receipt Invoice On-chain tx

CTA: <FileText /> Read the full billing guide (links to /docs/how-we-bill)

---

6.6 Docs: How We Bill (/docs/how-we-bill)

Page Title: How We Bill (Serif)
Sub-headline: Fixed‑scope, flat‑rate pricing based on stack complexity, page count, and motion level.

Sections:

1. The Three Variables (Stack Complexity, Page Count, Motion Level)
2. Personal Track (Web2) — Plans + Add-ons
3. Incubation Track (Web2) — Plans + Add-ons + Example Quote
4. Scale Track (Web3) — Plans
5. Web2 vs Web3 Auth Comparison (Detailed table)
6. Unified Guarantees (NDA, revisions, IP, payment terms)

Footer: <ArrowLeft /> Back to Capabilities

---

6.7 Vault Public Teaser (/vault)

Page Title: Vault (Serif)
Sub-headline: Classified Deployments (Monospace, cyan)

Visual: 3D wireframe globe (Three.js) with blurred node labels.

Metrics: "5 Deployments · 100% Uptime Record · 42M Daily Requests Handled"

Auth Selection Tabs:

· Web2 (Email) — Personal/Incubation track
· Web3 (Wallet) — Scale track

Web2 Form:

· Full Name (text)
· Corporate Email (text) — Rejects Gmail for non-Personal
· Company Name (text)
· Your Role (dropdown)
· Technical Challenge (textarea, optional)
· Checkbox: "I confirm I have authority..."
· Submit: <Lock /> Request Vault Access (Neo)

Web3 Form:

· <Wallet /> Connect Wallet (RainbowKit button)
· "Sign message to verify identity"
· Post-sign: <Lock /> Enter Vault →

---

6.8 Vault Unlocked (/vault/dashboard)

Status Bar:

· VAULT UNLOCKED (Cyan)
· <Clock /> 23:47:32 remaining (Countdown)
· Verified: corporate@domain.com
· <X /> Destroy Session

5 Project Cards (Glass + Neo hybrid):
Each card contains:

· Codename (Serif, large)
· Industry (Monospace)
· Tech Stack (Monospace, cyan tags)
· Scale (Monospace)
· Problem → Solution → Result (Monospace)
· <ArrowRight /> View Architecture Blueprint

Blueprint Modal (Glass):

· Full-screen overlay.
· Interactive SVG diagram.
· Technical labels only.
· Watermark: "ANONYMIZED FOR CONFIDENTIALITY"
· Close: <X /> Close Blueprint (Neo)

Conversion Footer:

Trust the architecture? Let's talk about yours.
<Mail /> Open Secure Channel →

---

6.9 Secure Channel (/channel)

Page Title: Channel (Serif)
Sub-headline: Secure, direct, and obligation-free. We reply within 24 hours.

Web2 Form:

1. Full Name (text)
2. Corporate Email (text) — Conditional validation
3. Company / Project Name (text)
4. Your Role (dropdown)
5. Engagement Tier (radio): Personal / Incubation / Scale / Incident Response
6. Technical Brief (textarea, 500 char max)
7. Referral Code (optional)
8. NDA Readiness (checkbox, required)
9. Submit: <Send /> Send Encrypted Inquiry (Neo)

Web3 Alternative (XMTP):

· <Wallet /> Connect Wallet to message us privately via XMTP.
· Opens XMTP chat with nxc.eth

PGP Alternative:

· "Prefer encrypted email? Copy our PGP key below."
· Display PGP block with <Copy /> button.
· Email: relay@nyxeltechnologies.com

SLA Table:

Tier Response Time Who Replies
Personal 24–48 hrs Senior Frontend Engineer
Incubation 12–24 hrs Lead Architect
Scale 4–12 hrs Lead Architect + CTO Advisor
Incident ≤2 hrs On-call Engineering Lead

---

6.10 404 Page (/404)

Terminal-Style Error:

```
$ whoami
> Unknown

$ pwd
> /nullexecution/404

$ cat page_not_found.md
> 404 — Classified information not found.
> Either the page was redacted, or you took a wrong turn.

$ exit
> <ArrowRight /> Return to Vault
```

---

7. UX FLOWS

7.1 Web2 Flow (Personal / Incubation)

1. User lands on Homepage → Clicks Capabilities
2. Selects Personal or Incubation track
3. Navigates to /vault → Selects Web2 tab
4. Fills form → Submits
5. Email OTP sent → User enters OTP on /verify
6. Valid OTP → Redirects to /vault/dashboard
7. Views blueprints → Clicks "Open Secure Channel"
8. Submits Channel form → Lead Architect replies
9. Stripe invoice sent → Payment → Work begins

7.2 Web3 Flow (Scale)

1. User lands on Homepage → Clicks Capabilities
2. Selects Scale track
3. Navigates to /vault → Selects Web3 tab
4. Connects wallet → Signs SIWE message
5. Valid signature → Redirects to /vault/dashboard
6. Views blueprints from IPFS → Opens XMTP chat
7. Chat with nxc.eth → Receives Escrow address
8. Deposits USDC → Milestones released → Work continues

7.3 Incident Response Flow

1. User navigates to /channel
2. Selects Incident Response tier
3. Fills brief → Submits
4. Slack alert → On-call engineer responds ≤2hrs
5. Triage + stabilization → RCA + hotfix → Invoice sent

---

8. TECH STACK (COMPLETE)

8.1 Core Framework

Layer Technology Version Purpose
Frontend Framework Next.js 15.0.0 App Router, SSR/SSG, API routes
UI Library React 18.3.0 Component rendering
Language TypeScript 5.5.0 Type safety
Styling Tailwind CSS 3.4.0 Utility-first CSS
Animation Framer Motion 11.0.0 Scroll animations, transitions
3D Graphics Three.js 0.164.0 3D rendering
React Three Fiber @react-three/fiber 8.17.0 React wrapper for Three.js
React Three Drei @react-three/drei 9.110.0 Three.js helpers
Icons Lucide React (via shadcn/ui) 0.400.0 Icon library
Form Validation Zod 3.23.0 Schema validation
Logging Pino 8.0.0 Structured logging

8.2 Web2 Stack

Layer Technology Version Purpose
Auth (OTP) Upstash Redis 1.34.0 OTP storage, rate limiting
Email Resend 3.0.0 OTP delivery
Email Templates React Email 2.1.0 Branded OTP emails
Payments Stripe SDK 16.0.0 Manual invoice generation

8.3 Web3 Stack

Layer Technology Version Purpose
Wallet Connection RainbowKit 2.0.0 WalletConnect UI
Ethereum Library wagmi 2.12.0 React hooks for Ethereum
Ethereum Core viem 2.21.0 SIWE, contract interactions
Ethereum Utils ethers 6.13.0 Contract ABI parsing
Blockchain Base / Arbitrum — Smart contract deployment
Storage IPFS (Pinata SDK) 2.1.0 Blueprint storage
Messaging XMTP 7.0.0 Wallet-to-wallet chat
Attestation EAS SDK Latest On-chain Charter principles
Contract Framework Hardhat 2.22.0 Smart contract development
ERC-20 Interface @openzeppelin/contracts 5.0.0 IERC20 for USDC

8.4 Infrastructure

Layer Technology Version Purpose
Hosting Vercel Latest Next.js deployment
Database Upstash Redis Latest OTP storage, rate limiting
CDN Vercel Edge Network — Global caching
Monitoring Vercel Analytics — Anonymous aggregated stats
Error Tracking Sentry Latest Production error tracking
Uptime Monitoring UptimeRobot — 99.99% SLA monitoring

8.5 Complete Dependencies

```json
{
  "dependencies": {
    "next": "15.0.0",
    "react": "18.3.0",
    "react-dom": "18.3.0",
    "typescript": "5.5.0",
    "tailwindcss": "3.4.0",
    "framer-motion": "11.0.0",
    "@react-three/fiber": "8.17.0",
    "@react-three/drei": "9.110.0",
    "three": "0.164.0",
    "lucide-react": "0.400.0",
    "zod": "3.23.0",
    "resend": "3.0.0",
    "react-email": "2.1.0",
    "redis": "4.6.0",
    "@upstash/redis": "1.34.0",
    "wagmi": "2.12.0",
    "viem": "2.21.0",
    "@rainbow-me/rainbowkit": "2.0.0",
    "@walletconnect/web3wallet": "1.12.0",
    "ethers": "6.13.0",
    "xmtp": "7.0.0",
    "@pinata/sdk": "2.1.0",
    "@ethersproject/contracts": "5.7.0",
    "stripe": "16.0.0",
    "pino": "8.0.0",
    "pino-pretty": "10.0.0",
    "@vercel/analytics": "1.3.0",
    "@vercel/speed-insights": "1.0.0",
    "@sentry/nextjs": "8.0.0",
    "@openzeppelin/contracts": "5.0.0"
  },
  "devDependencies": {
    "hardhat": "2.22.0",
    "@nomicfoundation/hardhat-toolbox": "4.0.0",
    "@types/node": "20.14.0",
    "@types/react": "18.3.0",
    "@types/react-dom": "18.3.0",
    "eslint": "8.57.0",
    "eslint-config-next": "15.0.0",
    "prettier": "3.3.0",
    "@next/bundle-analyzer": "15.0.0",
    "jest": "29.7.0",
    "@testing-library/react": "16.0.0",
    "@testing-library/jest-dom": "6.4.0",
    "playwright": "1.44.0",
    "dotenv": "16.4.0"
  }
}
```

---

9. PROJECT STRUCTURE

```text
nyxeltechnologies.com/
│
├── .env.local                         # Environment variables
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── next.config.mjs
├── middleware.ts                      # Security headers, session validation
├── hardhat.config.ts                  # Smart contract deployment
├── jest.config.js                     # Unit test config
├── playwright.config.ts               # E2E test config
│
├── contracts/                         # Smart contracts
│   ├── Escrow.sol                     # Milestone-based USDC escrow (ERC-20)
│   ├── PaymentSplitter.sol            # Multi-sig fund distribution
│   └── CharterAttestation.sol         # EAS attestation helper
│
├── scripts/
│   ├── deploy.js                      # Deploy contracts
│   ├── upload-ipfs.ts                 # Upload blueprints to IPFS
│   └── seed-redis.ts                  # Seed referral codes
│
└── src/
    ├── app/
    │   ├── (marketing)/                # Public pages
    │   │   ├── layout.tsx             # Header + Footer (font initialization)
    │   │   ├── page.tsx               # Homepage
    │   │   ├── charter/
    │   │   │   └── page.tsx
    │   │   ├── network/
    │   │   │   └── page.tsx
    │   │   ├── capabilities/
    │   │   │   └── page.tsx
    │   │   ├── docs/
    │   │   │   └── how-we-bill/
    │   │   │       └── page.tsx
    │   │   ├── vault/
    │   │   │   └── page.tsx           # Public teaser
    │   │   ├── channel/
    │   │   │   └── page.tsx
    │   │   ├── privacy/
    │   │   │   └── page.tsx
    │   │   ├── terms/
    │   │   │   └── page.tsx
    │   │   ├── cookies/
    │   │   │   └── page.tsx
    │   │   ├── refund/
    │   │   │   └── page.tsx
    │   │   ├── dmca/
    │   │   │   └── page.tsx
    │   │   └── gdpr/
    │   │       └── page.tsx
    │   │
    │   ├── (vault)/                    # Protected Vault routes
    │   │   ├── layout.tsx             # Session guard
    │   │   ├── verify/
    │   │   │   └── page.tsx           # OTP input
    │   │   ├── dashboard/
    │   │   │   ├── page.tsx           # Project grid
    │   │   │   └── [slug]/
    │   │   │       └── page.tsx       # Blueprint modal (async params)
    │   │   └── logout/
    │   │       └── route.ts           # Destroy session
    │   │
    │   ├── (auth)/                     # Web3 auth routes
    │   │   ├── wallet/
    │   │   │   └── page.tsx           # Wallet connect callback
    │   │   └── xmtp/
    │   │       └── page.tsx           # XMTP chat embed
    │   │
    │   ├── api/
    │   │   ├── vault/
    │   │   │   ├── request/
    │   │   │   │   └── route.ts       # Web2: Generate OTP
    │   │   │   ├── verify/
    │   │   │   │   └── route.ts       # Web2: Validate OTP
    │   │   │   └── web3/
    │   │   │       ├── nonce/
    │   │   │       │   └── route.ts   # Web3: Generate SIWE nonce
    │   │   │       └── verify/
    │   │   │           └── route.ts   # Web3: Validate signature
    │   │   ├── channel/
    │   │   │   └── route.ts           # Web2: Submit form
    │   │   ├── ipfs/
    │   │   │   └── route.ts           # Web3: Fetch blueprint from IPFS
    │   │   └── webhook/
    │   │       └── stripe/
    │   │           └── route.ts       # Stripe webhook
    │   │
    │   ├── favicon.ico
    │   ├── globals.css                # Global styles + custom properties
    │   ├── layout.tsx                 # Root layout (font variables)
    │   ├── robots.txt                 # SEO
    │   └── sitemap.ts                 # Auto-generated sitemap
    │
    ├── components/
    │   ├── ui/                         # Reusable primitives
    │   │   ├── Button.tsx
    │   │   ├── Card.tsx
    │   │   ├── Input.tsx
    │   │   ├── Textarea.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Tabs.tsx
    │   │   ├── Badge.tsx
    │   │   └── Icon.tsx               # Lucide icon wrapper
    │   │
    │   ├── layout/                     # Structural
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   └── Container.tsx
    │   │
    │   ├── home/                       # Homepage sections
    │   │   ├── Hero.tsx               # Dot grid + glitch text
    │   │   ├── Pillars.tsx
    │   │   ├── VaultTeaser.tsx        # Globe animation
    │   │   ├── Tracks.tsx
    │   │   ├── CharterQuote.tsx
    │   │   ├── NetworkMarquee.tsx
    │   │   └── ConversionZone.tsx
    │   │
    │   ├── vault/                      # Vault components
    │   │   ├── GlobeAnimation.tsx     # Three.js wireframe globe
    │   │   ├── AuthTabs.tsx           # Web2/Web3 toggle
    │   │   ├── Web2Form.tsx
    │   │   ├── Web3Connect.tsx
    │   │   ├── ProjectGrid.tsx
    │   │   ├── ProjectCard.tsx
    │   │   ├── BlueprintModal.tsx     # SVG viewer
    │   │   └── SessionTimer.tsx       # 24hr countdown
    │   │
    │   ├── channel/
    │   │   ├── IntakeForm.tsx
    │   │   ├── PGPBlock.tsx
    │   │   └── XMTPChat.tsx
    │   │
    │   ├── docs/
    │   │   └── PricingTable.tsx       # Reusable table for docs
    │   │
    │   └── shared/
    │       ├── GlitchText.tsx
    │       ├── Scanline.tsx
    │       ├── StatusBadge.tsx
    │       └── TerminalCursor.tsx
    │
    ├── lib/
    │   ├── redis.ts                   # Upstash Redis client
    │   ├── email.ts                   # Resend client
    │   ├── stripe.ts                  # Stripe client
    │   ├── logger.ts                  # Pino logger
    │   ├── validation/
    │   │   ├── vaultRequest.ts        # Zod schema
    │   │   └── channelSubmission.ts
    │   ├── web3/
    │   │   ├── wagmi.ts               # RainbowKit config
    │   │   ├── contracts.ts           # Contract ABIs + addresses
    │   │   ├── ipfs.ts                # Pinata client
    │   │   └── xmtp.ts                # XMTP client
    │   ├── projects.ts                # Static project data
    │   ├── constants.ts               # App constants
    │   └── utils.ts                   # Helpers (OTP gen, domain parser)
    │
    ├── hooks/
    │   ├── useVaultSession.ts         # Session check
    │   ├── useScrollAnimation.ts      # Framer Motion scroll trigger
    │   ├── useGlitch.ts               # Glitch effect trigger
    │   └── useCountdown.ts            # Timer
    │
    ├── types/
    │   ├── project.ts
    │   ├── api.ts
    │   └── session.ts
    │
    ├── styles/
    │   ├── blueprint.css              # SVG styling
    │   └── glitch.css                 # Glitch animations
    │
    └── public/
        ├── images/
        │   ├── og-image.png           # Open Graph image
        │   └── favicon.ico
        ├── humans.txt                 # Developer credits
        └── blueprints/                # Fallback static blueprints (backup)
```

---

10. ENVIRONMENT VARIABLES

```env
# ============================================
# WEB2 (AUTH, EMAIL, PAYMENTS)
# ============================================

# Upstash Redis
UPSTASH_REDIS_REST_URL="https://your-cluster.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your_token_here"

# Resend Email
RESEND_API_KEY="re_your_api_key_here"
NEXT_PUBLIC_EMAIL_DOMAIN="nyxeltechnologies.com"

# Stripe (for Web2 payments)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# Slack Webhook (for internal notifications)
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."

# ============================================
# WEB3 (WALLET, IPFS, CONTRACTS)
# ============================================

# WalletConnect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="your_project_id_here"

# IPFS (Pinata)
PINATA_JWT="your_jwt_here"
NEXT_PUBLIC_PINATA_GATEWAY="https://gateway.pinata.cloud"

# Smart Contracts
NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS="0x..."
NEXT_PUBLIC_CHARTER_ATTESTATION_UID="0x..."

# USDC Token Addresses (Base/Arbitrum)
NEXT_PUBLIC_USDC_ADDRESS="0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"  # Base USDC
# For Arbitrum: 0xaf88d065e77c8cC2239327C5EDb3A432268e5831

# RPC URLs
NEXT_PUBLIC_BASE_RPC_URL="https://mainnet.base.org"
NEXT_PUBLIC_ARBITRUM_RPC_URL="https://arb1.arbitrum.io/rpc"

# ============================================
# MONITORING & ANALYTICS
# ============================================

# Sentry
SENTRY_DSN="https://..."
NEXT_PUBLIC_SENTRY_ENVIRONMENT="production"

# Vercel Analytics (auto-detected)
# No env vars needed; Vercel Analytics is enabled via next.config.js

# ============================================
# APP CONFIG
# ============================================

NEXT_PUBLIC_VAULT_DOMAIN="nyxeltechnologies.com"
NEXT_PUBLIC_APP_URL="https://nyxeltechnologies.com"

# Rate Limiting
VAULT_REQUEST_LIMIT=3
VAULT_REQUEST_WINDOW=3600  # 1 hour
CHANNEL_REQUEST_LIMIT=2
CHANNEL_REQUEST_WINDOW=86400  # 24 hours

# OTP Config
OTP_LENGTH=6
OTP_TTL=86400  # 24 hours
OTP_MAX_ATTEMPTS=3
OTP_LOCKOUT_DURATION=3600  # 1 hour

# Session Config
SESSION_TTL=86400  # 24 hours
```

---

11. SMART CONTRACTS

11.1 Escrow.sol (USDC ERC-20 Compliant)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Escrow {
    address public client;
    address public contractor;
    address public arbiter; // Multi-sig Safe address

    IERC20 public usdc;

    uint256 public totalAmount;
    uint256 public releasedAmount;
    bool public completed;

    struct Milestone {
        string description;
        uint256 amount;
        bool released;
    }

    Milestone[] public milestones;

    event MilestoneReleased(uint256 indexed milestoneId, uint256 amount);
    event EscrowCompleted(uint256 totalReleased);

    constructor(
        address _usdc,
        address _client,
        address _contractor,
        address _arbiter,
        uint256 _totalAmount
    ) {
        usdc = IERC20(_usdc);
        client = _client;
        contractor = _contractor;
        arbiter = _arbiter;
        totalAmount = _totalAmount;
    }

    function deposit() external {
        require(msg.sender == client, "Only client can deposit");
        require(
            usdc.transferFrom(msg.sender, address(this), totalAmount),
            "USDC transfer failed"
        );
    }

    function addMilestone(string memory description, uint256 amount) external {
        require(msg.sender == client || msg.sender == contractor, "Unauthorized");
        milestones.push(
            Milestone({description: description, amount: amount, released: false})
        );
    }

    function releaseMilestone(uint256 milestoneId) external {
        require(msg.sender == arbiter, "Only arbiter can release");
        require(milestoneId < milestones.length, "Invalid milestone");
        require(!milestones[milestoneId].released, "Already released");

        milestones[milestoneId].released = true;
        releasedAmount += milestones[milestoneId].amount;

        require(
            usdc.transfer(contractor, milestones[milestoneId].amount),
            "USDC transfer failed"
        );

        emit MilestoneReleased(milestoneId, milestones[milestoneId].amount);

        if (releasedAmount == totalAmount) {
            completed = true;
            emit EscrowCompleted(releasedAmount);
        }
    }

    function refund() external {
        require(msg.sender == client, "Only client can refund");
        require(!completed, "Already completed");
        uint256 balance = usdc.balanceOf(address(this));
        require(usdc.transfer(client, balance), "USDC refund failed");
    }

    function getBalance() external view returns (uint256) {
        return usdc.balanceOf(address(this));
    }
}
```

11.2 Deployment Script

```javascript
// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS;
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    usdcAddress,
    "0xClientAddress",
    "0xContractorAddress",
    "0xSafeAddress",
    hre.ethers.parseUnits("18000", 6) // USDC has 6 decimals
  );
  await escrow.waitForDeployment();
  console.log("Escrow deployed to:", escrow.target);
}
```

---

12. CI/CD PIPELINE

12.1 GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build

  deploy-production:
    needs: build-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

12.2 Vercel Deployment

Production: main branch → auto-deploys to nyxeltechnologies.com
Preview: Every PR → preview-*.vercel.app
Environment Variables: Configured in Vercel dashboard.

12.3 Smart Contract Deployment (Manual)

```bash
# Deploy to Base
npx hardhat run scripts/deploy.js --network base

# Verify on Basescan
npx hardhat verify --network base 0xEscrowAddress
```

---

13. DEVELOPER SETUP

13.1 Prerequisites

· Node.js 20+
· npm 10+
· Git
· Hardhat (for contract development)
· Vercel CLI (for deployment)

13.2 Initial Setup

```bash
# Clone repo
git clone git@github.com:your-org/nyxeltechnologies.com.git
cd nyxeltechnologies.com

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Fill in environment variables
# (Get from 1Password / Vercel dashboard)

# Run development server
npm run dev

# Open http://localhost:3000
```

13.3 Development Commands

```bash
# Development
npm run dev                 # Start dev server
npm run lint               # Run ESLint
npm run format             # Prettier format
npm run type-check         # TypeScript type check
npm run test               # Run unit tests
npm run test:e2e           # Run Playwright tests

# Build
npm run build              # Build Next.js app
npm run start              # Production start
npm run analyze            # Bundle analyzer

# Smart Contracts
npx hardhat compile        # Compile contracts
npx hardhat test           # Run contract tests
npx hardhat node           # Local hardhat node

# IPFS Upload
npm run upload-ipfs        # Upload blueprints to IPFS

# Deploy
vercel                     # Deploy to preview
vercel --prod              # Deploy to production
```

---

14. DEPLOYMENT CHECKLIST

14.1 Pre-Deployment

· All environment variables set in Vercel
· DKIM/SPF/DMARC DNS records configured for nyxeltechnologies.com
· Resend domain verified
· Stripe account set up
· Upstash Redis instance created
· Pinata account created
· WalletConnect Project ID generated
· EAS attestation registered (for Charter)
· Safe multi-sig created (3-of-5 signers)
· Sentry project created
· UptimeRobot monitoring configured
· USDC address for Base/Arbitrum verified and set in env

14.2 Smart Contracts

· Escrow.sol deployed to Base/Arbitrum (USDC-compliant)
· Contract verified on Basescan
· NEXT_PUBLIC_ESCROW_CONTRACT_ADDRESS set
· NEXT_PUBLIC_USDC_ADDRESS set correctly

14.3 Content

· 5 Vault projects uploaded to IPFS (CIDs stored in projects.ts)
· OG Image generated (1200x630, dark background, NXC ✦ in cyan)
· Favicon generated (✦ on #0A0A0A)
· robots.txt configured (allow all marketing pages, disallow /dashboard)
· sitemap.xml generated
· humans.txt added

14.4 Testing

· Web2 flow: Email OTP → Vault → Channel → Stripe
· Web3 flow: Wallet Connect → Vault → XMTP → Escrow (USDC deposit/release)
· All links and navigation working
· All forms submitted successfully
· API rate limiting working
· 404 page displays correctly
· Mobile responsive test

14.5 Go-Live

· Vercel deployment to production (vercel --prod)
· DNS pointed to Vercel
· SSL certificate validated (auto-provisioned)
· Analytics configured (Vercel Web Analytics)
· Sentry error tracking enabled

---

15. MAINTENANCE & CONTENT UPDATES

15.1 Updating Vault Projects

File: src/lib/projects.ts

```typescript
export const projects = [
  {
    id: 'ghostnet',
    codename: 'GHOSTNET',
    industry: 'Logistics & Supply Chain',
    stack: ['Rust', 'Go', 'Kafka', 'TimescaleDB', 'AWS GovCloud'],
    scale: '45,000 fleet assets · 2.4M daily requests',
    problem: 'Real-time geospatial tracking with sub-second latency...',
    solution: 'Custom event-sourcing layer with materialized views...',
    result: '99.99% uptime · 40% infra cost reduction · 6ms avg query time',
    ipfsCid: 'QmX...',
  },
];
```

15.2 Updating Pricing

File: src/app/docs/how-we-bill/page.tsx

15.3 Updating Network Roster

File: src/app/network/page.tsx

15.4 Rotating Secrets

Secret Rotation Frequency Action
UPSTASH_REDIS_REST_TOKEN Quarterly Regenerate in Upstash dashboard
RESEND_API_KEY Quarterly Regenerate in Resend dashboard
PINATA_JWT Quarterly Regenerate in Pinata dashboard
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID Yearly Regenerate in WalletConnect Cloud
STRIPE_SECRET_KEY Yearly Regenerate in Stripe dashboard
SENTRY_DSN Yearly Regenerate in Sentry dashboard

---

16. SECURITY & COMPLIANCE

16.1 Security Measures

Threat Mitigation
Vault OTP brute-force 3 attempts per email → 1hr lockout
Channel form spam Rate limit: 2 requests/IP/day
SIWE replay attack Nonce stored in Redis, single-use, 5min TTL
Data retention No personal data stored. OTPs hashed and auto-deleted
XSS HTTP-only cookies, CSP headers
CSRF SameSite=Strict cookies
Gas fee manipulation Client pays gas; we provide cost estimates upfront
Man-in-the-middle TLS/SSL (Vercel auto-provisions)
API abuse Rate limiting via Upstash
Smart contract vulnerabilities Audit via OpenZeppelin, test coverage >90%
DDoS Vercel's edge network provides DDoS protection
Phishing All official domains end with @nyxeltechnologies.com

16.2 Compliance

Regulation Compliance Status
GDPR ✅ Compliant. No personal data stored. No tracking cookies.
CCPA ✅ Compliant. No data collection, sharing, or sale.
WCAG 2.1 AA ✅ Color contrast, keyboard navigation, screen reader support.
PCI-DSS ✅ Stripe handles payments. No credit card data stored.

---

17. PERFORMANCE TARGETS

17.1 Core Web Vitals

Metric Target
LCP < 2.0s
FID < 100ms
CLS < 0.1

17.2 Lighthouse Scores

Category Target
Performance ≥ 95
Accessibility ≥ 95
Best Practices ≥ 95
SEO ≥ 95

17.3 Optimization Strategies

· Static Generation: Marketing pages (/, /charter, /network, /capabilities, /docs) are fully static.
· Incremental Static Regeneration (ISR): Vault projects have revalidate: 3600 (1 hour).
· Image Optimization: Next.js <Image> component with WebP format.
· Font Loading: Preload Playfair Display and JetBrains Mono via Next.js native font system.
· CDN: Vercel Edge Network for global caching.
· Three.js: Lazy-loaded on interaction (Hero and Vault globe).

---

18. ACCESSIBILITY (a11y)

18.1 Requirements

· Color Contrast: All text meets WCAG AA (4.5:1 for body, 3:1 for large text).
· Keyboard Navigation: All interactive elements focusable with :focus-visible.
· Screen Readers: ARIA labels on all interactive elements.
· Skip Link: Skip to main content at top of page.

18.2 Implementation

```tsx
// Skip link
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// ARIA labels
<button aria-label="Close modal">×</button>
<nav role="navigation" aria-label="Main navigation">
```

18.3 Color Contrast Check

Element Foreground Background Ratio Pass
Body Text #EAEAEA #0A0A0A 15.8:1 ✅
Secondary Text #888888 #0A0A0A 5.2:1 ✅
Accent (Cyan) #00F0FF #0A0A0A 8.5:1 ✅
Accent (Orange) #FF4500 #0A0A0A 4.8:1 ✅

---

19. DESIGN CONSTRAINTS & RULES

19.1 Typography Rules

· Rule 1: Serif (Playfair Display) for headlines only. Never use serif for body text.
· Rule 2: Monospace (JetBrains Mono) for body, buttons, labels, inputs.
· Rule 3: No uppercase text except for monospace CTAs (e.g., REQUEST ACCESS).
· Rule 4: letter-spacing: -0.02em for all serif headlines.
· Rule 5: Maximum 3 font weights used (400, 600, 700).

19.2 Spacing Rules

· Rule 6: Use the 4px base unit. All spacing is multiples of 4.
· Rule 7: Max width 1200px for all pages.
· Rule 8: Hero section must be full viewport height (min-h-screen).
· Rule 9: Cards must have 24px padding minimum.

19.3 Color Rules

· Rule 10: Never use pure white (#FFFFFF). Always #EAEAEA.
· Rule 11: Cyan (#00F0FF) is for interactive elements only (links, hovers, focus states).
· Rule 12: Orange (#FF4500) is for primary CTAs and neo-brutalist accents.
· Rule 13: Gold (#FFD700) is for pull-quotes, Roman numerals, and highlighting results.
· Rule 14: Crimson (#FF1A1A) is for errors and Incident Response only.

19.4 Animation Rules

· Rule 15: All animations must be ease-out or ease-in-out.
· Rule 16: Glitch effect only on hover (not continuous, except Hero load).
· Rule 17: Scroll animations: opacity: 0 → 1 and y: 20 → 0.
· Rule 18: Duration: 0.6s for page load, 0.8s for scroll reveals.

19.5 Content Rules

· Rule 19: No team photos, no office photos, no client logos.
· Rule 20: All case studies are anonymized (codenames only).
· Rule 21: Zero references to specific client names.
· Rule 22: Technical briefs on Channel form are limited to 500 characters.
· Rule 23: Always include "NDA signed before discovery" in copy.

19.6 Security Rules

· Rule 24: Never store user data. OTPs are hashed and auto-deleted.
· Rule 25: No third-party analytics (Google, Meta, Mixpanel).
· Rule 26: HTTP-only cookies only (no document.cookie access).
· Rule 27: Rate limit all API routes.
· Rule 28: CORS-restricted API routes.

19.7 Icon Rules

· Rule 29: All icons from Lucide React (shadcn/ui).
· Rule 30: No emojis as icons. Use Lucide equivalents.
· Rule 31: Icon size: w-4 h-4 for inline buttons, w-5 h-5 for standalone icons.
· Rule 32: Use <Icon /> wrapper component for consistent styling.

19.8 Next.js 15 Async Rule

· Rule 33: All Next.js 15 dynamic route params must be typed as Promise<{ slug: string }> and awaited before usage.

---

20. INTERNAL WORKFLOWS

20.1 Lead Triage

1. Channel form submitted → Slack webhook sends alert to #leads channel
2. Lead Architect acknowledges within 4 hours
3. Lead Architect assigns to engineer based on tier:
   · Personal/Incubation → Senior Frontend Engineer
   · Scale → Lead Architect + CTO Advisor
   · Incident → On-call engineer (rotating weekly)

20.2 Client Onboarding (Web2)

1. NDA signed (via DocuSign or manual)
2. Private GitHub repo created (client-{name})
3. Vercel preview environment provisioned
4. Kickoff call scheduled (encrypted video via Signal/Jitsi)
5. Stripe invoice sent → Payment → Work begins

20.3 Client Onboarding (Web3)

1. NDA signed (via digital signature or on-chain)
2. Escrow contract deployed with milestones
3. Client deposits USDC into Escrow
4. XMTP channel opened for communication
5. Work begins → Milestone releases

20.4 Incident Response (Internal)

1. Alert received via Slack #incidents channel
2. On-call engineer acknowledges within 15 minutes
3. Triage call (within 30 minutes)
4. Root cause analysis started
5. Hotfix deployed (within 2 hours for critical)
6. Post-mortem report delivered to client within 48hrs

20.5 Escrow Multi-Sig Signers (Safe)

· Architect Ω
· Distributed Δ
· Interface Γ
· External Arbiter (legal/technical)
· Client Representative (optional)

---

21. SEO & METADATA

21.1 Open Graph Tags

```typescript
// src/app/layout.tsx - Metadata per page
export const metadata = {
  title: 'NXC ✦ | Stealth Engineering Collective',
  description: 'Faceless engineering studio. Web2 + Web3. $50 personal projects to $50k enterprise infrastructure.',
  openGraph: {
    title: 'NXC ✦ | Stealth Engineering Collective',
    description: 'Build in stealth. Deploy at scale.',
    url: 'https://nyxeltechnologies.com',
    siteName: 'NXC ✦',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NXC ✦ | Stealth Engineering Collective',
    description: 'Build in stealth. Deploy at scale.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://nyxeltechnologies.com',
  },
};
```

21.2 JSON-LD Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Null Execution Collective",
  "url": "https://nyxeltechnologies.com",
  "logo": "https://nyxeltechnologies.com/images/og-image.png",
  "description": "Faceless engineering studio. Stealth development. Web2 + Web3.",
  "founder": {
    "@type": "Organization",
    "name": "Anonymous Engineering Collective"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "relay@nyxeltechnologies.com",
    "contactType": "customer service"
  }
}
```

21.3 Sitemap Generation

```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://nyxeltechnologies.com', lastModified: new Date() },
    { url: 'https://nyxeltechnologies.com/charter', lastModified: new Date() },
    { url: 'https://nyxeltechnologies.com/network', lastModified: new Date() },
    { url: 'https://nyxeltechnologies.com/capabilities', lastModified: new Date() },
    { url: 'https://nyxeltechnologies.com/docs/how-we-bill', lastModified: new Date() },
    { url: 'https://nyxeltechnologies.com/vault', lastModified: new Date() },
    { url: 'https://nyxeltechnologies.com/channel', lastModified: new Date() },
    { url: 'https://nyxeltechnologies.com/privacy', lastModified: new Date() },
    { url: 'https://nyxeltechnologies.com/terms', lastModified: new Date() },
  ];
}
```

---

22. LEGAL PAGES

22.1 Privacy Policy (/privacy)

Key clauses:

· "We do not store, mine, or share your data."
· "OTPs are hashed and auto-deleted after 24 hours."
· "No third-party trackers (Google Analytics, Meta, etc.)."
· "Strictly necessary cookies only (HTTP-only session cookies)."
· "You may request data deletion at any time via gdpr@nyxeltechnologies.com."

22.2 Terms of Service (/terms)

Key clauses:

· "All delivered code is your property. Full IP transfer on final payment."
· "NDA is signed before any discovery."
· "No lock-in. You may cancel retainers with 30 days' notice."
· "Incident Response is a best-effort service; SLA is defined per engagement."

22.3 Cookie Policy (/cookies)

· Only nx_vault_session cookie (HTTP-only, SameSite=Strict)
· No tracking cookies
· No third-party cookies

22.4 Refund Policy (/refund)

· Personal: 100% refund within 7 days of delivery
· Incubation: 100% refund within 14 days of delivery (minus fixed costs)
· Scale: No refunds (milestone-based escrow)
· Incident: No refunds (emergency services rendered)

22.5 DMCA / Copyright (/dmca)

· Standard DMCA takedown notice procedure
· Contact: dmca@nyxeltechnologies.com

22.6 GDPR Data Deletion Request (/gdpr)

· Form to request data deletion
· Requires email verification
· Response within 72 hours

---

23. MONITORING & OBSERVABILITY

23.1 Error Tracking (Sentry)

```typescript
// lib/logger.ts
import pino from 'pino';
import * as Sentry from '@sentry/nextjs';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,
});

export function logError(error: Error, context?: Record<string, any>) {
  logger.error({ error: error.message, stack: error.stack, ...context }, 'Error logged');
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, { extra: context });
  }
}

export default logger;
```

23.2 Uptime Monitoring

· UptimeRobot: Monitors https://nyxeltechnologies.com every 5 minutes
· Alerting: SMS/Email if downtime exceeds 1 minute
· SLA: 99.99% uptime target

23.3 API Logging

All API routes use structured logging:

```typescript
// Example: /api/vault/request
logger.info({ email, tier: 'Scale' }, 'Vault access requested');
logger.error({ error: err.message, ip: req.ip }, 'OTP generation failed');
```

---

24. PERFORMANCE OPTIMIZATION

24.1 Next.js Configuration

```javascript
// next.config.mjs
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'gateway.pinata.cloud' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/fiber', 'framer-motion'],
  },
});
```

24.2 Dynamic Imports

```tsx
// Lazy-load Three.js components
const GlobeAnimation = dynamic(() => import('@/components/vault/GlobeAnimation'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-[#121212]" />,
});
```

24.3 Font Loading (Next.js 15 Native)

Fonts are already optimized via next/font/google in the root layout (see Section 4.1). No additional @font-face or @import rules are needed.

---

25. TESTING STRATEGY

25.1 Unit Tests (Jest + React Testing Library)

Coverage Targets:

· Components: >80%
· Utilities: >90%
· Hooks: >80%

Example Test:

```tsx
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

test('renders button with children', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

25.2 Integration Tests

· API routes: /api/vault/request, /api/vault/verify, /api/channel
· Redis interactions (mocked)
· Email sending (mocked)

25.3 E2E Tests (Playwright)

```typescript
// e2e/web2-flow.spec.ts
import { test, expect } from '@playwright/test';

test('Web2 flow: Email OTP → Vault', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Request Vault Access');
  await page.fill('input[name="email"]', 'test@company.com');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=OTP sent')).toBeVisible();
});
```

25.4 Smart Contract Tests (Hardhat)

```solidity
// test/Escrow.test.js
const { expect } = require("chai");

describe("Escrow", function () {
  it("should release milestone after arbiter approval", async function () {
    // ... test logic
  });
});
```

25.5 Run Tests

```bash
npm run test        # Unit tests
npm run test:e2e    # Playwright tests
npm run test:contract # Hardhat tests
```

---

26. ANALYTICS & INSIGHTS

26.1 Vercel Analytics

· Auto-instrumented via @vercel/analytics
· Aggregated, anonymous data (page views, referrers, countries)
· No personal data captured
· No cookies used

26.2 Event Tracking

```typescript
// lib/analytics.ts
import { track as vercelTrack } from '@vercel/analytics';

export function trackEvent(event: string, properties?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production') {
    vercelTrack(event, properties);
  }
}
```

Tracked Events:

· vault_request_clicked (tier, source)
· channel_form_submitted (tier, domain)
· blueprint_viewed (projectId)
· wallet_connected (wallet type)
· escrow_deposit_initiated (amount)

26.3 No Third-Party Trackers

· ❌ Google Analytics
· ❌ Meta Pixel
· ❌ Mixpanel
· ❌ Hotjar
· ❌ Segment

---

27. DISASTER RECOVERY & BACKUPS

27.1 Redis (Upstash)

· Automatic persistence (RDB snapshots every 5 minutes)
· Data retention: 7 days
· Manual export: Upstash dashboard → Export

27.2 IPFS (Pinata)

· Pinned files are redundant (3 copies)
· Backup to Filebase (S3-compatible) as secondary pinning service

27.3 Code (GitHub)

· All code in private GitHub repo
· Vercel preview deployments = rollback safety
· Branch protection rules: main requires PR review

27.4 Smart Contracts

· Verified on Basescan/Arbiscan
· Source code in GitHub repo
· Manual backup: npx hardhat export-abi → store in S3

27.5 DNS (Cloudflare)

· Domain registered with Cloudflare
· Backup NS records with secondary provider
· TTL: 300s for fast failover

27.6 Rollback Procedure

1. Code: Vercel → Deployments → Rollback to previous commit
2. Contracts: Redeploy previous version (if compatible)
3. Storage: Repin IPFS files from backup
4. Database: Restore from Upstash backup (point-in-time)

---

28. FUTURE SCALABILITY CONSIDERATIONS

28.1 Internationalization (i18n)

· Add next-i18next for multi-language support
· Supported languages: EN (default), ES, FR, DE
· All static content translatable via locale files

28.2 White-labeling

· Allow clients to brand NXC as their own internal team
· Custom subdomain: client.nyxeltechnologies.com
· Configurable logo, colors, domain name

28.3 Public API (Phase 2)

· REST endpoints for:
  · Project status (GET /api/projects/{id})
  · Invoice generation (POST /api/invoices)
  · SLA reporting (GET /api/sla/{projectId})
· API key authentication (HMAC)

28.4 Audit Trail (Enterprise)

· All actions logged to private blockchain (Hyperledger or Hedera)
· Immutable record of: code commits, milestone releases, payments
· Accessible to client via dashboard

28.5 Mobile App (Future)

· Build separate React Native app (not in scope)
· Integrate with existing APIs

28.6 Multi-Currency (USDC)

· Currently only USDC on Base/Arbitrum
· Future: Support USDC on Solana, Polygon, and fiat via Stripe Connect

---

29. GLOSSARY

Term Definition
NXC ✦ Brand logo. Nyxel Technologies Collective.
The Charter Page containing the 6 immutable principles.
The Network Page containing the anonymous roster.
The Vault Password-protected case studies.
The Channel Secure contact page (form + PGP + XMTP).
Web2 Email + OTP authentication. Stripe payments. Static storage.
Web3 Wallet + SIWE authentication. USDC Escrow. IPFS storage. XMTP messaging.
Personal Tier 1: $50–$300. Solo builders. Web2 only.
Incubation Tier 2: $500–$5,000. Bootstrapped founders. Web2 default.
Scale Tier 3: $18,000+. Funded startups. Web3 native.
SIWE Sign-in with Ethereum. Wallet-based authentication.
EAS Ethereum Attestation Service. On-chain attestation.
XMTP Extensible Message Transport Protocol. Wallet-to-wallet encrypted messaging.
IPFS InterPlanetary File System. Decentralized storage.
Safe Multi-sig wallet (formerly Gnosis Safe). Treasury management.
OTP One-Time Passcode. Email-based 6-digit code for Web2 auth.
TTL Time-To-Live. 86400 seconds (24 hours) for sessions and OTPs.
Neo-Brutalism Design style: raw, thick borders, stark contrast, unpolished.
Glassmorphism Design style: frosted glass, backdrop blur, translucent.
Dynamic Editorial Design style: oversized serif, asymmetrical grids, overlapping.
Minimalist Design style: clean lines, ample whitespace, functional.
Lucide Icon library used via shadcn/ui.
shadcn/ui Component library used for base UI primitives.
Sentry Error tracking tool.
Pino Structured logging library.
Playwright E2E testing framework.
Hardhat Ethereum development environment.
USDC USD Coin (ERC-20) used for Web3 payments.
Next.js 15 React framework with App Router, Server Components, and async params.

---

30. REFACTORING & WORKSPACE SPECIFICATIONS (V8.0)

30.1 Website Structure Map

· /                            → Main Landing Page
· /charter                     → Core Principles + On-chain EAS Attestation Box
· /network                     → Team Roster (with Glassmorphic Dossier Modals)
· /capabilities                → Tier Comparisons (Personal, Incubation, Scale)
· /docs/how-we-bill            → Complex Pricing Matrix
· /vault                       → Login portal supporting side-by-side Manual Email/Google OAuth and Web3 SIWE Connect
· /verify                      → OTP Verification page with uniform loading disabled controls
· /vault/dashboard             → Case studies dashboard with sharp-cornered skeleton loader states, showing dynamic referral codes
· /vault/admin                 → Admin control panel to manage dynamic leads, dynamic projects, and dynamic roster
· /api/vault/request           → OTP Code generator & Resend dispatcher
· /api/vault/verify            → Web2 OTP verifier & nx_vault_session cookie setter
· /api/vault/session           → Retrieve active session details & dynamic referral codes
· /api/vault/web3/nonce        → SIWE cryptographic nonce provider
· /api/vault/web3/verify       → Web3 SIWE verifier & nx_vault_session cookie setter
· /api/channel                 → Secure brief submission endpoint with dynamic referral checking
· /api/auth/*                  → Auth.js v5 Google OAuth route handlers and callbacks
· /api/admin/*                 → Protected administrative database REST endpoints

30.2 Style & UI Guidelines

· Colors: Page background must remain absolute #0A0A0A black. Primary accents are Cyan (#00F0FF), Neo-Orange (#FF4500), Gold (#FFD700), and Crimson (#FF1A1A).
· Borders: Neo-Brutalist elements use 4px solid borders; standard elements use 1px solid #2A2A2A.
· Corners: All UI forms, text areas, input fields, buttons, and loading skeletons must use sharp unpolished corners (rounded-none).
· Loading Skeletons: While loading dynamic cards or data blocks, visual interfaces must render flat #121212 background grids with 1px solid #2A2A2A outlines, animating on the Tailwind animate-pulse loop. Pilled or rounded skeletons are strictly prohibited.
· Glassmorphic Modals: Centered, full-viewport overlays must enforce backdrop-blur-[12px] with background transparency (e.g., bg-black/85 or bg-white/5).

30.3 Routing Rules & Cookie Pipeline

· Client Routing: Absolute ban on native browser page reloads (window.location.href). State transitions must use Next.js useRouter hooks or Client-side Router components.
· Session Cookie: Authorized Web2 OTP, Google OAuth, and Web3 SIWE sessions must issue a signed, HTTP-Only cookie nx_vault_session with a 24-hour expiration lifetime.
· Middleware: Edge middleware intercepts protected paths (/vault/dashboard and /vault/admin) using direct Redis checks on Vercel deployments, while supporting local development bypass.

30.4 Immutable / Protected Regions (Never Modify)

· Core Escrow Contract Logic: Do not touch Escrow milestone validation, arbiter release logic, or refund routines in contracts/Escrow.sol.
· Security Headers: Never remove Content-Security-Policy or X-Frame-Options set in the response headers of website/src/middleware.ts.
· Rate Limiting Key Formulas: Do not remove or weaken IP-based rate limiting of leads inside api/channel.
· Cryptographic Signature Logic: Do not weaken SIWE signature validations or bypass nonces in api/vault/web3/verify.

---

END OF AGENTS.MD

This document is the complete, authoritative specification for building nyxeltechnologies.com.

All specifications are self-contained. No references to previous versions or external text are required for implementation.

Any deviation from this spec must be documented and approved.

Build in stealth. Deploy in scale.

---