import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WebsiteSpeedTest from '../../components/tools/WebsiteSpeedTest';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Website Speed Test — The Tool Guru',
  description: 'Test your internet connection speed, ping, and website performance metrics. Get detailed speed analysis with download/upload speeds and server response times.',
  keywords: ['speed test', 'internet speed', 'ping test', 'website performance', 'download speed', 'upload speed', 'network test', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/website-speed-test',
  },
  openGraph: {
    title: 'Website Speed Test — The Tool Guru',
    description: 'Test your internet connection speed, ping, and website performance metrics. Get detailed speed analysis with download/upload speeds and server response times.',
    url: 'https://thetool.guru/tools/website-speed-test',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Website Speed Test — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Speed Test — The Tool Guru',
    description: 'Test your internet connection speed, ping, and website performance metrics. Get detailed speed analysis with download/upload speeds and server response times.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const WebsiteSpeedTestPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <WebsiteSpeedTest />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Website Speed Test"
          description="Test internet connection speed (download/upload), ping, and website performance. Get quick metrics for your connection or a URL. Runs in your browser."
          features={["Download/upload speed", "Ping", "URL performance", "Simple metrics", "Browser-based"]}
          howToUse={["Run connection test or enter a URL", "View results", "Compare or share if needed"]}
          useCases={["Check broadband", "Debug slow sites", "Before/after changes"]}
          faq={[
            { question: "How accurate is the speed test?", answer: "Results depend on your connection, server location, and browser. Use as a rough guide." },
            { question: "Does it work on mobile?", answer: "Yes. Run from your phone or tablet to test mobile network speed." }
          ]}
        />
      </div>
      <RelatedToolsSection toolId="website-speed-test" />
    </Body>
    <Footer />
  </div>
);

export default WebsiteSpeedTestPage;
