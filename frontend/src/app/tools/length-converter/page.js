import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import LengthConverterTool from '../../components/tools/LengthConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Length Converter — The Tool Guru',
  description: 'Convert length units like meters, feet, inches, miles, and more.',
  keywords: ['length', 'converter', 'meters', 'feet', 'inches', 'miles', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/length-converter',
  },
  openGraph: {
    title: 'Length Converter — The Tool Guru',
    description: 'Convert length units like meters, feet, inches, miles, and more.',
    url: 'https://thetool.guru/tools/length-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Length Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Length Converter — The Tool Guru',
    description: 'Convert length units like meters, feet, inches, miles, and more.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const LengthConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <LengthConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Length Converter"
          description="Convert length units: meters, feet, inches, miles, km, yards, and more. Metric and imperial. For DIY, travel, and education."
          features={["m, ft, in, mi, km, yd", "Instant conversion", "Bidirectional", "Works in browser"]}
          howToUse={["Enter value", "Select units", "View result"]}
          useCases={["DIY and construction", "Travel", "Sports", "Education"]}
          faq={[{ question: "How many feet in a meter?", answer: "1 meter ≈ 3.281 feet. 1 foot = 12 inches." }]}
        />
      </div>
      <RelatedToolsSection toolId="length-converter" />
    </Body>
    <Footer />
  </div>
);

export default LengthConverterPage;


