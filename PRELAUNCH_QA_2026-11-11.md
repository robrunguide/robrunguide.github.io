# ROB RUN — release configuration and GSC checklist (2026-11-11)

- Final intended GitHub Pages user site: https://robrunguide.github.io/ (repository must be `robrunguide.github.io` under GitHub account `robrunguide`).
- Source URL: `content/generated/site.json` → `hosting.siteUrl`; `NEXT_PUBLIC_SITE_URL`, if set in CI, MUST be the same URL. `NEXT_PUBLIC_BASE_PATH` MUST be empty for a user-site root. `NEXT_PUBLIC_CUSTOM_DOMAIN` MUST be unset.
- 6 canonical URLs: `/`, `/server-status/`, `/change-server/`, `/wipe/`, `/console/`, `/bank-account/`.
- `app/sitemap.ts` emits `sitemap.xml` dynamically during static export and only includes home + enabled core pages (no legal/noindex pages); `app/robots.ts` emits root `robots.txt` with `Allow: /` and absolute sitemap URL because `readyForLaunch` is true. `next.config.ts` has `output: export`, `trailingSlash: true`, and no base path. `scripts/postbuild.mjs` creates `.nojekyll`.
- Ads replaced with four supplied snippets: SocialBar, NativeBanner, 320x50, 728x90. Ads are inserted by existing client integration; ad rendering and policy compliance cannot be validated without browser/network.
- Tracking replaced with GTM-NQG8Q432 loader and canonical dataLayer bootstrap + noscript iframe. Old GA4 Measurement ID removed. NOTE: installing GTM DOES NOT send GA4 events unless the GTM container has a published Google tag / GA4 event configuration. Check GTM Preview and GA4 Realtime after deployment.
- Verify in published site: `/robots.txt`, `/sitemap.xml`, view-source canonical/OG on 6 paths, index/follow on core pages, title/description/H1, all nav links, page CSS (network 200 and computed styles), mobile responsiveness 375/390/768/1440, JS and ad console errors, no duplicate ads.
- GSC: add URL-prefix property `https://robrunguide.github.io/`, submit `https://robrunguide.github.io/sitemap.xml`, inspect home + 5 guides after publish. GSC indexing is not guaranteed.
- Status: source-level changes done; production build and browser acceptance remain UNVERIFIED unless later explicitly run successfully; no Git commit or deployment performed.
