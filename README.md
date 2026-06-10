# Digital Canvas

San Antonio's builder program. Free workshops hosted by DevSA at the downtown coworking space, a six-week build bridge, and a demo day to an accredited investor audience. No equity, no tuition. Operated by 434 Media in partnership with DevSA.

Live at [digitalcanvas.community](https://digitalcanvas.community).

## What this site is

A marketing + acquisition surface for the Digital Canvas program. Three audience funnels and the program-level story sit on top of a shared brand system:

- **`/`** — overview + the three doors (builders / underwriters / investors)
- **`/builders`** — applicant funnel
- **`/underwriters`** — corporate sponsor funnel
- **`/demo-days`** — what demo day is and who attends
- **`/workshops`** — the open onramp; DevSA-hosted workshop weekends
- **`/about`** — founders, partners, the program's operators
- **`/thefeed`** — editorial / newsletter feed
- **`/conferences/morehumanthanhuman`** — the More Human Than Human AI conference (preserved standalone with its own orange/cyan brand)

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack) + React 19
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (Framer Motion v12), GSAP, custom Canvas 2D particle systems
- **3D:** Three.js + React Three Fiber
- **Data:** Firebase Admin SDK → Firestore (named database `digitalcanvas`)
- **Email:** Resend (transactional). Newsletter signups land in Firestore; the parent 434 Media admin app reads from the same Firestore database via the shared service account and owns all broadcast delivery.
- **OG images:** `next/og` rendered with GeistPixel-Square (TTF — Satori doesn't accept WOFF2)
- **Deployment:** Vercel + Vercel BotID for bot protection

## Project structure

```
next-canvas/
├── app/                              # Next.js App Router
│   ├── layout.tsx                   # Root layout — navbar, global metadata
│   ├── page.tsx                     # Home — wordmark hero, program overview
│   ├── sitemap.ts                   # Dynamic sitemap
│   ├── globals.css                  # Tailwind v4 + design tokens
│   ├── about/                       # Founders + partners (constellation hero)
│   ├── builders/                    # Applicant funnel (spark-trail hero)
│   ├── underwriters/                # Sponsor funnel (orbital-halo hero)
│   ├── workshops/                   # Workshop entry (directional-flow hero)
│   ├── demo-days/                   # Cohort demo day (two-color pairing hero)
│   ├── thefeed/                     # Editorial feed
│   ├── conferences/                 # Event-specific pages (MHTH preserved)
│   ├── events/                      # Archived event sub-routes (mxratmain, vanitaleochristmas)
│   ├── _archive/                    # Preserved code, intentionally not routed
│   └── api/
│       ├── og/                      # OG image routes (one per top-level page)
│       ├── contact/                 # Contact form → Firestore
│       ├── event-registration/      # RSVPs → Firestore
│       ├── newsletter/              # Signups → Firestore (parent admin app reads + handles delivery)
│       └── sponsor-inquiry/         # Sponsor inquiries → Firestore
├── components/
│   ├── about-constellation.tsx          # About hero — network mesh
│   ├── builders-sparks.tsx              # Builders hero — spark trails
│   ├── demo-days-pairing.tsx            # Demo days hero — two-color pairing
│   ├── hero-particles.tsx               # Home hero — wordmark scatter/gather
│   ├── underwriters-orbit.tsx           # Underwriters hero — orbital halo
│   ├── workshops-flow.tsx               # Workshops hero — directional flow
│   ├── aiconference/                    # MHTH event components (orange/cyan brand)
│   ├── navbar.tsx, footer.tsx, slideover-menu.tsx
│   └── ...
├── lib/
│   ├── firebase-admin.ts            # Firestore client (named database: digitalcanvas)
│   └── ...
├── public/
│   ├── fonts/                       # GeistPixel-Square.ttf (used by OG image routes)
│   ├── llms.txt                     # LLM/agent SEO summary
│   ├── robots.txt                   # AI bot allowlist
│   └── ...
├── data/                            # Static content data
├── docs/                            # Internal docs
├── hooks/                           # Custom React hooks
├── types/                           # Shared TS types
├── scripts/                         # Build / maintenance scripts
└── next.config.ts                   # Image domains + redirects (/events → /demo-days)
```

### Hero particle systems

Each audience-facing page has a story-specific canvas hero. Each tells a distinct narrative through behavior:

| Page | Component | Behavior | Story |
|------|-----------|----------|-------|
| Home | `hero-particles.tsx` | DIGITAL CANVAS wordmark; CANVAS row scatters and regathers on cursor | Brand identity |
| About | `about-constellation.tsx` | Network mesh; cursor connects to nearby nodes | Operator network |
| Workshops | `workshops-flow.tsx` | Left-to-right current; cursor diverts the flow | Open onramp |
| Demo Days | `demo-days-pairing.tsx` | White (builders) + amber (investors) drift; lines form across populations | Conversations forming |
| Builders | `builders-sparks.tsx` | Particles drift with fading green trails; cursor pulls them in | Active building |
| Underwriters | `underwriters-orbit.tsx` | Particles orbit a magenta focal point; cursor moves the gravity well | You are the anchor |

## Local development

This project uses **pnpm**. Don't mix `npm install` and `pnpm install` — the `pnpm-lock.yaml` is canonical.

### Setup

```bash
git clone https://github.com/434media/next-canvas.git
cd next-canvas
pnpm install
```

### Environment variables

Create `.env.local` in the project root. Production env vars live in the Vercel project dashboard — `.env.local` is for local dev only.

```env
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Firestore (writes to database named "digitalcanvas")
# Single JSON service account key — paste the entire JSON as one string.
# Consumed by lib/firebase-admin.ts via getDigitalCanvasDb().
GOOGLE_SERVICE_ACCOUNT_KEY=

# Resend (transactional email)
# 434 Media account. Verified sender domain: send.434media.com
RESEND_API_KEY=

# Lead with Ops test send endpoint — protects POST /api/lead-with-ops/send-test
LEAD_WITH_OPS_TEST_SECRET=

# 434 Media Feed
FEED_API_URL=https://434media.com/api/public/feed
FEED_API_KEY=
```

Vercel BotID is auto-configured in production — no env var needed.

### Scripts

```bash
pnpm dev          # Dev server with Turbopack
pnpm build        # Production build
pnpm start        # Production server
pnpm lint         # ESLint
npx tsc --noEmit  # Type check (run before pushing)
```

Visit [http://localhost:3000](http://localhost:3000).

## Working with the codebase

### Form data goes to Firestore

Every form endpoint (`/api/contact`, `/api/event-registration`, `/api/sponsor-inquiry`, `/api/newsletter`) writes to the **`digitalcanvas`** Firestore database via [`lib/firebase-admin.ts`](lib/firebase-admin.ts).

Use `getDigitalCanvasDb()` to get the cached client — don't call `getFirestore()` directly. The database id is exported as the constant `DATABASE_ID` for reference.

### OG images

Each top-level page has its own OG image route under `app/api/og/*`. They render with `ImageResponse` from `next/og` and load `public/fonts/GeistPixel-Square.ttf`. The file must be TTF — Satori (which `next/og` uses) does not accept WOFF2.

When adding a new top-level page, add a matching OG route and reference it in the page's `layout.tsx` metadata:

```ts
openGraph: { images: [{ url: "/api/og/your-page", ... }] }
```

### Email senders

Transactional and broadcast emails go through Resend on the 434 Media account. The verified sender domain is **`send.434media.com`**. For Digital Canvas-branded sends, use `Digital Canvas <hello@send.434media.com>` as the `from` field. The MHTH event still uses the legacy `hello@send.devsa.community` sender for its own templates.

Email template HTML lives in `lib/emails/*.ts` — each file exports a set of template functions that return complete HTML documents to pass to Resend's `html` field.

### Typography pattern

Every section H1/H2/H3 across the site uses the outer-h-tag pixel font pattern. Apply pixel font + uppercase + tracking-wide on the heading element itself, with the muted elaboration as an inner span:

```tsx
<h2 className="font-(family-name:--font-geist-pixel-square) text-2xl md:text-4xl text-white uppercase tracking-wide leading-tight max-w-3xl">
  Bold lead.{" "}
  <span className="text-white/30 font-medium">Elaboration text.</span>
</h2>
```

### Color system

- `#88FF00` (green) — Digital Canvas primary brand accent
- `#FF006E` (magenta) — secondary accent, complementary to green
- `#fbbf24` (amber) — demo days specifically
- `#ff9900` (orange) — preserved exclusively for the More Human Than Human conference
- `#00f2ff` (cyan) — preserved exclusively for MHTH

The MHTH conference keeps its original orange/cyan palette so the event retains its distinct identity. Do not introduce orange or cyan into Digital Canvas brand surfaces.

### Route conventions

- The old `/events` route redirects to `/demo-days` (configured in `next.config.ts`). Sub-paths like `/events/mxratmain` and `/events/vanitaleochristmas` are preserved.
- Underscore-prefixed folders (e.g. `app/_archive/`) are private to Next.js and are not routed. Use them to preserve code that isn't currently live.

## Git workflow

### Branch and commit

```bash
git checkout main
git pull origin main
git checkout -b feature/your-change
# make your changes
git add <specific files — avoid git add .>
git commit -m "short, specific message"
git push origin feature/your-change
```

Conventional commit prefixes are preferred:
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `refactor:` restructuring without behavior change
- `style:` visual polish, formatting
- `chore:` deps, config, tooling

### Open a PR

Use the GitHub CLI:

```bash
gh pr create --title "Short, specific PR title" --body "$(cat <<'EOF'
## Summary
What changed and why.

## Pages affected
- [ ] Home
- [ ] Workshops
- [ ] Demo Days
- [ ] Builders
- [ ] Underwriters
- [ ] About
- [ ] The Feed
- [ ] Conferences

## Test plan
- [ ] pnpm dev runs without console errors
- [ ] npx tsc --noEmit passes
- [ ] Visual review on desktop and mobile
- [ ] Particle systems render without errors
- [ ] Forms write to the digitalcanvas Firestore database

## Screenshots
Before / after for visual changes.
EOF
)"
```

Or via the GitHub UI: go to [the repo](https://github.com/434media/next-canvas), click **Compare & pull request**, and fill in the same template.

### Review and merge

1. Pushing your branch triggers a Vercel preview deployment automatically.
2. Wait for code review and for the preview link to be checked.
3. Address feedback in the same branch — push fixes as new commits.
4. Once approved, squash-merge to `main`. Production deploys automatically.

### Conventions

- **Branch names:** `feature/`, `fix/`, `docs/`, `refactor/`, `hotfix/`
- **One concern per PR** — don't bundle unrelated work
- **Keep the diff reviewable** — large changes should be broken into smaller PRs
- **Run `npx tsc --noEmit`** before pushing
- **Stage specific files** with `git add <files>`, not `git add .` — avoids accidentally committing `.env.local` or local scratch work

## Code quality

- TypeScript strict-ish — `next.config.ts` has `ignoreBuildErrors: true` for Vercel, but local checks should pass clean
- ESLint with Next.js + Tailwind v4 rules
- No formatter pinned in repo — team default is Prettier

## Deployment

The project deploys to Vercel on every push to `main`. Preview deployments fire on every PR. Production environment variables are managed in the Vercel project dashboard, not in committed files.

## Support

- Bug or feature request → open a [GitHub issue](https://github.com/434media/next-canvas/issues)
- Underwriter / build inquiries → [build@434media.com](mailto:build@434media.com)
- General contact → [hello@434media.com](mailto:hello@434media.com)

## License

Proprietary to 434 Media. All rights reserved.
