import { NextResponse } from 'next/server';

const PRINTFUL_API = 'https://api.printful.com';
const MAX_PRODUCTS = 8;
/** Default markup over Printful base price (e.g. 2.2 = 120% margin). */
const PRICE_MARKUP = 2.2;

async function fetchPrintful(path) {
  const key = process.env.PRINTFUL_API_KEY;
  if (!key) return null;
  const res = await fetch(`${PRINTFUL_API}${path}`, {
    headers: { Authorization: `Bearer ${key}` },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

/**
 * GET /api/store/catalog
 * Returns a curated list of products from Printful catalog with real variant IDs.
 * Used by the store page when PRINTFUL_API_KEY is set. Falls back to static list otherwise.
 */
export async function GET() {
  try {
    const listRes = await fetchPrintful('/products');
    if (!listRes?.result?.length) {
      return NextResponse.json({ products: [] });
    }

    const productIds = listRes.result
      .filter((p) => !p.is_discontinued && p.variant_count > 0)
      .slice(0, MAX_PRODUCTS)
      .map((p) => p.id);

    const products = [];
    for (const productId of productIds) {
      const detailRes = await fetchPrintful(`/products/${productId}`);
      const product = detailRes?.result?.product;
      const variants = detailRes?.result?.variants;
      if (!product || !variants?.length) continue;

      const v = variants[0];
      const basePrice = parseFloat(v.price);
      const priceCents = Math.round(basePrice * PRICE_MARKUP * 100);
      const image =
        v.image ||
        product.image ||
        'https://files.cdn.printful.com/products/12/product_1550594502.jpg';

      products.push({
        id: `pf-${productId}-${v.id}`,
        name: `The Tool Guru ${product.type_name || product.title}`,
        description:
          product.description ||
          `${product.title}. Premium quality, printed on demand.`,
        priceCents: Math.max(499, priceCents),
        printfulVariantId: v.id,
        image,
      });
    }

    return NextResponse.json({ products });
  } catch (err) {
    console.error('Store catalog error:', err);
    return NextResponse.json({ products: [] });
  }
}
