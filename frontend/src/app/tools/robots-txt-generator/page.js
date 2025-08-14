import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RobotsTxtGeneratorTool from '../../components/tools/RobotsTxtGeneratorTool';

export const metadata = {
  title: 'robots.txt Generator — The Tool Guru',
  description: 'Create robots.txt with allow/disallow rules and sitemap links.',
  keywords: ['robots.txt', 'generator', 'seo'],
  openGraph: {
    title: 'robots.txt Generator — The Tool Guru',
    description: 'Generate robots.txt for your site.',
  },
};

const RobotsTxtGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <RobotsTxtGeneratorTool />
    </Body>
    <Footer />
  </div>
);

export default RobotsTxtGeneratorPage;


