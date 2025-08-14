import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RedirectCheckerTool from '../../components/tools/RedirectCheckerTool';

export const metadata = {
  title: 'Redirect Checker — The Tool Guru',
  description: 'Follow and analyze URL redirects and chains with status codes and headers.',
  openGraph: {
    title: 'Redirect Checker — The Tool Guru',
    description: 'Follow and analyze URL redirects and chains with status codes and headers.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <RedirectCheckerTool />
    </Body>
    <Footer />
  </div>
);

export default Page;


