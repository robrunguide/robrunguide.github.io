# ROB RUN — implementation and verification handoff

Site target: `https://robrunguide.github.io/`. Scope approved: **home + five guides** only.

## Source changes

- Kept original Yorich `portal` skin and Header/Hero/Footer/Layout components. No global theme replacement.
- Populated `content/generated/home.json` and `content/generated/pages.json` with the six approved English SEO pages, unique titles/descriptions/H1s, H2 sections, prose, issue-specific tables, FAQ, cross-links and dated official-source citations.
- Added `components/site/official-sources.tsx` with actual outbound anchors to Steam and Kefir references rather than only unlinked URL strings.
- Fixed the shared portal header navigation: mobile collapses below **1024px** instead of **768px**, so tablets are not forced into a compressed horizontal desktop nav. At larger widths, navigation has a flexible area, wraps instead of overflowing, and does not shrink the brand. Menu starts at `top-full` of its header instead of an assumed 64px position. Links are real Next.js `Link` anchors and close the mobile menu on click.
- Restored key game information (Kefir / Steam) and proper fan-site source disclaimers. Existing GA/ad config untouched. All generated pages are normal statically rendered Next.js pages.
- Added `scripts/qa-static.mjs` for a dependency-free integrity test.

## Exact page inventory

1. `/` — `rob run`
2. `/server-status/` — `rob run server status`
3. `/change-server/` — `how to change server in rob run`
4. `/wipe/` — `rob run wipe`
5. `/console/` — `is rob run on console`
6. `/bank-account/` — `how to open bank account in rob run`

## G0–G4 status

| Check | Result | Evidence or blocker |
|---|---|---|
| Source inventory and initial base | PASS (source-level only) | Original uploaded ZIP preserved unchanged; original skin/component structure inspected |
| Five new guide routes and home content | PASS (source-level only) | Valid JSON, exact six URLs, unique SEO metadata and content |
| Navigation source-level repair | PASS (source-level only) | Shared SiteHeader amended to avoid desktop/mobile breakpoint collision; interactive functionality is **not** browser-tested |
| Dependency-free source checks | PASS | `node scripts/qa-static.mjs` executed successfully |
| `npm ci` | **BLOCKED** | Registry download stalled; `npm ci --offline` fails with `ENOTCACHED` for `zod-validation-error-4.0.2.tgz` |
| Next.js build | **UNVERIFIED** | Dependencies unavailable; build not completed |
| Exported CSS `/_next/static/css` HTTP load | **UNVERIFIED** | No build output or running Next.js server to inspect |
| Browser computed style and 375/390/768/1440 screenshots, baseline vs changed | **UNVERIFIED** | No build and running Next.js page; screenshots not claimed |
| Per-page final HTML/metadata, OG, canonical and sitemap QA | **UNVERIFIED** | Source checked, final static HTML not generated |
| Actual UI click tests on home and five guides | **UNVERIFIED** | Requires browser against real built site |
| Git commit | N/A | ZIP contained no `.git` directory / Git repository |
| Git push and production deployment | NOT ATTEMPTED | No verified repository write permission, build or browser QA PASS |
| Live URL | Intended only: `https://robrunguide.github.io/` | Not tested/published |

Do **not** deploy on the basis of source-only checks. Before shipping, run the following in a network-enabled environment:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
node scripts/qa-static.mjs
```

Use a local HTTP server on `out/` and Playwright/Chrome with 375, 390, 768 and 1440 viewport widths for **original baseline and all six final pages**. Confirm CSS stylesheets load with HTTP 200; inspect computed `display`, `gap`, `font-family`, `background-color`, horizontal overflow, header/nav bounding rectangles, and click every navigation link (both mobile menu open and desktop). Examine the generated HTML of all six pages for `title`, description, canonical, index/follow, one H1, usable body text, schema, images, anchors and sitemap/robots. Save baseline/final screenshots before treating UI as PASS. Fix any failure and rerun.

## Risks requiring release check

- Official Help Center deep links did not independently return a live page in the current web fetch; recheck before release. Their URL paths were taken from the previously approved research handoff.
- Server incidents are **historical**; no live uptime source is present. Console availability and game mechanics must be rechecked against primary sources at release.
- No live search ranking or traffic gains are promised.
- Site `readyForLaunch` is set to `true` for the approved pages' SEO metadata, but **this is not permission to publish without G0–G4 checks**.
