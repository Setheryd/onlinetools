import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SitemapGeneratorTool from '../../components/tools/SitemapGeneratorTool';

export const metadata = {
  title: 'Sitemap Generator — The Tool Guru',
  description: 'Generate XML sitemaps for your site with changefreq and priority.',
  keywords: ['sitemap generator', 'xml sitemap', 'seo'],
  openGraph: {
    title: 'Sitemap Generator — The Tool Guru',
    description: 'Create a sitemap.xml file easily.',
  },
};

const SitemapGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <SitemapGeneratorTool />
    </Body>
    <Footer />
  </div>
);

export default SitemapGeneratorPage;


