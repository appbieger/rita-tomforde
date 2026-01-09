# Quick Spec: Fix "Über mich" Navigation Wrapping

## Overview

Prevent the "Über mich" navigation item from wrapping to two lines by adding `white-space: nowrap` to nav links. The navigation menu item currently displays as:

**Before:**
```
ÜBER
MICH
```

**After:**
```
ÜBER MICH
```

## Workflow Type

**Type:** Feature (CSS fix)

This is a simple CSS modification to prevent text wrapping in navigation links.

## Task Scope

### Files to Modify
- `src/css/styles.css` - Add `white-space: nowrap` to `.nav-menu a` selector (around line 290-300)

### Change Details
The navigation menu item "Über mich" currently wraps to two lines because the nav links don't prevent text wrapping. Adding `white-space: nowrap` to the `.nav-menu a` CSS rule will keep all nav items on a single line.

### Implementation Notes
- The fix is in the base `.nav-menu a` style (line ~290), not in media queries
- This will apply to all nav items, ensuring none of them wrap

## Success Criteria

- [ ] "Über mich" displays on a single line in the navigation
- [ ] All other nav items remain properly displayed
- [ ] Navigation still works on mobile/tablet views
- [ ] Responsive behavior is preserved across all viewport sizes
