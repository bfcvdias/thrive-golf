# Personal Life landing-page comparison

Separate single-page approach requested on October 24, 2026. This does not replace the approved main website.

Preview: https://thrive-golf-website--personal-landing-vwhvgdxv.web.app/?v=1

Hosting channel: `personal-landing`. Reviewed version: `da49eb0a17f824c5`. Current expiration: November 23, 2026. This is a temporary comparison URL; renew the preview or choose permanent hosting after review.

## Experience

- Photographic hero with an early Build My Program action and an exploration link.
- Recognition, five capabilities, training approach, and four audience cards on one scrolling page. Each audience's original benefits expand in place.
- Inline path, capability and training-level choices with a live program summary. The final Build My Program action returns here as well.
- Continue to the existing demo account, program-specific simulated payment and welcome screens. Back and Change return to the inline selector with choices preserved.
- Existing conceptual photography is reused; provenance remains in `docs/ASSETS.md`. No additional imagery was generated.
- No real accounts, Stripe transactions, email, booking, dashboard access, or training are enabled. Prices remain unconfirmed. Program selections use a separate session-storage key from the main site.

## Reproduce

From the repository root:

```sh
node scripts/build-personal-landing.mjs
npm run check
cd artifacts/personal-landing-site
npx --yes firebase-tools@latest hosting:channel:deploy personal-landing --expires 30d --project thrive-golf-website --non-interactive
```

The build copies the approved `public/` directory into ignored `artifacts/personal-landing-site/public/`, adds this variant's template/styles/controller, and adapts routing only in the generated copy. The approved source and production configuration are not modified. Do not run a production deploy from the generated folder without explicit approval.

## Verification

- Build asserts source integration points, complete template substitution and unique IDs. Both generated JavaScript files pass syntax checks; existing website and checkout tests pass.
- Hosted desktop and mobile layouts reviewed, including 390- and 320-pixel viewport settings (375 and 305 CSS pixels available after the scrollbar). No horizontal overflow or broken completed images observed.
- Top and bottom actions scroll to the inline selector. Empty-path validation, all four path summaries, exclusive Help me choose selection, and returning from account setup were checked.
- Student / Focus / Pro reached the correct payment summary and welcome screen through the demo account. No browser warnings/errors were observed.
- Full-page and hero proof images are saved under ignored `artifacts/personal-landing-review/`.
- Physical devices and real service integrations are not tested.
