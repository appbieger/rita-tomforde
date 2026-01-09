# Remove Nav Logo Text

## Overview
Remove the "Atelier Rita Tomforde" logo/text from the navigation bar. The user no longer wants this branding element displayed in the navigation.

## Workflow Type
simple

## Task Scope
### Files to Modify
- `src/_includes/nav.njk` - Remove or hide the nav-logo element

### Change Details
The navigation currently displays "Atelier Rita Tomforde" as a clickable logo on the left side of the nav bar. The user wants this removed.

In `nav.njk`, remove or comment out:
```html
<a href="{{ '/' | url }}" class="nav-logo" aria-label="Startseite">
    <span class="nav-title">{{ site.name }}</span>
</a>
```

## Success Criteria
- [ ] Navigation no longer shows "Atelier Rita Tomforde" text
- [ ] Navigation menu items still work correctly
- [ ] No visual layout issues after removal

## Notes
- The nav-logo is separate from the menu items - it's the site branding
- Removing it will just leave the hamburger menu and nav items
