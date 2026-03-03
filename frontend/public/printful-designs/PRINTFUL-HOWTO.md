# How to use these designs in Printful (and when to share IDs)

## Step 1: Get your PNGs

1. Open **/printful-designs** on your site (e.g. `https://thetool.guru/printful-designs` or `http://localhost:3000/printful-designs`).
2. Pick a design (profile logo or vector).
3. Click **PNG 2250px** for tees, mugs, totes, etc., or **PNG 4500px** for posters/large print.
4. The file downloads (e.g. `07-if-it-works-dont-touch-it-printful-2250w.png`).

## Step 2: Create a product template in Printful

1. Go to [Printful Dashboard → Product templates](https://www.printful.com/dashboard/product-templates).
2. Click **Create product** (or **Add product**).
3. Choose your product (e.g. **Unisex Staple T-Shirt**, **Classic Mug**, **Poster**).
4. When asked for the **print file**, upload the PNG you downloaded.
5. Position the design on the template if needed (center, resize).
6. Pick the **product color** (e.g. Black, White) if required.
7. Click **Save as template**. Give it a name (e.g. "If It Works Don't Touch It - Tee").

You now have a **product template** saved in Printful. You can reuse it to add the same design to more products later.

## Step 3: Add the template to your store (or order for yourself)

- **Add to store:** From Product templates, hover the template → **Add to store**. Pick your store (e.g. Shopify, WooCommerce), then fill in title, description, price, and publish.
- **Order for yourself:** Hover the template → **New order** → **Personal orders**. Pick size/color and checkout.

You do **not** need to give me any product or variant codes for this. The designs are just PNGs; Printful handles printing and fulfillment.

---

## When would you give me a product variant code?

Only if we build something that needs to **talk to Printful** or your store, for example:

- **Product catalog on thetool.guru** – Show “Buy this shirt” and link to the right product/variant (we’d need store product URLs or variant IDs).
- **Sync designs to specific products** – Automatically assign a design to a Printful product (we’d need **Printful product template ID** or **catalog product/variant IDs**).
- **Checkout or cart integration** – Add Printful items to a cart from our site (we’d need **variant IDs** from your e‑commerce platform or Printful API).

### Where to find IDs (if we need them later)

- **Printful:** Dashboard → **Stores** → [Your store] → **Products**. Open a product; the URL often contains the product ID. Variant IDs show in the product edit screen or via [Printful API](https://developers.printful.com/).
- **Shopify / WooCommerce / etc.:** In the admin, open the product/variant; the ID is in the URL or in export/API docs.

For now: **just use the PNGs in Printful as above.** If we add a store, catalog, or sync feature later, I’ll ask you for the specific IDs or links we need.
