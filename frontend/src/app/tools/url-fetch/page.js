import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import UrlFetchTool from '../../components/tools/UrlFetchTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
import CommentSection from '../../../components/tools/CommentSection';

export const metadata = {
  title: 'URL Fetch — The Tool Guru',
  description: 'Fetch any URL from our server and view status, headers, and body. No CORS—works for any public URL. Debug redirects and API responses.',
  keywords: ['url fetch', 'fetch url', 'no CORS', 'HTTP request', 'headers', 'status code', 'debug', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/url-fetch',
  },
  openGraph: {
    title: 'URL Fetch — The Tool Guru',
    description: 'Fetch any URL from our server and view status, headers, and body. No CORS—works for any public URL.',
    url: 'https://thetool.guru/tools/url-fetch',
    siteName: 'The Tool Guru',
    images: [{ url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'URL Fetch — The Tool Guru' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Fetch — The Tool Guru',
    description: 'Fetch any URL and view status, headers, and body. No CORS.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const UrlFetchPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <UrlFetchTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="URL Fetch"
          description="Enter a URL and we fetch it from our server, then show you the HTTP status, response headers, and optional body. Because the request runs server-side, there are no CORS restrictions—you can inspect any public URL. Useful for debugging APIs, checking redirects, or viewing responses that browsers block."
          features={[
            'Fetch any public URL (no CORS)',
            'View HTTP status code',
            'Inspect response headers',
            'Optionally include response body',
            'Server-side fetch—works from anywhere',
          ]}
          howToUse={[
            'Enter the URL to fetch',
            'Choose whether to include the response body',
            'Click Fetch',
            'Review status, headers, and body',
          ]}
          useCases={[
            'Debug API endpoints and webhooks',
            'Check redirect chains and final URL',
            'Inspect headers (caching, CORS, etc.)',
            'View responses that fail in the browser due to CORS',
            'Quick health checks for URLs',
          ]}
          tips={[
            'Uncheck "Include body" for large responses to speed up the request.',
            'Only public URLs can be fetched; we do not send cookies or auth.',
          ]}
        />
      </div>
      <CommentSection toolId="url-fetch" toolName="URL Fetch" />
      <RelatedToolsSection toolId="url-fetch" />
    </Body>
    <Footer />
  </div>
);

export default UrlFetchPage;
