import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import MetaAnalyzerTool from '../../components/tools/MetaAnalyzerTool';

export const metadata = {
  title: 'Meta Tag & Open Graph Analyzer — The Tool Guru',
  description: 'Audit meta tags, Open Graph, Twitter card, and canonical link for any URL.',
  openGraph: {
    title: 'Meta Tag & Open Graph Analyzer — The Tool Guru',
    description: 'Audit meta tags, Open Graph, Twitter card, and canonical link for any URL.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <MetaAnalyzerTool />
    </Body>
    <Footer />
  </div>
);

export default Page;


