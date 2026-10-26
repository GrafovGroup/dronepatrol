# French implementation and backup verification — October 26, 2026

## Delivered

- French homepage plus all 9 service pages, 8 industry pages, 41 location pages, contact, company, process, recurring plans, overview and legal pages: 67 French routes total.
- French location guides include local operating context and surrounding communities rather than only changing city names.
- Page-specific French titles, descriptions, canonical URLs, social metadata and reciprocal en-CA/fr-CA/x-default links.
- Both language versions included in the sitemap.
- Route-based HTML language, equivalent-page language switching, translated form labels, success/error messages and privacy link.
- Existing Formspree endpoint and option values retained. French inquiries include language=fr and a French subject. Owner confirmed existing email delivery works.
- Responsive header breakpoint for longer French navigation, wrapping headings/buttons, 16px form inputs, minimum touch-target sizing, shrinkable grids and scrollable mobile menus.

## Verified

- TypeScript check and production build passed.
- Content validation passed for matching English/French service, industry and location keys, all 41 location images, 13 provinces/territories and core form labels.
- Live browser: English service page switched to its equivalent French page; HTML lang=fr-CA, canonical and alternate URLs were correct.
- Live French form: all labels/options/privacy link translated; empty submission focused the name field and all 7 required fields remained invalid; selecting Québec retained the existing Quebec submission value.
- Live French homepage/service page inspected at desktop width. No horizontal page overflow was measured at a 1363px viewport.
- No synthetic message sent. Owner-confirmed email delivery is distinguished from agent testing.

## Mobile verification limitation

Mobile CSS was reviewed and improved, but mobile visual verification is NOT complete. The managed preview failed its health timeout with Cloudflare DNS errors. The available cloud browser did not provide a working mobile viewport control; browser zoom keystrokes did not change its viewport. Do not describe this as real-device or mobile-browser testing. Verify homepage, contact, services, locations, menu and language switch at 320, 375, 768 and 1440px when suitable controls are available.

## Backup scope and recovery

GitHub repository: https://github.com/grafovgroup/dronepatrol

The backup includes the complete current application source, English/French content, all local images and favicon assets, package lockfile, build configuration, Sites project manifest, content check script and documentation. The initial 112-file backup matched the Sites Git tree exactly; the bilingual snapshot is compared again after saving.

This is a current source snapshot with GitHub change history from the initial import, not an export of every historical Sites deployment. Generated dependencies and build output can be recreated and are excluded. External Formspree submissions/account settings, domain/DNS settings, hosting account access and secrets are not Git source and are not exported here. No D1 or R2 storage is configured in the hosting manifest.

Recovery:

1. Clone the repository and install Node.js 22.13+ with pnpm.
2. Run `pnpm install --frozen-lockfile`, `pnpm exec tsc --noEmit`, `node scripts/check-content.mjs`, and `pnpm build`.
3. Use the Sites deployment workflow for the project in `.openai/hosting.json`; a GitHub push alone does not deploy the site.
4. Preserve access to the existing Formspree account and domain/DNS provider. Recheck form delivery and domain routing after any migration.

Production application source at French publication: da82a12f2b804c84d663bf83c64b1a9a2fd50231 (Sites version 14). Subsequent changes in this backup are documentation only.
