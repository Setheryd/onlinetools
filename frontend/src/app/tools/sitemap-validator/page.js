import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SitemapValidatorTool from '../../components/tools/SitemapValidatorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
import CommentSection from '../../../components/tools/CommentSection';

export const metadata = {
  title: 'Sitemap Validator — The Tool Guru',
  description: 'Validate XML sitemaps for proper structure, URLs, and search engine compatibility.',
  keywords: ['sitemap', 'validator', 'xml', 'seo', 'search engine', 'urls', 'structure', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/sitemap-validator',
  },
  openGraph: {
    title: 'Sitemap Validator — The Tool Guru',
    description: 'Validate XML sitemaps for proper structure, URLs, and search engine compatibility.',
    url: 'https://thetool.guru/tools/sitemap-validator',
    siteName: 'The Tool Guru',
    images: [
      { url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'Sitemap Validator — The Tool Guru' },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sitemap Validator — The Tool Guru',
    description: 'Validate XML sitemaps for proper structure, URLs, and search engine compatibility.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const SitemapValidatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <SitemapValidatorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Sitemap Validator"
            description="Validate a website's XML sitemap to ensure proper structure and that search engines can parse it correctly. We fetch the sitemap from the given URL (or discover it from the site root) and check for common issues."
            features={[
              'Validate sitemap XML structure',
              'Check for common parsing issues',
              'View URL count and sample URLs',
              'See errors and warnings',
              'Works with sitemap URL or site URL',
              'Server-side fetch—no CORS issues'
            ]}
            howToUse={[
              'Enter the site URL (e.g. https://example.com) or direct sitemap URL (e.g. https://example.com/sitemap.xml)',
              'Click Validate',
              'Review the result: valid, errors, or warnings',
              'Use the raw response for debugging if needed'
            ]}
            useCases={[
              'Verify sitemap before submitting to search engines',
              'Debug crawl or indexing issues',
              'Check sitemap after generation or edits',
              'Audit URL structure and limits',
              'Ensure XML is well-formed and compliant'
            ]}
            tips={[
              'Sitemaps are usually at /sitemap.xml or /sitemap_index.xml. We can discover from the site root.',
              'Large sitemaps (50,000+ URLs) may be split into sitemap index files.',
              'Search engines recommend sitemaps for large or frequently updated sites.'
            ]}
            faq={[
              {
                question: 'What is an XML sitemap?',
                answer: 'An XML sitemap is a file that lists URLs for a site so search engines can discover and crawl them more efficiently. It can include optional metadata like lastmod and priority.'
              },
              {
                question: 'Does this tool change my sitemap?',
                answer: 'No. We only fetch and validate the file as it is. We do not modify your site or file.'
              },
              {
                question: 'What if my site has no sitemap?',
                answer: 'If the URL returns 404 or no sitemap is found, the validator will report that. Many sites work without a sitemap, but sitemaps can help search engines discover pages.'
              }
            ]}
          />
        </div>

        <CommentSection toolId="sitemap-validator" toolName="Sitemap Validator" />
        <RelatedToolsSection toolId="sitemap-validator" />
      </Body>
      <Footer />
    </div>
  );
};

export default SitemapValidatorPage;
