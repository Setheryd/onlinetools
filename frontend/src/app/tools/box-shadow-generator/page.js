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
        <ToolContentSection
          toolName="Box Shadow Generator"
          description="Create CSS box-shadow values with a live visual preview. Box shadows add depth and hierarchy to buttons, cards, and modals without extra images or assets. This tool lets you adjust horizontal and vertical offset, blur radius, spread radius, color, and opacity, and optionally create inset shadows—all while seeing the result in real time. Copy the generated CSS with one click and paste it into your stylesheet or design system. No account required; everything runs in your browser so your designs stay private. Perfect for front-end developers, UI designers, and anyone who wants pixel-perfect shadows without guessing values."
          features={[
            'Live visual preview of the box shadow as you adjust parameters',
            'Control horizontal and vertical offset, blur radius, and spread',
            'Color picker and opacity slider for the shadow color',
            'Inset option for inner shadows (e.g., pressed or recessed effects)',
            'One-click copy of the CSS rule to clipboard',
            'Runs entirely in your browser; no data sent to servers'
          ]}
          howToUse={[
            'Adjust the sliders for offset X, offset Y, blur, and spread to shape the shadow',
            'Use the color picker and opacity to set the shadow color',
            'Toggle "Inset" if you want an inner shadow instead of an outer one',
            'Watch the preview update in real time',
            'Click "Copy CSS" to copy the box-shadow rule for your stylesheet'
          ]}
          useCases={[
            'Design card and button shadows for web or app UI',
            'Match shadow styles from design tools (Figma, Sketch) in code',
            'Experiment quickly with depth and elevation without writing CSS by hand',
            'Teach or learn how box-shadow parameters affect the visual result'
          ]}
          tips={[
            'Subtle shadows (small offset, moderate blur) often look more professional than heavy ones.',
            'Use a slight negative spread to create a softer, more natural edge.',
            'Inset shadows work well for input fields or pressed states.'
          ]}
          faq={[
            { question: 'Is data sent to a server?', answer: 'No. The generator runs entirely in your browser. Your settings and the generated CSS never leave your device.' },
            { question: 'Can I use the output in Tailwind or other frameworks?', answer: 'Yes. The copied value is standard CSS (e.g., box-shadow: 0 4px 6px rgba(0,0,0,0.1)). You can use it in plain CSS, Tailwind arbitrary values, or any framework that accepts CSS.' },
            { question: 'What is the difference between blur and spread?', answer: 'Blur softens the shadow edge; spread expands or shrinks the shadow size before blur is applied. Larger spread makes the shadow bigger; negative spread can create a tighter, softer halo.' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="box-shadow-generator" />
    </Body>
    <Footer />
  </div>
);

export default BoxShadowGeneratorPage;
