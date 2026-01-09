# Use Portrait Photo in Hero Section

## Overview

Replace the placeholder div in the hero section with the provided portrait photo of Rita Tomforde. The image file `Bild 09.01.26 um 12.17.jpeg` will be copied to `src/images/portraits/rita-portrait.jpg` and the HTML in `src/index.njk` will be updated to display the actual image.

## Workflow Type

Simple feature implementation - single file change with image addition.

## Task Scope

### Files to Modify
- `src/images/portraits/` - Add the new portrait image as `rita-portrait.jpg`
- `src/index.njk` - Replace placeholder div with actual image tag

### Change Details
1. Copy the attachment image `Bild 09.01.26 um 12.17.jpeg` to `src/images/portraits/rita-portrait.jpg`
2. In `src/index.njk`, replace the placeholder div:
   ```html
   <div class="hero-image-placeholder" aria-label="Porträt der Künstlerin">
       Porträtfoto
   </div>
   ```
   with an actual image:
   ```html
   <img src="/images/portraits/rita-portrait.jpg" alt="Porträt von Rita Tomforde" class="hero-image">
   ```

### Notes
- CSS for `.hero-image` already exists with proper styling (max-width: 300px, border-radius, box-shadow)
- The placeholder CSS can remain for fallback

## Success Criteria

- [ ] Portrait image displays in the hero section
- [ ] Image is properly styled (rounded, centered)
- [ ] No console errors
- [ ] Site builds successfully (`npm run build`)
