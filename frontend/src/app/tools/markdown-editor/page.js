import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import MarkdownEditorTool from '../../components/tools/MarkdownEditorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';

export const metadata = {
  title: 'Markdown Editor — Write & Preview Markdown | The Tool Guru',
  description: 'Write and preview Markdown in real time. Copy as Markdown or HTML. No signup. All processing in your browser.',
  keywords: ['markdown editor', 'markdown preview', 'write markdown', 'markdown', 'github markdown', 'the tool guru'],
  alternates: { canonical: 'https://thetool.guru/tools/markdown-editor' },
  openGraph: {
    title: 'Markdown Editor — Write & Preview Markdown | The Tool Guru',
    description: 'Write and preview Markdown in real time. Copy as Markdown or HTML. All in your browser.',
    url: 'https://thetool.guru/tools/markdown-editor',
    siteName: 'The Tool Guru',
    images: [{ url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'Markdown Editor' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown Editor — Write & Preview Markdown | The Tool Guru',
    description: 'Write and preview Markdown in real time.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Markdown Editor',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  url: 'https://thetool.guru/tools/markdown-editor',
  description: 'Write and preview Markdown in real time. Copy as Markdown or HTML. No signup. All in your browser.',
  browserRequirements: 'Requires JavaScript. Works in modern browsers.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Live Markdown preview', 'Copy as Markdown or HTML', 'GFM support', 'Works in browser for privacy'],
};

const MarkdownEditorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <Header />
    <Body>
      <MarkdownEditorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Markdown Editor"
          description="Write and preview Markdown content with real-time rendering. Supports GitHub Flavored Markdown: headers, lists, links, code blocks, tables. Perfect for documentation, README files, or blog drafts. All processing runs in your browser."
          features={[
            'Real-time Markdown preview',
            'Copy as Markdown or as HTML',
            'GitHub Flavored Markdown (GFM) support',
            'Code blocks, tables, task lists',
            'No uploads—everything in your browser',
          ]}
          howToUse={[
            'Type or paste Markdown in the left panel',
            'View the live preview on the right',
            'Use Copy Markdown or Copy HTML as needed',
            'Reset to sample or Clear to start over',
          ]}
          useCases={[
            'Draft README or documentation',
            'Preview Markdown before publishing',
            'Convert Markdown to HTML quickly',
            'Learn Markdown syntax with live feedback',
          ]}
          tips={[
            'Use # for headers, ** for bold, * for italic',
            'Wrap code in backticks for inline or triple backticks for blocks',
            'Tables use pipe for columns and dashes for header separator',
          ]}
          faq={[
            { question: 'Is my content sent to a server?', answer: 'No. The editor runs entirely in your browser. Your Markdown is never uploaded or stored.' },
            { question: 'What Markdown flavor is supported?', answer: 'GitHub Flavored Markdown (GFM) is supported, including tables, task lists, and strikethrough.' },
          ]}
        />
      </div>
      <RelatedToolsSection toolId="markdown-editor" />
    </Body>
    <Footer />
  </div>
);

export default MarkdownEditorPage;
