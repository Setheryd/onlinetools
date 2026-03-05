import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import TracerouteTool from '../../components/tools/TracerouteTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
import CommentSection from '../../../components/tools/CommentSection';

export const metadata = {
  title: 'Traceroute — The Tool Guru',
  description: 'Trace the network path to any host. See each hop and round-trip times. Server-side so it works from anywhere.',
  keywords: ['traceroute', 'network path', 'routing', 'hops', 'latency', 'connectivity', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/traceroute-tool',
  },
  openGraph: {
    title: 'Traceroute — The Tool Guru',
    description: 'Trace the network path to any host. See each hop and round-trip times. Server-side so it works from anywhere.',
    url: 'https://thetool.guru/tools/traceroute-tool',
    siteName: 'The Tool Guru',
    images: [
      { url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'Traceroute — The Tool Guru' },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traceroute — The Tool Guru',
    description: 'Trace the network path to any host. See each hop and round-trip times. Server-side so it works from anywhere.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const TracerouteToolPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <TracerouteTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Traceroute"
            description="Trace the route packets take to reach a host. Each hop shows a router or gateway along the path and the round-trip time (RTT) to that hop. Running from our server gives you a consistent vantage point and avoids browser limits."
            features={[
              'Hop-by-hop path to the destination',
              'Round-trip time (RTT) per hop',
              'Optional max hops limit',
              'Server-side execution—no CORS or browser limits',
              'Works with hostnames or IP addresses',
              'Raw API response available for debugging'
            ]}
            howToUse={[
              'Enter a hostname (e.g. google.com) or IP address',
              'Optionally set max hops (default 30)',
              'Click Trace',
              'View the list of hops and RTTs'
            ]}
            useCases={[
              'See where latency increases along the path',
              'Identify which hop is slow or dropping packets',
              'Verify routing path to a server',
              'Troubleshoot connectivity issues',
              'Compare paths from a remote vantage point'
            ]}
            tips={[
              'Some hops may show * or no reply—routers often block traceroute probes.',
              'Results depend on the Tool Guru API server location.',
              'Max hops limits how many hops to show (typically 30 is enough).'
            ]}
            faq={[
              {
                question: 'Why is traceroute run from your server?',
                answer: 'Running from our server avoids browser security limits and gives you a consistent, remote vantage point for path and latency checks.'
              },
              {
                question: 'Why do some hops show * or no response?',
                answer: 'Many routers are configured to not respond to traceroute probes (ICMP or UDP) for security or policy reasons. The path can still be inferred from subsequent hops.'
              },
              {
                question: 'Is there a rate limit?',
                answer: 'The Tool Guru API may apply rate limits. If you see a rate-limit error, wait a minute and try again.'
              }
            ]}
          />
        </div>

        <CommentSection toolId="traceroute-tool" toolName="Traceroute" />
        <RelatedToolsSection toolId="traceroute-tool" />
      </Body>
      <Footer />
    </div>
  );
};

export default TracerouteToolPage;
