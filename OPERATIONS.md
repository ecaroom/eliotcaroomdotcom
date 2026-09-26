# eliotcaroom.com: operations runbook

How the site is hosted, how to edit it, and how to fix it. Decisions and design live in `CLAUDE.md`; this file is the how-to.

## 1. How the pieces fit

```
You or Claude edit files in the repo
        │  git push to main
        ▼
GitHub: ecaroom/eliotcaroomdotcom (public)
        │  GitHub Actions workflow "Deploy to GitHub Pages" runs `astro build`
        ▼
GitHub Pages serves the built static HTML
        ▲
        │  DNS (Cloudflare, grey cloud) points eliotcaroom.com at GitHub's servers
Visitors type eliotcaroom.com
```

| Piece | Where | Account |
|---|---|---|
| Source code and content | github.com/ecaroom/eliotcaroomdotcom | GitHub user `ecaroom` |
| Build and deploy | GitHub Actions, `.github/workflows/deploy.yml` | same |
| Hosting | GitHub Pages (free, public repo) | same |
| Domain registration | Cloudflare Registrar, `eliotcaroom.com` | Eliot's Cloudflare account |
| DNS | Cloudflare DNS for the same domain | same |
| HTTPS certificate | Issued automatically by GitHub Pages | none |

Costs: the domain only (Cloudflare charges the registry's wholesale price, no markup). Hosting is free.

## 2. Settings that must stay as they are

**GitHub repo → Settings → Pages**
- Source: **GitHub Actions**
- Custom domain: `eliotcaroom.com`
- Enforce HTTPS: on (once available)

**Cloudflare → eliotcaroom.com → DNS → Records** (all **DNS only / grey cloud**)

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | ecaroom.github.io |

Turning the orange cloud (proxy) on breaks GitHub's HTTPS certificate renewal. Leave it grey.

**GitHub account → Settings → Pages → Verified domains:** `eliotcaroom.com` verified with a TXT record in Cloudflare (`_github-pages-challenge-ecaroom`). This stops anyone else's GitHub Pages site from claiming the domain. Don't delete that TXT record.

**Domain renewal:** auto-renew on at Cloudflare. Keep the card on file current and the account email one you'll still read in 10 years. Set a calendar reminder before the registration expires.

## 3. Editing the site with Claude

In a chat inside the claude.ai Project "eliotcaroom.com":
1. Claude attaches the repo (`ecaroom/eliotcaroomdotcom`, push access). This works because GitHub is connected to Claude and the **Claude GitHub App** is installed on this one repo only.
2. Claude reads `CLAUDE.md` and this file, edits, builds locally (`npm run build`) to catch errors, then commits and pushes to `main`.
3. The push triggers a deploy. The site updates about a minute later.

What Claude **cannot** do from a chat: change repo settings (Pages source, custom domain, HTTPS), change Cloudflare DNS, or reach web.archive.org. Those need Eliot in a browser.

If pushes are refused: check that the Claude GitHub App is still installed on the repo (github.com/apps/claude/installations/select_target), and that GitHub shows as connected in claude.ai Settings → Connectors.

## 4. Editing the site yourself

**Small text edits, no tools needed:** open the file on github.com, click the pencil icon, edit, "Commit changes" to `main`. The site redeploys automatically.

**On your own computer:**
```
git clone https://github.com/ecaroom/eliotcaroomdotcom
cd eliotcaroomdotcom
npm install
npm run dev        # live preview at http://localhost:4321
npm run build      # check it builds before pushing
git add -A && git commit -m "what changed" && git push
```
Requires Node.js (version 22 is what the site is built with).

## 5. Common tasks: which file to change

| Task | File | Notes |
|---|---|---|
| Add a project | `src/pages/projects.astro` | Add an entry at the **top** of `projects` (newest first): `name`, `href`, `ext` (true if external), `year`, `summary`. |
| Add or change a link | `src/pages/links.astro` | Add to `external`: `href`, `label`. |
| Edit professional work | `src/pages/work.astro` | One `<h2>` plus `<p>` per job. |
| Home page list | `src/pages/index.astro` | The `links` array. |
| Add evidence to the solar campaign | `src/pages/solar.astro` | Add to `evidence`. A standalone HTML evidence page goes in `public/solar/<name>/index.html`. |
| Publish any standalone HTML page | `public/<path>/index.html` | Served as-is at `eliotcaroom.com/<path>/`. Add the favicon link, a back link, and the theme-sync script (copy from `public/solar/pseg-rates/index.html`). |
| Write a post | `src/content/writing/<slug>.md` | Front matter: `title`, `date`, `summary`, `draft`. `draft: true` hides it from the site but it is still public in the repo. |
| Colors | `src/styles/global.css` | Tokens at the top: light in `:root`, dark in `:root[data-theme='dark']`. The site always opens in light; dark is only via the mode button. |
| Fonts | `src/layouts/Base.astro` (imports) and `--serif` in `global.css` | Fonts are self-hosted via `@fontsource/*` npm packages. |
| Tab icon | `public/favicon.svg` | Traced from the EB Garamond bold italic "e" with fontTools. Browsers cache icons: hard refresh to see changes. |
| Page title / link-preview text | `title` and `description` props on `<Base>` in each page | |

Conventions: external links get `target="_blank" rel="noopener"` and a ↗ marker; headings and nav are lowercased by CSS (write them in normal case in the source); no em dashes in site copy.

## 6. Checking a deploy

- **Repo → Actions tab:** each push shows a "Deploy to GitHub Pages" run. Green check = live. Red X = open it to read the error.
- A failed run can be retried with **Re-run all jobs**, or by pushing any new commit.
- If a push produced **no run at all**, trigger one from Actions → Deploy to GitHub Pages → **Run workflow**.

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Browser security warning on eliotcaroom.com | HTTPS certificate not issued yet, or proxy turned on | Confirm grey cloud on all records; in Pages settings, remove and re-save the custom domain to restart the check. |
| "DNS check in progress" for over 20 minutes | Stalled check | Remove the custom domain, save, re-enter it, save. |
| Site shows old content | Deploy failed or still running; browser cache | Check the Actions tab; hard refresh (Cmd+Shift+R). |
| Old tab icon | Browser icon cache | Hard refresh or open in a private window. |
| Build fails after an edit | Syntax error in an `.astro` file (unclosed tag, missing comma in an entry) | The Actions log names the file and line. |
| eliotcaroom.com doesn't load at all | DNS records changed or domain expired | Check Cloudflare DNS records against section 2, and the domain's expiry. |

## 8. Security rules (summary; details in `CLAUDE.md`)

- The repo is public: drafts and Git history are readable by anyone.
- Never commit API keys. Local keys go in `.env` (gitignored); build-time keys go in repo → Settings → Secrets and variables → Actions.
- Never commit raw backups of old sites; rebuild pages from them instead.
- 2FA on both GitHub and Cloudflare.
