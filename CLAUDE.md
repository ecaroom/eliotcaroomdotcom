# eliotcaroom.com: project brief

Source of truth for decisions about this site. Read this first in any thread; update it when a decision changes.

**How-to (hosting, settings, editing, deploys, troubleshooting): see `OPERATIONS.md`.**

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

## Palette (Eliot's named colors, 2026-09-26; all text meets WCAG AA)

Source colors: Chelsea Cucumber `#9aa459`, Pigeon Post `#b0ccd9`, Birch `#34361f`, Kelp `#4f4f36`.

- **Light:** page Pigeon Post, header band Chelsea Cucumber, headings rich dark brown `#4e2c1c` (7.3:1), body Birch (7.4:1), secondary text Kelp (5.0:1), links deep blue `#2d5061` (5.1:1, derived from Pigeon Post), rules Chelsea Cucumber.
- **Dark:** page chocolate `#3b2418`, header band darker chocolate `#28170f`, headings Pigeon Post (8.6:1), body pale Pigeon Post `#d6e4eb` (11.1:1), secondary text light Chelsea Cucumber `#cdd494` (9.3:1), links `#e4eef2`, rules `#5e3d2b`.
- **Visitors always start in light mode** (Eliot's choice, 2026-09-26), regardless of their system setting. Dark mode only via the mode button, remembered per visitor. The PSE&G page follows the same rule.
- Replaced the earlier photo-derived palette (climbing / evening sky).

## Type

- **EB Garamond** everywhere (name, headings, nav, body), self-hosted via `@fontsource/eb-garamond`. Eliot chose it 2026-09-26 (briefly used Crimson Pro first; Newsreader also considered).
- Monospace (system) only for small UI bits: list numbers, top bar, archive/rss line.
- Favicon: EB Garamond bold italic lowercase "e" traced to an SVG path, white with black outline.

## Repo layout

- `src/pages/` : one file per page (index, projects, work, links, writing, podcasts, archive)
- `src/content/writing/` : posts as Markdown (`title`, `date`, `summary`, `draft`)
- `src/layouts/Base.astro` : shared header, nav, footer
- `src/styles/global.css` : all styles, light and dark
- `.github/workflows/deploy.yml` : build and deploy
- `public/CNAME` : custom domain
- `src/pages/about.astro` + `public/about/climb.jpg` : About page. Photo: Eliot at the top of a climbing route (chosen over a photo with a public figure and a family photo; no child's face on the public site). Text is Eliot's own line, kept lowercase as he wrote it.
- **Photo backdrop** (`.backdrop` in `Base.astro` + global.css): on screens 720px+ the climbing photo sits behind every page and shows as side borders around the solid text column; hidden on phones. About page uses `photoPage` prop: full photo background at all sizes, zoomed toward Eliot, text in solid `.panel` boxes. Dark mode dims the photo with a brown overlay. Photo is the high-res portrait version (resized to 1800x2400, ~1.2 MB); Photo pinned to the top edge on all pages (more trees and sky than rock). About: no zoom on wide screens, 1.5x on phones; title and line are full-width panels stacked at the top so Eliot stays visible below.
- `src/pages/solar.astro` : "Common Sense Solar Savings for Roselle Park, NJ" campaign page (renamed from "Accelerating solar for Roselle Park" 2026-09-27; URL stays /solar/), live (merged 2026-09-26). Centered on the borough Electricity budget line (31-430), the line solar can offset: CSS bar chart of paid-or-charged 2021-2025 plus 2026 budget (2025 actual and 2026 appropriation from the 2026 Introduced Budget; the adopted 2026 budget is a scan) (2023 from the 2023 audit, Exhibit A-3, since the 2024 budget PDF is a scan), table view, then short sections on no-upfront-cost financing / the Dec 31, 2027 federal deadline and NJ climate, and an "Ask Our Candidates" section: mayoral race first (larger type), then Borough Council (at-large, 1st Ward), then the five questions (`.asks` style in global.css). Headings on this page are title case (page-scoped override of the site's lowercase headings, Eliot's call 2026-09-26: more formal). No evidence list at the bottom; sources are linked in place. Streetlights (31-435) are explicitly out of scope. **Source pattern:** web pages link in place (↗); long PDFs where the figure is buried (budgets, BPU orders) open in a side panel (`<dialog class="sidecar">`, triggered by `button.doc`, marker ⧉) showing the exact figures and where they sit, with a link to the full PDF. Bottom sheet on phones.
- `src/pages/left-bank-66.astro` + `public/left-bank-66/cover.jpg` : Left Bank '66 write-up restored from v2 (prose page pattern: `.meta` date line, `figure`, `blockquote`, `.signoff` in global.css)
- `src/pages/video.astro` : "Video & visual work" page (name revived from v2), one row on Projects. Videos listed in a `videos` array (YouTube ID, title, year, note), newest first.
- `public/solar/pseg-rates/index.html` : PSE&G rate history page, standalone HTML with its own styles (built in the "PSE&G electricity rate history" thread); only a back link, favicon and site theme sync were added. Now includes Roselle Park budget spending (Electricity 31-430, Street Lighting 31-435, 2018-2025); keep the back link, favicon and theme script when replacing it again.

## Rules

- **The repo is public.** Everything committed is readable, including drafts and Git history.
- **No secrets in the repo.** Local keys go in `.env` (gitignored). Build-time keys go in GitHub Actions secrets. Data projects fetch at build time and commit data files, never keys. No private keys in browser code.
- **No raw backups of old sites.** Rebuild old sections from backups; never commit the backups themselves (they may contain passwords or personal data).
- **No unpublished work-related material** (e.g. FactSet) until Eliot has cleared it.
- **Site copy follows Eliot's style guide.** No em dashes.
- **External links open in a new tab** (`target="_blank" rel="noopener"`) and carry a ↗ marker. **Internal links carry a → marker** (Eliot 2026-09-27: internal links weren't obvious) and open in the same tab: `.int-inline` in tables, automatic on `.links` lists, written into badge text. Links inside paragraphs rely on underline and need no marker.
- Commit author email: the GitHub noreply address, not a personal email.
- **Media hosting (decided 2026-09-26):** photos live in the repo, resized for web (about 2000px long edge, a few hundred KB). **Never commit video files** (GitHub's 100 MB file cap, the 1 GB Pages limit, and deleted files stay in public Git history). Video goes on YouTube, embedded via `youtube-nocookie.com` in a responsive 16:9 wrapper (`.video-embed`). Cloudflare R2 plus a plain `<video>` tag is the fallback for short clips that shouldn't be on YouTube. For work Eliot made as an employee, check ownership first; if the employer's copy is online, link or embed that rather than re-hosting.

## Workstreams

Each gets its own thread in the claude.ai Project "eliotcaroom.com", with this repo attached.

1. **Setup and infrastructure:** done except HTTPS confirmation (see Status).
2. **Design:** direction set 2026-09-26: minimalist, web-native, mainly links to other things. Reference: lynnandtonic.com (structure only: big name, numbered link list, mode toggle, version label). Home is built this way. Version label (v.3) removed 2026-09-26: not relevant to visitors; the site is still v3. No tagline (Eliot: not needed). Home list: projects, work, links, about; below it two equal-width badges (15rem each) side by side: Common Sense Solar Savings (first, links to /solar/, highlighted with light yellow-green fill `#e2e8a6` and dark brown text in both modes) and Wait Until 8th (second; original text badge in site style, not their logo, links to the take-the-pledge page); then archive and rss in a small line. Lowercase name, nav and headers via CSS text-transform. Audience: mainly people interested in Eliot's projects; not primarily for job hunting (LinkedIn covers that), but nothing that would put off an employer.
3. **Content:** Projects is a borderless table of individual projects (name, what, year), newest first, edited in `src/pages/projects.astro`. Writing and podcasts pages exist but are not linked from Projects. Work, Links pages. Tone: balance professional, side projects and creative/personal; not arrogant, not a job pitch.
4. **Archive:** decided 2026-09-26: **no full rebuild of old sites.** Eliot picks the pieces he liked from old versions and they become individual entries on Projects (own page when there's enough content, otherwise just a row). Sources: backup files first, Wayback second. Light edits allowed when porting (style guide dashes, dead links removed, Google redirect links made direct); note edits in a comment at the top of the page.
5. **Data journalism / coding projects:** later.

## Status

- 2026-09-26: Site live. DNS check successful; tick Enforce HTTPS once the certificate is issued. Technical runbook written to `OPERATIONS.md`.
- 2026-09-26 (archive): v2 (live roughly 2015-2020) is not in the backup folder. Source is the Wayback Machine (known snapshot: web.archive.org/web/20220120055504/http://www.eliotcaroom.com/; confirm it is v2 and not a later version). Claude's web tools cannot reach web.archive.org, so Eliot downloads the snapshots locally and attaches a zip.
- 2026-09-26 (archive): v2 identified from a saved Wayback page: WordPress 4.7.22, Inkness theme (InkHive), dark teal background `#003d44`. Nav: Product Manager, ESG Research, Writing & editing (Business reporting, Poetry Preserve), projects (Left Bank '66, Video & Visual Work, external link to Rock and Ice climbing accidents report). Posts: Left Bank '66 (2014), Star-Ledger photography (2011), Nonstagram (2010), "Passing the Axe" jazz history chapter (2010), NY Press reviews (2010). Categories: projects, visual, writing. Left Bank '66 post text recovered; its second image (`Screen-Shot-2018-04-14-at-12.35.00-AM.png`) still missing.
- 2026-09-26 (content): Video & visual work page built on branch `video-page` with its first entry, "Nobody" (Eliot's interview at Marco Benevento's house in Brooklyn about his cover of "Nobody Does It Better", youtube.com/@eliotter2). **Not merged: waiting on the year** (placeholder `YEAR` in `video.astro` and `projects.astro`; the year also sets the row's position on Projects).
- 2026-09-26 (archive): Left Bank '66 ported to `/left-bank-66/` and added to Projects (2013). Dead links dropped: City Paper (domain gone), CD Baby (store closed). Amazon link could not be verified and was left out; Apple Music link verified. Kickstarter description is JS-rendered, so its text and images could not be pulled; linked instead.
- 2026-09-26 (solar): Pitch for the Nov 2026 mayoral/council race drafted for three uses: candidate survey, FB/IG ads, landing page. Landing page merged to main for Eliot's review on the live site (no traffic yet). Survey and ad copy live in the thread, not the repo. The candidate email draft (with candidates' emails) is a private doc in the claude.ai Project, `solar/candidate-email.md`, never the repo. Plan: email all six privately, replies due Wed Oct 7, publish answers on /solar Fri Oct 9, ads Oct 10-23 (early voting Oct 24-Nov 1). Candidates on the Nov 3, 2026 ballot (per Eliot, 2026-09-26): Mayor, Joseph Signorello Jr. (D, incumbent) and Khanjan Patel (R); Council at-large, Adolfo Dicosmo (D) and Jorge Ramirez (R); 1st Ward council, Jorge E. Casalins (D) and Mariann Brenner (R). Contact details stay out of the repo. Figures checked 2026-09-26.
- 2026-09-26 (solar): Landing page now leads with borough spending: $326,586 on electricity + streetlights in 2024, +27% vs 2022 (verified against the 2023 Adopted and 2025 Introduced budgets, Sheet 17). 2024 lines were raised midyear ($105k to $120k, $205k to $215k); 2025 electricity appropriation $115k. 2023 actuals still missing. Rooftop solar offsets building electricity, not the streetlight line (separate unmetered tariff).
- 2026-09-26 (solar): Page rewritten to be concise and focus on the Electricity line: $113,549 in 2024, +26% vs $90,227 in 2022; 2024 budget raised midyear $105k to $120k; 2025 budgeted $115k (1% above 2024 spending). All chart years verified against Sheet 17 of the 2019-2025 budgets. Pending Eliot's review. Survey and ad copy (in the thread) still use the combined electricity + streetlight figure and need the same narrowing.
- 2026-09-26 (solar): Eliot's edits applied: title-case headings, his framing paragraph as paragraph two, cost section retitled "Escalating Electric Costs Can Be Mitigated with Solar" with only the percent change (+26%, 2022 to 2024), chart starts 2021, 2023 filled in ($100,156.60, 2023 Report of Audit, Suplee Clooney), Q5 names Sandy, Irene and Ida, evidence section removed. 2020's $136,822 is unexplained in the budget and the 2020 audit (budget raised $102k to $142k midyear); an OPRA request for 2020 PSE&G invoices or the council's transfer resolution would answer it.
- 2026-09-26 (solar): Added the 2026 Introduced Budget (Sheet 17): Electricity 2025 raised midyear $115k to $140k, spent $124,730.35; 2026 appropriation $142,000. Street Lighting 2025 spent $229,472.28, 2026 $259,000. Page headline is now +32% electricity spending, 2021 to 2025. Rate-history page table updated with 2023 (audit), 2025 actuals and 2026 appropriations.
- 2026-09-26 (solar): Voice rule for this page (Eliot): refer to Roselle Park as "we/our" ("our own budgets"), not "the borough"/"its". Financing heading is "It Can Cost Taxpayers Nothing Up Front"; Union County / Board of Ed 2012 example removed as not relevant.
- 2026-09-26 (solar): Added Eliot's photo `public/solar/kenilworth-106.jpg` (business sign reading 106°, N. Michigan Ave., Kenilworth, July 2026) to the climate section, re-encoded with no metadata. Caption is Eliot's own wording.
