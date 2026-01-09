# Quick Spec: Header Banner mit Hintergrundbild

## Overview

Add a visually striking hero header at the top of the page with centered "Rita Tomforde" text and a background image to add color to the website. The goal is to enhance the existing `.hero` section to include a background image (using `painting-1.jpg` from the gallery) with a semi-transparent overlay for text readability.

## Workflow Type

**Type:** Feature implementation (new component enhancement)

This is a straightforward enhancement of an existing component with low risk.

## Task Scope

### Files to Modify
- `src/index.njk` - Update the hero section text and structure
- `src/css/styles.css` - Add background image styles to the hero section

### Change Details

**HTML changes:**
- Update `.hero-title` text from "Atelier Rita Tomforde" to "Rita Tomforde"
- Keep the subtitle and structure simple

**CSS changes:**
- Add `background-image` to `.hero` section using `/images/gallery/painting-1.jpg`
- Add `background-size: cover` and `background-position: center`
- Add a semi-transparent overlay or adjust text color/shadow for readability
- Ensure text remains white/light for contrast against the image

## Success Criteria

- [ ] Hero section displays with background image
- [ ] "Rita Tomforde" text is centered and readable
- [ ] Page loads without console errors
- [ ] Header looks good on mobile (responsive)
- [ ] Text has adequate contrast against the background image

## Notes

- Using existing `painting-1.jpg` as background image for simplicity
- If a specific header image is preferred later, it can easily be swapped
- The tint color (#FF1493) can be used for overlay to maintain brand consistency
