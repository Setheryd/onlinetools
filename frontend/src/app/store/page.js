'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Body from '../components/layout/Body';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { STORE_PRODUCTS, getProductById } from '@/lib/store-products';

function StorePageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState(STORE_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    fetch('/api/store/catalog')
      .then((res) => res.json())
      .then((data) => {
        if (data.products?.length > 0) setProducts(data.products);
      })
      .catch(() => {})
      .finally(() => setCatalogLoading(false));
  }, []);

  useEffect(() => {
    const addId = searchParams.get('add');
    if (!addId) return;
    const product = getProductById(addId) || products.find((p) => p.id === addId);
    if (product) {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      window.history.replaceState({}, '', '/store');
      return;
    }
    fetch('/api/store/catalog')
      .then((res) => res.json())
      .then((data) => {
        const found = data.products?.find((p) => p.id === addId);
        if (found) {
          setProducts((prev) => (prev.some((p) => p.id === found.id) ? prev : [...prev, found]));
          setCart((prev) => {
            const existing = prev.find((i) => i.id === found.id);
            if (existing) {
              return prev.map((i) =>
                i.id === found.id ? { ...i, quantity: i.quantity + 1 } : i
              );
            }
            return [...prev, { ...found, quantity: 1 }];
          });
          window.history.replaceState({}, '', '/store');
        }
      })
      .catch(() => {});
  }, [searchParams]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === productId
            ? { ...i, quantity: Math.max(0, i.quantity + delta) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  };

  const cartTotalCents = cart.reduce(
    (sum, i) => sum + i.priceCents * i.quantity,
    0
  );
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/store/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((i) => ({
            id: i.id,
            quantity: i.quantity,
            printfulVariantId: i.printfulVariantId,
            priceCents: i.priceCents,
            name: i.name,
            image: i.image,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      if (data.url) window.location.href = data.url;
    } catch (err) {
      alert(err.message || 'Something went wrong. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              The Tool Guru Store
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Support the site with branded merch. Printed and shipped by Printful.
            </p>
          </div>

          {catalogLoading && (
            <p className="text-center text-gray-500 mb-8">Loading products…</p>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden flex flex-col group">
                <Link href={`/store/${encodeURIComponent(product.id)}`} className="block flex-1 flex flex-col">
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:opacity-95 transition-opacity"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h2 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="text-lg font-bold text-gray-900 mt-auto">
                      ${(product.priceCents / 100).toFixed(2)}
                    </p>
                  </div>
                </Link>
                <div className="p-4 pt-0">
                  <Button
                    variant="primary"
                    onClick={() => addToCart(product)}
                    className="w-full"
                  >
                    Add to cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {cart.length > 0 && (
            <Card className="sticky bottom-4 z-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </h2>
              <ul className="space-y-3 mb-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 text-sm hover:underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                    <span className="text-gray-700">
                      ${((item.priceCents * item.quantity) / 100).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4">
                <span className="text-lg font-bold text-gray-900">
                  Total: ${(cartTotalCents / 100).toFixed(2)}
                </span>
                <Button
                  variant="primary"
                  onClick={handleCheckout}
                  size="lg"
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? 'Redirecting…' : 'Checkout'}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </Body>
      <Footer />
    </div>
  );
}

function StorePageFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              The Tool Guru Store
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Support the site with branded merch. Printed and shipped by Printful.
            </p>
          </div>
          <p className="text-center text-gray-500">Loading store…</p>
        </div>
      </Body>
      <Footer />
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<StorePageFallback />}>
      <StorePageContent />
    </Suspense>
  );
}
