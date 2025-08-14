import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SslCheckerTool from '../../components/tools/SslCheckerTool';

export const metadata = {
  title: 'SSL Certificate Checker — The Tool Guru',
  description: 'Check SSL certificate details, SANs, issuer, and expiry for any host.',
  openGraph: {
    title: 'SSL Certificate Checker — The Tool Guru',
    description: 'Check SSL certificate details, SANs, issuer, and expiry for any host.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <SslCheckerTool />
    </Body>
    <Footer />
  </div>
);

export default Page;


