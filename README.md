# Rita Tomforde Artist Portfolio Website

Portfolio website for German painter Rita Tomforde - built with Eleventy (11ty).

## Quick Start

**IMPORTANT**: This project uses a git worktree. Run all commands from this directory:

```bash
cd /Users/yaron/rita-tomfordede/.worktrees/001-in-diesem-projekt-soll-eine-website-f-r-die-maleri
```

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open http://localhost:8080 in your browser.

### Production Build

```bash
npm run build
```

Output is generated in the `_site/` directory.

## Project Structure

```
.
├── src/
│   ├── _data/           # Data files (site.json, paintings.json)
│   ├── _includes/       # Nunjucks templates (base.njk, nav.njk, footer.njk)
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript
│   ├── images/          # Images and gallery
│   └── index.njk        # Main page
├── eleventy.config.js   # Eleventy configuration
├── package.json         # Dependencies and scripts
└── .github/workflows/   # GitHub Actions deployment
```

## Deployment

The site automatically deploys to GitHub Pages when pushing to the `main` branch via GitHub Actions.

## Content Sections

1. Hero - "Atelier Rita Tomforde"
2. Herzlich Willkommen - Welcome message
3. Über mich - Biography
4. Inspiration - Artistic motivation
5. Dankbarkeit - Gratitude section
6. Bisherige Präsentationen - Past exhibitions
7. Aktuelles - Current events (2026)
8. Galerie - Painting gallery

## Technology

- **Static Site Generator**: Eleventy 3.x
- **Templating**: Nunjucks
- **Styling**: Vanilla CSS with custom properties
- **Deployment**: GitHub Actions → GitHub Pages
