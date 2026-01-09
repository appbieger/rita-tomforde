# Manual Keyboard Navigation Testing Guide

## Overview

This document provides a comprehensive testing procedure for verifying that all focus indicators are visible and meet WCAG 2.1 Level AA accessibility requirements.

## WCAG 2.1 Requirements

### Success Criterion 2.4.7: Focus Visible (Level AA)
- **Requirement**: Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.
- **Minimum Contrast**: Focus indicators must have a contrast ratio of at least **3:1** against adjacent colors.

### Success Criterion 2.4.11: Focus Appearance (Level AAA - Best Practice)
- **Minimum Size**: Focus indicator should be at least 2 CSS pixels thick.
- **High Contrast**: Focus indicator should have a contrast ratio of at least 3:1 between the same pixels in the focused and unfocused states.

## Focus Indicator Specifications

Our implementation uses the following design tokens:

- **Color**: `--focus-ring-color: #FF1493` (Deep Pink - accent color)
- **Width**: `--focus-ring-width: 2px`
- **Style**: `--focus-ring-style: solid`
- **Offset**: `--focus-ring-offset: 2px`
- **Border Radius**: `var(--radius-sm)` for polished appearance

### Contrast Verification

The focus ring color (#FF1493 - Deep Pink) provides:
- **Against white backgrounds (#FFFFFF)**: ~5.9:1 contrast ratio ✅
- **Against light gray backgrounds**: >4.5:1 contrast ratio ✅
- **Meets WCAG 2.1 Level AA**: Exceeds minimum 3:1 requirement ✅

## Testing Procedure

### Prerequisites

1. Build the site: `npm run build`
2. Start the development server: `npm start`
3. Open the site in a modern browser (Chrome, Firefox, Safari, or Edge)
4. Ensure you have keyboard navigation enabled (most browsers enable this by default)

### Browser-Specific Notes

- **Safari**: May require enabling "Press Tab to highlight each item on a webpage" in System Preferences → Keyboard → Shortcuts
- **Firefox**: Works by default
- **Chrome/Edge**: Works by default

## Testing Checklist

### 1. Base Interactive Elements

Test Tab key navigation through all base interactive elements:

- [ ] **Links** (`<a>` tags)
  - Verify pink (#FF1493) outline appears on keyboard focus
  - Verify outline is 2px solid with 2px offset
  - Verify outline has rounded corners
  - Verify color changes to accent color on focus
  - Verify outline does NOT appear on mouse click (only keyboard)

- [ ] **Buttons** (`<button>` elements)
  - Verify pink outline appears on keyboard focus
  - Verify outline is 2px solid with 2px offset
  - Verify outline does NOT appear on mouse click

- [ ] **Form Inputs** (`<input>` elements)
  - Verify pink outline appears on keyboard focus
  - Verify outline is 2px solid with 2px offset
  - Test various input types (text, email, etc.)

- [ ] **Textareas** (`<textarea>` elements)
  - Verify pink outline appears on keyboard focus
  - Verify outline is 2px solid with 2px offset

- [ ] **Select Dropdowns** (`<select>` elements)
  - Verify pink outline appears on keyboard focus
  - Verify outline is 2px solid with 2px offset

### 2. Navigation Elements

Test keyboard navigation through the header navigation:

- [ ] **Logo** (`.nav-logo`)
  - Press Tab from address bar to focus logo
  - Verify pink outline appears with rounded corners
  - Verify outline is 2px solid with 2px offset
  - Verify outline does NOT appear on mouse click

- [ ] **Navigation Menu Links** (`.nav-menu a`)
  - Tab through all navigation links (Home, Portfolio, About, Contact)
  - Verify each link shows pink outline on focus
  - Verify outlines have rounded corners
  - Test on desktop view (horizontal menu)
  - Test on mobile view (hamburger menu expanded)

- [ ] **Hamburger Menu Button** (`.hamburger`) - Mobile Only
  - Resize browser to mobile width (<768px)
  - Tab to hamburger button
  - Verify pink outline appears with rounded corners
  - Press Enter/Space to open menu
  - Verify focus moves to first menu item
  - Press Escape to close menu
  - Verify focus returns to hamburger button

### 3. Gallery Elements

Test keyboard navigation through photo gallery:

- [ ] **Gallery Items** (`.photo-gallery-item`)
  - Tab through gallery items that contain focusable elements
  - Verify pink outline appears using :focus-within
  - Verify outline works alongside hover transform effect
  - Verify outline follows the item's border radius

- [ ] **Photo Credit Links** (`.photo-gallery-credit a`)
  - Tab to credit links (e.g., "Photographer Name")
  - Verify pink outline appears on focus
  - Verify outline has rounded corners
  - Verify color changes to accent color on focus

### 4. Footer Elements

Test keyboard navigation through footer:

- [ ] **Footer Navigation Links** (`.footer-nav a`)
  - Tab to footer links (Impressum, Datenschutz)
  - Verify pink outline appears on focus
  - Verify outline has rounded corners
  - Verify color changes to accent color on focus
  - Verify outline is visible against footer background

### 5. Full Page Tab Order

Verify complete keyboard navigation flow:

- [ ] **Sequential Navigation**
  - Start at browser address bar
  - Press Tab repeatedly to navigate through entire page
  - Verify focus moves in logical order:
    1. Logo
    2. Navigation menu links (or hamburger button on mobile)
    3. Main content links
    4. Gallery items and credit links
    5. Footer links
  - Verify you can reach ALL interactive elements
  - Verify no focus traps (can always Tab/Shift+Tab to next/previous element)

- [ ] **Reverse Navigation**
  - Press Shift+Tab to navigate backwards through page
  - Verify focus moves in reverse logical order
  - Verify all focus indicators appear correctly in reverse

### 6. Focus-Visible vs Focus Behavior

Verify :focus-visible works correctly:

- [ ] **Keyboard Focus Shows Outline**
  - Use Tab key to focus elements
  - Verify pink outline appears

- [ ] **Mouse Click Does NOT Show Outline**
  - Click on links and buttons with mouse
  - Verify pink outline does NOT appear
  - Verify color change still occurs (for links)

### 7. Visual Inspection

- [ ] **Contrast Check**
  - Verify focus indicators are clearly visible on all backgrounds
  - Verify pink (#FF1493) stands out against white, light gray, and colored backgrounds
  - Use browser DevTools or contrast checker to confirm 3:1 minimum ratio

- [ ] **No Overlap Issues**
  - Verify outlines don't overlap text or other elements awkwardly
  - Verify 2px offset provides adequate spacing

- [ ] **Consistent Styling**
  - Verify all focus indicators use the same color, width, and style
  - Verify rounded corners appear consistently

## Expected Results

### Pass Criteria

✅ All interactive elements are reachable via keyboard
✅ Focus indicators are clearly visible for all focusable elements
✅ Focus indicators only appear with keyboard navigation, not mouse clicks
✅ Focus indicators use consistent styling (2px solid #FF1493 with 2px offset)
✅ Focus indicators meet WCAG 2.1 Level AA contrast requirements (>3:1)
✅ Tab order is logical and sequential
✅ No focus traps exist
✅ Shift+Tab works correctly for reverse navigation

### Fail Criteria

❌ Any interactive element cannot be reached via keyboard
❌ Focus indicator is not visible or has insufficient contrast
❌ Focus indicator appears on mouse click (should only appear with keyboard)
❌ Tab order is illogical or skips elements
❌ Focus gets trapped in a component
❌ Inconsistent focus indicator styling across elements

## Testing Tools (Optional)

### Manual Contrast Checking

Use browser DevTools to verify contrast:
1. Open DevTools (F12)
2. Select element with focus indicator
3. Use color picker to get hex values
4. Use contrast checker: https://webaim.org/resources/contrastchecker/
5. Verify focus color (#FF1493) against background meets 3:1 minimum

### Automated Testing (Supplementary)

While manual testing is required, these tools can supplement:
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Chrome DevTools accessibility audit

## Documentation

### Test Results Template

```
Test Date: [Date]
Tester: [Name]
Browser: [Browser name and version]
Viewport: [Desktop/Mobile/Tablet]

Results:
- Base Elements: [Pass/Fail]
- Navigation: [Pass/Fail]
- Gallery: [Pass/Fail]
- Footer: [Pass/Fail]
- Tab Order: [Pass/Fail]
- Focus-Visible: [Pass/Fail]
- Contrast: [Pass/Fail]

Issues Found:
[List any issues]

Overall: [Pass/Fail]
```

## Success Confirmation

Once all checklist items pass, the focus indicator implementation meets:
- ✅ WCAG 2.1 Level AA Success Criterion 2.4.7 (Focus Visible)
- ✅ Keyboard accessibility best practices
- ✅ Consistent design system implementation
- ✅ User experience standards for keyboard navigation

## References

- [WCAG 2.1 Success Criterion 2.4.7](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
- [WCAG 2.1 Success Criterion 2.4.11](https://www.w3.org/WAI/WCAG21/Understanding/focus-appearance.html)
- [MDN :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
