# ROB RUN v2 — SEO / Hero / Fixed Template revision

**Baseline:** user screenshot dated 2026-11-11 + `rob-run-site-updated.zip` from previous handoff. No Git repository/commit available. Site remains six approved routes only.

## Root cause and actual code path

- `lib/fixed-template/mode.ts` returns `true` and `config/skin.ts` is `portal`. Therefore runtime calls `FixedTemplateHome`, `FixedTemplateInner`, and `FixedTemplateHeader`; prior changes to the non-fixed PortalHeader/`app/page.tsx` were **not** the active hero/nav fix.
- In `lib/fixed-template/render.ts`, fixed-template CSS contained unscoped-in-content `.grid {grid-template-columns: repeat(3,1fr)}`. Its CSS was injected after Tailwind and overrode Tailwind's responsive hero grid, causing the user-observed two-column hero to render as three columns with an empty third column. The shared scoped CSS builder now omits only this legacy specimen-only `.grid` rule.
- Fixed-template header's actual `.nav` layout and a conflicting forced mobile flex-wrap CSS rule were adjusted: desktop centered width and right-aligned single-row links; widths <=900px use a horizontal scroll row below logo with real anchors. The mock specimen is not displayed as the home page content.
- `components/templates/fixed-template-home.tsx` retains the original content/cover card, centers it within max width, and corrects the hardcoded `Play on Roblox` CTA to **Play on Steam (Official)** pointing to the verified Steam URL.

## SEO work

- Homepage Title: `ROB RUN Guide & Wiki: Server Status, Wipes and How to Play` (58 characters). H1: `ROB RUN Guide & Wiki`. Homepage content adds a questions-and-answers table, decisions for five actual guide tasks, editorial transparency and official-source safeguards; does not expand into unrelated unapproved intents.
- All five subpages retain approved primary intent and URL. Replaced repetitive generic Practical checks blocks with specific information and caveats; kept existing FAQ, tables, official sources and related links.
- See `SEO_SOURCE_AUDIT.txt` for per-page **source-level** word counts, titles, descriptions, H1, exact-phrase frequency. This is **not** the final built visible DOM word counter, and AITDK may use a different extraction method.

## Verification status

| Check | Status | Evidence |
|---|---|---|
| Approved 6 URL source inventory | PASS — SOURCE | `node scripts/qa-static.mjs` |
| JSON and unique TDH | PASS — SOURCE | Valid JSON and source audit |
| Tailwind collision identified | PASS — SOURCE | Actual Fixed Template code inspected and targeted patch applied |
| Correct Steam CTA in active template | PASS — SOURCE | FixedTemplateHome text and official URL |
| TypeScript parser for 4 changed TS/TSX modules | PASS — SYNTAX | Global TypeScript transpileModule, no diagnostics |
| Production Next.js build | **UNVERIFIED** | `npm ci` unavailable in this environment; `next` package missing, `next build` cannot start |
| Runtime CSS HTTP status and computed styles | **UNVERIFIED** | Requires successful build and actual browser runtime |
| 375/390/768/1440 side-by-side screenshots of all 6 pages | **UNVERIFIED** | No runnable Next.js output; user screenshot establishes known previous failure only |
| Actual navigation clicks on each page and all responsive viewports | **UNVERIFIED** | Browser run unavailable |
| Final HTML canonical, robots, sitemap, schema, SEO word counts | **UNVERIFIED** | Cannot inspect exported HTML without build |
| Git commit, push and deployment | NOT ATTEMPTED | No repository or authorized push target |

**Release gate:** Must run `npm ci && npm run typecheck && npm run build`, serve `out` over HTTP, and inspect all 6 routes × 375/390/768/1440 in a real browser. Verify CSS returns 200; inspect `getComputedStyle` on header/nav/hero/grid; ensure no whole-page horizontal overflow, actual clickable navigation and hero centered. Screenshot original and final build. Inspect final HTML and fix all FAIL before pushing. **Do not mark UI/SEO runtime PASS from source analysis.**

Risks: game mechanics and dated live incidents can change; official notices should be reverified at release. Neither ranking nor traffic is guaranteed.
