# Verification — storyboard version 3

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
