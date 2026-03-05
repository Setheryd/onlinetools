import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PingTool from '../../components/tools/PingTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
import CommentSection from '../../components/tools/CommentSection';

export const metadata = {
  title: 'Ping & Port Check — The Tool Guru',
  description: 'Check host reachability and latency. Optional port for TCP checks. Server-side so it works from anywhere.',
  keywords: ['ping', 'port check', 'connectivity', 'latency', 'host', 'network', 'TCP', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/ping-tool',
  },
  openGraph: {
    title: 'Ping & Port Check — The Tool Guru',
    description: 'Check host reachability and latency. Optional port for TCP checks. Server-side so it works from anywhere.',
    url: 'https://thetool.guru/tools/ping-tool',
    siteName: 'The Tool Guru',
    images: [
      { url: '/Brand_Assets/Logo.webp', width: 512, height: 512, alt: 'Ping & Port Check — The Tool Guru' },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ping & Port Check — The Tool Guru',
    description: 'Check host reachability and latency. Optional port for TCP checks. Server-side so it works from anywhere.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
};

const PingToolPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <PingTool />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Ping & Port Check"
            description="Check whether a host is reachable and measure latency. Optionally specify a port to test TCP connectivity (e.g. 80, 443, 22). The check runs server-side so you can test from our infrastructure—useful when your local network blocks ICMP or you want a consistent vantage point."
            features={[
              'Check host reachability (ICMP or TCP)',
              'Measure latency in milliseconds',
              'Optional port for TCP port checks',
              'Server-side execution—no CORS or browser limits',
              'Works with hostnames or IP addresses',
              'Raw API response available for debugging'
            ]}
            howToUse={[
              'Enter a hostname (e.g. google.com) or IP address',
              'Optionally enter a port (e.g. 443 for HTTPS)',
              'Click Ping',
              'View reachability and latency'
            ]}
            useCases={[
              'Verify a server or service is up',
              'Check if a port is open from the internet',
              'Measure latency to a host',
              'Quick connectivity troubleshooting',
              'Monitor from a remote vantage point',
              'Validate DNS and routing'
            ]}
            tips={[
              'Leave port empty for standard ping (ICMP if supported by the API).',
              'Use port 80 or 443 to check web server reachability.',
              'Some hosts block ICMP; TCP port checks may still succeed.',
              'Results depend on the Tool Guru API server location.'
            ]}
            faq={[
              {
                question: 'Why is the ping run from your server?',
                answer: 'Running from our server avoids browser security limits (e.g. no raw ICMP from the browser) and gives you a consistent, remote vantage point for connectivity checks.'
              },
              {
                question: 'What if I get "Not reachable"?',
                answer: 'The host may be down, blocking ICMP or the specified port, or unreachable from our network. Try without a port for a basic ping, or a different port (e.g. 80 or 443).'
              },
              {
                question: 'Is there a rate limit?',
                answer: 'The Tool Guru API may apply rate limits. If you see a rate-limit error, wait a minute and try again.'
              }
            ]}
          />
        </div>

        <CommentSection toolId="ping-tool" toolName="Ping & Port Check" />
        <RelatedToolsSection toolId="ping-tool" />
      </Body>
      <Footer />
    </div>
  );
};

export default PingToolPage;
