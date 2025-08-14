import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import DnsLookupTool from '../../components/tools/DnsLookupTool';

export const metadata = {
  title: 'DNS Lookup — The Tool Guru',
  description: 'Resolve DNS records (A, AAAA, CNAME, MX, NS, TXT, SOA, SRV, PTR) for any domain.',
  openGraph: {
    title: 'DNS Lookup — The Tool Guru',
    description: 'Resolve DNS records (A, AAAA, CNAME, MX, NS, TXT, SOA, SRV, PTR) for any domain.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <DnsLookupTool />
    </Body>
    <Footer />
  </div>
);

export default Page;


