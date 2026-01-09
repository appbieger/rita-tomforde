# Quick Spec: Update Contact Information

## Overview
Update Rita Tomforde's contact information with Instagram, full address, phone, and WhatsApp details across the website.

## Workflow Type
Simple - Direct data update with template modification

## Task Scope

### Files to Modify
- `src/_data/site.json` - Add new contact fields (instagram, address, phone, whatsapp)
- `src/_includes/footer.njk` - Display the new contact information

### Contact Data
- **Instagram**: https://www.instagram.com/ritatomforde/
- **Address**: Reith 29, 21698 Brest
- **Phone**: 0151 23260291
- **WhatsApp**: 0151 23260291

### Change Details

#### site.json
Expand the `contact` object with new fields:
```json
"contact": {
  "name": "Rita Tomforde",
  "address": "Reith 29",
  "city": "21698 Brest",
  "phone": "0151 23260291",
  "whatsapp": "0151 23260291",
  "instagram": "https://www.instagram.com/ritatomforde/"
}
```

#### footer.njk
Add display for phone, WhatsApp, and Instagram in the `.footer-contact` section.

## Success Criteria
- [ ] Footer displays updated address (Reith 29, 21698 Brest)
- [ ] Phone number is visible in footer
- [ ] WhatsApp number is visible
- [ ] Instagram link works and opens correct profile
- [ ] No console errors
