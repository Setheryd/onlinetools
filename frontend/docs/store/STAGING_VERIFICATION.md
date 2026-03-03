# Staging verification

Run these steps against your Vercel **preview** deployment (e.g. the `store` branch) before merging to production.

---

## 1. Get the preview URL

1. In [Vercel](https://vercel.com): open your project → **Deployments**.
2. Click the deployment for the branch you want to test (e.g. `store`).
3. Copy the deployment URL (e.g. `onlinetools-git-store-setheryds-projects.vercel.app` for the store branch).
4. If you use "Anyone with the link," share that full link for manual testing; for the smoke script you need a URL with no protection (or the script will get 401). Use `https://` when running the script: `https://onlinetools-git-store-setheryds-projects.vercel.app`.

---

## 2. Run the smoke script

From the `frontend` directory:

```bash
BASE_URL=https://<your-preview-url> node scripts/smoke-test-preview.js
```

Or pass the URL as the first argument:

```bash
node scripts/smoke-test-preview.js https://<your-preview-url>
```

Or use the npm script (set `BASE_URL` first):

```bash
BASE_URL=https://<your-preview-url> npm run test:preview
```

**Optional – resolve URL via Vercel API:**  
If you set `VERCEL_API_TOKEN` and `VERCEL_PROJECT_ID` (and do not set `BASE_URL` or pass a URL), the script can fetch the latest preview deployment URL for the `store` branch:

```bash
node scripts/smoke-test-preview.js --branch store
```

All six checks should **pass**. If you see **401** on every request:

- **"Anyone with the link"** still uses a cookie set in the browser, so the smoke script (which sends no cookie) will get 401. You can either set deployment protection to **No authentication** for that branch so the script passes, or skip the script and rely on the **manual store flow** (section 3) in the browser—the share link (e.g. `https://onlinetools-git-store-setheryds-projects.vercel.app?...`) works for manual testing.
- For **password** or **Vercel Auth** protection, turn it off for that branch or use a public preview so the script can run.

---

## 3. Manual store flow (payment + webhook)

The smoke script does not run a real checkout. To confirm the full flow:

1. Open **`https://<your-preview-url>/store`** in a browser.
2. Add at least one item to the cart and click **Checkout**.
3. On Stripe Checkout, pay with the test card: **`4242 4242 4242 4242`** (any future expiry, any CVC).
4. Confirm you are redirected to **`/store/success`**.
5. In **Printful Dashboard**, confirm the order appears.
6. In **Stripe Dashboard → Webhooks**, confirm the `checkout.session.completed` event was delivered and returned **200**.

For preview deployments, ensure the webhook in Stripe is set to the **preview URL** if you want the webhook to fire for that deployment (e.g. `https://<your-preview-url>/api/stripe/webhook`). Otherwise use the production URL and run this manual test after go-live.

---

## 4. Relation to production checklist

After staging verification passes, follow [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) for going live (live Stripe keys, live webhook, `NEXT_PUBLIC_SITE_URL`, etc.).
