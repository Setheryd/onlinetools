import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import MetaTagGeneratorTool from '../../components/tools/MetaTagGeneratorTool';

export const metadata = {
  title: 'Meta Tag Generator — The Tool Guru',
  description: 'Generate SEO and social meta tags (Open Graph, Twitter) for your pages.',
  keywords: ['meta tags', 'open graph', 'twitter cards', 'seo', 'generator'],
  openGraph: {
    title: 'Meta Tag Generator — The Tool Guru',
    description: 'Generate SEO and social meta tags (Open Graph, Twitter) for your pages.',
  },
}

const MetaTagGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <MetaTagGeneratorTool />
      </Body>
      <Footer />
    </div>
  );
};

export default MetaTagGeneratorPage;


