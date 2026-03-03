import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Body from '../../components/layout/Body';
import PressureConverterTool from '../../components/tools/PressureConverterTool';
import ToolContentSection from '../../components/tools/ToolContentSection';
import RelatedToolsSection from '../../components/tools/RelatedToolsSection';
export const metadata = {
  title: 'Pressure Converter — The Tool Guru',
  description: 'Convert between Pa, kPa, MPa, bar, atm, and psi.',
  keywords: ['pressure', 'converter', 'psi', 'bar', 'kpa', 'atm', 'the tool guru'],
  alternates: {
    canonical: 'https://thetool.guru/tools/pressure-converter',
  },
  openGraph: {
    title: 'Pressure Converter — The Tool Guru',
    description: 'Convert between Pa, kPa, MPa, bar, atm, and psi.',
    url: 'https://thetool.guru/tools/pressure-converter',
    siteName: 'The Tool Guru',
    images: [
      {
        url: '/Brand_Assets/Logo.webp',
        width: 512,
        height: 512,
        alt: 'Pressure Converter — The Tool Guru - The Tool Guru',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pressure Converter — The Tool Guru',
    description: 'Convert between Pa, kPa, MPa, bar, atm, and psi.',
    images: ['/Brand_Assets/Logo.webp'],
    creator: '@thetoolguru',
    site: '@thetoolguru',
  },
}

const PressureConverterPage = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <Body>
      <PressureConverterTool />
      <div className="max-w-4xl mx-auto px-4">
        <ToolContentSection
          toolName="Pressure Converter"
          description="Convert between Pa, kPa, MPa, bar, atm, and psi. For tires, hydraulics, and chemistry. All in your browser."
          features={["Pa, kPa, bar, atm, psi", "Instant conversion", "Works in browser"]}
          howToUse={["Enter value", "Select units", "View result"]}
          useCases={["Tire pressure", "Hydraulics", "Scuba", "Chemistry"]}
          faq={[{ question: "What is psi?", answer: "Pounds per square inch. Common in the US for tire pressure. 1 bar ≈ 14.5 psi." }]}
        />
      </div>
      <RelatedToolsSection toolId="pressure-converter" />
    </Body>
    <Footer />
  </div>
);

export default PressureConverterPage;


