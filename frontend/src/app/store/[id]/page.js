'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { getProductById, STORE_PRODUCTS } from '@/lib/store-products';

const ProductPage = () => {
  const params = useParams();
  const id = params?.id ? decodeURIComponent(params.id) : null;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const staticProduct = getProductById(id);
    if (staticProduct) {
      setProduct(staticProduct);
      setLoading(false);
      return;
    }
    fetch('/api/store/catalog')
      .then((res) => res.json())
      .then((data) => {
        const found = data.products?.find((p) => p.id === id);
        setProduct(found || null);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    window.location.href = `/store?add=${encodeURIComponent(product.id)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Body>
          <div className="max-w-2xl mx-auto py-12 text-center text-gray-500">
            Loading…
          </div>
        </Body>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Body>
          <div className="max-w-2xl mx-auto py-12 text-center">
            <p className="text-gray-600 mb-4">Product not found.</p>
            <Link href="/store" className="text-blue-600 hover:text-blue-700 hover:underline">
              Back to store
            </Link>
          </div>
        </Body>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-2xl mx-auto">
          <Link
            href="/store"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            ← Back to store
          </Link>
          <Card className="overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="aspect-square relative bg-gray-100 min-h-[280px] sm:w-80 sm:flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 640px) 100vw, 320px"
                  priority
                />
              </div>
              <div className="flex-1 p-6 sm:p-0 sm:pt-2 flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-lg font-bold text-gray-900 mb-4">
                  ${(product.priceCents / 100).toFixed(2)}
                </p>
                {product.description && (
                  <div className="text-gray-600 text-sm mb-6 whitespace-pre-line">
                    {product.description}
                  </div>
                )}
                <Button
                  variant="primary"
                  onClick={addToCart}
                  className="w-full sm:w-auto mt-auto"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default ProductPage;
