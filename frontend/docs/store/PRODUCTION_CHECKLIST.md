# Store production checklist

Use this before merging the `store` branch and going live.

---

## 1. Environment variables (Vercel)

You already have:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `PRINTFUL_API_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

**Add for production:**

- **`NEXT_PUBLIC_SITE_URL`** = `https://thetool.guru` (or your live domain, no trailing slash)  
  So Stripe success/cancel URLs point to your real site, not a preview URL.

---

## 2. Stripe: switch to live mode

Right now you’re in **test mode**. For real payments:

1. In Stripe Dashboard, turn off “Test mode” (top right).
2. Copy your **live** keys: Publishable key and Secret key.
3. In Vercel, set **live** values for:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
4. Create a **live** webhook: Developers → Webhooks → Add endpoint.
   - URL: `https://thetool.guru/api/stripe/webhook`
   - Event: `checkout.session.completed`
5. After creating it, open the endpoint → **Reveal** signing secret.
6. In Vercel, set **live** `STRIPE_WEBHOOK_SECRET` to that value.

Use **live** keys only in production; keep test keys for local/dev.

---

## 3. Printful: designs and products

- **If using the catalog API:** The store shows Printful’s catalog. When an order is created, Printful still needs a **default design/file** for each product. In Printful Dashboard, either create sync products with your logo/design and use those, or ensure the catalog products you’re selling have a default print file (e.g. via a product template).
- **If using the static list** (`store-products.js`): In Printful, create the products (e.g. “The Tool Guru Tee”) with your design, get the **variant IDs**, and put them in `printfulVariantId` for each product.
- **Test order:** Place one test order (Stripe test mode is fine), confirm it appears in Printful and you can approve/fulfill it. Cancel it in Printful if you don’t want it shipped.

---

## 4. Legal and trust

- **Refunds:** Decide your policy (e.g. “Refunds within 30 days”). Add a short note on the store or success page and/or link to a “Refunds” or “Terms” page.
- **Privacy:** If your privacy policy doesn’t mention payment data, add a line that checkout is handled by Stripe and you don’t store card details.

---

## 5. Final test on the deployed branch

1. Deploy the `store` branch to Vercel (or use the preview URL).
2. Add `NEXT_PUBLIC_SITE_URL` to that deployment (preview or production) so redirects work.
3. Open `/store`, add an item, click Checkout.
4. Pay with a Stripe test card (e.g. `4242 4242 4242 4242`) if still in test mode.
5. Confirm you’re redirected to `/store/success`.
6. In Printful Dashboard, confirm the order appears.
7. In Stripe Dashboard → Webhooks, confirm the event was delivered and got a 200 response.

---

## 6. Go live

- Merge `store` into your main/production branch.
- Ensure production env has **live** Stripe keys and **live** webhook secret, plus `NEXT_PUBLIC_SITE_URL`.
- Remove or don’t use test keys in production.

Once this is done, the store is ready for real customers.
