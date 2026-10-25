# Golf — The Unfair Advantage landing page

Separate scrolling-page alternative requested October 24, 2026, following the Personal Life landing-page approach.

Preview: https://thrive-golf-website--golf-landing-jccmtfqe.web.app/?v=2

Firebase channel: `golf-landing`. Checked Hosting version: `16a52af24f01982f`. Current expiry: November 23, 2026. The main site and Personal Life preview are not replaced.

## Journey

Hero → Recognition → The Unfair Advantage → What you'll learn and five capabilities → How it works → Inline capabilities, training level and program summary → Demo account → Simulated payment → Golf welcome / next steps.

Build My Program actions appear at the beginning, in How it works, and at the end. They scroll to the same inline selector. Back and Change from checkout return to that selector. About scrolls to the learning section on the landing page.

The approved `hero-video-finish.webp` and `recognition-putter.webp` are reused. Mobile crops keep the golfer's head and grip visible and show the putter without an overlapping caption. Other existing concept photos retain their provenance in `docs/ASSETS.md`. No new imagery was generated.

## Build and publish the comparison

```sh
node scripts/build-golf-landing.mjs
npm run check
cd artifacts/golf-landing-site
npx --yes firebase-tools@latest hosting:channel:deploy golf-landing --expires 30d --project thrive-golf-website --non-interactive
```

The builder reads the approved `public/` site and shared styling in `variants/personal-landing/landing.css`, creates an isolated copy under ignored `artifacts/golf-landing-site/`, then adds the Golf template, styles, and controller. It never edits the approved public source. Do not deploy this generated folder to production without explicit approval.

## Checks

- Build assertions: all template sections resolved, unique IDs, integration points present, and rejected golf imagery excluded from the landing template.
- Generated JavaScript syntax checks and existing website/checkout tests pass.
- Hosted desktop composition and phone-sized 390/320 viewport settings reviewed. Final layouts have no horizontal overflow (375/305 CSS pixels available after the scrollbar); no broken completed images observed.
- Top/bottom actions, empty selection validation, exclusive Help me choose, multiple capabilities, both training levels, and Back to preserved inline choices checked.
- Golf / Calm, Reset & Recovery / Pro completed demo account → correct Golf payment summary → welcome. Changing the training level after completion invalidated that payment and returned to payment when Welcome was revisited.
- No browser warning/error logs observed during the checked journey. Physical phones and real integrations are not tested.
- Review screenshots are under ignored `artifacts/golf-landing-review/`.

## Prototype boundaries

No real authentication, Stripe charge, email, booking, dashboard, or training is enabled. No real password/card information is requested. Prices are unconfirmed. Account/payment status stays in page memory; only program selections use a separate tab-local key, `thrive-golf-landing-v1`. Existing server-side integration requirements still apply before accepting real purchases.
