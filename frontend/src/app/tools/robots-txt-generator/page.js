import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RobotsTxtGeneratorTool from '../../components/tools/RobotsTxtGeneratorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'robots.txt Generator — The Tool Guru',
  description: 'Create robots.txt with allow/disallow rules and sitemap links.',
  keywords: ['robots.txt', 'generator', 'seo'],
  openGraph: {
    title: 'robots.txt Generator — The Tool Guru',
    description: 'Generate robots.txt for your site.',
  },
};

const RobotsTxtGeneratorPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <RobotsTxtGeneratorTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="robots.txt Generator"
          description="Create robots.txt files with allow/disallow rules and sitemap links. Our robots.txt generator helps you control how search engine crawlers access your website. Perfect for blocking crawlers from specific directories, allowing access to important pages, linking to your sitemap, or managing crawl budgets. The tool generates properly formatted robots.txt files that follow standard conventions."
          features={[
            "Generate robots.txt files",
            "Set allow/disallow rules for user agents",
            "Add sitemap links",
            "Configure rules for specific directories",
            "Support for multiple user agents",
            "Download robots.txt file",
            "Validate robots.txt format",
            "Works entirely in your browser for privacy"
          ]}
          howToUse={[
            "Select user agents (all crawlers or specific ones)",
            "Add disallow rules for directories to block",
            "Add allow rules for directories to permit",
            "Include sitemap URL if available",
            "Review the generated robots.txt",
            "Download the robots.txt file",
            "Upload to your website root directory",
            "Test with robots.txt tester tools"
          ]}
          useCases={[
            "Block crawlers from admin or private directories",
            "Control search engine crawling",
            "Manage crawl budget by blocking unnecessary pages",
            "Allow access to important pages",
            "Link to your sitemap in robots.txt",
            "Configure different rules for different crawlers",
            "Protect sensitive areas from indexing",
            "Optimize search engine crawling"
          ]}
          tips={[
            "Place robots.txt in your website root directory",
            "Use disallow to block directories, allow to permit access",
            "Link to your sitemap in robots.txt",
            "Test robots.txt with testing tools",
            "Be careful not to block important pages",
            "Use wildcards (*) for pattern matching",
            "Submit sitemap URL in robots.txt for better discovery"
          ]}
          faq={[
            {
              question: "What is robots.txt?",
              answer: "robots.txt is a file that tells search engine crawlers which pages or directories they can or cannot access on your website. It's placed in the root directory and follows standard formatting rules."
            },
            {
              question: "Do I need a robots.txt file?",
              answer: "Not required, but useful for controlling crawler access. If you don't have one, crawlers will attempt to access all pages. Use robots.txt to block unnecessary pages and manage crawl budget."
            },
            {
              question: "Can robots.txt block all crawlers?",
              answer: "robots.txt can request crawlers not to access certain areas, but it's not a security measure. It's a guideline that reputable crawlers follow, but it doesn't prevent access - it only requests it."
            },
            {
              question: "Where should I place robots.txt?",
              answer: "robots.txt must be placed in your website's root directory (e.g., https://example.com/robots.txt). It must be accessible at this location for crawlers to find it."
            }
          ]}
        />
      </div>
    </Body>
    <Footer />
  </div>
);

export default RobotsTxtGeneratorPage;


