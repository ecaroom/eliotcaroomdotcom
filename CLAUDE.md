# eliotcaroom.com: project brief

Source of truth for decisions about this site. Read this first in any thread; update it when a decision changes.

## Purpose

Eliot Caroom's personal site, v3/v4 of earlier sites. Mobile-first. Sections:

- **Now:** Home, Career, Projects (current and past), Writing, Podcasts (Different Worlds), Archive
- **Later:** data journalism and coding projects, including interactive charts
- **Archive:** links to rebuilt versions of earlier personal sites. Lower priority than the new site.

## Stack and hosting (decided)

| Piece | Choice | Why |
|---|---|---|
| Generator | Astro (static output) | Shared layout instead of copied HTML; Markdown content; supports interactive charts later. Output is plain HTML, so the live site survives even if Astro is abandoned. |
| Hosting | GitHub Pages, deployed by GitHub Actions on every push to `main` | Free, repo-native, no lock-in: the same build deploys to any static host. |
| Domain | eliotcaroom.com, registered at Cloudflare | At-cost pricing, no renewal markup. |
| DNS | Cloudflare, **DNS only (grey cloud)** | Proxying blocks GitHub's HTTPS certificate. |

DNS records: four A records on `@` (185.199.108–111.153), four AAAA on `@` (2606:50c0:8000–8003::153), CNAME `www` → `ecaroom.github.io`.

## Repo layout

- `src/pages/` : one file per page
- `src/content/writing/` : posts as Markdown (`title`, `date`, `summary`, `draft`)
- `src/layouts/Base.astro` : shared header, nav, footer
- `src/styles/global.css` : all styles, light and dark
- `.github/workflows/deploy.yml` : build and deploy
- `public/CNAME` : custom domain

## Rules

- **The repo is public.** Everything committed is readable, including drafts and Git history.
- **No secrets in the repo.** Local keys go in `.env` (gitignored). Build-time keys go in GitHub Actions secrets. Data projects fetch at build time and commit data files, never keys. No private keys in browser code.
- **No raw backups of old sites.** Rebuild old sections from backups; never commit the backups themselves (they may contain passwords or personal data).
- **No unpublished work-related material** (e.g. FactSet) until Eliot has cleared it.
- **Site copy follows Eliot's style guide.** No em dashes.
- Commit author email: the GitHub noreply address, not a personal email.

## Workstreams

Each gets its own thread in the claude.ai Project "eliotcaroom.com", with this repo attached.

1. **Setup and infrastructure:** done except HTTPS confirmation (see Status).
2. **Design:** direction set 2026-09-26: minimalist, web-native, mainly links to other things. Reference: lynnandtonic.com (structure only: big name, numbered link list, mode toggle, version label). Home is built this way; version label "v.4" pending Eliot's confirmation.
3. **Content:** Home intro, Career, Projects, Podcasts. Home intro is a draft Eliot hasn't approved.
4. **Archive rebuild:** from backup files first, Wayback second.
5. **Data journalism / coding projects:** later.

## Status

- 2026-09-26: Site deploying. DNS check successful; HTTPS certificate pending, then tick Enforce HTTPS. Minimalist home page shipped.
