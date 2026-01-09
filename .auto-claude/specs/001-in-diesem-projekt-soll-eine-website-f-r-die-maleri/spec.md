# Specification: Rita Tomforde Artist Portfolio Website

## Overview

Build a complete portfolio website for German painter Rita Tomforde using 11ty (Eleventy) static site generator, deployed to GitHub Pages. The website must visually replicate the design of https://www.silke-siemers.de (~100% visual similarity) while containing custom German-language content about the artist's biography, inspiration, exhibitions, and artwork gallery. This is a greenfield project requiring setup from scratch.

## Workflow Type

**Type**: feature

**Rationale**: This is a new feature implementation creating a complete website from scratch. No existing codebase to modify or migrate. Requires setting up project structure, implementing multiple components (navigation, hero, sections, gallery), and configuring deployment pipeline.

## Task Scope

### Services Involved
- **eleventy-site** (primary) - Static site generator handling content, templates, and build
- **github-pages** (deployment) - Hosting and automated deployment via GitHub Actions

### This Task Will:
- [ ] Initialize 11ty project with proper directory structure
- [ ] Create Nunjucks base layout and reusable components
- [ ] Implement all content sections (Welcome, About, Inspiration, Gratitude, Exhibitions, Current Events, Gallery)
- [ ] Build responsive CSS matching silke-siemers.de design system
- [ ] Set up image optimization for gallery paintings
- [ ] Configure GitHub Actions workflow for automated deployment
- [ ] Create data-driven gallery from paintings.json

### Out of Scope:
- Backend/database functionality (static site only)
- User authentication or admin panel
- E-commerce/payment processing (contact-based inquiries only)
- Multi-language support (German only)
- CMS integration

## Service Context

### Eleventy Static Site

**Tech Stack:**
- Language: JavaScript (Node.js 18+)
- Framework: Eleventy (11ty) v3.x
- Templating: Nunjucks (.njk)
- Styling: Vanilla CSS with custom properties
- Image Optimization: @11ty/eleventy-img

**Entry Point:** `eleventy.config.js`

**How to Run:**
```bash
npm install
npm run dev    # Development server with hot reload
npm run build  # Production build
```

**Port:** 8080 (default Eleventy dev server)

### GitHub Pages Deployment

**Tech Stack:**
- CI/CD: GitHub Actions
- Hosting: GitHub Pages (gh-pages branch)
- Action: peaceiris/actions-gh-pages@v3

**Entry Point:** `.github/workflows/deploy.yml`

**How to Deploy:**
```bash
git push origin main  # Triggers automatic deployment
```

## Files to Modify

| File | Service | What to Change |
|------|---------|---------------|
| `package.json` | eleventy-site | Create with 11ty dependencies |
| `eleventy.config.js` | eleventy-site | Create with input/output config, passthrough, image plugin |
| `src/_includes/base.njk` | eleventy-site | Create base HTML layout with head, nav, footer |
| `src/_includes/nav.njk` | eleventy-site | Create navigation component |
| `src/_includes/footer.njk` | eleventy-site | Create footer with contact/legal links |
| `src/index.njk` | eleventy-site | Create main page with all sections |
| `src/css/styles.css` | eleventy-site | Create CSS matching reference design |
| `src/_data/paintings.json` | eleventy-site | Create gallery data structure |
| `src/_data/site.json` | eleventy-site | Create global site metadata |
| `.github/workflows/deploy.yml` | github-pages | Create deployment workflow |
| `.nojekyll` | github-pages | Create empty file to disable Jekyll |

## Files to Reference

These files show patterns to follow:

| File | Pattern to Copy |
|------|----------------|
| https://www.silke-siemers.de | Visual design, layout structure, color scheme, typography |
| 11ty Starter Templates | Nunjucks layout inheritance, data cascade |
| GitHub Actions Examples | peaceiris/actions-gh-pages workflow pattern |

## Patterns to Follow

### Eleventy Project Structure

```
rita-tomfordede/
├── src/
│   ├── _data/
│   │   ├── site.json          # Global site metadata
│   │   └── paintings.json     # Gallery artwork data
│   ├── _includes/
│   │   ├── base.njk           # Base HTML layout
│   │   ├── nav.njk            # Navigation partial
│   │   └── footer.njk         # Footer partial
│   ├── css/
│   │   └── styles.css         # Main stylesheet
│   ├── images/
│   │   ├── portraits/         # Artist photos
│   │   └── gallery/           # Painting images
│   └── index.njk              # Main page
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions
├── eleventy.config.js         # Eleventy configuration
├── package.json               # Node dependencies
├── .nojekyll                  # Disable Jekyll processing
└── .gitignore                 # Ignore _site, node_modules
```

**Key Points:**
- Input directory is `src/`, output is `_site/`
- Data files in `_data/` are automatically available in templates
- Partials in `_includes/` use `{% include %}` syntax

### Nunjucks Template Inheritance

From base.njk pattern:

```njk
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} | {{ site.name }}</title>
    <link rel="stylesheet" href="{{ '/css/styles.css' | url }}">
</head>
<body>
    {% include "nav.njk" %}
    <main>
        {{ content | safe }}
    </main>
    {% include "footer.njk" %}
</body>
</html>
```

**Key Points:**
- Use `| url` filter for all paths (critical for GitHub Pages path prefix)
- German language attribute `lang="de"`
- Include partials for reusable components

### Data-Driven Gallery

From paintings.json pattern:

```json
{
  "paintings": [
    {
      "id": "painting-1",
      "title": "Bildtitel",
      "image": "gallery/painting-1.jpg",
      "description": "Beschreibung des Bildes",
      "technique": "Acryl auf Leinwand",
      "year": 2024,
      "available": true
    }
  ]
}
```

Template iteration:
```njk
{% for painting in paintings.paintings %}
<article class="gallery-item">
    <img src="{{ painting.image | url }}" alt="{{ painting.title }}" loading="lazy">
    <h3>{{ painting.title }}</h3>
    <p>{{ painting.technique }}, {{ painting.year }}</p>
</article>
{% endfor %}
```

**Key Points:**
- Use `loading="lazy"` for gallery images
- Structure supports filtering by availability
- Consistent naming convention for image files

### CSS Design System (Reference Site)

```css
:root {
    /* Colors */
    --color-primary: #000000;
    --color-secondary: #ffffff;
    --color-accent: #00d1b2;
    --color-text: #333333;
    --color-text-light: #666666;

    /* Typography */
    --font-family: 'Georgia', serif;
    --font-size-small: 13px;
    --font-size-base: 16px;
    --font-size-medium: 20px;
    --font-size-large: 36px;
    --font-size-xlarge: 42px;

    /* Spacing */
    --spacing-unit: 24px;
    --spacing-section: calc(var(--spacing-unit) * 3);

    /* Breakpoints (mobile-first) */
    /* sm: 767px, md: 880px, lg: 1024px */
}

/* Mobile-first responsive approach */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-unit);
}

@media (min-width: 768px) {
    /* Tablet styles */
}

@media (min-width: 1024px) {
    /* Desktop styles */
}
```

**Key Points:**
- CSS custom properties for consistent theming
- Mobile-first breakpoint approach
- Generous whitespace (24px base unit)
- Serif typography for elegant artist portfolio feel

### GitHub Actions Deployment

From deploy.yml pattern:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - run: npm run build
        env:
          ELEVENTY_ENV: production

      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

**Key Points:**
- Node 20 LTS for best compatibility
- Use `npm ci` for reproducible builds
- Publish `_site` directory to gh-pages branch

## Requirements

### Functional Requirements

1. **Navigation Header**
   - Description: Fixed or sticky navigation with site logo/title and section links
   - Acceptance: Navigation visible on all viewport sizes, mobile hamburger menu on small screens

2. **Hero Section**
   - Description: Full-width hero with "Atelier Rita Tomforde, Freischaffende Künstlerin / Malerei" and artist photo
   - Acceptance: Photo placeholder visible, text legible on all devices

3. **Welcome Section (Herzlich Willkommen)**
   - Description: Brief greeting text welcoming visitors
   - Acceptance: Section displays provided German welcome text

4. **About Section (Über mich)**
   - Description: Biography covering 30-year artistic journey from silk painting to acrylic/mixed media
   - Acceptance: Full biography text displayed with proper typography

5. **Inspiration Section**
   - Description: Artist's motivations, themes (abstract, flowers, landscapes, emotions, Christian hope)
   - Acceptance: Complete inspiration text displayed

6. **Gratitude Section (Dankbarkeit)**
   - Description: Retirement reflection, studio evolution from basement to proper atelier
   - Acceptance: Full gratitude text displayed

7. **Past Exhibitions Section (Bisherige Präsentationen)**
   - Description: List of group exhibitions with venues
   - Acceptance: All 6+ exhibitions listed with proper formatting

8. **Current Events Section (Aktuelles)**
   - Description: Two upcoming 2026 exhibitions with dates, times, locations
   - Acceptance: March 2026 Kultur-Pop-up-Store and May 2026 KreARTiv-Markt details visible

9. **Gallery Section (Gallerie)**
   - Description: Grid of sellable paintings with contact CTA for viewing originals
   - Acceptance: Gallery grid displays placeholder images, contact call-to-action visible

10. **Footer**
    - Description: Contact information, possibly legal links (Impressum, Datenschutzerklärung)
    - Acceptance: Footer present on all pages

11. **Responsive Design**
    - Description: Website works on mobile, tablet, and desktop
    - Acceptance: No horizontal scroll, readable text, usable navigation on all devices

12. **GitHub Pages Deployment**
    - Description: Automated deployment on push to main branch
    - Acceptance: Site accessible at GitHub Pages URL after push

### Edge Cases

1. **Empty Gallery** - Display message "Bilder werden bald hinzugefügt" when paintings.json is empty
2. **Missing Images** - Show placeholder image with alt text for missing gallery images
3. **Long Text Overflow** - Ensure text containers handle varying content lengths gracefully
4. **Slow Network** - Gallery images use lazy loading to improve perceived performance
5. **JavaScript Disabled** - Site must be fully functional without JavaScript (progressive enhancement)

## Implementation Notes

### DO
- Follow the visual design of silke-siemers.de closely for layout, colors, typography
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Use `| url` filter on ALL internal paths in Nunjucks templates
- Include `.nojekyll` file in output to prevent GitHub Pages Jekyll processing
- Use `loading="lazy"` attribute on gallery images
- Set `lang="de"` on `<html>` element for German content
- Use CSS custom properties for easy theming/maintenance
- Keep all content in German

### DON'T
- Don't use a CSS framework (Tailwind, Bootstrap) - vanilla CSS to match reference site exactly
- Don't add JavaScript frameworks (React, Vue) - simple static site with minimal JS
- Don't hardcode paths without `| url` filter - breaks GitHub Pages subpath deployment
- Don't skip the path prefix configuration in eleventy.config.js
- Don't forget responsive breakpoints - reference site is mobile-friendly
- Don't use external CDN dependencies - self-host all assets

## Development Environment

### Start Services

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev
# or
npx @11ty/eleventy --serve

# Build for production
npm run build
# or
npx @11ty/eleventy
```

### Service URLs
- Development Server: http://localhost:8080
- GitHub Pages (after deployment): https://[username].github.io/rita-tomfordede/

### Required Environment Variables
- `ELEVENTY_ENV`: Set to `production` during GitHub Actions build (optional, for conditional logic)

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "npx @11ty/eleventy --serve",
    "build": "npx @11ty/eleventy",
    "build:prod": "ELEVENTY_ENV=production npx @11ty/eleventy"
  }
}
```

## Success Criteria

The task is complete when:

1. [ ] 11ty project structure is created with src/, _includes/, _data/ directories
2. [ ] Base Nunjucks layout renders HTML with proper head, nav, content, footer
3. [ ] All 8 content sections display with provided German text
4. [ ] CSS styles visually match silke-siemers.de design (colors, typography, spacing)
5. [ ] Gallery section iterates over paintings.json data
6. [ ] Site is responsive (mobile, tablet, desktop breakpoints)
7. [ ] GitHub Actions workflow deploys to gh-pages branch on push
8. [ ] Site loads without errors at GitHub Pages URL
9. [ ] No console errors in browser developer tools
10. [ ] All internal links work (navigation, section anchors)

## QA Acceptance Criteria

**CRITICAL**: These criteria must be verified by the QA Agent before sign-off.

### Unit Tests
| Test | File | What to Verify |
|------|------|----------------|
| Eleventy Builds | `_site/index.html` | Build completes without errors, HTML output generated |
| Data Loading | `_site/index.html` | paintings.json data accessible in templates |
| URL Filter | `_site/index.html` | All href/src attributes use proper paths |

### Integration Tests
| Test | Services | What to Verify |
|------|----------|----------------|
| Dev Server Start | eleventy | `npm run dev` starts server on port 8080 |
| Production Build | eleventy | `npm run build` generates complete _site/ directory |
| GitHub Actions | eleventy + github-pages | Workflow file is valid YAML, jobs defined correctly |

### End-to-End Tests
| Flow | Steps | Expected Outcome |
|------|-------|------------------|
| Full Page Load | 1. Open localhost:8080 | All sections render, no errors |
| Navigation | 1. Click nav links | Smooth scroll to sections |
| Gallery View | 1. Scroll to gallery | Images load lazily, grid displays |
| Mobile View | 1. Resize to 375px width | Hamburger menu, stacked layout |

### Browser Verification
| Page/Component | URL | Checks |
|----------------|-----|--------|
| Homepage | `http://localhost:8080/` | All 8 sections visible |
| Hero Section | Top of page | Artist name, subtitle, photo placeholder |
| Navigation | Header | All section links present |
| Gallery Grid | Gallery section | Placeholder images in grid layout |
| Footer | Bottom of page | Contact info visible |
| Mobile Layout | 375px viewport | Navigation collapses, sections stack |
| Tablet Layout | 768px viewport | Appropriate responsive adjustments |
| Desktop Layout | 1200px viewport | Full-width sections, multi-column gallery |

### Build Verification
| Check | Command | Expected |
|-------|---------|----------|
| Dependencies install | `npm install` | No errors, node_modules created |
| Dev server starts | `npm run dev` | Server running on localhost:8080 |
| Production build | `npm run build` | _site/ directory with index.html |
| HTML valid | Check _site/index.html | Valid HTML5, no syntax errors |
| CSS loads | Browser network tab | styles.css loaded successfully |
| Images referenced | Check _site/ | Image files in expected locations |

### Deployment Verification
| Check | Location | Expected |
|-------|----------|----------|
| Workflow file exists | `.github/workflows/deploy.yml` | Valid YAML file |
| .nojekyll exists | Root or _site/ | Empty file present |
| Path prefix configured | eleventy.config.js | pathPrefix set for repo name |

### QA Sign-off Requirements
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts development server
- [ ] `npm run build` generates _site/ output
- [ ] All 8 content sections render with German text
- [ ] CSS matches reference site visual design
- [ ] Navigation links work correctly
- [ ] Gallery grid displays (with placeholders if no images yet)
- [ ] Site is responsive at 375px, 768px, and 1200px widths
- [ ] No JavaScript console errors
- [ ] No broken image references
- [ ] GitHub Actions workflow file is valid
- [ ] .nojekyll file present for GitHub Pages
- [ ] All internal links use `| url` filter in source

## Content Reference

### Section Content (German)

**Hero:**
- Title: "Atelier Rita Tomforde"
- Subtitle: "Freischaffende Künstlerin / Malerei"

**Herzlich Willkommen:**
- "Ich freue mich sehr, dass Sie sich für meine Bilder interessieren."

**Über mich:** (Full biography provided in requirements)

**Inspiration:** (Full text provided in requirements)

**Dankbarkeit:** (Full text provided in requirements)

**Bisherige Präsentationen:**
- Gemeinschaftsausstellungen mit dem Aquarell-Club Altes Land:
  - im Burgmannshof in Horneburg
  - im Museum in Harsefeld
  - in der Sparkasse Altes Land in Jork
- Gemeinschaftsausstellung in der Wassermühle in Ovelgönne
- Gemeinschaftsausstellung im Jack-Pott in Klein-Reith
- Ausstellung auf dem Kunsthandwerksmarkt in Brest
- Mehrere Ausstellungen auf den KreARTiv-Märkten am URLA-HUS in Ohrel

**Aktuelles:**
- März 2026: Kultur-Pop-up-Store in Stade, Hökerstraße 33
  - Vernissage: 5. März 2026 ab 17:00 Uhr
  - Öffnungszeiten 06.-31. März: Mo-Sa 11-17 Uhr, So 14-16 Uhr
- 17. Mai 2026: KreARTiv-Markt am URLA-HUS in Ohrel bei Anderlingen, 11-17 Uhr

**Gallerie:**
- "Hier zeige ich Ihnen einige meiner aktuell verkäuflichen Bilder..."
- Contact CTA for viewing originals in Atelier in Reith

## Attached Assets

| File | Type | Usage |
|------|------|-------|
| `attachments/Bild 09.01.26 um 12.17.jpeg` | Image | Provided asset (to be reviewed for portrait or gallery use) |
