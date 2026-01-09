# Specification: Photo Gallery Integration with Responsive Images

## Overview

This task integrates a responsive photo gallery feature from the reference project (tannerdolby/eleventy-photo-gallery) into the Rita Tomforde portfolio website. The implementation will add the `@11ty/eleventy-img` plugin for automatic image optimization and responsive image generation, download sample images from the reference repository, and create a dedicated photo gallery page with modern responsive image techniques.

## Workflow Type

**Type**: feature

**Rationale**: This task adds new functionality to an existing Eleventy site by integrating a complete photo gallery system with image processing capabilities. It requires installing new dependencies, creating new templates and data files, and adding CSS styles - typical of a feature implementation workflow.

## Task Scope

### Services Involved
- **main** (primary) - The Eleventy static site generator that will process templates and images

### This Task Will:
- [ ] Install `@11ty/eleventy-img` package for image processing
- [ ] Configure image shortcode/plugin in `eleventy.config.js`
- [ ] Download sample images from the reference repository to `src/images/gallery/`
- [ ] Create `src/_data/gallery.json` with image metadata for the photo gallery
- [ ] Create `src/gallery.njk` template for the photo gallery page
- [ ] Add responsive gallery CSS styles to `src/css/styles.css`
- [ ] Add navigation link to the gallery page in `src/_includes/nav.njk`

### Out of Scope:
- Lightbox functionality (can be added later)
- Individual image detail pages (feature.njk pattern)
- SCSS preprocessing (project uses plain CSS)
- Social media meta tags (eleventy-plugin-metagen)
- Complex navigation plugins

## Service Context

### Main (Eleventy Site)

**Tech Stack:**
- Language: JavaScript
- Framework: Eleventy v3.0.0
- Template Engine: Nunjucks (.njk)
- Key directories: `src/`, `src/_data/`, `src/_includes/`, `src/css/`, `src/images/`

**Entry Point:** `eleventy.config.js`

**How to Run:**
```bash
npm run dev
```

**Port:** 8080 (Eleventy default)

**Build Command:**
```bash
npm run build
```

## Files to Modify

| File | Service | What to Change |
|------|---------|---------------|
| `eleventy.config.js` | main | Add eleventy-img plugin configuration and async image shortcode |
| `src/css/styles.css` | main | Add photo gallery grid styles with responsive layout |
| `src/_includes/nav.njk` | main | Add navigation link to the new gallery page |
| `package.json` | main | Will be updated automatically by npm install |

## Files to Create

| File | Service | Purpose |
|------|---------|---------|
| `src/_data/gallery.json` | main | Image metadata array for the photo gallery |
| `src/gallery.njk` | main | Photo gallery page template |
| `src/images/gallery/*.jpg` | main | Downloaded sample images from reference repo |

## Files to Reference

These files show patterns to follow:

| File | Pattern to Copy |
|------|----------------|
| `src/_data/paintings.json` | Existing data structure pattern for JSON data files |
| `src/index.njk` | Template structure with layout, sections, and data iteration |
| `src/css/styles.css` | CSS variable usage, gallery-grid class patterns |
| `src/_includes/nav.njk` | Navigation link structure |

## Patterns to Follow

### 1. Data File Structure Pattern

From `src/_data/paintings.json`:

```json
{
  "paintings": [
    {
      "id": "painting-1",
      "title": "Blumenwiese",
      "image": "/images/gallery/painting-1.jpg",
      "description": "Eine farbenfrohe Darstellung...",
      "technique": "Acryl auf Leinwand",
      "year": 2024,
      "available": true
    }
  ]
}
```

**Key Points:**
- Use descriptive field names in German where appropriate for this German-language site
- Include alt text (description) for accessibility
- Group items under a named array property

### 2. Gallery JSON Schema (from reference project)

```json
{
  "images": [
    {
      "src": "highway-water.jpg",
      "alt": "Skybridge over highway covered in water",
      "title": "Highway covered in water",
      "credit": "Photo by Josh Hild",
      "linkToAuthor": "https://www.pexels.com/..."
    }
  ]
}
```

**Key Points:**
- `src` is just the filename (directory is configured in shortcode)
- `alt` text is required and must be descriptive
- Include credit attribution for stock photos

### 3. Eleventy Image Shortcode Pattern

From research findings - register as Nunjucks async shortcode:

```javascript
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, widths = [300, 600, 900], sizes = "(min-width: 400px) 33.3vw, 100vw") {
  if (!alt) {
    throw new Error(`Missing alt text for image: ${src}`);
  }

  let metadata = await Image(src, {
    widths: widths,
    formats: ["webp", "jpeg"],
    outputDir: "./_site/img/",
    urlPath: "/rita-tomforde/img/"
  });

  return Image.generateHTML(metadata, {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  });
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
};
```

**Key Points:**
- Must be registered as **async Nunjucks shortcode** (`addNunjucksAsyncShortcode`)
- Validate alt text presence
- Use `urlPath` with the project's path prefix (`/rita-tomforde/`)
- Include `loading="lazy"` and `decoding="async"` for performance

### 4. CSS Grid Pattern for Gallery

From existing `src/css/styles.css` gallery pattern:

```css
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-md);
}

.gallery-item {
    background-color: var(--color-background);
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}
```

**Key Points:**
- Use CSS custom properties from the existing design system
- Use CSS Grid with `auto-fill` for responsive columns
- Include hover transitions for interactivity

## Requirements

### Functional Requirements

1. **Responsive Image Generation**
   - Description: Images are automatically processed at build time to generate multiple sizes and formats (WebP + JPEG)
   - Acceptance: Build generates responsive variants in `_site/img/` directory

2. **Photo Gallery Page**
   - Description: Dedicated page displaying sample images in a responsive grid layout
   - Acceptance: Gallery page accessible at `/gallery/` with all images visible

3. **Image Optimization**
   - Description: All gallery images include lazy loading and async decoding attributes
   - Acceptance: Generated `<picture>` elements include `loading="lazy"` and `decoding="async"`

4. **Alt Text Validation**
   - Description: All images must have alt text for accessibility
   - Acceptance: Build fails if any image is missing alt text

5. **Navigation Integration**
   - Description: Gallery page is accessible from main navigation
   - Acceptance: "Galerie" link in navigation leads to the gallery page

### Edge Cases

1. **Missing Image File** - Build should fail gracefully with clear error message
2. **Invalid Image Format** - Only process supported formats (jpg, png, webp)
3. **SVG Images** - Should pass through without raster processing (use svgShortCircuit)
4. **Very Large Images** - Resize to reasonable maximum width (e.g., 1200px)
5. **Empty Gallery Data** - Display appropriate message when no images in gallery.json

## Implementation Notes

### DO
- Follow the pattern in `src/_data/paintings.json` for data structure
- Reuse CSS custom properties from `src/css/styles.css`
- Use the existing `.gallery-grid` class pattern for layout
- Include `pathPrefix` in `urlPath` for GitHub Pages compatibility
- Use WebP with JPEG fallback for browser compatibility
- Add `loading="lazy"` for performance
- Validate alt text in the shortcode

### DON'T
- Don't use AVIF format (expensive build time, not needed)
- Don't create new CSS variables when existing ones work
- Don't modify existing gallery section on index.njk (separate page)
- Don't use transform plugin if shortcode gives more control needed
- Don't skip image credits/attribution for stock photos

## Development Environment

### Start Services

```bash
# Install dependencies
npm install @11ty/eleventy-img

# Start development server
npm run dev
```

### Service URLs
- Development Server: http://localhost:8080/rita-tomforde/
- Gallery Page: http://localhost:8080/rita-tomforde/gallery/

### Required Environment Variables
- None required for local development

## Sample Images to Download

Download from https://github.com/tannerdolby/eleventy-photo-gallery/tree/master/src/images:

| Filename | Credit |
|----------|--------|
| `highway-water.jpg` | Photo by Josh Hild |
| `boardwalk.jpg` | Photo by Vlad Bagacian |
| `business-center.jpg` | Photo by Vlad Bagacian |
| `empty-road.jpg` | Photo by Craig Adderley |
| `gas-station.jpg` | Photo by Sourabh |
| `glass-jar.jpg` | Photo from Pexels |
| `highrises-night.jpg` | Photo from Pexels |
| `light-streaks.jpg` | Photo from Pexels |
| `music-hall.jpg` | Photo from Pexels |
| `terrace-window.jpg` | Photo from Pexels |
| `water-drop.jpg` | Photo from Pexels |
| `benches.jpg` | Photo from Pexels |

## Success Criteria

The task is complete when:

1. [ ] `@11ty/eleventy-img` package is installed
2. [ ] Image shortcode configured in `eleventy.config.js`
3. [ ] Sample images downloaded to `src/images/gallery/`
4. [ ] `src/_data/gallery.json` created with image metadata
5. [ ] `src/gallery.njk` template renders gallery page
6. [ ] Gallery styles added to `src/css/styles.css`
7. [ ] Navigation updated with gallery link
8. [ ] `npm run build` completes without errors
9. [ ] Responsive images generated in `_site/img/`
10. [ ] Gallery page displays correctly at `/rita-tomforde/gallery/`
11. [ ] No console errors in browser
12. [ ] Images load with lazy loading enabled

## QA Acceptance Criteria

**CRITICAL**: These criteria must be verified by the QA Agent before sign-off.

### Unit Tests
| Test | File | What to Verify |
|------|------|----------------|
| Image shortcode alt validation | `eleventy.config.js` | Shortcode throws error when alt text missing |
| Gallery data structure | `src/_data/gallery.json` | Valid JSON with required fields (src, alt) |

### Integration Tests
| Test | Services | What to Verify |
|------|----------|----------------|
| Build with image processing | Eleventy + eleventy-img | Build generates responsive images in _site/img/ |
| Gallery page rendering | Eleventy + Nunjucks | Gallery template renders with image shortcode output |

### End-to-End Tests
| Flow | Steps | Expected Outcome |
|------|-------|------------------|
| Navigate to gallery | 1. Open homepage 2. Click "Galerie" in nav | Gallery page loads with images |
| View responsive images | 1. Open gallery 2. Resize browser | Images adapt to viewport size |
| Check lazy loading | 1. Open gallery 2. Scroll down | Images load as they enter viewport |

### Browser Verification (if frontend)
| Page/Component | URL | Checks |
|----------------|-----|--------|
| Gallery Page | `http://localhost:8080/rita-tomforde/gallery/` | All images display, grid is responsive |
| Navigation | `http://localhost:8080/rita-tomforde/` | Gallery link visible and clickable |
| Image Elements | Gallery page | `<picture>` elements with `<source>` for WebP |

### Build Verification
| Check | Command | Expected |
|-------|---------|----------|
| Build succeeds | `npm run build` | Exit code 0, no errors |
| Images generated | `ls _site/img/` | Multiple sizes/formats per image |
| Gallery HTML generated | `ls _site/gallery/` | index.html exists |

### QA Sign-off Requirements
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All E2E tests pass
- [ ] Browser verification complete
- [ ] Build generates responsive images correctly
- [ ] No regressions in existing functionality
- [ ] Code follows established patterns (CSS variables, template structure)
- [ ] No security vulnerabilities introduced
- [ ] Alt text present on all images (accessibility)
- [ ] Lazy loading working (performance)
