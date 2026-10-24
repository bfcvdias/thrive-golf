# Personal Life Advantage preview

Version 3.2.0 follows the supplied twelve-panel Personal Life storyboard. The request-information step is replaced by the account → payment → welcome demonstration requested by the user.

## Review

Open https://thrive-golf-website--personal-life-jdzp8dvy.web.app/?v=3.2.0#/personal.

1. Explore Personal Life Advantage, review recognition and benefits, then choose a path.
2. Choose Professionals & Executives, Frequent Travelers, Students, or Everyday Life. Select **Build your program**.
3. Choose capabilities and Independent or Pro, then review the summary. Change Path returns to the four cards; Back returns to the appropriate previous step.
4. Start the program. Use **Fill demo details**, check the demonstration notice, and create the demo account.
5. Review the program-specific payment summary. Try declined/cancelled payment, then **Simulate successful payment**.
6. Review the welcome email preview and click Dashboard, Book Your First Session, and Start Training. All three remain future-feature previews.

## Boundaries

- There is no real registration, Stripe transaction, email delivery, booking, entitlement, or training dashboard. No real credentials or card details should be entered.
- Account information and simulated payment exist only in page memory. Refresh resets them. Only sanitized program choices remain in tab-local session storage.
- Each Personal Life path and training level has a distinct concept offer key in `programs.mjs`, separate from Golf. No Stripe Product/Price objects have been created and `stripePriceId` is explicitly null. Prices remain **To be confirmed**.
- A successful simulation belongs to the chosen goal, path, capabilities, and level. Editing any of these invalidates completion. Personal Life and Golf cannot reuse each other's completed simulation.
- Audience pages use storyboard copy and generated prototype photographs. Copy and offerings need business validation before commercial launch.

## Later Stripe integration

After pricing and the business account are approved, create corresponding Stripe products/prices and resolve the chosen offer on a trusted server. The server must create checkout sessions and verify Stripe webhooks before assigning program access or sending welcome instructions. The browser simulation must never become an entitlement check. Connect real authentication, terms/consent, email, booking, and dashboard separately.

## Release status

Preview only. User visual approval is required before merging/publishing to the existing live site. Preview Hosting version: `12719cbc65ffef07`, deployed October 24, 2026. The existing live release is not replaced by this preview.
