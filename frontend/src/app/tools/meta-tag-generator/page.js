import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import MetaTagGeneratorTool from '../../components/tools/MetaTagGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

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
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Meta Tag Generator"
            description="Generate SEO and social media meta tags (Open Graph, Twitter Cards) for your web pages. Our meta tag generator creates all the essential meta tags needed for search engine optimization and social media sharing. Perfect for ensuring your pages have proper metadata for search engines and social platforms, improving click-through rates, and optimizing how your content appears when shared. Generate complete meta tag sets with one tool."
            features={[
              "Generate standard SEO meta tags (title, description, keywords)",
              "Create Open Graph tags for social media",
              "Generate Twitter Card metadata",
              "Include canonical link tags",
              "Customize all meta tag values",
              "Copy generated HTML code",
              "Preview meta tag structure",
              "Works entirely in your browser for privacy"
            ]}
            howToUse={[
              "Enter your page title and description",
              "Add keywords and other SEO information",
              "Configure Open Graph tags (image, type, etc.)",
              "Set up Twitter Card metadata",
              "Add canonical URL if needed",
              "Review the generated meta tags",
              "Copy the HTML code for your page",
              "Paste into your HTML head section"
            ]}
            useCases={[
              "Generate meta tags for new web pages",
              "Optimize existing pages with proper metadata",
              "Create Open Graph tags for social sharing",
              "Set up Twitter Cards for Twitter sharing",
              "Ensure SEO best practices",
              "Improve social media appearance",
              "Generate complete meta tag sets quickly",
              "Optimize pages for search and social"
            ]}
            tips={[
              "Use descriptive titles (50-60 characters)",
              "Write compelling descriptions (150-160 characters)",
              "Include relevant keywords naturally",
              "Add Open Graph images for better social sharing",
              "Set appropriate Open Graph types",
              "Configure Twitter Cards for rich previews",
              "Use canonical URLs to avoid duplicate content"
            ]}
            faq={[
              {
                question: "What are meta tags?",
                answer: "Meta tags are HTML elements that provide metadata about web pages. They help search engines understand page content and control how pages appear in search results and social media shares."
              },
              {
                question: "Why are Open Graph tags important?",
                answer: "Open Graph tags control how your content appears when shared on social media platforms like Facebook and LinkedIn. They enable rich previews with images, titles, and descriptions."
              },
              {
                question: "What's the difference between Open Graph and Twitter Cards?",
                answer: "Open Graph is used by Facebook, LinkedIn, and other platforms. Twitter Cards are specifically for Twitter. It's best to include both for maximum social media coverage."
              },
              {
                question: "How long should meta descriptions be?",
                answer: "Meta descriptions should be 150-160 characters for optimal display in search results. Shorter descriptions may be cut off, while longer ones may be truncated."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default MetaTagGeneratorPage;


