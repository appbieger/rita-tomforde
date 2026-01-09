# Central Tint Color System

## Overview

Add a centrally configurable tint color (CSS custom property) with bright pink as the initial value. This enables site-wide color theming from a single location.

## Workflow Type

**Feature** - Adding new CSS custom property for centralized tint color management.

## Task Scope

### Files to Modify
- `src/css/styles.css` - Add `--color-tint` variable and link it to existing accent elements

### Change Details
1. Add `--color-tint: #FF1493;` (deep pink) to the `:root` CSS variables section
2. Set `--color-accent: var(--color-tint);` to leverage existing accent references
3. The tint color will automatically apply to:
   - Link hover states
   - Navigation hover states
   - Exhibition bullet points
   - Event dates
   - "Available" badges
   - CTA button hover states

The CSS already uses `--color-accent` throughout (~15 places). By pointing accent to the tint variable, all accent elements inherit the new pink color automatically.

## Success Criteria

- [ ] Website displays bright pink (#FF1493) for accent/tint elements
- [ ] Changing `--color-tint` value in `:root` updates all accent colors site-wide
- [ ] No console errors
- [ ] All hover states work correctly
- [ ] Backward compatibility maintained (existing `--color-accent` references work)

## Implementation Notes

- The existing `--color-accent` variable is used in ~15 places in the CSS
- Simplest approach: set `--color-accent: var(--color-tint);` so existing references work
- This maintains backward compatibility while enabling central tint control
- Minimal diff: Only 2 lines need modification in `:root` section
