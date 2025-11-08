import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SitemapGeneratorTool from '../../components/tools/SitemapGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Sitemap Generator — The Tool Guru',
  description: 'Generate XML sitemaps for your site with changefreq and priority.',
  keywords: ['sitemap generator', 'xml sitemap', 'seo'],
  openGraph: {
    title: 'Sitemap Generator — The Tool Guru',
    description: 'Create a sitemap.xml file easily.',
  },
};

const SitemapGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <SitemapGeneratorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Sitemap Generator"
          description="Generate XML sitemaps for your website with changefreq and priority settings. Our sitemap generator creates properly formatted XML sitemaps that help search engines discover and index your pages. Perfect for SEO optimization, ensuring all pages are crawlable, and helping search engines understand your site structure. The tool supports priority levels, change frequency settings, and last modification dates."
          features={[
            "Generate XML sitemap files",
            "Set priority levels for pages",
            "Configure change frequency (always, hourly, daily, weekly, monthly, yearly, never)",
            "Add last modification dates",
            "Include all important pages",
            "Download sitemap.xml file",
            "Validate sitemap format",
            "Works entirely in your browser for privacy"
          ]}
          howToUse={[
            "Enter your website URLs",
            "Set priority levels for each page (0.0 to 1.0)",
            "Configure change frequency for each page",
            "Add last modification dates if known",
            "Review the sitemap structure",
            "Generate the XML sitemap",
            "Download the sitemap.xml file",
            "Upload to your website root directory"
          ]}
          useCases={[
            "Create sitemaps for new websites",
            "Generate sitemaps for SEO optimization",
            "Help search engines discover all pages",
            "Submit sitemaps to Google Search Console",
            "Ensure proper site indexing",
            "Update sitemaps when adding new pages",
            "Optimize crawl priority for important pages",
            "Improve search engine visibility"
          ]}
          tips={[
            "Set higher priority (0.8-1.0) for important pages",
            "Use appropriate change frequency (daily for blogs, monthly for static pages)",
            "Include all important pages in your sitemap",
            "Update sitemaps when adding new content",
            "Submit sitemaps to search engines",
            "Keep sitemaps under 50,000 URLs (use sitemap index for larger sites)",
            "Place sitemap.xml in your website root directory"
          ]}
          faq={[
            {
              question: "What is an XML sitemap?",
              answer: "An XML sitemap is a file that lists all important pages on your website, helping search engines discover and crawl your content. It includes URLs, priorities, change frequencies, and last modification dates."
            },
            {
              question: "Do I need a sitemap?",
              answer: "While not required, sitemaps help search engines discover and index your pages, especially for large sites or sites with complex navigation. They're particularly useful for new sites or pages with few internal links."
            },
            {
              question: "What priority should I use?",
              answer: "Priority ranges from 0.0 to 1.0. Use 1.0 for your homepage and most important pages, 0.8-0.9 for important content pages, and lower values for less important pages. Default is 0.5."
            },
            {
              question: "How often should I update my sitemap?",
              answer: "Update your sitemap whenever you add new pages or make significant changes. Submit updated sitemaps to search engines through Google Search Console or other webmaster tools."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default SitemapGeneratorPage;


