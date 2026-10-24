# Thrive Performance Mind Training

A responsive website based on the supplied Thrive storyboards. Twenty-two screens cover Golf and Personal Life Advantage, with shared demo account creation, program-specific payment simulation, and welcome / next steps.

## Run locally

Node.js 18 or newer. No install or build required.

```sh
npm run dev
# http://127.0.0.1:4175
npm run check
```

## Visitor flow

Home → Golf recognition → The Unfair Advantage → What you'll learn → How it works → Priorities → Independent or Pro → Program summary → Demo account → Payment simulation → Welcome.

Personal Life entry → Recognition → Benefits → Choose a path → Professionals & Executives, Frequent Travelers, Students, or Everyday Life → Priorities → Independent or Pro → Program summary → Demo account → Program-specific payment simulation → Welcome.

About explains the five capabilities. Sports Performance and Level 3 remain unavailable, as pictured. Hash routes support refresh and browser Back on static Hosting.

The builder supports multiple priorities, an exclusive "I'm not sure" choice, editing, and tab-local selection persistence. Contact details are not stored in browser storage.

## Try the account and checkout demo

Open https://thrive-golf-website.web.app/?v=3.1.0#/demo/checkout. This shortcut selects a sample Golf / Focus, Calm, Reset & Recovery / Pro program.

1. Click **Fill demo details**, then check the demonstration notice.
2. Click **Create demo account**.
3. Click **Simulate successful payment** to open Welcome. The alternative-results menu also demonstrates declined and cancelled payments.
4. Preview the welcome email and click the dashboard, first-session booking, and start-training cards. These open explanations only.

There is no real account, Stripe transaction, email, subscription, or booking. No real password or card details are requested. Demo account data and payment status exist only in page memory and reset on refresh. Program choices remain in tab-local session storage. Prices are unconfirmed. See `docs/CHECKOUT-DEMO.md` for implementation boundaries and future integration.

## General contact

The Contact page retains the email-draft form for `info@thrive-golf.com`. It does **not** automatically submit a registration or claim the request was sent. The visitor reviews and sends the draft using their email app, or copies the request. Personal Life inquiries include the selected path. Email deliverability is unverified.

Microsoft Bookings, Infobip, CRM registration storage, payments, and automated confirmations are not connected. Add an approved backend and consent wording before enabling automatic registration or messaging. Keep credentials server-side.

## Deployment

Firebase publishes only `public/` to the existing `thrive-golf-website` Hosting site. This configuration does not provision or deploy backend services.

```sh
git pull --ff-only origin main
npm run check
npx --yes firebase-tools@latest deploy --only hosting --project thrive-golf-website
```

Personal Life 3.2.0 is a review preview pending visual approval: https://thrive-golf-website--personal-life-jdzp8dvy.web.app/?v=3.2.0#/personal (current expiry October 31, 2026). See `docs/PERSONAL-LIFE.md` for the flow and integration boundary.

Refresh the preview:

```sh
npx --yes firebase-tools@latest hosting:channel:deploy personal-life --expires 7d --project thrive-golf-website
```

After user approval, promote the reviewed preview with `npx --yes firebase-tools@latest hosting:clone thrive-golf-website:personal-life thrive-golf-website:live --project thrive-golf-website`. Do not promote before approval. Use an authorized project account. See `docs/VERIFICATION.md` for release status. Live URL: https://thrive-golf-website.web.app.

## Source guide

- `public/index.html`: twenty-two screens and storyboard wording.
- `public/styles.css`: styling, image framing, desktop and mobile layouts.
- `public/script.js`: routing, forms, selection persistence, email draft.
- `public/state.mjs`: validated selections and inquiry formatting.
- `public/checkout.mjs`: isolated simulation state and route guards; never a real payment authority.
- `public/checkout.css`: account, payment, welcome, and preview-dialog styles.
- `public/personal.css`: Personal Life pages and responsive layouts.
- `public/programs.mjs`: distinct program/path/level offer keys, unconfigured Stripe prices, and path photos.
- `public/assets/personal/`: nine replaceable conceptual Personal Life photographs.
- `public/config.js`: public contact address; never put secrets here.
- `public/assets/reference/`: six generated storyboard photographs.
- `public/assets/concept/`: earlier concept photos; sunset and coach reused.
- `docs/ASSETS.md`: prompts, provenance, replacement guide.
- `docs/VERIFICATION.md`: checks and limitations.
- `docs/CHECKOUT-DEMO.md`: demo guide and future connection requirements.

Root `index.html` redirects to `public/` for repository previews. All photographs are locally hosted; fonts use the system.

## Design boundaries

The reference is a flattened storyboard, not an editable design file. Photography was recreated at web resolution; exact original pixels and font identity are not claimed. Mobile layouts adapt the reference into readable stacks. No invented testimonials, endorsements, prices, or numerical performance claims were added. Training descriptions still need business validation before commercial launch. Generated people are fictional, and photos remain separate for approved replacements.
