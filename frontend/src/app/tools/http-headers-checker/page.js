import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HttpHeadersTool from '../../components/tools/HttpHeadersTool';

export const metadata = {
  title: 'HTTP Headers Checker — The Tool Guru',
  description: 'Inspect HTTP response headers and the full redirect chain for any URL.',
  openGraph: {
    title: 'HTTP Headers Checker — The Tool Guru',
    description: 'Inspect HTTP response headers and the full redirect chain for any URL.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <HttpHeadersTool />
    </Body>
    <Footer />
  </div>
);

export default Page;


