# Golf account, payment, and welcome demonstration

The user-supplied store storyboard's items 6, 7, and 8 extend the existing Golf selection flow. Existing Independent / Pro choices remain intact; the earlier program-selection pages have not been replaced with the new storyboard's extra program categories.

## Present behavior

- Golf summary now opens `#/store/account`.
- The account form supplies sample details on demand. Its password is a read-only display sample, not an authentication credential. First name, last name, and email exist only in page memory. Phone and marketing preferences are presentation-only and do not create a subscription or record.
- `#/store/payment` reflects the selected program and capabilities. Stripe is identified as the intended provider, with an explicit disconnected-preview label. There is no Stripe SDK, API request, Checkout Session, or payment form.
- Price is "To be confirmed". Simulation makes no charge.
- Successful simulation opens `#/store/welcome`; declined/cancelled results remain on payment and permit retry.
- Welcome offers a local email preview with dashboard-access instructions, then three clickable placeholders: dashboard, first session, start training.
- The placeholders open accessible native dialogs, not a dashboard, scheduler, training program, or outbound email.
- Refresh resets the demo account and payment. Changing program choices invalidates the completed demo payment. Directly visiting a welcome URL cannot skip the required demo steps.
- The shortcut `#/demo/checkout` explicitly seeds a sample Golf program and starts a fresh account demo.
- General Contact and non-Golf inquiries still prepare email drafts.

## Scope intentionally left for later

Real authentication, final terms/privacy wording, registration storage, approved prices, Stripe account configuration, welcome-email delivery, dashboard, scheduling provider, training content, and Infobip.

Do not convert the client-side success flag into authorization. It is only a presentation state.

## Future Stripe implementation

Create Checkout Sessions on a trusted backend, using approved server-side price IDs and the authenticated user's identity. Validate the checkout against the account and selected offering. Keep secret keys out of this static site.

Record confirmed payment and grant access from verified Stripe webhook events, with duplicate-event protection. A success URL or this demo's route must not grant entitlements. Use that recorded state to send welcome instructions once and to render the completed screen.

Test the eventual integration in a Stripe sandbox, including successful, declined, cancelled, and asynchronous payment paths before a separately approved live rollout. The current simulation is not Stripe test mode and does not verify those integrations.

References: [Stripe Checkout fulfillment](https://docs.stripe.com/checkout/fulfillment) and [Stripe testing](https://docs.stripe.com/testing).
