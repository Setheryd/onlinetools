import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import ArticleExtractorTool from '../../components/tools/ArticleExtractorTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
import CommentSection from '../../../components/tools/CommentSection';

export const metadata = {
  title: 'Article Extractor — The Tool Guru',
  description: 'Extract main article content from any URL. Get clean text or markdown with optional metadata. No CORS—server-side fetch.',
  keywords: ['article extractor', 'extract content', 'readability', 'markdown', 'text', 'url', 'blog', 'news', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/article-extractor',
  },
  openGraph: {
    title: 'Article Extractor — The Tool Guru',
    description: 'Extract main article content from any URL. Get clean text or markdown with optional metadata. No CORS—server-side fetch.',
    url: 'https://thetool.guru/tools/article-extractor',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Article Extractor — The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Article Extractor — The Tool Guru',
    description: 'Extract main article content from any URL. Get clean text or markdown with optional metadata. No CORS—server-side fetch.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const ArticleExtractorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <ArticleExtractorTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Article Extractor"
            description="Extract the main article body from any web page. We fetch the URL server-side (no CORS issues), strip navigation and ads, and return clean text or markdown plus optional metadata like title, author, and date. Ideal for archiving, summarization, or feeding content into other tools."
            features={[
              'Extract main article content from any public URL',
              'Output as plain text, markdown, or full JSON',
              'Optional metadata: title, author, publish date',
              'Server-side fetch—works around CORS',
              'Copy or download extracted content',
              'Handles blogs, news articles, and long-form pages'
            ]}
            howToUse={[
              'Enter the article URL',
              'Choose output format (Text, Markdown, or JSON)',
              'Optionally include metadata',
              'Click Extract',
              'Copy or download the result'
            ]}
            useCases={[
              'Archive articles as text or markdown',
              'Prepare content for summarization or LLMs',
              'Build reading lists or newsletters',
              'Extract quotes or citations',
              'Migrate content between platforms',
              'Research and fact-checking'
            ]}
            tips={[
              'Use Markdown format for best structure preservation',
              'Include metadata when you need title/author/date',
              'Some paywalled or JS-heavy pages may not extract fully',
              'Works best on standard article-style pages'
            ]}
            faq={[
              {
                question: 'Does it work on paywalled or login-required pages?',
                answer: 'No. The tool can only fetch publicly accessible content. Paywalled or login-required pages will not return the full article.'
              },
              {
                question: 'Why server-side extraction?',
                answer: 'Fetching from our server avoids browser CORS limits, so you can extract from any public URL without "blocked by CORS" errors.'
              },
              {
                question: 'What if no article is found?',
                answer: 'The tool will indicate that no article content could be extracted. This can happen on non-article pages (e.g. homepages, galleries) or heavily dynamic sites.'
              }
            ]}
          />
        </div>

        <CommentSection
          toolId="article-extractor"
          toolName="Article Extractor"
        />
        <RelatedToolsSection toolId="article-extractor" />
      </Body>
      <Footer />
    </div>
  );
};

export default ArticleExtractorPage;
