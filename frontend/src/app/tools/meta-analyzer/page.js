import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import MetaAnalyzerTool from '../../components/tools/MetaAnalyzerTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Meta Tag & Open Graph Analyzer — The Tool Guru',
  description: 'Audit meta tags, Open Graph, Twitter card, and canonical link for any URL.',
  openGraph: {
    title: 'Meta Tag & Open Graph Analyzer — The Tool Guru',
    description: 'Audit meta tags, Open Graph, Twitter card, and canonical link for any URL.',
  },
}

const Page = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <MetaAnalyzerTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Meta Tag & Open Graph Analyzer"
          description="Audit meta tags, Open Graph tags, Twitter cards, and canonical links for any URL. Our meta analyzer extracts and displays all SEO and social media metadata from web pages, helping you understand how pages appear in search results and social media shares. Perfect for SEO audits, social media optimization, competitive analysis, or ensuring your pages have proper metadata configured."
          features={[
            "Extract and display all meta tags",
            "Analyze Open Graph tags for social media",
            "Check Twitter Card metadata",
            "View canonical link tags",
            "Display title, description, and keywords",
            "Show structured data and schema",
            "Analyze any publicly accessible URL",
            "Works entirely in your browser"
          ]}
          howToUse={[
            "Enter the URL you want to analyze",
            "Click 'Analyze' to fetch and parse metadata",
            "View all extracted meta tags",
            "Check Open Graph tags for social sharing",
            "Review Twitter Card configuration",
            "Verify canonical links",
            "Review SEO metadata completeness",
            "Use results to improve your page metadata"
          ]}
          useCases={[
            "Audit SEO metadata for websites",
            "Check social media sharing optimization",
            "Analyze competitor metadata strategies",
            "Verify Open Graph tag configuration",
            "Ensure proper Twitter Card setup",
            "Check canonical link implementation",
            "Review meta tag completeness",
            "Optimize pages for search and social"
          ]}
          tips={[
            "Check that all important meta tags are present",
            "Verify Open Graph tags for proper social sharing",
            "Ensure Twitter Cards are configured correctly",
            "Check canonical links to avoid duplicate content",
            "Review title and description lengths",
            "Analyze competitor pages for best practices",
            "Use results to improve your metadata strategy"
          ]}
          faq={[
            {
              question: "What are Open Graph tags?",
              answer: "Open Graph tags are meta tags that control how content appears when shared on social media platforms like Facebook, LinkedIn, and Twitter. They include og:title, og:description, og:image, etc."
            },
            {
              question: "What are Twitter Cards?",
              answer: "Twitter Cards are meta tags that enhance how links appear in Twitter. They provide rich previews with images, titles, and descriptions when URLs are shared on Twitter."
            },
            {
              question: "Can I analyze any website?",
              answer: "You can analyze any publicly accessible website. The tool fetches the page and extracts metadata. Some sites may block automated access."
            },
            {
              question: "Why is metadata important?",
              answer: "Metadata (meta tags, Open Graph, etc.) controls how your pages appear in search results and social media shares. Proper metadata improves click-through rates and social engagement."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default Page;


