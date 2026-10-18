## Values to Replace

The following values are placeholders and must be updated before going live.

**Files containing placeholders:**
- [api/create-checkout-session.js](api/create-checkout-session.js)
- [.env.example](.env.example)

| Field | Current Value | What to Set |
|-------|--------------|-------------|
| mode | subscription | Set to "payment" for one-time charges or "subscription" for recurring billing. |
| success_url | ${process.env.DOMAIN}/dashboard.html?session_id={CHECKOUT_SESSION_ID} | Your actual post-payment success page URL. Keep the {CHECKOUT_SESSION_ID} template. |
| cancel_url | ${process.env.DOMAIN}/join.html | Your actual cancel/return page URL. |

## Configured Parameters

These parameters were configured in Checkout Studio and are already set correctly.

**Files containing these parameters:**
- [api/create-checkout-session.js](api/create-checkout-session.js)

| Parameter | Value |
|-----------|-------|
| ui_mode | hosted_page |
| billing_address_collection | auto |
| phone_number_collection | { enabled: false } |
| automatic_tax | { enabled: false } |
| allow_promotion_codes | false |
| submit_type | auto |
| integration_identifier | hosted_web_0001 |
| origin_context | web |
| payment_method_collection | always |
| line_items | (Mapped dynamically from user's provided IDs) |

## Setup and next steps

- **Environment Variables**: Add your `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, and `STRIPE_WEBHOOK_SECRET` to your Vercel project environment variables. Also set your `DOMAIN` (e.g. `https://your-app.vercel.app`).
- **Database setup**: Run `schema.sql` in your Supabase SQL editor to create the required tables and security rules.
- **Stripe Dashboard**: Create your membership products and prices (both the monthly fees and the one-time registration fees). Update the placeholder `price_...` in `api/create-checkout-session.js` with your real Stripe Price IDs.
- **Webhooks**: Register your Vercel URL `https://your-app.vercel.app/api/webhook` in the Stripe dashboard to listen for `checkout.session.completed` events. This ensures your Supabase database is updated when someone pays!
- **Testing**: Use Stripe test credit cards to ensure everything works end-to-end.
- Resources: https://support.stripe.com and https://docs.stripe.com/mcp
