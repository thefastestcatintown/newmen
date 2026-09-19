# MUFASA · Leon Czalaun

Bilingual Astro website for coaching, self-leadership and men's work.

- Website: https://thefastestcatintown.github.io/newmen/
- Deutsch: https://thefastestcatintown.github.io/newmen/de/

## Development

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev stop
npm run build
```

## Automatic deployment

Every push to `main` builds and deploys the site using
[GitHub Actions](https://github.com/thefastestcatintown/newmen/actions).
The workflow can also be started manually. GitHub Pages must use **GitHub Actions**
as its build source. No personal tokens or additional secrets are required.

The workflow reads the Pages origin and repository base path from
`actions/configure-pages`. These become `PUBLIC_SITE_URL` and `ASTRO_BASE_PATH` at
build time, so asset URLs, navigation, language links and metadata use the published
address. Local development continues to use `/`.

English routes are at the site root; German routes are under `de/`. Both languages
share Astro components, with German translations in `src/i18n/de.json`.

The contact form backend is not connected. Legal and privacy pages still contain
pre-launch notices. See [implementation and integration notes](docs/IMPLEMENTATION.md).
