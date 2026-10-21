# Verification

## Store demonstration — version 3.1

Checked 2026-10-21.

- Existing twelve screens plus account, payment, and welcome: fifteen total.
- Static/selection checks and the checkout-state tests passed. Account validation rejects incomplete details and excludes passwords from the account model.
- The Golf summary continues into account creation. Personal Life still leads to the general inquiry form.
- Browser-tested empty-account validation, sample-detail fill, account submission, decline, cancellation, retry, successful simulation, and direct welcome-route protection.
- Changing capabilities invalidates the previous completed simulation. Refresh resets the account and payment, returning to account setup.
- All three welcome actions open their respective future-feature dialogs. Escape closes the dialog. The welcome-email preview uses the selected program and sample identity without sending anything.
- Desktop and actual 390 / 320 CSS-pixel viewport checks passed for the three added screens with no horizontal overflow. Mobile form, payment, and welcome layouts reviewed.
- No browser warnings/errors observed during these checks. General Contact remains the existing email-draft fallback.
- This validates the presentation simulation only. Real authentication, Stripe, welcome-email delivery, dashboard, booking, and training are not implemented or tested.

- Hosted preview: https://thrive-golf-website--checkout-demo-yymd3p9p.web.app
- Checked Hosting version: `e6e703ba255dd21e`, cloned to the live channel on 2026-10-21.
- Live account → payment → welcome flow verified at https://thrive-golf-website.web.app/?v=3.1.0#/demo/checkout with all fifteen screens present and no browser warnings/errors.
- Versioned stylesheet/module URLs and no-cache HTML/script/style headers prevent older cached code from mixing with this release.
- Live welcome screenshot saved locally under `artifacts/thrive-checkout-welcome-live.png`.

## Original storyboard — version 3

Checked 2026-10-21.

## Local checks

- `npm run check`: twelve screens, unique IDs, existing assets, correct Hosting target, sanitized selections, multi-selection, exclusive undecided choice, summary mapping, inquiry context, and explicit email-draft behavior.
- All twelve desktop screens visually reviewed in Chromium. Mobile home, training-priority cards, training choices, program summary, and request form reviewed.
- All twelve routes checked at actual 390 and 320 CSS-pixel viewport widths: no horizontal overflow or failed loaded images.
- Empty priorities and training steps show useful validation.
- "I'm not sure" clears specific priorities; choosing a specific priority clears "I'm not sure".
- Focus, Calm, Reset & Recovery plus Pro carry into the summary and survive reload.
- Request form prepares the chosen goal, priorities, and level in an encoded email draft. No email was sent; the interface explicitly says no request has been sent.
- No browser warning/error logs observed in the checked flow.
- Form labels, focus styles, heading focus, reduced-motion support, and a skip link are present.

## Release

Firebase authentication and access to Hosting site `thrive-golf-website` were verified. The previous live page was the earlier Train Your Mind / Own Your Game design.

- Preview: https://thrive-golf-website--storyboard-v3-f5o6jz4w.web.app
- Preview version: `c264fe69af0ae163`, expires 2026-10-28.
- Hosted preview passed module loading, empty-state route guards, and the Personal Life → Calm → Independent summary flow.
- The checked preview was cloned to the live channel on 2026-10-21.
- Live: https://thrive-golf-website.web.app — new home, navigation, photography, and loaded JavaScript verified in the browser with no warning/error logs.

## Limitations

- Recreated photographs are not original source images.
- Chromium desktop and simulated mobile checks do not certify other browsers or physical phones.
- Registration storage, Bookings, Infobip, notifications, and payments are not connected. The request form uses an email draft.
- Mailbox deliverability is unverified.
- Sports Performance and Level 3 remain placeholders. Training descriptions are concept copy, not independently validated outcomes.
