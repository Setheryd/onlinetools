import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import RobotsTxtValidatorTool from '../../components/tools/RobotsTxtValidatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
import CommentSection from '../../../components/tools/CommentSection';

export const metadata = {
  title: 'Robots.txt Validator — The Tool Guru',
  description: 'Validate your robots.txt file for proper syntax and search engine crawling instructions.',
  keywords: ['robots.txt', 'validator', 'search engine', 'crawling', 'seo', 'webmaster', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/robots-txt-validator',
  },
  openGraph: {
    title: 'Robots.txt Validator — The Tool Guru',
    description: 'Validate your robots.txt file for proper syntax and search engine crawling instructions.',
    url: 'https://thetool.guru/tools/robots-txt-validator',
    siteName: 'The Tool Guru',
    images: [
      { url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'Robots.txt Validator — The Tool Guru' },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Robots.txt Validator — The Tool Guru',
    description: 'Validate your robots.txt file for proper syntax and search engine crawling instructions.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const RobotsTxtValidatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <RobotsTxtValidatorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Robots.txt Validator"
            description="Validate a website's robots.txt file to ensure it follows the correct syntax and that search engine crawlers will interpret it as intended. We fetch the robots.txt from the given URL and check for common issues."
            features={[
              'Validate robots.txt syntax',
              'Check for common crawling issues',
              'View fetched robots.txt content',
              'See errors and warnings',
              'Works with any public URL',
              'Server-side fetch—no CORS issues'
            ]}
            howToUse={[
              'Enter the full URL of the site (e.g. https://example.com)',
              'Click Validate',
              'Review the result: valid, errors, or warnings',
              'Use the raw response for debugging if needed'
            ]}
            useCases={[
              'Verify robots.txt before launch',
              'Debug crawl blocking or allowing issues',
              'Check syntax after manual edits',
              'Audit SEO and crawler directives',
              'Ensure sitemap and disallow rules are correct'
            ]}
            tips={[
              'robots.txt is fetched from the origin (e.g. https://example.com/robots.txt).',
              'Ensure your server returns robots.txt with a 200 and text/plain when appropriate.',
              'Use Disallow and Allow carefully; crawlers may have different interpretations.'
            ]}
            faq={[
              {
                question: 'What is robots.txt?',
                answer: 'robots.txt is a file at the root of a site that tells search engine crawlers which paths they may or may not request. It uses directives like User-agent, Allow, and Disallow.'
              },
              {
                question: 'Does this tool change my robots.txt?',
                answer: 'No. We only fetch and validate the file as it is. We do not modify your site or file.'
              },
              {
                question: 'What if my site has no robots.txt?',
                answer: 'If the URL returns 404 or no file, the validator will report that. Many sites work fine without a robots.txt (crawlers are allowed everywhere by default).'
              }
            ]}
          />
        </div>

        <CommentSection toolId="robots-txt-validator" toolName="Robots.txt Validator" />
        <RelatedToolsSection toolId="robots-txt-validator" />
      </Body>
      <Footer />
    </div>
  );
};

export default RobotsTxtValidatorPage;
