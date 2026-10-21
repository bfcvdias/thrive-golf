# Thrive Performance Mind Training

A responsive twelve-screen website based on the supplied `golf websiite.png` storyboard. Navy and white styling, copy, five capability icons, photographic compositions, and the guided program builder follow that reference.

## Run locally

Node.js 18 or newer. No install or build required.

```sh
npm run dev
# http://127.0.0.1:4175
npm run check
```

## Visitor flow

Home → Golf recognition → The Unfair Advantage → What you'll learn → How it works → Priorities → Independent or Pro → Program summary → Request information.

About explains the five capabilities. Personal Life opens the same builder with its own goal and summary photo. Sports Performance and Level 3 remain unavailable, as pictured. Hash routes support refresh and browser Back on static Hosting.

The builder supports multiple priorities, an exclusive "I'm not sure" choice, editing, and tab-local selection persistence. Contact details are not stored in browser storage.

## Request form

The form prepares an email to the existing `info@thrive-golf.com` destination. It does **not** automatically submit a registration or claim the request was sent. The visitor reviews and sends the draft using their email app, or copies the request. Email deliverability is unverified.

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
npx --yes firebase-tools@latest hosting:channel:deploy storyboard-v3 --expires 7d --project thrive-golf-website
npx --yes firebase-tools@latest hosting:clone thrive-golf-website:storyboard-v3 thrive-golf-website:live --project thrive-golf-website
```

Use an account authorized for this project. See `docs/VERIFICATION.md` for recorded release status. Live URL: https://thrive-golf-website.web.app.

## Source guide

- `public/index.html`: twelve screens and storyboard wording.
- `public/styles.css`: styling, image framing, desktop and mobile layouts.
- `public/script.js`: routing, forms, selection persistence, email draft.
- `public/state.mjs`: validated selections and inquiry formatting.
- `public/config.js`: public contact address; never put secrets here.
- `public/assets/reference/`: six generated storyboard photographs.
- `public/assets/concept/`: earlier concept photos; sunset and coach reused.
- `docs/ASSETS.md`: prompts, provenance, replacement guide.
- `docs/VERIFICATION.md`: checks and limitations.

Root `index.html` redirects to `public/` for repository previews. All photographs are locally hosted; fonts use the system.

## Design boundaries

The reference is a flattened storyboard, not an editable design file. Photography was recreated at web resolution; exact original pixels and font identity are not claimed. Mobile layouts adapt the reference into readable stacks. No invented testimonials, endorsements, prices, or numerical performance claims were added. Training descriptions still need business validation before commercial launch. Generated people are fictional, and photos remain separate for approved replacements.
