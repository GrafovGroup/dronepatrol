# DronePatrol.ca

Commercial drone inspections, aerial monitoring and site documentation across Canada.

## Development

Node.js 22.13+ and pnpm are required.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm exec tsc --noEmit
pnpm build
```

The app uses React, Vinext, and Cloudflare Workers. Source hosting identity is in `.openai/hosting.json`; preserve it. Sites deployment requires the Sites publishing workflow; a GitHub push alone does not deploy the website.

## Content and integrations

- `lib/content.ts`: services, industries and location content.
- `lib/site-config.ts`: shared phone number.
- `components/contact-form.tsx`: existing Formspree form `mkjnprar`.
- `app/globals.css`: responsive styles.
- `public/`: images, favicon assets and existing domain verification file.

No API secrets or runtime environment files are required in Git. Never commit customer submissions, credentials, node_modules or generated deployment output.

See `docs/2026-10-26-review.md` for improvements, verification limits and next priorities.
