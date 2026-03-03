import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WebsiteScreenshotTool from '../../components/tools/WebsiteScreenshotTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';

export const metadata = {
  title: 'Screenshot Tool — Capture Web Pages | The Tool Guru',
  description: 'Capture full-page screenshots of websites. Same as Website Screenshot Tool—enter a URL, choose format and viewport, download.',
  keywords: ['screenshot', 'capture', 'webpage', 'website screenshot', 'png', 'jpg', 'the tool guru'],
  alternates: { canonical: 'https://thetool.guru/tools/screenshot-tool' },
  openGraph: {
    title: 'Screenshot Tool — The Tool Guru',
    description: 'Capture full-page screenshots of websites.',
    url: 'https://thetool.guru/tools/screenshot-tool',
    siteName: 'The Tool Guru',
    images: [{ url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'Screenshot Tool' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Screenshot Tool — The Tool Guru', images: ['/Brand_Assets/Logo.webp'], creator: '@thetoolguru', site: '@thetoolguru' },
};

const ScreenshotToolPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <WebsiteScreenshotTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Screenshot Tool"
          description="Capture full-page screenshots of websites. Enter a URL, choose viewport width and format (PNG, JPG, WebP), and download. Same tool as Website Screenshot Tool."
          features={[
            'Capture full-page screenshots of websites',
            'Viewport presets (desktop, tablet, mobile)',
            'PNG, JPG, WebP formats',
            'High-resolution output',
            'Download instantly',
          ]}
          howToUse={[
            'Enter the website URL',
            'Select viewport width',
            'Choose format (PNG, JPG, WebP)',
            "Click Capture and download when ready",
          ]}
          useCases={[
            'Documentation and portfolios',
            'Design reference and archiving',
            'Presentations and social sharing',
          ]}
          faq={[
            { question: 'Can I screenshot any website?', answer: 'Publicly accessible websites only. Password-protected or localhost pages are not accessible.' },
            { question: 'Same as Website Screenshot Tool?', answer: 'Yes. This is the same tool; use either URL.' },
          ]}
        />
      </div>
      <RelatedToolsSection toolId="screenshot-tool" />
    </Body>
    <Footer />
  </div>
);

export default ScreenshotToolPage;
