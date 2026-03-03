import React from 'react';
import Link from 'next/link';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export const metadata = {
  title: 'Order Confirmed — The Tool Guru Store',
  description: 'Thank you for your order. Your merchandise will be printed and shipped by Printful.',
};

export default function StoreSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-2xl mx-auto text-center">
          <Card className="p-8 md:p-12">
            <div className="text-6xl mb-6">✓</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank you for your order
            </h1>
            <p className="text-gray-600 mb-8">
              Your payment was successful. We&apos;ve sent your order to our print
              partner and you&apos;ll receive a shipping confirmation once it&apos;s on
              its way.
            </p>
            <Link href="/store">
              <Button variant="primary" size="lg">
                Back to store
              </Button>
            </Link>
          </Card>
        </div>
      </Body>
      <Footer />
    </div>
  );
}
