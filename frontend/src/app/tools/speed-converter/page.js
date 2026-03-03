import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import SpeedConverterTool from '../../components/tools/SpeedConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Speed Converter — The Tool Guru',
  description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
  keywords: ['speed', 'converter', 'mph', 'kmh', 'knots', 'mps', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/speed-converter',
  },
  openGraph: {
    title: 'Speed Converter — The Tool Guru',
    description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
    url: 'https://thetool.guru/tools/speed-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Speed Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speed Converter — The Tool Guru',
    description: 'Convert between m/s, km/h, mph, knots, and ft/s.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const SpeedConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <SpeedConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Speed Converter"
          description="Convert between m/s, km/h, mph, knots, ft/s. For driving, aviation, and science. All in your browser."
          features={["m/s, km/h, mph, knots, ft/s", "Instant conversion", "Works in browser"]}
          howToUse={["Enter speed", "Select units", "View result"]}
          useCases={["Driving", "Aviation", "Weather", "Sports"]}
          faq={[{ question: "How do I convert mph to km/h?", answer: "Multiply by 1.609. Or use this tool: enter mph and select km/h as target." }]}
        />
      </div>
      <RelatedToolsSection toolId="speed-converter" />
    </Body>
    <Footer />
  </div>
);

export default SpeedConverterPage;


