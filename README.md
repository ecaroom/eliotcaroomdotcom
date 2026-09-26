# eliotcaroom.com

Source for [eliotcaroom.com](https://eliotcaroom.com), built with [Astro](https://astro.build) and deployed to GitHub Pages on every push to `main`.

## Where things live

- `src/pages/` : one file per page (Career, Projects, Podcasts, Archive)
- `src/content/writing/` : posts as Markdown. Set `draft: true` to keep one off the site. Drafts are still visible in this public repo.
- `src/layouts/Base.astro` : shared header, nav and footer
- `src/styles/global.css` : all styles

## Local preview

    npm install
    npm run dev

## Secrets

Never commit API keys. Put local keys in `.env` (ignored by Git). Keys needed at build time go in the repo's GitHub Actions secrets.
