# Store setup (Stripe + Printful)

## Environment variables

| Variable | Where | Purpose |
|----------|--------|---------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API keys | Client-side (optional for Checkout-only) |
| `STRIPE_SECRET_KEY` | Same | Server: create Checkout Session |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Webhooks → [your endpoint] → Reveal signing secret | Server: verify webhook |
| `PRINTFUL_API_KEY` | Printful → Settings → API → API Access | Server: create orders + optional catalog |
| `NEXT_PUBLIC_SITE_URL` | You set it | **Production only:** base URL for success/cancel redirects |

## Production (Vercel)

1. In Vercel: Project → Settings → Environment Variables.
2. Add **`NEXT_PUBLIC_SITE_URL`** = `https://thetool.guru` (or your live domain). No trailing slash.
3. This is used for Stripe Checkout `success_url` and `cancel_url`. Without it, Vercel’s default URL is used, which may be wrong for custom domains.

## Products and variant IDs

- **Option A – Live catalog:** With `PRINTFUL_API_KEY` set, the store page calls `/api/store/catalog`, which fetches products from Printful’s catalog and uses real variant IDs. No manual IDs needed.
- **Option B – Static list:** Edit `src/lib/store-products.js`. Get variant IDs from Printful: Dashboard → Catalog → open a product → copy the **variant ID** for the size/color you want. Set each product’s `printfulVariantId` to that value.

## Testing

1. Use Stripe **test mode** (test keys and test webhook).
2. Go to `/store`, add items, click Checkout. Pay with test card `4242 4242 4242 4242`.
3. After payment, Stripe sends `checkout.session.completed` to your webhook; the app creates the order in Printful (you’ll see it in Printful Dashboard). Cancel the order there if you don’t want it fulfilled.
