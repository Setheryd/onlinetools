import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import WebsiteSpeedTest from '../../components/tools/WebsiteSpeedTest';
import ToolContentSection from '../../components/tools/ToolContentSection';

export const metadata = {
  title: 'Website Speed Test — The Tool Guru',
  description: 'Test your internet connection speed, ping, and website performance metrics. Get detailed speed analysis with download/upload speeds and server response times.',
  keywords: ['speed test', 'internet speed', 'ping test', 'website performance', 'download speed', 'upload speed', 'network test', 'the tool guru'],
  openGraph: {
    title: 'Website Speed Test — The Tool Guru',
    description: 'Test your internet connection speed and website performance metrics.',
  },
}

const WebsiteSpeedTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Body>
        <WebsiteSpeedTest />
        <div className="max-w-4xl mx-auto px-4">
          <ToolContentSection
            toolName="Website Speed Test"
            description="Test your internet connection speed, ping, and website performance metrics. Our speed test tool measures download speed, upload speed, ping latency, and server response times to help you understand your connection performance and website speed. Perfect for diagnosing network issues, checking connection quality, monitoring website performance, or verifying internet speeds. Get detailed analysis with comprehensive metrics."
            features={[
              "Test download and upload speeds",
              "Measure ping latency",
              "Check server response times",
              "Analyze connection quality",
              "Display detailed performance metrics",
              "Real-time speed testing",
              "Multiple server locations",
              "Works entirely in your browser"
            ]}
            howToUse={[
              "Click 'Start Speed Test' to begin",
              "Wait for download speed test to complete",
              "Upload speed test will run automatically",
              "View ping and latency measurements",
              "Check server response times",
              "Review detailed performance metrics",
              "Compare results over time",
              "Use results to diagnose connection issues"
            ]}
            useCases={[
              "Check internet connection speed",
              "Diagnose network performance issues",
              "Monitor connection quality",
              "Verify internet speeds from ISP",
              "Test website server response times",
              "Compare speeds across different networks",
              "Troubleshoot slow connection problems",
              "Monitor network performance over time"
            ]}
            tips={[
              "Close other applications for accurate results",
              "Test at different times to see variations",
              "Use wired connection for most accurate results",
              "Test from different locations if possible",
              "Compare results with your ISP's advertised speeds",
              "Check ping for gaming or real-time applications",
              "Monitor results over time to track performance"
            ]}
            faq={[
              {
                question: "What is a good internet speed?",
                answer: "Good speeds depend on usage: 25 Mbps for basic browsing, 100+ Mbps for streaming HD video, 500+ Mbps for 4K streaming or gaming. Upload speeds are typically lower than download speeds."
              },
              {
                question: "What is ping?",
                answer: "Ping measures latency - the time it takes for data to travel to a server and back. Lower ping (under 50ms) is better, especially for gaming or real-time applications."
              },
              {
                question: "Why are my speeds slower than advertised?",
                answer: "Actual speeds can be lower due to network congestion, distance from server, Wi-Fi interference, or ISP throttling. Wired connections typically perform better than Wi-Fi."
              },
              {
                question: "Can I test website performance?",
                answer: "Yes, the tool can test server response times and connection quality, which affects website performance. For detailed website performance analysis, use specialized website speed testing tools."
              }
            ]}
          />
        </div>
      </Body>
      <Footer />
    </div>
  );
};

export default WebsiteSpeedTestPage;
