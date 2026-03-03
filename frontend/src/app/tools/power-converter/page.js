import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PowerConverterTool from '../../components/tools/PowerConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Power Converter — The Tool Guru',
  description: 'Convert between Watts, kilowatts, horsepower, and dBm.',
  keywords: ['power', 'converter', 'watt', 'kilowatt', 'horsepower', 'dbm'],
  alternates: {
    canonical: 'https://thetool.guru/tools/power-converter',
  },
  openGraph: {
    title: 'Power Converter — The Tool Guru',
    description: 'Convert between Watts, kilowatts, horsepower, and dBm.',
    url: 'https://thetool.guru/tools/power-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Power Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Power Converter — The Tool Guru',
    description: 'Convert between Watts, kilowatts, horsepower, and dBm.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const PowerConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <PowerConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Power Converter"
          description="Convert between Watts, kilowatts, horsepower, and dBm. For engines, electronics, and RF. All in your browser."
          features={["W, kW, hp, dBm", "Instant conversion", "Works in browser"]}
          howToUse={["Enter value", "Select units", "View result"]}
          useCases={["Cars (hp)", "Electronics (W)", "RF (dBm)"]}
          faq={[{ question: "What is dBm?", answer: "Decibels relative to 1 milliwatt. Used in radio and telecom. 0 dBm = 1 mW." }]}
        />
      </div>
      <RelatedToolsSection toolId="power-converter" />
    </Body>
    <Footer />
  </div>
);

export default PowerConverterPage;


