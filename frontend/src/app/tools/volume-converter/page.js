import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import VolumeConverterTool from '../../components/tools/VolumeConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Volume Converter — The Tool Guru',
  description: 'Convert between liters, gallons, cubic units, and more.',
  keywords: ['volume', 'converter', 'liters', 'gallons', 'cups', 'cubic', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/volume-converter',
  },
  openGraph: {
    title: 'Volume Converter — The Tool Guru',
    description: 'Convert between liters, gallons, cubic units, and more.',
    url: 'https://thetool.guru/tools/volume-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Volume Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Volume Converter — The Tool Guru',
    description: 'Convert between liters, gallons, cubic units, and more.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const VolumeConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <VolumeConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Volume Converter"
          description="Convert between liters, gallons, cups, fluid ounces, cubic meters, and more. For cooking, fuel, and science."
          features={["Liters, gallons, cups, fl oz", "Cubic units", "Instant conversion", "Works in browser"]}
          howToUse={["Enter value", "Select units", "View result"]}
          useCases={["Cooking", "Fuel", "Chemistry", "DIY"]}
          faq={[{ question: "US or UK gallon?", answer: "US gallon ≈ 3.785 L. UK (imperial) gallon ≈ 4.546 L. The tool uses the standard you select." }]}
        />
      </div>
      <RelatedToolsSection toolId="volume-converter" />
    </Body>
    <Footer />
  </div>
);

export default VolumeConverterPage;


