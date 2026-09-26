# Thrive Performance Golf

A responsive photographic black/white/neon-green website prototype, with golfer hero, cap/tablet product visual, five mental-state icons, four metric cards, session walkthrough, sample testimonials, audience cards, partner placeholders, and sunset CTA.

## Preview and check

Requires Node.js 18+. No dependencies or build needed.

```sh
npm run dev
# Open http://127.0.0.1:4173
npm run check
```

## Deploy to the existing Firebase site

From this repository directory, using an account authorized for `thrive-golf-website`:

```sh
git pull origin main
npx --yes firebase-tools@latest login
npx --yes firebase-tools@latest deploy --only hosting --project thrive-golf-website
```

If already authenticated, skip login. In Cloud Shell, use `login --no-localhost` if needed. `npm run deploy` runs the deploy command. Existing site: https://thrive-golf-website.web.app.

Firebase publishes **only `public/`**, explicitly targeting `thrive-golf-website`. Documentation and configuration remain outside the public site. No backend or new Firebase project is required.

This rebuild was **not deployed** from the development machine: `firebase login:list --non-interactive` returned no authorized accounts. A GitHub commit alone does not update Firebase.

## Files

- `public/index.html`: page sections, metric placeholders, partner strip, booking destination.
- `public/styles.css`: responsive visual system, typography, image framing.
- `public/content.js`: replaceable sample testimonials and audience content.
- `public/script.js`: card rendering, mobile menu, native dialog.
- `public/assets/concept/`: six generated prototype photographs as WebP.
- `docs/ASSETS.md`: asset provenance, prompts, replacement guide.
- `docs/VERIFICATION.md`: verification and limitations.

The root `index.html` redirects to `public/` for repository previews. Firebase serves `public/index.html` directly.

## Prototype boundaries

- The original approved screenshot attachment was unavailable in the referenced conversation export. This rebuild follows the detailed design description; exact matching remains unverified.
- Photography, hardware, dashboard, and brand mark are conceptual; people are fictional models.
- Numerical metrics are explicitly illustrative, not validated claims.
- Quotes are labeled sample stories, not customer endorsements. Partner categories do not imply actual affiliations.
- The video callout opens a three-step walkthrough and says the video is coming soon.
- Booking preserves the original repository's `info@thrive-golf.com` email destination; deliverability is unverified. Replace with an approved scheduler before commercial launch. CRM/SMS is not implemented.
- Barlow and Barlow Condensed load from Google Fonts with system fallbacks. All photographs are locally hosted.
