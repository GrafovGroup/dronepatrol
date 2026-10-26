# Inquiry improvements — October 26, 2026

## Changes

- Reduced the initial form to five required fields: name, work email, service, city and brief project description. Province/territory is visible but optional.
- Company, phone, street address, location count, timing, multisite checkbox and document-transfer guidance now sit inside an optional expandable section. Optional backend field errors reopen this section.
- Inspection CTAs carry the originating page as a context parameter. Recognized service pages preselect the service; recognized city pages prefill city and province. All fields remain editable.
- Both English and French forms work with the same Formspree endpoint and existing option values. Language switching preserves the originating context, but does not preserve manually entered unsent form text.
- Context is resolved server-side against known service/industry/location routes. Unknown routes and prototype-property names are rejected. No contact details are placed in URLs.
- The source page is included as a hidden inquiry field to give the business context. No analytics service or tracking cookies were added.
- Property Patrol and recurring plans now clearly mean scheduled visual condition documentation, not live security surveillance, guarding or emergency response.

## Validation

- TypeScript and production build passed; Sites version 15 published successfully.
- Content checks passed; new tests cover English/French service context, Toronto and Montreal location context, recurring plans, unknown/prototype paths and invalid parameter types.
- Live browser: French commercial roof page CTA opened the form with Commercial Roof Inspection selected.
- Live browser: optional French fields expanded and were translated.
- Live browser: switching the inquiry to English retained the selected service.
- Live browser: Toronto location CTA prefilled Toronto and Ontario.
- Live browser: exactly five required inputs; incomplete submission focused name. No synthetic message was submitted.
- Mobile visual verification remains incomplete because the managed preview and available browser viewport controls are unavailable. Responsive CSS and the reduced form structure remain in place; do not claim a real-device test.

Application source: 1c1c88ba44a9d2ea18211e613448c117c5bdd1bb. This report is a documentation-only addition after publishing.

## Remaining work requiring inputs or environment support

- Real-device/mobile viewport checks.
- Approved project images, qualifications and sample reports before adding client proof.
- Analytics destination and measurement requirements before connecting conversion reporting.
