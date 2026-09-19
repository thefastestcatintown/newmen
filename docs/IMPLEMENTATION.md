# Mufasa website

## Architecture and content

Static Astro site with semantic section components in `src/components`, a shared
`src/layouts/BaseLayout.astro`, and mobile-first CSS in `src/styles/global.css`.
Only the mobile navigation and contact form use client JavaScript. No UI framework,
font service, analytics, animation library or backend was added.

Content was adapted from https://www.mufasa.live/ and
https://leonczalaun.carrd.co/. Mufasa provides the primary emotional-presence narrative;
Carrd provides the three NEW/* offerings. Referral-only admission was omitted because
its current applicability is unconfirmed. Leon should review the edited English copy.
The portrait in `public/images/leon-czalaun.jpg` comes from the Mufasa homepage:
https://images.squarespace-cdn.com/content/v1/6a75bdcafd6f5a4fa8ae0b48/a49f9f4f-7dcc-4813-be1a-ba26dd682a19/a859ac24-44bf-4b80-bc37-f0db9eeaeef7.JPG
System serif and sans-serif stacks keep fonts local. No additional photos are needed
for this version; a second authentic photo would add variety to the About section.

## Local development

The supplied project had no lockfile, packageManager field or installed dependencies.
npm is available in the environment, so installation creates `package-lock.json`.
Existing `package.json`, `astro.config.mjs` and `tsconfig.json` are preserved.

- `npm install`
- `npm run dev -- --background`
- `npm run astro -- dev status` / `npm run astro -- dev logs`
- `npm run astro -- dev stop`
- `npm run build`

No formatter or Astro check script was configured in the supplied project.

## Contact integration — intentionally not connected

`src/components/Contact.astro` reads `PUBLIC_CONTACT_ENDPOINT` at build time.
Without it, the form clearly states it is unavailable and submits no network request.
Its error state does not clear entered content or claim delivery.

To connect later, set this to an approved endpoint and rebuild. It receives JSON:
`{ "name": "...", "email": "...", "phone": "...", "message": "..." }`.
Return a 2xx JSON response `{ "success": true }` **only after accepting the message**.
All other responses trigger the error state. Requests time out after 15 seconds.
The sending state disables repeat submissions; success clears the form;
errors preserve input. Status updates are announced through a live region.

The server must validate field types/lengths and email, implement abuse prevention,
and define storage, retention and delivery behavior. Keep credentials on the server;
PUBLIC variables are public and must never contain secrets. Cross-origin endpoints
need appropriate CORS configuration. Add a real contact alternative once verified.
Do not enable sending before the privacy notice is complete.

## Before publication

- Confirm the production domain. Canonical/OpenGraph currently use the existing
  `https://www.mufasa.live`; override with `PUBLIC_SITE_URL` if it changes.
- Replace the clearly marked, noindex pre-launch pages `impressum.astro` and
  `privacy.astro` with approved provider details and a complete privacy notice.
  No address, email or legal claims have been invented. Update the privacy page
  when contact processing or hosting is configured.
- Confirm branding, copy, image usage and current availability of offerings.
- Configure contact delivery and review production success/error behavior.
- No deployment or domain change has been performed.

## File inventory

Changed: `src/pages/index.astro`.
Created: `src/components/{Header,MobileMenu,Button,Hero,Intro,Approach,NewMe,NewMen,NewMeaning,About,Contact,Footer}.astro`,
`src/layouts/BaseLayout.astro`, `src/styles/global.css`, `src/pages/impressum.astro`,
`src/pages/privacy.astro`, `public/mark.svg`, `public/images/leon-czalaun.jpg`,
`package-lock.json`, and this document. Original favicons remain in place but the new
site references `mark.svg`.

## Verification completed

- `npm run build`: passed; three static routes generated.
- Chrome/Playwright at 375, 390, 768, 1024 and 1440 CSS pixels: no horizontal
  overflow, one h1, all images load, no browser JavaScript errors.
- Desktop and mobile full-page screenshots inspected.
- Mobile menu opens, closes on Escape, and closes after following a section link.
- Principles disclosures expand normally.
- Unconfigured contact form reports non-delivery. Locally mocked endpoint checks
  passed for sending, disabled repeat submission, error with preserved input, and
  success with cleared input. No messages were sent to an external service.
- `/impressum/` and `/privacy/` return HTTP 200.
- No formatter or separate type-check command was configured, so neither was added.
- Browser tooling was installed in `/tmp/newmen-browser`, outside the project.
- Preview is running via Astro background mode at http://localhost:4322.

## German / English switch

The header now contains an always-visible DE/EN language switch. English remains at
`/`; German lives at `/de/`, including localized legal and privacy routes. The routes
share the existing components; `src/i18n/de.json` holds German translations and
`src/i18n/utils.ts` provides translation and path helpers. Translations are rendered
at build time, including metadata, image descriptions, navigation and form copy.
`LanguageSwitch.astro` preserves the URL's section anchor. Switching also works
without JavaScript (without anchor preservation). No cookies or local storage are used.
Each route has a language attribute, its own canonical URL and alternate language links.

Verified both languages at 375, 390, 768, 1024, 1100 and 1440px without horizontal
overflow, mobile menu navigation, anchor preservation, reloads, translated form
errors, both legal routes and switching with JavaScript disabled.

## GitHub Pages deployment

The website is now configured for the public `thefastestcatintown/newmen` repository.
`.github/workflows/deploy-pages.yml` builds on every push to `main` and supports
manual dispatch. The build uses Node.js 24, `npm ci`, and Pages-provided origin/base
path settings; the deploy job uses GitHub's Pages artifact and OIDC authentication.
No personal access token is stored in the repository.

`sitePath` and the locale helpers now support deployment under a repository path.
The static build was checked for valid links/assets across all six routes at
`/newmen/`. Existing notes about contact integration and legal content still apply;
the earlier statement that no deployment had been performed is historical.
