# GitHub Pages first deploy — robrunguide.github.io

## One-time GitHub setting REQUIRED

The 2026-11-11 failed workflow completed `npm ci`, typecheck, lint, and build successfully. It failed at `actions/configure-pages@v5` because the GitHub Pages API returned **404 Not Found**. This usually means GitHub Pages has not been enabled for this repository. Changing website CSS, SEO, or Next.js code will not correct the Pages setting.

1. Open the repository on GitHub and click **Settings**.
2. Open **Pages** in the left sidebar.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**. Save if a button appears.
4. Confirm the repository is named **robrunguide.github.io** under the GitHub account **robrunguide**. For this user-site URL, no base path is needed.
5. Re-run the workflow from **Actions > Build and deploy site > Run workflow**, or push the updated source to `main`.

## What this revision changes

- Adds an early workflow preflight that reports the exact GitHub Settings page if the Pages API returns 404 or the source is still branch-based.
- Keeps `actions/configure-pages@v5`, `upload-pages-artifact@v3`, and `deploy-pages@v4` in their supported positions.
- Keeps the existing `npm ci`, TypeScript check, ESLint, production build, static `out` artifact, and site content unchanged.
- Does **not** use `enablement: true`: the `configure-pages` action documents that enabling Pages automatically requires a token other than the default `GITHUB_TOKEN`.

## After the action succeeds

Check https://robrunguide.github.io/ , https://robrunguide.github.io/robots.txt and https://robrunguide.github.io/sitemap.xml then submit the sitemap in Google Search Console.

## Verification status

The user's screenshot proves the prior GitHub-hosted build passed; it does not prove this revised workflow has deployed. Workflow syntax and ZIP contents have been checked locally. The GitHub repository's Pages setting and any real deployment are **UNVERIFIED** until you change the setting and the action completes.
