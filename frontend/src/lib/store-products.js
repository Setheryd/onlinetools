/**
 * Fallback store product catalog when Printful catalog API is not used or fails.
 * Replace printfulVariantId with real variant IDs from Printful:
 * Dashboard → Catalog → select product → copy variant ID from the variant you want.
 * Or use the live catalog (GET /api/store/catalog) when PRINTFUL_API_KEY is set.
 */
export const STORE_PRODUCTS = [
  {
    id: 'ttg-tshirt',
    name: 'The Tool Guru Unisex Tee',
    description: 'Soft cotton tee with a clean, modern fit. Your favorite tools, on your chest.',
    priceCents: 2499,
    printfulVariantId: 4012,
    image: '/Brand_Assets/Logo.webp',
  },
  {
    id: 'ttg-mug',
    name: 'Code & Coffee Mug',
    description: '11 oz ceramic mug. Because the best debugging happens with caffeine.',
    priceCents: 1499,
    printfulVariantId: 4386,
    image: '/Brand_Assets/Logo.webp',
  },
  {
    id: 'ttg-sticker',
    name: 'The Tool Guru Sticker Pack',
    description: 'Die-cut vinyl stickers. Laptop, water bottle, or toolbox—show it off.',
    priceCents: 499,
    printfulVariantId: 16177,
    image: '/Brand_Assets/Logo.webp',
  },
  {
    id: 'ttg-hoodie',
    name: 'Dev Mode Hoodie',
    description: 'Cozy pullover hoodie. For when you’re in the zone and the AC is up.',
    priceCents: 4499,
    printfulVariantId: 11943,
    image: '/Brand_Assets/Logo.webp',
  },
  {
    id: 'ttg-poster',
    name: 'Tool Guru Wall Art',
    description: 'Framed or unframed poster. Perfect above the desk where the magic happens.',
    priceCents: 1999,
    printfulVariantId: 1001,
    image: '/Brand_Assets/Logo.webp',
  },
];

export function getProductById(id) {
  return STORE_PRODUCTS.find((p) => p.id === id);
}
