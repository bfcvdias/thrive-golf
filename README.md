# Thrive Performance Mind Training

A responsive website based on the supplied Thrive storyboards. The original twelve screens now include three additional Golf store screens: demo account creation, payment simulation, and welcome / next steps.

## Run locally

Node.js 18 or newer. No install or build required.

```sh
npm run dev
# http://127.0.0.1:4175
npm run check
```

## Visitor flow

Home → Golf recognition → The Unfair Advantage → What you'll learn → How it works → Priorities → Independent or Pro → Program summary → Demo account → Payment simulation → Welcome.

About explains the five capabilities. Personal Life opens the same builder with its own goal and summary photo. Sports Performance and Level 3 remain unavailable, as pictured. Hash routes support refresh and browser Back on static Hosting.

The builder supports multiple priorities, an exclusive "I'm not sure" choice, editing, and tab-local selection persistence. Contact details are not stored in browser storage.

## Try the account and checkout demo

Open https://thrive-golf-website.web.app/?v=3.1.0#/demo/checkout. This shortcut selects a sample Golf / Focus, Calm, Reset & Recovery / Pro program.

1. Click **Fill demo details**, then check the demonstration notice.
2. Click **Create demo account**.
3. Click **Simulate successful payment** to open Welcome. The alternative-results menu also demonstrates declined and cancelled payments.
4. Preview the welcome email and click the dashboard, first-session booking, and start-training cards. These open explanations only.

There is no real account, Stripe transaction, email, subscription, or booking. No real password or card details are requested. Demo account data and payment status exist only in page memory and reset on refresh. Program choices remain in tab-local session storage. Prices are unconfirmed. See `docs/CHECKOUT-DEMO.md` for implementation boundaries and future integration.

## General contact

The Contact page and non-Golf program inquiries retain the email-draft form for `info@thrive-golf.com`. It does **not** automatically submit a registration or claim the request was sent. The visitor reviews and sends the draft using their email app, or copies the request. Email deliverability is unverified.

Microsoft Bookings, Infobip, CRM registration storage, payments, and automated confirmations are not connected. Add an approved backend and consent wording before enabling automatic registration or messaging. Keep credentials server-side.

## Deployment

Firebase publishes only `public/` to the existing `thrive-golf-website` Hosting site. This configuration does not provision or deploy backend services.

```sh
git pull --ff-only origin main
npm run check
npx --yes firebase-tools@latest deploy --only hosting --project thrive-golf-website
```

Preview and promote the checked version:

```sh
npx --yes firebase-tools@latest hosting:channel:deploy checkout-demo --expires 7d --project thrive-golf-website
npx --yes firebase-tools@latest hosting:clone thrive-golf-website:checkout-demo thrive-golf-website:live --project thrive-golf-website
```

Use an account authorized for this project. See `docs/VERIFICATION.md` for recorded release status. Live URL: https://thrive-golf-website.web.app.

## Source guide

- `public/index.html`: fifteen screens and storyboard wording.
- `public/styles.css`: styling, image framing, desktop and mobile layouts.
- `public/script.js`: routing, forms, selection persistence, email draft.
- `public/state.mjs`: validated selections and inquiry formatting.
- `public/checkout.mjs`: isolated simulation state and route guards; never a real payment authority.
- `public/checkout.css`: account, payment, welcome, and preview-dialog styles.
- `public/config.js`: public contact address; never put secrets here.
- `public/assets/reference/`: six generated storyboard photographs.
- `public/assets/concept/`: earlier concept photos; sunset and coach reused.
- `docs/ASSETS.md`: prompts, provenance, replacement guide.
- `docs/VERIFICATION.md`: checks and limitations.
- `docs/CHECKOUT-DEMO.md`: demo guide and future connection requirements.

Root `index.html` redirects to `public/` for repository previews. All photographs are locally hosted; fonts use the system.

## Design boundaries

The reference is a flattened storyboard, not an editable design file. Photography was recreated at web resolution; exact original pixels and font identity are not claimed. Mobile layouts adapt the reference into readable stacks. No invented testimonials, endorsements, prices, or numerical performance claims were added. Training descriptions still need business validation before commercial launch. Generated people are fictional, and photos remain separate for approved replacements.
