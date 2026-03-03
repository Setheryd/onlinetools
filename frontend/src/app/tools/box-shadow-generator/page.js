import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import BoxShadowGeneratorTool from '../../components/tools/BoxShadowGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';

export const metadata = {
  title: 'Box Shadow Generator — The Tool Guru',
  description: 'Generate CSS box-shadow with visual preview. Client-side only.',
  keywords: ['box shadow', 'css', 'shadow generator', 'design', 'the tool guru'],
  alternates: { canonical: 'https://thetool.guru/tools/box-shadow-generator' },
  openGraph: { title: 'Box Shadow Generator — The Tool Guru', url: 'https://thetool.guru/tools/box-shadow-generator', siteName: 'The Tool Guru', images: [{ url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'Box Shadow' }], locale: 'en_US', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Box Shadow Generator — The Tool Guru', images: ['/Brand_Assets/Logo.webp'], creator: '@thetoolguru', site: '@thetoolguru' },
};

const structuredData = { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Box Shadow Generator', applicationCategory: 'DesignApplication', url: 'https://thetool.guru/tools/box-shadow-generator', description: 'Generate CSS box-shadow with visual preview.', browserRequirements: 'Requires JavaScript.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, featureList: ['Visual preview', 'Copy CSS', 'Works in browser'] };

const BoxShadowGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <Header />
    <Body>
      <BoxShadowGeneratorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection toolName="Box Shadow Generator" description="Create CSS box-shadow with visual preview. All in your browser." features={['Visual preview', 'Copy CSS', 'Offset blur spread', 'Color and opacity', 'Inset option']} howToUse={['Adjust sliders and color', 'Preview updates live', 'Click Copy CSS']} useCases={['UI design', 'Card shadows']} faq={[{ question: 'Is data sent to a server?', answer: 'No. Runs entirely in your browser.' }]} />
      </div>
      <RelatedToolsSection toolId="box-shadow-generator" />
    </Body>
    <Footer />
  </div>
);

export default BoxShadowGeneratorPage;
