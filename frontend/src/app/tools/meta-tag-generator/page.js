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
          description="Generate SEO and social meta tags for your web pages: standard title and description, Open Graph tags for Facebook and LinkedIn, and Twitter Card tags for Twitter. When someone shares your link, the right title, description, and image appear in the preview. Enter your page details and get ready-to-paste HTML for the head section of your site. All generation runs in your browser with no server uploads. Perfect for new pages, blog posts, landing pages, and any URL you want to look professional when shared on search and social."
          features={[
            'Generate title and description meta tags for SEO',
            'Open Graph tags (og:title, og:description, og:image, og:url) for Facebook, LinkedIn, and others',
            'Twitter Card tags (twitter:card, twitter:title, etc.) for rich previews on Twitter',
            'Optional image URL for social previews (recommended 1200×630 for best display)',
            'Copy the full HTML block into your page head',
            'Runs in your browser; no data sent to servers'
          ]}
          howToUse={[
            'Enter the page title and description (keep description under ~160 characters for SEO)',
            'Add an image URL for social sharing if you have one (optional but recommended)',
            'Review the generated meta tags in the output',
            'Copy the HTML and paste it into the <head> of your page or template'
          ]}
          useCases={[
            'New pages: add meta tags when launching a new page or site',
            'Blog posts: give each post a unique title, description, and image for sharing',
            'Landing pages: control exactly how the URL looks when shared in emails or social',
            'Social sharing: ensure Facebook, Twitter, and LinkedIn show the right preview'
          ]}
          tips={[
            'Use a descriptive title (50–60 characters) and a compelling description (around 150–160 characters) for search and clicks.',
            'Social images often look best at 1200×630 pixels. Use a clear, readable image that represents the page.',
            'Twitter can fall back to Open Graph tags, but Twitter-specific tags give you control over card type and text on Twitter.'
          ]}
          faq={[
            { question: 'What are Open Graph tags?', answer: 'Open Graph meta tags (og:title, og:description, og:image, og:url) control how your page looks when shared on Facebook, LinkedIn, and other platforms that use OG metadata.' },
            { question: 'Do I need both Open Graph and Twitter tags?', answer: 'Twitter can use OG tags as a fallback. Adding Twitter-specific tags (e.g., twitter:card, twitter:title) gives you explicit control over how the link appears on Twitter.' },
            { question: 'Where do I put the generated tags?', answer: 'Paste them inside the <head> section of your HTML page, or in your template/layout so they appear on every page (or override per page with your CMS or static generator).' }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="meta-tag-generator" />
    </Body>
    <Footer />
  </div>
);

export default MetaTagGeneratorPage;


