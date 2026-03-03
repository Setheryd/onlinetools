import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import MetaTagGeneratorTool from '../../components/tools/MetaTagGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Meta Tag Generator — The Tool Guru',
  description: 'Generate SEO and social meta tags (Open Graph, Twitter) for your pages.',
  keywords: ['meta tags', 'open graph', 'twitter cards', 'seo', 'generator'],
  alternates: {
    canonical: 'https://thetool.guru/tools/meta-tag-generator',
  },
  openGraph: {
    title: 'Meta Tag Generator — The Tool Guru',
    description: 'Generate SEO and social meta tags (Open Graph, Twitter) for your pages.',
    url: 'https://thetool.guru/tools/meta-tag-generator',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Meta Tag Generator — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meta Tag Generator — The Tool Guru',
    description: 'Generate SEO and social meta tags (Open Graph, Twitter) for your pages.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const MetaTagGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <MetaTagGeneratorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Meta Tag Generator"
          description="Generate SEO and social meta tags: title, description, Open Graph, and Twitter Card markup. Paste into your HTML head for better search and social previews. All in your browser."
          features={["Title, description", "Open Graph tags", "Twitter Card tags", "Copy HTML", "Works in browser"]}
          howToUse={["Enter page title and description", "Add image URL if needed", "Copy generated meta tags into your page head"]}
          useCases={["New pages", "Blog posts", "Landing pages", "Social sharing"]}
          faq={[
            { question: "What are Open Graph tags?", answer: "Meta tags that control how your page looks when shared on Facebook, LinkedIn, etc. (og:title, og:description, og:image)." },
            { question: "Do I need both OG and Twitter?", answer: "Twitter can use OG tags as fallback. Adding Twitter-specific tags gives you control over how it looks on Twitter." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="meta-tag-generator" />
    </Body>
    <Footer />
  </div>
);

export default MetaTagGeneratorPage;


