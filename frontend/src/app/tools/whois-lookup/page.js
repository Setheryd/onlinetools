import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WhoisLookupTool from '../../components/tools/WhoisLookupTool';

export const metadata = {
  title: 'WHOIS Lookup — The Tool Guru',
  description: 'Get domain registration and expiry information via WHOIS.',
  openGraph: {
    title: 'WHOIS Lookup — The Tool Guru',
    description: 'Get domain registration and expiry information via WHOIS.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <WhoisLookupTool />
    </Body>
    <Footer />
  </div>
);

export default Page;


