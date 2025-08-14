import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import HtaccessGeneratorTool from '../../components/tools/HtaccessGeneratorTool';

export const metadata = {
  title: '.htaccess Generator — The Tool Guru',
  description: 'Generate .htaccess rules for Apache (HTTPS, host redirects, caching).',
  keywords: ['htaccess', 'apache', 'generator', 'redirects', 'rewrite'],
  openGraph: {
    title: '.htaccess Generator — The Tool Guru',
    description: 'Create .htaccess snippets easily.',
  },
};

const HtaccessGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <HtaccessGeneratorTool />
    </Body>
    <Footer />
  </div>
);

export default HtaccessGeneratorPage;


