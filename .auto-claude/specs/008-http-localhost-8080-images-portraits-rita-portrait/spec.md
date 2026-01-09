# Fix Portrait Image Path

## Overview

Correct the portrait image URL path to include the `/rita-tomforde/` prefix. The hero section portrait image has an incorrect path that causes a 404 error.

## Workflow Type

Simple - Single file path correction

## Task Scope

### Files to Modify
- `src/index.njk` - Fix image src on line 13

### Change Details
The hero section portrait image has an incorrect path:
- **Current**: `/images/portraits/rita-portrait.jpg`
- **Correct**: `/rita-tomforde/images/portraits/rita-portrait.jpg`

### Root Cause
The site is served with a `/rita-tomforde/` base path prefix, which must be included in all asset URLs.

## Success Criteria

- [ ] Image loads correctly at `http://localhost:8080/rita-tomforde/images/portraits/rita-portrait.jpg`
- [ ] No 404 error in browser console
- [ ] Portrait displays in hero section
